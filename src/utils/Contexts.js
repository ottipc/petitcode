import { createContext } from 'react'

export const LocationContext = createContext({
  activeLocale: null,
  activeHumanId: null,
  images: {}
})

export const NavigationContext = createContext({
  toggleNavigation: () => {},
  navigationActive: false,
  scrolledDown: false
})

export const SectionContext = createContext({
  setSections: () => {},
  sections: [],
  setActiveSection: () => {},
  activeSection: 0,
  setScrollToSection: () => {},
  scrollToSection: null,
  isScrolling: false,
  setIsScrolling: () => {}
})
