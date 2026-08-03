import { useState } from 'react'
import { CheckCircle, XCircle, Clock, FileText, UserCheck, MessageSquare, ChevronRight, Menu, X, Search } from 'lucide-react'
import NotificationBell from '../components/NotificationBell'
import { toast } from '../components/Toast'
import { useI18n } from '../i18n'

export default function ReviewerDashboard() {
  const { t } = useI18n()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const statusKey: Record<string, string> = {
    'Under Review': 'reviewer.status_under_review',
    'Revisions Needed': 'reviewer.status_revisions_needed',
    Approved: 'reviewer.status_approved',
  }

  const statusBadge = (s: string) => {
    const styles: Record<string, { bg: string; color: string }> = {
      'Under Review': { bg: 'rgba(37,99,235,.12)', color: '#2563EB' },
      'Revisions Needed': { bg: 'rgba(245,158,11,.12)', color: '#F59E0B' },
      Approved: { bg: 'rgba(20,184,166,.12)', color: '#14B8A6' },
    }
    const st = styles[s] || { bg: 'rgba(148,163,184,.12)', color: '#94A3B8' }
    return <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: '.75rem', fontWeight: 600, background: st.bg, color: st.color }}>{t(statusKey[s] ?? s)}</span>
  }

  const reviews = [
    { id: 'RES-2026-001', student: 'Ahmed Hassan', title: 'Blockchain for Healthcare Data', date: '2026-07-24', status: 'Under Review', dept: 'Computer Science' },
    { id: 'RES-2026-003', student: 'Omar Youssef', title: 'IoT Smart Grid Optimization', date: '2026-07-22', status: 'Revisions Needed', dept: 'Electrical Engineering' },
    { id: 'RES-2026-006', student: 'Nadia Fawzi', title: 'ML for Arabic OCR', date: '2026-07-19', status: 'Under Review', dept: 'Computer Science' },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9' }}>
      <aside style={{
        width: sidebarOpen ? 250 : 0, overflow: 'hidden',
        background: 'rgba(15,23,42,.95)',
        transition: 'width .3s', display: 'flex', flexDirection: 'column',
        borderRight: '1px solid rgba(148,163,184,.1)',
        position: 'sticky', top: 0, height: '100vh',
      }}>
        <a href="/" style={{ textDecoration: 'none', padding: '1.25rem', borderBottom: '1px solid rgba(148,163,184,.1)', display: 'flex', alignItems: 'center', gap: '.75rem' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#2563EB,#14B8A6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '.8rem', fontWeight: 700 }}>RK</div>
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '.85rem' }}>{t('reviewer.brand')}</div>
            <div style={{ color: '#14B8A6', fontSize: '.7rem' }}>{t('reviewer.subtitle')}</div>
          </div>
        </a>
        <nav style={{ flex: 1, padding: '.75rem', display: 'flex', flexDirection: 'column', gap: '.25rem' }}>
          {[
            { key: 'dashboard', label: 'Dashboard', labelKey: 'reviewer.dashboard', icon: FileText },
            { key: 'reviews', label: 'My Reviews', labelKey: 'reviewer.my_reviews', icon: UserCheck },
            { key: 'feedback', label: 'Feedback', labelKey: 'reviewer.feedback', icon: MessageSquare },
          ].map(item => {
            const Icon = item.icon
            return (
              <button key={item.key} style={{ display: 'flex', alignItems: 'center', gap: '.75rem', padding: '.7rem .85rem', borderRadius: 12, border: 'none', cursor: 'pointer', fontSize: '.85rem', fontWeight: 500, background: 'rgba(37,99,235,.2)', color: '#fff', textAlign: 'left', width: '100%' }}>
                <Icon className="w-4 h-4" />{t(item.labelKey)}
              </button>
            )
          })}
        </nav>
        <div style={{ padding: '.75rem', borderTop: '1px solid rgba(148,163,184,.1)', display: 'flex', flexDirection: 'column', gap: '.25rem' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '.75rem', padding: '.7rem .85rem', borderRadius: 12, fontSize: '.85rem', fontWeight: 500, color: '#94A3B8', textDecoration: 'none', width: '100%', transition: 'color .2s' }}>
            <ChevronRight className="w-4 h-4" /> {t('reviewer.home')}
          </a>
          <a href="/login" style={{ display: 'flex', alignItems: 'center', gap: '.75rem', padding: '.7rem .85rem', borderRadius: 12, fontSize: '.85rem', fontWeight: 500, color: '#EF4444', textDecoration: 'none', width: '100%', transition: 'color .2s' }}>
            <XCircle className="w-4 h-4" /> {t('reviewer.logout')}
          </a>
        </div>
      </aside>

      <main style={{ flex: 1, padding: '1.5rem 2rem', overflow: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid rgba(148,163,184,.2)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}>
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>{t('reviewer.review_dashboard')}</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <NotificationBell user="reviewer" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Pending Reviews', labelKey: 'reviewer.pending_reviews', value: '12', color: '#2563EB', bg: 'rgba(37,99,235,.12)' },
            { label: 'Completed', labelKey: 'reviewer.completed', value: '48', color: '#14B8A6', bg: 'rgba(20,184,166,.12)' },
            { label: 'Revisions Needed', labelKey: 'reviewer.revisions_needed', value: '3', color: '#F59E0B', bg: 'rgba(245,158,11,.12)' },
            { label: 'Avg. Review Time', labelKey: 'reviewer.avg_review_time', value: '2.4d', color: '#8B5CF6', bg: 'rgba(139,92,246,.12)' },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', borderRadius: 12, padding: '1.25rem', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: s.color, marginBottom: '.25rem' }}>{s.value}</div>
              <div style={{ fontSize: '.8rem', color: '#64748B' }}>{t(s.labelKey)}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>{t('reviewer.assigned_reviews')}</h3>
            <div style={{ position: 'relative' }}>
              <Search className="w-4 h-4" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              <input placeholder={t('reviewer.search_placeholder')} style={{ padding: '8px 12px 8px 32px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '.8rem', width: 200, outline: 'none' }} />
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748B', fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                  <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('reviewer.id')}</th>
                  <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('reviewer.student')}</th>
                  <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('reviewer.title')}</th>
                  <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('reviewer.department')}</th>
                  <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('reviewer.status')}</th>
                  <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('reviewer.date')}</th>
                  <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('reviewer.action')}</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map(r => (
                  <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '.75rem 0', fontWeight: 600, color: '#2563EB' }}>{r.id}</td>
                    <td style={{ padding: '.75rem 0', color: '#0F172A' }}>{r.student}</td>
                    <td style={{ padding: '.75rem 0', color: '#334155' }}>{r.title}</td>
                    <td style={{ padding: '.75rem 0', color: '#64748B', fontSize: '.8rem' }}>{r.dept}</td>
                    <td style={{ padding: '.75rem 0' }}>{statusBadge(r.status)}</td>
                    <td style={{ padding: '.75rem 0', color: '#64748B' }}>{r.date}</td>
                    <td style={{ padding: '.75rem 0' }}>
                      <div style={{ display: 'flex', gap: '.4rem' }}>
                        <button onClick={() => toast(`${r.title} ${t('reviewer.toast_approved')}`, 'success')} style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(37,99,235,.2)', background: 'rgba(37,99,235,.06)', cursor: 'pointer', color: '#2563EB', fontSize: '.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <CheckCircle className="w-3.5 h-3.5" /> {t('reviewer.approve')}
                        </button>
                        <button onClick={() => toast(`${t('reviewer.toast_revisions_requested')} ${r.id}`, 'warning')} style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(245,158,11,.2)', background: 'rgba(245,158,11,.06)', cursor: 'pointer', color: '#F59E0B', fontSize: '.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Clock className="w-3.5 h-3.5" /> {t('reviewer.revise')}
                        </button>
                        <button onClick={() => toast(`${r.title} ${t('reviewer.toast_rejected')}`, 'error')} style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(239,68,68,.2)', background: 'rgba(239,68,68,.06)', cursor: 'pointer', color: '#EF4444', fontSize: '.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <XCircle className="w-3.5 h-3.5" /> {t('reviewer.reject')}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
