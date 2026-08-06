import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useI18n } from '../i18n'
import { register, updateProfile } from '../lib/store'
import { Camera, ArrowRight, Check, UserPlus } from 'lucide-react'

export default function Register() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)

  const [step, setStep] = useState<1 | 2>(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [avatar, setAvatar] = useState('')

  const step1Done = name.trim().length > 0

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!step1Done) return
    register({ name: name.trim(), email: email.trim() || 'student@du.edu.eg' })
    setStep(2)
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) return
    if (file.size > 2 * 1024 * 1024) return
    const reader = new FileReader()
    reader.onload = () => {
      const data = reader.result as string
      setAvatar(data)
      updateProfile({ avatar: data })
    }
    reader.readAsDataURL(file)
  }

  const finish = () => navigate('/')

  const inputEvents = {
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = '#004ac6'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,74,198,.08)' },
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' },
  }

  const field = (label: string, value: string, setter: (v: string) => void, placeholder = '', type = 'text') => (
    <div>
      <label style={{ fontSize: 10, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '.05em', display: 'block', marginBottom: 5 }}>{label}</label>
      <input type={type} value={value} onChange={e => setter(e.target.value)} placeholder={placeholder} style={{ width: '100%', padding: '.6rem .8rem', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: '.88rem', outline: 'none', background: '#fff', boxSizing: 'border-box', transition: 'all .2s' }} {...inputEvents} />
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#f7f9fb', paddingTop: '4.5rem' }}>
      <div style={{ maxWidth: 480, width: '100%', margin: '0 auto', padding: '1rem 1.25rem 3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <img src="/img/logo.png" alt="" style={{ height: 64 }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: '1.5rem' }}>
          {[1, 2].map(s => (
            <span key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700,
                background: step >= s ? 'linear-gradient(135deg,#004ac6,#2563eb)' : '#E2E8F0', color: step >= s ? '#fff' : '#94A3B8', transition: 'all .3s',
              }}>{step > s ? <Check size={13} /> : s}</span>
              {s === 1 && <span style={{ width: 44, height: 2, borderRadius: 2, background: step >= 2 ? '#2563EB' : '#E2E8F0', transition: 'all .3s' }} />}
            </span>
          ))}
        </div>

        <div style={{ background: 'rgba(255,255,255,.95)', border: '1px solid #e2e8f0', borderRadius: 18, padding: '1.75rem 1.5rem', boxShadow: '0 12px 40px rgba(15,23,42,.07)' }}>
          {step === 1 && (
            <>
              <header style={{ marginBottom: '1.25rem' }}>
                <h2 style={{ fontSize: 19, fontWeight: 800, color: '#0F172A', margin: '0 0 .2rem', display: 'flex', alignItems: 'center', gap: 8 }}><UserPlus size={18} style={{ color: '#004ac6' }} /> {t('register.create_account')}</h2>
                <p style={{ color: '#64748B', fontSize: 12.5, margin: 0 }}>{t('register.subtitle')}</p>
              </header>
              <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '.8rem' }}>
                {field(t('register.full_name'), name, setName, t('register.full_name_placeholder'))}
                {field(t('register.gmail_address'), email, setEmail, t('register.gmail_placeholder'), 'email')}
                {field(t('login.phone'), phone, setPhone, t('login.phone_placeholder'), 'tel')}
                <button type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '.7rem', background: 'linear-gradient(135deg,#004ac6,#2563eb)', color: '#fff', fontWeight: 700, borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: '.9rem', transition: 'all .2s', boxShadow: '0 2px 8px rgba(0,74,198,.25)', opacity: step1Done ? 1 : .6, marginTop: '.25rem' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,74,198,.35)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,74,198,.25)' }}
                >{t('register.next')} <ArrowRight size={16} /></button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <header style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: 19, fontWeight: 800, color: '#0F172A', margin: '0 0 .2rem' }}>{t('register.photo_step_title')}</h2>
                <p style={{ color: '#64748B', fontSize: 12.5, margin: 0 }}>{t('register.photo_step_subtitle')}</p>
              </header>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.1rem' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ width: 104, height: 104, borderRadius: '50%', overflow: 'hidden', border: '3px solid #fff', boxShadow: '0 0 0 3px rgba(0,74,198,.18)', background: 'linear-gradient(135deg,#004ac6,#14B8A6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 38, fontWeight: 800 }}>
                    {avatar ? <img src={avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (name.trim().charAt(0).toUpperCase() || 'U')}
                  </div>
                  <button onClick={() => fileRef.current?.click()} aria-label={t('profile.upload_photo')} style={{ position: 'absolute', bottom: 0, right: 0, width: 30, height: 30, borderRadius: '50%', background: '#004ac6', color: '#fff', border: '2px solid #fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,.2)' }}>
                    <Camera size={14} />
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
                </div>
                <div style={{ display: 'flex', gap: 10, width: '100%' }}>
                  <button onClick={() => fileRef.current?.click()} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '.65rem', background: '#fff', color: '#004ac6', fontWeight: 700, borderRadius: 10, border: '1.5px solid #bfdbfe', cursor: 'pointer', fontSize: '.88rem', transition: 'all .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#EFF6FF' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#fff' }}
                  ><Camera size={15} /> {avatar ? t('profile.upload_photo') : t('register.upload_photo')}</button>
                  <button onClick={finish} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '.65rem', background: 'linear-gradient(135deg,#004ac6,#2563eb)', color: '#fff', fontWeight: 700, borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: '.88rem', boxShadow: '0 2px 8px rgba(0,74,198,.25)' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
                  >{t('register.finish')} <ArrowRight size={15} /></button>
                </div>
                <button onClick={finish} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#94A3B8', fontSize: '.8rem', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3 }}>{t('register.skip')}</button>
              </div>
            </>
          )}
        </div>

        <p style={{ textAlign: 'center', fontSize: '.82rem', color: '#64748B', marginTop: '1.1rem' }}>
          {t('register.already_have_account')}{' '}
          <Link to="/login" style={{ fontWeight: 700, color: '#004ac6', textDecoration: 'none' }}>{t('login.tab_login')}</Link>
        </p>
      </div>
    </div>
  )
}
