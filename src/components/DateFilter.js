import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarWeek } from '@fortawesome/free-solid-svg-icons'
import { DateRangePicker } from 'rsuite'
import 'rsuite/dist/styles/rsuite-default.css'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  margin-left: 30px;
`

const Input = styled(DateRangePicker)`
  background-color: white;
  width: 92%;
  border: 1px solid #e5e6e7;
  padding: 6px 12px;
  font-size: 12px;
  line-height: 1.5;
  font-family: 'Poppins', sans-serif;
`

const Button = styled.button`
  background-color: white;
  width: 8%;
  border: 1px solid #e5e6e7;
  margin-left: -1px;
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  line-height: 1.5;
`

const DateFilter = (props) => {
  const [inputValue, setInputValue] = useState('')
  const { dateFilter } = props

  const searchHandler = () => {
    searchFilter(inputValue)
  }

  return (
    <Container>
      <DateRangePicker
        appearance="subtle"
        placeholder="Availability"
        style={{
          backgroundColor: 'white',
          width: '92%',
          border: '1px solid #e5e6e7',
          padding: '6px 12px',
          fontSize: '12px',
          lineHeight: '1.5',
          fontFamily: 'Poppins, sans-serif'
        }}
        onOk={(value) => console.log('date', value)}
      />
      <Button>
        <FontAwesomeIcon icon={faCalendarWeek} />
      </Button>
    </Container>
  )
}

export default DateFilter
