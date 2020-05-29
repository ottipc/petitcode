import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarCheck
} from '@fortawesome/free-solid-svg-icons'
import propTypes from 'prop-types'
// import { DateRangePicker, DatePicker } from 'rsuite'
import { DateRange } from 'react-date-range';
// import 'rsuite/dist/styles/rsuite-default.css'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
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

const PickerContainer = styled.div `
  display: flex;
  flex-direction: column;
  height: 40px;
  width: 100%;

  &:focus {
    display: flex;
    flex-direction: column;
    height: 40px;
    width: 100%;
  }
`

const Input = styled.div `
  display: flex;
  width: 100%;
  height: 100%;
  background-color: white;
  border: 1px solid rgb(229, 230, 231);
  font-size: 12px;
  line-height: 1.5;
  font-family: "Noto Sans", "Helvetica Neue", "Segoe UI", Helvetica, Arial, sans-serif;
  text-align: center;
  justify-content: center;
  align-items: center;
  color: black;


  &:active {
    width: 100%;
    height: 100%;
    background-color: white;
    border: 1px solid rgb(229, 230, 231);
    font-size: 12px;
    line-height: 1.5;
    font-family: "Noto Sans", "Helvetica Neue", "Segoe UI", Helvetica, Arial, sans-serif;

  }
`

const DateFilter = (props) => {

  const reconstructDate = date => {
    const formated = JSON.parse(date);
    let reconstructed = [];
    if (formated) {
    reconstructed = [
      {
        startDate: new Date(formated[0].startDate),
        endDate: new Date(formated[0].endDate),
        key: 'selection',
        color: 'black',
      }
    ]
  } 
  else {
    reconstructed = [
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
        color: 'black',
      }
    ]
  }
    return reconstructed;
  }

  const [inputValue, setInputValue] = useState([])
  const [initialRender, setInitialRender] = useState(true)
  const [showPicker, setShowPicker] = useState(false);
  const { dateFilter, value } = props
  const [firstClick, setFirstClick] = useState(true);
  const [state, setState] = useState(typeof localStorage !== 'undefined' && localStorage.getItem('availabilities') != null ? reconstructDate(localStorage.getItem('availabilities')) :
  [
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
      color: 'black',
    }
  ]);

  if (typeof value !== 'undefined' && value != null && value !== inputValue && initialRender) {
    setInputValue(value)
    setState([
      {
        startDate: new Date(value[0]),
        endDate: new Date(value[value.length - 1]),
        key: 'selection',
        color: 'black'
      }
    ]);
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
    setState(date);
    typeof localStorage !== 'undefined' && localStorage.setItem('availabilities', JSON.stringify(date));
    const startDate = new Date(date[0].startDate)
    const endDate = new Date(date[0].endDate)
    for (
      var dateRange = [], dt = startDate;
      dt <= endDate;
      dt.setDate(dt.getDate() + 1)
    ) {
      dateRange.push(formatDate(dt))
    }
    setInputValue(dateRange)
    dateFilter(dateRange)
    if (firstClick) {
      setFirstClick(false);
    }
    else {
      togglePicker();
      setFirstClick(true);
    }
  }

  const cleanDateHandler = () => {
    console.log('clean');
    setInputValue([])
    dateFilter([])
    typeof localStorage !== 'undefined' && localStorage.setItem('availabilities', null);
  }

  const togglePicker = () => {
    setShowPicker(!showPicker);
  }

  useEffect(() => {  
    // returned function will be called on component unmount 
    return () => {
      if (typeof window != 'undefined' && (window.location.pathname.split('/')[2] === '' || typeof window.location.pathname.split('/')[2] === 'undefined')) {
        cleanDateHandler();
      }
    }
  }, [])

  return (
    <Container>
      {/* <DateRangePicker
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
      /> */}
      <PickerContainer>
    <Input key={JSON.stringify(state)}  onClick={() => togglePicker()} >{state[0].startDate != null && state[0].endDate != null ? formatDate(state[0].startDate) + ' - ' + formatDate(state[0].endDate) : ''}</Input>
      <div style={{display: showPicker ? 'flex' : 'none', position: 'absolute', zIndex: 999, boxShadow: 'rgba(0, 0, 0, 0.2) 0px 4px 8px 0px', marginTop: '40px'}}>
      <DateRange
        editableDateInputs={true}
        onChange={item => setDateHandler([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
      />
      </div>
      </PickerContainer>
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
