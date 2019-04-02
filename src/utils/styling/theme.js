const white = '#fff'
const black = '#000'
const grey = '#f0f0f0'

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
    white,
    black,
    grey
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
