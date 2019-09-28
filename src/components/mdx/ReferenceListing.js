import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import { GlobalContext } from '../../utils/Contexts'
import { Grid } from '../../components/mdx/Grid'

import { MDXRenderer } from 'gatsby-plugin-mdx'

const ReferenceWrapper = styled.article`
  padding-bottom: ${({ theme }) => theme.spacings.s4};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey700};
  margin-bottom: ${({ theme }) => theme.spacings.s4};

  &:nth-of-type(even) .switching-grid {
    direction: rtl;
  }
`

const ReferenceSubWrapper = styled.div`
  direction: ltr;
`

const ReferenceHeadline = styled.h1`
  font-size: 1.3em;
  margin-bottom: ${({ theme }) => theme.spacings.s1};
`
const ReferenceIndustry = styled.div`
  margin-bottom: ${({ theme }) => theme.spacings.s1};
`
const ReferenceTags = styled.div`
  margin-bottom: ${({ theme }) => theme.spacings.s1};
`

const ReferenceSubHeadline = styled.div`
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 0;
`

const ReferenceSubContent = styled.div`
  margin-bottom: ${({ theme }) => theme.spacings.s2};
`

const ReferenceImageWrapper = styled.div`
  & img {
    filter: none;
  }
`

export default function ReferenceListing() {
  const { activeLocale } = useContext(GlobalContext)
  const references = useStaticQuery(graphql`
    query referenceListing {
      allContentfulReference {
        edges {
          node {
            id
            contentful_id
            node_locale
            projectType
            client
            industry
            tags
            link
            challenge {
              childMdx {
                body
              }
            }
            solution {
              childMdx {
                body
              }
            }
            result {
              childMdx {
                body
              }
            }
            description {
              childMdx {
                body
              }
            }
            media {
              fluid(maxWidth: 1086) {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      }
    }
  `)
  return references.allContentfulReference.edges
    .filter(({ node: { node_locale: locale } }) => locale === activeLocale)
    .map(
      ({
        node: {
          id,
          projectType,
          client,
          industry,
          tags,
          challenge,
          solution,
          result,
          description,
          media
        }
      }) => {
        return (
          <ReferenceWrapper key={id}>
            <ReferenceHeadline>
              {projectType} for {client}:
            </ReferenceHeadline>
            {industry && (
              <ReferenceIndustry>
                <strong>Industry:</strong> {industry}
              </ReferenceIndustry>
            )}
            <ReferenceTags>
              {tags && tags.length && tags.map((tag) => `#${tag}`).join(' ')}
            </ReferenceTags>
            <Grid className="switching-grid">
              {media && (
                <ReferenceImageWrapper>
                  <Img fluid={media[0].fluid} alt={client} />
                </ReferenceImageWrapper>
              )}
              <ReferenceSubWrapper>
                {challenge && challenge.childMdx && (
                  <div>
                    <ReferenceSubHeadline>The challenge:</ReferenceSubHeadline>
                    <ReferenceSubContent>
                      <MDXRenderer>{challenge.childMdx.body}</MDXRenderer>
                    </ReferenceSubContent>
                  </div>
                )}
                {solution && solution.childMdx && (
                  <div>
                    <ReferenceSubHeadline>The solution:</ReferenceSubHeadline>
                    <ReferenceSubContent>
                      <MDXRenderer>{solution.childMdx.body}</MDXRenderer>
                    </ReferenceSubContent>
                  </div>
                )}
                {result && result.childMdx && (
                  <div>
                    <ReferenceSubHeadline>The result:</ReferenceSubHeadline>
                    <ReferenceSubContent>
                      <MDXRenderer>{result.childMdx.body}</MDXRenderer>
                    </ReferenceSubContent>
                  </div>
                )}
              </ReferenceSubWrapper>
            </Grid>
            {description && description.childMdx && (
              <MDXRenderer>{description.childMdx.body}</MDXRenderer>
            )}
          </ReferenceWrapper>
        )
      }
    )
}
