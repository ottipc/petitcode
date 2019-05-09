import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import { GlobalContext } from '../utils/Contexts'

export default function Global({ children }) {
  const data = useStaticQuery(graphql`
    {
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
    }
  `)

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
  const { langs, defaultLocale } = useContext(GlobalContext)

  return (
    <GlobalContext.Provider
      value={{ columns, persons, grid, langs, defaultLocale }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

Global.propTypes = {
  children: propTypes.node.isRequired
}
