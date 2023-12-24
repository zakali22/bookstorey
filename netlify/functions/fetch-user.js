const { withAuth0 } = require("@netlify/auth0")

exports.handler = withAuth0(async (event, context) => {

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:8888/",
            "Vary": "Origin",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
            "Access-Control-Allow-Methods": "GET, HEAD, POST, PATCH, DELETE",
            "Access-Control-Allow-Credentials": true,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify("Hello world")
    }



}, {
    auth0: {
        required: true
    }
})