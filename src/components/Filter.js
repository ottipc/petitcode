import React, {useState} from 'react'
import styled from 'styled-components'
import SearchableDropdown from './SearchableDropdown'
import RatingsDropdown from './RatingsDropdown'
import SliderFilter from './SliderFilter/SliderFilter'
import { groupOptions } from './options'
import { typeOptions } from './options'

const Wrapper = styled.div`
  padding: 25px;
`

const Container = styled.div`
  background-color: white;
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 15px 20px 20px 20px;
`
const Lower = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`

const ActiveFilters = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`

const Filter = (props) => {

  const [groupFilter, setGroupFilter] = useState();
  const [skillsFilter, setSkillsFilter] = useState();
  const [tagsFilter, setTagsFilter] = useState();
  const [ratingFilter, setRatingFilter] = useState();
  const [typeFilter, setTypeFilter] = useState();
  const [hRateFilter, setHRateFilter] = useState();
  const [dRateFilter, setDRateFilter] = useState();
  const [activeFilters, setActiveFilters] = useState([]);
  const [rerenderKey, setRerenderKey] = useState(0);
  const {tags} = props;

  const activateFilter = (type, value) => {
    let af = activeFilters;
    let added = false;
    switch(type) {
      case 'Group':
        setGroupFilter(value);
        af.forEach(filter => {
          if (Object.keys(filter)[0] === 'Group') {
            filter.Group = value.map(entry => {return entry.value});
            added = true;
          }
        });
        if (!added) {
          af.push({Group: value.map(entry => {return entry.value})});
        }
        break;
      case 'Skills':
        setSkillsFilter(value);
        af.forEach(filter => {
          if (Object.keys(filter)[0] === 'Skills') {
            filter.Skills = value.map(entry => {return entry.value});
            added = true;
          }
        });
        if (!added) {
          af.push({Skills: value.map(entry => {return entry.value})});
        }
        break;
      case 'Tags':
        setTagsFilter(value);
        af.forEach(filter => {
          if (Object.keys(filter)[0] === 'Tags') {
            filter.Tags = value.map(entry => {return entry.value});
            added = true;
          }
        });
        if (!added) {
          af.push({Tags: value.map(entry => {return entry.value})});
        }
        break;
      case 'Rating':
        setRatingFilter(value);
        af.forEach(filter => {
          if (Object.keys(filter)[0] === 'Rating') {
            filter.Rating = value.map(entry => {return entry.value});
            added = true;
          }
        });
        if (!added) {
          af.push({Rating: value.map(entry => {return entry.value})});
        }
        break;
      case 'Type':
        setTypeFilter(value);
        af.forEach(filter => {
          if (Object.keys(filter)[0] === 'Type') {
            filter.Type = value.map(entry => {return entry.value});
            added = true;
          }
        });
        if (!added) {
          af.push({Type: value.map(entry => {return entry.value})});
        }
        break;
      default: 
        break;
    }
    setActiveFilters(af);
  };

  const removeFilter = (group, value) => {
    let tempFilters = activeFilters;
    tempFilters.forEach(filter => {
      const props = Object.entries(filter);
      if (props[0][0] === group) {
        filter[group] = props[0][1].filter(fvalue => fvalue !== value);
      }
    });
    setActiveFilters(tempFilters);
    setRerenderKey(Math.random());
  };

  const activeFiltersHandler = () => {
    let renderFilters = [];
    renderFilters = activeFilters.map(type => {
      const props = Object.entries(type);
      if (props[0][1].length > 0) {
        return (
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
          }}>
            <p style={{
              color: '#656A6C',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '13px',
              fontStyle: 'italic',
              marginRight: 10,
            }}>
              {props[0][0]}
            </p>
            {props[0][1].map(value => {
               return <div style={{
                  backgroundColor: '#A4A3A3',
                  height: 14,
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingLeft: 10,
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: 10,
               }}>
                  <p style={{
                  fontSize: '10px',
                  color: 'white',
                  marginBottom: '0px',
                  }}>
                    {value}
                  </p>
                  <div>
                    <button style={{border: 'none', fontSize: 10, color: 'white', float: 'right'}} onClick={() => removeFilter(props[0][0], value)}>X</button>
                  </div>
                </div>
            })}
          </div>
        );
      }
      return;
    });
    return renderFilters;
  };

  return (
    <Wrapper>
      <Container>
        <p>This is a fitler</p>
        <Lower>
          <SearchableDropdown placeholder="Group" options={groupOptions} onFilterSet={value => activateFilter('Group', value)}/>
          <SearchableDropdown placeholder="Skills" options={groupOptions} />
          <SearchableDropdown placeholder="Tags" options={tags} onFilterSet={value => activateFilter('Tags', value)}/>
          <RatingsDropdown placeholder="Rating" onFilterSet={value => setRatingFilter(value)}/>
          <SearchableDropdown placeholder="Type" options={typeOptions} onFilterSet={value => activateFilter('Type', value)}/>
          <SliderFilter label={'Hourly Rate: '} domain={[0, 150]} onValueChange={value => setHRateFilter(value)}/>
          <SliderFilter label={'Daily Rate: '} domain={[0, 800]} onValueChange={value => setDRateFilter(value)}/>
        </Lower>
        <ActiveFilters key={rerenderKey}>{activeFiltersHandler()}</ActiveFilters>
      </Container>
    </Wrapper>
  )
}

export default Filter
