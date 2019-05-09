import React, { useState, useContext } from 'react'
import propTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import { getCurrentLangKey } from 'ptz-i18n'
import Helmet from 'react-helmet'
import { Location } from '@reach/router'
import styled from 'styled-components'
import Observer from '@researchgate/react-intersection-observer'
import ReactCookieConsent from 'react-cookie-consent'

import Navigation from './Navigation'
import Overlays from './Overlays'
import Footer from './Footer'

import {
  NavigationContext,
  SectionContext,
  GlobalContext
} from '../utils/Contexts'

import Link from './mdx/Link'

const Wrapper = styled.div``

export default function Layout({ children }) {
  const [navigationActive, setNavigationActive] = useState(false)
  const [activeSection, setActiveSection] = useState(null)
  const [scrollToSection, setScrollToSection] = useState(null)
  const [sections, setSections] = useState([])
  const [isScrolling, setIsScrolling] = useState(false)

  const handleFooterIntersection = ({ isIntersecting }) => {
    if (isIntersecting) {
      setActiveSection(null)
    }
  }

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

  const { pages, langs, defaultLocale } = useContext(GlobalContext)

  return (
    <NavigationContext.Provider
      value={{
        toggleNavigation,
        navigationActive,
        pages
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
        <Location>
          {({ location }) => {
            const url = location.pathname
            const locale = getCurrentLangKey(langs, defaultLocale, url)
            return (
              <>
                <Helmet
                  /**
                   * Meta information based on:
                   * https://moz.com/blog/meta-data-templates-123
                   * https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html
                   */
                  htmlAttributes={{
                    lang: locale
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
                      content: `${siteUrl}${location.pathname}`
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

                <Wrapper>
                  <Overlays />
                  <Navigation navigationActive={navigationActive} />
                  <main>
                    <Observer onChange={handleIsScrollingIntersection}>
                      <div />
                    </Observer>
                    {children}
                    <Observer
                      onChange={handleFooterIntersection}
                      rootMargin={'-50% 0px'}
                    >
                      <div>
                        <Footer />
                      </div>
                    </Observer>
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
                    {`Um die Webseite und Services für Sie zu optimieren,
                          werden Cookies verwendet. Durch die weitere Nutzung
                          der Webseite stimmen Sie der `}
                    <Link
                      humanId="data-protection"
                      title="Verwendung von Cookies"
                    />
                    {` zu.`}
                  </ReactCookieConsent>
                </Wrapper>
              </>
            )
          }}
        </Location>
      </SectionContext.Provider>
    </NavigationContext.Provider>
  )
}
Layout.propTypes = {
  children: propTypes.node.isRequired
}
