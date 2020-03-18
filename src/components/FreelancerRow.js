import React from 'react'
import styled from 'styled-components'
import Ratings from 'react-ratings-declarative'
import Poppins from '../assets/fonts/Poppins-Regular.ttf'
import noImage from '../assets/noImage.png'

const ContentWrapper = styled.tr`
font-family: 'Poppins', sans-serif;
font-size: 13px;
`
const ContentTd = styled.td`
border-top: 1px solid #e7eaec;
line-height: 1.42857;
padding: 8px;
vertical-align: middle;
width:20%;
.footable-visible{
  vertical-align: middle;
}
.footable-visible.footable-to-toggle{
  padding-right: 0;
  width: 25px;
}

`
const ContentTdFirst = styled.td`

  padding-right: 0;
  width: 20px;


`
const Image = styled.img`
 width: 32px;
height: 32px;
border-radius: 50%;
margin: 0;
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
  
`
const Address = styled.p`
  font-family: 'Poppins', sans-serif;
  color: #6a6c6e;
  font-size: 13px;
  line-height: 13px;
  text-align: start;
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
${'' /* test width */}
  ${'' /* width: 30%; */}
  display: block;
  justify-content: space-around;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
  color: #a4a3a3;
  font-size: 13px;
  line-height: 11px;
  text-align: start;
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

const FreelancerBaseInfo= styled.div`
  display: flex;
  align-items: center;

`
const BaseInfoWrapper = styled.div`

`
const ImageWrapper = styled.div`
  display: flex;
  margin-right: 5px;

`
const RatingWrapper = styled.div`


`

const FreelancerRow = (props) => {
  const { data } = props
  console.log('card data', data)

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

  // const formatType = () => {
  //    if(data.type === "self managed"){
  //      return  true;
  //      console.log('dsfasdfas');
  //    }
  // }


  return (
    <ContentWrapper>
        <ContentTdFirst className="footable-to-toggle footable-visible footable-first-column">
          <span className="footable-toggle"> {data.type === "self managed" ? 'SM' : ''}</span>
        </ContentTdFirst>
        <ContentTd>
          <FreelancerBaseInfo>
          <ImageWrapper>
            <Image src={noImage} />
          </ImageWrapper>
          <BaseInfoWrapper>
            <Name>{data.name + ' ' + data.surname}</Name>
            <RatingWrapper>
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
              </RatingWrapper>
            </BaseInfoWrapper>
          
          </FreelancerBaseInfo>
        </ContentTd>
        <ContentTd> 
        <Address>{formatAddress(data.address)}</Address>
        </ContentTd>
        <ContentTd className="footable-tags">
        <Tags>{data.tags}</Tags>
        </ContentTd>

        <ContentTd>  
        {/* hourly_rate */}
          {data.hourly_rate}
       </ContentTd>
       <ContentTd>
       {/* daily_rate */}
        {data.daily_rate}
        </ContentTd>
      
        <ContentTd>
      <CategoriesSection>{formatCategories(data.categories)}</CategoriesSection> </ContentTd>
    </ContentWrapper>
  )
}

export default FreelancerRow
