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

    const headers = {
        "Access-Control-Allow-Origin": "http://localhost:8888",
        "Access-Control-Allow-Headers": "Content-Type, Accept, authorization",
        "Access-Control-Allow-Methods": "PUT, GET, HEAD, POST, DELETE, OPTIONS, PATCH",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/x-www-form-urlencoded"
    }
    

    if(event.httpMethod === 'OPTIONS'){
        console.log("OPTIONS", headers)
        return {
            statusCode: 204,
            headers,
            body: JSON.stringify("Options response")
        }
    } else if(event.httpMethod === 'GET'){
        console.log("GET", headers)

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(response)
        }
    }

    

    // console.log(response)


}