import styled, { css } from 'styled-components'

const Gap = styled.div`
  ${({ gap = 0, theme }) =>
    gap &&
    css`
      margin-top: ${theme.spacings[`s${gap}`]};
    `};
`

export default Gap
