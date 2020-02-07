const { resolve } = require('path')

const { createLocalizedPath } = require('./src/utils/i18n')

exports.createPages = async ({ graphql, boundActionCreators }) => {
  const { createPage, createRedirect } = boundActionCreators

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

  async function createBlogPosts({ createPage }) {
    const result = await graphql(
      `
        {
          allContentfulBlogPost(limit: 1000) {
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

    result.data.allContentfulBlogPost.edges.map((edge) => {
      const { slug, id, node_locale: nodeLocale } = edge.node

      const path = createLocalizedPath({
        slug,
        locale: nodeLocale,
        prefix: 'blog'
      })
      createPage({
        path,
        component: resolve(`./src/templates/blog.js`),
        context: {
          slug,
          id
        }
      })
    })
  }

  async function createJobPostings({ createPage }) {
    const result = await graphql(
      `
        {
          allContentfulJobPosting(limit: 1000) {
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

    result.data.allContentfulJobPosting.edges.map((edge) => {
      const { slug, id, node_locale: nodeLocale } = edge.node

      const path = createLocalizedPath({
        slug,
        locale: nodeLocale,
        prefix: 'job'
      })
      createPage({
        path,
        component: resolve(`./src/templates/job-posting.js`),
        context: {
          slug,
          id
        }
      })
    })
  }

  await createPages({ createPage })
  await createBlogPosts({ createPage })
  await createJobPostings({ createPage })
  
  createRedirect({
    fromPath: '/',
    toPath: '/en/',
    isPermanent: true,
    redirectInBrowser: true,
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type ContentfulJobPosting implements Node {
      pricePerHour: String
    }
  `
  createTypes(typeDefs)
}
