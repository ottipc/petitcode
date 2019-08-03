import { graphql } from 'gatsby'
import React from 'react'
import * as PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Layout from '../components/Layout'
import { LocationContext } from '../utils/Contexts'

import Sections from '../components/mdx/Sections'
import Section from '../components/mdx/Section'
import SectionContent from '../components/mdx/SectionContent'
import { Grid, GridImage } from '../components/mdx/Grid'
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
import Person from '../components/mdx/Person'
import Link from '../components/mdx/Link'
import ClientForm from '../components/mdx/ClientForm'
import FreelancerForm from '../components/mdx/FreelancerForm'
import { Timeline, TimelineEntry } from '../components/mdx/Timeline'
import BlogListing from '../components/mdx/BlogListing'
import JobListing from '../components/mdx/JobListing'
import Gap from '../components/mdx/Gap'
import FluidText from '../components/mdx/FluidText'
import DefaultLayout from '../components/mdx/DefaultLayout'

import FormIntro from '../components/forms/FormIntro'
import FormSuccess from '../components/forms/FormSuccess'

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
  Video,
  Person,
  Link,
  ClientForm,
  GridImage,
  FreelancerForm,
  FormIntro,
  FormSuccess,
  Timeline,
  TimelineEntry,
  JobListing,
  BlogListing,
  Gap,
  FluidText,
  DefaultLayout
}

class PageTemplate extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  render() {
    const { location, data } = this.props
    const {
      title,
      description,
      contentful_id: contentfulId,
      node_locale: locale,
      content: {
        childMdx: { body }
      }
    } = data.contentfulPage

    // let extraContent = null
    // switch (slug) {
    //   case 'jobs':
    //     extraContent = (
    //       <SectionContent>
    //         <GridWrapper>
    //           <JobListing />
    //         </GridWrapper>
    //       </SectionContent>
    //     )
    //     break
    //   case 'blog':
    //     extraContent = (
    //       <SectionContent>
    //         <GridWrapper>
    //           <BlogListing />
    //         </GridWrapper>
    //       </SectionContent>
    //     )
    // }

    return (
      <LocationContext.Provider
        value={{
          activeContentfulId: contentfulId,
          activeLocale: locale,
          location
        }}
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
          <MDXProvider components={components}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
          {/* {extraContent} */}
        </Layout>
      </LocationContext.Provider>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query($id: String!) {
    contentfulPage(id: { eq: $id }) {
      id
      contentful_id
      title
      slug
      description
      content {
        childMdx {
          body
        }
      }
    }
  }
`
