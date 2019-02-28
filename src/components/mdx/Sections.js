import styled from 'styled-components'

const Sections = styled.article`
  scroll-snap-type: y proximity;
  overflow-y: -moz-scrollbars-none;
  -ms-overflow-style: none;
  overflow-y: scroll;
  height: 100vh;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
`

export default Sections
