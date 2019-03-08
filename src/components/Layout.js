import React from 'react'
import propTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import { getCurrentLangKey } from 'ptz-i18n'
import Helmet from 'react-helmet'
import { Location } from '@reach/router'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import Observer from '@researchgate/react-intersection-observer'
import ReactCookieConsent from 'react-cookie-consent'

import Navigation from './Navigation'
import Overlays from './Overlays'
import theme from '../utils/styling/theme'
import { NavigationContext, SectionContext } from '../utils/Contexts'

import NotoSansRegular from '../assets/fonts/notosans-regular-webfont.woff2'
import NotoSansBold from '../assets/fonts/notosans-bold-webfont.woff2'
import MenuItem from './MenuItem'

// Rare global style, mostly for text formatting and normalizing.
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Noto Sans';
    src: local('Noto Sans Bold'), url(${NotoSansBold}) format('woff2');
    font-weight: bold;
    font-style: normal;

  }

  @font-face {
    font-family: 'Noto Sans';
    src: local('Noto Sans'), url(${NotoSansRegular}) format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  body {
    background-color: ${({ theme }) => theme.colors.bg};
  }

  a {
    position: relative;
    display: inline-block;
    color: inherit;
    text-decoration: none;

    &:after {
      content: '';
      display: block;
      height: 1px;
      background: #000;
      width: 0;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      transition: width 0.1s ease-in-out;
    }

    &[aria-current='page'] {
      &:after {
        width: 80%;
      }
    }
    &:hover {
      text-decoration: none;
      &:after {
        width: 110%;
      }
    }

    &.nohover {
      &:after {
        display: none !important;
      }
    }
  }

  h1, h2, h3, h4, h5, h6, p {
    &:last-child {
      margin-bottom: 0;
    }
  }

  pre {
    overflow: scroll;
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
    sections: [],
    scrolledDown: false
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

  handleIntersection = ({ isIntersecting: scrolledDown }) => {
    this.setState({ scrolledDown })
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
      scrollToSection,
      scrolledDown
    } = this.state
    const {
      toggleNavigation,
      setActiveSection,
      setSections,
      setScrollToSection
    } = this

    return (
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
          const { edges } = data.allMdx

          const pages = edges.map((edge) => edge.node)

          return (
            <NavigationContext.Provider
              value={{
                toggleNavigation,
                navigationActive,
                scrolledDown,
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
                  setScrollToSection
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
                            <main>
                              {children}
                              <Observer
                                onChange={this.handleIntersection}
                                rootMargin="0px 0px 100px 0px"
                              >
                                <div />
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
                              <MenuItem
                                humanId="data-protection"
                                title="Verwendung von Cookies"
                              />
                              {` zu.`}
                            </ReactCookieConsent>
                          </Wrapper>
                        </ThemeProvider>
                      </>
                    )
                  }}
                </Location>
              </SectionContext.Provider>
            </NavigationContext.Provider>
          )
        }}
      />
    )
  }
}
