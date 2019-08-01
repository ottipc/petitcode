import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { createGlobalStyle, ThemeProvider, css } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { getCurrentLangKey } from 'ptz-i18n'

import NotoSansRegular from '../assets/fonts/notosans-regular-webfont.woff2'
import NotoSansBold from '../assets/fonts/notosans-bold-webfont.woff2'

import { GlobalContext } from '../utils/Contexts'
import theme from '../utils/styling/theme'
import i18nextInit from '../utils/i18next'
import { createLocalizedPath } from '../utils/i18n'

import { ThemeProvider as MaterialUiThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme } from '@material-ui/core/styles'
const themeColor = {
  '50': theme.colors.grey900,
  '100': theme.colors.grey800,
  '200': theme.colors.grey700,
  '300': theme.colors.grey600,
  '400': theme.colors.grey500,
  '500': theme.colors.grey400,
  '600': theme.colors.grey300,
  '700': theme.colors.grey200,
  '800': theme.colors.grey100,
  '900': theme.colors.grey000,
  A100: theme.colors.grey800,
  A200: theme.colors.grey700,
  A400: theme.colors.grey500,
  A700: theme.colors.grey200
}

const materialUiTheme = createMuiTheme({
  palette: {
    primary: themeColor,
    secondary: themeColor
  }
})

i18nextInit()

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

    line-height: 1.8em;
    /*
      Liquid typography:
      https://css-tricks.com/snippets/css/fluid-typography/
      Settings: 14-20px font size from 320-1320
    */
    ${({
      theme: {
        grid: { width }
      }
    }) => css`
      font-size: 14px;

      @media screen and (min-width: 320px) {
        font-size: calc(14px + 6 * ((100vw - 320px) / ${width - 320}));
      }

      @media screen and (min-width: ${width}px) {
        font-size: 20px;
      }
    `}
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
      background: ${({ theme }) => theme.colors.black};
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

  h1, h2, h3, h4, h5, h6 {
    line-height: 1.4;
  }


  h1, h2, h3, h4, h5, h6, p, address {
    margin-bottom: ${({ theme }) => theme.spacings.s3};

    &:last-child {
      margin-bottom: 0;
    }
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacings.s2};
  }

  pre {
    overflow: scroll;
  }

  button {
    background: transparent;
    border-radius: 0;
    border: 1px solid ${({ theme }) => theme.colors.black};
  }
`

export default function Global({ children, location }) {
  const data = useStaticQuery(graphql`
    {
      pages: allContentfulPage {
        edges {
          node {
            title
            slug
            node_locale
            contentful_id
          }
        }
      }
      jobPostings: allContentfulJobPosting {
        edges {
          node {
            title
            slug
            node_locale
          }
        }
      }
      blogPosts: allContentfulBlogPost {
        edges {
          node {
            title
            slug
            node_locale
            date
          }
        }
      }
      largeImages: allContentfulAsset(
        filter: { file: { contentType: { regex: "/^image/" } } }
      ) {
        edges {
          node {
            contentful_id
            node_locale
            title
            file {
              url
              contentType
              details {
                image {
                  width
                  height
                }
              }
            }
            fluid(maxWidth: 1152) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
      mediumImages: allContentfulAsset(
        filter: { file: { contentType: { regex: "/^image/" } } }
      ) {
        edges {
          node {
            contentful_id
            node_locale
            title
            file {
              url
              contentType
              details {
                image {
                  width
                  height
                }
              }
            }
            fluid(maxWidth: 500) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  `)

  // Create map of pages by id and with maps of their content by locale
  const pages = [
    ...data.pages.edges.map((edge) => ({ ...edge.node, contentType: 'page' })),
    ...data.jobPostings.edges.map((edge) => ({
      ...edge.node,
      contentType: 'jobPosting'
    })),
    ...data.blogPosts.edges.map((edge) => ({
      ...edge.node,
      contentType: 'blogPost'
    }))
  ].reduce((pages, page) => {
    const { contentful_id: cid, node_locale: locale, slug, contentType } = page
    let prefix = null
    if (contentType === 'blogPost') {
      prefix = 'blog'
    }
    if (contentType === 'jobPosting') {
      prefix = 'jobs'
    }
    return {
      ...pages,
      [cid]: {
        ...(pages[cid] || {}),
        [locale]: {
          ...page,
          path: createLocalizedPath({ locale, slug, prefix })
        }
      }
    }
  }, {})

  const largeImages = data.largeImages.edges.map(({ node }) => node)
  const mediumImages = data.mediumImages.edges.map(({ node }) => node)
  const { langs, defaultLocale } = useContext(GlobalContext)
  const { i18n } = useTranslation()

  const { pathname } = location
  const activeLocale = getCurrentLangKey(langs, defaultLocale, pathname)

  if (i18n.language !== activeLocale) {
    i18n.changeLanguage(activeLocale)
  }

  return (
    <MaterialUiThemeProvider theme={materialUiTheme}>
      <ThemeProvider theme={theme}>
        <GlobalContext.Provider
          value={{
            pages,
            largeImages,
            mediumImages,
            langs,
            defaultLocale,
            activeLocale,
            pathname
          }}
        >
          <CssBaseline />
          <GlobalStyle />
          {children}
        </GlobalContext.Provider>
      </ThemeProvider>
    </MaterialUiThemeProvider>
  )
}

Global.propTypes = {
  children: propTypes.node.isRequired,
  location: propTypes.object.isRequired
}
