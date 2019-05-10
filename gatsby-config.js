const languages = require(`./src/data/languages`)
const theme = require(`./src/utils/styling/theme`)

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = {
  siteMetadata: {
    siteUrl: `https://petitcode.com`,
    author: `Benedikt Rötsch`,
    title: `petitcode | Your avantgarde digital agency based in Berlin`,
    description: `petitcode specialises in app development, online site and shop building, SEO and maintenance based in Berlin. Feel free to contact us at info@petitcode.com`,
    languages
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/pages`,
        name: `page`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/images`,
        name: `image`
      }
    },
    {
      resolve: `gatsby-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-relative-images`
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 576,
              sizeByPixelDensity: true,
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-sqip`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-svg`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/styling/typography`
      }
    },
    {
      resolve: `gatsby-plugin-i18n`,
      options: {
        localeForNull: `any`,
        localeDefault: languages.defaultLocale,
        uselocaleLayout: false
      }
    },
    {
      resolve: `gatsby-plugin-polyfill-io`,
      options: {
        features: [`IntersectionObserver`]
      }
    },
    ...(IS_PRODUCTION
      ? [
          {
            resolve: `gatsby-plugin-manifest`,
            options: {
              name: `petitcode | Your avantgarde digital agency`,
              short_name: `petitcode`,
              start_url: `/`,
              background_color: theme.colors.white,
              theme_color: theme.colors.black,
              display: `minimal-ui`,
              icon: `src/assets/petitcode-logo.svg`,
              legacy: true
            }
          },
          `gatsby-plugin-offline`,
          `gatsby-plugin-subfont`,
          `gatsby-plugin-webpack-size`,
          `gatsby-plugin-netlify-cache`
        ]
      : [])
  ]
}
