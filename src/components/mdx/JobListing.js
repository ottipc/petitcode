import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { GlobalContext } from '../../utils/Contexts'
import Link from './Link'

export default function JobListing() {
  const { activeLocale } = useContext(GlobalContext)
  const jobPostings = useStaticQuery(graphql`
    query jobPostings {
      allContentfulJobPosting {
        edges {
          node {
            contentful_id
            node_locale
          }
        }
      }
    }
  `)
  return jobPostings.edges
    .filter(({ node: { node_locale: locale } }) => locale === activeLocale)
    .map(({ id, fields: { title, contentful_id: cid } }) => (
      <h3 key={id}>
        <Link contentfulId={cid}>{title}</Link>
      </h3>
    ))
}
