import { useEffect, useRef, useState } from 'react'
import { X, Download, Loader2, ShieldCheck, FileText } from 'lucide-react'
import type { Certificate } from '../lib/store'
import { useI18n } from '../i18n'

export default function CertificateModal({ cert, onClose }: { cert: Certificate; onClose: () => void }) {
  const { t } = useI18n()
  const [qr, setQr] = useState('')
  const [busy, setBusy] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let alive = true
    import('qrcode').then(({ toDataURL }) => {
      toDataURL(JSON.stringify({ cert: cert.id, student: cert.student, research: cert.research, hash: cert.hash }), {
        width: 180, margin: 1, color: { dark: '#0F172A', light: '#ffffff' },
      }).then(url => { if (alive) setQr(url) })
    }).catch(() => {})
    return () => { alive = false }
  }, [cert])

  const downloadPdf = async () => {
    setBusy(true)
    try {
      const [html2canvas, jsPDF] = await Promise.all([import('html2canvas'), import('jspdf')])
      const el = ref.current
      if (!el) return
      const canvas = await html2canvas.default(el, { scale: 2, backgroundColor: '#ffffff' })
      const pdf = new jsPDF.jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
      const w = 297, h = 210
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, w, h)
      pdf.save(`${cert.id}.pdf`)
    } catch (e) { /* ignore */ }
    setBusy(false)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(15,23,42,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={onClose}>
      <div style={{ maxHeight: '92vh', overflow: 'auto' }} onClick={e => e.stopPropagation()}>
        <div ref={ref} style={{ width: 760, maxWidth: '92vw', background: 'linear-gradient(135deg,#fff,#f8fafc)', borderRadius: 20, border: '1px solid #e2e8f0', padding: '2rem 2.5rem', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 12, border: '2px solid #2563EB', borderRadius: 14, pointerEvents: 'none' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '.35rem' }}>
                <ShieldCheck className="w-5 h-5" style={{ color: '#2563EB' }} />
                <span style={{ fontSize: '.7rem', fontWeight: 800, color: '#2563EB', letterSpacing: '.08em', textTransform: 'uppercase' }}>{t('cert.verified_doc')}</span>
              </div>
              <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 800, color: '#0F172A' }}>{t('cert.title')}</h2>
              <p style={{ margin: '.15rem 0 0', fontSize: '.8rem', color: '#64748B' }}>Damietta University — IP Protection Portal</p>
            </div>
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              {qr ? (
                <img src={qr} alt="QR" style={{ width: 84, height: 84, borderRadius: 8, border: '1px solid #e2e8f0' }} />
              ) : (
                <div style={{ width: 84, height: 84, borderRadius: 8, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8' }}><Loader2 className="w-5 h-5" /></div>
              )}
              <div style={{ fontSize: '.6rem', color: '#94A3B8', marginTop: 4 }}>{t('cert.scan_qr')}</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem 2rem', marginTop: '1.5rem' }}>
            {[
              { label: t('cert.cert_id'), value: cert.id },
              { label: t('cert.student'), value: cert.student },
              { label: t('cert.research'), value: cert.research },
              { label: t('cert.faculty'), value: cert.faculty },
              { label: t('cert.supervisor'), value: cert.supervisor },
              { label: t('cert.issued'), value: cert.issued },
              { label: t('cert.expires'), value: cert.expires },
              { label: t('cert.hash'), value: cert.hash },
            ].map(f => (
              <div key={f.label}>
                <div style={{ fontSize: '.62rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '.06em' }}>{f.label}</div>
                <div style={{ fontSize: '.9rem', fontWeight: 600, color: '#0F172A', fontFamily: f.label === t('cert.hash') ? 'monospace' : 'inherit' }}>{f.value}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px dashed #cbd5e1' }}>
            <FileText className="w-4 h-4" style={{ color: '#14B8A6' }} />
            <span style={{ fontSize: '.68rem', color: '#64748B' }}>{t('cert.signature_line')}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'center', marginTop: '1rem' }}>
          <button onClick={downloadPdf} disabled={busy} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '.85rem', color: '#fff', background: '#2563EB', border: 'none', padding: '10px 22px', borderRadius: 10, cursor: 'pointer', fontWeight: 600 }}>
            {busy ? <Loader2 className="w-4 h-4" /> : <Download className="w-4 h-4" />} {t('cert.download_pdf')}
          </button>
          <button onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '.85rem', color: '#64748B', background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.25)', padding: '10px 22px', borderRadius: 10, cursor: 'pointer', fontWeight: 600 }}>
            <X className="w-4 h-4" /> {t('cert.close')}
          </button>
        </div>
      </div>
    </div>
  )
}
