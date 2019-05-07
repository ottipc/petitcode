const white = '#fff'
const black = '#000'

const grey000 = '#1F2933'
const grey100 = '#323F4B'
const grey200 = '#3E4C59'
const grey300 = '#52606D'
const grey400 = '#616E7C'
const grey500 = '#7B8794'
const grey600 = '#9AA5B1'
const grey700 = '#CBD2D9'
const grey800 = '#E4E7EB'
const grey900 = '#f4f5f6'
const spacingUnit = 14

module.exports = {
  elements: {
    headerHeight: 100
  },
  spacings: [
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
      ['s' + scale]: `${scale * spacingUnit}px`
    }),
    {}
  ),
  grid: {
    width: 1320,
    columns: 12,
    gutter: spacingUnit,
    columnWidth: 1320 / 12
  },
  breakpoints: {
    small: '576px',
    medium: '768px',
    large: '992px',
    huge: '1620px',
    headerLogo: '1699px',
    headerLogoText: '1700px'
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
      'Noto Sans',
      'Helvetica Neue',
      'Segoe UI',
      'Helvetica',
      'Arial',
      'sans-serif'
    ]
  }
}
