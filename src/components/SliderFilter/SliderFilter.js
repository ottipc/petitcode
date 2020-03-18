import React, {useState} from 'react'
import styled from 'styled-components'
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider';
import { SliderRail, Handle, Track, Tick } from "./components";

const sliderStyle = {
    position: 'relative',
    width: '90%',
  };

const railStyle = {
    position: 'absolute',
    width: '100%',
    height: 6,
    borderRadius: 3,
    cursor: 'pointer',
    backgroundColor: '#DDDDDD',
};

const Wrapper = styled.div`
  padding: 25px;
`

const Container = styled.div`
  background-color: white;
  width: 100%;
`


const SliderFilter = (props) => {

const {onValueChange} = props;
const [values, setValues] = useState(props.domain); 

const onChange = (value) => {
    onValueChange(value);
    setValues(value);
}

  return (
    <>
      <p 
        style={{
          width: 100,
          marginBottom: 0, 
          color: '#A4A3A3', 
          marginRight: '20px', 
          fontStyle: 'italic', 
          fontFamily: 'Poppins, sans-serif', 
          fontSize: '13px',
          lineHeight: '2.9',
        }}
      >
        {props.label}
      </p>
      <div style={{ width: '15%', display: 'flex', alignItems: 'center'}}>
        <Slider
          mode={2}
          step={0.01}
          domain={props.domain}
          rootStyle={sliderStyle}
          onChange={(value) => onChange(value)}
          values={values}
        >
          <Rail>
            {({ getRailProps }) => (
              <div style={railStyle} {...getRailProps()} />
            )}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={values}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
        </Slider>
      </div>
    </>
  )
}

export default SliderFilter
