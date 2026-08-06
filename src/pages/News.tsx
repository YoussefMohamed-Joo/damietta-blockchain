import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import { Newspaper, CalendarDays, Clock } from 'lucide-react'

export default function News() {
  const { t } = useI18n()

  const news = [
    { date: 'Aug 02', cat: 'Platform', title: t('news.n1_title'), desc: t('news.n1_desc') },
    { date: 'Jul 24', cat: 'Platform', title: t('news.n2_title'), desc: t('news.n2_desc') },
    { date: 'Jul 10', cat: 'AI', title: t('news.n3_title'), desc: t('news.n3_desc') },
    { date: 'Jun 18', cat: 'Workshop', title: t('news.n4_title'), desc: t('news.n4_desc') },
    { date: 'Jun 02', cat: 'Awards', title: t('news.n5_title'), desc: t('news.n5_desc') },
  ]

  const events = [
    { day: '14', month: 'SEP', title: t('news.e1_title'), desc: t('news.e1_desc') },
    { day: '22', month: 'OCT', title: t('news.e2_title'), desc: t('news.e2_desc') },
    { day: '05', month: 'NOV', title: t('news.e3_title'), desc: t('news.e3_desc') },
  ]

  return (
    <div style={{ maxWidth: 920, margin: '0 auto', padding: '6rem 1.25rem 3rem' }}>
      <header style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}><Newspaper size={22} style={{ color: '#004ac6' }} /> {t('news.title')}</h1>
        <p style={{ color: '#64748B', fontSize: '.92rem', margin: '.35rem 0 0' }}>{t('news.subtitle')}</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: '1.25rem', alignItems: 'start' }}>
        <section>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: 8 }}><Clock size={16} style={{ color: '#004ac6' }} /> {t('news.news_section')}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {news.map((n, i) => (
              <article key={i} style={{ background: 'rgba(255,255,255,.9)', border: '1px solid rgba(226,232,240,.8)', borderRadius: 14, padding: '1.1rem 1.25rem', boxShadow: '0 4px 24px rgba(15,23,42,.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '.4rem' }}>
                  <span style={{ fontSize: '.72rem', fontWeight: 700, color: '#fff', background: 'linear-gradient(135deg,#004ac6,#2563eb)', padding: '2px 8px', borderRadius: 6 }}>{n.date}</span>
                  <span style={{ fontSize: '.7rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '.05em' }}>{n.cat}</span>
                </div>
                <h3 style={{ fontSize: '.98rem', fontWeight: 700, color: '#0F172A', margin: '0 0 .25rem' }}>{n.title}</h3>
                <p style={{ fontSize: '.84rem', color: '#64748B', lineHeight: 1.6, margin: 0 }}>{n.desc}</p>
                <Link to="/news" style={{ fontSize: '.78rem', fontWeight: 600, color: '#004ac6', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: '.5rem' }}>{t('news.read_more')} →</Link>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: 8 }}><CalendarDays size={16} style={{ color: '#004ac6' }} /> {t('news.events_section')}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {events.map((e, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,.9)', border: '1px solid rgba(226,232,240,.8)', borderRadius: 14, padding: '1rem', display: 'flex', gap: 12, alignItems: 'flex-start', boxShadow: '0 4px 24px rgba(15,23,42,.05)' }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: 'rgba(0,74,198,.06)', border: '1px solid rgba(0,74,198,.12)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#004ac6', lineHeight: 1 }}>{e.day}</span>
                  <span style={{ fontSize: '.58rem', fontWeight: 700, color: '#64748B', letterSpacing: '.05em' }}>{e.month}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '.9rem', fontWeight: 700, color: '#0F172A', margin: '0 0 .2rem' }}>{e.title}</h3>
                  <p style={{ fontSize: '.8rem', color: '#64748B', lineHeight: 1.5, margin: '0 0 .5rem' }}>{e.desc}</p>
                  <button style={{ fontSize: '.75rem', fontWeight: 700, color: '#fff', background: '#004ac6', border: 'none', borderRadius: 7, padding: '.35rem .8rem', cursor: 'pointer' }}>{t('news.event_register')}</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
