import React, {useState} from 'react'
import Carousel from '../../../re-carousel/src/carousel'
import SlideItem from './SlideItem'
import SearchFilter from '../SearchFilter'
import DateFilter from '../DateFilter'
import Buttons from './Buttons'
import styled from 'styled-components'
import SearchableDropdown from '../SearchableDropdown'
import { groupOptions, typeOptions } from '../options'
import RatingsDropdown from '../RatingsDropdown'
import SliderFilter from '../SliderFilter/SliderFilter'

const Lower = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`

const SwiperWizard = () => {

  const [searchFilterValue, setSearchFilterValue] = useState('');
  const [dateFilterValue, setDateFilterValue] = useState([]);
  const [groupFilter, setGroupFilter] = useState([]);
  const [skillsFilter, setSkillsFilter] = useState([]);
  const [tagsFilter, setTagsFilter] = useState([]);
  const [ratingFilter, setRatingFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);
  const [hRateFilter, setHRateFilter] = useState([]);
  const [dRateFilter, setDRateFilter] = useState([]);
  const [activeFilters, setActiveFilters] = useState([])

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

  return (
    <Carousel activeFilters={activeFilters} widgets={[Buttons]}>
      <SlideItem>
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
      </SlideItem>
      <SlideItem>
        <div
          style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: 100
          }}
        >
          <p>Select the date of availability of a freelancer: </p>
          <div>
            <DateFilter dateFilter={value => dateFilter(value)}/>
          </div>
        </div>
      </SlideItem>
      <SlideItem>
        <div
          style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: 100
          }}
        >
          <p>Select additional filters: </p>
          <div>
            <Lower>
              <SearchableDropdown
                placeholder="Group"
                  // selectedItems={groupFilter}
                options={groupOptions}
                onFilterSet={(value) => activateFilter('Group', value)}
              />
              <SearchableDropdown
                placeholder="Skills"
                options={groupOptions}
                onFilterSet={(value) => activateFilter('Skills', value)}
              />
              <SearchableDropdown
                placeholder="Tags"
                options={[]}
                onFilterSet={(value) => activateFilter('Tags', value)}
              />
              <RatingsDropdown
                placeholder="Rating"
                onUncheckFilter={() => activateFilter('Rating', 0)}
                onFilterSet={(value) => activateFilter('Rating', value)}
              />
              <SearchableDropdown
                placeholder="Type"
                options={typeOptions}
                onFilterSet={(value) => activateFilter('Type', value)}
              />
              <SliderFilter
                label="Hourly Rate: "
                domain={[0, 150]}
                onValueChange={(value) => activateFilter('hRate', value)}
              />
              <SliderFilter
                label="Daily Rate: "
                domain={[0, 800]}
                onValueChange={(value) => activateFilter('dRate', value)}
              />
            </Lower>
          </div>
        </div>
      </SlideItem>
    </Carousel>
  )
}
export default SwiperWizard
