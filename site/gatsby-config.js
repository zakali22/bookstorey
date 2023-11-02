/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Bookstorey`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [
    "gatsby-plugin-sass", 
    "gatsby-plugin-image", 
    "gatsby-plugin-sitemap", 
    "gatsby-transformer-remark", 
    "gatsby-plugin-sharp", 
    "gatsby-transformer-sharp", 
    "gatsby-theme",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": `${__dirname}/src/images`
      },
      __key: "images"
    }, 
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "src",
        "path": `${__dirname}/src`
      },
      __key: "images"
    }, 
    /**
     * * Removed pages option in the gatsby-source-filesystem
    */
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "path": `${__dirname}/src/data`
      },
      __key: "data"
    }
  ]
};