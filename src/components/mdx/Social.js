import React from 'react'
import styled from 'styled-components'

import FacebookLogo from '../../assets/icons/social/facebook.svg'
import InstagramLogo from '../../assets/icons/social/instagram.svg'
import TwitterLogo from '../../assets/icons/social/twitter.svg'

const Link = styled.a`
  font-weight: bold;
  width: 30px;
  & + & {
    margin-left: ${({ theme }) => theme.spacings.s1};
  }
`

export default function Social() {
  return (
    <div>
      <Link
        target="_blank"
        href="https://web.facebook.com/thecodetosuccess/"
        rel="noopener"
      >
        <FacebookLogo />
      </Link>
      &nbsp;
      <Link
        target="_blank"
        href="https://www.instagram.com/thecodetosuccess/"
        rel="noopener"
      >
        <InstagramLogo />
      </Link>
      &nbsp;
      <Link
        target="_blank"
        href="https://twitter.com/the_petitcode"
        rel="noopener"
      >
        <TwitterLogo />
      </Link>
    </div>
  )
}
