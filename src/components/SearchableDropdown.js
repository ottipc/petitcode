import React, {useState} from 'react'
import styled from 'styled-components'
import Select from 'react-dropdown-select'
import './Custom.css';


const Wrapper = styled.div`
  margin-right: 20px;
  :focus {
      outline: none;
      border: 1px solid #02BD94;
    }
`

const Container = styled.div`
  background-color: white;
  width: 100%;
`
const SearchAndToggle = styled.div`
  display: flex;
  flex-direction: column;
  color: #656A6C;
  ${'' /* font-family: 'Poppins', sans-serif; */}
  font-family: 'Noto Sans','Helvetica Neue','Segoe UI','Helvetica','Arial',sans-serif;
  font-size: 13px;
  background: #f7f7f7;
  input {
    margin: 10px 10px 0;
    line-height: 30px;
    padding: 0px 20px;
    border: 1px solid #e5e6e7;
    border-radius: 3px;
    margin-bottom:10px;
    :focus {
      outline: none;
      border: 1px solid #eb9330;
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
  ${'' /* test */}
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FFFFFF;
  padding:10px;
  border-bottom: 1px solid #E7EAEC;
  position: relative;
  margin: 0;
  height:40px;
  color: #6a6c6e;
  &:hover{
    background-color: #F2F1F1;
  }
`;

const ItemLabel = styled.div`
  color: #656A6C;
  ${'' /* font-family: 'Poppins', sans-serif; */}
  font-family: 'Noto Sans','Helvetica Neue','Segoe UI','Helvetica','Arial',sans-serif;
  font-size: 0.95rem;
  line-height: 1.75rem;
  color: hsla(0,0%,0%,0.8);
`;

const DropdownContainer = styled.div`
  cursor: pointer;
`
const Placeholder = styled.p`
  font-family: 'Noto Sans','Helvetica Neue','Segoe UI','Helvetica','Arial',sans-serif;
  font-size: 1rem;
  font-style:italic;
  color: hsla(0,0%,0%,0.8);
  font-weight: bold;
  line-height: 1.75rem;
`


const SearchableDropdown = (props) => {

  const [value, setValue] = useState([]);

  const {onFilterSet, selectedItems} = props; 

  if (typeof selectedItems !== 'undefined' && JSON.stringify(value) !== JSON.stringify(selectedItems)) {
    setValue(selectedItems);
  }

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
          values={value}
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
