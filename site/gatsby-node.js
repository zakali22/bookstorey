const slugify = require('slugify')
const { createRemoteFileNode, createFilePath } = require('gatsby-source-filesystem')
const CATEGORIES = require("./data/categories.json")
const fetch = require('node-fetch')
//  const fetchBooks = require("../netlify/functions/fetch-books")
//  const fetchGoogleBooks = require("../netlify/functions/fetch-google-books")

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions;
  
    /** Read docs on creating relationships https:www.gatsbyjs.com/docs/tutorial/creating-a-source-plugin/part-3/#add-a-foreign-key-relationship */
    /** Linking to an array of objects use elemMatch to access an object */
    createTypes(`
        type Author implements Node {
            books: [Book!]!
        }

        type Book implements Node {
            authors: [Author!] @link(from: "authors", by: "id")
            cover: File @link
        }
    `)
}

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest, store, cache, reporter }) => {
    const { createNode } = actions
    const baseUrl = process.env.NODE_ENV === "production" ? '' : 'http://localhost:9999'
    console.log(baseUrl)

    /** Run netlify functions:serve to locally test serverless functions */
    const { bookstorey_Books_aggregate } = await fetch(`${baseUrl}/.netlify/functions/fetch-books`, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    
    /** Books + authors node */
    bookstorey_Books_aggregate.nodes.forEach(async (bookNode) => {
        const bookNodeBookList = bookNode.books

        if(bookNodeBookList.length > 0){
            bookNodeBookList.forEach(async (bookId) => {
                const {bookstorey_Book_by_pk: bookData} = await fetch(`${baseUrl}/.netlify/functions/fetch-book-with-id?bookId=${bookId}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())

                const authors = bookData.authors
                const image = await createRemoteFileNode({
                    url: bookData?.imageLink.trim(),
                    store,
                    cache,
                    parentNodeId: createNodeId(`custom-book-image-id-${slugify(bookData.title, {lower: true})}`),
                    createNode,
                    createNodeId
                })

                /* Book Node */
                createNode({
                    ...bookData, 
                    // authors: authors?.map(author => (slugify(author, {lower: true, remove: /[*+~.()'"!:@]/g}))),
                    slug: slugify(bookData.title, {lower: true, remove: /[*+~.()'"!:@]/g}),
                    id: bookData.id,
                    parent: null,
                    children: [],
                    cover: bookData.imageLink && image?.id,
                    averageRating: parseInt(bookData.averageRating),
                    internal: {
                        type: 'Book',
                        content: JSON.stringify(bookData),
                        contentDigest: createContentDigest(bookData)
                    }
                })

                /* Author Node */
                authors.forEach(async (authorId) => {
                    const {bookstorey_Author_by_pk: authorData} = await fetch(`${baseUrl}/.netlify/functions/fetch-author-with-id?authorId=${authorId}`, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => response.json())

                    console.log(authorData)

                    createNode({
                        name: authorData.name, 
                        slug: slugify(authorData.name, {lower: true, remove: /[*+~.()'"!:@]/g}),
                        id: authorData.id,
                        parent: null,
                        bio: "",
                        hasBio: false,
                        children: [],
                        internal: {
                            type: 'Author',
                            content: JSON.stringify(authorData),
                            contentDigest: createContentDigest(authorData)
                        }
                    })
                })

            })
        }
    })
}

exports.createResolvers = ({ actions, store, cache, createNodeId, createResolvers, reporter }) => {
    const { createNode } = actions
    const resolvers = {
         Book: {
             cover: {
                 type: 'File',
                 resolve: async (bookObj) => {
                     if(bookObj.imageLink){
                         return await createRemoteFileNode({
                             url: bookObj.imageLink,
                             store,
                             cache,
                             createNode,
                             createNodeId
                         })
                     } else {
                         return null
                     }
                 }
             }
         },
        Author: {
            books: {
                type: ["Book"],
                resolve: async (source, args, context, info) => {
                    const {entries} = await context.nodeModel.findAll({
                        query: {
                            filter: {authors: {elemMatch: {slug: {eq: source.slug}}}}
                        },
                        type: "Book"
                    })
                   
                    return entries
                }
            },
            cover: {
                type: 'File',
                resolve: async (source, args, context, info) => {
                    const response = await fetch(`https:openlibrary.org/search/authors.json?q=${source.slug}`)
                    if(!response.ok){
                        reporter.warn(`Error loading ${source.name} - ${response.status} ${response.statusText}`)
                        return null
                    }

                    const { docs } = await response.json()

                    if(docs.length){
                        const response = await fetch(`https:openlibrary.org/authors/${docs[0].key}.json`)
                          console.log(docs[0].key)
                       
                        if(!response.ok){
                            reporter.warn(`Error loading ${source.name} - ${response.status} ${response.statusText}`)
                            return null
                        }


                        const { photos } = await response.json()
                        if(photos){
                            if(photos.length){
                                  console.log(photos)
                                return await createRemoteFileNode({
                                    url: `https:covers.openlibrary.org/a/olid/${docs[0].key}-L.jpg`,
                                    store,
                                    cache,
                                    createNode,
                                    createNodeId
                                })
                            } else {
                                return null
                            }
                        } else {
                            return null
                        }
                    } else {
                        return null
                    }
                }
            },
            bio: {
                type: 'String',
                resolve: async (source, args, context, info) => {
                    const response = await fetch(`https:openlibrary.org/search/authors.json?q=${source.slug}`)
                    if(!response.ok){
                        reporter.warn(`Error loading ${source.name} - ${response.status} ${response.statusText}`)
                        return null
                    }

                    const { docs } = await response.json()
                    if(docs.length){
                        const response = await fetch(`https:openlibrary.org/authors/${docs[0].key}.json`)
                       
                        if(!response.ok){
                            reporter.warn(`Error loading ${source.name} - ${response.status} ${response.statusText}`)
                            return null
                        }

                        const { bio } = await response.json()
                        if(typeof bio === 'object' && bio.value.length > 0){
                            return bio.value
                        } else if(bio && bio.length > 0) {
                            return bio
                        } else {
                            return null
                        }
                    } else {
                        return null
                    }
                }
            }
        }
    }



    createResolvers(resolvers)
    
}


exports.createPages = async ({ actions, graphql }) => {
    /**
     * * Create Book pages
   */

    const {createPage} = actions

    const bookResult = await graphql(`
    {
        allBook {
            edges {
                node {
                    slug
                }
            }

        }
    }`).then(res => {
        if(res.data){
            console.log(res.data.allBook.edges)
            res.data.allBook.edges.forEach((edge) => {
                const book = edge.node
        
                createPage({
                    path: `/books/${book.slug}`,
                    component: require.resolve("./src/templates/book.js"),
                    context: {
                        slug: book.slug
                    }
                })
            })
        }
    })






    // /**
    //  * * Create Authors pages
    // */

    // const authorResult = await graphql(`
    // {
    //     allAuthor {
    //         edges {
    //             node {
    //                 slug
    //             }
    //         }
    //     }
    // }`).then(res => res.data )


    // authorResult.allAuthor.edges.forEach((edge) => {
    //     const author = edge.node

    //     createPage({
    //         path: `/author/${author.slug}`,
    //         component: require.resolve("./src/templates/author.js"),
    //         context: {
    //             slug: author.slug
    //         }
    //     })
    // })


    /**
     * * Create Category pages
    */

    // const categoryResult = await graphql(`
    //     {
    //         allBook {
    //             edges {
    //                 node {
    //                     categories
    //                 }
    //             }
    //         }
    //     }
    // `).then(res => res.data)

    // if(categoryResult.errors){
    //     console.error("Something went wrong with category query")
    // }

    // const categoryBooks = categoryResult?.allBook.edges

    // const remappedCategoryBooks = CATEGORIES.data.map((category) => {
    //     const categoryBooksFound = categoryBooks.filter((edge) => edge.node.categories[0].toLowerCase() === category)

    //     return {
    //         category,
    //         data: categoryBooksFound
    //     }
    // })

    // remappedCategoryBooks.forEach((categoryObj) => {
    //     const booksPerCategoryPage = 10
    //     const numPagesPerCat = Math.ceil(categoryObj.data.length / booksPerCategoryPage)
    //     Array.from({length: numPagesPerCat}).forEach((_, i) => {
    //         createPage({
    //             path: i === 0 ? `/categories/${categoryObj.category}` : `/categories/${categoryObj.category}/${i + 1}`,
    //             component: require.resolve("./src/templates/category.js"),
    //             context: {
    //                 category: categoryObj.category.charAt(0).toUpperCase() + categoryObj.category.slice(1),
    //                 limit: booksPerCategoryPage,
    //                 skip: i * booksPerCategoryPage,
    //                 numPagesPerCat,
    //                 currentPage: i + 1
    //             }
    //         })
    //     })
    // })
}
