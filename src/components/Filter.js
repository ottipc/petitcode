import React from 'react'
import styled from 'styled-components'
import SearchFilter from './SearchFilter'
import DateFilter from './DateFilter'

const Wrapper = styled.div`
  padding: 25px;
`

const ContainerUpper = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 15px 20px 20px 20px;
`

const Filter = (props) => {
  const { filterCards } = props

  const searchFilter = (value) => {
    filterCards(value)
  }

  return (
    <Wrapper>
      <ContainerUpper>
        <SearchFilter searchFilter={(value) => searchFilter(value)} />
        <DateFilter />
      </ContainerUpper>
    </Wrapper>
  )
}

export default Filter
