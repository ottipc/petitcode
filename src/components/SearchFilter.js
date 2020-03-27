import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  flex: 1;
  margin-right: 25px;
  display: block;
  width: 50%;
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
    display:block;
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
  height: 38px;
  &:focus{
    border-color: #000000;
  }
  display: flex;
  flex: 1;
  height: 32px;
  position: relative;
  outline: 0;
  right: 0;
  @media (max-width: 420px) {
      width:73%;
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
  transition: all .4s ease-out;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  color: hsla(0,0%,0%,0.8);
  &:hover{
    background: rgb(135,135,135) none repeat scroll 0% 0%;
    color:#fff;
  }
@media (max-width: 420px) {
    width:27%;
  }
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
