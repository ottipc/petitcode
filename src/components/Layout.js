import React from 'react'
import propTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import { getCurrentLangKey } from 'ptz-i18n'
import Helmet from 'react-helmet'
import { Location } from '@reach/router'
import styled, {
  css,
  createGlobalStyle,
  ThemeProvider
} from 'styled-components'

import Header from './Header'
import Footer from './Footer'
import Navigation from './Navigation'
import theme from '../utils/styling/theme'

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

const Hamburger = styled.button`
  position: fixed;
  z-index: 10010;
  top: 50%;
  right: 0;
  transform: translateY(-50%);

  padding: 15px 15px;
  display: block;
  cursor: pointer;
  transition-property: opacity, filter;
  transition-duration: 0.15s;
  transition-timing-function: linear;
  font: inherit;
  color: #000;
  text-transform: none;
  background-color: transparent;
  border: 0;
  margin: 0;
  overflow: visible;
  transform: scale(0.8);

  &:focus {
    outline: none;
  }

  ${({ menuActive }) =>
    menuActive &&
    css`
      &:hover {
        opacity: 0.7;
      }
      & > span > span,
      & > span > span::before,
      & > span > span::after {
        background-color: #fff;
      }
      & > span > span::before {
        transform: translate3d(8px, 0, 0) rotate(45deg) scale(0.7, 1);
      }

      & > span > span::after {
        transform: translate3d(8px, 0, 0) rotate(-45deg) scale(0.7, 1);
      }
    `};
`

const HamburgerBox = styled.span`
  width: 40px;
  height: 24px;
  display: block;
  position: relative;
`

const HamburgerInner = styled.span`
  display: block;
  top: 50%;
  margin-top: -2px;
  &,
  &::before,
  &::after {
    width: 40px;
    height: 4px;
    background-color: #000;
    border-radius: 4px;
    position: absolute;
    transition-property: transform;
    transition-duration: 0.15s;
    transition-timing-function: ease;
  }
  &::before,
  &::after {
    content: '';
    display: block;
  }
  &::before {
    top: -10px;
  }
  &::after {
    bottom: -10px;
  }
`

const Wrapper = styled.div`
  transition: 0.3s transform linear;
`

export default class Layout extends React.PureComponent {
  static propTypes = {
    children: propTypes.node.isRequired
  }

  state = {
    menuActive: false
  }

  toggleMobileMenu = () => {
    this.setState(({ menuActive }) => ({
      menuActive: !menuActive
    }))
  }

  render() {
    const { children } = this.props
    const { menuActive } = this.state
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
                        <Header />
                        <Navigation menuActive={menuActive} />
                        <Hamburger
                          onClick={this.toggleMobileMenu}
                          menuActive={menuActive}
                          titleAccess="Open menu"
                        >
                          <HamburgerBox>
                            <HamburgerInner />
                          </HamburgerBox>
                        </Hamburger>
                        <main>{children}</main>
                        <Footer location={location} />
                      </Wrapper>
                    </ThemeProvider>
                  </>
                )
              }}
            </Location>
          )
        }}
      />
    )
  }
}
