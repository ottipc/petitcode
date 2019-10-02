const white = '#fff'
const black = '#000'

const grey000 = '#292929'
const grey100 = '#404040'
const grey200 = '#4d4d4d'
const grey300 = '#595959'
const grey400 = '#6e6e6e'
const grey500 = '#878787'
const grey600 = '#a6a6a6'
const grey700 = '#d1d1d1'
const grey800 = '#e8e8e8'
const grey900 = '#f4f4f4'
const spacingUnit = 14
// Generates spacings map like spacings.s1 = 14px, spacings[s0.25] = 3px...
const spacings = [
  0.25,
  0.5,
  0.75,
  1,
  1.5,
  2,
  3,
  4,
  6,
  8,
  12,
  16,
  24,
  32,
  40,
  48
].reduce(
  (spacings, scale) => ({
    ...spacings,
    ['s' + scale]: `${Math.floor(scale * spacingUnit)}px`
  }),
  {}
)

module.exports = {
  elements: {
    headerHeight: 100
  },
  spacing: {
    content: {
      default: spacings.s2,
      medium: spacings.s4,
      large: spacings.s8,
      huge: spacings.s16
    },
    viewport: { default: spacings.s1, medium: spacings.s2 }
  },
  spacings,
  grid: {
    width: 1920,
    columns: 12,
    gutter: `${spacingUnit * 4}px`
    // columnWidth: 1320 / 12
  },
  breakpoints: {
    small: '576px',
    medium: '768px',
    large: '992px',
    huge: '1620px'
  },
  colors: {
    bg: white,
    font: black,
    white,
    black,
    grey000,
    grey100,
    grey200,
    grey300,
    grey400,
    grey500,
    grey600,
    grey700,
    grey800,
    grey900
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
      'Fira Sans',
      'Helvetica Neue',
      'Segoe UI',
      'Helvetica',
      'Arial',
      'sans-serif'
    ]
  }
}
