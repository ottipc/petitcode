import { createContext } from 'react'

export const LocationContext = createContext({
  activeLocale: null,
  activeHumanId: null
})

export const NavigationContext = createContext({
  toggleNavigation: () => {},
  navigationActive: false
})
