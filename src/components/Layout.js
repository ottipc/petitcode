import React from 'react'
import propTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import { getCurrentLangKey } from 'ptz-i18n'
import Helmet from 'react-helmet'
import { Location } from '@reach/router'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'

import Navigation from './Navigation'
import Overlays from './Overlays'
import theme from '../utils/styling/theme'
import { NavigationContext, SectionContext } from '../utils/Contexts'

// Rare global style, mostly for text formatting and normalizing.
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.bg};
  }

  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  h1, h2, h3, h4, h5, h6, p {
    &:last-child {
      margin-bottom: 0;
    }
  }
`

const Wrapper = styled.div``

export default class Layout extends React.Component {
  static propTypes = {
    children: propTypes.node.isRequired
  }

  state = {
    navigationActive: false,
    activeSection: null,
    scrollToSection: null,
    sections: []
  }

  setSections = (sections) => {
    this.setState({ sections })
  }
  setActiveSection = (activeSection) => {
    this.setState({ activeSection })
  }
  setScrollToSection = (scrollToSection) => {
    this.setState({ scrollToSection })
  }

  toggleNavigation = () => {
    this.setState(({ navigationActive }) => ({
      navigationActive: !navigationActive
    }))
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    // Only rerender when state truely changed
    if (JSON.stringify(nextState) === JSON.stringify(this.state)) {
      return false
    }
    return true
  }

  render() {
    const { children } = this.props
    const {
      navigationActive,
      sections,
      activeSection,
      scrollToSection
    } = this.state
    const {
      toggleNavigation,
      setActiveSection,
      setSections,
      setScrollToSection
    } = this

    return (
      <NavigationContext.Provider
        value={{ toggleNavigation, navigationActive }}
      >
        <SectionContext.Provider
          value={{
            sections,
            activeSection,
            setActiveSection,
            setSections,
            scrollToSection,
            setScrollToSection
          }}
        >
          <StaticQuery
            query={graphql`
              query LayoutQuery {
                site {
                  siteMetadata {
                    title
                    description
                  }
                  ...Metadata
                }
                allMdx {
                  ...Pages
                }
              }
            `}
            render={(data) => {
              const {
                siteMetadata: {
                  siteUrl,
                  languages: { langs, defaultLocale }
                }
              } = data.site

              return (
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
                          title={data.site.siteMetadata.title}
                          meta={[
                            {
                              name: 'description',
                              content: data.site.siteMetadata.description
                            },
                            {
                              name: 'twitter:card',
                              value: 'summary'
                            },
                            {
                              property: 'og:title',
                              content: data.site.siteMetadata.title
                            },
                            { property: 'og:type', content: 'website' },
                            {
                              property: 'og:url',
                              content: `${siteUrl}${location.pathname}`
                            },
                            {
                              property: 'og:description',
                              content: data.site.siteMetadata.description
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
                        <ThemeProvider theme={theme}>
                          <Wrapper>
                            <GlobalStyle />
                            <Overlays />
                            <Navigation navigationActive={navigationActive} />
                            <main>{children}</main>
                          </Wrapper>
                        </ThemeProvider>
                      </>
                    )
                  }}
                </Location>
              )
            }}
          />
        </SectionContext.Provider>
      </NavigationContext.Provider>
    )
  }
}
