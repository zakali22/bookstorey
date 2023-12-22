const slugify = require('slugify')
const { createRemoteFileNode, createFilePath } = require('gatsby-source-filesystem')
const CATEGORIES = require("./data/categories.json")
const fetch = require('node-fetch')
const sanitizeUri = require('sanitize-filename')
//  const fetchBooks = require("../netlify/functions/fetch-books")
//  const fetchGoogleBooks = require("../netlify/functions/fetch-google-books")

require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})

exports.createPages = async ({ actions, graphql, page }) => {
    const {createPage} = actions

    /**
    * * Create Book pages
   */

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
            // console.log("BookResult")
            // console.log(res)
            res.data.allBook.edges.forEach((edge) => {
                // console.log(edge)
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

    await graphql(`
    {
        allAuthor {
            edges {
                node {
                    slug
                }
            }
        }
    }`).then(res => {
        if(res.data){
            res.data.allAuthor.edges.forEach((edge) => {
                const author = edge.node
        
                createPage({
                    path: `/author/${author.slug}`,
                    component: require.resolve("./src/templates/author.js"),
                    context: {
                        slug: author.slug
                    }
                })
            })
        }
    })



    /**
     * * Create Category pages
    */

    const categoryResult = await graphql(`
        {
            allBook {
                edges {
                    node {
                        category
                    }
                }
            }
        }
    `).then(res => res.data)

    if(categoryResult.errors){
        console.error("Something went wrong with category query")
    }

    const categoryBooks = categoryResult?.allBook.edges

    const remappedCategoryBooks = CATEGORIES.data.map((category) => {
        const categoryBooksFound = categoryBooks.filter((edge) => edge.node.category.toLowerCase() === category)

        return {
            category,
            data: categoryBooksFound
        }
    })

    remappedCategoryBooks.forEach((categoryObj) => {
        const booksPerCategoryPage = 10
        const numPagesPerCat = Math.ceil(categoryObj.data.length / booksPerCategoryPage)
        Array.from({length: numPagesPerCat}).forEach((_, i) => {
            createPage({
                path: i === 0 ? `/categories/${categoryObj.category}` : `/categories/${categoryObj.category}/${i + 1}`,
                component: require.resolve("./src/templates/category.js"),
                context: {
                    category: categoryObj.category,
                    limit: booksPerCategoryPage,
                    skip: i * booksPerCategoryPage,
                    numPagesPerCat,
                    currentPage: i + 1
                }
            })
        })
    })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
    if (node.internal.type === `Author`) {
        // console.log(node)
    }
}

exports.createResolvers = ({ actions, store, cache, createNodeId, createResolvers, reporter }) => {
    const { createNode } = actions
    const resolvers = {
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
            }
        }
    }



    createResolvers(resolvers)
    
}


exports.sourceNodes = async ({ actions, createNodeId, createContentDigest, store, cache, reporter }) => {
    const { createNode } = actions
    // const baseUrl = process.env.NODE_ENV === "production" ? 'https://bookstorey.netlify.app/' : 'http://localhost:9999'
    const baseUrl = 'https://bookstorey.netlify.app/'
    // console.log(baseUrl)

    /** Run netlify functions:serve to locally test serverless functions */
    const bookListResponse = await fetch(`${baseUrl}/.netlify/functions/fetch-books`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(async ({ bookstorey_Books_aggregate }) => {
        /** Books + authors node */
        await Promise.all(bookstorey_Books_aggregate.nodes.map(async (bookNode) => {
            const bookNodeBookList = bookNode.books
            
            if(bookNodeBookList.length > 0){
                // console.log(bookNode.category)
                await Promise.all(bookNodeBookList.map(async (bookId) => {
                    const bookResponse = await fetch(`${baseUrl}/.netlify/functions/fetch-book-with-id?bookId=${bookId}`, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                        return response.json()
                    }).then(async ({bookstorey_Book_by_pk: bookData}) => {
                        // console.log(bookData)
                        if(bookData){
                            const authors = bookData.authors

                            let image;
                            if(bookData.imageLink){
                                image = await createRemoteFileNode({
                                    url: bookData.imageLink.trim(),
                                    parentNodeId: createNodeId(`book-image-${slugify(bookData.title, {lower: true, remove: /[*+~.()'"!:@]/g})}`),
                                    store,
                                    cache,
                                    createNode,
                                    createNodeId,
                                    reporter
                                })
                            }
                            
                            /* Book Node */
                            createNode({
                                ...bookData, 
                                // authors: authors?.map(author => (slugify(author, {lower: true, remove: /[*+~.()'"!:@]/g}))),
                                slug: slugify(bookData.title, {lower: true, remove: /[*+~.()'"!:@]/g}),
                                id: bookData.id,
                                parent: null,
                                children: [],
                                cover: image?.id,
                                averageRating: parseInt(bookData.averageRating),
                                internal: {
                                    type: 'Book',
                                    content: JSON.stringify(bookData),
                                    contentDigest: createContentDigest(bookData)
                                }
                            })
    
    
                            /* Author Node */
                            await Promise.all(authors.map(async (authorId) => {
                                const authorResponse = await fetch(`${baseUrl}/.netlify/functions/fetch-author-with-id?authorId=${authorId}`, {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                })
                                .then(response => response.json())
                                .then(async ({bookstorey_Author_by_pk: authorData}) => {
            
                                    if(authorData){
                                        const slug = slugify(authorData.name, {lower: true, remove: /[*+~.()'"!:@]/g})

                                        /** Fetch image */
                                        const response = await fetch(new URL(`https:openlibrary.org/search/authors.json?q=${slug}`))
                                        let image;
                                        let bio;

                                        if(!response.ok){
                                            reporter.warn(`Error loading ${authorData.name} - ${response.status} ${response.statusText}`)
                                            image = null
                                            bio = null
                                        }

                                        const { docs } = await response.json()

                                        if(docs.length){
                                            const authorDetailResponse = await fetch(new URL(`https:openlibrary.org/authors/${docs[0].key}.json`))
                                        
                                            if(!authorDetailResponse.ok){
                                                reporter.warn(`Error loading ${authorData.name} - ${authorDetailResponse.status} ${authorDetailResponse.statusText}`)
                                                image = null
                                                bio = null
                                            }

                                            const { photos, bio: bioData } = await authorDetailResponse.json()

                                            /** Photos */
                                            if(photos){
                                                if(photos.length){
                                                    image = await createRemoteFileNode({
                                                        url: `https://covers.openlibrary.org/a/olid/${docs[0].key}-L.jpg`,
                                                        store,
                                                        cache,
                                                        createNode,
                                                        createNodeId
                                                    })
                                                } else {
                                                    image = null
                                                }
                                            } else {
                                                image = null
                                            }

                                            /** Bio */
                                            if(typeof bioData === 'object' && bioData.value.length > 0){
                                                bio = bioData.value
                                            } else {
                                                bio = bioData
                                            }
                                        } else {
                                            image = null
                                            bio = null
                                        }
         

                                        createNode({
                                            name: authorData.name, 
                                            slug,
                                            id: authorData.id,
                                            parent: null,
                                            bio,
                                            hasBio: false,
                                            cover: image?.id,
                                            children: [],
                                            internal: {
                                                type: 'Author',
                                                content: JSON.stringify(authorData),
                                                contentDigest: createContentDigest(authorData)
                                            }
                                        })
                                    }
                                })
            
                                
                            }))
                            
                        }
                    })
                }))
                
            }
        }))
        
    })
    
}

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions

    createTypes(`
        type Author implements Node {
            id: ID!
            name: String!
            slug: String!
            bio: String
            hasBio: Boolean
            books: [Book!]
            cover: File @link
        }

        type Book implements Node {
            title: String!
            slug: String!
            id: ID!
            ratingsCount: Int!
            description: String!
            category: String!
            averageRating: Int!
            authors: [Author!] @link(from: "authors", by: "id")
            cover: File @link
        }
    `)
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === "build-html") {
      actions.setWebpackConfig({
        module: {
          rules: [
            {
              test: /@auth0/,
              use: loaders.null(),
            },
          ],
        },
      })
    }
}