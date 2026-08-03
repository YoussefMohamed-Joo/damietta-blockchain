import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { useI18n } from '../i18n'

export default function Contact() {
  const { t } = useI18n()
  return (
    <>
      <div className="page-header">
        <h1>{t('contact.title')}</h1>
        <p>{t('contact.subtitle')}</p>
      </div>
      <div className="content-section">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2.5rem',
          maxWidth: 960,
          margin: '0 auto',
          padding: '2.5rem 3rem',
          background: 'rgba(255,255,255,.95)',
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,.5)',
          boxShadow: '0 8px 32px rgba(0,0,0,.08)',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '.5rem' }}>{t('contact.get_in_touch')}</h2>
            <p style={{ color: '#64748B', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              {t('contact.support_text')}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', color: '#334155' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(37,99,235,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span>support@damietta-ip.edu.eg</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', color: '#334155' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(37,99,235,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span>+20 57 240 3869</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', color: '#334155' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(37,99,235,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span>Damietta University, New Damietta City, Egypt</span>
              </div>
            </div>
          </div>
          <div>
            <input type="text" placeholder={t('contact.name')} style={{ width: '100%', padding: '.8rem 1rem', border: '1.5px solid #14B8A6', borderRadius: 12, fontSize: '.9rem', outline: 'none', marginBottom: '1rem', background: 'rgba(255,255,255,.8)', transition: 'border-color .2s,box-shadow .2s' }} onFocus={e => { e.currentTarget.style.borderColor = '#0F766E'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(20,184,166,.15)' }} onBlur={e => { e.currentTarget.style.borderColor = '#14B8A6'; e.currentTarget.style.boxShadow = 'none' }} />
            <input type="email" placeholder={t('contact.email')} style={{ width: '100%', padding: '.8rem 1rem', border: '1.5px solid #14B8A6', borderRadius: 12, fontSize: '.9rem', outline: 'none', marginBottom: '1rem', background: 'rgba(255,255,255,.8)', transition: 'border-color .2s,box-shadow .2s' }} onFocus={e => { e.currentTarget.style.borderColor = '#0F766E'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(20,184,166,.15)' }} onBlur={e => { e.currentTarget.style.borderColor = '#14B8A6'; e.currentTarget.style.boxShadow = 'none' }} />
            <textarea placeholder={t('contact.message')} rows={5} style={{ width: '100%', padding: '.8rem 1rem', border: '1.5px solid #14B8A6', borderRadius: 12, fontSize: '.9rem', outline: 'none', marginBottom: '1rem', background: 'rgba(255,255,255,.8)', resize: 'vertical', fontFamily: 'inherit', transition: 'border-color .2s,box-shadow .2s' }} onFocus={e => { e.currentTarget.style.borderColor = '#0F766E'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(20,184,166,.15)' }} onBlur={e => { e.currentTarget.style.borderColor = '#14B8A6'; e.currentTarget.style.boxShadow = 'none' }}></textarea>
            <button className="auth-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem' }}>
              <Send className="w-4 h-4" /> {t('contact.send')}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
