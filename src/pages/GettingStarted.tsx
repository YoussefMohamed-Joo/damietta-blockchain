import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import { useDB } from '../lib/store'
import { Compass, UserPlus, FileText, ListChecks, BadgeCheck, ShieldCheck, Eye, Settings, Sparkles } from 'lucide-react'

export default function GettingStarted() {
  const { t } = useI18n()
  const db = useDB()
  const session = db.session

  const steps = [
    { icon: <UserPlus size={16} />, title: t('guide.step1_title'), desc: t('guide.step1_desc') },
    { icon: <FileText size={16} />, title: t('guide.step2_title'), desc: t('guide.step2_desc') },
    { icon: <ListChecks size={16} />, title: t('guide.step3_title'), desc: t('guide.step3_desc') },
    { icon: <BadgeCheck size={16} />, title: t('guide.step4_title'), desc: t('guide.step4_desc') },
    { icon: <ShieldCheck size={16} />, title: t('guide.step5_title'), desc: t('guide.step5_desc') },
  ]

  const roles = [
    { icon: <UserPlus size={18} />, title: t('guide.role_student_title'), desc: t('guide.role_student_desc'), grad: 'linear-gradient(135deg,#0F766E,#14B8A6)' },
    { icon: <Eye size={18} />, title: t('guide.role_reviewer_title'), desc: t('guide.role_reviewer_desc'), grad: 'linear-gradient(135deg,#7C3AED,#8B5CF6)' },
    { icon: <Settings size={18} />, title: t('guide.role_admin_title'), desc: t('guide.role_admin_desc'), grad: 'linear-gradient(135deg,#004ac6,#2563eb)' },
  ]

  const tips = [t('guide.tip1'), t('guide.tip2'), t('guide.tip3')]

  return (
    <div style={{ maxWidth: 940, margin: '0 auto', padding: '6rem 1.25rem 3rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 20, background: 'rgba(0,74,198,.08)', color: '#004ac6', fontSize: '.78rem', fontWeight: 700, marginBottom: '.9rem' }}><Compass size={14} /> {t('guide.subtitle')}</span>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>{t('guide.title')}</h1>
      </header>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: 8 }}><Sparkles size={18} style={{ color: '#004ac6' }} /> {t('guide.steps_title')}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.8rem' }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, background: 'rgba(255,255,255,.9)', border: '1px solid rgba(226,232,240,.8)', borderRadius: 14, padding: '1rem 1.1rem', boxShadow: '0 4px 24px rgba(15,23,42,.05)' }}>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg,#004ac6,#14B8A6)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 800, flexShrink: 0 }}>{i + 1}</div>
              <div>
                <h3 style={{ fontSize: '.96rem', fontWeight: 700, color: '#0F172A', margin: '0 0 .15rem', display: 'flex', alignItems: 'center', gap: 8 }}>{s.icon} {s.title}</h3>
                <p style={{ fontSize: '.84rem', color: '#64748B', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: 8 }}><Sparkles size={18} style={{ color: '#004ac6' }} /> {t('guide.roles_title')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1rem' }}>
          {roles.map((r, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,.9)', border: '1px solid rgba(226,232,240,.8)', borderRadius: 16, padding: '1.3rem', boxShadow: '0 4px 24px rgba(15,23,42,.05)' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: r.grad, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '.75rem' }}>{r.icon}</div>
              <h3 style={{ fontSize: '.95rem', fontWeight: 700, color: '#0F172A', margin: '0 0 .3rem' }}>{r.title}</h3>
              <p style={{ fontSize: '.82rem', color: '#64748B', lineHeight: 1.6, margin: 0 }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: 'rgba(255,255,255,.9)', border: '1px solid rgba(226,232,240,.8)', borderRadius: 16, padding: '1.4rem', marginBottom: '1.75rem', boxShadow: '0 4px 24px rgba(15,23,42,.05)' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: '0 0 .75rem' }}>{t('guide.tips_title')}</h2>
        <ul style={{ margin: 0, paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '.45rem' }}>
          {tips.map((tip, i) => <li key={i} style={{ fontSize: '.86rem', color: '#475569', lineHeight: 1.6 }}>{tip}</li>)}
        </ul>
      </section>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to={session ? '/dashboard' : '/register'} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '.7rem 1.6rem', background: 'linear-gradient(135deg,#004ac6,#2563eb)', color: '#fff', fontWeight: 700, borderRadius: 12, textDecoration: 'none', fontSize: '.9rem', boxShadow: '0 2px 10px rgba(0,74,198,.25)' }}>{t('guide.start_now')} →</Link>
        <Link to="/verify" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '.7rem 1.6rem', background: '#fff', color: '#004ac6', fontWeight: 700, borderRadius: 12, textDecoration: 'none', fontSize: '.9rem', border: '1.5px solid #bfdbfe' }}><ShieldCheck size={16} /> {t('guide.cta_verify')}</Link>
        <Link to="/tools" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '.7rem 1.6rem', background: '#fff', color: '#475569', fontWeight: 700, borderRadius: 12, textDecoration: 'none', fontSize: '.9rem', border: '1.5px solid #e2e8f0' }}>{t('guide.cta_tools')} →</Link>
      </div>
    </div>
  )
}