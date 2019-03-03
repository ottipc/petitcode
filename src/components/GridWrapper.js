import styled from 'styled-components'

const GridWrapper = styled.div`
  margin: 0 auto;
  max-width: ${({ theme }) => 960 + theme.spacingUnit * 2}px;
  padding: 0 ${({ theme }) => theme.outerSpacing};
  width: 100%;
`

export default GridWrapper
