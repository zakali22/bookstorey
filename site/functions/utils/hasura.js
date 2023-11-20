const fetch = require("node-fetch")

async function query({query, variables}){
    const result = await fetch('https://bookstorey-db.hasura.app/v1/graphql', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Hasura-Admin-Secret": "PVkipLYKF42emqbZ6azcXZivqDXXtBsPksuInJFDGr4huZJwLpmto4ZpMuNgK1j6"
        },
        body: JSON.stringify({ query, variables })
    }).then(response => response.json())

    return result.data
}

exports.query = query