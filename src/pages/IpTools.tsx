import { useState } from 'react'
import { useI18n } from '../i18n'
import { findVerified } from '../lib/store'
import { toast } from '../components/Toast'
import { Hash, Search, ShieldCheck, Wrench } from 'lucide-react'

function mockHash(input: string): string {
  let h1 = 0x811c9dc5
  let h2 = 0x1000193
  const s = input.trim().toLowerCase()
  for (let i = 0; i < s.length; i++) {
    h1 ^= s.charCodeAt(i)
    h1 = Math.imul(h1, 16777619) >>> 0
    h2 = Math.imul(h2 ^ s.charCodeAt(i), 65599) >>> 0
  }
  return '0x' + (h1.toString(16).padStart(8, '0') + h2.toString(16).padStart(8, '0')).slice(0, 20)
}

export default function IpTools() {
  const { t } = useI18n()
  const [input, setInput] = useState('')
  const [hash, setHash] = useState('')
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<{ valid: boolean } | null>(null)

  const generate = () => {
    if (!input.trim()) return
    setHash(mockHash(input))
  }

  const copy = async () => {
    if (!hash) return
    try {
      await navigator.clipboard.writeText(hash)
      toast(t('tools.hash_copied'), 'success')
    } catch { /* ignore */ }
  }

  const verify = () => {
    if (!query.trim()) return
    const r = findVerified(query)
    setResult({ valid: r.valid })
  }

  const card = (title: string, desc: string, children: React.ReactNode, icon: React.ReactNode) => (
    <div style={{ background: 'rgba(255,255,255,.9)', border: '1px solid rgba(226,232,240,.8)', borderRadius: 16, padding: '1.5rem', boxShadow: '0 4px 24px rgba(15,23,42,.05)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '.4rem' }}>
        <span style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(0,74,198,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#004ac6' }}>{icon}</span>
        <div>
          <h3 style={{ fontSize: '1.02rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>{title}</h3>
          <p style={{ fontSize: '.78rem', color: '#64748B', margin: '.1rem 0 0' }}>{desc}</p>
        </div>
      </div>
      {children}
    </div>
  )

  const inputEvents = {
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = '#004ac6'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,74,198,.08)' },
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' },
  }

  return (
    <div style={{ maxWidth: 920, margin: '0 auto', padding: '6rem 1.25rem 3rem' }}>
      <header style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}><Wrench size={22} style={{ color: '#004ac6' }} /> {t('tools.title')}</h1>
        <p style={{ color: '#64748B', fontSize: '.92rem', margin: '.35rem 0 0' }}>{t('tools.subtitle')}</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        {card(t('tools.hash_title'), t('tools.hash_desc'), (
          <>
            <input value={input} onChange={e => setInput(e.target.value)} placeholder={t('tools.hash_placeholder')} style={{ width: '100%', padding: '.65rem .85rem', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: '.88rem', outline: 'none', boxSizing: 'border-box', transition: 'all .2s', marginTop: '1rem' }} {...inputEvents} />
            <div style={{ display: 'flex', gap: 8, marginTop: '.75rem' }}>
              <button onClick={generate} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '.6rem 1.2rem', background: 'linear-gradient(135deg,#004ac6,#2563eb)', color: '#fff', fontWeight: 700, borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: '.85rem' }}><Hash size={15} /> {t('tools.hash_generate')}</button>
              {hash && <button onClick={copy} style={{ padding: '.6rem 1.2rem', background: '#f1f5f9', color: '#475569', fontWeight: 700, borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: '.85rem' }}>{t('tools.hash_copy')}</button>}
            </div>
            {hash && (
              <div style={{ marginTop: '1rem', padding: '.8rem 1rem', background: '#0F172A', borderRadius: 10, color: '#7DD3FC', fontFamily: 'monospace', fontSize: '.8rem', wordBreak: 'break-all', overflowWrap: 'anywhere' }}>{hash}</div>
            )}
          </>
        ), <Hash size={17} />)}

        {card(t('tools.verify_title'), t('tools.verify_desc'), (
          <>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder={t('tools.verify_input')} style={{ width: '100%', padding: '.65rem .85rem', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: '.88rem', outline: 'none', boxSizing: 'border-box', transition: 'all .2s', marginTop: '1rem' }} {...inputEvents} />
            <button onClick={verify} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '.6rem 1.2rem', background: 'linear-gradient(135deg,#004ac6,#2563eb)', color: '#fff', fontWeight: 700, borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: '.85rem', marginTop: '.75rem' }}><Search size={15} /> {t('tools.verify_btn')}</button>
            {result && (
              <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: 8, padding: '.7rem .9rem', borderRadius: 10, background: result.valid ? 'rgba(16,185,129,.1)' : 'rgba(239,68,68,.08)', color: result.valid ? '#047857' : '#B91C1C', fontSize: '.85rem', fontWeight: 600 }}>
                <ShieldCheck size={16} /> {result.valid ? t('tools.verify_valid') : t('tools.verify_invalid')}
              </div>
            )}
          </>
        ), <ShieldCheck size={17} />)}
      </div>

      {card(t('tools.other_title'), t('tools.other_desc'), <p style={{ marginTop: '1rem', fontSize: '.85rem', color: '#64748B', lineHeight: 1.6 }}>{t('tools.other_desc')}</p>, <Wrench size={17} />)}

      <p style={{ fontSize: '.75rem', color: '#94A3B8', textAlign: 'center', marginTop: '1.5rem' }}>{t('tools.data_note')}</p>
    </div>
  )
}