import React, { useContext } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { createLocalizedPath } from '../utils/i18n'
import { LocationContext, GlobalContext } from '../utils/Contexts'
import { defaultLocale } from '../data/languages'

const List = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  list-style-type: none;
  text-transform: uppercase;
  font-weight: bold;
`

const ListItem = styled.li`
  margin: 0;
`

const SwitcherLink = styled(Link)``

function generatePageSelector({ pages, activeHumandId, langs, activeLocale }) {
  // Map of slugs for the current active page
  const slugMap = pages
    .filter((page) => page.fields.humanId === activeHumandId)
    .reduce((slugs, page) => {
      return {
        ...slugs,
        [page.fields.locale]: page.fields.slug
      }
    }, {})

  // Array representing the language switcher menu
  const langsMenu = langs
    .map((locale) => {
      let path

      // Skip link for current locale
      if (locale === activeLocale) {
        return null
      }

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
    .filter(Boolean)

  return langsMenu.map(({ path, locale }) => (
    <ListItem key={locale}>
      <SwitcherLink to={path}>{locale}</SwitcherLink>
    </ListItem>
  ))
}

export default function LanguageSelect() {
  const { activeHumandId } = useContext(LocationContext)
  const { pages, langs, activeLocale } = useContext(GlobalContext)
  return (
    <List>
      {generatePageSelector({
        pages,
        langs,
        activeHumandId,
        activeLocale
      })}
    </List>
  )
}
