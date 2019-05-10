import React from 'react'
import propTypes from 'prop-types'

import styled from 'styled-components'

import Label from './Label'
import Error from './Error'

const TextArea = styled.textarea`
  display: block;
  width: 100%;
  color: inherit;
  font-size: 16px;
  min-height: 20vh;
  background: transparent;
  border: none;

  &::placeholder,
  &::-webkit-input-placeholder,
  &::-moz-input-placeholder,
  &:-ms-input-placeholder,
  &::-ms-input-placeholder {
    color: inherit;
    opacity: 0.6;
  }
`

export default function TextAreaField({ input, meta, label, ...props }) {
  return (
    <div>
      <Label visible={!!input.valu} htmlFor={input.name}>
        {label}
      </Label>
      <TextArea {...input} {...props} placeholder={label} />
      <Error>{meta.touched && meta.error && <span>{meta.error}</span>}</Error>
    </div>
  )
}

TextAreaField.propTypes = {
  input: propTypes.object.isRequired,
  meta: propTypes.object.isRequired,
  label: propTypes.string.isRequired
}
