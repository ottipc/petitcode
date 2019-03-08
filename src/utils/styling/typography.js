const Typography = require('typography')
const typographyTheme = require('typography-theme-noriega')

const theme = require('./theme')

const typography = new Typography({
  ...typographyTheme,
  baseFontSize: '16px',
  baseLineHeight: 1.75,
  scaleRatio: 2.2,
  headerFontFamily: theme.fonts.header,
  headerWeight: 'bold',
  bodyFontFamily: theme.fonts.body
})

module.exports = typography
