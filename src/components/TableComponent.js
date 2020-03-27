import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import styled from 'styled-components'
import Ratings from 'react-ratings-declarative'
import Poppins from '../assets/fonts/Poppins-Regular.ttf'
import noImage from '../assets/noImage.png'
import user from '../assets/user.png'
import './Custom.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/translucent.css';
import './Tooltip.css';


const Category = styled.div`
width: 23px;
height: 23px;
border-radius: 15px;
margin: 0px 5px;
display: flex;
align-items: center;
justify-content: center;
font-family: 'Noto Sans','Helvetica Neue','Segoe UI','Helvetica','Arial',sans-serif;
font-size: 0.9rem;
color: white;
font-weight: bold;
background: rgb(135, 135, 135) none repeat scroll 0% 0%;
`
const Name = styled.a`
@font-face {
  font-family: 'Poppins';
  src: local('Poppins'), url(${Poppins}) format('truetype');
  font-weight: normal;
  font-style: normal;
}

${'' /* font-family: 'Poppins', sans-serif; */}
font-family: 'Noto Sans','Helvetica Neue','Segoe UI','Helvetica','Arial',sans-serif;
font-size: 1rem;
line-height: 1.75rem;
font-weight: 600;
text-align: start;
text-decoration: none;
cursor: pointer;
color: hsla(0,0%,0%,0.8);
text-transform: capitalize;
&:hover{
  text-decoration:none;
  color: #020206;
  }
`
const Address = styled.div`
font-family: 'Noto Sans','Helvetica Neue','Segoe UI','Helvetica','Arial',sans-serif;
color: hsla(0,0%,0%,0.8);
font-size: 1rem;
line-height: 13px;
text-align: start;
width: 200px;
display: block;

`
const Tags = styled.div`
width: 200px;
display: block;
justify-content: space-around;
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;
color: hsla(0,0%,0%,0.8);
font-size: 1rem;
line-height: 1.75rem;
text-align: start;
min-height: 14px;
`
const Rate = styled.div`
display: flex;
flex-direction: column;
color: hsla(0,0%,0%,0.8);
font-size: 1rem;
line-height: 1.75rem;
`

const Type = styled.div`
 position:absolute;
 padding-right: 0;
width: 20px;
height:20px;
background-image: linear-gradient(135deg, #000000 14px, #fff 14px);
position: absolute;
top: 0;
`
const LinkBtn = styled.button`
background-color:#000000;
padding: 0px 1em;
border-radius: 1em;
background: rgb(135, 135, 135) none repeat scroll 0% 0%;
color: rgb(255, 255, 255);
font-size: 1rem;
line-height: 2em;
a{
  color: #fff;
  text-decoration:none;
 &:focus{
  color: #fff;
  text-decoration:none; 
 }
 :hover{
   color: #fff;
  text-decoration:none;
  }
}

`


const  TableComponent = (props) => {
  
  
  let csvData=[...props.csvData]
  let currentCards = [props.currentCards]

  let list = csvData.map(x => x)

  csvData.forEach(data => {
    if (data.unavailabilities.length > 0) {
      
      const name = data.name;
      const dates = data.unavailabilities.split(', ');
      let until = dates[0];
      let from = '';
      if(dates[1]){

        from = dates[1];
        let du = until.split('-');
        let df= from.split('-');
        until= du[2] + "/" + du[1] + "/" + du[0];
        from =df[2] + "/" + df[1] + "/" + df[0];
        data.until= until;
        data.from = from;
        // print 'Until: ' + until + " and From: " + from;
      }
    }
  });


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
      return <Tippy theme ='translucent' content={<span style={{fontSize:'12px',textAlign:'center',display:'block'}}>{cat.replace(/\s+/g, '')}</span>}>
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
    minWidth:'5px',
    maxWidth:'15px',
    cell: row =>{row.type === "self managed" ? <Type></Type> :''}
 
  },
  
  {
    name: 'Full Name',
    selector: 'name',
    sortable: true,
    minWidth:'200px',
    maxWidth:'400px',
    cell: row => <div className="full-info"><div className="image-32-32"><img src={user}></img></div>
    <div className="d-flex">
    <Name>{row.name.split(" ")[0]} {row.surname.charAt(0)+'.'}
    </Name>
    
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
  </Ratings></div></div>
    </div>
  },
  {
    name: 'Tags',
    selector: 'tags',
    left: true,
    hide: 'sm',
    cell: row => <Tippy theme ='translucent' content={<span style={{fontSize:'12px',textAlign:'center',display:'block'}}>{row.tags}</span>}><Tags>{row.tags}</Tags></Tippy>
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
    selector: 'groups',
    left: true,
    hide: 'md',
    cell: row => <div className='categories-flex'>{formatCategories(row.groups)}</div>
    
  },
    {
    name: 'Availability',
    selector: 'unavailability',
    left: true,
    hide: 'md',
    cell:row=><div className='available-flex'>{row.unavailabilities ?'Until '+ row.until + ' From '+ row.from :'Available'}</div>
  },
  {
    name: 'Contact us',
    left: true,
    hide: 'sm',
    cell: row =><LinkBtn><a href="mailto:info@petitcode.com">Contact</a></LinkBtn>
  },

  
];


 // The row data is composed into your custom expandable component via the data prop
const ExpanableComponent = ({ data }) => 
<div className='footable-row-detail-inner'>
<div className='footable-row-detail-row tags-row'><div className='footable-row-detail'>Tags:</div><div className='footable-row-value'>{data.tags}</div></div>
<div className='footable-row-detail-row daily-rate-row'><div className='footable-row-detail'>Daily rate:</div><div className='footable-row-value'>{data.daily_rate}</div></div>
<div className='footable-row-detail-row groups-row'><div className='footable-row-detail'>Groups:</div><div className='footable-row-value row-categories'>{formatCategories(data.groups)}</div></div>
<div className='footable-row-detail-row available-row'><div className='footable-row-detail'>Availability:</div><div className='footable-row-value'>{data.unavailabilities ?'Until '+ data.until+ ' From '+ data.from :'Available'}</div></div>
<div className='footable-row-detail-row cta-row'><div className='footable-row-detail'>Contact :</div><div className='footable-row-value'><LinkBtn>Contact</LinkBtn></div></div>

</div>;

        return (
            <DataTable className="list-table"
          columns={columns}
          data={props.csvData}
          expandableRows
          expandableRowsComponent={<ExpanableComponent />}
          defaultSortField='name'
          pagination ='true'
          paginationPerPage='24'  
         />
           )
      
  }
  
export default TableComponent
  