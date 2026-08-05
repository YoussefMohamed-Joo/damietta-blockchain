import { Link } from 'react-router-dom'
import { Globe, Languages, Shield } from 'lucide-react'
import { useI18n } from '../i18n'
import { FloatingPathsBackground } from './ui/floating-paths'

export default function Footer() {
  const { lang, setLang, t } = useI18n()

  const col = (items: [string, string][]) => items.map(([label, to]) => (
    <Link key={to} to={to} style={{ color: '#94A3B8', fontSize: '.85rem', transition: 'color .2s', textDecoration: 'none', padding: '.2rem 0', display: 'inline-block' }}
      onMouseEnter={e => e.currentTarget.style.color = '#fff'}
      onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
    >{label}</Link>
  ))

  const extCol = (items: [string, string][]) => items.map(([label, to]) => (
    <a key={to} href={to} style={{ color: '#94A3B8', fontSize: '.85rem', transition: 'color .2s', textDecoration: 'none', padding: '.2rem 0', display: 'inline-block' }}
      onMouseEnter={e => e.currentTarget.style.color = '#fff'}
      onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
    >{label}</a>
  ))

  const cols: { title: string; key: string; external?: boolean; items: [string, string][] }[] = [
    { title: t('footer.quick_links'), key: 'ql', items: [[t('footer.home'), '/'], [t('footer.features'), '/features'], [t('footer.how'), '/how-it-works'], [t('footer.verify'), '/verify'], [t('footer.admin_panel'), '/admin'], [t('footer.student_dash'), '/dashboard']] },
    { title: t('footer.resources'), key: 'res', items: [[t('footer.student_portal'), '/student-portal'], [t('footer.faculty_guide'), '/faculty-guide'], [t('footer.faqs'), '/faqs'], [t('footer.contact'), '/contact']] },
    { title: t('footer.dashboards'), key: 'dash', external: true, items: [[t('footer.student_dashboard'), '/html-dashboards/student-dashboard'], [t('footer.reviewer_dashboard'), '/html-dashboards/reviewer-dashboard'], [t('footer.admin_dashboard'), '/html-dashboards/admin-dashboard'], [t('footer.audit_logs'), '/html-dashboards/audit-logs'], [t('footer.notifications'), '/html-dashboards/notifications']] },
    { title: t('footer.legal'), key: 'legal', items: [[t('footer.privacy'), '/privacy'], [t('footer.terms'), '/terms']] },
  ]

  return (
    <footer style={{ padding: '3.5rem 2rem 0', marginTop: 'auto', background: '#0F172A', borderTop: '1px solid rgba(255,255,255,.06)', position: 'relative', zIndex: 1, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0, opacity: .7 }}>
        <FloatingPathsBackground position={-1} colorClass="text-[#cbd5e1]" className="w-full h-full">
          <div />
        </FloatingPathsBackground>
      </div>
      <div className="max-w-5xl mx-auto" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr 1.2fr', gap: '2.5rem' }}>
        <div>
          <img src="/img/logo.png" alt="" style={{ height: 36, marginBottom: '.85rem' }} />
          <p style={{ color: '#94A3B8', fontSize: '.82rem', lineHeight: 1.7 }}>
            {t('footer.tagline')}
          </p>
          <div style={{ display: 'flex', gap: '.6rem', marginTop: '1.25rem' }}>
            {[
              { url: 'https://github.com', path: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' },
              { url: 'https://linkedin.com', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
            ].map(s => (
              <a key={s.url} href={s.url} target="_blank" rel="noopener" style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(148,163,184,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s', color: '#94A3B8' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,99,235,.25)'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(148,163,184,.12)'; e.currentTarget.style.color = '#94A3B8' }}
              >
                <svg style={{ width: 14, height: 14 }} viewBox="0 0 24 24" fill="currentColor"><path d={s.path} /></svg>
              </a>
            ))}
            <a href="https://du.edu.eg" target="_blank" rel="noopener" style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(148,163,184,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s', color: '#94A3B8' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,99,235,.25)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(148,163,184,.12)'; e.currentTarget.style.color = '#94A3B8' }}
            ><Globe style={{ width: 14, height: 14 }} /></a>
          </div>
        </div>
        {cols.map(colData => (
          <div key={colData.key}>
            <h4 style={{ marginBottom: '1rem', fontSize: '.8rem', fontWeight: 700, color: '#E2E8F0', textTransform: 'uppercase', letterSpacing: '.06em' }}>{colData.title}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
              {colData.external ? extCol(colData.items) : col(colData.items)}
              {colData.key === 'legal' && (
                <div style={{ marginTop: '.75rem', padding: '.8rem', background: 'rgba(37,99,235,.1)', borderRadius: 10, border: '1px solid rgba(37,99,235,.2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', color: '#2563EB', fontSize: '.75rem', fontWeight: 600 }}>
                    <Shield className="w-3.5 h-3.5" /> {t('footer.secured')}
                  </div>
                  <p style={{ color: '#64748B', fontSize: '.7rem', marginTop: '.2rem', lineHeight: 1.4 }}>{t('footer.secured_desc')}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1140, margin: '2rem auto 0', padding: '1.25rem 0', borderTop: '1px solid rgba(148,163,184,.12)', textAlign: 'center', color: '#64748B', fontSize: '.78rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <button className="lang-toggle footer-lang-toggle" onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}>
          <Languages style={{ width: 14, height: 14 }} /> {t('nav.switch_lang')}
        </button>
        <span>{t('footer.rights')}</span>
      </div>
    </footer>
  )
}
