import React, { useState } from 'react'
import styled from 'styled-components'
import Select from 'react-dropdown-select'
import Switch from 'react-switch'
import Ratings from 'react-ratings-declarative'
import './Custom.css'


const Wrapper = styled.div`
  margin-right: 20px;
`

const Container = styled.div`
  background-color: white;
  width: 100%;
`

const DropdownContainer = styled.div`
  cursor: pointer;
`
const Placeholder = styled.p`
  font-family: 'Noto Sans','Helvetica Neue','Segoe UI','Helvetica','Arial',sans-serif;
  font-size: 1rem;
  ${'' /* font-style:italic; */}
  color: hsla(0,0%,0%,0.8);
  font-weight: bold;
  line-height: 1.75rem;
`

const RatingsDropdown = (props) => {
  const { onFilterSet } = props
  const { onUncheckFilter } = props
  const [checked, setChecked] = useState(false)
  const [rating, setRating] = useState(0)

  const ratingChanged = (value) => {
    onFilterSet(value)
    setRating(value)
  }

  const checkedHandler = () => {
    if (checked) {
      onFilterSet(0)
      onUncheckFilter()
      setRating(0)
    }
    setChecked(!checked)
  }

  const selector = (
    <div
      style={{
        padding: '0px 10px 10px 10px',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <span
        style={{
          fontStyle: 'italic',
          fontSize: '11px',
          lineHeight: '11px',
          color: '#A4A3A3',
          marginRight: '10px'
        }}
      >
        No less then:{' '}
      </span>
      <Ratings
        rating={rating}
        widgetDimensions="12px"
        widgetSpacings="0px"
        changeRating={(value) => ratingChanged(value)}
      >
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
      </Ratings>
    </div>
  )

  const customContentRenderer = ({ props, state, methods }) => (
    <DropdownContainer>
      <Placeholder>{props.placeholder}</Placeholder>
    </DropdownContainer>
  )

  const customDropdownRenderer = ({ props, state, methods }) => {
    return (
      <div>
        <label
          style={{
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
          htmlFor="material-switch"
        >
          <span
            style={{
              color: '#656A6C',
              fontFamily: 'Poppins, sans-serif',
              fontFamily: 'Helvetica Neue,Segoe UI,Helvetica,Arial,sans-serif',
              marginRight: '10px',
              fontSize: '0.95rem',
              lineHeight: '1.75rem',
              color: 'hsla(0,0%,0%,0.8)',
              marginRight: '10px'
            }}
          >
            Overall rating
          </span>
          <Switch
            onChange={() => checkedHandler()}
            checked={checked}
            uncheckedIcon={false}
            checkedIcon={false}
            offColor="#ffffff"
            onColor="#02BD94"
            onHandleColor="#ffffff"
            height={18}
            width={30}
            handleDiameter={18}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          />
        </label>
        {checked && selector}
      </div>
    )
  }

  const onFilterChangeHandler = (value) => {
    onFilterSet(value)
  }

  return (
    <Wrapper>
      <Container>
        <Select
          options={props.options}
          style={{ border: 'none' }}
          placeholder={props.placeholder}
          onChange={(values) => onFilterChangeHandler(values)}
          dropdownRenderer={customDropdownRenderer}
          contentRenderer={customContentRenderer}
          multi
        />
      </Container>
    </Wrapper>
  )
}

export default RatingsDropdown
