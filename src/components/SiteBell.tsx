import { useState, useEffect, useRef } from 'react'
import { Bell, CheckCheck } from 'lucide-react'
import { useI18n } from '../i18n'
import { useDB, markNotifsRead } from '../lib/store'

const typeColor: Record<string, string> = {
  submission: '#2563EB', approval: '#10B981', update: '#6366F1', alert: '#EF4444',
}

export default function SiteBell() {
  const { t } = useI18n()
  const db = useDB()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const sessionName = db.session?.name
  const mine = db.notifications.filter(n => (sessionName && n.user) ? n.user === sessionName : !n.user)
  const unread = mine.filter(n => !n.read).length

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button onClick={() => setOpen(o => !o)} style={{ position: 'relative', width: 40, height: 40, borderRadius: 12, border: '1px solid rgba(148,163,184,.25)', background: 'rgba(255,255,255,.9)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569' }} aria-label={t('nav.notifications')}>
        <Bell className="w-4 h-4" />
        {unread > 0 && (
          <span style={{ position: 'absolute', top: 4, right: 4, minWidth: 16, height: 16, borderRadius: 8, background: '#EF4444', color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>{unread}</span>
        )}
      </button>
      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 10px)', right: 0, width: 340, background: '#fff', borderRadius: 14, border: '1px solid #e2e8f0', boxShadow: '0 20px 60px rgba(15,23,42,.16)', overflow: 'hidden', zIndex: 100 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{t('nav.notifications')}</span>
            <button onClick={() => { markNotifsRead(); setOpen(false) }} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}><CheckCheck className="w-3.5 h-3.5" /> {t('nav.mark_all_read')}</button>
          </div>
          <div style={{ maxHeight: 340, overflow: 'auto' }}>
            {mine.length === 0 && <div style={{ padding: '2rem', textAlign: 'center', color: '#94A3B8', fontSize: 13 }}>{t('nav.no_notifications')}</div>}
            {mine.map(n => (
              <div key={n.id} style={{ display: 'flex', gap: 12, padding: '12px 16px', borderBottom: '1px solid #f8fafc', background: n.read ? '#fff' : '#EFF6FF' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: typeColor[n.type] || '#94A3B8', flexShrink: 0, marginTop: 5 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, color: '#1E293B', margin: 0, lineHeight: 1.5, fontWeight: n.read ? 400 : 600 }}>{n.title}</p>
                  <p style={{ fontSize: 12, color: '#64748B', margin: '2px 0 0', lineHeight: 1.5 }}>{n.text}</p>
                  <span style={{ fontSize: 11, color: '#94A3B8', marginTop: 4, display: 'block' }}>{n.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
