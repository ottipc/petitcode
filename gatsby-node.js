const { resolve } = require('path')

const { createLocalizedPath } = require('./src/utils/i18n')

exports.createPages = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  async function createPages({ createPage }) {
    const result = await graphql(
      `
        {
          allContentfulPage(limit: 1000) {
            edges {
              node {
                id
                slug
                node_locale
              }
            }
          }
        }
      `
    )

    if (result.errors) {
      throw result.errors
    }

    result.data.allContentfulPage.edges.map((edge) => {
      const { slug, id, node_locale: nodeLocale } = edge.node

      const path = createLocalizedPath({ slug, locale: nodeLocale })
      createPage({
        path,
        component: resolve(`./src/templates/page.js`),
        context: {
          slug,
          id
        }
      })
    })
  }

  await createPages({ createPage })
}
