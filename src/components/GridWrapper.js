import styled from 'styled-components'

const GridWrapper = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.grid.width}px;
  width: 100%;
`

export default GridWrapper
