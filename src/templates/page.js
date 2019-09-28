import { graphql } from 'gatsby'
import React from 'react'
import * as PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Layout from '../components/Layout'
import { LocationContext } from '../utils/Contexts'

import components from '../components/mdx-components'

class PageTemplate extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  render() {
    const { location, data } = this.props
    const {
      title,
      description,
      contentful_id: contentfulId,
      node_locale: locale,
      content: {
        childMdx: { body }
      }
    } = data.contentfulPage

    return (
      <LocationContext.Provider
        value={{
          activeContentfulId: contentfulId,
          activeLocale: locale,
          location
        }}
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
          <MDXProvider components={components}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
          {/* {extraContent} */}
        </Layout>
      </LocationContext.Provider>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query($id: String!) {
    contentfulPage(id: { eq: $id }) {
      id
      contentful_id
      title
      slug
      description
      content {
        childMdx {
          body
        }
      }
    }
  }
`
