import React from 'react'
import styled from 'styled-components'
import Select from "react-dropdown-select";

const Wrapper = styled.div`
  width: 7.5%
`

const Container = styled.div`
  background-color: white;
  width: 100%;
`

const SearchableDropdown = (props) => {
  return (
    <Wrapper>
      <Container>
        <Select options={props.options} placeholder={props.placeholder} onChange={(values) => console.log(values)} />
      </Container>
    </Wrapper>
  )
}

export default SearchableDropdown
