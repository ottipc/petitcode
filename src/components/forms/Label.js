import styled, { css } from 'styled-components'

const Label = styled.label`
  font-size: 0.8em;
  opacity: 0;
  transition: 0.3s opacity linear;

  ${({ visible }) =>
    visible &&
    css`
      opacity: 0.6;
    `}
`

export default Label
