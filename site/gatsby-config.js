/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Bookstorey`,
    siteUrl: `https://www.yourdomain.tld`
  },
  flags: {
    FAST_DEV: true,
  },
  plugins: [
    "gatsby-plugin-sass", 
    "gatsby-plugin-image", 
    "gatsby-plugin-sitemap", 
    "gatsby-transformer-remark", 
    "gatsby-plugin-sharp", 
    "gatsby-transformer-sharp", 
    "gatsby-theme",
    "gatsby-transformer-json",
    /**
     * * Removed pages option in the gatsby-source-filesystem
    */
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "path": `${__dirname}/data`
      },
      __key: "data"
    },
    {
      resolve: 'gatsby-source-pg',
      options: {
        connectionString: 'postgres://zolebxyccqqzrl:e44190796fa2689b6987fe52568a2295ff19ad51fd4364585743481de593270e@ec2-54-73-196-88.eu-west-1.compute.amazonaws.com:5432/dbsiraip7b089f',
        schema: 'public',
      },
    },
  ]
};