import React from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'
import './Custom.css'
import propTypes from 'prop-types'

const DropdownFilterOption = styled.option`
  border-bottom: 1px solid #e7eaec;
  color: #656a6c;
  position: relative;
  padding: 0px;
  &:hover {
    background-color: #f2f1f1;
    color: #575757;
    font-weight: bold;
  }
`

const Drop = (props) => {
  const options = {
    values: [
      { title: 'Full name from A to Z', id: 1 },
      { title: 'Full name from Z to A', id: 2 },
      { title: 'Hourly Rate from A to Z', id: 3 },
      { title: 'Daily Rate from A to Z', id: 4 }
    ]
  }
  const { onChangeSelection } = props

  const onChangeHandler = (event) => {
    onChangeSelection(event.target.value)
  }

  const optionTemplate = options.values.map((v) => (
    <DropdownFilterOption key={v.id} className="option" value={v.id}>
      {v.title}
    </DropdownFilterOption>
  ))

  return (
    <div className="sort-wrapper">
      <span className="sorting-label m-r-xs">Sort by:</span>
      <select value={options.value} onChange={onChangeHandler}>
        {optionTemplate}
      </select>
      {/* <span class="caret"></span> */}
    </div>
  )
}

Drop.propTypes = {
  onChangeSelection: propTypes.any
}

export default Drop
