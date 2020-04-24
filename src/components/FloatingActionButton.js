import React from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'
import './Custom.css'

const Wrapper = styled.button`
  width: 60px;
  height: 60px;
  background-color: black;
  border-radius: 50%;
  position: fixed;
  right: 90px;
  bottom: 45px;
  z-index: 1000;
`

const FloatingActionButton = (props) => {

  const {onClick} = props;

  return (
    <div>
      <Wrapper onClick={() => onClick()}>
        <p>{props.children}</p>
      </Wrapper>
    </div>
  )
}

FloatingActionButton.propTypes = {}

export default FloatingActionButton
