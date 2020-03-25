import React, { Component } from 'react'
import styled from 'styled-components'
import './Custom.css';
import { filter } from 'minimatch';

import { faBars,faBorderAll } from '@fortawesome/free-solid-svg-icons'

const DropdownFilterOption = styled.option`
    border-bottom: 1px solid #E7EAEC;
    color: #656A6C;
    position: relative;
    padding:0px;
    &:hover{
    background-color: #F2F1F1;
    color: #575757;
    font-weight: bold;
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









export default class Drop extends Component {


    constructor(props) {
        super(props);
        this.state = {
          values: [
            { title: 'Full name from A to Z', id: 1 },
            { title: 'Full name from Z to A', id: 2 },
            { title: 'Hourly Rate from A to Z', id: 3 },
            { title: 'Daily Rate from A to Z', id: 4 }
          ]
        };
      }

      handleChange =(e)=>{
          let sortedCards = this.props.currentCards.sort(function(a, b) {
            var nameA = a.props.data.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.props.data.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            else if (nameA > nameB) {
              return 1;
            }
          });
        console.log('testo=', e.target.value);
        if(e.target.value === '1')
          this.props.filter(sortedCards)
        
        if(e.target.value === '2')
          this.props.filter(sortedCards.reverse());
      }



      
      render() {
        let optionTemplate = this.state.values.map(v => (
          <DropdownFilterOption key={v.id} className ="option" value={v.id}>{v.title}</DropdownFilterOption>
        ));
    
        return (
          <div className="sort-wrapper">
          <span class="sorting-label m-r-xs">Sort by:</span>
          
            <select value={this.state.value} onChange={this.handleChange}>
            
              {optionTemplate}
            </select>
            {/* <span class="caret"></span> */}
          </div>
        );
      }
}


