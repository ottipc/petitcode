import { graphql } from 'gatsby'
import React from 'react'
import * as PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import styled from 'styled-components'

import Layout from '../components/Layout'
import { LocationContext } from '../utils/Contexts'
import components from '../components/mdx-components'
import MdxLink from '../components/mdx/Link'
import { useTranslation } from 'react-i18next'

const JobPostingWrapper = styled.div`
  padding-top: ${({ theme }) =>
    theme.elements.headerHeight + parseInt(theme.spacings.s2)}px;
`
const JobPostingContent = styled.div`
  /* stolen from section content, consider merging */
  width: 100%;
  max-width: ${({ theme }) => theme.grid.width}px;
  margin: 0 auto;
  padding: 10vh ${({ theme }) => theme.spacing.content.default};
  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    padding: 10vh ${({ theme }) => theme.spacing.content.medium};
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    padding: 10vh ${({ theme }) => theme.spacing.content.large};
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.huge}) {
    padding: 10vh ${({ theme }) => theme.spacing.content.huge};
  }
`
const JobPostingTitle = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacings['s0.5']};
`
const JobPostingMeta = styled.div`
  margin-bottom: ${({ theme }) => theme.spacings.s2};
  color: ${({ theme }) => theme.colors.grey400};
`
const JobPostingMainContent = styled.div`
  margin-bottom: ${({ theme }) => theme.spacings.s4};
`

const JobPostingMdxSection = styled.div`
  margin-top: ${({ theme }) => theme.spacings.s6};
`

const JobPostingTemplate = ({ data, location }) => {
  const { t } = useTranslation()
  const {
    title,
    type,
    industry,
    date,
    duration,
    location: jobLocation,
    contentful_id: contentfulId,
    node_locale: locale,
    description,
    tasks,
    skills,
    benefits,
    pricePerHour,
    pricePerYear,
    commission,
    referredBy
  } = data.contentfulJobPosting

  const metatext = [
    type === 'FTE' ? t('Full Time Employment') : t('Freelance'),
    industry,
    date && duration
      ? t('JobPostingMetaDateAndDuration', { date, duration })
      : date,
    jobLocation && t('JobPostingMetaLocation', { jobLocation }),
    pricePerHour && t('JobPostingMetaPPH', { pricePerHour }),
    pricePerYear && t('JobPostingMetaPPY', { pricePerYear }),
    commission && t('JobPostingMetaCommission', { commission }),
    referredBy && t('JobPostingMetaReferredBy', { referredBy })
  ]
    .filter(Boolean)
    .join(' | ')

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
          title={title}
          meta={[
            {
              property: 'og:title',
              content: title
            },
            {
              name: 'description',
              content: metatext
            },
            {
              property: 'og:description',
              content: metatext
            }
          ].filter(Boolean)}
        />
        <JobPostingWrapper>
          <JobPostingContent>
            <JobPostingTitle>{title}</JobPostingTitle>
            <JobPostingMeta>{metatext}</JobPostingMeta>
            <JobPostingMainContent>
              <MDXProvider components={components}>
                {description && (
                  <JobPostingMdxSection>
                    <h2>{t('Company / Project / Client Description')}</h2>
                    <MDXRenderer>{description.childMdx.body}</MDXRenderer>
                  </JobPostingMdxSection>
                )}
                {skills && (
                  <JobPostingMdxSection>
                    <h2>{t('Your skills')}</h2>
                    <MDXRenderer>{skills.childMdx.body}</MDXRenderer>
                  </JobPostingMdxSection>
                )}
                {benefits && (
                  <JobPostingMdxSection>
                    <h2>
                      {t('Benefits of working with Company / Project / Client')}
                    </h2>
                    <MDXRenderer>{benefits.childMdx.body}</MDXRenderer>
                  </JobPostingMdxSection>
                )}
                {tasks && (
                  <JobPostingMdxSection>
                    <h2>{t('What you will do at the company')}</h2>
                    <MDXRenderer>{tasks.childMdx.body}</MDXRenderer>
                  </JobPostingMdxSection>
                )}
              </MDXProvider>
            </JobPostingMainContent>
            <MdxLink type="CTA" contentfulId="Ezme8PAhPlfrFV77vHXig">
              Back
            </MdxLink>
          </JobPostingContent>
        </JobPostingWrapper>
      </Layout>
    </LocationContext.Provider>
  )
}

JobPostingTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default JobPostingTemplate

export const pageQuery = graphql`
  query($id: String!) {
    contentfulJobPosting(id: { eq: $id }) {
      id
      contentful_id
      node_locale
      slug
      title
      industry
      duration
      date(formatString: "MMM. 'YY")
      location
      type
      referredBy
      pricePerHour
      pricePerYear
      commission
      description {
        childMdx {
          body
        }
      }
      tasks {
        childMdx {
          body
        }
      }
      skills {
        childMdx {
          body
        }
      }
      benefits {
        childMdx {
          body
        }
      }
    }
  }
`
