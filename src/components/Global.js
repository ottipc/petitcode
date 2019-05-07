import React from 'react'
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
            childImageSharp {
              sqip(numberOfPrimitives: 5, blur: 0) {
                dataURI
              }
              fluid(maxWidth: 1152) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
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
            childImageSharp {
              sqip(numberOfPrimitives: 5, blur: 0) {
                dataURI
              }
              fluid(maxWidth: 1152) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
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

  return (
    <GlobalContext.Provider value={{ columns, persons }}>
      {children}
    </GlobalContext.Provider>
  )
}

Global.propTypes = {
  children: propTypes.node.isRequired
}
