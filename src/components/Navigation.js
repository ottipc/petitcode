import React from 'react'
import propTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { Link, StaticQuery, graphql } from 'gatsby'

import GridWrapper from './GridWrapper'
import { LocationContext } from '../utils/Contexts'
import { createLocalizedPath } from '../utils/i18n'

const Wrapper = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  z-index: 1000;
  top: 0;
  height: 100vh;
  left: 100vw;
  width: 100vw;
  background: #000;
  color: #fff;
  padding: 5rem;
  transition: left 0.15s ease-in;

  ${({ navigationActive }) =>
    navigationActive &&
    css`
      left: 0;
    `};
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
  font-weight: bold;
  font-size: 12vmin;
  text-align: right;
  text-transform: uppercase;
`
const ListItem = styled.li`
  margin: 0;
  padding: 0;
`

const MenuLink = styled(Link)`
  letter-spacing: 4px;

  &:hover {
    text-decoration: none;
    color: #000;
    text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff,
      1px 1px 0 #fff;
  }
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
                <GridWrapper>
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
                          <MenuLink
                            to={createLocalizedPath({
                              locale: activeLocale,
                              slug
                            })}
                          >
                            {title}
                          </MenuLink>
                        </ListItem>
                      ))}
                  </List>
                </GridWrapper>
              </Wrapper>
            )}
          />
        )}
      </LocationContext.Consumer>
    )
  }
}

export default Navigation
