import { createContext } from 'react'

import { langs, defaultLocale } from '../data/languages'

export const LocationContext = createContext({
  activeLocale: null,
  activeHumanId: null,
  location: {}
})

export const NavigationContext = createContext({
  toggleNavigation: () => {},
  navigationActive: false,
  content: 'HAMBURGER',
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

export const GlobalContext = createContext({
  pages: [],
  largeImages: [],
  mediumImages: [],
  videos: [],
  langs,
  defaultLocale,
  activeLocale: defaultLocale,
  pathname: '/'
})

export const ModalContext = createContext({
  handleShowModal: () => {},
})
