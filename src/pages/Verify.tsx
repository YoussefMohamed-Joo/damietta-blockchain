import { useState } from 'react'
import { Search, ShieldCheck, ShieldAlert, Loader2, CheckCircle2, Fingerprint } from 'lucide-react'
import { useI18n } from '../i18n'
import { useDB, findVerified, type Certificate } from '../lib/store'

export default function Verify() {
  const { t } = useI18n()
  const db = useDB()
  const [query, setQuery] = useState('')
  const [searched, setSearched] = useState(false)
  const [busy, setBusy] = useState(false)
  const [qr, setQr] = useState('')
  const [result, setResult] = useState<{ valid: boolean; cert?: Certificate; found?: { id: string; student: string; title: string; date: string; hash: string } } | null>(null)

  const submit = async () => {
    if (!query.trim()) { setSearched(true); setResult(null); return }
    setBusy(true); setSearched(true); setResult(null); setQr('')
    await new Promise(r => setTimeout(r, 500))
    const { valid, certificate, submission } = findVerified(query)
    setResult({
      valid,
      cert: certificate,
      found: submission && submission.status === 'Approved' ? { id: submission.id, student: submission.student, title: submission.title, date: submission.date, hash: submission.hash } : undefined,
    })
    if (certificate || (submission && submission.status === 'Approved')) {
      const payload = JSON.stringify({ cert: certificate?.id || submission!.id, student: certificate?.student || submission!.student, research: certificate?.research || submission!.title, hash: certificate?.hash || submission!.hash })
      try {
        const { toDataURL } = await import('qrcode')
        const url = await toDataURL(payload, { width: 200, margin: 1, color: { dark: '#0F172A', light: '#ffffff' } })
        setQr(url)
      } catch (e) { /* ignore */ }
    }
    setBusy(false)
  }

  const sample = db.certificates[0]
  const sampleHash = db.certificates[0]?.hash || ''

  return (
    <>
      <div className="page-header">
        <h1>{t('verify.hero_title')}</h1>
        <p>{t('verify.hero_desc')}</p>
      </div>
      <div className="content-section">
        <div className="search-glass" style={{ marginBottom: '2rem' }}>
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input type="text" placeholder={t('verify.search_placeholder')} value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()} className="ml-3" />
          <button className="search-btn" onClick={submit}>{busy ? <Loader2 className="w-4 h-4 animate-spin" /> : t('verify.search_btn')}</button>
        </div>
        {sample && (
          <p style={{ textAlign: 'center', fontSize: '.8rem', color: '#94A3B8', marginTop: '-1rem', marginBottom: '2rem' }}>
            {t('verify.try_sample')}: <button onClick={() => setQuery(sample.id)} style={{ background: 'none', border: 'none', color: '#2563EB', fontWeight: 600, cursor: 'pointer' }}>{sample.id}</button> · <button onClick={() => setQuery(sampleHash)} style={{ background: 'none', border: 'none', color: '#2563EB', fontWeight: 600, cursor: 'pointer' }}>{sampleHash.slice(0, 14)}...</button>
          </p>
        )}

        {searched && !busy && result && (
          <div style={{ maxWidth: 640, margin: '0 auto 2.5rem' }}>
            {result.valid ? (
              <div style={{ background: '#fff', borderRadius: 20, padding: '1.5rem', border: '1px solid rgba(20,184,166,.35)', boxShadow: '0 20px 60px -15px rgba(20,184,166,.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1rem' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(20,184,166,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShieldCheck className="w-6 h-6" style={{ color: '#14B8A6' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F766E' }}>{t('verify.result_valid')}</div>
                    <div style={{ fontSize: '.8rem', color: '#64748B' }}>{t('verify.result_valid_desc')}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.65rem 1.25rem' }}>
                    {[
                      { label: t('cert.cert_id'), value: result.cert?.id || result.found?.id },
                      { label: t('cert.student'), value: result.cert?.student || result.found?.student },
                      { label: t('cert.research'), value: result.cert?.research || result.found?.title },
                      { label: t('cert.issued'), value: result.cert?.issued || result.found?.date },
                      { label: t('cert.hash'), value: result.cert?.hash || result.found?.hash },
                    ].filter(f => f.value).map(f => (
                      <div key={f.label as string}>
                        <div style={{ fontSize: '.62rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '.06em' }}>{f.label}</div>
                        <div style={{ fontSize: '.85rem', fontWeight: 600, color: '#0F172A', fontFamily: (f.label as string) === t('cert.hash') ? 'monospace' : 'inherit', wordBreak: 'break-all' }}>{f.value}</div>
                      </div>
                    ))}
                  </div>
                  {qr && <img src={qr} alt="QR" style={{ width: 110, height: 110, borderRadius: 12, border: '1px solid #e2e8f0', flexShrink: 0 }} />}
                </div>
              </div>
            ) : (
              <div style={{ background: '#fff', borderRadius: 20, padding: '1.5rem', border: '1px solid rgba(239,68,68,.3)', textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(239,68,68,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <ShieldAlert className="w-7 h-7" style={{ color: '#EF4444' }} />
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#B91C1C', marginBottom: '.35rem' }}>{t('verify.result_not_found')}</div>
                <p style={{ fontSize: '.85rem', color: '#64748B', margin: 0 }}>{t('verify.result_not_found_desc')}</p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="content-section" style={{ paddingTop: 0 }}>
        <div className="content-card">
          <h2><Fingerprint className="w-5 h-5 inline-block mr-1" style={{ color: '#2563EB' }} /> {t('verify.section1_title')}</h2>
          <p>{t('verify.section1_desc')}</p>
          <p>{t('verify.section1_desc2')}</p>
          <h2><CheckCircle2 className="w-5 h-5 inline-block mr-1" style={{ color: '#14B8A6' }} /> {t('verify.section2_title')}</h2>
          <p>{t('verify.section2_desc')}</p>
        </div>
      </div>
    </>
  )
}