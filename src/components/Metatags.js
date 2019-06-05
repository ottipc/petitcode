import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Helmet from 'react-helmet'

import { GlobalContext } from '../utils/Contexts'

export default function Metatags() {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `)

  const {
    siteMetadata: { title, description, siteUrl }
  } = data.site

  const { activeLocale, pathname } = useContext(GlobalContext)

  return (
    <Helmet
      /**
       * Meta information based on:
       * https://moz.com/blog/meta-data-templates-123
       * https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html
       */
      htmlAttributes={{
        lang: activeLocale
      }}
      title={title}
      meta={[
        {
          name: 'description',
          content: description
        },
        {
          name: 'twitter:card',
          value: 'summary'
        },
        {
          property: 'og:title',
          content: title
        },
        { property: 'og:type', content: 'website' },
        {
          property: 'og:url',
          content: `${siteUrl}${pathname}`
        },
        {
          property: 'og:description',
          content: description
        },
        {
          property: 'og:image',
          content: `${siteUrl}/social.png`
        },
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes'
        },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black-translucent'
        },
        {
          name: 'format-detection',
          content: 'telephone=no'
        }
      ]}
    />
  )
}
