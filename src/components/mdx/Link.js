import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'

import { GlobalContext } from '../../utils/Contexts'

const ctaStyle = css`
  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.header.join()};
  text-transform: uppercase;
  padding: 0.7em 1em;
  line-height: 1em;
  text-decoration: none;
  box-shadow: 5px 5px 0px 0px rgba(0, 0, 0, 0.22);
`

const StyledA = styled.a`
  ${({ type }) => type === 'CTA' && ctaStyle}
`

const StyledLink = styled(Link)`
  ${({ type }) => type === 'CTA' && ctaStyle}
`

export default function MdxLink({
  contentfulId,
  href,
  target = null,
  title,
  className = null,
  hash,
  children,
  type,
  ...linkProps
}) {
  if (type) {
    className = [className, `nohover`].filter(Boolean).join(' ')
  }
  if (href) {
    return (
      <StyledA type={type} className={className} href={href} target={target}>
        {children || title}
      </StyledA>
    )
  }
  const { pages, activeLocale } = useContext(GlobalContext)
  if (!Object.prototype.hasOwnProperty.call(pages, contentfulId)) {
    console.warn(`Unable to render menu link for ${contentfulId}`)
    return null
  }

  const page = pages[contentfulId][activeLocale]

  if (page) {
    const { path, title: pageTitle } = page
    if (!path) {
      console.error({ page })
    }
    const to = [path, hash ? `#${hash}` : null].filter(Boolean).join('')
    return (
      <StyledLink
        type={type}
        className={className}
        activeClassName="active"
        to={to}
        target={target}
        {...linkProps}
      >
        {children || title || pageTitle}
      </StyledLink>
    )
  }

  return null
}

MdxLink.propTypes = {
  contentfulId: propTypes.string,
  href: propTypes.string,
  className: propTypes.string,
  hash: propTypes.string,
  title: propTypes.string,
  target: propTypes.string,
  children: propTypes.node,
  type: propTypes.string
}
