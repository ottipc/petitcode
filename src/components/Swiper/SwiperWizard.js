import React from 'react';
import Carousel from 're-carousel';
import SlideItem from './SlideItem';
import SearchFilter from '../SearchFilter';
import DateFilter from '../DateFilter';
import Buttons from './Buttons';
import styled from 'styled-components'
import SearchableDropdown from '../SearchableDropdown'
import { groupOptions , typeOptions } from '../options'
import RatingsDropdown from '../RatingsDropdown'
import SliderFilter from '../SliderFilter/SliderFilter'

const Lower = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`

const SwiperWizard = () => {

  return (
    <Carousel widgets={[Buttons]}>
      <SlideItem>{
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 100}}>
          <p>Select the name of a freelancer: </p>
          <div>
            <SearchFilter />
          </div>
        </div>
        }</SlideItem>
        <SlideItem>{
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 100}}>
            <p>Select the date of availability of a freelancer: </p>
            <div>
              <DateFilter />
            </div>
          </div>
        }</SlideItem>
      <SlideItem>{
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 100}}>
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
        }</SlideItem>
    </Carousel>
  );
};
export default SwiperWizard;