import React, { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Carousel from '../../../re-carousel/src/carousel'
import SlideItem from './SlideItem'
// import SearchFilter from '../SearchFilter'
import DateFilter from '../DateFilter'
import Buttons from './Buttons'
import styled from 'styled-components'
import SearchableDropdown from '../SearchableDropdown'
import { groupOptions } from '../options'
// import RatingsDropdown from '../RatingsDropdown'
import SliderFilter from '../SliderFilter/SliderFilter'
import '../Custom.css'
import {useTranslation} from "react-i18next";

const ActiveFilters = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 15px;
`
const Header = styled.p`
  ${'' /* font-size: 28px; */}
  font-size: 1.75rem;
  line-height: 42px;
  font-family: inherit;
  font-weight: bolder;
  text-align: left;
  margin-bottom: 5px;
  line-height: 1.75rem;
  display: block;
  font-family: Noto Sans,Helvetica Neue,Segoe UI,Helvetica,Arial,sans-serif;
  @media (min-width: 250px) {
    font-size: calc(21px + (8) * ((100vw - 300px) / 1620));
    line-height: calc(1.3em + (0) * ((100vw - 300px) / 1620));
  }
`

const SwiperWizard = (props) => {
  const {t, i18n} = useTranslation();
  const [searchFilterValue, setSearchFilterValue] = useState('')
  const [dateFilterValue, setDateFilterValue] = useState([])
  const [groupFilter, setGroupFilter] = useState([])
  const [skillsFilter, setSkillsFilter] = useState([])
  const [tagsFilter, setTagsFilter] = useState([])
  const [ratingFilter, setRatingFilter] = useState([])
  const [typeFilter, setTypeFilter] = useState([])
  const [hRateFilter, setHRateFilter] = useState([0, 150])
  const [dRateFilter, setDRateFilter] = useState([0, 1000])
  const [activeFilters, setActiveFilters] = useState([])
  const [csvData, setCsvData] = useState([])
  const [rerenderKey, setRerenderKey] = useState(0)
  const [skills, setSkills] = useState([])
  const [tags, setTags] = useState([])
  const {page} = props;

  const data = useStaticQuery(graphql`
    query MyQuery {
      allDataCsv {
        nodes {
          address
          birth_date
          company_name
          daily_rate
          email
          hourly_rate
          id
          name
          partner_since
          partner_type
          phone_nr
          rating
          social_media
          surname
          tags
          type
          skills
          unavailabilities
          groups
        }
      }
    }
  `)

  if (
    typeof data !== 'undefined' &&
    JSON.stringify(csvData) !==
      JSON.stringify(
        data.allDataCsv.nodes.filter(
          (entity) => entity.name !== '' && entity.surname !== ''
        )
      )
  ) {
    setCsvData(
      data.allDataCsv.nodes.filter(
        (entity) => entity.name !== '' && entity.surname !== ''
      )
    )
    setRerenderKey(Math.random())
    let list = []
    const tagsArr = []
    const tagsCheck = []
    const skillsArr = []
    const skillsCheck = []
    list = data.allDataCsv.nodes.map((entry, index) => {
      entry.tags.split(', ').filter(tag => tag !== '').forEach((tag) => {
        if (
          tagsCheck.findIndex(
            (item) => tag.toLowerCase() === item.toLowerCase()
          ) < 0
        ) {
          tagsCheck.push(tag)
          tagsArr.push({ key: tagsArr.length, value: tag, label: tag })
        }
      })
      entry.skills.split(', ').filter(skill => skill !== '').forEach((skill) => {
        if (
          skillsCheck.findIndex(
            (item) => skill.toLowerCase() === item.toLowerCase()
          ) < 0
        ) {
          skillsCheck.push(skill)
          skillsArr.push({ key: skillsArr.length, value: skill, label: skill })
        }
      })
    })

    if (
      JSON.stringify(tags) !==
      JSON.stringify(tagsArr.sort((a, b) => (a.value > b.value ? 1 : -1)))
    ) {
      setTags(tagsArr.sort((a, b) => (a.value > b.value ? 1 : -1)))
    }
    if (
      JSON.stringify(skills) !==
      JSON.stringify(skillsArr.sort((a, b) => (a.value > b.value ? 1 : -1)))
    ) {
      setSkills(skillsArr.sort((a, b) => (a.value > b.value ? 1 : -1)))
    }
  }

  const activateFilter = (type, value) => {
    const af = activeFilters
    let added = false
    switch (type) {
      case 'Industries':
        setGroupFilter(value)
        af.forEach((filter) => {
          if (Object.keys(filter)[0] === 'Industries') {
            filter.Industries = value.map((entry) => {
              return entry.value
            })
            added = true
          }
        })
        if (!added) {
          af.push({
            Industries: value.map((entry) => {
              return entry.value
            })
          })
        }
        break
      case 'Skills':
        setSkillsFilter(value)
        af.forEach((filter) => {
          if (Object.keys(filter)[0] === 'Skills') {
            filter.Skills = value.map((entry) => {
              return entry.value
            })
            added = true
          }
        })
        if (!added) {
          af.push({
            Skills: value.map((entry) => {
              return entry.value
            })
          })
        }
        break
      case 'Tags':
        setTagsFilter(value)
        af.forEach((filter) => {
          if (Object.keys(filter)[0] === 'Tags') {
            filter.Tags = value.map((entry) => {
              return entry.value
            })
            added = true
          }
        })
        if (!added) {
          af.push({
            Tags: value.map((entry) => {
              return entry.value
            })
          })
        }
        break
      case 'Rating':
        setRatingFilter(value)
        af.forEach((filter) => {
          if (Object.keys(filter)[0] === 'Rating') {
            filter.Rating = value
            added = true
          }
        })
        if (!added) {
          af.push({ Rating: value })
        }
        break
      case 'Type':
        setTypeFilter(value)
        af.forEach((filter) => {
          if (Object.keys(filter)[0] === 'Type') {
            filter.Type = value.map((entry) => {
              return entry.value
            })
            added = true
          }
        })
        if (!added) {
          af.push({
            Type: value.map((entry) => {
              return entry.value
            })
          })
        }
        break
      case 'hRate':
        setHRateFilter(value)
        af.forEach((filter) => {
          if (Object.keys(filter)[0] === 'hRate') {
            filter.hRate = value
            added = true
          }
        })
        if (!added) {
          af.push({ hRate: value })
        }
        break
      case 'dRate':
        setDRateFilter(value)
        af.forEach((filter) => {
          if (Object.keys(filter)[0] === 'dRate') {
            filter.dRate = value
            added = true
          }
        })
        if (!added) {
          af.push({ dRate: value })
        }
        break
      default:
        break
    }
    setActiveFilters(af)
  }

  const searchFilter = (value) => {
    const af = activeFilters
    let added = false
    setSearchFilterValue(value)
    af.forEach((filter) => {
      if (Object.keys(filter)[0] === 'Search') {
        filter.Search = value
        added = true
      }
    })
    if (!added) {
      af.push({ Search: value })
    }
    setActiveFilters(af)
  }

  const dateFilter = (value) => {
    const af = activeFilters
    let added = false
    setDateFilterValue(value)
    af.forEach((filter) => {
      if (Object.keys(filter)[0] === 'Date') {
        filter.Date = value
        added = true
      }
    })
    if (!added) {
      af.push({ Date: value })
    }
    setActiveFilters(af)
  }

  const removeFilter = (group, value) => {
    const af = activeFilters
    let newFilterArray = []
    af.forEach((filter) => {
      const props = Object.entries(filter)
      if (props[0][0] === group) {
        filter[group] = props[0][1].filter((fvalue) => fvalue !== value)
        newFilterArray = filter[group].map((value, index) => {
          return { ket: index, value: value, label: value }
        })
      }
    })

    switch (group) {
      case 'Industries':
        setGroupFilter(newFilterArray)
        break
      case 'Skills':
        setSkillsFilter(newFilterArray)
        break
      case 'Tags':
        setTagsFilter(newFilterArray)
        break
      case 'Rating':
        setRatingFilter(newFilterArray)
        break
      case 'Type':
        setTypeFilter(newFilterArray)
        break
      case 'hRate':
        // setHRateFilterValue(newFilterArray)
        break
    }
    setActiveFilters(af)
    // setRerenderKey(Math.random())
  }

  const activeFiltersHandler = (type) => {
    let renderFilters = []
    const validFilters = ['Industries', 'Skills', 'Tags', 'Type']
    if (activeFilters) {
      renderFilters = activeFilters
        .filter((filter) => filter.hasOwnProperty(type))
        .map((type) => {
          const props = Object.entries(type)
          if (props[0][1].length > 0 && validFilters.includes(props[0][0])) {
            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'baseline'
                }}
              >
                <p
                  style={{
                    color: '#656A6C',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '13px',
                    fontStyle: 'italic',
                    marginRight: 10
                  }}
                >
                  {props[0][0]}
                </p>
                {props[0][1].map((value, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        backgroundColor: '#A4A3A3',
                        height: 14,
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingLeft: 10,
                        borderRadius: 10,
                        display: 'flex',
                        alignItems: 'center',
                        marginRight: 10
                      }}
                    >
                      <p
                        style={{
                          fontSize: '10px',
                          color: 'white',
                          marginBottom: '0px'
                        }}
                      >
                        {value}
                      </p>
                      <div>
                        <button
                          style={{
                            border: 'none',
                            fontSize: 10,
                            color: 'white',
                            float: 'right'
                          }}
                          onClick={() => removeFilter(props[0][0], value)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          } else if (
            props[0][0] === 'Rating' &&
            typeof props[0][1] !== 'undefined' &&
            props[0][1] > 0
          ) {
            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'baseline'
                }}
              >
                <p
                  style={{
                    color: '#656A6C',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '13px',
                    fontStyle: 'italic',
                    marginRight: 10
                  }}
                >
                  {props[0][0]}
                </p>
                <div
                  style={{
                    backgroundColor: '#A4A3A3',
                    height: 14,
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 10,
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    marginRight: 10
                  }}
                >
                  <p
                    style={{
                      fontSize: '10px',
                      color: 'white',
                      marginBottom: '0px'
                    }}
                  >
                    More than {props[0][1]}
                  </p>
                  <div>
                    <button
                      style={{
                        border: 'none',
                        fontSize: 10,
                        color: 'white',
                        float: 'right'
                      }}
                      onClick={() => removeFilter(props[0][0], value)}
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
            )
          }
        })
    }
    return renderFilters
  }

  return (
    <Carousel
      key={rerenderKey}
      activeFilters={activeFilters}
      csvData={csvData}
      page={page}
      widgets={[Buttons]}
    >
      {/* <SlideItem>
        <div
          style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: 100
          }}
        >
          <p>Select the name of a freelancer: </p>
          <div>
            <SearchFilter onChangeValue={value => searchFilter(value)}/>
          </div>
        </div>
      </SlideItem> */}
      <SlideItem>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 100,
            width: '100%'
          }}
        >
          <Header>{t('specialistGroup')}</Header>
          <div>
            <SearchableDropdown
              placeholder="Industries"
              options={groupOptions}
              onFilterSet={(value) => activateFilter('Industries', value)}
            />
          </div>
          <ActiveFilters key={rerenderKey}>
            {activeFiltersHandler('Industries')}
          </ActiveFilters>
        </div>
      </SlideItem>
      <SlideItem>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 100,
            width: '100%'
          }}
        >
          <Header>Select the skills of the specialist: </Header>
          <div>
            <SearchableDropdown
              placeholder="Skills"
              options={skills}
              onFilterSet={(value) => activateFilter('Skills', value)}
            />
          </div>
          <ActiveFilters key={rerenderKey}>
            {activeFiltersHandler('Skills')}
          </ActiveFilters>
        </div>
      </SlideItem>
      <SlideItem>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 100,
            width: '100%'
          }}
        >
          <Header>Select the hard skills of the specialist: </Header>
          <div>
            <SearchableDropdown
              placeholder="Hard skills"
              options={tags}
              onFilterSet={(value) => activateFilter('Tags', value)}
            />
          </div>
          <ActiveFilters key={rerenderKey}>
            {activeFiltersHandler('Tags')}
          </ActiveFilters>
        </div>
      </SlideItem>
      <SlideItem>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 100,
            width: '100%'
          }}
        >
          <Header>Select the hard skills of the specialist: </Header>
          <div className="hourly-rate-filter">
            <SliderFilter
              label="Daily Rate: "
              value={dRateFilter}
              domain={[0, 1000]}
              onValueChange={(value) => activateFilter('dRate', value)}
            />
          </div>
        </div>
      </SlideItem>
      <SlideItem>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 100,
            width: '80%'
          }}
        >
          <Header>Select the date of availability of the specialist: </Header>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <DateFilter dateFilter={(value) => dateFilter(value)} />
          </div>
        </div>
      </SlideItem>
    </Carousel>
  )
}
export default SwiperWizard
