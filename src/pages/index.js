import React from 'react'
import { graphql, navigate, withPrefix } from 'gatsby'
import { getUserLangKey } from 'ptz-i18n'

class RedirectIndex extends React.PureComponent {
  constructor(args) {
    super(args)

    // Skip build, Browsers only
    if (typeof window !== 'undefined') {
      const { langs, defaultLocale } = args.data.site.siteMetadata.languages
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
  }

  render() {
    return <div />
  }
}

export default RedirectIndex

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
  fragment Pages on MdxConnection {
    edges {
      node {
        id
        fields {
          humanId
          slug
          locale
          title
          description
          # teaser
        }
        parent {
          ... on File {
            sourceInstanceName
          }
        }
      }
    }
  }
`
