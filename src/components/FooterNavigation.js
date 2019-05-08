import React from 'react'
import styled from 'styled-components'

import Link from './mdx/Link'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
`

export default function FooterNavigation() {
  return (
    <Wrapper>
      <Link humanId="imprint" />
      <Link humanId="data-protection" />
    </Wrapper>
  )
}
