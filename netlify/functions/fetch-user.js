// const { withAuth0 } = require("@netlify/auth0")

exports.handler = async (event, context) => {
    const headers = {
        "Access-Control-Allow-Origin": "http://localhost:8888",
        "Access-Control-Allow-Headers": "Content-Type, Accept",
        "Access-Control-Allow-Methods": "*",
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
    } else if(event.httpMethod === 'POST'){
        console.log("POST", headers)
        return {
            statusCode: 202,
            headers,
            body: JSON.stringify("Post response")
        }
    }



}