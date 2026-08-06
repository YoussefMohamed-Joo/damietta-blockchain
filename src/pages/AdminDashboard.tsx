import { lazy, Suspense, useState } from 'react'
import {
  LayoutDashboard, Users, FileText, Shield, Settings, LogOut,
  Search, CheckCircle, XCircle, Clock,
  BookOpen, Award, Menu, X, Eye,
  Download, MoreHorizontal, UserCheck, AlertTriangle, Activity, Filter, List,
  Bell, Upload, Save, HardDrive, Wifi, UserPlus, BarChart3
} from 'lucide-react'
import NotificationBell from '../components/NotificationBell'
import CertificateModal from '../components/CertificateModal'
import { toast } from '../components/Toast'
import { useI18n } from '../i18n'
import { useDB, approveSubmission, rejectSubmission, addUser as storeAddUser } from '../lib/store'

const Charts = lazy(() => import('../components/AdminCharts'))

const sidebarItems = [
  { key: 'overview', label: 'Overview', labelKey: 'admin.overview', icon: LayoutDashboard },
  { key: 'users', label: 'Users', labelKey: 'admin.users', icon: Users },
  { key: 'submissions', label: 'Submissions', labelKey: 'admin.submissions', icon: FileText },
  { key: 'blockchain', label: 'Blockchain Records', labelKey: 'admin.blockchain_records', icon: Shield },
  { key: 'certificates', label: 'Certificates', labelKey: 'admin.certificates', icon: Award },
  { key: 'settings', label: 'Settings', labelKey: 'admin.settings', icon: Settings },
]

const statusKey: Record<string, string> = {
  Approved: 'admin.status_approved',
  Pending: 'admin.status_pending',
  'Under Review': 'admin.status_under_review',
  Rejected: 'admin.status_rejected',
  Confirmed: 'admin.status_confirmed',
  Active: 'admin.status_active',
  Inactive: 'admin.status_inactive',
}

export default function AdminDashboard() {
  const { t } = useI18n()
  const db = useDB()
  const [active, setActive] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [toggles, setToggles] = useState({ 'Maintenance Mode': false, 'Auto-Certificate Generation': true, 'Notification Alerts': true })
  const [uploadSize, setUploadSize] = useState('50 MB')
  const [showAddUser, setShowAddUser] = useState(false)
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Student', password: '' })
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Status')
  const [viewCert, setViewCert] = useState<typeof db.certificates[0] | null>(null)

  const matchQuery = (fields: string[]) => !searchQuery || fields.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
  const matchStatus = (status: string) => statusFilter === 'All Status' || status === statusFilter
  const smartFilter = <T extends Record<string, any>>(items: T[], fields: string[], statusField?: string) =>
    items.filter(i => matchQuery(fields.map(f => String(i[f]))) && (!statusField || matchStatus(String(i[statusField]))))

  const activeLabels: Record<string, string> = {
    overview: 'admin.overview',
    users: 'admin.users',
    submissions: 'admin.submissions',
    blockchain: 'admin.blockchain_records',
    certificates: 'admin.certificates',
    settings: 'admin.settings',
  }

const pendingCount = db.submissions.filter(s => s.status === 'Pending' || s.status === 'Under Review').length

  const stats = [
    { label: 'Total Users', labelKey: 'admin.total_users', value: db.users.length.toLocaleString(), change: '+12%', icon: Users, color: '#2563EB', bg: 'rgba(37,99,235,.12)' },
    { label: 'Total Research', labelKey: 'admin.total_research', value: db.submissions.length.toLocaleString(), change: '+8%', icon: BookOpen, color: '#14B8A6', bg: 'rgba(20,184,166,.12)' },
    { label: 'Certificates Issued', labelKey: 'admin.certificates_issued', value: db.certificates.length.toLocaleString(), change: '+15%', icon: Award, color: '#F59E0B', bg: 'rgba(245,158,11,.12)' },
    { label: 'Pending Reviews', labelKey: 'admin.pending_reviews', value: String(pendingCount), change: '-3%', icon: Clock, color: '#EF4444', bg: 'rgba(239,68,68,.12)' },
  ]

  const statusBadge = (s: string) => {
    const m: Record<string, { bg: string; color: string; icon: typeof CheckCircle }> = {
      Approved: { bg: 'rgba(20,184,166,.12)', color: '#14B8A6', icon: CheckCircle },
      Pending: { bg: 'rgba(245,158,11,.12)', color: '#F59E0B', icon: Clock },
      'Under Review': { bg: 'rgba(37,99,235,.12)', color: '#2563EB', icon: UserCheck },
      Rejected: { bg: 'rgba(239,68,68,.12)', color: '#EF4444', icon: XCircle },
      Confirmed: { bg: 'rgba(20,184,166,.12)', color: '#14B8A6', icon: CheckCircle },
      Active: { bg: 'rgba(20,184,166,.12)', color: '#14B8A6', icon: CheckCircle },
      Inactive: { bg: 'rgba(239,68,68,.12)', color: '#EF4444', icon: XCircle },
    }
    const c = m[s] || { bg: 'rgba(148,163,184,.12)', color: '#94A3B8', icon: AlertTriangle }
    const Icon = c.icon
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 20, fontSize: '.75rem', fontWeight: 600, background: c.bg, color: c.color }}>
        <Icon className="w-3 h-3" />{t(statusKey[s] ?? s)}
      </span>
    )
  }

  const exportCsv = () => {
    const rows = [['ID', 'Student', 'Title', 'Status', 'Date'], ...db.submissions.map(s => [s.id, s.student, s.title, s.status, s.date])]
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = 'submissions.csv'; a.click()
    toast(t('admin.toast_exported'), 'success')
  }

  const renderContent = () => {
    switch (active) {
      case 'overview':
        return (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
              {stats.map(s => {
                const Icon = s.icon
                const isNeg = s.change.startsWith('-')
                return (
                  <div key={s.label} style={{ background: 'rgba(255,255,255,.95)', borderRadius: 16, padding: '1.5rem', border: '1px solid rgba(255,255,255,.5)', boxShadow: '0 4px 16px rgba(0,0,0,.04)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon className="w-5 h-5" style={{ color: s.color }} />
                      </div>
                      <span style={{ fontSize: '.75rem', fontWeight: 600, color: isNeg ? '#EF4444' : '#14B8A6', background: isNeg ? 'rgba(239,68,68,.1)' : 'rgba(20,184,166,.1)', padding: '2px 8px', borderRadius: 8 }}>{s.change}</span>
                    </div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0F172A', marginBottom: '.25rem' }}>{s.value}</div>
                    <div style={{ fontSize: '.8rem', color: '#64748B' }}>{t(s.labelKey)}</div>
                  </div>
                )
              })}
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{ background: 'rgba(255,255,255,.95)', borderRadius: 16, padding: '1.5rem', border: '1px solid rgba(255,255,255,.5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}><BarChart3 size={16} style={{ color: '#2563EB' }} /> {t('admin.submissions_chart')} · {t('admin.status_distribution')}</h3>
                </div>
                <Suspense fallback={<div style={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', fontSize: '.8rem' }}>{t('admin.loading_chart')}</div>}>
                  <Charts submissions={db.submissions} />
                </Suspense>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,.95)', borderRadius: 16, padding: '1.5rem', border: '1px solid rgba(255,255,255,.5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>{t('admin.recent_submissions')}</h3>
                <button onClick={() => setActive('submissions')} style={{ fontSize: '.8rem', color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>{t('admin.view_all')}</button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(148,163,184,.2)', color: '#64748B', fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                      <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('admin.id')}</th>
                      <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('admin.student')}</th>
                      <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('admin.title')}</th>
                      <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('admin.status')}</th>
                      <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('admin.date')}</th>
                      <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('admin.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {smartFilter(db.submissions.slice(0, 5), ['id', 'student', 'title', 'status', 'date'], 'status').map(r => (
                      <tr key={r.id} style={{ borderBottom: '1px solid rgba(148,163,184,.1)' }}>
                        <td style={{ padding: '.75rem 0', fontWeight: 600, color: '#2563EB' }}>{r.id}</td>
                        <td style={{ padding: '.75rem 0', color: '#0F172A' }}>{r.student}</td>
                        <td style={{ padding: '.75rem 0', color: '#334155', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.title}</td>
                        <td style={{ padding: '.75rem 0' }}>{statusBadge(r.status)}</td>
                        <td style={{ padding: '.75rem 0', color: '#64748B' }}>{r.date}</td>
                        <td style={{ padding: '.75rem 0' }}>
                          <div style={{ display: 'flex', gap: '.3rem' }}>
                            <button onClick={() => toast(`${t('admin.toast_viewing_details')} ${r.id}`, 'info')} style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid rgba(37,99,235,.2)', background: 'rgba(37,99,235,.06)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }} title={t('admin.view')}><Eye size={13} /></button>
                            <button onClick={() => { approveSubmission(r.id); toast(`${r.id} ${t('admin.toast_approved')}`, 'success') }} disabled={r.status === 'Approved'} style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid rgba(20,184,166,.2)', background: 'rgba(20,184,166,.06)', cursor: r.status === 'Approved' ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: r.status === 'Approved' ? '#CBD5E1' : '#14B8A6' }} title={t('admin.approve')}><CheckCircle size={13} /></button>
                            <button onClick={() => { rejectSubmission(r.id); toast(`${r.id} ${t('admin.toast_rejected')}`, 'error') }} disabled={r.status !== 'Pending' && r.status !== 'Under Review'} style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid rgba(239,68,68,.2)', background: 'rgba(239,68,68,.06)', cursor: (r.status !== 'Pending' && r.status !== 'Under Review') ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: (r.status !== 'Pending' && r.status !== 'Under Review') ? '#CBD5E1' : '#EF4444' }} title={t('admin.reject')}><XCircle size={13} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )
      case 'users':
        return (
          <>
            <div style={{ background: 'rgba(255,255,255,.95)', borderRadius: 16, padding: '1.5rem', border: '1px solid rgba(255,255,255,.5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}><Users size={18} /> {t('admin.user_management')}</h3>
                <button onClick={() => { setNewUser({ name: '', email: '', role: 'Student', password: '' }); setShowAddUser(true) }} style={{ fontSize: '.8rem', color: '#fff', background: '#2563EB', border: 'none', padding: '8px 16px', borderRadius: 10, cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}><UserPlus size={14} /> {t('admin.add_user')}</button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(148,163,184,.2)', color: '#64748B', fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                      <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('admin.name')}</th>
                      <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('admin.email')}</th>
                      <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('admin.role')}</th>
                      <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('admin.status')}</th>
                      <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('admin.papers')}</th>
                      <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('admin.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {smartFilter(db.users, ['name', 'email', 'role', 'status'], 'status').map(u => (
                      <tr key={u.email} style={{ borderBottom: '1px solid rgba(148,163,184,.1)' }}>
                        <td style={{ padding: '.75rem 0', fontWeight: 600, color: '#0F172A' }}>{u.name}</td>
                        <td style={{ padding: '.75rem 0', color: '#64748B' }}>{u.email}</td>
                        <td style={{ padding: '.75rem 0' }}>
                          <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: '.75rem', fontWeight: 600, background: u.role === 'Admin' ? 'rgba(239,68,68,.1)' : u.role === 'Reviewer' ? 'rgba(37,99,235,.1)' : 'rgba(20,184,166,.1)', color: u.role === 'Admin' ? '#EF4444' : u.role === 'Reviewer' ? '#2563EB' : '#14B8A6' }}>{t('admin.role_' + u.role.toLowerCase())}</span>
                        </td>
                        <td style={{ padding: '.75rem 0' }}>{statusBadge(u.status)}</td>
                        <td style={{ padding: '.75rem 0', color: '#334155' }}>{u.papers}</td>
                        <td style={{ padding: '.75rem 0' }}>
                          <button onClick={() => toast(`${t('admin.toast_managing_user')} ${u.name}`, 'info')} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid rgba(148,163,184,.2)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}><MoreHorizontal size={15} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {showAddUser && (
              <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ background: '#fff', borderRadius: 20, padding: '2rem', width: 420, maxWidth: '90vw', boxShadow: '0 25px 60px rgba(0,0,0,.3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#0F172A' }}>{t('admin.add_new_user')}</h3>
                    <button onClick={() => setShowAddUser(false)} style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'rgba(148,163,184,.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}><X size={16} /></button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: '#334155', marginBottom: 4 }}>{t('admin.full_name')}</label>
                      <input value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} placeholder={t('admin.ph_name_example')} style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(148,163,184,.3)', fontSize: '.85rem', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: '#334155', marginBottom: 4 }}>{t('admin.email_address')}</label>
                      <input value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} placeholder={t('admin.ph_email_example')} style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(148,163,184,.3)', fontSize: '.85rem', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: '#334155', marginBottom: 4 }}>{t('admin.password')}</label>
                      <input type="password" value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} placeholder="••••••••" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(148,163,184,.3)', fontSize: '.85rem', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: '#334155', marginBottom: 4 }}>{t('admin.role')}</label>
                      <select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })} style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(148,163,184,.3)', fontSize: '.85rem', outline: 'none', background: '#fff', boxSizing: 'border-box' }}>
                        <option value="Student">{t('admin.role_student')}</option>
                        <option value="Reviewer">{t('admin.role_reviewer')}</option>
                        <option value="Admin">{t('admin.role_admin')}</option>
                      </select>
                    </div>
                  </div>
                  <button onClick={() => {
                    if (!newUser.name.trim() || !newUser.email.trim() || !newUser.password.trim()) { toast(t('admin.toast_fill_fields'), 'error'); return }
                    storeAddUser({ name: newUser.name.trim(), email: newUser.email.trim(), role: newUser.role as any })
                    setShowAddUser(false)
                    toast(`${newUser.name} ${t('admin.toast_user_added')}`, 'success')
                  }} style={{ marginTop: '1.5rem', width: '100%', fontSize: '.85rem', color: '#fff', background: '#2563EB', border: 'none', padding: '12px', borderRadius: 12, cursor: 'pointer', fontWeight: 600 }}>{t('admin.add_user')}</button>
                </div>
              </div>
            )}
          </>
        )
      case 'submissions':
        return (
          <div style={{ background: 'rgba(255,255,255,.95)', borderRadius: 16, padding: '1.5rem', border: '1px solid rgba(255,255,255,.5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}><List size={18} /> {t('admin.all_submissions')}</h3>
              <div style={{ display: 'flex', gap: '.5rem' }}>
                <div style={{ position: 'relative' }}>
                  <Filter size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', pointerEvents: 'none' }} />
                  <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: '8px 12px 8px 30px', borderRadius: 10, border: '1px solid rgba(148,163,184,.2)', fontSize: '.8rem', background: 'rgba(255,255,255,.5)', color: '#334155', outline: 'none', appearance: 'none' }}>
                    <option value="All Status">{t('admin.status_all')}</option>
                    {['Approved', 'Pending', 'Under Review', 'Rejected'].map(s => <option key={s} value={s}>{t(statusKey[s])}</option>)}
                  </select>
                </div>
                <button onClick={exportCsv} style={{ fontSize: '.8rem', color: '#fff', background: '#2563EB', border: 'none', padding: '8px 16px', borderRadius: 10, cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}><Download size={14} /> {t('admin.export')}</button>
              </div>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(148,163,184,.2)', color: '#64748B', fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('admin.id')}</th>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('admin.student')}</th>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('admin.title')}</th>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('admin.status')}</th>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('admin.date')}</th>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('admin.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {smartFilter(db.submissions, ['id', 'student', 'title', 'status', 'date'], 'status').map(r => (
                    <tr key={r.id} style={{ borderBottom: '1px solid rgba(148,163,184,.1)' }}>
                      <td style={{ padding: '.75rem 0', fontWeight: 600, color: '#2563EB' }}>{r.id}</td>
                      <td style={{ padding: '.75rem 0', color: '#0F172A' }}>{r.student}</td>
                      <td style={{ padding: '.75rem 0', color: '#334155' }}>{r.title}</td>
                      <td style={{ padding: '.75rem 0' }}>{statusBadge(r.status)}</td>
                      <td style={{ padding: '.75rem 0', color: '#64748B' }}>{r.date}</td>
                      <td style={{ padding: '.75rem 0' }}>
                        <div style={{ display: 'flex', gap: '.4rem' }}>
                          <button onClick={() => toast(`${t('admin.toast_viewing_details')} ${r.id}`, 'info')} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid rgba(37,99,235,.2)', background: 'rgba(37,99,235,.06)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }} title={t('admin.view')}><Eye size={15} /></button>
                          <button onClick={() => { approveSubmission(r.id); toast(`${r.title} ${t('admin.toast_approved')}`, 'success') }} disabled={r.status === 'Approved'} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid rgba(20,184,166,.2)', background: 'rgba(20,184,166,.06)', cursor: r.status === 'Approved' ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: r.status === 'Approved' ? '#CBD5E1' : '#14B8A6' }} title={t('admin.approve')}><CheckCircle size={15} /></button>
                          <button onClick={() => { rejectSubmission(r.id); toast(`${r.title} ${t('admin.toast_rejected')}`, 'error') }} disabled={r.status === 'Approved' || r.status === 'Rejected'} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid rgba(239,68,68,.2)', background: 'rgba(239,68,68,.06)', cursor: (r.status === 'Approved' || r.status === 'Rejected') ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: (r.status === 'Approved' || r.status === 'Rejected') ? '#CBD5E1' : '#EF4444' }} title={t('admin.reject')}><XCircle size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      case 'blockchain':
        return (
          <div style={{ background: 'rgba(255,255,255,.95)', borderRadius: 16, padding: '1.5rem', border: '1px solid rgba(255,255,255,.5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}><Shield size={18} /> {t('admin.blockchain_transactions')}</h3>
              <span style={{ fontSize: '.8rem', color: '#64748B', background: 'rgba(37,99,235,.1)', padding: '6px 12px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Activity size={14} /> {t('admin.network')}: Ethereum Sepolia
              </span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(148,163,184,.2)', color: '#64748B', fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('admin.tx_hash')}</th>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('admin.research')}</th>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('admin.timestamp')}</th>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('admin.block')}</th>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('admin.status')}</th>
                  </tr>
                </thead>
                <tbody>
                  {db.blockchain.map(b => (
                    <tr key={b.tx} style={{ borderBottom: '1px solid rgba(148,163,184,.1)' }}>
                      <td style={{ padding: '.75rem 0', fontFamily: 'monospace', fontWeight: 600, color: '#2563EB', fontSize: '.8rem' }}>{b.tx}</td>
                      <td style={{ padding: '.75rem 0', color: '#0F172A' }}>{b.research}</td>
                      <td style={{ padding: '.75rem 0', color: '#64748B', fontSize: '.8rem' }}>{b.timestamp}</td>
                      <td style={{ padding: '.75rem 0', fontFamily: 'monospace', color: '#334155' }}>{b.block}</td>
                      <td style={{ padding: '.75rem 0' }}>{statusBadge(b.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      case 'certificates':
        return (
          <>
            <div style={{ background: 'rgba(255,255,255,.95)', borderRadius: 16, padding: '1.5rem', border: '1px solid rgba(255,255,255,.5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}><Award size={18} /> {t('admin.digital_certificates')}</h3>
                <button onClick={() => {
                  const first = db.submissions.find(s => s.status === 'Approved' && !db.certificates.some(c => c.research === s.title))
                  if (!first) { toast(t('admin.toast_no_cert'), 'error'); return }
                  approveSubmission(first.id)
                  const cert = db.certificates[0]
                  setViewCert(cert)
                  toast(`${t('admin.toast_cert_issued')} ${cert.id}`, 'success')
                }} style={{ fontSize: '.8rem', color: '#fff', background: '#2563EB', border: 'none', padding: '8px 16px', borderRadius: 10, cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}><Award size={14} /> {t('admin.issue_new')}</button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(148,163,184,.2)', color: '#64748B', fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                      <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('admin.certificate_id')}</th>
                      <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('admin.student')}</th>
                      <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('admin.research')}</th>
                      <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('admin.issued_date')}</th>
                      <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('admin.qr_code')}</th>
                      <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('admin.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {db.certificates.map(c => (
                      <tr key={c.id} style={{ borderBottom: '1px solid rgba(148,163,184,.1)' }}>
                        <td style={{ padding: '.75rem 0', fontWeight: 600, color: '#2563EB' }}>{c.id}</td>
                        <td style={{ padding: '.75rem 0', color: '#0F172A' }}>{c.student}</td>
                        <td style={{ padding: '.75rem 0', color: '#334155' }}>{c.research}</td>
                        <td style={{ padding: '.75rem 0', color: '#64748B' }}>{c.issued}</td>
                        <td style={{ padding: '.75rem 0' }}>
                          <span style={{ fontFamily: 'monospace', color: '#94A3B8', fontSize: '.75rem', background: 'rgba(0,0,0,.03)', padding: '4px 8px', borderRadius: 6 }}>{c.hash.slice(0, 10)}...</span>
                        </td>
                        <td style={{ padding: '.75rem 0' }}>
                          <div style={{ display: 'flex', gap: '.4rem' }}>
                            <button onClick={() => setViewCert(c)} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid rgba(37,99,235,.2)', background: 'rgba(37,99,235,.06)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }}><Eye size={15} /></button>
                            <button onClick={() => setViewCert(c)} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid rgba(20,184,166,.2)', background: 'rgba(20,184,166,.06)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#14B8A6' }}><Download size={15} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {viewCert && <CertificateModal cert={viewCert} onClose={() => setViewCert(null)} />}
          </>
        )
      case 'settings':
        const settingIcons: Record<string, any> = {
          'Maintenance Mode': Shield, 'Blockchain Network': Wifi,
          'Auto-Certificate Generation': Award, 'Storage Provider': HardDrive,
          'Max Upload Size': Upload, 'Notification Alerts': Bell,
        }
        return (
          <div style={{ background: 'rgba(255,255,255,.95)', borderRadius: 16, padding: '1.5rem', border: '1px solid rgba(255,255,255,.5)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 8 }}><Settings size={18} /> {t('admin.platform_settings')}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { label: 'Maintenance Mode', labelKey: 'admin.setting_maintenance', descKey: 'admin.setting_maintenance_desc', type: 'toggle' },
                { label: 'Blockchain Network', labelKey: 'admin.setting_blockchain_network', descKey: 'admin.setting_blockchain_network_desc', type: 'info' },
                { label: 'Auto-Certificate Generation', labelKey: 'admin.setting_auto_cert', descKey: 'admin.setting_auto_cert_desc', type: 'toggle' },
                { label: 'Storage Provider', labelKey: 'admin.setting_storage', descKey: 'admin.setting_storage_desc', type: 'info' },
                { label: 'Max Upload Size', labelKey: 'admin.setting_max_upload', descKey: 'admin.setting_max_upload_desc', type: 'text' },
                { label: 'Notification Alerts', labelKey: 'admin.setting_notifications', descKey: 'admin.setting_notifications_desc', type: 'toggle' },
              ].map(s => {
                const Icon = settingIcons[s.label]
                const isOn = s.type === 'toggle' ? toggles[s.label as keyof typeof toggles] : false
                return (
                  <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,.4)', borderRadius: 12, border: '1px solid rgba(255,255,255,.3)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {Icon && <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(37,99,235,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }}><Icon size={16} /></div>}
                      <div>
                        <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '.9rem' }}>{t(s.labelKey)}</div>
                        <div style={{ fontSize: '.8rem', color: '#64748B', marginTop: 2 }}>{t(s.descKey)}</div>
                      </div>
                    </div>
                    {s.type === 'toggle' ? (
                      <div onClick={() => setToggles(prev => ({ ...prev, [s.label]: !prev[s.label as keyof typeof prev] }))} style={{ width: 44, height: 24, borderRadius: 12, background: isOn ? '#2563EB' : '#CBD5E1', cursor: 'pointer', position: 'relative', transition: 'background .2s' }}>
                        <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: isOn ? 22 : 2, boxShadow: '0 1px 3px rgba(0,0,0,.15)', transition: 'left .2s' }} />
                      </div>
                    ) : s.type === 'info' ? (
                      <span style={{ fontSize: '.8rem', color: '#2563EB', fontWeight: 500, background: 'rgba(37,99,235,.08)', padding: '6px 12px', borderRadius: 8 }}>{t(s.descKey).split('—')[0].trim()}</span>
                    ) : (
                      <input value={uploadSize} onChange={e => setUploadSize(e.target.value)} style={{ width: 100, padding: '6px 10px', borderRadius: 8, border: '1px solid rgba(148,163,184,.2)', fontSize: '.8rem', textAlign: 'center', background: 'rgba(255,255,255,.5)' }} />
                    )}
                  </div>
                )
              })}
            </div>
            <button onClick={() => toast(t('admin.toast_settings_saved'), 'success')} style={{ marginTop: '1.5rem', fontSize: '.85rem', color: '#fff', background: '#2563EB', border: 'none', padding: '10px 24px', borderRadius: 10, cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}><Save size={15} /> {t('admin.save_changes')}</button>
          </div>
        )
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <aside style={{
        width: sidebarOpen ? 250 : 0,
        overflow: 'hidden',
        background: 'rgba(15,23,42,.95)',
        transition: 'width .3s ease',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid rgba(148,163,184,.1)',
        position: 'sticky',
        top: 0,
        height: '100vh',
      }}>
          <a href="/" style={{ textDecoration: 'none', padding: '1.25rem', borderBottom: '1px solid rgba(148,163,184,.1)', display: 'flex', alignItems: 'center', gap: '.75rem', transition: 'opacity .2s' }} title={t('admin.back_to_home')}>
            <img src="/img/logo.png" alt="" style={{ height: 32, borderRadius: 8 }} />
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '.85rem' }}>{t('admin.brand')}</div>
              <div style={{ color: '#14B8A6', fontSize: '.7rem' }}>{t('admin.panel_label')}</div>
            </div>
          </a>
        <nav style={{ flex: 1, padding: '.75rem', display: 'flex', flexDirection: 'column', gap: '.25rem' }}>
          {sidebarItems.map(item => {
            const Icon = item.icon
            return (
              <button key={item.key} onClick={() => setActive(item.key)} style={{
                display: 'flex', alignItems: 'center', gap: '.75rem', padding: '.7rem .85rem',
                borderRadius: 12, border: 'none', cursor: 'pointer', fontSize: '.85rem', fontWeight: 500,
                background: active === item.key ? 'rgba(37,99,235,.2)' : 'transparent',
                color: active === item.key ? '#fff' : '#94A3B8',
                transition: 'all .2s', textAlign: 'left', width: '100%',
              }}
                onMouseEnter={e => { if (active !== item.key) { e.currentTarget.style.background = 'rgba(148,163,184,.08)'; e.currentTarget.style.color = '#E2E8F0' } }}
                onMouseLeave={e => { if (active !== item.key) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94A3B8' } }}
              >
                <Icon className="w-4 h-4" />
                {t(item.labelKey)}
              </button>
            )
          })}
        </nav>
        <div style={{ padding: '.75rem', borderTop: '1px solid rgba(148,163,184,.1)', display: 'flex', flexDirection: 'column', gap: '.25rem' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '.75rem', padding: '.7rem .85rem', borderRadius: 12, fontSize: '.85rem', fontWeight: 500, color: '#94A3B8', textDecoration: 'none', width: '100%', transition: 'color .2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(148,163,184,.08)'; e.currentTarget.style.color = '#E2E8F0' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94A3B8' }}
          >
            <LayoutDashboard className="w-4 h-4" /> {t('admin.home')}
          </a>
          <a href="/login" style={{ display: 'flex', alignItems: 'center', gap: '.75rem', padding: '.7rem .85rem', borderRadius: 12, cursor: 'pointer', fontSize: '.85rem', fontWeight: 500, color: '#EF4444', textDecoration: 'none', width: '100%' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,.1)'; e.currentTarget.style.color = '#EF4444' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#EF4444' }}
          >
            <LogOut className="w-4 h-4" /> {t('admin.logout')}
          </a>
        </div>
      </aside>
      <main style={{ flex: 1, padding: '1.5rem 2rem', overflow: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid rgba(148,163,184,.2)', background: 'rgba(255,255,255,.5)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}>
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0F172A', margin: 0, textTransform: 'capitalize' }}>{t(activeLabels[active] ?? active)}</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <Search className="w-4 h-4" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              <input placeholder={t('admin.search_placeholder')} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ padding: '8px 12px 8px 36px', borderRadius: 10, border: '1px solid rgba(148,163,184,.2)', fontSize: '.8rem', width: 220, background: 'rgba(255,255,255,.5)', outline: 'none' }} />
            </div>
            <NotificationBell user="admin" />
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#2563EB,#14B8A6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '.8rem', fontWeight: 700 }}>AK</div>
          </div>
        </div>
        {renderContent()}
      </main>
    </div>
  )
}