import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import { createLocalizedPath } from '../utils/i18n'
import { LocationContext } from '../utils/Contexts'
import { defaultLocale } from '../data/languages'

const List = styled.ul({
  display: 'flex',
  margin: 0,
  listStyleType: 'none',
  textTransform: 'uppercase'
})

const ListItem = styled.li({
  margin: '0.25rem'
})

const SwitcherLink = styled(Link)`
  transition: 0.15s opacity linear;
  opacity: 0.65;

  &:hover {
    opacity: 0.8;
    text-decoration: none;
  }
  &[aria-current='page'] {
    opacity: 1;
  }
`

function generatePageSelector({ pages, activeHumandId, langs }) {
  // Map of slugs for the current active page
  const slugMap = pages
    .filter((page) => page.node.fields.humanId === activeHumandId)
    .reduce((slugs, page) => {
      return {
        ...slugs,
        [page.node.fields.locale]: page.node.fields.slug
      }
    }, {})

  // Array representing the language switcher menu
  const langsMenu = langs.map((locale) => {
    let path

    // Generate path to translated version
    if (slugMap[locale]) {
      path = createLocalizedPath({
        locale,
        slug: slugMap[locale]
      })
    }

    // Fallback to default locale if translation is not available
    if (!path && slugMap[defaultLocale]) {
      path = createLocalizedPath({
        locale: defaultLocale,
        slug: slugMap[defaultLocale]
      })
    }

    // Fallback if no version with default locale is available
    if (!path && slugMap.length) {
      path = createLocalizedPath({
        locale: Object.keys(slugMap)[0],
        slug: slugMap[Object.keys(slugMap)[0]]
      })
    }

    // Unable to create any path. This should not happen.
    if (!path) {
      throw new Error(
        `Unable to generate language selector link for ${activeHumandId} with locale ${locale}`
      )
    }

    return {
      locale,
      path
    }
  })

  return langsMenu.map(({ path, locale }) => (
    <ListItem key={locale}>
      <SwitcherLink to={path}>{locale}</SwitcherLink>
    </ListItem>
  ))
}

export default class LanguageSelect extends React.PureComponent {
  render() {
    return (
      <LocationContext.Consumer>
        {({ activeHumandId }) => (
          <StaticQuery
            query={graphql`
              query LanguageSelectQuery {
                site {
                  ...Metadata
                }
                allMdx {
                  ...Pages
                }
              }
            `}
            render={({
              site: {
                siteMetadata: {
                  languages: { langs }
                }
              },
              allMdx: { edges: pages }
            }) => (
              <List>
                {generatePageSelector({
                  pages,
                  langs,
                  activeHumandId
                })}
              </List>
            )}
          />
        )}
      </LocationContext.Consumer>
    )
  }
}
