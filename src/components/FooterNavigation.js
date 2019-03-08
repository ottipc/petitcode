import React from 'react'

import MenuItem from './MenuItem'

export default function FooterNavigation() {
  return (
    <div>
      <MenuItem humanId="imprint" /> / <MenuItem humanId="data-protection" /> /{' '}
      <a
        className="hover"
        href="https://petitcode.com/press-kit/"
        rel="noopener"
        target="_blank"
      >
        Presse
      </a>
    </div>
  )
}
