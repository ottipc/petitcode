// DropdownPage.js
import React, { Component } from 'react';
import styled from 'styled-components'
// import './Dropdown.css';

const DropdownFilterOption = styled.div`
    border-bottom: 1px solid #E7EAEC;
    color: #656A6C;
    position: relative;
    padding: 0px 10px;
    &:hover{
    background-color: #F2F1F1;
}
`
const DropdownOptions = styled.div`
    position: absolute;
    top: 100%;
    width: 100%;
    background-color: white;
    box-shadow: 1px 1px 1px 1px #888888;
    width: 230px;
    z-index: 2;
    max-height: 200px;
    overflow-y: auto;
    pointer-events: all;
`

export default class DropdownSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dropdownVisible: false,
      values: [
        { title: 'Full name from A to Z', id: 1 },
        { title: 'Full name from Z to A', id: 2 },
        { title: 'Hourly Rate from A to Z', id: 3 },
        { title: 'Daily Rate from A to Z', id: 4 }
      ]
    }
  }

  toggleDropdown = (e) => {
    this.setState(prevState => ({dropdownVisible: !prevState.dropdownVisible}))
  }

  renderDropdownMenu() {
    let optionTemplate = this.state.values.map(v => (
      
      <DropdownFilterOption value={v.id}>{v.title}</DropdownFilterOption>
    ));
    return (
      <DropdownOptions>
        {optionTemplate}
      </DropdownOptions>
    )
  }





  
  render() {
  
    return (
      <div className='dropdown-container'>

        <div className="dropdown-filter__trigger" onClick={this.toggleDropdown}>
             
             <span className="dropdown-filter__title">
             Full name from A to Z</span>
            <span class="caret"></span>
            </div>
        {
          this.state.dropdownVisible &&
          this.renderDropdownMenu()
        }
      </div>
    )
  }
}