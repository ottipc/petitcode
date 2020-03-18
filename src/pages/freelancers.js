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

  if (filteredData) {
    list = filteredData.map((entry, index) => {
      return <FreelancerCard key={index} data={entry} />
    })

    indexOfLastCard = currentPage * cardsPerPage
    indexOfFirstCard = indexOfLastCard - cardsPerPage
    currentCards = list.slice(indexOfFirstCard, indexOfLastCard)
  } else if (csvData) {
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

  console.log('scvData', csvData);

  const filterCards = (activeFilters) => {

    console.log('activeFilters', activeFilters);
    let filteredData = csvData;
    if (activeFilters.filter(filter => typeof filter.Search !== 'undefined').length > 0) {
      let searchFilter = activeFilters.filter(filter => typeof filter.Search !== 'undefined');
      filteredData = csvData.filter(
        entity =>
          entity.email.toLowerCase().includes(searchFilter[0].Search.toLowerCase()) ||
          entity.name.toLowerCase().includes(searchFilter[0].Search.toLowerCase()) ||
          entity.surname.toLowerCase().includes(searchFilter[0].Search.toLowerCase())
      )
    }
    if (activeFilters.filter(filter => typeof filter.Group !== 'undefined' && filter.Group.length > 0).length > 0) {
      let groupFilter = activeFilters.filter(filter => typeof filter.Group !== 'undefined');
      filteredData = filteredData.filter(
        entity =>
          entity.categories.split(', ').some(item => groupFilter[0].Group.includes(item)) 
      )
    }
    // if (activeFilters.filter(filter => typeof filter.Skills !== 'undefined' && filter.Skills.length > 0).length > 0) {
    //   let skillsFilter = activeFilters.filter(filter => typeof filter.Skills !== 'undefined');
    //   filteredData = filteredData.filter(
    //     entity =>
    //       entity.categories.split(', ').some(item => skillsFilter[0].Skills.includes(item)) 
    //   )
    // }
    if (activeFilters.filter(filter => typeof filter.Tags !== 'undefined' && filter.Tags.length > 0).length > 0) {
      let tagsFilter = activeFilters.filter(filter => typeof filter.Tags !== 'undefined');
      filteredData = filteredData.filter(
        entity =>
          entity.tags.split(', ').some(item => tagsFilter[0].Tags.includes(item)) 
      )
    }
    if (activeFilters.filter(filter => typeof filter.Rating !== 'undefined' && filter.Rating > 0).length > 0) {
      let ratingFilter = activeFilters.filter(filter => typeof filter.Rating !== 'undefined');
      filteredData = filteredData.filter(
        entity =>
          parseFloat(entity.rating).toFixed() >= ratingFilter[0].Rating
      )
    }
    if (activeFilters.filter(filter => typeof filter.hRate !== 'undefined' && filter.hRate.length > 0).length > 0) {
      let hRateFilter = activeFilters.filter(filter => typeof filter.hRate !== 'undefined');
      filteredData = filteredData.filter(
        entity => 
          parseFloat(entity.hourly_rate) >= hRateFilter[0].hRate[0] && 
          parseFloat(entity.hourly_rate) <= hRateFilter[0].hRate[1]
      )
    }
    if (activeFilters.filter(filter => typeof filter.dRate !== 'undefined' && filter.dRate.length > 0).length > 0) {
      let dRateFilter = activeFilters.filter(filter => typeof filter.dRate !== 'undefined');
      filteredData = filteredData.filter(
        entity => 
          parseFloat(entity.daily_rate) >= dRateFilter[0].dRate[0] && 
          parseFloat(entity.daily_rate) <= dRateFilter[0].dRate[1]
      )
    }
    setFilteredData(filteredData)
  }

  return (
    <>
      <Metatags />
      <Container>
        <Filter tags={tags} filterCards={(filter) => filterCards(filter)} />
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
