import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { createLocalizedPath } from '../utils/i18n'
import { NavigationContext, LocationContext } from '../utils/Contexts'

const StyledLink = styled(Link)``

export default function MenuItem({ className = null, humanId }) {
  const { pages } = useContext(NavigationContext)
  const { activeLocale } = useContext(LocationContext)

  const page = pages.find(
    (page) =>
      page.fields.humanId === humanId && page.fields.locale === activeLocale
  )

  if (page) {
    const { slug, locale, title } = page.fields
    return (
      <StyledLink
        className={className}
        activeClassName="active"
        to={createLocalizedPath({ locale, slug })}
      >
        {title}
      </StyledLink>
    )
  }

  return null
}

MenuItem.propTypes = {
  humanId: propTypes.string.isRequired,
  className: propTypes.string
}
