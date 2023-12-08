const { query } = require("./utils/hasura")

exports.handler = async () => {
    const response = await query({
        query: `
            query {
                bookstorey_Books_aggregate {
                    nodes {
                      books
                      category
                      id
                    }
                }
            }
        `
    })

    // console.log(response)

    return {
        statusCode: 200,
        body: JSON.stringify(response)
    }
}