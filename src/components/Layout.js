import React, { useState, useContext } from 'react'
import propTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import Helmet from 'react-helmet'
import styled, { css } from 'styled-components'
import Observer from '@researchgate/react-intersection-observer'
import ReactCookieConsent, { Cookies } from 'react-cookie-consent'
import { Trans, useTranslation } from 'react-i18next'

import Navigation from './Navigation'
import Overlays from './Overlays'
import Footer from './Footer'

import {
  NavigationContext,
  SectionContext,
  GlobalContext
} from '../utils/Contexts'

import Link from './mdx/Link'

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.bg};
  ${({ hasAcceptedCookies }) =>
    !hasAcceptedCookies &&
    css`
      padding-bottom: 6em;
    `}
`

export default function Layout({ children }) {
  const [navigationActive, setNavigationActive] = useState(false)
  const [activeSection, setActiveSection] = useState(null)
  const [scrollToSection, setScrollToSection] = useState(null)
  const [sections, setSections] = useState([])
  const [isScrolling, setIsScrolling] = useState(false)

  const handleIsScrollingIntersection = ({ isIntersecting }) => {
    setIsScrolling(!isIntersecting)
  }

  const toggleNavigation = () => {
    setNavigationActive(!navigationActive)
  }
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
  const { t } = useTranslation()

  const hasAcceptedCookies = !!Cookies.get('CookieConsent')

  return (
    <NavigationContext.Provider
      value={{
        toggleNavigation,
        navigationActive
      }}
    >
      <SectionContext.Provider
        value={{
          sections,
          activeSection,
          setActiveSection,
          setSections,
          scrollToSection,
          setScrollToSection,
          isScrolling,
          setIsScrolling
        }}
      >
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
              content: '/social.png'
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

        <Wrapper hasAcceptedCookies={hasAcceptedCookies}>
          <Overlays />
          <Navigation navigationActive={navigationActive} />
          <main>
            <Observer onChange={handleIsScrollingIntersection}>
              <div />
            </Observer>
            {children}
            <Footer />
          </main>
          <ReactCookieConsent
            buttonText="Ok"
            style={{
              zIndex: 1200,
              fontSize: '0.7em'
            }}
            buttonStyle={{
              background: 'white',
              color: 'black',
              borderRadius: '3px',
              border: 'none',
              padding: '0 5px'
            }}
          >
            <Trans i18nKey="cookieConsent">
              {`Um die Webseite und Services für Sie zu optimieren,
                          werden Cookies verwendet. Durch die weitere Nutzung
                          der Webseite stimmen Sie der `}
              <Link
                humanId="data-protection"
                id="6Rfk2Hlf44SASEIcYsgq8e"
                title={t('cookieConsentLink')}
              />
              {` zu.`}
            </Trans>
          </ReactCookieConsent>
        </Wrapper>
      </SectionContext.Provider>
    </NavigationContext.Provider>
  )
}
Layout.propTypes = {
  children: propTypes.node.isRequired
}
