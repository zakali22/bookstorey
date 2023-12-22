const auth = require("@netlify/auth0")

exports.handler = auth.withAuth0(async (req, ctx) => {

    if (req.method === "POST") {
        const res = ctx.json({ message: 'you posted!' });
    
        res.headers.set("Access-Control-Allow-Origin", "*");
        res.headers.append("Access-Control-Allow-Headers", "*");
        res.headers.append("Access-Control-Allow-Methods", "*");
    
        return res;
      } else if (req.method === "OPTIONS") {
        const res = new Response();
    
        res.headers.set("Access-Control-Allow-Origin", "*");
        res.headers.append("Access-Control-Allow-Headers", "*");
        res.headers.append("Access-Control-Allow-Methods", "*");
    
        return res;
    }



}, {
    auth0: {
        required: true
    }
})