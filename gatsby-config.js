module.exports = {
  siteMetadata: {
    title: `KoronkaVirus.pl`,
    description: `Źródło postępowania o koronawirusie.`,
    author: `@gatsbyjs`,
    sitelogo: `koronka_logo.svg`,
    wordpressUrl: `https://serwer2022301.home.pl/autoinstalator/wordpress`,
    siteUrl: `https://koronkavirus.pl`,
    social: [
      {
        "icon": "facebook",
        "url": ""
      },
      {
        "icon": "email",
        "url": "mailto:koronkavirus@gmail.com"
      }
    ]
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `KoronkaVirus`,
        short_name: `KoronkaVirus`,
        start_url: `/`,
        background_color: `#f1e9e9`,
        theme_color: `#f1e9e9`,
        display: `standalone`,
        icon: `src/images/koronka_ico.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-wordpress-experimental`,
      options: {
        url: `https://serwer2022301.home.pl/autoinstalator/wordpress/graphql`,
        verbose: true,
        // for wp-graphql-gutenberg, attributes currently breaks due
        // to the origin schema. It works if we exclude attributes
        excludeFields: [`attributes`],
        plugins: [
          {
            resolve: `gatsby-wordpress-experimental-inline-images`,
          }
        ],
        schema: {
          queryDepth: 5,
          typePrefix: `Wp`,
          timeout: 30000,
        },
        develop: {
          nodeUpdateInterval: 3000,
          hardCacheMediaFiles: false,
        },
        production: {
          hardCacheMediaFiles: false,
        },
        debug: {
          graphql: {
            showQueryOnError: true,
            showQueryVarsOnError: true,
            copyQueryOnError: true,
            panicOnError: true,
            // a critical error is a WPGraphQL query that returns an error and response data. Currently WPGQL will error if we try to access private posts so if this is false it returns a lot of irrelevant errors.
            onlyReportCriticalErrors: true,
          },
        },
        type: {
          Post: {
            limit: 5000
          },
        },
      
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-postcss`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`
  ],
}