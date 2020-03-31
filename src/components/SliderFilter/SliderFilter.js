import React, { useState } from 'react'
import styled from 'styled-components'
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'
import { SliderRail, Handle, Track, Tick } from './components'
import '../Custom.css'

const sliderStyle = {
  position: 'relative',
  width: '90%'
}

const railStyle = {
  position: 'absolute',
  width: '100%',
  height: 6,
  borderRadius: 3,
  cursor: 'pointer',
  backgroundColor: '#DDDDDD'
}

const Wrapper = styled.div`
  padding: 25px;
`

const Container = styled.div`
  background-color: white;
  width: 100%;
`
const SliderWrapper = styled.div`
  ${'' /* width: 100%; */}
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 380px;
  @media (max-width: 947px) {
    padding-top: 15px;
  }
  @media (max-width: 902px) {
    ${'' /* margin-top: 10px; */}
  }
  p {
    margin-right: 15px !important;
    @media (max-width: 457px) {
      padding-bottom: 20px;
    }
    ${'' /* @media (max-width: 434px) {
    margin-bottom: 15px !important;
  }  */}
  }
`

const SliderFilter = (props) => {
  const { onValueChange, value } = props
  const [values, setValues] = useState(props.domain)
  const [initialRender, setInitialRender] = useState(true)

  if (value !== values && initialRender) {
    setValues(value)
    setInitialRender(false)
  }

  const onChange = (value) => {
    onValueChange(value)
    setValues(value)
  }

  return (
    <>
      <SliderWrapper>
        <p
          style={{
            width: 105,
            marginBottom: 0,
            color: 'hsla(0,0%,0%,0.8)',
            marginRight: '0',
            fontStyle: 'italic',
            // fontFamily: 'Poppins, sans-serif',
            fontFamily:
              'Noto Sans,Helvetica Neue,Segoe UI,Helvetica,Arial,sans-serif',
            fontSize: '1rem',
            lineHeight: '1.75rem',
            fontWeight: 'bold'
          }}
        >
          {props.label}
        </p>
        <div style={{ width: '250px', display: 'flex', alignItems: 'center' }}>
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
                  {handles.map((handle) => (
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
      </SliderWrapper>
    </>
  )
}

export default SliderFilter
