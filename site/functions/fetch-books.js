const { query } = require("./utils/hasura")

exports.handler = async () => {
    const response = await query({
        query: `
            query {
                Books {
                    category
                    data
                }
            }
        `
    })

    return {
        statusCode: 200,
        body: JSON.stringify(response)
    }
}