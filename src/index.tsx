import React from 'react'
import ReactDOM from 'react-dom/client'

import Widget from './Widget'

const bodyEl = document.querySelector('body')

if (!bodyEl) {
  console.warn('Could not found "body" element for "Rick & Morty Widget" mount')
} else {
  const rootElement = document.createElement('div')

  bodyEl.appendChild(rootElement)

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Widget />
    </React.StrictMode>
  )
}
