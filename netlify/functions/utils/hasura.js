const fetch = require("node-fetch")
require("dotenv").config()

async function query({query, variables}){
    const result = await fetch('https://bookstorey-db.hasura.app/v1/graphql', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Hasura-Admin-Secret": process.env.HASURA_ADMIN_SECRET
        },
        body: JSON.stringify({ query, variables })
    }).then(response => response.json())

    return result.data
}

exports.query = query