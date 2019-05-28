import React, { useContext } from 'react'
import { GlobalContext } from '../utils/Contexts'
import Link from './mdx/Link'

export default function JobListing() {
  const { pages, activeLocale } = useContext(GlobalContext)
  const blogposts = pages
    .filter(
      ({ parent: { sourceInstanceName } }) => sourceInstanceName === 'blog'
    )
    .filter(({ fields: { locale } }) => locale === activeLocale)
    .map(({ id, fields: { title, humanId } }) => (
      <h3 key={id}>
        <Link humanId={humanId}>{title}</Link>
      </h3>
    ))
  return blogposts
}
