import React from 'react'
import styled from 'styled-components'
import Select from 'react-dropdown-select'

const Wrapper = styled.div`
  width: 10%;
  margin-right: 20px;
`

const Container = styled.div`
  background-color: white;
  width: 100%;
`
const SearchAndToggle = styled.div`
  display: flex;
  flex-direction: column;
  color: #656A6C;
  font-family: 'Poppins', sans-serif;
  font-size: 13px;

  input {
    margin: 10px 10px 0;
    line-height: 30px;
    padding: 0px 20px;
    border: 1px solid #ccc;
    border-radius: 3px;
    :focus {
      outline: none;
      border: 1px solid deepskyblue;
    }
  }
`;

const Items = styled.div`
  overflow: auto;
  min-height: 10px;
  max-height: 200px;
`;

const Item = styled.div`
  display: flex;
  margin: 10px;
  align-items: baseline;
`;

const ItemLabel = styled.div`
  color: #656A6C;
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
`;

const DropdownContainer = styled.div`
  cursor: pointer;
`
const Placeholder = styled.p`
  color: #656A6C;
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
`


const SearchableDropdown = (props) => {

  const {onFilterSet} = props; 

  const customContentRenderer = ({ props, state, methods }) => (
  <DropdownContainer><Placeholder>{props.placeholder}</Placeholder></DropdownContainer>
  );

  const customDropdownRenderer = ({ props, state, methods }) => {
    const regexp = new RegExp(state.search, "i");

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
            .filter(item => regexp.test(item[props.searchBy] || item.label))
            .map(option => (
              <Item key={option.value} onClick={() => methods.addItem(option)}>
                <ItemLabel>{option.label}</ItemLabel>
              </Item>
            ))}
        </Items>
      </div>
    );
  };

  const onFilterChangeHandler = value => {
    onFilterSet(value);
  };

  return (
    <Wrapper>
      <Container>
        <Select
          options={props.options}
          style={{border: 'none'}}
          placeholder={props.placeholder}
          onChange={(values) => onFilterChangeHandler(values)}
          dropdownRenderer={customDropdownRenderer}
          contentRenderer={customContentRenderer}
          multi={true}
        />
      </Container>
    </Wrapper>
  )
}

export default SearchableDropdown
