import { graphql } from 'gatsby'
import React from 'react'
import * as PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

import Layout from '../components/Layout'
import PageContext from '../utils/PageContext'
import GridWrapper from '../components/GridWrapper'

class PageTemplate extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  render() {
    const {
      frontmatter: { title, description },
      code: { body },
      fields: { humanId, locale }
    } = this.props.data.mdx

    console.log({ humanId, locale })

    return (
      <PageContext.Provider
        value={{ activeHumandId: humanId, activeLocale: locale }}
      >
        <Layout>
          <Helmet
            /**
             * Meta information based on:
             * https://moz.com/blog/meta-data-templates-123
             * https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html
             */
            title={title}
            meta={[
              {
                property: 'og:title',
                content: title
              },
              {
                name: 'description',
                content: description
              },
              {
                property: 'og:description',
                content: description
              }
              // heroImage && {
              //   property: 'twitter:image:src',
              //   content: `${seoImage.file.url}?w=1200&h=628&fit=fill`
              // },
              // heroImage && {
              //   property: 'og:image',
              //   content: `${seoImage.file.url}?w=1200&h=630&fit=fill`
              // }
            ].filter(Boolean)}
          />
          <GridWrapper>
            <h1>{title}</h1>
            <MDXRenderer>{body}</MDXRenderer>
          </GridWrapper>
        </Layout>
      </PageContext.Provider>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query($id: String!) {
    mdx(fields: { id: { eq: $id } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        banner {
          childImageSharp {
            sizes(maxWidth: 900) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        categories
        keywords
        description
      }
      fields {
        slug
        humanId
        locale
      }
      code {
        body
      }
    }
  }
`
