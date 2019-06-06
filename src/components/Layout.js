import React, { useState } from 'react'
import propTypes from 'prop-types'

import styled, { css } from 'styled-components'
import Observer from '@researchgate/react-intersection-observer'
import ReactCookieConsent, { Cookies } from 'react-cookie-consent'
import { Trans, useTranslation } from 'react-i18next'

import Overlays from './Overlays'
import Footer from './Footer'
import Metatags from './Metatags'

import { NavigationContext, SectionContext } from '../utils/Contexts'

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
        <Metatags />
        <Wrapper hasAcceptedCookies={hasAcceptedCookies}>
          <Overlays />
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
