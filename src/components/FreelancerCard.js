import React from 'react'
import styled from 'styled-components'
import Ratings from 'react-ratings-declarative'
import Poppins from '../assets/fonts/Poppins-Regular.ttf'
import noImage from '../assets/noImage.png'
import user from '../assets/user.png'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/translucent.css'
import MD5 from 'crypto-js/md5'
import './Tooltip.css'

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
  font-family: 'Fira Sans', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'Arial',
    sans-serif;
  border: 1px solid hsla(0,0%,0%,0.12);
  ${'' /* box-shadow: none; */}
}
`
const Image = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  margin-top: 30px;
  margin-bottom: 0;
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
  cursor: pointer;
  color: hsla(0, 0%, 0%, 0.8);
  text-transform: capitalize;
  &:hover {
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
  color: hsla(0, 0%, 0%, 0.8);
  font-size: 1rem;
  line-height: 1.75rem;
  text-align: center;
  margin-bottom: 6px;
  margin-bottom: 0;
  color: hsla(0, 0%, 0%, 0.8);
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
  color: hsla(0, 0%, 0%, 0.8);
`

const RateLabel = styled.p`
  margin-top: 4px;
  font-size: 0.8rem;
  line-height: 11px;
  text-transform: uppercase;
  color: hsla(0, 0%, 0%, 0.8);
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
  background: hsla(0, 0%, 0%, 0.8);
`

const RatingWrapper = styled.div``
const Wrapper = styled.div`
  &:hover {
    transform: scale(1.01);
  }
`
const Type = styled.div`
  position: absolute;
  padding-right: 0;
  width: 20px;
  height: 20px;
  background-image: linear-gradient(135deg, #000000 14px, #fff 14px);
`
const Availabilities = styled.div`
    color: #6a6c6e;
    font-size: 1rem;
    line-height: 1.75rem;
    ${'' /* margin-top: 4px; */}
    color: hsla(0,0%,0%,0.8);
    text-transform:capitalize;
    padding: 8px 26px;
    &:hover{
      cursor:pointer;
    }
}
`
// const LinkBtn = styled.button`
//   padding: 0px 1em;
//   border-radius: 1em;
//   background: rgb(135, 135, 135) none repeat scroll 0% 0%;
//   color: rgb(255, 255, 255);
//   font-size: 1rem;
//   line-height: 2em;
//   margin: 12px 2px;
//   a {
//     color: #fff;
//     text-decoration: none;
//     font-size: 1rem;
//     &:focus {
//       color: #fff;
//       text-decoration: none;
//     }
//     :hover {
//       color: #fff;
//       text-decoration: none;
//     }
//   }
// `

const LinkBtn = styled.button`
  background: #000;
  font-family: Noto Sans,Helvetica Neue,Segoe UI,Helvetica,Arial,sans-serif;
  text-transform: uppercase;
  padding: 0.55em 0.7em;
  line-height: 1em;
  -webkit-text-decoration: none;
  text-decoration: none;
  box-shadow: 5px 5px 0px 0px rgba(0,0,0,0.22);
  margin-bottom: 10px;
  a {
    color: #fff;
    font-size: 1rem;
  }
  a:hover {
    color: #fff;
    text-decoration:none;
  }
`

const FreelancerCard = (props) => {
  const { data, filters } = props

  const dates = data.unavailabilities.split(', ')
  let until = dates[0]
  let from = ''
  if (dates[1]) {
    from = dates[1]

    const du = until.split('-')
    const df = from.split('-')
    until = du[2] + '/' + du[1] + '/' + du[0]
    from = df[2] + '/' + df[1] + '/' + df[0]
  }

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
          <Group key={index}>{abrev[cat.replace(/\s+/g, '')]}</Group>
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
        {data.tags}
      </span>
    )
  }
  const NameToolip = () => {
    return (
      <span className="tags-tooltip" style={{ fontSize: '12px' }}>
        {data.name + ' ' + data.surname}
      </span>
    )
  }

  return (
    <Wrapper>
      <ContentWrapper>
        <Image src={user} />
        <GroupsSection>{formatGroups(data.groups)}</GroupsSection>
        <Name>
          {data.name.split(' ')[0] + ' ' + data.surname.charAt(0) + '.'}
        </Name>
        {/* <Address>{formatAddress(data.address)}</Address> */}
        <Tippy theme="translucent" content={<TagsToolip />}>
          <Tags>{data.tags}</Tags>
        </Tippy>

        {/* <RatingWrapper>
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
        </Ratings></RatingWrapper> */}

        <RatesSection>
          <Rate>
            <RateValue>
              {parseFloat(data.daily_rate) === 0 ? 640 : data.daily_rate * 1.25}
            </RateValue>
            <RateLabel>Daily rate</RateLabel>
          </Rate>
        </RatesSection>
        <Availabilities>
          {data.unavailabilities
            ? 'Until ' + until + ' From ' + from
            : 'Available'}
        </Availabilities>
        <LinkBtn>
          <a
            href={`mailto:info@petitcode.com?subject=Interested%20in%20booking%20this%20developer&body=Hi%20petitcode%20HR%20Team%2C%0D%0A%0D%0AI%20am%20interested%20in%20the%20freelancer${' ' +
              data.name.split(' ')[0] +
              ' ' +
              data.surname.charAt(0) +
              '.'}%20%0D%0A%0D%0A${filters}%0D%0A%0D%0A${'ID: ' +
              MD5(
                data.email
              ).toString()}%0D%0A%0D%0APlease%20get%20back%20to%20me%20as%20soon%20as%20you%20can%20via%20mail%20or%20phone%3A______________________.%0D%0A%0D%0AThank%20you.Kindly%2C%0D%0Ayour%20Name`}
          >
            Contact
          </a>
        </LinkBtn>
      </ContentWrapper>
    </Wrapper>
  )
}

export default FreelancerCard
