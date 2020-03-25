import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faBorderAll } from '@fortawesome/free-solid-svg-icons'
import Metatags from '../components/Metatags'
import FreelancerCard from '../components/FreelancerCard'
import Pagination from '../components/Pagination'
import Filter from '../components/Filter'
import FilterWizard from '../components/mdx/FilterWizard'
// added
import SortFilter from '../components/SortFilter'
import Drop from '../components/Drop';
import ListView from '../components/ListView'
import Tooltip from '../components/Tooltip'
import TableComponent from '../components/TableComponent'
import '../components/Custom.css';





const CardGrid = styled.div`
  width: 100%;
  display: grid;
  ${'' /* grid-template-columns: 15% 15% 15% 15% 15% 15%; */}
  column-gap: 2%;
  row-gap: 30px;
  padding: 25px;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  @media (max-width: 300px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
  
`

const Container = styled.div`
  width: 100%;
  background-color: rgba(221, 221, 221, 0.3);
`
const ViewLinkWrapper = styled.div`
text-align:end;
display:inline-block;
float: right;
@media (max-width: 501px) {
  float: none;
  padding-top: 10px;
  }
@media (max-width: 455px) {
  text-align:start;
  padding-top: 10px;
  }

`
// added

const ViewLink = styled.a`
  ${'' /* font-family: 'Poppins', sans-serif; */}
  font-family: 'Noto Sans','Helvetica Neue','Segoe UI','Helvetica','Arial',sans-serif;
  font-size: 0.95rem;
  color: #221757;
  text-decoration: none;
  cursor: pointer;
  padding: 0 26px;
  color: hsla(0,0%,0%,0.8);
  font-weight: bold;
&:hover{
    text-decoration:none;
   
    color: #020206;
    }
.las{
  font-family: 'Line Awesome Free';
  font-weight: 900;
}
.la-lg{
  font-size: 1.33333em;
  line-height: 0.75em;
  vertical-align: -.0667em;
}
.la-bars::before{
  ${'' /* content: "\f0c9"; */}
  content: "\f07a";
}
`
// end added
// added
const WrapperDropown = styled.div`
  padding: 0 25px;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
  ${'' /* font-family: 'Poppins', sans-serif; */}
  font-family: 'Noto Sans','Helvetica Neue','Segoe UI','Helvetica','Arial',sans-serif;
  font-size: 0.95rem;
  color: hsla(0,0%,0%,0.8);
  padding: 0;
  padding-left: 25px;
  display: inline-block;
  
`

const SortWrapper= styled.div` 
 width:100%;
  ${'' /* //  display:flex; */}
   justify-content: space-between;
   @media (max-width: 455px) {
    display: flex;
    flex-direction: column;
  }
  
   `
// end added






export default function RedirectIndex({ data }) {
  const [csvData, setCsvData] = useState([])
  const [filteredData, setFilteredData] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [cardsPerPage, setCardsPerPage] = useState(24)
  const [skills, setSkills] = useState([])
  const [tags, setTags] = useState([])
  const [show, setDisplay] = useState(true)
  const [sortOrder, setSortOrder] = useState('1')
  let indexOfLastCard = 0
  let indexOfFirstCard = 0
  let currentCards = []
  let list = []

  const sortEntities = entities => {
    switch(sortOrder) {
      case '1':
        return entities.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
        break;
      case '2':
        return entities.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1);
        break;
      case '3':
        return entities.sort((a, b) => parseFloat(a.hourly_rate) < parseFloat(b.hourly_rate) ? 1 : -1);
        break;
      case '4':
        return entities.sort((a, b) => parseFloat(a.daily_rate) < parseFloat(b.daily_rate) ? 1 : -1);
        break;
      default:
        return entities;
        break;
    }
  }

  useEffect(() => {
    setCsvData(sortEntities(data.allDataCsv.nodes.filter(entity => entity.name !== '' && entity.surname !== '')))
  }, [])

console.log('data', csvData);
    csvData.forEach(data => {
    if (data.unavailabilities.length > 0) {
      console.log('filtered date', data);
      // dates = data.unavailabilities.split(', ').slice(0, 2)
      // console.log('filtered date available', dates.slice(0, 2))
      // const available = dates.slice(0, 2).toString();
     
     
    }
   
    
  });

  if (filteredData) {
    list = sortEntities(filteredData).map((entry, index) => {
      return <FreelancerCard key={index} data={entry} />
    })

    indexOfLastCard = currentPage * cardsPerPage
    indexOfFirstCard = indexOfLastCard - cardsPerPage
    currentCards = list.slice(indexOfFirstCard, indexOfLastCard)
  } else if (csvData) {
    console.log('wkwkwk');
    const tagsArr = []
    const tagsCheck = []
    const skillsArr = []
    const skillsCheck = []
    list = sortEntities(csvData).map((entry, index) => {
      entry.tags.split(', ').forEach((tag) => {
        if (
          tagsCheck.findIndex(
            (item) => tag.toLowerCase() === item.toLowerCase()
          ) < 0
        ) {
          tagsCheck.push(tag)
          tagsArr.push({ key: tagsArr.length, value: tag, label: tag })
        }
      })
      entry.skills.split(', ').forEach((skill) => {
        if (
          skillsCheck.findIndex(
            (item) => skill.toLowerCase() === item.toLowerCase()
          ) < 0
        ) {
          skillsCheck.push(skill)
          skillsArr.push({ key: skillsArr.length, value: skill, label: skill })
        }
      })
      return <FreelancerCard key={index} data={entry} />
    })

    if (
      JSON.stringify(tags) !==
      JSON.stringify(tagsArr.sort((a, b) => (a.value > b.value ? 1 : -1)))
    ) {
      setTags(tagsArr.sort((a, b) => (a.value > b.value ? 1 : -1)))
    }
    if (
      JSON.stringify(skills) !==
      JSON.stringify(skillsArr.sort((a, b) => (a.value > b.value ? 1 : -1)))
    ) {
      setSkills(skillsArr.sort((a, b) => (a.value > b.value ? 1 : -1)))
    }
    indexOfLastCard = currentPage * cardsPerPage
    indexOfFirstCard = indexOfLastCard - cardsPerPage
    currentCards = list.slice(indexOfFirstCard, indexOfLastCard)
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const filterCards = (activeFilters) => {
    let filteredData = csvData
    if (
      activeFilters.filter((filter) => typeof filter.Search !== 'undefined')
        .length > 0
    ) {
      const searchFilter = activeFilters.filter(
        (filter) => typeof filter.Search !== 'undefined'
      )
      filteredData = csvData.filter(
        (entity) =>
          entity.email
            .toLowerCase()
            .includes(searchFilter[0].Search.toLowerCase()) ||
          entity.name
            .toLowerCase()
            .includes(searchFilter[0].Search.toLowerCase()) ||
          entity.surname
            .toLowerCase()
            .includes(searchFilter[0].Search.toLowerCase())
      )
    }
    if (
      activeFilters.filter(
        (filter) =>
          typeof filter.Date !== 'undefined' && filter.Date.length > 0
      ).length > 0
    ) {
      const dateFilter = activeFilters.filter(
        (filter) => typeof filter.Date !== 'undefined'
      )
      filteredData = filteredData.filter((entity) =>
        entity.unavailabilities
          .split(', ')
          .filter((item) => dateFilter[0].Date.includes(item)).length <= 0 ||
        entity.unavailabilities.length <= 0
      )
    }
    if (
      activeFilters.filter(
        (filter) =>
          typeof filter.Group !== 'undefined' && filter.Group.length > 0
      ).length > 0
    ) {
      const groupFilter = activeFilters.filter(
        (filter) => typeof filter.Group !== 'undefined'
      )
      filteredData = filteredData.filter((entity) =>
        entity.groups
          .split(', ')
          .some((item) => groupFilter[0].Group.includes(item))
      )
    }
    if (
      activeFilters.filter(
        (filter) => typeof filter.Tags !== 'undefined' && filter.Tags.length > 0
      ).length > 0
    ) {
      const tagsFilter = activeFilters.filter(
        (filter) => typeof filter.Tags !== 'undefined'
      )
      filteredData = filteredData.filter((entity) =>
        entity.tags
          .split(', ')
          .some((item) => tagsFilter[0].Tags.includes(item))
      )
    }
    if (
      activeFilters.filter(
        (filter) =>
          typeof filter.Skills !== 'undefined' && filter.Skills.length > 0
      ).length > 0
    ) {
      const skillsFilter = activeFilters.filter(
        (filter) => typeof filter.Skills !== 'undefined'
      )
      filteredData = filteredData.filter((entity) =>
        entity.skills
          .split(', ')
          .some((item) => skillsFilter[0].Skills.includes(item))
      )
    }
    if (
      activeFilters.filter(
        (filter) => typeof filter.Rating !== 'undefined' && filter.Rating > 0
      ).length > 0
    ) {
      const ratingFilter = activeFilters.filter(
        (filter) => typeof filter.Rating !== 'undefined'
      )
      filteredData = filteredData.filter(
        (entity) =>
          parseFloat(entity.rating).toFixed() >= ratingFilter[0].Rating
      )
    }
    if (
      activeFilters.filter(
        (filter) =>
          typeof filter.hRate !== 'undefined' && filter.hRate.length > 0
      ).length > 0
    ) {
      const hRateFilter = activeFilters.filter(
        (filter) => typeof filter.hRate !== 'undefined'
      )
      filteredData = filteredData.filter(
        (entity) =>
          parseFloat(entity.hourly_rate) >= hRateFilter[0].hRate[0] &&
          parseFloat(entity.hourly_rate) <= hRateFilter[0].hRate[1]
      )
    }
    if (
      activeFilters.filter(
        (filter) =>
          typeof filter.dRate !== 'undefined' && filter.dRate.length > 0
      ).length > 0
    ) {
      const dRateFilter = activeFilters.filter(
        (filter) => typeof filter.dRate !== 'undefined'
      )
      filteredData = filteredData.filter(
        (entity) =>
          parseFloat(entity.daily_rate) >= dRateFilter[0].dRate[0] &&
          parseFloat(entity.daily_rate) <= dRateFilter[0].dRate[1]
      )
    }
    console.log('fdata', filteredData, activeFilters);
    setFilteredData(sortEntities(filteredData))
  }

  return (
    <>
      <Metatags />
      <Container>
        <Filter
          tags={tags}
          skills={skills}
          filterCards={(filter) => filterCards(filter)}
        />
        {/* <FilterWizard /> */}
        {/* //added start */}
        <SortWrapper>
        {show ? <WrapperDropown> <Drop onChangeSelection={value => setSortOrder(value)}></Drop> </WrapperDropown> :''}
    
        <ViewLinkWrapper>
        <ViewLink onClick={() => setDisplay(!show)}> <span>{show ? <div>Switch to table view<FontAwesomeIcon className="custom-fa" icon={faBars} /> </div>  : <div>Switch to card view<FontAwesomeIcon className="custom-fa" icon={faBorderAll} /> </div>} </span>
        <i class="las la-lg la-th-large"></i>
        </ViewLink>
      </ViewLinkWrapper>
      </SortWrapper>
      {/*added end */}
    {show ? <CardGrid>{currentCards}</CardGrid> : <TableComponent list={list} currentCards={currentCards} csvData={csvData}
    ></TableComponent>} 

        {/* <CardGrid>{currentCards}</CardGrid> */}
        
        {show ? <Pagination
          postsPerPage={cardsPerPage}
          totalPosts={typeof filteredData !== 'undefined' ? filteredData.length : csvData.length}
          paginate={paginate}
          currentPage={currentPage}
        /> :''}

 
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

export const csvDataGrah = graphql`
  query {
    allDataCsv {
      nodes {
        address
        birth_date
        company_name
        daily_rate
        email
        hourly_rate
        id
        name
        partner_since
        partner_type
        phone_nr
        rating
        social_media
        surname
        tags
        type
        skills
        unavailabilities
        groups
      }
    }
  }
`
