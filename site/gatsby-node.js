const { default: slugify } = require('slugify')
const { createRemoteFileNode, createFilePath } = require('gatsby-source-filesystem')
const BOOKS = require("./src/data/books.json")
const CATEGORIES = require("./src/data/categories.json")

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
    const { createNode, createTypes } = actions

    /** Read docs on creating relationships https://www.gatsbyjs.com/docs/tutorial/creating-a-source-plugin/part-3/#add-a-foreign-key-relationship */
    /** Linking to an array of objects use elemMatch to access an object */
    createTypes(`
        type Author implements Node {
            books: [Book!]!
        }

        type Book implements Node {
            authors: [Author!]! @link(from: "authors", by: "slug")
        }
    `)


    /** Books + authors node */
    BOOKS.forEach((bookNode, idx) => {
        bookNode.data.forEach((book) => {
            const authors = book.authors

            if(authors && authors.length > 0){
                // Book node
                createNode({
                    ...book, 
                    authors: authors?.map(author => (slugify(author, {lower: true, remove: /[*+~.()'"!:@]/g}))),
                    slug: slugify(book.title, {lower: true, remove: /[*+~.()'"!:@]/g}),
                    id: createNodeId(`custom-book-id-${slugify(book.title, {lower: true})}`),
                    parent: null,
                    children: [],
                    internal: {
                        type: 'Book',
                        content: JSON.stringify(book),
                        contentDigest: createContentDigest(book)
                    }
                })


                // Author node
                authors.forEach((author) => {
                    createNode({
                        name: author, 
                        slug: slugify(author, {lower: true, remove: /[*+~.()'"!:@]/g}),
                        id: createNodeId(`custom-${author.toLowerCase()}`),
                        parent: null,
                        bio: "",
                        hasBio: false,
                        children: [],
                        internal: {
                            type: 'Author',
                            content: JSON.stringify(author),
                            contentDigest: createContentDigest(author)
                        }
                    })
                })
            }
        })
    })
}

exports.createPages = async ({ actions, graphql }) => {
    const {createPage} = actions
    // Query the books data and create pages for each using a template
    /** Books pages */
    const booksData = await graphql(`
        query BookPagesQuery {
            allBook {
                nodes {
                    title
                    id
                    description
                    categories
                    slug
                    authors {
                        slug
                        id
                        name
                        bio
                        cover {
                        childImageSharp {
                                gatsbyImageData
                            }
                        }
                    }
                    cover {
                        childImageSharp { gatsbyImageData }
                    }
                }
            }
        }
    `)

    booksData.data.allBook.nodes.forEach((book) => {
        createPage({
            path: `/books/${book.slug}`,
            component: require.resolve("./src/templates/book.js"),
            context: {
                ...book,
                category: book.categories[0],
                meta: {
                    description: `${book.name}`
                }
            }
        })
    })


    /** Authors pages */
    const authorsData = await graphql(`
        query AllAuthors {
            allAuthor {
                nodes {
                    slug
                    name
                    id
                    bio
                    cover {
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                    books {
                        id
                        title
                        categories
                        averageRating
                        ratingsCount
                        slug
                        authors {
                            slug
                            id
                            name
                        }
                        cover {
                            childImageSharp {
                                gatsbyImageData
                            }
                        }
                    }
                }
            }
        }
    `)

    authorsData.data.allAuthor.nodes.forEach((author) => {
        createPage({
            path: `/author/${author.slug}`,
            component: require.resolve("./src/templates/author.js"),
            context: {
                ...author,
                meta: {
                    description: `${author.name}`
                }
            }
        })
    })



    /** Categories pages */

    // Loop over categories.json
        // Query the books for that category
        // For each of the category's loop over a page limit to generate a paginated path `${category} : ${category}/01

    const categoriesList = await graphql(`
        query AllCategoryBooks {
            allBook {
                nodes {
                    title
                    categories
                    averageRating
                    ratingsCount
                    cover {
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                    description
                    id
                    slug
                    authors {
                        slug
                        name
                    }
                }
            }
        }
    `)

    const categoryBooks = categoriesList?.data?.allBook.nodes

    const remappedCategoryBooks = CATEGORIES.data.map((category) => {
        const categoryBooksFound = categoryBooks.filter((categoryResultBook) => categoryResultBook.categories[0].toLowerCase() === category)

        return {
            category,
            data: categoryBooksFound
        }
    })

    // console.log(remappedCategoryBooks)

    remappedCategoryBooks.forEach((categoryObj) => {
        const booksPerCategoryPage = 10
        const numPagesPerCat = Math.ceil(categoryObj.data.length / booksPerCategoryPage)
        Array.from({length: numPagesPerCat}).forEach((_, i) => {
            createPage({
                path: i === 0 ? `/categories/${categoryObj.category}` : `/categories/${categoryObj.category}/${i + 1}`,
                component: require.resolve("./src/templates/category.js"),
                context: {
                    category: categoryObj.category.charAt(0).toUpperCase() + categoryObj.category.slice(1),
                    limit: booksPerCategoryPage,
                    skip: i * booksPerCategoryPage,
                    numPagesPerCat,
                    currentPage: i + 1
                }
            })
        })
    })

}

exports.createResolvers = ({ actions, store, cache, createNodeId, createResolvers, reporter }) => {
    const { createNode } = actions
    const resolvers = {
        Book: {
            cover: {
                type: 'File',
                resolve: async (bookObj) => {
                    if(bookObj.imageLinks){
                        return await createRemoteFileNode({
                            url: bookObj.imageLinks.thumbnail,
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
                    const response = await fetch(`https://openlibrary.org/search/authors.json?q=${source.slug}`)
                    if(!response.ok){
                        reporter.warn(`Error loading ${source.name} - ${response.status} ${response.statusText}`)
                        return null
                    }

                    const { docs } = await response.json()

                    if(docs.length){
                        const response = await fetch(`https://openlibrary.org/authors/${docs[0].key}.json`)
                        // console.log(docs[0].key)
                        
                        if(!response.ok){
                            reporter.warn(`Error loading ${source.name} - ${response.status} ${response.statusText}`)
                            return null
                        }


                        const { photos } = await response.json()
                        if(photos){
                            if(photos.length){
                                console.log(photos)
                                return await createRemoteFileNode({
                                    url: `https://covers.openlibrary.org/a/id/${photos[0]}-L.jpg`,
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
                    const response = await fetch(`https://openlibrary.org/search/authors.json?q=${source.slug}`)
                    if(!response.ok){
                        reporter.warn(`Error loading ${authorObj.name} - ${response.status} ${response.statusText}`)
                        return null
                    }

                    const { docs } = await response.json()
                    if(docs.length){
                        const response = await fetch(`https://openlibrary.org/authors/${docs[0].key}.json`)
                        
                        if(!response.ok){
                            reporter.warn(`Error loading ${source.name} - ${response.status} ${response.statusText}`)
                            return null
                        }

                        const { bio } = await response.json()
                        if(typeof bio === 'object' && bio.value.length > 0){
                            return bio.value
                        } else {
                            return bio
                        }
                    }
                }
            }
        }
    }



    createResolvers(resolvers)
}