import React from 'react'
import propTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { Link, StaticQuery, graphql } from 'gatsby'

import { LocationContext } from '../utils/Contexts'
import { createLocalizedPath } from '../utils/i18n'

const Wrapper = styled.nav`
  display: none;
  ${({ navigationActive }) =>
    navigationActive &&
    css`
      display: flex;
    `};
  justify-content: flex-end;
  align-items: center;
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

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  font-family: ${({
    theme: {
      fonts: { header }
    }
  }) => header.join(', ')};
  font-size: 5.5vw;
  text-align: right;
`
const ListItem = styled.li`
  margin: 0;
  padding: 0;
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
                <List>
                  {pages
                    .filter(
                      ({
                        node: {
                          fields: { locale }
                        }
                      }) => locale === activeLocale
                    )
                    .map(({ node: { fields: { title, slug } } }) => (
                      <ListItem key={`menuitem-${slug}`}>
                        <Link
                          to={createLocalizedPath({
                            locale: activeLocale,
                            slug
                          })}
                        >
                          {title}
                        </Link>
                      </ListItem>
                    ))}
                </List>
              </Wrapper>
            )}
          />
        )}
      </LocationContext.Consumer>
    )
  }
}

export default Navigation
