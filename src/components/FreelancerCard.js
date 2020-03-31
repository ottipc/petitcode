import React from 'react'
import styled from 'styled-components'
import Ratings from 'react-ratings-declarative'
import Poppins from '../assets/fonts/Poppins-Regular.ttf'

import noImage from '../assets/noImage.png'
// test
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/translucent.css';
import MD5 from "crypto-js/md5";
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
  font-family: 'Fira Sans','Helvetica Neue','Segoe UI','Helvetica','Arial',sans-serif;
`
const Image = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  margin-top: 30px;
  margin-bottom:0;
`

const Name = styled.p`
  @font-face {
    font-family: 'Poppins';
    src: local('Poppins'), url(${Poppins}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  ${'' /* font-family: 'Poppins', sans-serif; */}
  font-family: 'Noto Sans','Helvetica Neue','Segoe UI','Helvetica','Arial',sans-serif;
  font-size: 1.1rem;
  line-height: 1.75rem;
  font-weight: 600;
  text-align: center;
  cursor:pointer;
  color: hsla(0,0%,0%,0.8);
  text-transform: capitalize;
  &:hover{
    color: #020206;
  }
`
const Address = styled.p`
  color: #6a6c6e;
  font-size: 1rem;
  line-height: 1.75rem;
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
  color: hsla(0,0%,0%,0.8);
  font-size: 1rem;
  line-height: 1.75rem;
  text-align: center;
  margin-bottom: 6px;
  margin-bottom:0;
  color: hsla(0,0%,0%,0.8);
`

const Rate = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
`

const RateValue = styled.p`
  font-size: 1rem;
  font-weight: 600;
  line-height: 11px;
  margin-bottom: 5px;
  color: hsla(0,0%,0%,0.8);
`

const RateLabel = styled.p`
  margin-top: 4px;
  font-size: 0.8rem;
  line-height: 11px;
  text-transform: uppercase;
  color: hsla(0,0%,0%,0.8);
`

const GroupsSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 17px 8px;
  padding-bottom: 8px;
`

const Group = styled.div`
  width: 23px;
  height: 23px;
  border-radius: 15px;
  margin: 0px 5px;
  background-color: #686c6e;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  line-height: 1.75rem;
  color: white;
  font-weight: bold;
  background: rgb(135, 135, 135) none repeat scroll 0% 0%;
`

const RatingWrapper = styled.div`

`
const Wrapper = styled.div`
   &:hover {
    transform: scale(1.01);
	}
`
const Type = styled.div`
   position:absolute;
   padding-right: 0;
  width: 20px;
  height:20px;
  background-image: linear-gradient(135deg, #eb9330 14px, #fff 14px);
`
const Availabilities = styled.div`
    color: #6a6c6e;
    font-size: 0.8rem;
    line-height: 1.75rem;
    margin-top: 4px;
    color: hsla(0,0%,0%,0.8);
    text-transform:uppercase;
    &:hover{
      color:#eb9330;
      cursor:pointer;
    }
}
`
const LinkBtn = styled.button`
  padding: 0px 1em;
  border-radius: 1em;
  background: rgb(135,135,135) none repeat scroll 0% 0%;
  color: rgb(255,255,255);
  font-size: 1rem;
  line-height: 2em;
  margin: 12px 2px;
  a{
    color: #fff;
    text-decoration:none;
    font-size: 1rem;
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

const FreelancerCard = (props) => {
  const { data, filters } = props

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

  const formatGroups = (groupsData) => {
    const abrev = {
      FirstInterview: 'F',
      DEV: 'D',
      DES: 'D',
      Contacted: 'C',
      NewPartners: 'N',
      MGMENT: 'M',
      MAR: 'M'
    }
    
    const array = groupsData.split(', ').map((cat, index) => {
      return <Tippy theme ='translucent'  content={<span style={{fontSize:'12px',textAlign:'center',display:'block'}}>{cat.replace(/\s+/g, '')}</span>}>
      <Group key={index}>{abrev[cat.replace(/\s+/g, '')]}</Group></Tippy>
    })
    return array
  }

  const formatAv = (dates) => {
    let array=''
    if (dates.unavailabilities.length > 0){
       array = dates.split(', ').slice(0, 2).map((cat, index) => {
        return <div key={index}>{cat}</div>
      })
      return array
    }else{
      return <div>test</div>
    }
   
    
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
      <GroupsSection>{formatGroups(data.groups)}</GroupsSection>
      <Tippy theme ='translucent' content={<NameToolip></NameToolip>}>
        <Name>{data.name.split(" ")[0] + ' ' + data.surname.charAt(0)+'.'}</Name>
      </Tippy>
      {/* <Address>{formatAddress(data.address)}</Address> */}
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
          <RateValue>{data.hourly_rate}</RateValue>
          <RateLabel>Hourly rate</RateLabel>
        </Rate> */}
        <Rate>
          <RateValue>{data.hourly_rate}</RateValue>
          <RateLabel>Hourly rate</RateLabel>
        </Rate>
      </RatesSection>
      <Availabilities>{data.unavailabilities ? data.unavailabilities.split(', ').slice(0, 2).toString().replace(',',' '):'Available'}</Availabilities>
     <LinkBtn><a href={`mailto:info@petitcode.com?subject=Interested%20in%20booking%20this%20developer&body=Hi%20petitcode%20HR%20Team%2C%0D%0A%0D%0AI%20am%20interested%20in%20the%20freelancer${' ' + data.name.split(" ")[0] + ' ' + data.surname.charAt(0)+'.'}%20%0D%0A%0D%0A${filters}%0D%0A%0D%0A${'ID: ' + MD5(data.email).toString()}%0D%0A%0D%0APlease%20get%20back%20to%20me%20as%20soon%20as%20you%20can%20via%20mail%20or%20phone%3A______________________.%0D%0A%0D%0AThank%20you.Kindly%2C%0D%0Ayour%20Name`}>CTA</a></LinkBtn>
    </ContentWrapper>
    </Wrapper>
  )
}

export default FreelancerCard
