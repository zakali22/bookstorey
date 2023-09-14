const { default: slugify } = require('slugify')
const { createRemoteFileNode } = require('gatsby-source-filesystem')
const BOOKS = require("./src/data/books.json")

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

exports.createPages = ({ actions }) => {
    // Query the books data and create pages for each using a template

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
            }
        }
    }



    createResolvers(resolvers)
}