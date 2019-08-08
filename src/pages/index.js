import React from 'react'
import propTypes from 'prop-types'
import { graphql, navigate, withPrefix } from 'gatsby'
import { getUserLangKey } from 'ptz-i18n'

import Metatags from '../components/Metatags'
import Link from '../components/mdx/Link'

export default function RedirectIndex({ data }) {
  // Redirect browser users
  if (typeof window !== 'undefined') {
    const { langs, defaultLocale } = data.site.siteMetadata.languages
    const locale = getUserLangKey(langs, defaultLocale)
    const homeUrl = withPrefix(`/${locale}/`)

    // I don`t think this is the best solution
    // I would like to use Gatsby Redirects like:
    // https://github.com/gatsbyjs/gatsby/tree/master/examples/using-redirects
    // But Gatsby Redirects are static, they need to be specified at build time,
    // This redirect is dynamic, It needs to know the user browser language.
    // Any ideias? Join the issue: https://github.com/angeloocana/gatsby-starter-default-i18n/issues/4
    navigate(homeUrl)
  }

  // Server side rendering
  return (
    <>
      <Metatags />
      <p>You will be redirected...</p>
      <p>If this does not work, you may visit</p>
      <p>
        <Link href="/en/">Petitcode in English</Link>
      </p>
      <p>
        <Link href="/de/">Petitcode in German</Link>
      </p>
    </>
  )
}

RedirectIndex.propTypes = {
  data: propTypes.object.isRequired
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        languages {
          defaultLocale
          langs
        }
      }
    }
  }
`

export const petitcodeFragment = graphql`
  fragment Metadata on Site {
    siteMetadata {
      languages {
        defaultLocale
        langs
      }
    }
  }
`
