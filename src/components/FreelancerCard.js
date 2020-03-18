import React from 'react'
import styled from 'styled-components'
import Ratings from 'react-ratings-declarative'
import Poppins from '../assets/fonts/Poppins-Regular.ttf'
import noImage from '../assets/noImage.png'

const ContentWrapper = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`
const Image = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  margin-top: 30px;
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
`
const Address = styled.p`
  font-family: 'Poppins', sans-serif;
  color: #6a6c6e;
  font-size: 13px;
  line-height: 13px;
  text-align: center;
`

const RatesSection = styled.div`
  width: 100%;
  background-color: rgba(221, 221, 221, 0.3);
  display: flex;
  justify-content: space-around;
  padding: 17px 8px;
  margin-top: 15px;
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
  margin-bottom: 15px;
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

const FreelancerCard = (props) => {
  const { data } = props
  // console.log('card data', data)

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
      return <Category key={index}>{abrev[cat.replace(/\s+/g, '')]}</Category>
    })
    return array
  }

  return (
    <ContentWrapper>
      <Image src={noImage} />
      <Name>{data.name + ' ' + data.surname}</Name>
      <Address>{formatAddress(data.address)}</Address>
      <Tags>{data.tags}</Tags>
      <Ratings
        rating={parseFloat(data.rating)}
        widgetDimensions="15px"
        widgetSpacings="0px"
      >
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
      </Ratings>
      <RatesSection>
        <Rate>
          <RateValue>0</RateValue>
          <RateLabel>Task</RateLabel>
        </Rate>
        <Rate>
          <RateValue>{data.hourly_rate}</RateValue>
          <RateLabel>Hourly rate</RateLabel>
        </Rate>
        <Rate>
          <RateValue>{data.daily_rate}</RateValue>
          <RateLabel>Daily rate</RateLabel>
        </Rate>
      </RatesSection>
      <CategoriesSection>{formatCategories(data.categories)}</CategoriesSection>
    </ContentWrapper>
  )
}

export default FreelancerCard
