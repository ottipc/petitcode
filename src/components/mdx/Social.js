import React from 'react'
import styled from 'styled-components'

const Link = styled.a`
  font-weight: bold;
`

export default function Social() {
  return (
    <div>
      <Link
        target="_blank"
        href="https://web.facebook.com/thecodetosuccess/"
        rel="noopener"
      >
        FB
      </Link>
      &nbsp;
      <Link
        target="_blank"
        href="https://www.instagram.com/thecodetosuccess/"
        rel="noopener"
      >
        IN
      </Link>
      &nbsp;
      <Link
        target="_blank"
        href="https://twitter.com/the_petitcode"
        rel="noopener"
      >
        TW
      </Link>
    </div>
  )
}
