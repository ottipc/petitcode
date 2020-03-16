import React from 'react'
import styled from 'styled-components'
import SearchableDropdown from './SearchableDropdown'

const Wrapper = styled.div`
  padding: 25px;
`

const Container = styled.div`
  background-color: white;
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`

const Filter = () => {

  const countryOptions = [
    { key: 'af', value: 'af', label: 'label 1'},
    { key: 'ax', value: 'ax', label: 'label 2'},
    { key: 'al', value: 'al', label: 'label 3'},
    { key: 'dz', value: 'dz', label: 'label 4'},
    { key: 'as', value: 'as', label: 'label 5'},
  ]

  return (
    <Wrapper>
      <Container>
        <p>This is a fitler</p>
        <SearchableDropdown 
          placeholder={'Group'}
          options={countryOptions}
        />
      </Container>
    </Wrapper>
  )
}

export default Filter
