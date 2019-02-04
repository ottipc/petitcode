import { graphql } from 'gatsby'
import React from 'react'
import * as PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

import Layout from '../components/Layout'
import PageContext from '../utils/PageContext'

const VideoWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
`
const Video = styled.video``

class PageTemplate extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  render() {
    const {
      frontmatter: { title, description },
      code: { body },
      fields: { humanId, locale }
    } = this.props.data.mdx

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
          <VideoWrapper>
            <Video autoPlay loop>
              <source
                src="//videos.ctfassets.net/pbrj6jtwg849/j7qCb94g9yMOi8MYIw40U/405d516b9e9cb3557906237cab5836be/SaaS_Video_3.mp4"
                type="video/mp4"
              />
            </Video>
          </VideoWrapper>
          <MDXRenderer>{body}</MDXRenderer>
          {/* <ContentWrapper /> */}
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
