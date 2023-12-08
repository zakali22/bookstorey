// const { query } = require("./utils/hasura")

exports.handler = async (event, context) => {
    console.log(event)

    return {
        statusCode: 200,
        body: JSON.stringify(context)
    }
}