const languages = require(`./src/data/languages`)
const theme = require(`./src/utils/styling/theme`)

const isProduction = process.env.NODE_ENV === 'production'
const isStaging = !!process.env.STAGING

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    siteUrl: `https://petitcode.com`,
    author: `Benedikt Rötsch`,
    title: `petitcode | Your avantgarde digital agency based in Berlin`,
    description: `petitcode specialises in app development, online site and shop building, SEO and maintenance based in Berlin. Feel free to contact us at info@petitcode.com`,
    languages
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `mtyay169tt6k`,
        ...(isProduction && !isStaging
          ? {
              accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
            }
          : {
              host: `preview.contentful.com`,
              accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN
            })
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`]
      }
    },
    `gatsby-transformer-sqip`,
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true
        }
      }
    },
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
    ...(isProduction
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
          `gatsby-plugin-webpack-size`,
          `gatsby-plugin-netlify-cache`,
          {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
              trackingId: 'UA-82351127-1',
              head: false,
              anonymize: true,
              respectDNT: true
            }
          }
        ]
      : [])
  ]
}
