import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import de from '../data/messages/de'
import en from '../data/messages/en-US'

export default function i18nextInit() {
  i18n.use(initReactI18next).init({
    fallbackLng: 'en',

    resources: {
      en: { translation: en },
      de: { translation: de }
    },

    debug: false,

    interpolation: {
      escapeValue: false // not needed for react!!
    },

    react: {
      wait: true
    }
  })
}
