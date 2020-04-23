import React from 'react'
import styled from 'styled-components'
import Drop from './Drop'
import propTypes from 'prop-types'

const Wrapper = styled.div`
  padding: 0 25px;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
  ${'' /* font-family: 'Poppins', sans-serif; */}
  font-family: 'Noto Sans','Helvetica Neue','Segoe UI','Helvetica','Arial',sans-serif;
  font-size: 13px;
  color: #676a6c;
`

const SortFilter = ({ filter, currentCards }) => {
  return (
    <Wrapper>
      <Drop filter={filter} currentCards={currentCards} />
    </Wrapper>
  )
}

SortFilter.propTypes = {
  filter: propTypes.any,
  currentCards: propTypes.any
}

export default SortFilter
