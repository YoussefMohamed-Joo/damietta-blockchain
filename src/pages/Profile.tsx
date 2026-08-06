import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '../i18n'
import { useDB, updateProfile, logout } from '../lib/store'
import { toast } from '../components/Toast'
import { User, Camera, LogOut, Shield, Bell, KeyRound, Check } from 'lucide-react'

export default function Profile() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const db = useDB()
  const session = db.session
  const fileRef = useRef<HTMLInputElement>(null)

  const [name, setName] = useState(session?.name ?? '')
  const [email, setEmail] = useState(session?.email ?? '')
  const [avatar, setAvatar] = useState(session?.avatar ?? '')
  const [confirming, setConfirming] = useState(false)
  const [activeSection, setActiveSection] = useState('profile')

  useEffect(() => {
    if (!db.session) navigate('/login')
  }, [db.session, navigate])

  if (!session) {
    return null
  }

  const initial = session.name.trim().charAt(0).toUpperCase() || 'U'

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) return
    if (file.size > 2 * 1024 * 1024) {
      toast(t('profile.photo_hint'), 'warning')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const data = reader.result as string
      setAvatar(data)
      updateProfile({ avatar: data })
      toast(t('profile.saved'), 'success')
    }
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    if (!name.trim()) {
      toast(t('profile.full_name'), 'warning')
      return
    }
    updateProfile({ name: name.trim(), email: email.trim() })
    toast(t('profile.saved'), 'success')
  }

  const roleLabel = (role: string) => {
    if (role === 'Admin') return t('profile.role_admin')
    if (role === 'Reviewer') return t('profile.role_reviewer')
    return t('profile.role_student')
  }

  const menuItem = (key: string, label: string, Icon: React.ElementType) => (
    <button
      onClick={() => setActiveSection(key)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 12px', borderRadius: 10,
        background: activeSection === key ? 'rgba(0,74,198,.08)' : 'transparent', color: activeSection === key ? '#004ac6' : '#475569',
        border: 'none', cursor: 'pointer', fontSize: '.85rem', fontWeight: activeSection === key ? 700 : 500, transition: 'all .2s', textAlign: 'left',
      }}
    >
      <Icon size={16} style={{ flexShrink: 0 }} />
      {label}
      {activeSection === key && <span style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: '#004ac6' }} />}
    </button>
  )

  return (
    <div style={{ maxWidth: 920, margin: '0 auto', padding: '6rem 1.25rem 3rem' }}>
      <header style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>{t('profile.title')}</h1>
        <p style={{ color: '#64748B', fontSize: '.9rem', margin: '.35rem 0 0' }}>{t('profile.subtitle')}</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '1.25rem', alignItems: 'start' }}>
        <aside style={{ background: 'rgba(255,255,255,.9)', border: '1px solid rgba(226,232,240,.8)', borderRadius: 16, padding: '1.5rem 1rem', boxShadow: '0 4px 24px rgba(15,23,42,.05)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div style={{ position: 'relative', marginBottom: '.85rem' }}>
              <div style={{ width: 88, height: 88, borderRadius: '50%', overflow: 'hidden', border: '3px solid #fff', boxShadow: '0 0 0 3px rgba(0,74,198,.18)', background: 'linear-gradient(135deg,#004ac6,#14B8A6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 34, fontWeight: 800 }}>
                {avatar ? <img src={avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initial}
              </div>
              <button
                onClick={() => fileRef.current?.click()}
                aria-label={t('profile.upload_photo')}
                style={{ position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: '50%', background: '#004ac6', color: '#fff', border: '2px solid #fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,.2)' }}
              >
                <Camera size={13} />
              </button>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
            </div>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>{session.name}</h2>
            <span style={{ fontSize: '.75rem', fontWeight: 600, color: '#004ac6', background: 'rgba(0,74,198,.08)', padding: '3px 10px', borderRadius: 20, marginTop: '.35rem' }}>{roleLabel(session.role)}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {menuItem('profile', t('profile.personal_info'), User)}
            {menuItem('security', t('profile.security'), Shield)}
            {menuItem('settings', t('profile.settings'), Bell)}
            {menuItem('password', t('profile.account'), KeyRound)}
          </div>
        </aside>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <section style={{ background: 'rgba(255,255,255,.9)', border: '1px solid rgba(226,232,240,.8)', borderRadius: 16, padding: '1.5rem', boxShadow: '0 4px 24px rgba(15,23,42,.05)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: '0 0 1.25rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 30, height: 30, borderRadius: 9, background: 'rgba(0,74,198,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#004ac6' }}><User size={15} /></span>
              {t('profile.personal_info')}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '.72rem', fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '.04em', display: 'block', marginBottom: 6 }}>{t('profile.full_name')}</label>
                <input value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '.6rem .8rem', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: '.88rem', outline: 'none', boxSizing: 'border-box', transition: 'all .2s' }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#004ac6'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,74,198,.08)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' }} />
              </div>
              <div>
                <label style={{ fontSize: '.72rem', fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '.04em', display: 'block', marginBottom: 6 }}>{t('profile.email')}</label>
                <input value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '.6rem .8rem', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: '.88rem', outline: 'none', boxSizing: 'border-box', transition: 'all .2s' }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#004ac6'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,74,198,.08)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' }} />
              </div>
              <div>
                <label style={{ fontSize: '.72rem', fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '.04em', display: 'block', marginBottom: 6 }}>{t('profile.role')}</label>
                <div style={{ padding: '.6rem .8rem', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: '.88rem', color: '#64748B', background: '#f8fafc' }}>{roleLabel(session.role)}</div>
              </div>
              <button onClick={handleSave} style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 8, padding: '.6rem 1.4rem', background: 'linear-gradient(135deg,#004ac6,#2563eb)', color: '#fff', fontWeight: 700, borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: '.88rem', transition: 'all .2s', boxShadow: '0 2px 8px rgba(0,74,198,.25)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,74,198,.35)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,74,198,.25)' }}
              ><Check size={15} /> {t('profile.save')}</button>
            </div>
          </section>

          <section style={{ background: 'rgba(255,255,255,.9)', border: '1px solid rgba(226,232,240,.8)', borderRadius: 16, padding: '1.5rem', boxShadow: '0 4px 24px rgba(15,23,42,.05)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#EF4444', margin: '0 0 .35rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 30, height: 30, borderRadius: 9, background: 'rgba(239,68,68,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><LogOut size={15} /></span>
              {t('profile.danger_zone')}
            </h3>
            <p style={{ fontSize: '.85rem', color: '#64748B', margin: '0 0 1rem' }}>{t('profile.logout_hint')}</p>
            {confirming ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: '.88rem', fontWeight: 600, color: '#0F172A' }}>{t('profile.confirm_logout')}</span>
                <button onClick={() => { logout(); navigate('/') }} style={{ padding: '.5rem 1.2rem', background: '#EF4444', color: '#fff', fontWeight: 700, borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: '.85rem' }}>{t('profile.logout')}</button>
                <button onClick={() => setConfirming(false)} style={{ padding: '.5rem 1.2rem', background: '#f1f5f9', color: '#475569', fontWeight: 700, borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: '.85rem' }}>Cancel</button>
              </div>
            ) : (
              <button onClick={() => setConfirming(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '.6rem 1.4rem', background: '#fff', color: '#EF4444', fontWeight: 700, borderRadius: 10, border: '1.5px solid #FECACA', cursor: 'pointer', fontSize: '.88rem', transition: 'all .2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#FEF2F2' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff' }}
              ><LogOut size={15} /> {t('profile.logout')}</button>
            )}
          </section>

          <p style={{ fontSize: '.75rem', color: '#94A3B8', textAlign: 'center', margin: 0 }}>{t('profile.data_note')}</p>
        </div>
      </div>
    </div>
  )
}
