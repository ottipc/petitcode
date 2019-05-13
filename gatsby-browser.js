import React from 'react'
import propTypes from 'prop-types'

import Global from './src/components/Global'

export const wrapPageElement = ({ element, props: { location } }) => {
  return <Global location={location}>{element}</Global>
}

wrapPageElement.propTypes = {
  element: propTypes.node.isRequired,
  props: propTypes.object.isRequired
}

const smoothScrollTo = (id) => () => {
  const el = document.querySelector(id)

  if (el) {
    const box = el.getBoundingClientRect()

    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop

    const clientTop =
      document.documentElement.clientTop || document.body.clientTop || 0

    const top = Math.floor(box.top + scrollTop - clientTop)

    return window.scrollTo({
      top,
      behavior: 'smooth'
    })
  }
  return false
}

// Gatsby hijacks the browser scroll. Lets do it on our own.
export const onRouteUpdate = ({ location: { hash } }) => {
  if (hash) {
    window.setTimeout(smoothScrollTo(hash), 10)
  }
}

// Ensure user gets the latest content as soon updates are ready
// Might prevent: https://github.com/gatsbyjs/gatsby/issues/13410
export const onServiceWorkerUpdateReady = () => window.location.reload(true)
