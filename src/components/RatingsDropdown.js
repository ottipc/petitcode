import React, {useState} from 'react';
import styled from 'styled-components';
import Select from 'react-dropdown-select';
import Switch from "react-switch";
import Ratings from 'react-ratings-declarative';

const Wrapper = styled.div`
  width: 10%;
  margin-right: 20px;
`

const Container = styled.div`
  background-color: white;
  width: 100%;
`

const DropdownContainer = styled.div`
  cursor: pointer;
`
const Placeholder = styled.p`
  color: #656A6C;
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
`


const RatingsDropdown = (props) => {

  const {onFilterSet} = props; 
  const {onUncheckFilter} = props; 
  const [checked, setChecked] = useState(false);
  const [rating, setRating] = useState(0);

  const ratingChanged = value => {
    onFilterSet(value);
    setRating(value);
  };

  const checkedHandler = () => {
    if (checked) {
      onFilterSet(0);
      onUncheckFilter();
      setRating(0);
    }
    setChecked(!checked);
  };

  const selector = 
    <div style={{ padding: '0px 10px 10px 10px', display: 'flex', alignItems: 'center',}}>
      <span style={{
            fontStyle: 'italic',
            fontSize: '11px',
            lineHeight: '11px',
            color: '#A4A3A3',
            marginRight: '10px',
          }}>No less then: </span>
      <Ratings
        rating={rating}
        widgetDimensions="12px"
        widgetSpacings="0px"
        changeRating={value => ratingChanged(value)}
      >
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
        <Ratings.Widget />
      </Ratings>
    </div>

  const customContentRenderer = ({ props, state, methods }) => (
  <DropdownContainer><Placeholder>{props.placeholder}</Placeholder></DropdownContainer>
  );

  const customDropdownRenderer = ({ props, state, methods }) => {

    return (
      <div>
        <label style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} htmlFor="material-switch">
          <span style={{
            color: '#656A6C',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '13px',
            marginRight: '10px',
          }}>Overall rating</span>
          <Switch
            onChange={() => checkedHandler()}
            checked={checked} 
            uncheckedIcon={false}
            checkedIcon={false}
            offColor="#ffffff"
            onColor="#02BD94"
            onHandleColor="#ffffff"
            height={18}
            width={30}
            handleDiameter={18}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          />
        </label>
        {checked && selector}
      </div>
    );
  };

  const onFilterChangeHandler = value => {
    onFilterSet(value);
  };

  return (
    <Wrapper>
      <Container>
        <Select
          options={props.options}
          style={{border: 'none'}}
          placeholder={props.placeholder}
          onChange={(values) => onFilterChangeHandler(values)}
          dropdownRenderer={customDropdownRenderer}
          contentRenderer={customContentRenderer}
          multi={true}
        />
      </Container>
    </Wrapper>
  )
}

export default RatingsDropdown
