import styled, { css } from 'styled-components'

export const Gap = styled.div`
  ${({ gap = 0, theme }) =>
    gap &&
    css`
      margin-top: ${theme.spacings[`s${gap}`]};
    `};
`
