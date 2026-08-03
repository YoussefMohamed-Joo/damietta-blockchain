import { useI18n } from '../i18n'

const sections = [
  { num: '01' },
  { num: '02' },
  { num: '03' },
  { num: '04' },
  { num: '05' },
  { num: '06' },
]

export default function Privacy() {
  const { t } = useI18n()
  return (
    <>
      <div className="page-header">
        <h1>{t('privacy.title')}</h1>
        <p>{t('privacy.subtitle')}</p>
      </div>
      <div className="content-section">
        <div style={{
          maxWidth: 800, margin: '0 auto',
          background: 'rgba(255,255,255,.95)',
          borderRadius: 24, border: '1px solid rgba(255,255,255,.4)',
          boxShadow: '0 8px 32px rgba(0,0,0,.04)',
          padding: '3rem 3.5rem',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {sections.map((s, i) => (
              <div key={s.num} style={{
                position: 'relative',
                paddingLeft: '4rem',
                borderBottom: i < sections.length - 1 ? '1px solid rgba(148,163,184,.15)' : 'none',
                paddingBottom: i < sections.length - 1 ? '2.5rem' : 0,
              }}>
                <div style={{
                  position: 'absolute', left: 0, top: 0,
                  fontSize: '.7rem', fontWeight: 700, color: '#94A3B8',
                  letterSpacing: '.1em',
                  background: 'rgba(37,99,235,.06)',
                  padding: '.25rem .6rem',
                  borderRadius: 6,
                  lineHeight: '1.4rem',
                }}>{s.num}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '.5rem', marginTop: 0 }}>{t(`privacy.s${s.num}_title`)}</h3>
                <p style={{ color: '#475569', fontSize: '.9rem', lineHeight: 1.8, margin: 0 }}>{t(`privacy.s${s.num}_text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
