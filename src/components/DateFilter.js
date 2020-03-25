import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarWeek ,faCalendarCheck} from '@fortawesome/free-solid-svg-icons'
import { DateRangePicker } from 'rsuite'
import 'rsuite/dist/styles/rsuite-default.css'

// test
import './Custom.css';


const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  margin-left: 25px;
  display: block;
  width: 50%;
  font-family: 'Noto Sans','Helvetica Neue','Segoe UI','Helvetica','Arial',sans-serif;
  @media (max-width: 991px) {
    width: 100%;
    margin-left: 0;
    
  }
  ${'' /* &:focus{
    border-color: #02BD94;
  } */}

  ${'' /* test */}
  -webkit-box-align: center;
display: flex;
align-items: center;
-webkit-box-flex: 1;
flex: 1;
`

const Input = styled(DateRangePicker)`
  background-color: white;
  width: 92%;
  border: 1px solid #e5e6e7;
  padding: 6px 12px;
  font-size: 12px;
  line-height: 1.5;
  ${'' /* font-family: 'Poppins', sans-serif; */}
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
  ${'' /* test */}
  ${'' /* position: absolute; */}
  ${'' /* width: 40px; */}
  ${'' /* width: 3.7%; */}
 
  line-height: 0.5;
  float: left;
  padding: 6px;
  height: 30px;
  width: 50px;
  text-transform: uppercase;
  cursor: pointer;
  outline: 0;
  svg:not(:root).svg-inline--fa path{
    fill: hsla(0,0%,0%,0.8)
  }
`

const DateFilter = (props) => {
  const [inputValue, setInputValue] = useState([])
  const { dateFilter } = props

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

  return (
    <Container>
      <DateRangePicker
        appearance="subtle"
        placeholder="Availability"
        style={{
          backgroundColor: 'white',
          width: '92%',
          border: '1px solid #e5e6e7',
          padding: '0px 12px',
          fontSize: '12px',
          lineHeight: '1.5',
          // fontFamily: 'Poppins, sans-serif'
        }}
        onOk={(value) => setDateHandler(value)}
      />
      <Button>
        <FontAwesomeIcon icon={faCalendarCheck} />
      </Button>
    </Container>
  )
}

export default DateFilter
