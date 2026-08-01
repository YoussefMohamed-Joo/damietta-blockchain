import { useState, useCallback } from 'react'
import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react'

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}

const colors = {
  success: { bg: '#ECFDF5', border: '#A7F3D0', text: '#065F46', icon: '#10B981' },
  error: { bg: '#FEF2F2', border: '#FECACA', text: '#991B1B', icon: '#EF4444' },
  warning: { bg: '#FFFBEB', border: '#FDE68A', text: '#92400E', icon: '#F59E0B' },
  info: { bg: '#EFF6FF', border: '#BFDBFE', text: '#1E40AF', icon: '#3B82F6' },
}

let toastFn: ((msg: string, type?: 'success' | 'error' | 'warning' | 'info') => void) | null = null

export function toast(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') {
  toastFn?.(message, type)
}

export default function ToastContainer() {
  const [items, setItems] = useState<{ id: number; msg: string; type: 'success' | 'error' | 'warning' | 'info' }[]>([])

  toastFn = useCallback((msg: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    const id = Date.now()
    setItems(prev => [...prev, { id, msg, type }])
    setTimeout(() => setItems(prev => prev.filter(t => t.id !== id)), 3500)
  }, [])

  return (
    <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map(t => {
        const c = colors[t.type]
        const Icon = icons[t.type]
        return (
          <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 12, background: c.bg, border: `1px solid ${c.border}`, boxShadow: '0 8px 30px rgba(0,0,0,.08)', minWidth: 300, maxWidth: 420, animation: 'slideIn .3s ease' }}>
            <Icon size={18} style={{ color: c.icon, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: c.text, flex: 1, lineHeight: 1.5 }}>{t.msg}</span>
            <button onClick={() => setItems(prev => prev.filter(x => x.id !== t.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.text, opacity: .5, padding: 0, display: 'flex' }}><X size={14} /></button>
          </div>
        )
      })}
    </div>
  )
}
