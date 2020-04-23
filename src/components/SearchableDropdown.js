import React, { useState } from 'react'
import styled from 'styled-components'
import Select from 'react-dropdown-select'
import propTypes from 'prop-types'
import './Custom.css'
import propTypes from 'prop-types'

const Wrapper = styled.div`
  margin-right: 20px;
  ${'' /* width: 113px; */}
  margin-bottom: 10px;
  :focus {
    outline: none;
    border: 1px solid #02bd94;
  }
`

const Container = styled.div`
  background-color: transparent;
  width: 100%;
`
const SearchAndToggle = styled.div`
  display: flex;
  flex-direction: column;
  color: #656a6c;
  font-family: 'Noto Sans', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial',
    sans-serif;
  font-size: 0.95rem;
  background: #f7f7f7;
  input {
    margin: 10px 10px 0;
    line-height: 30px;
    padding: 0px 5px;
    border: 1px solid #e5e6e7;
    border-radius: 3px;
    margin-bottom: 10px;
    :focus {
      outline: none;
      border: 1px solid #000000;
    }
  }
`

const Items = styled.div`
  overflow: auto;
  min-height: 10px;
  max-height: 200px;
  overflow-x: hidden;
`

const Item = styled.div`
  display: flex;
  margin: 10px;
  align-items: baseline;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 10px;
  border-bottom: 1px solid #e7eaec;
  position: relative;
  margin: 0;
  height: 40px;
  color: #6a6c6e;
  &:hover {
    background-color: #f2f1f1;
  }
`

const ItemLabel = styled.div`
  color: #656a6c;
  font-family: 'Noto Sans', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial',
    sans-serif;
  font-size: 0.95rem;
  ${'' /* line-height: 1.75rem; */}
  line-height: 1;
  color: hsla(0, 0%, 0%, 0.8);
  @media (max-width: 676px) {
    font-size: 13px;
    line-height: 1;
  }
`

const DropdownContainer = styled.div`
  cursor: pointer;
`
const Placeholder = styled.p`
  font-family: 'Noto Sans', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial',
    sans-serif;
  font-size: 1.1rem;
  ${'' /* font-style:italic; */}
  color: hsla(0,0%,0%,0.8);
  font-weight: bold;
  line-height: 1.75rem;
`

const SearchableDropdown = (props) => {
  const [value, setValue] = useState([])

  const { onFilterSet, selectedItems } = props

  if (
    typeof selectedItems !== 'undefined' &&
    JSON.stringify(value) !== JSON.stringify(selectedItems)
  ) {
    setValue(selectedItems)
  }

  const customContentRenderer = ({ props, state, methods }) => (
    <DropdownContainer>
      <Placeholder>{props.placeholder}</Placeholder>
    </DropdownContainer>
  )

  const customDropdownRenderer = ({ props, state, methods }) => {
    const regexp = new RegExp(state.search, 'i')

    return (
      <div>
        <SearchAndToggle>
          <input
            type="text"
            value={state.search}
            onChange={methods.setSearch}
          />
        </SearchAndToggle>
        <Items>
          {props.options
            .filter((item) => regexp.test(item[props.searchBy] || item.label))
            .map((option) => (
              <Item key={option.value} onClick={() => methods.addItem(option)}>
                <ItemLabel>{option.label}</ItemLabel>
              </Item>
            ))}
        </Items>
      </div>
    )
  }

  const handleOnFilterChange = (value) => {
    onFilterSet(value)
  }

  return (
    <Wrapper>
      <Container>
        <Select
          values={value}
          options={props.options}
          style={{ border: 'none' }}
          placeholder={props.placeholder}
          onChange={(values) => handleOnFilterChange(values)}
          dropdownRenderer={customDropdownRenderer}
          contentRenderer={customContentRenderer}
          multi
        />
      </Container>
    </Wrapper>
  )
}

SearchableDropdown.propTypes = {
  onFilterSet: propTypes.any,
  selectedItems: propTypes.any,
  props: propTypes.any,
  state: propTypes.any,
  methods: propTypes.any,
  placeholder: propTypes.any,
  options: propTypes.any,
  searchBy: propTypes.any
}

export default SearchableDropdown
