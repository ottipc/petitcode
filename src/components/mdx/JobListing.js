import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { GlobalContext } from '../../utils/Contexts'
// import Link from './Link'

export default function JobListing() {
  const { activeLocale } = useContext(GlobalContext)
  const jobPostings = useStaticQuery(graphql`
    query jobPostings {
      allContentfulJobPosting {
        edges {
          node {
            id
            contentful_id
            node_locale
            title
          }
        }
      }
    }
  `)
  return jobPostings.allContentfulJobPosting.edges
    .filter(({ node: { node_locale: locale } }) => locale === activeLocale)
    .map(({ node: { id, title, contentful_id: cid } }) => (
      <h3 key={id}>{title}</h3>
    ))
}
