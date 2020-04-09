import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarCheck
} from '@fortawesome/free-solid-svg-icons'
import propTypes from 'prop-types'
import { DateRangePicker } from 'rsuite'
import 'rsuite/dist/styles/rsuite-default.css'
import './Custom.css'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  ${'' /* margin-left: 25px; */}
  margin-right: 20px;
  display: block;
  ${'' /* width: 20%; */}
  width: 380px;
  font-family: 'Noto Sans', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial',
    sans-serif;
  ${'' /* @media (max-width: 1377px) {
   margin-bottom:15px;
  } */}
  @media (max-width: 1422px) {
    margin-top: 15px;
  }
  @media (max-width: 480px) {
    width: 100%;
  }
  -webkit-box-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Button = styled.button`
  background-color: white;
  width: 8%;
  border: 1px solid #e5e6e7;
  margin-left: -1px;
  ${'' /* font-family: 'Poppins', sans-serif; */}
  font-size: 12px;
  line-height: 1.5;
  font-size: 16px;
  padding: 6px 12px;
  padding: 6px 11px;
  line-height: 0.5;
  float: left;
  padding: 6px;
  width: 50px;
  text-transform: uppercase;
  cursor: pointer;
  outline: 0;
  height: 40px;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  width: 50px;
  svg:not(:root).svg-inline--fa path {
    fill: hsla(0, 0%, 0%, 0.8);
  }
`

const DateFilter = (props) => {
  const [inputValue, setInputValue] = useState([])
  const [initialRender, setInitialRender] = useState(true)
  const { dateFilter, value } = props

  if (value !== inputValue && initialRender) {
    setInputValue(value)
    setInitialRender(false)
  }

  const formatDate = (value) => {
    const year = new Date(value).getFullYear()
    const month =
      parseInt(new Date(value).getMonth()) > 9
        ? (parseInt(new Date(value).getMonth()) + 1).toString()
        : '0' + (parseInt(new Date(value).getMonth()) + 1).toString()
    const day =
      parseInt(new Date(value).getDate()) > 9
        ? new Date(value).getDate()
        : '0' + new Date(value).getDate()

    return year + '-' + month + '-' + day
  }

  const setDateHandler = (date) => {
    const startDate = new Date(date[0])
    const endDate = new Date(date[1])
    for (
      var dateRange = [], dt = startDate;
      dt <= endDate;
      dt.setDate(dt.getDate() + 1)
    ) {
      dateRange.push(formatDate(dt))
    }
    setInputValue(dateRange)
    dateFilter(dateRange)
  }

  const cleanDateHandler = () => {
    setInputValue([])
    dateFilter([])
  }

  return (
    <Container>
      <DateRangePicker
        appearance="subtle"
        placeholder="Availability"
        value={inputValue}
        style={{
          backgroundColor: 'white',
          width: '350px',
          border: '1px solid #e5e6e7',
          // padding: '0px 12px',
          fontSize: '12px',
          lineHeight: '1.5'
          // fontFamily: 'Poppins, sans-serif'
        }}
        onOk={(value) => setDateHandler(value)}
        onClean={() => cleanDateHandler()}
      />
      <Button>
        <FontAwesomeIcon icon={faCalendarCheck} />
      </Button>
    </Container>
  )
}

DateFilter.propTypes = {
  dateFilter: propTypes.any,
  value: propTypes.any
}

export default DateFilter
