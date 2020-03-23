import React from 'react'
import styled from 'styled-components'
import Ratings from 'react-ratings-declarative'
import Poppins from '../assets/fonts/Poppins-Regular.ttf'
import noImage from '../assets/noImage.png'
// test
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/translucent.css';

import './Tooltip.css';



const ContentWrapper = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	transition-property: transform;
  height: 100%;

`
const Image = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  margin-top: 30px;
  ${'' /* add */}
  margin-bottom:0;
`

const Name = styled.p`
  @font-face {
    font-family: 'Poppins';
    src: local('Poppins'), url(${Poppins}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  color: #221757;
  cursor:pointer;
  &:hover{
    color: #020206;
  }
`
const Address = styled.p`
  font-family: 'Poppins', sans-serif;
  color: #6a6c6e;
  font-size: 13px;
  line-height: 13px;
  text-align: center;
  margin-top: 0;
  margin-bottom: 20px;
`

const RatesSection = styled.div`
  width: 100%;
  background-color: rgba(221, 221, 221, 0.3);
  display: flex;
  justify-content: space-around;
  padding: 17px 8px;
  margin-top: 8px;
`
const Tags = styled.div`
  width: 60%;
  display: block;
  justify-content: space-around;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
  color: #a4a3a3;
  font-size: 13px;
  line-height: 11px;
  text-align: center;
  margin-bottom: 6px;
  ${'' /* add */}
  margin-bottom:0;
`

const Rate = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
`

const RateValue = styled.p`
  font-family: 'Poppins', sans-serif;
  color: #6a6c6e;
  font-size: 16px;
  font-weight: 600;
  line-height: 11px;
  margin-bottom: 5px;
`

const RateLabel = styled.p`
  font-family: 'Poppins', sans-serif;
  margin-top: 4px;
  color: #a4a3a3;
  font-size: 10px;
  line-height: 11px;
  text-transform: uppercase;
`

const CategoriesSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 17px 8px;
  ${'' /* add */}
  padding-bottom: 8px;
`

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

const RatingWrapper = styled.div`

`
const Wrapper = styled.div`
   ${'' /* position:relative; */}
   &:hover {
    transform: scale(1.01);
	}
`
const Type = styled.div`
   position:absolute;
   padding-right: 0;
  width: 20px;
  height:20px;
  background-image: linear-gradient(135deg, #02BD94 14px, #fff 14px);
`
// test
// const ContentTdFirst = styled.td`
//   padding-right: 0;
//   width: 20px;
//   background-image: linear-gradient(135deg, #02BD94 14px, #fff 14px);
//   border-bottom: 1px solid #e7eaec;
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 15px;
//   ${'' /* height: 100%; */}
//   width:100%;
// `
// const ContentTdTest = styled.div`
//   padding-right: 0;
//   width: 20px;
  
// `
// end
const FreelancerCard = (props) => {
  const { data } = props

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
      return <Tippy theme ='translucent' content={cat.replace(/\s+/g, '')}>
      <Category key={index}>{abrev[cat.replace(/\s+/g, '')]}</Category>
       </Tippy>
    })
    return array
  }
  const TypeToolip = () => {
    return <div style={{fontSize:'12px'}}>
    {/* Self-managed partner */}
    {data.type}
    </div>
   }
  const StarsToolip = () => {
     return <span className='raiting-tooltip' style={{fontSize:'12px'}}>
     Based on ratings by colleagues. Assessment criteria can be changed in Settings / My Network / General.
     </span>
    }
  const TagsToolip = () => {
      return <span className='tags-tooltip' style={{fontSize:'12px'}}>
     {data.tags}
      </span>
   }
   const NameToolip = () => {
    return <span className='tags-tooltip' style={{fontSize:'12px'}}>
   {data.name + ' ' + data.surname}
    </span>
 }


  return (
    <Wrapper>
    
      <Tippy theme ='translucent' content= {data.type}>
          {data.type === "self managed" ? <Type></Type> :''}
       </Tippy>
    <ContentWrapper>
      <Image src={noImage} />
      <CategoriesSection>{formatCategories(data.categories)}</CategoriesSection>
      <Tippy theme ='translucent' content={<NameToolip></NameToolip>}>
        <Name>{data.name + ' ' + data.surname.charAt(0)+'.'}</Name>
      </Tippy>
      {/* <Tippy theme ='translucent' content={<TypeToolip></TypeToolip>}>
          {data.type === "self managed" ? <ContentTdFirst></ContentTdFirst> : <ContentTdFirst></ContentTdFirst> }
          </Tippy> */}
      <Address>{formatAddress(data.address)}</Address>
      <Tippy theme ='translucent' content={<TagsToolip></TagsToolip>}>
        <Tags>{data.tags}</Tags>
      </Tippy>
      <Tippy theme ='translucent' content={<StarsToolip></StarsToolip>}>
        <RatingWrapper>
        <Ratings
          rating={parseFloat(data.rating)}
          widgetDimensions="13px"
          widgetSpacings="0px"
        >
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
          <Ratings.Widget />
        </Ratings></RatingWrapper>
      </Tippy>
      <RatesSection>
        {/* <Rate>
          <RateValue>0</RateValue>
          <RateLabel>Task</RateLabel>
        </Rate> */}
        <Rate>
          <RateValue>{data.hourly_rate}</RateValue>
          <RateLabel>Hourly rate</RateLabel>
        </Rate>
        <Rate>
          <RateValue>{data.daily_rate}</RateValue>
          <RateLabel>Daily rate</RateLabel>
        </Rate>
      </RatesSection>
      {/* <CategoriesSection>{formatCategories(data.categories)}</CategoriesSection> */}
    </ContentWrapper>
    </Wrapper>
  )
}

export default FreelancerCard
