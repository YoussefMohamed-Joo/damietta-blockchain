import { useI18n } from '../i18n'
import { Users, MapPin, Mail, Phone, Clock, Award, ShieldCheck, Sparkles } from 'lucide-react'

const palette = [
  'linear-gradient(135deg,#004ac6,#2563eb)',
  'linear-gradient(135deg,#0F766E,#14B8A6)',
  'linear-gradient(135deg,#7C3AED,#8B5CF6)',
  'linear-gradient(135deg,#B45309,#F59E0B)',
  'linear-gradient(135deg,#BE185D,#EC4899)',
]

export default function Team() {
  const { t } = useI18n()

  const members = [
    { name: 'Dr. Khaled Ibrahim', role: t('team.member_role1') },
    { name: 'Dr. Samira Younis', role: t('team.member_role2') },
    { name: 'Eng. Omar Youssef', role: t('team.member_role3') },
    { name: 'Mariam Ali', role: t('team.member_role4') },
    { name: 'Dr. Hossam Kamal', role: t('team.member_role5') },
  ]

  const contact = [
    { icon: <MapPin size={16} />, label: t('team.address'), value: t('team.address_val') },
    { icon: <Mail size={16} />, label: t('team.email'), value: t('team.email_val') },
    { icon: <Phone size={16} />, label: t('team.phone'), value: t('team.phone_val') },
    { icon: <Clock size={16} />, label: t('team.hours'), value: t('team.hours_val') },
  ]

  const values = [
    { icon: <Award size={18} />, text: 'Research excellence & integrity' },
    { icon: <ShieldCheck size={18} />, text: 'Tamper-proof protection' },
    { icon: <Sparkles size={18} />, text: 'Innovation & accessibility' },
  ]

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '6rem 1.25rem 3rem' }}>
      <header style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}><Users size={22} style={{ color: '#004ac6' }} /> {t('team.title')}</h1>
        <p style={{ color: '#64748B', fontSize: '.92rem', margin: '.35rem 0 0' }}>{t('team.subtitle')}</p>
      </header>

      <section style={{ background: 'rgba(255,255,255,.9)', border: '1px solid rgba(226,232,240,.8)', borderRadius: 16, padding: '1.5rem', marginBottom: '1.25rem', boxShadow: '0 4px 24px rgba(15,23,42,.05)' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: '0 0 .6rem' }}>{t('team.about_title')}</h2>
        <p style={{ fontSize: '.9rem', color: '#64748B', lineHeight: 1.7, margin: 0 }}>{t('team.about_desc')}</p>
        <div style={{ display: 'flex', gap: '1.75rem', flexWrap: 'wrap', marginTop: '1.1rem' }}>
          {values.map((v, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '.84rem', fontWeight: 600, color: '#334155' }}>
              <span style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(0,74,198,.08)', color: '#004ac6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{v.icon}</span>
              {v.text}
            </div>
          ))}
        </div>
      </section>

      <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: '0 0 1rem' }}>{t('team.leadership')}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(170px,1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {members.map((m, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,.9)', border: '1px solid rgba(226,232,240,.8)', borderRadius: 16, padding: '1.4rem 1rem', textAlign: 'center', boxShadow: '0 4px 24px rgba(15,23,42,.05)' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: palette[i % palette.length], color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, margin: '0 auto .75rem' }}>{m.name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase()}</div>
            <h3 style={{ fontSize: '.9rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>{m.name}</h3>
            <p style={{ fontSize: '.76rem', color: '#64748B', margin: '.2rem 0 0' }}>{m.role}</p>
          </div>
        ))}
      </div>

      <section style={{ background: 'rgba(255,255,255,.9)', border: '1px solid rgba(226,232,240,.8)', borderRadius: 16, padding: '1.5rem', boxShadow: '0 4px 24px rgba(15,23,42,.05)' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: '0 0 .35rem' }}>{t('team.contact_title')}</h2>
        <p style={{ fontSize: '.86rem', color: '#64748B', margin: '0 0 1.1rem' }}>{t('team.contact_desc')}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {contact.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '.85rem 1rem', background: '#f8fafc', borderRadius: 12, border: '1px solid #eef2f7' }}>
              <span style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(0,74,198,.08)', color: '#004ac6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{c.icon}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '.72rem', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '.04em' }}>{c.label}</div>
                <div style={{ fontSize: '.86rem', fontWeight: 600, color: '#0F172A', wordBreak: 'break-word' }}>{c.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
