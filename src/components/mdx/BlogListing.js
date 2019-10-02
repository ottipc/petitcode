import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import { GlobalContext } from '../../utils/Contexts'
import Link from './Link'

const BlogPostWrapper = styled.article`
  padding-bottom: ${({ theme }) => theme.spacings.s4};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey700};
  margin-bottom: ${({ theme }) => theme.spacings.s4};
`
const BlogPostMedia = styled.div``
const BlogPostContent = styled.div``
const BlogPostCategory = styled.div``
const BlogPostTitle = styled.h1``
const BlogPostMeta = styled.div``
const BlogPostTeaser = styled.div``

export default function BlogListing() {
  const { activeLocale } = useContext(GlobalContext)
  const blogPosts = useStaticQuery(graphql`
    query blogPosts {
      allContentfulBlogPost {
        edges {
          node {
            id
            contentful_id
            node_locale
            slug
            title
            date(formatString: "DD.MM.YYYY")
            author
            teaser {
              childMdx {
                body
              }
            }
            media {
              fluid(maxWidth: 1152, maxHeight: 400) {
                ...GatsbyContentfulFluid
              }
            }
            content {
              childMdx {
                timeToRead
              }
            }
          }
        }
      }
    }
  `)
  return blogPosts.allContentfulBlogPost.edges
    .filter(({ node: { node_locale: locale } }) => locale === activeLocale)
    .map(
      ({
        node: {
          id,
          title,
          contentful_id: cid,
          media,
          category,
          teaser,
          content,
          date,
          author
        }
      }) => {
        if (!title) {
          return null
        }
        const meta = [
          date,
          `${content.childMdx.timeToRead}min read`,
          `by ${author}`
        ]
          .filter(Boolean)
          .join(' - ')
        return (
          <BlogPostWrapper key={id}>
            <BlogPostMedia>
              <Img fluid={media.fluid} alt={title} />
            </BlogPostMedia>
            <BlogPostContent>
              <BlogPostCategory>{category}</BlogPostCategory>
              <BlogPostTitle>{title}</BlogPostTitle>
              <BlogPostMeta>{meta}</BlogPostMeta>
              <BlogPostTeaser>
                <MDXRenderer>{teaser.childMdx.body}</MDXRenderer>
              </BlogPostTeaser>
              <Link contentfulId={cid}>Read More</Link>
            </BlogPostContent>
          </BlogPostWrapper>
        )
      }
    )
}
