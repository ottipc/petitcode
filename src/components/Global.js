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
      pages: allMdx {
        ...Pages
      }
      columns: allFile(
        filter: {
          sourceInstanceName: { eq: "image" }
          relativePath: { regex: "/^columns/" }
        }
      ) {
        edges {
          node {
            name
            extension
            publicURL
            childImageSharp {
              # sqip(numberOfPrimitives: 5, blur: 0) {
              #   dataURI
              # }
              fluid(maxWidth: 1152) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
      persons: allFile(
        filter: {
          sourceInstanceName: { eq: "image" }
          relativePath: { regex: "/^persons/" }
        }
      ) {
        edges {
          node {
            name
            extension
            publicURL
            childImageSharp {
              # sqip(numberOfPrimitives: 5, blur: 0) {
              #   dataURI
              # }
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
      grid: allFile(
        filter: {
          sourceInstanceName: { eq: "image" }
          relativePath: { regex: "/^grid/" }
        }
      ) {
        edges {
          node {
            name
            extension
            publicURL
            childImageSharp {
              # sqip(numberOfPrimitives: 5, blur: 0) {
              #   dataURI
              # }
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
      card: allFile(
        filter: {
          sourceInstanceName: { eq: "image" }
          relativePath: { regex: "/^card/" }
        }
      ) {
        edges {
          node {
            name
            extension
            publicURL
            childImageSharp {
              # sqip(numberOfPrimitives: 5, blur: 0) {
              #   dataURI
              # }
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
    }
  `)

  const pages = data.pages.edges.map((edge) => edge.node)

  // Make all images available as map to allow fine-tuned column image output
  const columns = data.columns.edges.reduce(
    (map, { node }) => ({
      ...map,
      [`${node.name}.${node.extension}`]: node
    }),
    {}
  )
  const persons = data.persons.edges.reduce(
    (map, { node }) => ({
      ...map,
      [`${node.name}.${node.extension}`]: node
    }),
    {}
  )
  const grid = data.grid.edges.reduce(
    (map, { node }) => ({
      ...map,
      [`${node.name}.${node.extension}`]: node
    }),
    {}
  )
  const card = data.card.edges.reduce(
    (map, { node }) => ({
      ...map,
      [`${node.name}.${node.extension}`]: node
    }),
    {}
  )
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
            columns,
            persons,
            grid,
            card,
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
