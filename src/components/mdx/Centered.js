import styled from 'styled-components'

const Centered = styled.div`
  margin: 0 auto;
  max-width: ${({ theme }) => theme.grid.width}px;
  padding: 0 ${({ theme }) => theme.grid.gutter}px;
  text-align: center;
`

export default Centered
