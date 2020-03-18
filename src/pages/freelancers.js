import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import { graphql, navigate, withPrefix } from 'gatsby'
import { getUserLangKey } from 'ptz-i18n'
import styled, { css } from 'styled-components'
import Metatags from '../components/Metatags'
import Link from '../components/mdx/Link'
import FreelancerCard from '../components/FreelancerCard'
import Pagination from '../components/Pagination'
import Filter from '../components/Filter'
import { csv } from 'd3'

const CardGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 15% 15% 15% 15% 15% 15%;
  column-gap: 2%;
  row-gap: 30px;
  padding: 25px;
`

const Container = styled.div`
  width: 100%;
  background-color: rgba(221, 221, 221, 0.3);
`

export default function RedirectIndex({ data }) {
  const [csvData, setCsvData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [cardsPerPage, setCardsPerPage] = useState(24)
  const [skills, setSkills] = useState([])
  const [tags, setTags] = useState([])
  let indexOfLastCard = 0
  let indexOfFirstCard = 0
  let currentCards = []
  let list = []

  useEffect(() => {
    csv('data.csv').then((data) => {
      setCsvData(data)
    })
  }, [])

  if (csvData) {
    let tagsArr = [];
    let tagsCheck = [];
    list = csvData.map((entry, index) => {
      entry.tags.split(', ').forEach(tag => {
        if (tagsCheck.findIndex(item => tag.toLowerCase() === item.toLowerCase()) < 0) {
          tagsCheck.push(tag);
          tagsArr.push({ key: tagsArr.length, value: tag, label: tag });
        }
      });
      return <FreelancerCard key={index} data={entry} />
    })

    if (JSON.stringify(tags) !== JSON.stringify(tagsArr.sort((a, b) => a.value > b.value ? 1 : -1))) {
      setTags(tagsArr.sort((a, b) => a.value > b.value ? 1 : -1));
    }
    indexOfLastCard = currentPage * cardsPerPage
    indexOfFirstCard = indexOfLastCard - cardsPerPage
    currentCards = list.slice(indexOfFirstCard, indexOfLastCard)
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  return (
    <>
      <Metatags />
      <Container>
        <Filter tags={tags}/>
        <CardGrid>{currentCards}</CardGrid>
        <Pagination
          postsPerPage={cardsPerPage}
          totalPosts={csvData.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </Container>
    </>
  )
}

// RedirectIndex.propTypes = {
//   data: propTypes.object.isRequired
// }

// export const pageQuery = graphql`
//   query IndexQuery {
//     site {
//       siteMetadata {
//         languages {
//           defaultLocale
//           langs
//         }
//       }
//     }
//   }
// `

export const petitcodeFragment = graphql`
  fragment Metadata on Site {
    siteMetadata {
      languages {
        defaultLocale
        langs
      }
    }
  }
`
