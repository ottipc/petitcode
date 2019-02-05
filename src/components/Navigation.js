import React from 'react'
import propTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { Link, StaticQuery, graphql } from 'gatsby'

import { LocationContext } from '../utils/Contexts'
import { createLocalizedPath } from '../utils/i18n'

const Wrapper = styled.div`
  display: none;
  ${({ navigationActive }) =>
    navigationActive &&
    css`
      display: block;
    `};
  position: fixed;
  z-index: 10000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000;
  color: #fff;
  padding: 5rem;
`

class Navigation extends React.PureComponent {
  static propTypes = {
    navigationActive: propTypes.bool.isRequired
  }
  render() {
    const { navigationActive } = this.props
    return (
      <LocationContext.Consumer>
        {({ activeLocale }) => (
          <StaticQuery
            query={graphql`
              query NavigationQuery {
                allMdx {
                  ...Pages
                }
              }
            `}
            render={({ allMdx: { edges: pages } }) => (
              <Wrapper navigationActive={navigationActive}>
                <ul>
                  {pages
                    .filter(
                      ({
                        node: {
                          fields: { locale }
                        }
                      }) => locale === activeLocale
                    )
                    .map(({ node: { fields: { title, slug } } }) => (
                      <li key={`menuitem-${slug}`}>
                        <Link
                          to={createLocalizedPath({
                            locale: activeLocale,
                            slug
                          })}
                        >
                          {title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </Wrapper>
            )}
          />
        )}
      </LocationContext.Consumer>
    )
  }
}

export default Navigation
