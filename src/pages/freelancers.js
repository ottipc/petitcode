import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Metatags from '../components/Metatags'
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
  const [filteredData, setFilteredData] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [cardsPerPage, setCardsPerPage] = useState(24)
  let indexOfLastCard = 0
  let indexOfFirstCard = 0
  let currentCards = []
  let list = []

  useEffect(() => {
    csv('data.csv').then((data) => {
      setCsvData(data)
    })
  }, [])

  if (filteredData) {
    list = filteredData.map((entry, index) => {
      return <FreelancerCard key={index} data={entry} />
    })

    indexOfLastCard = currentPage * cardsPerPage
    indexOfFirstCard = indexOfLastCard - cardsPerPage
    currentCards = list.slice(indexOfFirstCard, indexOfLastCard)
  } else if (csvData) {
    list = csvData.map((entry, index) => {
      return <FreelancerCard key={index} data={entry} />
    })

    indexOfLastCard = currentPage * cardsPerPage
    indexOfFirstCard = indexOfLastCard - cardsPerPage
    currentCards = list.slice(indexOfFirstCard, indexOfLastCard)
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const filterCards = (filterValue) => {
    const filteredData = csvData.filter(
      (entity) =>
        entity.email.toLowerCase().includes(filterValue.toLowerCase()) ||
        entity.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        entity.surname.toLowerCase().includes(filterValue.toLowerCase())
    )
    setFilteredData(filteredData)
  }

  return (
    <>
      <Metatags />
      <Container>
        <Filter filterCards={(filter) => filterCards(filter)} />
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
