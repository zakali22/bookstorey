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
        "path": `${__dirname}/src/data`
      },
      __key: "data"
    }
  ]
};