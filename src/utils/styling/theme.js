const white = '#fff'
const black = '#3C4757'
const blue = '#0E65F1'
const blue2 = '#13CCC4'

module.exports = {
  spacingUnit: 16,
  outerSpacing: '2vmin',
  elements: {
    headerHeight: 100
  },
  grid: {
    width: 1320,
    columns: 12,
    gutter: 14,
    columnWidth: 1320 / 12
  },
  breakpoints: {
    small: '576px',
    medium: '768px',
    large: '992px',
    headerLogo: '1699px',
    headerLogoText: '1700px'
  },
  colors: {
    bg: white,
    font: black,
    primary: blue,
    primaryText: white,
    secondary: blue2,
    secondaryText: white,
    white,
    black
  },
  fonts: {
    header: [
      'Noto Sans',
      'Helvetica Neue',
      'Segoe UI',
      'Helvetica',
      'Arial',
      'sans-serif'
    ],
    body: [
      'Noto Sans',
      'Helvetica Neue',
      'Segoe UI',
      'Helvetica',
      'Arial',
      'sans-serif'
    ]
  }
}
