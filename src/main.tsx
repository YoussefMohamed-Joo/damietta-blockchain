import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { I18nProvider } from './i18n'
import './index.css'

document.addEventListener('contextmenu', e => e.preventDefault())
document.addEventListener('keydown', e => {
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
    (e.ctrlKey && e.key === 'U') ||
    (e.ctrlKey && e.key === 'S') ||
    (e.ctrlKey && e.key === 'P')
  ) {
    e.preventDefault()
  }
})
document.addEventListener('dragstart', e => {
  const t = e.target as HTMLElement
  if (t.tagName === 'IMG' || t.tagName === 'A') e.preventDefault()
})
document.addEventListener('copy', e => e.preventDefault())
document.addEventListener('cut', e => e.preventDefault())
document.addEventListener('paste', e => e.preventDefault())

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nProvider>
        <App />
      </I18nProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
