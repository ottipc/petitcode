import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import { GlobalContext } from '../../utils/Contexts'
import Link from './Link'

const BlogListingWrapper = styled.div`
  display: grid;
  grid-gap: ${({ theme }) => theme.spacings.s2};
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
`

const BlogPostWrapper = styled.article`
  padding-bottom: ${({ theme }) => theme.spacings.s4};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey600};
  margin-bottom: ${({ theme }) => theme.spacings.s4};
`
const BlogPostMedia = styled.div`
  margin-bottom: ${({ theme }) => theme.spacings.s2};
`
const BlogPostContent = styled.div``
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
const BlogPostTeaser = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacings.s2};
`

const BlogPostTeaserOverlayLink = styled(Link)`
  position: static;
`

const BlogPostTeaserOverlay = styled.div`
  position: absolute;
  top: 50%;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 100%
  );
`

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
            category
            teaser {
              childMdx {
                body
              }
            }
            media {
              fluid(maxWidth: 640, maxHeight: 360) {
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
  return (
    <BlogListingWrapper>
      {blogPosts.allContentfulBlogPost.edges
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
                  <BlogPostTitle>
                    <Link className="nohover" contentfulId={cid}>
                      {title}
                    </Link>
                  </BlogPostTitle>
                  <BlogPostMeta>{meta}</BlogPostMeta>
                  <BlogPostTeaser>
                    <MDXRenderer>{teaser.childMdx.body}</MDXRenderer>
                    <BlogPostTeaserOverlayLink
                      className="nohover"
                      contentfulId={cid}
                    >
                      <BlogPostTeaserOverlay />
                    </BlogPostTeaserOverlayLink>
                  </BlogPostTeaser>
                  <Link type="CTA" contentfulId={cid}>
                    Read More
                  </Link>
                </BlogPostContent>
              </BlogPostWrapper>
            )
          }
        )}
    </BlogListingWrapper>
  )
}
