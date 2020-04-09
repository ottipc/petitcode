// DropdownPage.js
import React, { Component } from 'react'
import styled from 'styled-components'
// import './Dropdown.css';

const DropdownFilterOption = styled.div`
  border-bottom: 1px solid #e7eaec;
  color: #656a6c;
  position: relative;
  padding: 0px 10px;
  &:hover {
    background-color: #f2f1f1;
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

  handleToggleDropdown = (e) => {
    this.setState((prevState) => ({
      dropdownVisible: !prevState.dropdownVisible
    }))
  }

  renderDropdownMenu() {
    const optionTemplate = this.state.values.map((v, index) => (
      <DropdownFilterOption key={index} value={v.id}>{v.title}</DropdownFilterOption>
    ))
    return <DropdownOptions>{optionTemplate}</DropdownOptions>
  }

  render() {
    return (
      <div className="dropdown-container">
        <div className="dropdown-filter__trigger" onClick={this.handleToggleDropdown}>
          <span className="dropdown-filter__title">Full name from A to Z</span>
          <span className="caret" />
        </div>
        {this.state.dropdownVisible && this.renderDropdownMenu()}
      </div>
    )
  }
}
