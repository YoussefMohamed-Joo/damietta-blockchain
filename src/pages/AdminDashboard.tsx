import { useState } from 'react'
import {
  LayoutDashboard, Users, FileText, Shield, Settings, LogOut,
  Search, CheckCircle, XCircle, Clock,
  BookOpen, Award, Menu, X, Eye,
  Download, MoreHorizontal, UserCheck, AlertTriangle, Activity, Filter, List,
  Bell, Upload, Save, HardDrive, Wifi, UserPlus
} from 'lucide-react'
import NotificationBell from '../components/NotificationBell'
import { toast } from '../components/Toast'
const sidebarItems = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'users', label: 'Users', icon: Users },
  { key: 'submissions', label: 'Submissions', icon: FileText },
  { key: 'blockchain', label: 'Blockchain Records', icon: Shield },
  { key: 'certificates', label: 'Certificates', icon: Award },
  { key: 'settings', label: 'Settings', icon: Settings },
]

const stats = [
  { label: 'Total Users', value: '1,284', change: '+12%', icon: Users, color: '#2563EB', bg: 'rgba(37,99,235,.12)' },
  { label: 'Total Research', value: '3,542', change: '+8%', icon: BookOpen, color: '#14B8A6', bg: 'rgba(20,184,166,.12)' },
  { label: 'Certificates Issued', value: '2,891', change: '+15%', icon: Award, color: '#F59E0B', bg: 'rgba(245,158,11,.12)' },
  { label: 'Pending Reviews', value: '47', change: '-3%', icon: Clock, color: '#EF4444', bg: 'rgba(239,68,68,.12)' },
]

const recentSubmissions = [
  { id: 'RES-2026-001', student: 'Ahmed Hassan', title: 'Blockchain for Healthcare Data', status: 'Approved', date: '2026-07-24', hash: '0x7f8a...3b2c' },
  { id: 'RES-2026-002', student: 'Mariam Ali', title: 'AI-Based Crop Disease Detection', status: 'Pending', date: '2026-07-23', hash: '—' },
  { id: 'RES-2026-003', student: 'Omar Youssef', title: 'IoT Smart Grid Optimization', status: 'Under Review', date: '2026-07-22', hash: '—' },
  { id: 'RES-2026-004', student: 'Nour El-Din', title: 'NLP for Arabic Sentiment Analysis', status: 'Approved', date: '2026-07-21', hash: '0x9d2f...7e1a' },
  { id: 'RES-2026-005', student: 'Laila Mahmoud', title: 'Deep Learning for Medical Imaging', status: 'Rejected', date: '2026-07-20', hash: '—' },
]

const initialUsers = [
  { name: 'Dr. Khaled Ibrahim', email: 'k.ibrahim@du.edu.eg', role: 'Admin', status: 'Active', papers: 42 },
  { name: 'Dr. Samira Younis', email: 's.younis@du.edu.eg', role: 'Reviewer', status: 'Active', papers: 28 },
  { name: 'Ahmed Hassan', email: 'ahmed.hassan@stud.du.edu.eg', role: 'Student', status: 'Active', papers: 3 },
  { name: 'Mariam Ali', email: 'mariam.ali@stud.du.edu.eg', role: 'Student', status: 'Active', papers: 1 },
  { name: 'Sarah Nabil', email: 's.nabil@du.edu.eg', role: 'Reviewer', status: 'Inactive', papers: 15 },
]

const blockchainRecords = [
  { tx: '0x7f8a...3b2c', research: 'Blockchain for Healthcare Data', timestamp: '2026-07-24 14:32:18', block: 18472921, status: 'Confirmed' },
  { tx: '0x9d2f...7e1a', research: 'NLP for Arabic Sentiment Analysis', timestamp: '2026-07-21 09:15:42', block: 18471200, status: 'Confirmed' },
  { tx: '0x4b1e...8f3d', research: 'Renewable Energy Forecasting', timestamp: '2026-07-18 16:04:55', block: 18468934, status: 'Confirmed' },
  { tx: '0x2c8a...5e9f', research: 'Smart Agriculture System', timestamp: '2026-07-15 11:22:30', block: 18465412, status: 'Confirmed' },
]

const certData = [
  { id: 'CERT-2026-001', student: 'Ahmed Hassan', research: 'Blockchain for Healthcare Data', issued: '2026-07-24', qr: '••••' },
  { id: 'CERT-2026-002', student: 'Nour El-Din', research: 'NLP for Arabic Sentiment Analysis', issued: '2026-07-21', qr: '••••' },
  { id: 'CERT-2026-003', student: 'Hossam Kamal', research: 'Renewable Energy Forecasting', issued: '2026-07-18', qr: '••••' },
]

export default function AdminDashboard() {
  const [active, setActive] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [toggles, setToggles] = useState({ 'Maintenance Mode': false, 'Auto-Certificate Generation': true, 'Notification Alerts': true })
  const [uploadSize, setUploadSize] = useState('50 MB')
  const [showAddUser, setShowAddUser] = useState(false)
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Student', password: '' })
  const [usersData, setUsersData] = useState(initialUsers)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Status')
  const matchQuery = (fields: string[]) => !searchQuery || fields.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
  const matchStatus = (status: string) => statusFilter === 'All Status' || status === statusFilter
  const smartFilter = <T extends Record<string, any>>(items: T[], fields: string[], statusField?: string) =>
    items.filter(i => matchQuery(fields.map(f => String(i[f]))) && (!statusField || matchStatus(String(i[statusField]))))

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
        <Icon className="w-3 h-3" />{s}
      </span>
    )
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
                    <div style={{ fontSize: '.8rem', color: '#64748B' }}>{s.label}</div>
                  </div>
                )
              })}
            </div>
            <div style={{ background: 'rgba(255,255,255,.95)', borderRadius: 16, padding: '1.5rem', border: '1px solid rgba(255,255,255,.5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>Recent Submissions</h3>
                <button onClick={() => setActive('submissions')} style={{ fontSize: '.8rem', color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>View All</button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(148,163,184,.2)', color: '#64748B', fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                      <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>ID</th>
                      <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>Student</th>
                      <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>Title</th>
                      <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>Status</th>
                      <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>Date</th>
                      <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {smartFilter(recentSubmissions, ['id', 'student', 'title', 'status', 'date'], 'status').map(r => (
                      <tr key={r.id} style={{ borderBottom: '1px solid rgba(148,163,184,.1)' }}>
                        <td style={{ padding: '.75rem 0', fontWeight: 600, color: '#2563EB' }}>{r.id}</td>
                        <td style={{ padding: '.75rem 0', color: '#0F172A' }}>{r.student}</td>
                        <td style={{ padding: '.75rem 0', color: '#334155', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.title}</td>
                        <td style={{ padding: '.75rem 0' }}>{statusBadge(r.status)}</td>
                        <td style={{ padding: '.75rem 0', color: '#64748B' }}>{r.date}</td>
                        <td style={{ padding: '.75rem 0' }}>
                          <div style={{ display: 'flex', gap: '.3rem' }}>
                            <button onClick={() => toast(`Viewing details for ${r.id}`, 'info')} style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid rgba(37,99,235,.2)', background: 'rgba(37,99,235,.06)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }} title="View"><Eye size={13} /></button>
                            <button onClick={() => toast(`${r.id} approved successfully!`, 'success')} style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid rgba(20,184,166,.2)', background: 'rgba(20,184,166,.06)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#14B8A6' }} title="Approve"><CheckCircle size={13} /></button>
                            <button onClick={() => toast(`${r.id} rejected.`, 'error')} style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid rgba(239,68,68,.2)', background: 'rgba(239,68,68,.06)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444' }} title="Reject"><XCircle size={13} /></button>
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
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}><Users size={18} /> User Management</h3>
                <button onClick={() => { setNewUser({ name: '', email: '', role: 'Student', password: '' }); setShowAddUser(true) }} style={{ fontSize: '.8rem', color: '#fff', background: '#2563EB', border: 'none', padding: '8px 16px', borderRadius: 10, cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}><UserPlus size={14} /> Add User</button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(148,163,184,.2)', color: '#64748B', fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                      <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>Name</th>
                      <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>Email</th>
                      <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>Role</th>
                      <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>Status</th>
                      <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>Papers</th>
                      <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {smartFilter(usersData, ['name', 'email', 'role', 'status'], 'status').map(u => (
                      <tr key={u.email} style={{ borderBottom: '1px solid rgba(148,163,184,.1)' }}>
                        <td style={{ padding: '.75rem 0', fontWeight: 600, color: '#0F172A' }}>{u.name}</td>
                        <td style={{ padding: '.75rem 0', color: '#64748B' }}>{u.email}</td>
                        <td style={{ padding: '.75rem 0' }}>
                          <span style={{ padding: '4px 10px', borderRadius: 20, fontSize: '.75rem', fontWeight: 600, background: u.role === 'Admin' ? 'rgba(239,68,68,.1)' : u.role === 'Reviewer' ? 'rgba(37,99,235,.1)' : 'rgba(20,184,166,.1)', color: u.role === 'Admin' ? '#EF4444' : u.role === 'Reviewer' ? '#2563EB' : '#14B8A6' }}>{u.role}</span>
                        </td>
                        <td style={{ padding: '.75rem 0' }}>{statusBadge(u.status)}</td>
                        <td style={{ padding: '.75rem 0', color: '#334155' }}>{u.papers}</td>
                        <td style={{ padding: '.75rem 0' }}>
                          <button onClick={() => toast(`Managing user: ${u.name}`, 'info')} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid rgba(148,163,184,.2)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}><MoreHorizontal size={15} /></button>
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
                    <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#0F172A' }}>Add New User</h3>
                    <button onClick={() => setShowAddUser(false)} style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'rgba(148,163,184,.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}><X size={16} /></button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: '#334155', marginBottom: 4 }}>Full Name</label>
                      <input value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} placeholder="e.g. Mohamed Ali" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(148,163,184,.3)', fontSize: '.85rem', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: '#334155', marginBottom: 4 }}>Email Address</label>
                      <input value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} placeholder="e.g. m.ali@du.edu.eg" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(148,163,184,.3)', fontSize: '.85rem', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: '#334155', marginBottom: 4 }}>Password</label>
                      <input type="password" value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} placeholder="••••••••" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(148,163,184,.3)', fontSize: '.85rem', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: '#334155', marginBottom: 4 }}>Role</label>
                      <select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })} style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(148,163,184,.3)', fontSize: '.85rem', outline: 'none', background: '#fff', boxSizing: 'border-box' }}>
                        <option>Student</option>
                        <option>Reviewer</option>
                        <option>Admin</option>
                      </select>
                    </div>
                  </div>
                  <button onClick={() => {
                    if (!newUser.name.trim() || !newUser.email.trim() || !newUser.password.trim()) { toast('Please fill all fields', 'error'); return }
                    setUsersData(prev => [...prev, { name: newUser.name.trim(), email: newUser.email.trim(), role: newUser.role, status: 'Active', papers: 0 }])
                    setShowAddUser(false)
                    toast(`${newUser.name} added successfully!`, 'success')
                  }} style={{ marginTop: '1.5rem', width: '100%', fontSize: '.85rem', color: '#fff', background: '#2563EB', border: 'none', padding: '12px', borderRadius: 12, cursor: 'pointer', fontWeight: 600 }}>Add User</button>
                </div>
              </div>
            )}
          </>
        )
      case 'submissions':
        return (
          <div style={{ background: 'rgba(255,255,255,.95)', borderRadius: 16, padding: '1.5rem', border: '1px solid rgba(255,255,255,.5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}><List size={18} /> All Submissions</h3>
              <div style={{ display: 'flex', gap: '.5rem' }}>
                <div style={{ position: 'relative' }}>
                  <Filter size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', pointerEvents: 'none' }} />
                  <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: '8px 12px 8px 30px', borderRadius: 10, border: '1px solid rgba(148,163,184,.2)', fontSize: '.8rem', background: 'rgba(255,255,255,.5)', color: '#334155', outline: 'none', appearance: 'none' }}>
                    <option>All Status</option>
                    <option>Approved</option>
                    <option>Pending</option>
                    <option>Under Review</option>
                    <option>Rejected</option>
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Confirmed</option>
                  </select>
                </div>
                <button style={{ fontSize: '.8rem', color: '#fff', background: '#2563EB', border: 'none', padding: '8px 16px', borderRadius: 10, cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}><Download size={14} /> Export</button>
              </div>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(148,163,184,.2)', color: '#64748B', fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>ID</th>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>Student</th>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>Title</th>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>Status</th>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>Date</th>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {smartFilter(recentSubmissions.concat(recentSubmissions), ['id', 'student', 'title', 'status', 'date'], 'status').slice(0, 8).map((r, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(148,163,184,.1)' }}>
                      <td style={{ padding: '.75rem 0', fontWeight: 600, color: '#2563EB' }}>{r.id}</td>
                      <td style={{ padding: '.75rem 0', color: '#0F172A' }}>{r.student}</td>
                      <td style={{ padding: '.75rem 0', color: '#334155' }}>{r.title}</td>
                      <td style={{ padding: '.75rem 0' }}>{statusBadge(r.status)}</td>
                      <td style={{ padding: '.75rem 0', color: '#64748B' }}>{r.date}</td>
                      <td style={{ padding: '.75rem 0' }}>
                        <div style={{ display: 'flex', gap: '.4rem' }}>
                          <button onClick={() => toast(`Viewing details for ${r.id}`, 'info')} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid rgba(37,99,235,.2)', background: 'rgba(37,99,235,.06)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB', transition: 'all .15s' }} title="View"><Eye size={15} /></button>
                          <button onClick={() => toast(`${r.title} approved!`, 'success')} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid rgba(20,184,166,.2)', background: 'rgba(20,184,166,.06)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#14B8A6', transition: 'all .15s' }} title="Approve"><CheckCircle size={15} /></button>
                          <button onClick={() => toast(`${r.title} rejected.`, 'error')} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid rgba(239,68,68,.2)', background: 'rgba(239,68,68,.06)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444', transition: 'all .15s' }} title="Reject"><XCircle size={15} /></button>
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
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}><Shield size={18} /> Blockchain Transactions</h3>
              <span style={{ fontSize: '.8rem', color: '#64748B', background: 'rgba(37,99,235,.1)', padding: '6px 12px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Activity size={14} /> Network: Ethereum Sepolia
              </span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(148,163,184,.2)', color: '#64748B', fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>Transaction Hash</th>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>Research</th>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>Timestamp</th>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>Block</th>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>Status</th>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>Explorer</th>
                  </tr>
                </thead>
                <tbody>
                  {smartFilter(blockchainRecords, ['tx', 'research', 'timestamp', 'block', 'status'], 'status').map(b => (
                    <tr key={b.tx} style={{ borderBottom: '1px solid rgba(148,163,184,.1)' }}>
                      <td style={{ padding: '.75rem 0', fontFamily: 'monospace', fontWeight: 600, color: '#2563EB', fontSize: '.8rem' }}>{b.tx}</td>
                      <td style={{ padding: '.75rem 0', color: '#0F172A' }}>{b.research}</td>
                      <td style={{ padding: '.75rem 0', color: '#64748B', fontSize: '.8rem' }}>{b.timestamp}</td>
                      <td style={{ padding: '.75rem 0', fontFamily: 'monospace', color: '#334155' }}>{b.block}</td>
                      <td style={{ padding: '.75rem 0' }}>{statusBadge(b.status)}</td>
                      <td style={{ padding: '.75rem 0' }}>
                        <button onClick={() => toast(`Viewing transaction ${b.tx}`)} style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(37,99,235,.2)', background: 'rgba(37,99,235,.06)', cursor: 'pointer', color: '#2563EB', fontSize: '.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Eye className="w-3.5 h-3.5" /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      case 'certificates':
        return (
          <div style={{ background: 'rgba(255,255,255,.95)', borderRadius: 16, padding: '1.5rem', border: '1px solid rgba(255,255,255,.5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}><Award size={18} /> Digital Certificates</h3>
              <button onClick={() => toast('Certificate issuance form opened', 'info')} style={{ fontSize: '.8rem', color: '#fff', background: '#2563EB', border: 'none', padding: '8px 16px', borderRadius: 10, cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}><Award size={14} /> Issue New</button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(148,163,184,.2)', color: '#64748B', fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>Certificate ID</th>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>Student</th>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>Research</th>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>Issued Date</th>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>QR Code</th>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {smartFilter(certData, ['id', 'student', 'research', 'issued', 'qr']).map(c => (
                    <tr key={c.id} style={{ borderBottom: '1px solid rgba(148,163,184,.1)' }}>
                      <td style={{ padding: '.75rem 0', fontWeight: 600, color: '#2563EB' }}>{c.id}</td>
                      <td style={{ padding: '.75rem 0', color: '#0F172A' }}>{c.student}</td>
                      <td style={{ padding: '.75rem 0', color: '#334155' }}>{c.research}</td>
                      <td style={{ padding: '.75rem 0', color: '#64748B' }}>{c.issued}</td>
                      <td style={{ padding: '.75rem 0' }}>
                        <span style={{ fontFamily: 'monospace', color: '#94A3B8', fontSize: '.75rem', background: 'rgba(0,0,0,.03)', padding: '4px 8px', borderRadius: 6 }}>{c.qr}</span>
                      </td>
                      <td style={{ padding: '.75rem 0' }}>
                        <div style={{ display: 'flex', gap: '.4rem' }}>
                          <button onClick={() => toast(`Viewing certificate ${c.id}`, 'info')} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid rgba(37,99,235,.2)', background: 'rgba(37,99,235,.06)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }}><Eye size={15} /></button>
                          <button onClick={() => toast(`Downloading ${c.id}`, 'success')} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid rgba(20,184,166,.2)', background: 'rgba(20,184,166,.06)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#14B8A6' }}><Download size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      case 'settings':
        const settingIcons: Record<string, any> = {
          'Maintenance Mode': Shield, 'Blockchain Network': Wifi,
          'Auto-Certificate Generation': Award, 'Storage Provider': HardDrive,
          'Max Upload Size': Upload, 'Notification Alerts': Bell,
        }
        return (
          <div style={{ background: 'rgba(255,255,255,.95)', borderRadius: 16, padding: '1.5rem', border: '1px solid rgba(255,255,255,.5)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 8 }}><Settings size={18} /> Platform Settings</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { label: 'Maintenance Mode', desc: 'Disable user access during maintenance', type: 'toggle' },
                { label: 'Blockchain Network', desc: 'Sepolia Testnet (Chain ID: 11155111)', type: 'info' },
                { label: 'Auto-Certificate Generation', desc: 'Automatically issue certificates upon approval', type: 'toggle' },
                { label: 'Storage Provider', desc: 'IPFS (InterPlanetary File System) — 98.2% Uptime', type: 'info' },
                { label: 'Max Upload Size', desc: '50 MB per research document', type: 'text' },
                { label: 'Notification Alerts', desc: 'Send email notifications for reviews and approvals', type: 'toggle' },
              ].map(s => {
                const Icon = settingIcons[s.label]
                const isOn = s.type === 'toggle' ? toggles[s.label as keyof typeof toggles] : false
                return (
                  <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,.4)', borderRadius: 12, border: '1px solid rgba(255,255,255,.3)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {Icon && <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(37,99,235,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }}><Icon size={16} /></div>}
                      <div>
                        <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '.9rem' }}>{s.label}</div>
                        <div style={{ fontSize: '.8rem', color: '#64748B', marginTop: 2 }}>{s.desc}</div>
                      </div>
                    </div>
                    {s.type === 'toggle' ? (
                      <div onClick={() => setToggles(prev => ({ ...prev, [s.label]: !prev[s.label as keyof typeof prev] }))} style={{ width: 44, height: 24, borderRadius: 12, background: isOn ? '#2563EB' : '#CBD5E1', cursor: 'pointer', position: 'relative', transition: 'background .2s' }}>
                        <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: isOn ? 22 : 2, boxShadow: '0 1px 3px rgba(0,0,0,.15)', transition: 'left .2s' }} />
                      </div>
                    ) : s.type === 'info' ? (
                      <span style={{ fontSize: '.8rem', color: '#2563EB', fontWeight: 500, background: 'rgba(37,99,235,.08)', padding: '6px 12px', borderRadius: 8 }}>{s.desc.split('—')[0].trim()}</span>
                    ) : (
                      <input value={uploadSize} onChange={e => setUploadSize(e.target.value)} style={{ width: 100, padding: '6px 10px', borderRadius: 8, border: '1px solid rgba(148,163,184,.2)', fontSize: '.8rem', textAlign: 'center', background: 'rgba(255,255,255,.5)' }} />
                    )}
                  </div>
                )
              })}
            </div>
            <button onClick={() => toast('Settings saved successfully!', 'success')} style={{ marginTop: '1.5rem', fontSize: '.85rem', color: '#fff', background: '#2563EB', border: 'none', padding: '10px 24px', borderRadius: 10, cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}><Save size={15} /> Save Changes</button>
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
          <a href="/" style={{ textDecoration: 'none', padding: '1.25rem', borderBottom: '1px solid rgba(148,163,184,.1)', display: 'flex', alignItems: 'center', gap: '.75rem', transition: 'opacity .2s' }} title="Back to Home">
            <img src="/img/logo.png" alt="" style={{ height: 32, borderRadius: 8 }} />
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: '.85rem' }}>IP Portal</div>
              <div style={{ color: '#14B8A6', fontSize: '.7rem' }}>Admin Panel</div>
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
                {item.label}
              </button>
            )
          })}
        </nav>
        <div style={{ padding: '.75rem', borderTop: '1px solid rgba(148,163,184,.1)', display: 'flex', flexDirection: 'column', gap: '.25rem' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '.75rem', padding: '.7rem .85rem', borderRadius: 12, fontSize: '.85rem', fontWeight: 500, color: '#94A3B8', textDecoration: 'none', width: '100%', transition: 'color .2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(148,163,184,.08)'; e.currentTarget.style.color = '#E2E8F0' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94A3B8' }}
          >
            <LayoutDashboard className="w-4 h-4" /> Home
          </a>
          <a href="/login" style={{ display: 'flex', alignItems: 'center', gap: '.75rem', padding: '.7rem .85rem', borderRadius: 12, cursor: 'pointer', fontSize: '.85rem', fontWeight: 500, color: '#EF4444', textDecoration: 'none', width: '100%' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,.1)'; e.currentTarget.style.color = '#EF4444' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#EF4444' }}
          >
            <LogOut className="w-4 h-4" /> Logout
          </a>
        </div>
      </aside>
      <main style={{ flex: 1, padding: '1.5rem 2rem', overflow: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid rgba(148,163,184,.2)', background: 'rgba(255,255,255,.5)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}>
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0F172A', margin: 0, textTransform: 'capitalize' }}>{active}</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <Search className="w-4 h-4" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              <input placeholder="Search anything..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ padding: '8px 12px 8px 36px', borderRadius: 10, border: '1px solid rgba(148,163,184,.2)', fontSize: '.8rem', width: 220, background: 'rgba(255,255,255,.5)', outline: 'none' }} />
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
