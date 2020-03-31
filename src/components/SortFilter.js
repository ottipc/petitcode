import React, { useState } from 'react'
import styled from 'styled-components'
import DropdownSelect from './DropdownSelect';
import Drop from './Drop';



const Wrapper = styled.div`
  padding: 0 25px;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
  ${'' /* font-family: 'Poppins', sans-serif; */}
  font-family: 'Noto Sans','Helvetica Neue','Segoe UI','Helvetica','Arial',sans-serif;
  font-size: 13px;
  color: #676a6c;
`

const Container = styled.div`
  display: flex;
  .sorting-label{
   font-size: 11px;
   color: #6A6C6E;
  }
  .m-r-xs{
   margin-right: 5px;
  }
  .d-flex{
   display: flex;
  }
  .d-flex.v-align{
   align-items: center;
  }
`

const DropdownFilterWrapper = styled.div`
  display: flex;
  position: relative;
 .dropdown-filter__title{
  font-style: normal;
  font-weight: bold;
  font-size: 11px;
  color: #6A6C6E;
  padding-right: 2px;
}`

const DropdownFilter = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  
.dropdown-filter__trigger{
  color: #A4A3A3;
  position: relative;
  display: inline-block !important:
}
span.dropdown-filter__title{
  font-style: normal;
  font-weight: bold;
  font-size: 11px;
  color: #6A6C6E;
}
.caret{
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 2px;
  vertical-align: middle;
  border-top: 4px dashed;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
}
}`


const ViewLink = styled.a`
color: #221757;
text-decoration: none;
cursor: pointer;
.las{
  font-family: 'Line Awesome Free';
  font-weight: 900;
}
.la-lg{
  font-size: 1.33333em;
  line-height: 0.75em;
  vertical-align: -.0667em;
}
.la-bars::before{
  content: "\f0c9";
}
`

const SortFilter = ({filter, currentCards}) => {
  // const [shown, setShown] = useState(true)
  // console.log("shown=",shown)
  return (
    <Wrapper>
      {/* <Container className="d-flex v-align">
        <span className="sorting-label m-r-xs">Sort by:</span>
        <DropdownFilterWrapper>
            <DropdownFilter>
            
            <DropdownSelect></DropdownSelect>
           
           </DropdownFilter>
        </DropdownFilterWrapper>

      </Container> */}


      <Drop filter={filter} currentCards={currentCards}></Drop>
      {/* test */}
      {/* <h2>this.state.shown = {shown ? "true" : "false"}</h2>
				<button onClick={() => setShown(!shown)}>Toggle</button> */}
      {/* test */}


      {/* <ViewLink>
      <span>Switch to table view</span>
      <i className="las la-lg la-bars"></i>
      </ViewLink> */}
     
    </Wrapper>
    
    
  )
}

export default SortFilter
