const { query } = require("./utils/hasura")

exports.handler = async (event) => {
    const { bookId } = event.queryStringParameters
    console.log(bookId)
    const response = await query({
        query: `
            query BookHasuraQuery($id: uuid!) {
                bookstorey_Book_by_pk(id: $id) {
                    title
                    id
                    category
                    averageRating
                    authors
                    description
                    imageLink
                    ratingsCount
                }
            }
        `,
        variables: {
            id: bookId
        }
    })

    // console.log(response)

    return {
        statusCode: 200,
        body: JSON.stringify(response)
    }
}