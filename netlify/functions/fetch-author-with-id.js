const { query } = require("./utils/hasura")

exports.handler = async (event) => {
    const { authorId } = event.queryStringParameters
    console.log(authorId)
    const response = await query({
        query: `
            query AuthorHasuraQuery($id: uuid!) {
                bookstorey_Author_by_pk(id: $id) {
                    id
                    name
                }
            }
        `,
        variables: {
            id: authorId
        }
    })

    // console.log(response)

    return {
        statusCode: 200,
        body: JSON.stringify(response)
    }
}