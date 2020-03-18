import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  margin-right: 30px;
`

const Input = styled.input`
  background-color: white;
  width: 92%;
  border: 1px solid #e5e6e7;
  padding: 6px 12px;
  font-size: 12px;
  line-height: 1.5;
  font-family: 'Poppins', sans-serif;
`

const Button = styled.button`
  background-color: white;
  width: 8%;
  border: 1px solid #e5e6e7;
  margin-left: -1px;
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  line-height: 1.5;
`

const SearchFilter = (props) => {
  const [inputValue, setInputValue] = useState('')
  const { searchFilter } = props

  const searchHandler = () => {
    searchFilter(inputValue)
  }

  return (
    <Container>
      <Input
        type="text"
        placeholder="Search by email or name..."
        onChange={(value) => setInputValue(value.target.value)}
      />
      <Button onClick={() => searchHandler()}>SEARCH</Button>
    </Container>
  )
}

export default SearchFilter
