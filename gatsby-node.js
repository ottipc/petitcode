const { resolve } = require('path')

const { createLocalizedPath } = require('./src/utils/i18n')
const { defaultLocale } = require('./src/data/languages')

exports.onCreateNode = (all) => {
  const { node, actions } = all
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const {
      frontmatter: { slug: frontmatterSlug },
      fileAbsolutePath
    } = node

    // Extract human identifier and locale from the file path
    const pathRegex = /\/([^/]+?)\/[^/]+?(?:\.([a-z-]+))?\.md$/i
    let [all, humanId, locale] = pathRegex.exec(fileAbsolutePath)

    if (!all) {
      throw new Error(
        `Unable to extract metadata from path "${fileAbsolutePath}"`
      )
    }

    // Fallback to default locale if locale was forgotten by author
    locale = locale || defaultLocale

    // Fallback to human id when slug was forgotten by author
    const slug = frontmatterSlug || humanId

    createNodeField({
      name: 'id',
      node,
      value: node.id
    })

    createNodeField({
      name: 'locale',
      node,
      value: locale
    })

    createNodeField({
      name: 'humanId',
      node,
      value: humanId
    })

    createNodeField({
      name: 'slug',
      node,
      value: slug
    })

    createNodeField({
      name: 'title',
      node,
      value: node.frontmatter.title
    })

    createNodeField({
      name: 'description',
      node,
      value: node.frontmatter.description
    })

    createNodeField({
      name: 'date',
      node,
      value: node.frontmatter.date || ''
    })

    createNodeField({
      name: 'theme',
      node,
      value: node.frontmatter.theme || 'default'
    })
  }
}

exports.createPages = ({ actions, graphql }) =>
  graphql(`
    query {
      allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            fileAbsolutePath
            excerpt(pruneLength: 250)
            fields {
              title
              slug
              locale
            }
            code {
              scope
            }
          }
        }
      }
    }
  `).then(({ data, errors }) => {
    if (errors) {
      return Promise.reject(errors)
    }

    const { edges } = data.allMdx

    edges.forEach((edge) => {
      const {
        id,
        fields: { slug, locale }
      } = edge.node
      const path = createLocalizedPath({ slug, locale })

      actions.createPage({
        path,
        component: resolve(`./src/templates/page.js`),
        context: {
          id
        }
      })
    })
  })

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        $components: resolve(__dirname, 'src/components/mdx')
      }
    }
  })
}
