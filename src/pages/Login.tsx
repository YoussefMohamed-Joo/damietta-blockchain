import { useState } from 'react'
import { Link } from 'react-router-dom'

function formatPhone(val: string) {
  const digits = val.replace(/\D/g, '')
  if (!digits.startsWith('20')) return '+20' + digits.slice(0, 10)
  const d = digits.slice(2, 12)
  if (d.length <= 3) return `+20${d}`
  if (d.length <= 6) return `+20 ${d.slice(0, 3)} ${d.slice(3)}`
  return `+20 ${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 10)}`
}

export default function Login() {
  const [tab, setTab] = useState<'login' | 'register'>('login')
  const [showPw, setShowPw] = useState(false)
  const [phone, setPhone] = useState('')

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d+ ]/g, '')
    if (!raw.startsWith('+')) {
      setPhone(formatPhone(raw))
    } else {
      const digits = raw.replace(/\D/g, '')
      if (digits.length <= 12) setPhone(formatPhone(digits))
    }
  }

  const title = tab === 'login' ? 'Welcome Back' : 'Create Account'
  const subtitle = tab === 'login' ? 'Access your researcher portal and managed IP dossiers.' : 'Register to protect your research with blockchain technology.'

  return (
    <div style={{ height: '100vh', display: 'flex', background: '#f7f9fb', overflow: 'hidden', position: 'fixed', top: 0, left: 0, width: '100%' }}>
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.2, backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: '50vw', height: '50vh', background: 'radial-gradient(circle, rgba(0,74,198,0.05) 0%, rgba(0,74,198,0.02) 50%, transparent 72%)', transform: 'translateY(-50%) translateX(33%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '40vw', height: '40vh', background: 'radial-gradient(circle, rgba(0,96,86,0.05) 0%, rgba(0,96,86,0.02) 50%, transparent 72%)', transform: 'translateY(33%) translateX(-25%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100vh', display: 'flex', margin: 0, padding: 0 }}>
        <div style={{ flex: '0 0 50%', overflow: 'hidden', margin: 0, padding: 0, lineHeight: 0, borderRadius: '0 12px 12px 0' }}>
          <img src="/img/lgin.png" alt="" style={{ width: '100%', height: '100vh', objectFit: 'cover', display: 'block', margin: 0, padding: 0, borderRadius: '0 12px 12px 0' }} />
        </div>
        <div style={{ flex: '0 0 50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1.5rem 3rem', background: '#fff', overflow: 'hidden', margin: 0 }}>
          <div style={{ maxWidth: 460, margin: '0 auto', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '.85rem' }}>
              <img src="/img/logo.png" alt="" style={{ height: 72 }} />
              <div style={{ display: 'flex', gap: '.3rem' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#004ac6' }} />
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#2563eb', opacity: 0.5 }} />
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#14B8A6', opacity: 0.3 }} />
              </div>
            </div>

            <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', marginBottom: '.9rem', gap: 0 }}>
              {(['login', 'register'] as const).map(m => (
                <button key={m} onClick={() => setTab(m)} style={{
                  flex: 1, padding: '.55rem 0', fontWeight: 700, fontSize: '.85rem', textTransform: 'uppercase', letterSpacing: '.05em',
                  background: 'none', cursor: 'pointer', transition: 'all .3s',
                  border: 'none',
                  borderBottom: tab === m ? '2.5px solid #004ac6' : '2.5px solid transparent',
                  color: tab === m ? '#004ac6' : '#94A3B8',
                  marginBottom: '-1px',
                }}>{m}</button>
              ))}
            </div>

            <header style={{ marginBottom: '.7rem', borderLeft: '3px solid #004ac6', paddingLeft: '.75rem' }}>
              <h2 style={{ fontSize: 19, fontWeight: 700, color: '#0F172A', margin: '0 0 .15rem' }}>{title}</h2>
              <p style={{ color: '#64748B', fontSize: 12.5, margin: 0 }}>{subtitle}</p>
            </header>

            <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem', padding: '.55rem 1rem', border: '1.5px solid #e2e8f0', borderRadius: 10, fontWeight: 600, color: '#475569', background: '#fff', cursor: 'pointer', fontSize: '.82rem', marginBottom: '.55rem', boxShadow: '0 1px 2px rgba(0,0,0,.02)', transition: 'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,.04)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,.02)' }}
            >
              <svg style={{ width: 17, height: 17, color: '#004ac6' }} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
              Sign in with University SSO
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '.7rem', marginBottom: '.55rem' }}>
              <hr style={{ flex: 1, border: 'none', borderTop: '1px dashed #e2e8f0' }} />
              <span style={{ fontSize: 10, fontWeight: 600, color: '#94A3B8', whiteSpace: 'nowrap', letterSpacing: '.07em' }}>OR CONTINUE WITH</span>
              <hr style={{ flex: 1, border: 'none', borderTop: '1px dashed #e2e8f0' }} />
            </div>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '.55rem' }}>
              <div>
                <label style={{ fontSize: 10, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '.05em', display: 'block', marginBottom: 4 }}>Phone Number</label>
                <div style={{ position: 'relative' }}>
                  <svg style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', width: 15, height: 15 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="+20 123 456 7890"
                    style={{ width: '100%', padding: '.55rem .55rem .55rem 2rem', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: '.85rem', outline: 'none', background: '#fff', boxSizing: 'border-box', transition: 'all .2s', boxShadow: 'inset 0 1px 2px rgba(0,0,0,.02)' }}
                    onFocus={e => { e.currentTarget.style.borderColor = '#004ac6'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,74,198,.08), inset 0 1px 2px rgba(0,0,0,.02)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,.02)' }}
                  />
                </div>
              </div>

              {tab === 'register' && (
                <div>
                  <label style={{ fontSize: 10, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '.05em', display: 'block', marginBottom: 4 }}>Gmail Address</label>
                  <div style={{ position: 'relative' }}>
                    <svg style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', width: 15, height: 15 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg>
                    <input type="email" placeholder="example@gmail.com" style={{ width: '100%', padding: '.55rem .55rem .55rem 2rem', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: '.85rem', outline: 'none', background: '#fff', boxSizing: 'border-box', transition: 'all .2s', boxShadow: 'inset 0 1px 2px rgba(0,0,0,.02)' }}
                      onFocus={e => { e.currentTarget.style.borderColor = '#004ac6'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,74,198,.08), inset 0 1px 2px rgba(0,0,0,.02)' }}
                      onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,.02)' }}
                    />
                  </div>
                </div>
              )}

              <div>
                <label style={{ fontSize: 10, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '.05em', display: 'block', marginBottom: 4 }}>Secure Password</label>
                <div style={{ position: 'relative' }}>
                  <svg style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', width: 15, height: 15 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                  <input type={showPw ? 'text' : 'password'} placeholder="••••••••" style={{ width: '100%', padding: '.55rem 2rem .55rem 2rem', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: '.85rem', outline: 'none', background: '#fff', boxSizing: 'border-box', transition: 'all .2s', boxShadow: 'inset 0 1px 2px rgba(0,0,0,.02)' }}
                    onFocus={e => { e.currentTarget.style.borderColor = '#004ac6'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,74,198,.08), inset 0 1px 2px rgba(0,0,0,.02)' }}
                    onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,.02)' }}
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 4, display: 'flex' }}>
                    <svg style={{ width: 15, height: 15 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      {showPw ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
                    </svg>
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '.35rem 0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '.45rem', cursor: 'pointer', fontSize: 12, color: '#64748B' }}>
                  <input type="checkbox" defaultChecked style={{ width: 14, height: 14, borderRadius: 4, accentColor: '#004ac6', border: '1.5px solid #cbd5e1' }} /> Remember me
                </label>
                <Link to="/" style={{ fontSize: 12, fontWeight: 600, color: '#004ac6', textDecoration: 'none', borderBottom: '1px dashed #004ac6' }}>Forgot password?</Link>
              </div>

              <button type="submit" style={{ width: '100%', padding: '.65rem', background: 'linear-gradient(135deg,#004ac6,#2563eb)', color: '#fff', fontWeight: 700, borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: '.88rem', transition: 'all .2s', boxShadow: '0 2px 8px rgba(0,74,198,.25)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg,#003a9e,#1d4ed8)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,74,198,.35)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg,#004ac6,#2563eb)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,74,198,.25)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >{tab === 'login' ? 'Continue to Portal' : 'Create Account'}</button>
            </form>

            <footer style={{ marginTop: '.55rem', padding: '.45rem', textAlign: 'center', background: 'rgba(37,99,235,.04)', borderRadius: 8, border: '1px solid rgba(37,99,235,.08)' }}>
              <p style={{ fontSize: 10, color: '#64748B', lineHeight: '14px', margin: 0 }}>
                By accessing this portal, you agree to the{' '}
                <Link to="/terms" style={{ color: '#475569', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 2 }}>Academic Integrity Guidelines</Link> and{' '}
                <Link to="/privacy" style={{ color: '#475569', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 2 }}>IP Protocols</Link>.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}
