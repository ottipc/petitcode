import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PaginationTable from '../components/PaginationTable'
import Pagination from '../components/Pagination'
import FreelancerRow from '../components/FreelancerRow'
import { csv } from 'd3'


const Wrapper = styled.div`
  margin-top: 0;
  padding: 0;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  margin-bottom: 30px;
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  margin-top: 58px;
  margin-left: 25px;
  margin-right: 25px;
`

const Container = styled.div`
  background-color: #ffffff;
  color: inherit;
  padding: 15px 20px 20px 20px;
  border-color: #e7eaec;
  border-image: none;
  border-style: solid solid none;
  border-width: 1px 0;
`
const Table = styled.table`
${'' /* margin-bottom for paginator */}
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  margin-bottom: 3.75rem;
  border-collapse: collapse;
  border-spacing: 0;
  background-color: transparent;
  .table{
    width: 100%;
    max-width: 100%;
  }
  .no-margins{
    margin: 0 !important;
  }

  th{
    line-height: 1.42857;
padding: 8px;
vertical-align: middle;
border-bottom: 1px solid #DDDDDD;
color: #A4A3A3;
font-weight: normal;
  }
  .th-type{
    min-width:25px;
  }

  ${'' /* .th-address{
    @media (max-width: 767px) {
    display: none;
  } */}
  }
`
const TableFooterRight = styled.div`
float: right !important;
`
const Td = styled.td`
  border-top: 1px solid #e7eaec;
  line-height: 1.42857;
  padding: 8px;
  vertical-align: top;
`
const CardGrid = styled.div`
  width: 100%;
  ${'' /* display: grid;
  grid-template-columns: 15% 15% 15% 15% 15% 15%;
  column-gap: 2%;
  row-gap: 30px; */}
  padding: 25px;
`
const ListView = () => {
 
 
  // test

const [csvData, setCsvData] = useState([])
const [currentPage, setCurrentPage] = useState(1)
const [cardsPerPage, setCardsPerPage] = useState(24)
let indexOfLastCard = 0
let indexOfFirstCard = 0
let currentCards = []
let list = []

useEffect(() => {
  csv('data.csv').then((data) => {
    console.log('please work', data)
    setCsvData(data)
  })
}, [])
if (csvData) {
  list = csvData.map((entry, index) => {
    return <FreelancerRow key={index} data={entry} />
  })

  indexOfLastCard = currentPage * cardsPerPage
  indexOfFirstCard = indexOfLastCard - cardsPerPage
  currentCards = list.slice(indexOfFirstCard, indexOfLastCard)
}
const paginate = (pageNumber) => {
  setCurrentPage(pageNumber)
}
//end

// test

// test





  return (
    <Wrapper>
      
      <Container>
        <Table className="table no-margins">
        <thead>
        <tr>
         
          <th className='th-type'>&nbsp;</th>
          <th>Full Name</th>
          <th className='th-address'>Location</th>
          <th>Tags</th>
          <th>Hourly Rate</th>
          <th>Daily Rate</th>
          <th>Groups</th>
         </tr>
        </thead>
         <tbody>

         
         {currentCards}
         
         </tbody>
         <tfoot>
        
        
        <PaginationTable
          postsPerPage={cardsPerPage}
          totalPosts={csvData.length}
          paginate={paginate}
          currentPage={currentPage}
        />
       
        </tfoot>
        </Table>
      </Container>
    </Wrapper>
  )
}

export default ListView
