import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import styled from 'styled-components'
import Ratings from 'react-ratings-declarative'
import Poppins from '../assets/fonts/Poppins-Regular.ttf'
import noImage from '../assets/noImage.png'
import { csv } from 'd3'
import './Drop.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/translucent.css';
import './Tooltip.css';





const  MyComponent = (props) => {
  
  const [csvData, setCsvData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [cardsPerPage, setCardsPerPage] = useState(24)
  let indexOfLastCard = 0
  let indexOfFirstCard = 0
  let currentCards = []
  let list = []
  useEffect(() => {
    csv('data.csv').then((data) => {
      
      console.log('all data=', data)
      setCsvData(data)
    })
  }, [])
  if (csvData) {
    list = csvData.map(x => x)
    console.log(' list data=',  list)
    // indexOfLastCard = currentPage * cardsPerPage
    // indexOfFirstCard = indexOfLastCard - cardsPerPage
    currentCards = list
  }

  const Category = styled.div`
  width: 23px;
  height: 23px;
  border-radius: 15px;
  margin: 0px 5px;
  background-color: #686c6e;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
  font-size: 11px;
  color: white;
  font-weight: bold;
`
 const Name = styled.a`
  @font-face {
    font-family: 'Poppins';
    src: local('Poppins'), url(${Poppins}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  font-weight: 600;
  text-align: start;
  color: #221757;
  text-decoration: none;
  cursor: pointer;
  &:hover{
    text-decoration:none;
    color: #020206;
    }
`
 const Address = styled.div`
  font-family: 'Poppins', sans-serif;
  color: #6a6c6e;
  font-size: 13px;
  line-height: 13px;
  text-align: start;
  width: 200px;
  display: block;
 
`
 const Tags = styled.div`
  ${'' /* test width */}
  width: 200px;
  display: block;
  justify-content: space-around;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
  color: #6a6c6e;
  font-size: 13px;
  line-height: 11px;
  text-align: start;
`
const Rate = styled.div`
  display: flex;
  flex-direction: column;
  color: #6a6c6e;
`

const Type = styled.div`
   position:absolute;
   padding-right: 0;
  width: 20px;
  height:20px;
  background-image: linear-gradient(135deg, #02BD94 14px, #fff 14px);
  position: absolute;
  top: 0;
`



  const formatAddress = (adressData) => {
    const array = adressData.split(', ')
    const town =
      typeof array[array.length - 2] !== 'undefined'
        ? array[array.length - 2] + ', '
        : ''
    const country =
      typeof array[array.length - 1] !== 'undefined'
        ? array[array.length - 1]
        : ''
    const formatedAddress = town + country
  
    return formatedAddress
  }


  const formatCategories = (categoriesData) => {
    const abrev = {
      FirstInterview: 'F',
      DEV: 'D',
      DES: 'D',
      Contacted: 'C',
      NewPartners: 'N',
      MGMENT: 'M',
      MAR: 'M'
    }
    const array = categoriesData.split(', ').map((cat, index) => {
      console.log('abrev=', cat);
      return <Tippy theme ='translucent' content={cat.replace(/\s+/g, '')}>
               <Category key={index}>{abrev[cat.replace(/\s+/g, '')]}</Category>
            </Tippy>
    })
    return array
  }

  const StarsToolip = () => {
    return <span className='raiting-tooltip' style={{fontSize:'12px'}}>
    Based on ratings by colleagues. Assessment criteria can be changed in Settings / My Network / General.
    </span>
   }

  const TagsToolip = () => {
    return <span className='tags-tooltip' style={{fontSize:'12px'}}>
     {row.tags}
    </span>
  }

const columns = [
  {
    name: '',
    selector: 'type',
    left: true,
    minWidth:'10px',
    maxWidth:'30px',
    cell: row =><Tippy theme ='translucent' content= {<span style={{fontSize:'12px',textAlign:'center',display:'block'}}>{row.type}</span>}>{row.type === "self managed" ? <Type></Type> :''}</Tippy>
 
  },
  
  {
    name: 'Full Name',
    selector: 'name',
    sortable: true,
    cell: row => <div className="full-info"><div className="image-32-32"><img src={noImage}></img></div>
    <div className="d-flex"><Name>{row.name} {row.surname}
    </Name>
    <Tippy theme ='translucent' content={<StarsToolip></StarsToolip>}>
    <div className='ratings'><Ratings
    rating={parseFloat(row.rating)}
    widgetDimensions="13px"
    widgetSpacings="0px"
  >
    <Ratings.Widget />
    <Ratings.Widget />
    <Ratings.Widget />
    <Ratings.Widget />
    <Ratings.Widget />
  </Ratings></div></Tippy></div>
    </div>
  },
  {
    name: 'Location',
    selector: 'address',
    left: true,
    hide: 'md',
    cell: row =><Tippy theme ='translucent' content={<span style={{fontSize:'12px',textAlign:'center',display:'block'}}>{row.address}</span>}><Address>{formatAddress(row.address)}</Address></Tippy>

  },
  {
    name: 'Tags',
    selector: 'tags',
    left: true,
    hide: 'sm',
    cell: row => <Tippy theme ='translucent' content={<span style={{fontSize:'12px',textAlign:'center',display:'block'}}>{row.tags}</span>}><Tags>{row.tags}</Tags></Tippy>
  },
  {
    name: 'Hourly Rate',
    selector: 'hourly_rate',
    sortable: true,
    left: true,
    hide: 'sm',
    cell: row =><Rate>{row.hourly_rate}</Rate>
  },
  {
    name: 'Daily Rate',
    selector: 'daily_rate',
    sortable: true,
    left: true,
    hide: 'sm',
    cell: row =><Rate>{row.daily_rate}</Rate>
  },
  {
    name: 'Groups',
    selector: 'categories',
    left: true,
    hide: 'md',
    cell: row => <div className='categories-flex'>{formatCategories(row.categories)}</div>
    
  }
];



 // The row data is composed into your custom expandable component via the data prop
const ExpanableComponent = ({ data }) => 
<div className='footable-row-detail-inner'>
<div className='footable-row-detail-row address-row'><div className='footable-row-detail'>Location:</div><div className='footable-row-value'>{formatAddress(data.address)}</div></div>
<div className='footable-row-detail-row tags-row'><div className='footable-row-detail'>Tags:</div><div className='footable-row-value'>{data.tags}</div></div>
<div className='footable-row-detail-row hourly-rate-row'><div className='footable-row-detail'>Hourly rate:</div><div className='footable-row-value'>{data.hourly_rate}</div></div>
<div className='footable-row-detail-row daily-rate-row'><div className='footable-row-detail'>Daily rate:</div><div className='footable-row-value'>{data.daily_rate}</div></div>
<div className='footable-row-detail-row groups-row'><div className='footable-row-detail'>Groups:</div><div className='footable-row-value row-categories'>{formatCategories(data.categories)}</div></div>

</div>;


        return (
            <DataTable className="list-table"
          columns={columns}
          data={currentCards}
          // selectableRows // add for checkbox selection
          // Clicked
          // Selected={handleChange}
          expandableRows
          expandableRowsComponent={<ExpanableComponent />}
          defaultSortField='surname'
          pagination ='true'
          paginationPerPage='24'
        
                 
         />
           )
    
  }
  
export default MyComponent
  