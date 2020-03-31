import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import styled from 'styled-components'
import Ratings from 'react-ratings-declarative'
import Poppins from '../assets/fonts/Poppins-Regular.ttf'
import noImage from '../assets/noImage.png'
// import { csv } from 'd3'
import './Custom.css'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/translucent.css'
import './Tooltip.css'

const TableComponent = (props) => {
  const csvData = [...props.csvData]
  const currentCards = [props.currentCards]

  const list = csvData.map((x) => x)
  csvData.forEach((data) => {
    if (data.unavailabilities.length > 0) {
      const name = data.name
    }
  })

  const Category = styled.div`
    width: 23px;
    height: 23px;
    border-radius: 15px;
    margin: 0px 5px;
    ${'' /* background-color: #686c6e; */}
    display: flex;
    align-items: center;
    justify-content: center;
    ${'' /* font-family: 'Poppins', sans-serif; */}
    font-family: 'Noto Sans','Helvetica Neue','Segoe UI','Helvetica','Arial',sans-serif;
    ${'' /* font-size: 11px; */}
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
    ${'' /* font-size: 13px; */}
    font-size: 1rem;
    line-height: 1.75rem;
    font-weight: 600;
    text-align: start;
    text-decoration: none;
    cursor: pointer;
    color: hsla(0, 0%, 0%, 0.8);
    text-transform: capitalize;
    &:hover {
      text-decoration: none;
      color: #020206;
    }
  `
  const Address = styled.div`
    ${'' /* font-family: 'Poppins', sans-serif; */}
    font-family: 'Noto Sans','Helvetica Neue','Segoe UI','Helvetica','Arial',sans-serif;
    color: hsla(0, 0%, 0%, 0.8);
    ${'' /* font-size: 13px; */}
    font-size: 1rem;
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
    ${'' /* font-family: 'Poppins', sans-serif; */}
    color: hsla(0,0%,0%,0.8);
    ${'' /* font-size: 13px; */}
    font-size: 1rem;
    line-height: 1.75rem;
    text-align: start;
    min-height: 14px;
  `
  const Rate = styled.div`
    display: flex;
    flex-direction: column;
    color: hsla(0, 0%, 0%, 0.8);
    font-size: 1rem;
    line-height: 1.75rem;
  `

  const Type = styled.div`
    position: absolute;
    padding-right: 0;
    width: 20px;
    height: 20px;
    background-image: linear-gradient(135deg, #eb9330 14px, #fff 14px);
    position: absolute;
    top: 0;
  `
  const LinkBtn = styled.button`
    ${'' /* background-color: #02BD94; */}
    background-color:#eb9330;
    padding: 0px 1em;
    border-radius: 1em;
    background: rgb(135, 135, 135) none repeat scroll 0% 0%;
    color: rgb(255, 255, 255);
    font-size: 1rem;
    line-height: 2em;
    a {
      color: #fff;
      text-decoration: none;
      &:focus {
        color: #fff;
        text-decoration: none;
      }
      :hover {
        color: #fff;
        text-decoration: none;
      }
    }
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
      console.log('abrev=', cat)
      return (
        <Tippy
          theme="translucent"
          content={
            <span
              style={{
                fontSize: '12px',
                textAlign: 'center',
                display: 'block'
              }}
            >
              {cat.replace(/\s+/g, '')}
            </span>
          }
        >
          <Category key={index}>{abrev[cat.replace(/\s+/g, '')]}</Category>
        </Tippy>
      )
    })
    return array
  }

  const StarsToolip = () => {
    return (
      <span className="raiting-tooltip" style={{ fontSize: '12px' }}>
        Based on ratings by colleagues. Assessment criteria can be changed in
        Settings / My Network / General.
      </span>
    )
  }

  const TagsToolip = () => {
    return (
      <span className="tags-tooltip" style={{ fontSize: '12px' }}>
        {row.tags}
      </span>
    )
  }

  const columns = [
    {
      name: '',
      selector: 'type',
      left: true,
      minWidth: '10px',
      maxWidth: '30px',
      cell: (row) => (
        <Tippy
          theme="translucent"
          content={
            <span
              style={{
                fontSize: '12px',
                textAlign: 'center',
                display: 'block'
              }}
            >
              {row.type}
            </span>
          }
        >
          {row.type === 'self managed' ? <Type /> : ''}
        </Tippy>
      )
    },

    {
      name: 'Name',
      selector: 'name',
      sortable: true,
      minWidth: '200px',
      maxWidth: '400px',
      cell: (row) => (
        <div className="full-info">
          <div className="image-32-32">
            <img src={noImage} />
          </div>
          <div className="d-flex">
            <Tippy
              theme="translucent"
              content={
                <span
                  style={{
                    fontSize: '12px',
                    textAlign: 'center',
                    display: 'block'
                  }}
                >
                  {row.name} {row.surname}
                </span>
              }
            >
              <Name>
                {row.name.split(' ')[0]} {row.surname.charAt(0) + '.'}
              </Name>
            </Tippy>
            <Tippy theme="translucent" content={<StarsToolip />}>
              <div className="ratings">
                <Ratings
                  rating={parseFloat(row.rating)}
                  widgetDimensions="13px"
                  widgetSpacings="0px"
                >
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                  <Ratings.Widget />
                </Ratings>
              </div>
            </Tippy>
          </div>
        </div>
      )
    },
    // {
    //   name: 'Location',
    //   selector: 'address',
    //   left: true,
    //   hide: 'md',
    //   cell: row =><Tippy theme ='translucent' content={<span style={{fontSize:'12px',textAlign:'center',display:'block'}}>{row.address}</span>}><Address>{formatAddress(row.address)}</Address></Tippy>

    // },

    {
      name: 'Hard skills',
      selector: 'tags',
      left: true,
      hide: 'sm',
      cell: (row) => (
        <Tippy
          theme="translucent"
          content={
            <span
              style={{
                fontSize: '12px',
                textAlign: 'center',
                display: 'block'
              }}
            >
              {row.tags}
            </span>
          }
        >
          <Tags>{row.tags}</Tags>
        </Tippy>
      )
    },
    // {
    //   name: 'Hourly Rate',
    //   selector: 'hourly_rate',
    //   sortable: true,
    //   left: true,
    //   hide: 'sm',
    //   cell: row =><Rate>{row.hourly_rate}</Rate>
    // },
    {
      name: 'Hourly Rate',
      selector: 'hourly_rate',
      sortable: true,
      left: true,
      hide: 'sm',
      cell: (row) => <Rate>{row.hourly_rate}</Rate>
    },
    {
      name: 'Groups',
      selector: 'groups',
      left: true,
      hide: 'md',
      cell: (row) => (
        <div className="categories-flex">{formatCategories(row.groups)}</div>
      )
    },
    {
      name: 'Availability',
      selector: 'unavailability',
      left: true,
      hide: 'md',
      cell: (row) => (
        <div className="available-flex">
          {row.unavailabilities
            ? row.unavailabilities
                .split(', ')
                .slice(0, 2)
                .toString()
                .replace(',', ' ')
            : 'Available'}
        </div>
      )
    },
    {
      name: 'Contact us',
      // selector: 'email',
      left: true,
      hide: 'sm',
      cell: (row) => (
        <LinkBtn>
          <a href="mailto:info@petitcode.com">Contact</a>
        </LinkBtn>
      )
    }
  ]

  // The row data is composed into your custom expandable component via the data prop
  const ExpanableComponent = ({ data }) => (
    <div className="footable-row-detail-inner">
      {/* <div className='footable-row-detail-row address-row'><div className='footable-row-detail'>Location:</div><div className='footable-row-value'>{formatAddress(data.address)}</div></div> */}
      <div className="footable-row-detail-row tags-row">
        <div className="footable-row-detail">Tags:</div>
        <div className="footable-row-value">{data.tags}</div>
      </div>
      {/* <div className='footable-row-detail-row hourly-rate-row'><div className='footable-row-detail'>Hourly rate:</div><div className='footable-row-value'>{data.hourly_rate}</div></div> */}
      <div className="footable-row-detail-row daily-rate-row">
        <div className="footable-row-detail">Daily rate:</div>
        <div className="footable-row-value">{data.daily_rate}</div>
      </div>
      <div className="footable-row-detail-row groups-row">
        <div className="footable-row-detail">Groups:</div>
        <div className="footable-row-value row-categories">
          {formatCategories(data.groups)}
        </div>
      </div>
      <div className="footable-row-detail-row available-row">
        <div className="footable-row-detail">Availability:</div>
        <div className="footable-row-value">
          {data.unavailabilities
            ? data.unavailabilities
                .split(', ')
                .slice(0, 2)
                .toString()
                .replace(',', ' ')
            : 'Available'}
        </div>
      </div>
      <div className="footable-row-detail-row cta-row">
        <div className="footable-row-detail">Contact :</div>
        <div className="footable-row-value">
          <LinkBtn>Contact</LinkBtn>
        </div>
      </div>
    </div>
  )

  return (
    <DataTable
      className="list-table"
      columns={columns}
      data={props.csvData}
      // selectableRows // add for checkbox selection
      // Clicked
      // Selected={handleChange}
      expandableRows
      expandableRowsComponent={<ExpanableComponent />}
      // defaultSortField='surname'
      pagination="true"
      paginationPerPage="24"
    />
  )
  //  return (
  //    <div>{props.currentCards.name}</div>
  //  )
}

export default TableComponent
