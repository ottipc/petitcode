import { graphql } from 'gatsby'
import React from 'react'
import * as PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

import Layout from '../components/Layout'
import { LocationContext } from '../utils/Contexts'
import DarkTheme from './themes/DarkTheme'
import DefaultTheme from './themes/DefaultTheme'

class PageTemplate extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  render() {
    const {
      frontmatter: { title, description, theme },
      code: { body },
      fields: { humanId, locale }
    } = this.props.data.mdx

    let content = null
    switch (theme) {
      case 'dark':
        content = (
          <DarkTheme>
            <MDXRenderer>{body}</MDXRenderer>
          </DarkTheme>
        )
        break
      case 'sections':
        content = <MDXRenderer>{body}</MDXRenderer>
        break
      default:
        content = (
          <DefaultTheme>
            <MDXRenderer>{body}</MDXRenderer>
          </DefaultTheme>
        )
    }

    // Make all images available as map to allow fine-tuned column image output
    const images = this.props.data.allFile.edges.reduce(
      (map, { node }) => ({
        ...map,
        [`${node.name}.${node.extension}`]: node
      }),
      {}
    )

    return (
      <LocationContext.Provider
        value={{ activeHumandId: humanId, activeLocale: locale, images }}
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
          {content}
        </Layout>
      </LocationContext.Provider>
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
        description
        theme
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
    allFile(filter: { sourceInstanceName: { eq: "image" } }) {
      edges {
        node {
          name
          extension
          childImageSharp {
            sqip(numberOfPrimitives: 40, blur: 0) {
              dataURI
            }
            fluid(maxWidth: 1152) {
              ...GatsbyImageSharpFluid_withWebp_noBase64
            }
          }
        }
      }
    }
  }
`
