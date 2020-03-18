import * as React from 'react';

// *******************************************************
// RAIL
// *******************************************************
const railOuterStyle = {
  position: 'absolute',
  width: '100%',
  height: 42,
  transform: 'translate(0%, -50%)',
  borderRadius: 7,
  cursor: 'pointer',
};

const railInnerStyle = {
  position: 'absolute',
  width: '100%',
  height: 14,
  transform: 'translate(0%, -50%)',
  borderRadius: 7,
  pointerEvents: 'none',
  backgroundColor: 'rgb(155,155,155)',
};

export const SliderRail = ({ getRailProps }) => {
  return (
    <>
      <div style={railOuterStyle} {...getRailProps()} />
      <div style={railInnerStyle} />
    </>
  );
};

// *******************************************************
// HANDLE COMPONENT
// *******************************************************

export const Handle = ({
  domain: [min, max],
  handle: { id, value, percent },
  disabled = false,
  getHandleProps,
}) => {
  return (
    <>
      <p style={{
          left: `${percent}%`,
          top: -35,
          position: 'absolute',
          fontSize: '11px',
          color: '#A4A3A3',
          fontFamily: 'Poppins',
      }}>{Math.floor(value * 100) / 100}</p>
      <div
        style={{
          left: `${percent}%`,
          position: 'absolute',
          WebkitTapHighlightColor: 'rgba(0,0,0,0)',
          zIndex: 5,
          width: 28,
          height: 28,
          cursor: 'pointer',
          backgroundColor: 'transparent',
        }}
        {...getHandleProps(id)}
      />
      <div
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        style={{
          left: `${percent}%`,
          position: 'absolute',
          transform: 'translate(-25%, -30%)',
          zIndex: 2,
          width: 14,
          height: 14,
          borderRadius: '50%',
          boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.3)',
          backgroundColor: disabled ? '#666' : 'white',
        }}
      />
    </>
  );
};

// *******************************************************
// KEYBOARD HANDLE COMPONENT
// Uses a button to allow keyboard events
// *******************************************************
export const KeyboardHandle = ({
  domain: [min, max],
  handle: { id, value, percent },
  disabled = false,
  getHandleProps,
}) => {
  return (
    <button
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      style={{
        left: `${percent}%`,
        position: 'absolute',
        zIndex: 2,
        width: 24,
        height: 24,
        borderRadius: '50%',
        boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.3)',
        backgroundColor: disabled ? '#666' : '#9BBFD4',
      }}
      {...getHandleProps(id)}
    />
  );
};

// *******************************************************
// TRACK COMPONENT
// *******************************************************

export const Track = ({
  source,
  target,
  getTrackProps,
  disabled = false,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        height: 6,
        zIndex: 1,
        backgroundColor: disabled ? '#999' : '#02BD94',
        borderRadius: 7,
        top: 0,
        cursor: 'pointer',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps()}
    />
  );
};

// *******************************************************
// TICK COMPONENT
// *******************************************************

export const Tick = ({ tick, count, format = d => d }) => {
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          marginTop: 14,
          width: 1,
          height: 5,
          backgroundColor: 'rgb(200,200,200)',
          left: `${tick.percent}%`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          marginTop: 22,
          fontSize: 10,
          textAlign: 'center',
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${tick.percent}%`,
        }}
      >
        {format(tick.value)}
      </div>
    </div>
  );
};