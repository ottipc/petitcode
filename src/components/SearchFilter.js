import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  ${'' /* display: flex;
  flex-direction: row; */}
  flex: 1;
  margin-right: 25px;
  ${'' /* test */}
  display: block;
  width: 50%;

  ${'' /* test */}
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-flex: 1;
  flex: 1;
  @media (max-width: 991px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 5px;
  }
  @media (max-width: 420px) {
    display: block;
  }
`

const Input = styled.input`
  background-color: white;
  width: 92%;
  border: 1px solid #e5e6e7;
  padding: 8px 12px;
  font-size: 0.9rem;
  line-height: 1.75rem;
  ${'' /* font-family: 'Poppins', sans-serif; */}
  font-family: 'Helvetica Neue','Segoe UI','Helvetica','Arial',sans-serif;
  float: left;
  width: 80%;
  ${'' /* test */}
  height: 38px;
  &:focus {
    border-color: #eb9330;
  }
  ${'' /* test */}
  display: flex;
  flex: 1;
  height: 32px;
  position: relative;
  outline: 0;
  right: 0;
  @media (max-width: 420px) {
    width: 73%;
  }
`

const Button = styled.button`
  background-color: white;
  width: 9%;
  border: 1px solid #e5e6e7;
  margin-left: -1px;
  ${'' /* font-family: 'Poppins', sans-serif; */}
  font-family: 'Noto Sans','Helvetica Neue','Segoe UI','Helvetica','Arial',sans-serif;
  font-size: 0.8rem;
  line-height: 0.5;
  float: left;
  width: 20%;
  padding: 8px;
  height: 32px;
  width: 67px;
  text-transform: uppercase;
  cursor: pointer;
  outline: 0;
  transition: all 0.4s ease-out;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  color: hsla(0, 0%, 0%, 0.8);
  &:hover {
    background: rgb(135, 135, 135) none repeat scroll 0% 0%;
    color: #fff;
  }
  @media (max-width: 420px) {
    width: 27%;
  }
`

const SearchFilter = (props) => {
  const [inputValue, setInputValue] = useState('')
  const [initialRender, setInitialRender] = useState(true)
  const { searchFilter, onChangeValue, value } = props

  if (value !== inputValue && initialRender) {
    setInputValue(value)
    setInitialRender(false)
  }

  const searchHandler = () => {
    searchFilter(inputValue)
  }

  const onChangeHandler = (value) => {
    if (onChangeValue) {
      onChangeValue(value)
    }
    setInputValue(value)
  }

  return (
    <Container>
      <Input
        value={inputValue}
        type="text"
        placeholder="Search by email or name..."
        onChange={(value) => onChangeHandler(value.target.value)}
      />
      <Button onClick={() => searchHandler()}>SEARCH</Button>
    </Container>
  )
}

export default SearchFilter
