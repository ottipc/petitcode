import styled, { css } from 'styled-components'

const FormGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > * {
    flex: 1 0 300px;
  }

  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${({ minWidth = '300px' }) => minWidth}, 1fr)
  );
  ${({
    theme: {
      grid: { gutter },
      spacings: { s1 }
    }
  }) => css`
    grid-gap: ${s1} ${gutter};
  `}
`

export default FormGrid
