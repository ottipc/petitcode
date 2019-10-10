import { graphql } from 'gatsby'
import React from 'react'
import * as PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import styled from 'styled-components'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import { LocationContext } from '../utils/Contexts'
import components from '../components/mdx-components'

const BlogPostWrapper = styled.div``
const BlogPostMedia = styled.div``
const BlogPostContent = styled.div`
  /* stolen from section content, consider merging */
  width: 100%;
  max-width: ${({ theme }) => theme.grid.width}px;
  margin: 0 auto;
  padding: 10vh ${({ theme }) => theme.spacing.content.default};
  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    padding: 10vh ${({ theme }) => theme.spacing.content.medium};
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    padding: 10vh ${({ theme }) => theme.spacing.content.large};
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.huge}) {
    padding: 10vh ${({ theme }) => theme.spacing.content.huge};
  }
`
const BlogPostCategory = styled.div`
  color: ${({ theme }) => theme.colors.grey400};
  text-transform: uppercase;
`
const BlogPostTitle = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacings['s0.5']};
`
const BlogPostMeta = styled.div`
  margin-bottom: ${({ theme }) => theme.spacings.s2};
  color: ${({ theme }) => theme.colors.grey400};
`
const BlogPostTeaser = styled.div``

class BlogTemplate extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  render() {
    const { location, data } = this.props
    const {
      title,
      date,
      author,
      contentful_id: contentfulId,
      node_locale: locale,
      content: {
        childMdx: { body, timeToRead }
      },
      media,
      category
    } = data.contentfulBlogPost

    const meta = [date, `${timeToRead}min read`, `by ${author}`]
      .filter(Boolean)
      .join(' - ')

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
              }
              // {
              //   name: 'description',
              //   content: description
              // },
              // {
              //   property: 'og:description',
              //   content: description
              // }
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
          <BlogPostWrapper>
            <BlogPostMedia>
              <Img fluid={media.fluid} alt={title} />
            </BlogPostMedia>
            <BlogPostContent>
              <BlogPostCategory>{category}</BlogPostCategory>
              <BlogPostTitle>{title}</BlogPostTitle>
              <BlogPostMeta>{meta}</BlogPostMeta>
              <BlogPostTeaser>
                <MDXProvider components={components}>
                  <MDXRenderer>{body}</MDXRenderer>
                </MDXProvider>
              </BlogPostTeaser>
            </BlogPostContent>
          </BlogPostWrapper>
        </Layout>
      </LocationContext.Provider>
    )
  }
}

export default BlogTemplate

export const pageQuery = graphql`
  query($id: String!) {
    contentfulBlogPost(id: { eq: $id }) {
      id
      contentful_id
      node_locale
      slug
      title
      date(formatString: "DD.MM.YYYY")
      author
      category
      content {
        childMdx {
          body
          timeToRead
        }
      }
      media {
        fluid(maxWidth: 1152, maxHeight: 400) {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`
