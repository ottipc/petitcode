import * as React from 'react'
import propTypes from 'prop-types'
import RadioGroup from '@material-ui/core/RadioGroup'

const RadioWrapper = ({
  input: { value, name, onChange },
  meta,
  children,
  ...rest
}) => (
  <RadioGroup {...rest} name={name} onChange={onChange} value={value}>
    {children}
  </RadioGroup>
)

RadioWrapper.propTypes = {
  input: propTypes.object.isRequired,
  meta: propTypes.object.isRequired,
  children: propTypes.node.isRequired
}

export default RadioWrapper
