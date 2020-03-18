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
import SortFilter from '../components/SortFilter'
// add for testing delete later
import Drop from '../components/Drop';
import ListView from '../components/ListView'
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

// test
const DropdownFilterOption = styled.option`
    border-bottom: 1px solid #E7EAEC;
    color: #656A6C;
    position: relative;
    padding:0px;
    &:hover{
    background-color: #F2F1F1;
}
`
const DropdownOptions = styled.div`
    position: absolute;
    top: 100%;
    width: 100%;
    background-color: white;
    box-shadow: 1px 1px 1px 1px #888888;
    width: 230px;
    z-index: 2;
    max-height: 200px;
    overflow-y: auto;
    pointer-events: all;
`


// end test
// test
const ViewLinkWrapper = styled.div`
text-align:end;

`


const ViewLink = styled.a`
font-family: 'Poppins', sans-serif;
  font-size: 13px;
color: #221757;
text-decoration: none;
cursor: pointer;
padding-right: 26px;
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
// end test
// test
const WrapperDropown = styled.div`
  padding: 0 25px;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  color: #676a6c;

  padding: 0;
   
  padding-left: 25px;
  
`

const SortWrapper= styled.div
`   width:100%;
   display:flex;
   justify-content: space-between;
   `
// endtest

export default function RedirectIndex({ data }) {
  const [csvData, setCsvData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [cardsPerPage, setCardsPerPage] = useState(24)
  const [initialState, setinitialState] = useState(true)
  let [currentCards, setCurrentCards] = useState([])

  const [show, setDisplay] = useState(true)
  console.log("shown=",show)


  let indexOfLastCard = 0
  let indexOfFirstCard = 0
  // let currentCards = []
  let list = []


// end test
  useEffect(() => {
    csv('data.csv').then((data) => {
      console.log('please work', data)
      setCsvData(data)
    })
  }, [])
  console.log('csvData=', csvData)
  if (csvData) {
    list = csvData.map((entry, index) => {
      return <FreelancerCard key={index} data={entry} />
    })
    console.log('list=', list);

    indexOfLastCard = currentPage * cardsPerPage
    indexOfFirstCard = indexOfLastCard - cardsPerPage
    if(initialState){
      currentCards = list.slice(indexOfFirstCard, indexOfLastCard)
  }
  }

  const filter = (cards) => {
    console.log('sortded=', cards);

    setCurrentCards(cards)
    setinitialState(false);
    console.log('cards', cards)
  }

  console.log('scvData', csvData);

  const filterCards = (activeFilters) => {
    let filteredData = csvData;
    console.log('active filters', activeFilters);
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
    setFilteredData(filteredData)
  }

  // end test
  return (
    <>
      <Metatags />
      <Container>
        <Filter />
        {/* <SortFilter filter={filter} currentCards={currentCards}/> */}
        {/* <SortWrapper> */}
        {show ? <WrapperDropown> <Drop filter={filter} currentCards={currentCards}></Drop> </WrapperDropown> :''}
    
      <ViewLinkWrapper>
        <ViewLink onClick={() => setDisplay(!show)}> <span>{show ? "Switch to table view " : "Switch to card view"} <i className="las la-lg la-bars"></i></span>
        <i class="las la-lg la-th-large"></i>
        </ViewLink>
      </ViewLinkWrapper>
      {/* </SortWrapper> */}
        {/* <SortFilter></SortFilter> */}
         {show ? <CardGrid>{currentCards}</CardGrid> : <ListView></ListView>}
				
        {/* <CardGrid>{currentCards}</CardGrid> */}
        {/* <ListView></ListView> */}

        {show ? <Pagination
          postsPerPage={cardsPerPage}
          totalPosts={csvData.length}
          paginate={paginate}
          currentPage={currentPage}
        /> :''}

        {/* <Pagination
          postsPerPage={cardsPerPage}
          totalPosts={csvData.length}
          paginate={paginate}
          currentPage={currentPage}
        /> */}
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
