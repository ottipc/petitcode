import styled, { css } from 'styled-components'

const Submit = styled.button`
  display: block;
  margin-top: ${({ theme }) => theme.spacings.s2};
  color: inherit;
  text-transform: uppercase;
  cursor: pointer;
  font-weight: bold;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.4;
      cursor: not-allowed;
    `}
`
export default Submit
