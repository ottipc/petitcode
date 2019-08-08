import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { GlobalContext } from '../../utils/Contexts'
import Link from './Link'

export default function BlogListing() {
  const { activeLocale } = useContext(GlobalContext)
  const blogPosts = useStaticQuery(graphql`
    query blogPosts {
      allContentfulBlogPost {
        edges {
          node {
            contentful_id
            node_locale
          }
        }
      }
    }
  `)
  return blogPosts.edges
    .filter(({ node: { node_locale: locale } }) => locale === activeLocale)
    .map(({ id, fields: { title, contentful_id: cid } }) => (
      <h3 key={id}>
        <Link contentfulId={cid}>{title}</Link>
      </h3>
    ))
}
