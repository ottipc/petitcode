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
      grid: { gutter }
    }
  }) => css`
    grid-gap: 0 ${gutter};
  `}
`

export default FormGrid
