import styled from 'styled-components'

const Centered = styled.div`
  margin: 0 auto;
  max-width: ${({ theme }) => theme.grid.width}px;
  text-align: center;
`

export default Centered
