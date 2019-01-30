// This file is used in gatsby-node.js
// Ensure to use non-es-module syntax!

function createLocalizedPath({ slug, locale }) {
  if (!slug || slug === 'index') {
    return `/${locale}/`
  }
  return `/${locale}/${slug}/`
}

module.exports = {
  createLocalizedPath
}
