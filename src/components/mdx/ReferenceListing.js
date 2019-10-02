import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import { GlobalContext } from '../../utils/Contexts'
import { Grid } from '../../components/mdx/Grid'
import Image from './Image'
import PetitcodeLogo from '../../assets/petitcode-logo.svg'

import { MDXRenderer } from 'gatsby-plugin-mdx'

const ReferenceWrapper = styled.article`
  padding-bottom: ${({ theme }) => theme.spacings.s4};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey700};
  margin-bottom: ${({ theme }) => theme.spacings.s4};
`

const ReferenceSubWrapper = styled.div`
  direction: ltr;
`

const ReferenceHeadline = styled.h1`
  font-size: 2em;
  margin-bottom: ${({ theme }) => theme.spacings['s0.5']};
`

const ReferenceMeta = styled.div`
  display: flex;
  margin: 0 -${({ theme }) => theme.spacings['s0.5']};
  color: ${({ theme }) => theme.colors.grey500};

  & > * {
    margin: 0 ${({ theme }) => theme.spacings['s0.5']}};
  }
`

const ReferenceProjectType = styled.div``

const ReferenceIndustry = styled.div`
  margin-bottom: ${({ theme }) => theme.spacings.s1};
`

const ReferenceSubHeadline = styled.div`
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 0;
`

const ReferenceSubContent = styled.div`
  margin-bottom: ${({ theme }) => theme.spacings.s1};
`

const ReferenceImageWrapper = styled.div`
  & img {
    filter: none;
  }
`

const ReferenceTags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.3em ${({ theme }) => theme.spacings.s3};
  list-style: none;
`
const ReferenceTag = styled.li`
  padding: 0 1em;
  margin: 0 0.3em ${({ theme }) => theme.spacings.s1};
  border-radius: 1em;
  background: ${({ theme }) => theme.colors.grey600};
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.8em;
  line-height: 2em;
`

const ReferenceDescription = styled.div`
  margin: ${({ theme }) => theme.spacings.s4} 0 0;
`

const ReferenceFallbackImageWrapper = styled.div`
  background: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  & img,
  svg {
    display: block;
    width: 50%;
    margin: 4em;
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
              contentfulId: contentful_id
              locale: node_locale
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
              fluid(maxWidth: 1416) {
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
        const taglist =
          tags &&
          tags.length &&
          tags.map((tag) => <ReferenceTag key={tag}>{`${tag}`}</ReferenceTag>)
        return (
          <ReferenceWrapper key={id}>
            <ReferenceHeadline>{client}</ReferenceHeadline>
            <ReferenceMeta>
              {projectType && (
                <ReferenceProjectType>
                  <strong>Project type:</strong> {projectType}
                </ReferenceProjectType>
              )}
              {industry && (
                <ReferenceIndustry>
                  <strong>Industry:</strong> {industry}
                </ReferenceIndustry>
              )}
            </ReferenceMeta>

            {taglist && <ReferenceTags>{taglist}</ReferenceTags>}
            <Grid>
              <ReferenceImageWrapper>
                {media ? (
                  <Image {...media[0]} maxWidth="708" alt={client} />
                ) : (
                  <ReferenceFallbackImageWrapper>
                    <PetitcodeLogo />
                  </ReferenceFallbackImageWrapper>
                )}
              </ReferenceImageWrapper>

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
              <ReferenceDescription>
                <MDXRenderer>{description.childMdx.body}</MDXRenderer>
              </ReferenceDescription>
            )}
          </ReferenceWrapper>
        )
      }
    )
}
