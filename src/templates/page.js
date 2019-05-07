import { graphql } from 'gatsby'
import React from 'react'
import * as PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { MDXProvider } from '@mdx-js/react'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

import Layout from '../components/Layout'
import { LocationContext } from '../utils/Contexts'
import DarkTheme from './themes/DarkTheme'
import DefaultTheme from './themes/DefaultTheme'

import Sections from '../components/mdx/Sections'
import Section from '../components/mdx/Section'
import SectionContent from '../components/mdx/SectionContent'
import Grid from '../components/mdx/Grid'
import Centered from '../components/mdx/Centered'
import { Columns, ColumnContent, ColumnImage } from '../components/mdx/Columns'
import { Card, CardImage, CardContent } from '../components/mdx/Card'
import {
  Carousel,
  CarouselNavigation,
  CarouselSlides,
  CarouselSlide
} from '../components/mdx/Carousel'
import KnockoutText from '../components/mdx/KnockoutText'
import Video from '../components/mdx/Video'

const components = {
  Sections,
  SectionContent,
  Section,
  Grid,
  Card,
  CardImage,
  CardContent,
  Centered,
  Columns,
  ColumnContent,
  ColumnImage,
  Carousel,
  CarouselNavigation,
  CarouselSlides,
  CarouselSlide,
  KnockoutText,
  Video
}

class PageTemplate extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired
  }

  render() {
    const {
      frontmatter: { title, description, theme },
      code: { body },
      fields: { humanId, locale }
    } = this.props.data.mdx

    let content = null
    switch (theme) {
      case 'dark':
        content = (
          <DarkTheme>
            <MDXRenderer>{body}</MDXRenderer>
          </DarkTheme>
        )
        break
      case 'sections':
        content = <MDXRenderer>{body}</MDXRenderer>
        break
      default:
        content = (
          <DefaultTheme>
            <MDXRenderer>{body}</MDXRenderer>
          </DefaultTheme>
        )
    }

    return (
      <LocationContext.Provider
        value={{ activeHumandId: humanId, activeLocale: locale }}
      >
        <Layout>
          <Helmet
            /**
             * Meta information based on:
             * https://moz.com/blog/meta-data-templates-123
             * https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html
             */
            title={title}
            meta={[
              {
                property: 'og:title',
                content: title
              },
              {
                name: 'description',
                content: description
              },
              {
                property: 'og:description',
                content: description
              }
              // heroImage && {
              //   property: 'twitter:image:src',
              //   content: `${seoImage.file.url}?w=1200&h=628&fit=fill`
              // },
              // heroImage && {
              //   property: 'og:image',
              //   content: `${seoImage.file.url}?w=1200&h=630&fit=fill`
              // }
            ].filter(Boolean)}
          />
          <MDXProvider components={components}>{content}</MDXProvider>
        </Layout>
      </LocationContext.Provider>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query($id: String!) {
    mdx(fields: { id: { eq: $id } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        theme
      }
      fields {
        slug
        humanId
        locale
      }
      code {
        body
      }
    }
  }
`
