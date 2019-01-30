const Typography = require('typography')
const typographyTheme = require('typography-theme-noriega')

const theme = require('./theme')

const typography = new Typography({
  ...typographyTheme,
  baseFontSize: '16px',
  baseLineHeight: 1.75,
  scaleRatio: 2.2,
  headerFontFamily: theme.fonts.header,
  headerWeight: 'normal',
  bodyFontFamily: theme.fonts.body,
  googleFonts: [
    {
      name: theme.fonts.header[0],
      styles: ['400']
    },
    {
      name: theme.fonts.body[0],
      styles: ['400', '400i', '700', '700i']
    }
  ]
})

module.exports = typography
