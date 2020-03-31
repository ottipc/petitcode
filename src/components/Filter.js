import React, { useState } from 'react'
import styled from 'styled-components'
import SearchableDropdown from './SearchableDropdown'
import RatingsDropdown from './RatingsDropdown'
import SliderFilter from './SliderFilter/SliderFilter'
import { groupOptions, typeOptions } from './options'

import SearchFilter from './SearchFilter'
import DateFilter from './DateFilter'

const Wrapper = styled.div`
  padding: 25px;
`

const ContainerUpper = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  width: 75%;
  padding-bottom: 20px;
  justify-content: space-between;
  @media (max-width: 991px) {
    flex-direction: column;
  }
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 15px 20px 20px 20px;
`
const Lower = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const ActiveFilters = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`

const Filter = (props) => {
  const [searchFilterValue, setSearchFilterValue] = useState('')
  const [dateFilterValue, setDateFilterValue] = useState()
  const [hRateFilterValue, setHRateFilterValue] = useState([0, 150])
  const [groupFilter, setGroupFilter] = useState()
  const [skillsFilter, setSkillsFilter] = useState()
  const [tagsFilter, setTagsFilter] = useState()
  const [ratingFilter, setRatingFilter] = useState()
  const [typeFilter, setTypeFilter] = useState()
  const [hRateFilter, setHRateFilter] = useState([0, 150])
  const [dRateFilter, setDRateFilter] = useState()
  const [activeFilters, setActiveFilters] = useState([])
  const [rerenderKey, setRerenderKey] = useState(0)
  const [initialRender, setInitialRender] = useState(true)
  const [initialFilter, setInitialFilter] = useState(true)
  const { tags, skills, filterCards } = props

  if (
    typeof props.activeFilters !== 'undefined' &&
    props.activeFilters != null &&
    JSON.stringify(activeFilters) !== JSON.stringify(props.activeFilters) &&
    initialRender
  ) {
    setActiveFilters(props.activeFilters)
    setInitialRender(false)
  }

  if (activeFilters.length > 0) {
    const searchFilter = activeFilters.filter(
      (filter) => typeof filter.Search !== 'undefined'
    )
    if (
      typeof searchFilter[0] !== 'undefined' &&
      searchFilter[0].Search !== '' &&
      searchFilterValue !== searchFilter[0].Search
    ) {
      setSearchFilterValue(searchFilter[0].Search)
    }
  }

  if (activeFilters.length > 0) {
    const dateFilter = activeFilters.filter(
      (filter) => typeof filter.Date !== 'undefined'
    )
    if (
      typeof dateFilter[0] !== 'undefined' &&
      dateFilter[0].Date !== '' &&
      dateFilterValue !== dateFilter[0].Date
    ) {
      setDateFilterValue(dateFilter[0].Date)
    }
  }

  if (activeFilters.length > 0) {
    const hRateFilter = activeFilters.filter(
      (filter) => typeof filter.hRate !== 'undefined'
    )
    if (
      typeof hRateFilter[0] !== 'undefined' &&
      hRateFilter[0].hRate !== '' &&
      hRateFilterValue !== hRateFilter[0].hRate
    ) {
      setHRateFilterValue(hRateFilter[0].hRate)
    }
  }

  if (
    typeof activeFilters !== 'undefined' &&
    activeFilters != null &&
    activeFilters.length > 0 &&
    initialFilter
  ) {
    filterCards(activeFilters)
    setInitialFilter(false)
    setRerenderKey(Math.random())
  }

  const activateFilter = (type, value) => {
    const af = activeFilters
    let added = false
    switch (type) {
      case 'Group':
        setGroupFilter(value)
        af.forEach((filter) => {
          if (Object.keys(filter)[0] === 'Group') {
            filter.Group = value.map((entry) => {
              return entry.value
            })
            added = true
          }
        })
        if (!added) {
          af.push({
            Group: value.map((entry) => {
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
        setHRateFilterValue(value)
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
    setRerenderKey(Math.random())
    filterCards(af)
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
      case 'Group':
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
        setHRateFilterValue(newFilterArray)
        break
    }
    setActiveFilters(af)
    setRerenderKey(Math.random())
    filterCards(af)
  }

  const activeFiltersHandler = () => {
    let renderFilters = []
    const validFilters = ['Group', 'Skills', 'Tags', 'Type']
    if (activeFilters) {
      renderFilters = activeFilters.map((type) => {
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
              {props[0][1].map((value) => {
                return (
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
    filterCards(af)
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
    filterCards(af)
  }

  return (
    <Wrapper>
      <Container>
        <ContainerUpper>
          {/* <SearchFilter value={searchFilterValue} searchFilter={value => searchFilter(value)} /> */}
          <DateFilter
            value={dateFilterValue}
            dateFilter={(value) => dateFilter(value)}
          />
          {/* </ContainerUpper>
        <Lower> */}
          <SearchableDropdown
            placeholder="Group"
            selectedItems={groupFilter}
            options={groupOptions}
            onFilterSet={(value) => activateFilter('Group', value)}
          />
          <SearchableDropdown
            placeholder="Skills"
            selectedItems={skillsFilter}
            options={skills}
            onFilterSet={(value) => activateFilter('Skills', value)}
          />
          <SearchableDropdown
            placeholder="Hard skills"
            selectedItems={tagsFilter}
            options={tags}
            onFilterSet={(value) => activateFilter('Tags', value)}
          />
          {/* <RatingsDropdown
            placeholder="Rating"
            onUncheckFilter={() => activateFilter('Rating', 0)}
            onFilterSet={(value) => activateFilter('Rating', value)}
          />
          <SearchableDropdown
            placeholder="Type"
            options={typeOptions}
            onFilterSet={(value) => activateFilter('Type', value)}
          /> */}
          <SliderFilter
            label="Hourly Rate: "
            domain={[0, 150]}
            value={hRateFilterValue}
            onValueChange={(value) => activateFilter('hRate', value)}
          />
          {/* <SliderFilter
            label="Daily Rate: "
            domain={[0, 800]}
            onValueChange={(value) => activateFilter('dRate', value)}
          /> */}
          {/* </Lower> */}
        </ContainerUpper>
        <ActiveFilters key={rerenderKey}>
          {activeFiltersHandler()}
        </ActiveFilters>
      </Container>
    </Wrapper>
  )
}

export default Filter
