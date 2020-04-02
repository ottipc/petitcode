import React, { useState } from 'react'
import styled from 'styled-components'
import SearchableDropdown from './SearchableDropdown'
import RatingsDropdown from './RatingsDropdown'
import SliderFilter from './SliderFilter/SliderFilter'
import { groupOptions, typeOptions } from './options'

import SearchFilter from './SearchFilter'
import DateFilter from './DateFilter'

const Wrapper = styled.div`
  padding: 0px;
  padding-bottom: 25px;
`

const ContainerUpper = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  width: 100%;
  padding-bottom: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 15px 20px 20px 20px;
  border: 1px solid hsla(0, 0%, 0%, 0.12);
`
const Lower = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  @media (max-width: 459px) {
    margin-bottom: 10px;
  }
`

const ActiveFilters = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  ${'' /* margin-top: 10px; */}
  @media (max-width: 992px) {
    flex-direction: column;
  }
`

const Filter = (props) => {
  const [searchFilterValue, setSearchFilterValue] = useState('')
  const [dateFilterValue, setDateFilterValue] = useState()
  const [hRateFilterValue, setHRateFilterValue] = useState([0, 150])
  const [dRateFilterValue, setDRateFilterValue] = useState([0, 800])
  const [groupFilter, setGroupFilter] = useState()
  const [skillsFilter, setSkillsFilter] = useState()
  const [tagsFilter, setTagsFilter] = useState()
  const [ratingFilter, setRatingFilter] = useState()
  const [typeFilter, setTypeFilter] = useState()
  const [hRateFilter, setHRateFilter] = useState([0, 150])
  const [dRateFilter, setDRateFilter] = useState([0, 800])
  const [activeFilters, setActiveFilters] = useState([])
  const [rerenderKey, setRerenderKey] = useState(0)
  const [initialRender, setInitialRender] = useState(true)
  const [initialFilter, setInitialFilter] = useState(true)
  const { tags, skills, filterCards } = props

  if (
    JSON.stringify(activeFilters) !== localStorage.getItem('activeFilters') &&
    localStorage.getItem('activeFilters') != null
  ) {
    setActiveFilters(JSON.parse(localStorage.getItem('activeFilters')))
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
    const dRateFilter = activeFilters.filter(
      (filter) => typeof filter.dRate !== 'undefined'
    )
    if (
      typeof dRateFilter[0] !== 'undefined' &&
      dRateFilter[0].dRate !== '' &&
      dRateFilterValue !== dRateFilter[0].dRate
    ) {
      setDRateFilterValue(dRateFilter[0].dRate)
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
    localStorage.removeItem('activeFilters')
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
        setHRateFilterValue(newFilterArray)
        break
    }
    setActiveFilters(af)
    localStorage.removeItem('activeFilters')
    setRerenderKey(Math.random())
    filterCards(af)
  }

  const activeFiltersHandler = () => {
    let renderFilters = []
    const validFilters = ['Industries', 'Skills', 'Tags', 'Type']
    renderFilters = activeFilters.map((type) => {
      const props = Object.entries(type)
      if (props[0][1].length > 0 && validFilters.includes(props[0][0])) {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'baseline',
              marginTop: '2px',
              marginRight: '5px'
            }}
          >
            <p
              style={{
                color: 'hsla(0,0%,0%,0.8)',
                fontFamily:
                  'Helvetica Neue,Segoe UI,Helvetica,Arial,sans-serif',
                fontSize: '1rem',
                fontStyle: 'italic',
                marginRight: 10,
                lineHeight: '1.75rem'
              }}
            >
              {props[0][0]}
            </p>
            {props[0][1].map((value) => {
              return (
                <div
                  style={{
                    backgroundColor: '#878787',
                    height: 14,
                    paddingTop: 15,
                    paddingBottom: 15,
                    paddingLeft: 10,
                    borderRadius: '1em',
                    display: 'flex',
                    alignItems: 'center',
                    marginRight: 10,
                    marginBottom: 4
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.9rem',
                      color: 'white',
                      marginBottom: '0px',
                      lineHeight: '1'
                    }}
                  >
                      {value}
                    </p>
                    <div>
                      <button
                        style={{
                          border: 'none',
                          fontSize: '0.8rem',
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
    localStorage.removeItem('activeFilters')
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
    localStorage.removeItem('activeFilters')
    setActiveFilters(af)
    filterCards(af)
  }

  return (
    <Wrapper>
      <Container>
        <ContainerUpper>
          {/* <SearchFilter value={searchFilterValue} searchFilter={value => searchFilter(value)} /> */}
          {/* </ContainerUpper>
        <Lower> */}
          <SearchableDropdown
            placeholder="Industries"
            selectedItems={groupFilter}
            options={groupOptions}
            onFilterSet={(value) => activateFilter('Industries', value)}
          />
          <SearchableDropdown
            placeholder="Hard skills"
            selectedItems={tagsFilter}
            options={tags}
            onFilterSet={(value) => activateFilter('Tags', value)}
          />
          <SearchableDropdown
            placeholder="Skills"
            selectedItems={skillsFilter}
            options={skills}
            onFilterSet={(value) => activateFilter('Industries', value)}
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
          {/* <SliderFilter
            label="Hourly Rate: "
            domain={[0, 150]}
            value={hRateFilterValue}
            onValueChange={(value) => activateFilter('hRate', value)}
          /> */}
          <SliderFilter
            label="Daily Rate: "
            domain={[0, 800]}
            value={dRateFilterValue}
            onValueChange={(value) => activateFilter('dRate', value)}
          />
          <DateFilter
            value={dateFilterValue}
            dateFilter={(value) => dateFilter(value)}
          />
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
