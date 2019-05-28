// This file is used in gatsby-node.js
// Ensure to use non-es-module syntax!

function createLocalizedPath({ slug, locale, prefix = null }) {
  return (
    '/' +
    [locale, prefix, slug === 'index' ? null : slug].filter(Boolean).join('/')
  )
}

module.exports = {
  createLocalizedPath
}
