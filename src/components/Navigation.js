import React from 'react'
import propTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { Link, StaticQuery, graphql } from 'gatsby'

import PageContext from '../utils/PageContext'
import { createLocalizedPath } from '../utils/i18n'

const Wrapper = styled.div`
  display: none;
  ${({ menuActive }) =>
    menuActive &&
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
    menuActive: propTypes.bool.isRequired
  }
  render() {
    const { menuActive } = this.props
    return (
      <PageContext.Consumer>
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
              <Wrapper menuActive={menuActive}>
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
      </PageContext.Consumer>
    )
  }
}

export default Navigation
