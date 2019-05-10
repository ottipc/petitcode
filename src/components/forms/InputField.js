import React from 'react'
import propTypes from 'prop-types'

import styled from 'styled-components'

import Label from './Label'
import Error from './Error'

const Input = styled.input`
  display: block;
  width: 100%;
  color: inherit;
  font-size: 20px;
  background: transparent;
  border: none;

  &::placeholder,
  &::-webkit-input-placeholder,
  &::-moz-input-placeholder,
  &:-ms-input-placeholder,
  &::-ms-input-placeholder {
    opacity: 0.6;
  }
`

export default function InputField({ input, meta, label, ...props }) {
  return (
    <div>
      <Label
        visible={!!input.value || props.type === 'file'}
        htmlFor={input.name}
      >
        {label}
        {props.type === 'file' && ':'}
      </Label>
      <Input {...input} {...props} placeholder={label} />
      <Error>{meta.touched && meta.error && <span>{meta.error}</span>}</Error>
    </div>
  )
}

InputField.propTypes = {
  input: propTypes.object.isRequired,
  meta: propTypes.object.isRequired,
  label: propTypes.string.isRequired,
  type: propTypes.string.isRequired
}
