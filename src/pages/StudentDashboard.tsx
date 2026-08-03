import { useState } from 'react'
import {
  LayoutDashboard, FileText, Award, User, LogOut,
  Upload, Clock, CheckCircle, XCircle, AlertTriangle,
  Download, Eye, Menu, X, BookOpen, TrendingUp,
  Hash, Loader2, Camera, ZoomIn, ZoomOut
} from 'lucide-react'
import NotificationBell from '../components/NotificationBell'
import { toast } from '../components/Toast'
import { useI18n } from '../i18n'
const sidebarItems = [
  { key: 'overview', label: 'Overview', labelKey: 'student.overview', icon: LayoutDashboard },
  { key: 'my-research', label: 'My Research', labelKey: 'student.my_research', icon: FileText },
  { key: 'certificates', label: 'Certificates', labelKey: 'student.certificates', icon: Award },
  { key: 'profile', label: 'Profile', labelKey: 'student.profile', icon: User },
]

const researchData = [
  { id: 'RES-2026-001', title: 'Blockchain for Healthcare Data', status: 'Approved', date: '2026-07-24', hash: '0x7f8a...3b2c' },
  { id: 'RES-2026-002', title: 'AI-Based Crop Disease Detection', status: 'Pending', date: '2026-07-23', hash: '—' },
  { id: 'RES-2026-003', title: 'IoT Smart Grid Optimization', status: 'Under Review', date: '2026-07-22', hash: '—' },
]

const certData = [
  { id: 'CERT-2026-001', research: 'Blockchain for Healthcare Data', issued: '2026-07-24', expires: '2031-07-24' },
]

export default function StudentDashboard() {
  const { t } = useI18n()
  const [active, setActive] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [uploadTitle, setUploadTitle] = useState('')
  const [supervisor, setSupervisor] = useState('')
  const [keywords, setKeywords] = useState('')
  const [profileName, setProfileName] = useState('Ahmed Hassan')
  const [profileEmail, setProfileEmail] = useState('ahmed.hassan@stud.du.edu.eg')
  const [profileDept, setProfileDept] = useState('Computer Science')
  const [submissions, setSubmissions] = useState(researchData)
  const [fileName, setFileName] = useState('')
  const [viewingSubmission, setViewingSubmission] = useState<typeof researchData[0] | null>(null)
  const [profilePic, setProfilePic] = useState('')
  const [cropModal, setCropModal] = useState(false)
  const [cropImage, setCropImage] = useState('')
  const [cropZoom, setCropZoom] = useState(1)
  const [cropPos, setCropPos] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const statusKey: Record<string, string> = {
    Approved: 'student.status_approved',
    Pending: 'student.status_pending',
    'Under Review': 'student.status_under_review',
    Rejected: 'student.status_rejected',
  }
  const activeLabels: Record<string, string> = {
    overview: 'student.overview',
    'my-research': 'student.my_research',
    certificates: 'student.certificates',
    profile: 'student.profile',
  }

  const statusBadge = (s: string) => {
    const m: Record<string, { bg: string; color: string; icon: typeof CheckCircle }> = {
      Approved: { bg: 'rgba(20,184,166,.12)', color: '#14B8A6', icon: CheckCircle },
      Pending: { bg: 'rgba(245,158,11,.12)', color: '#F59E0B', icon: Clock },
      'Under Review': { bg: 'rgba(37,99,235,.12)', color: '#2563EB', icon: Loader2 },
      Rejected: { bg: 'rgba(239,68,68,.12)', color: '#EF4444', icon: XCircle },
    }
    const c = m[s] || { bg: 'rgba(148,163,184,.12)', color: '#94A3B8', icon: AlertTriangle }
    const Icon = c.icon
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 20, fontSize: '.75rem', fontWeight: 600, background: c.bg, color: c.color }}>
        <Icon size={12} />{t(statusKey[s] ?? s)}
      </span>
    )
  }

  const renderContent = () => {
    switch (active) {
      case 'overview':
        return (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
              {[
                { label: 'Total Submissions', labelKey: 'student.total_submissions', value: '3', icon: BookOpen, color: '#2563EB', bg: 'rgba(37,99,235,.12)' },
                { label: 'Approved', labelKey: 'student.approved', value: '1', icon: CheckCircle, color: '#14B8A6', bg: 'rgba(20,184,166,.12)' },
                { label: 'Pending Review', labelKey: 'student.pending_review', value: '2', icon: Clock, color: '#F59E0B', bg: 'rgba(245,158,11,.12)' },
                { label: 'Certificates', labelKey: 'student.certificates', value: '1', icon: Award, color: '#8B5CF6', bg: 'rgba(139,92,246,.12)' },
              ].map(s => {
                const Icon = s.icon
                return (
                  <div key={s.label} style={{ background: 'rgba(255,255,255,.95)', borderRadius: 16, padding: '1.5rem', border: '1px solid rgba(255,255,255,.5)', boxShadow: '0 4px 16px rgba(0,0,0,.04)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                      <Icon className="w-5 h-5" style={{ color: s.color }} />
                    </div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0F172A', marginBottom: '.25rem' }}>{s.value}</div>
                    <div style={{ fontSize: '.8rem', color: '#64748B' }}>{t(s.labelKey)}</div>
                  </div>
                )
              })}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div style={{ background: 'rgba(255,255,255,.95)', borderRadius: 16, padding: '1.5rem', border: '1px solid rgba(255,255,255,.5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>{t('student.recent_activity')}</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '.85rem' }}>
                  {[
                    { action: 'Research Submitted', actionKey: 'student.activity_submitted', desc: 'AI-Based Crop Disease Detection', time: '2 days ago', timeKey: 'student.activity_time_2d', icon: Upload, color: '#2563EB' },
                    { action: 'Certificate Issued', actionKey: 'student.activity_certificate_issued', desc: 'Blockchain for Healthcare Data', time: '3 days ago', timeKey: 'student.activity_time_3d', icon: Award, color: '#8B5CF6' },
                    { action: 'Status Update', actionKey: 'student.activity_status_update', descKey: 'student.activity_desc_iot', desc: 'IoT Research moved to Under Review', time: '5 days ago', timeKey: 'student.activity_time_5d', icon: TrendingUp, color: '#F59E0B' },
                  ].map((a, i) => {
                    const Icon = a.icon
                    return (
                      <div key={i} style={{ display: 'flex', gap: '.75rem', alignItems: 'flex-start' }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${a.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icon className="w-4 h-4" style={{ color: a.color }} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: '#0F172A', fontSize: '.85rem' }}>{t(a.actionKey)}</div>
                          <div style={{ color: '#64748B', fontSize: '.8rem' }}>{t(a.descKey ?? a.desc)}</div>
                          <div style={{ color: '#94A3B8', fontSize: '.75rem', marginTop: 2 }}>{t(a.timeKey)}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div style={{ background: 'linear-gradient(135deg,rgba(37,99,235,.08),rgba(20,184,166,.08))', borderRadius: 16, padding: '1.5rem', border: '1px solid rgba(37,99,235,.15)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(37,99,235,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <Upload className="w-7 h-7 text-primary" />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '.5rem' }}>{t('student.submit_new_research')}</h3>
                <p style={{ fontSize: '.85rem', color: '#64748B', marginBottom: '1.25rem', maxWidth: 260 }}>{t('student.upload_desc')}</p>
                <button onClick={() => { setActive('my-research'); setTimeout(() => document.querySelector('.upload-section')?.scrollIntoView({ behavior: 'smooth' }), 100) }} style={{ fontSize: '.85rem', color: '#fff', background: '#2563EB', border: 'none', padding: '10px 24px', borderRadius: 10, cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Upload className="w-4 h-4" /> {t('student.upload_project')}
                </button>
              </div>
            </div>
          </>
        )
      case 'my-research':
        return (
          <div style={{ background: 'rgba(255,255,255,.95)', borderRadius: 16, padding: '1.5rem', border: '1px solid rgba(255,255,255,.5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>{t('student.my_research_submissions')}</h3>
              <button onClick={() => { document.querySelector('.upload-section')?.scrollIntoView({ behavior: 'smooth' }); setTimeout(() => (document.querySelector('.upload-section input') as HTMLInputElement)?.focus(), 500) }} style={{ fontSize: '.8rem', color: '#fff', background: '#2563EB', border: 'none', padding: '8px 16px', borderRadius: 10, cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Upload className="w-4 h-4" /> {t('student.new_submission')}
              </button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(148,163,184,.2)', color: '#64748B', fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('student.id')}</th>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('student.title')}</th>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('student.status')}</th>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('student.date')}</th>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('student.blockchain_hash')}</th>
                    <th style={{ textAlign: 'left', padding: '0 0 .75rem' }}>{t('student.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map(r => (
                    <tr key={r.id} style={{ borderBottom: '1px solid rgba(148,163,184,.1)' }}>
                      <td style={{ padding: '.75rem 0', fontWeight: 600, color: '#2563EB' }}>{r.id}</td>
                      <td style={{ padding: '.75rem 0', color: '#0F172A', fontWeight: 500 }}>{r.title}</td>
                      <td style={{ padding: '.75rem 0' }}>{statusBadge(r.status)}</td>
                      <td style={{ padding: '.75rem 0', color: '#64748B' }}>{r.date}</td>
                      <td style={{ padding: '.75rem 0', fontFamily: 'monospace', fontSize: '.8rem', color: r.hash === '—' ? '#94A3B8' : '#2563EB' }}>{r.hash}</td>
                      <td style={{ padding: '.75rem 0' }}>
                        <div style={{ display: 'flex', gap: '.4rem' }}>
                          <button onClick={() => setViewingSubmission(r)} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid rgba(37,99,235,.2)', background: 'rgba(37,99,235,.06)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }}><Eye size={15} /></button>
                          <button onClick={() => { const a = document.createElement('a'); a.href = '#'; a.download = `${r.id}.pdf`; a.click() }} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid rgba(20,184,166,.2)', background: 'rgba(20,184,166,.06)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#14B8A6' }}><Download size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="upload-section" style={{ marginTop: '2rem', padding: '1.25rem', background: 'rgba(37,99,235,.05)', borderRadius: 12, border: '1px dashed rgba(37,99,235,.2)' }}>
              <h4 style={{ fontSize: '.9rem', fontWeight: 700, color: '#0F172A', marginBottom: '.75rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Upload className="w-4 h-4 text-primary" /> {t('student.upload_new_research')}
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <input value={uploadTitle} onChange={e => setUploadTitle(e.target.value)} placeholder={t('student.ph_research_title')} style={{ padding: '.7rem 1rem', borderRadius: 10, border: '1.5px solid rgba(148,163,184,.2)', fontSize: '.85rem', outline: 'none', background: 'rgba(255,255,255,.5)' }} />
                <input value={supervisor} onChange={e => setSupervisor(e.target.value)} placeholder={t('student.ph_supervisor_name')} style={{ padding: '.7rem 1rem', borderRadius: 10, border: '1.5px solid rgba(148,163,184,.2)', fontSize: '.85rem', outline: 'none', background: 'rgba(255,255,255,.5)' }} />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <input value={keywords} onChange={e => setKeywords(e.target.value)} placeholder={t('student.ph_keywords')} style={{ flex: 1, padding: '.7rem 1rem', borderRadius: 10, border: '1.5px solid rgba(148,163,184,.2)', fontSize: '.85rem', outline: 'none', background: 'rgba(255,255,255,.5)' }} />
                <label style={{ padding: '.7rem 1.5rem', borderRadius: 10, border: '1.5px dashed rgba(37,99,235,.3)', fontSize: '.85rem', color: '#2563EB', cursor: 'pointer', background: 'rgba(37,99,235,.05)', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500, whiteSpace: 'nowrap' }}>
                  <Upload className="w-4 h-4" /> {fileName || t('student.choose_file')}
                  <input type="file" accept=".pdf" style={{ display: 'none' }} onChange={e => { setFileName(e.target.files?.[0]?.name || '') }} />
                </label>
              </div>
              <button onClick={() => {
                if (!uploadTitle.trim() || !supervisor.trim()) { toast(t('student.toast_fill_fields'), 'error'); return }
                const newId = `RES-2026-${String(submissions.length + 1).padStart(3, '0')}`
                setSubmissions(prev => [...prev, { id: newId, title: uploadTitle.trim(), status: 'Pending', date: new Date().toISOString().slice(0, 10), hash: '—' }])
                toast(`"${uploadTitle}" ${t('student.toast_submitted')}`, 'success')
                setUploadTitle(''); setSupervisor(''); setKeywords(''); setFileName('')
              }} style={{ fontSize: '.85rem', color: '#fff', background: '#2563EB', border: 'none', padding: '10px 24px', borderRadius: 10, cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Hash className="w-4 h-4" /> {t('student.submit_generate_hash')}
              </button>
            </div>
          </div>
        )
      case 'certificates':
        return (
          <div style={{ background: 'rgba(255,255,255,.95)', borderRadius: 16, padding: '1.5rem', border: '1px solid rgba(255,255,255,.5)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '1.25rem' }}>{t('student.my_certificates')}</h3>
            {certData.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94A3B8' }}>
                <Award className="w-12 h-12" style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
                <p>{t('student.no_certificates')}</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {certData.map(c => (
                  <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem', background: 'rgba(255,255,255,.4)', borderRadius: 12, border: '1px solid rgba(255,255,255,.3)' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(139,92,246,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Award className="w-5 h-5" style={{ color: '#8B5CF6' }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '.9rem' }}>{c.research}</div>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: 4, fontSize: '.8rem', color: '#64748B' }}>
                          <span>{t('student.id')}: {c.id}</span>
                          <span>{t('student.issued')}: {c.issued}</span>
                          <span>{t('student.expires')}: {c.expires}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '.5rem' }}>
                      <button onClick={() => window.open(`/certificate/${c.id}`, '_blank')} style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid rgba(37,99,235,.2)', background: 'rgba(37,99,235,.06)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }}>
                        <Eye size={16} />
                      </button>
                      <button onClick={() => { const a = document.createElement('a'); a.href = '#'; a.download = `${c.id}.pdf`; a.click() }} style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid rgba(20,184,166,.2)', background: 'rgba(20,184,166,.06)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#14B8A6' }}>
                        <Download size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      case 'profile':
        return (
          <div style={{ background: 'rgba(255,255,255,.95)', borderRadius: 16, padding: '1.5rem', border: '1px solid rgba(255,255,255,.5)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '1.5rem' }}>{t('student.profile_settings')}</h3>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
              <div onClick={() => document.getElementById('pic-input')?.click()} style={{ width: 100, height: 100, borderRadius: 20, background: profilePic ? 'transparent' : 'linear-gradient(135deg,#2563EB,#14B8A6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '2rem', fontWeight: 700, flexShrink: 0, cursor: 'pointer', overflow: 'hidden', position: 'relative', border: '2px dashed rgba(37,99,235,.3)' }}>
                {profilePic ? <img src={profilePic} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 18 }} /> : 'AH'}
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.3)', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity .2s' }} onMouseEnter={e => e.currentTarget.style.opacity = '1'} onMouseLeave={e => e.currentTarget.style.opacity = '0'}>
                  <Camera size={20} />
                </div>
                <input id="pic-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) { const r = new FileReader(); r.onload = () => { setCropImage(r.result as string); setCropZoom(1); setCropPos({ x: 0, y: 0 }); setCropModal(true) }; r.readAsDataURL(f) } e.target.value = '' }} />
              </div>
              <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '.75rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '.05em', display: 'block', marginBottom: 4 }}>{t('student.full_name')}</label>
                  <input value={profileName} onChange={e => setProfileName(e.target.value)} style={{ width: '100%', padding: '.7rem 1rem', borderRadius: 10, border: '1.5px solid rgba(148,163,184,.2)', fontSize: '.85rem', outline: 'none', background: 'rgba(255,255,255,.5)' }} />
                </div>
                <div>
                  <label style={{ fontSize: '.75rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '.05em', display: 'block', marginBottom: 4 }}>{t('student.email')}</label>
                  <input value={profileEmail} onChange={e => setProfileEmail(e.target.value)} style={{ width: '100%', padding: '.7rem 1rem', borderRadius: 10, border: '1.5px solid rgba(148,163,184,.2)', fontSize: '.85rem', outline: 'none', background: 'rgba(255,255,255,.5)' }} />
                </div>
                <div>
                  <label style={{ fontSize: '.75rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '.05em', display: 'block', marginBottom: 4 }}>{t('student.student_id')}</label>
                  <input defaultValue="STU-2024-0891" disabled style={{ width: '100%', padding: '.7rem 1rem', borderRadius: 10, border: '1.5px solid rgba(148,163,184,.2)', fontSize: '.85rem', outline: 'none', background: 'rgba(148,163,184,.08)', color: '#94A3B8' }} />
                </div>
                <div>
                  <label style={{ fontSize: '.75rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '.05em', display: 'block', marginBottom: 4 }}>{t('student.department')}</label>
                  <input value={profileDept} onChange={e => setProfileDept(e.target.value)} style={{ width: '100%', padding: '.7rem 1rem', borderRadius: 10, border: '1.5px solid rgba(148,163,184,.2)', fontSize: '.85rem', outline: 'none', background: 'rgba(255,255,255,.5)' }} />
                </div>
              </div>
            </div>
            <button onClick={() => { if (!profileName.trim() || !profileEmail.trim()) { toast(t('student.toast_name_email_required'), 'error'); return }; toast(t('student.toast_profile_updated'), 'success') }} style={{ marginTop: '1.5rem', fontSize: '.85rem', color: '#fff', background: '#2563EB', border: 'none', padding: '10px 24px', borderRadius: 10, cursor: 'pointer', fontWeight: 600 }}>{t('student.update_profile')}</button>
          </div>
        )
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <aside style={{
        width: sidebarOpen ? 220 : 0,
        overflow: 'hidden',
        background: 'rgba(255,255,255,.95)',
        transition: 'width .3s ease',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid rgba(148,163,184,.15)',
        position: 'sticky',
        top: 0,
        height: '100vh',
      }}>
        <a href="/" style={{ textDecoration: 'none', padding: '1.25rem', borderBottom: '1px solid rgba(148,163,184,.1)', display: 'flex', alignItems: 'center', gap: '.75rem' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#2563EB,#14B8A6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '.8rem', fontWeight: 700 }}>AH</div>
          <div>
            <div style={{ color: '#0F172A', fontWeight: 700, fontSize: '.85rem' }}>Ahmed Hassan</div>
            <div style={{ color: '#64748B', fontSize: '.7rem' }}>{t('student.role_student')}</div>
          </div>
        </a>
        <nav style={{ flex: 1, padding: '.75rem', display: 'flex', flexDirection: 'column', gap: '.25rem' }}>
          {sidebarItems.map(item => {
            const Icon = item.icon
            return (
              <button key={item.key} onClick={() => setActive(item.key)} style={{
                display: 'flex', alignItems: 'center', gap: '.75rem', padding: '.7rem .85rem',
                borderRadius: 12, border: 'none', cursor: 'pointer', fontSize: '.85rem', fontWeight: 500,
                background: active === item.key ? 'rgba(37,99,235,.1)' : 'transparent',
                color: active === item.key ? '#2563EB' : '#475569',
                transition: 'all .2s', textAlign: 'left', width: '100%',
              }}
                onMouseEnter={e => { if (active !== item.key) { e.currentTarget.style.background = 'rgba(148,163,184,.08)'; e.currentTarget.style.color = '#0F172A' } }}
                onMouseLeave={e => { if (active !== item.key) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#475569' } }}
              >
                <Icon className="w-4 h-4" />
                {t(item.labelKey)}
              </button>
            )
          })}
        </nav>
        <div style={{ padding: '.75rem', borderTop: '1px solid rgba(148,163,184,.1)', display: 'flex', flexDirection: 'column', gap: '.25rem' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '.75rem', padding: '.7rem .85rem', borderRadius: 12, cursor: 'pointer', fontSize: '.85rem', fontWeight: 500, color: '#2563EB', background: 'transparent', width: '100%', textAlign: 'left', textDecoration: 'none' }}>
            <LayoutDashboard className="w-4 h-4" /> {t('student.home')}
          </a>
          <a href="/login" style={{ display: 'flex', alignItems: 'center', gap: '.75rem', padding: '.7rem .85rem', borderRadius: 12, cursor: 'pointer', fontSize: '.85rem', fontWeight: 500, color: '#EF4444', background: 'transparent', width: '100%', textAlign: 'left', textDecoration: 'none' }}>
            <LogOut className="w-4 h-4" /> {t('student.logout')}
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
            <NotificationBell user="student" />
          </div>
        </div>
        {renderContent()}
      </main>

      {cropModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 24, padding: '1.5rem', width: 420, maxWidth: '90vw', boxShadow: '0 25px 60px rgba(0,0,0,.4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#0F172A' }}>{t('student.crop_title')}</h3>
              <button onClick={() => setCropModal(false)} style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'rgba(148,163,184,.1)', cursor: 'pointer' }}><X size={16} /></button>
            </div>
            <p style={{ fontSize: '.8rem', color: '#64748B', marginBottom: '1rem' }}>{t('student.crop_help')}</p>
            <div style={{ width: 280, height: 280, borderRadius: '50%', overflow: 'hidden', margin: '0 auto 1rem', position: 'relative', border: '3px solid #2563EB', background: '#f1f5f9' }}
              onMouseDown={e => { setDragging(true); setDragStart({ x: e.clientX - cropPos.x, y: e.clientY - cropPos.y }) }}
              onMouseMove={e => { if (dragging) setCropPos({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y }) }}
              onMouseUp={() => setDragging(false)}
              onMouseLeave={() => setDragging(false)}
            >
              <img src={cropImage} alt="" draggable={false} style={{ position: 'absolute', left: '50%', top: '50%', transform: `translate(calc(-50% + ${cropPos.x}px), calc(-50% + ${cropPos.y}px)) scale(${cropZoom})`, maxWidth: 'none', width: '100%', height: 'auto', cursor: dragging ? 'grabbing' : 'grab', userSelect: 'none' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', justifyContent: 'center', marginBottom: '1rem' }}>
              <button onClick={() => setCropZoom(z => Math.max(0.5, z - 0.2))} style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid rgba(148,163,184,.2)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569' }}><ZoomOut size={16} /></button>
              <input type="range" min={0.5} max={3} step={0.05} value={cropZoom} onChange={e => setCropZoom(Number(e.target.value))} style={{ width: 160, accentColor: '#2563EB' }} />
              <button onClick={() => setCropZoom(z => Math.min(5, z + 0.2))} style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid rgba(148,163,184,.2)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569' }}><ZoomIn size={16} /></button>
            </div>
            <div style={{ display: 'flex', gap: '.5rem' }}>
              <button onClick={() => setCropModal(false)} style={{ flex: 1, fontSize: '.85rem', color: '#64748B', background: 'rgba(148,163,184,.1)', border: 'none', padding: '10px', borderRadius: 10, cursor: 'pointer', fontWeight: 600 }}>{t('student.cancel')}</button>
              <button onClick={() => { setProfilePic(cropImage); setCropModal(false); toast(t('student.toast_pic_updated'), 'success') }} style={{ flex: 1, fontSize: '.85rem', color: '#fff', background: '#2563EB', border: 'none', padding: '10px', borderRadius: 10, cursor: 'pointer', fontWeight: 600 }}>{t('student.save')}</button>
            </div>
          </div>
        </div>
      )}

      {viewingSubmission && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setViewingSubmission(null)}>
          <div style={{ background: '#fff', borderRadius: 20, padding: '2rem', width: 480, maxWidth: '90vw', boxShadow: '0 25px 60px rgba(0,0,0,.3)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#0F172A' }}>{t('student.submission_details')}</h3>
              <button onClick={() => setViewingSubmission(null)} style={{ width: 32, height: 32, borderRadius: 8, border: 'none', background: 'rgba(148,163,184,.1)', cursor: 'pointer' }}><X size={16} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.85rem' }}>
              {[
                { label: 'ID', labelKey: 'student.id', value: viewingSubmission.id },
                { label: 'Title', labelKey: 'student.title', value: viewingSubmission.title },
                { label: 'Status', labelKey: 'student.status', value: viewingSubmission.status },
                { label: 'Submitted', labelKey: 'student.submitted', value: viewingSubmission.date },
                { label: 'Blockchain Hash', labelKey: 'student.blockchain_hash', value: viewingSubmission.hash },
              ].map(f => (
                <div key={f.label}>
                  <div style={{ fontSize: '.7rem', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 2 }}>{t(f.labelKey)}</div>
                  <div style={{ fontSize: '.9rem', fontWeight: 500, color: '#0F172A' }}>{t(statusKey[f.value] ?? f.value)}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '.5rem', marginTop: '1.5rem' }}>
              <button onClick={() => setViewingSubmission(null)} style={{ flex: 1, fontSize: '.85rem', color: '#2563EB', background: 'rgba(37,99,235,.08)', border: 'none', padding: '10px', borderRadius: 10, cursor: 'pointer', fontWeight: 600 }}>{t('student.close')}</button>
              <button onClick={() => { const a = document.createElement('a'); a.href = '#'; a.download = `${viewingSubmission.id}.pdf`; a.click(); setViewingSubmission(null) }} style={{ flex: 1, fontSize: '.85rem', color: '#fff', background: '#2563EB', border: 'none', padding: '10px', borderRadius: 10, cursor: 'pointer', fontWeight: 600 }}>{t('student.download')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
