import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useI18n } from '../i18n'

export default function Navbar() {
  const { t } = useI18n()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path ? 'active' : ''

  useEffect(() => {
    const onScroll = () => {
      requestAnimationFrame(() => setScrolled(window.scrollY > 20))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (window.innerWidth >= 1024) setMenuOpen(false)
  }, [location])

  const burger = '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>'
  const close = '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'

  const navLink = (to: string, label: string) => (
    <Link to={to} className={`nav-link text-slate-800 text-sm xl:text-base ${isActive(to)}`}>
      {label}
    </Link>
  )

  const linkClass = (to: string) => `nav-link text-slate-800 text-base ${isActive(to)}`

  return (
    <header className="absolute top-0 left-0 right-0 z-20 pt-0 lg:pt-8 px-2 sm:px-6 lg:px-10">
      <nav className={`navbar-glass mx-auto max-w-5xl px-3 sm:px-4 py-0 flex items-center min-h-[20px] sm:min-h-[32px] lg:min-h-[58.5px] ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="flex items-center shrink-0" style={{ marginTop: 6 }}>
          <img src="/img/logo.png" alt="" className="w-auto object-contain" draggable="false" style={{ userSelect: 'none', WebkitUserSelect: 'none', WebkitTouchCallout: 'none', height: 72 }} onContextMenu={(e) => e.preventDefault()} />
        </Link>
        <ul className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 flex-1" style={{ marginLeft: 60 }}>
          <li>{navLink('/', t('nav.home'))}</li>
          <li>{navLink('/features', t('nav.features'))}</li>
          <li>{navLink('/how-it-works', t('nav.how'))}</li>
        </ul>
        <div className="hidden lg:flex items-center justify-end gap-2 xl:gap-3 shrink-0">
          <Link to="/login" className="login-btn px-4 xl:px-5 py-2.5 text-sm">{t('nav.login')}</Link>
          <Link to="/register" className="register-btn px-4 xl:px-5 py-2.5 text-sm">{t('nav.register')}</Link>
        </div>
        <button id="menuToggle" onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden ml-auto p-0.5 sm:p-1 rounded-lg hover:bg-slate-100 transition" aria-label={t('nav.menu')}>
          <svg id="menuIcon" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: menuOpen ? close : burger }} />
        </button>
      </nav>
      <div className={`mx-auto max-w-5xl mt-2 navbar-glass mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul className="flex flex-col gap-4">
          <li><Link to="/" className={linkClass('/')} onClick={() => setMenuOpen(false)}>{t('nav.home')}</Link></li>
          <li><Link to="/features" className={linkClass('/features')} onClick={() => setMenuOpen(false)}>{t('nav.features')}</Link></li>
          <li><Link to="/how-it-works" className={linkClass('/how-it-works')} onClick={() => setMenuOpen(false)}>{t('nav.how')}</Link></li>
        </ul>
        <div className="flex flex-col gap-3 mt-5 pt-5 border-t border-slate-200/60">
          <Link to="/login" className="login-btn w-full text-center px-5 py-2.5 text-sm" onClick={() => setMenuOpen(false)}>{t('nav.login')}</Link>
          <Link to="/register" className="register-btn w-full text-center px-5 py-2.5 text-sm" onClick={() => setMenuOpen(false)}>{t('nav.register')}</Link>
        </div>
      </div>
    </header>
  )
}
