import React, { useState } from 'react'
import styled from 'styled-components'
import './Drop.css';
import { filter } from 'minimatch';

const DropdownFilterOption = styled.option`
    border-bottom: 1px solid #E7EAEC;
    color: #656A6C;
    position: relative;
    padding:0px;
    &:hover{
    background-color: #F2F1F1;
}
`
const DropdownOptions = styled.div`
    position: absolute;
    top: 100%;
    width: 100%;
    background-color: white;
    box-shadow: 1px 1px 1px 1px #888888;
    width: 230px;
    z-index: 2;
    max-height: 200px;
    overflow-y: auto;
    pointer-events: all;
`

const Drop = props => {

  const options = {
    values: [
      { title: 'Full name from A to Z', id: 1 },
      { title: 'Full name from Z to A', id: 2 },
      { title: 'Hourly Rate from A to Z', id: 3 },
      { title: 'Daily Rate from A to Z', id: 4 }
    ]
  };
  const { onChangeSelection } = props;

  const onChangeHandler = (event) => {
    onChangeSelection(event.target.value);
  }

  let optionTemplate = options.values.map(v => (
    <DropdownFilterOption key={v.id} className ="option" value={v.id}>{v.title}</DropdownFilterOption>
  ));
    
  return (
    <div>
      <span class="sorting-label m-r-xs">Sort by:</span>  
        <select value={options.value} onChange={onChangeHandler}>  
          {optionTemplate}
        </select>
      {/* <span class="caret"></span> */}
    </div>
  );
      
}

export default Drop

