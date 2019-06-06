import React from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'

const StyledTextField = styled(TextField)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacings.s2};

  & .MuiFormLabel-root {
    transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
      transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  }
`

export default function InputField({
  input: { name, onChange, value, ...restInput },
  meta,
  ...rest
}) {
  const showError =
    ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
    meta.touched

  return (
    <StyledTextField
      {...rest}
      name={name}
      id={`form-field-${name}`}
      helperText={showError ? meta.error || meta.submitError : undefined}
      error={showError}
      inputProps={{ ...restInput }}
      onChange={onChange}
      value={value}
    />
  )
}

InputField.propTypes = {
  input: propTypes.object.isRequired,
  meta: propTypes.object.isRequired
}
