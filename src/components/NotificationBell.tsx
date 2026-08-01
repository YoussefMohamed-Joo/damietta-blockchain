import { useState, useEffect } from 'react'
import { Bell, X, ExternalLink, Calendar, User, Hash, Tag } from 'lucide-react'

interface Notif {
  id: number
  type: string
  text: string
  time: string
  read: boolean
  from: { name: string; role: string }
  relatedId: string
  title: string
  description: string
  actionUrl: string
  metadata: Record<string, any>
}

const typeColors: Record<string, string> = {
  submission: '#2563EB', certificate: '#14B8A6', review: '#F59E0B',
  registration: '#8B5CF6', approval: '#10B981', assignment: '#3B82F6',
  comment: '#F97316', alert: '#EF4444', update: '#6366F1', deadline: '#EC4899',
}

const adminNotifs: Notif[] = [
  {
    id: 1, type: 'submission', text: 'New research submission from Ahmed Hassan', time: '2 min ago', read: false,
    from: { name: 'Ahmed Hassan', role: 'Student' }, relatedId: 'RES-2026-001',
    title: 'Blockchain for Healthcare Data',
    description: 'A new research paper has been submitted and is pending review by the committee. The paper proposes a blockchain-based solution for secure healthcare data management.',
    actionUrl: '/admin', metadata: { faculty: 'Computer Science', year: '2026', supervisor: 'Dr. Khaled' }
  },
  {
    id: 2, type: 'certificate', text: 'Certificate issued for RES-2026-001', time: '15 min ago', read: false,
    from: { name: 'System', role: 'Automatic' }, relatedId: 'CERT-2026-001',
    title: 'IP Protection Certificate',
    description: 'A blockchain-secured IP certificate has been generated and issued for the research "Blockchain for Healthcare Data". The certificate includes a QR code for instant verification.',
    actionUrl: '/admin', metadata: { issuedDate: '2026-07-26', expiresDate: '2031-07-26', blockchainHash: '0x7f8a...3b2c' }
  },
  {
    id: 3, type: 'review', text: 'Review completed by Dr. Mohamed', time: '1 hr ago', read: false,
    from: { name: 'Dr. Mohamed', role: 'Reviewer' }, relatedId: 'RES-2026-002',
    title: 'AI-Based Crop Disease Detection',
    description: 'Dr. Mohamed has completed the review for research "AI-Based Crop Disease Detection". The review included feedback on methodology, results, and recommendations for improvement.',
    actionUrl: '/admin/reviews', metadata: { verdict: 'Approved with minor revisions', score: '4.2/5', duration: '3 days' }
  },
  {
    id: 4, type: 'registration', text: 'New student registered: Mariam Ali', time: '3 hr ago', read: false,
    from: { name: 'Mariam Ali', role: 'Student' }, relatedId: 'STU-2026-045',
    title: 'New Account Registration',
    description: 'A new student has registered on the Damietta IP Portal. Their account is now active and ready to submit research projects.',
    actionUrl: '/admin', metadata: { faculty: 'Engineering', department: 'Electronics', studentId: '2026045' }
  },
]

const studentNotifs: Notif[] = [
  {
    id: 5, type: 'approval', text: 'Your research RES-2026-001 has been approved', time: '10 min ago', read: false,
    from: { name: 'Review Committee', role: 'Committee' }, relatedId: 'RES-2026-001',
    title: 'Blockchain for Healthcare Data',
    description: 'Congratulations! Your research has been approved by the review committee. A blockchain hash has been generated and your IP certificate is ready for download.',
    actionUrl: '/dashboard', metadata: { approvedBy: 'Dr. Khaled, Dr. Ali', hash: '0x7f8a...3b2c', certificateId: 'CERT-2026-001' }
  },
  {
    id: 6, type: 'certificate', text: 'Certificate CERT-2026-001 is ready', time: '1 hr ago', read: false,
    from: { name: 'System', role: 'Automatic' }, relatedId: 'CERT-2026-001',
    title: 'IP Protection Certificate',
    description: 'Your blockchain-secured IP certificate is now available for download. It includes a unique QR code that anyone can scan to verify authenticity.',
    actionUrl: '/dashboard', metadata: { issuedDate: '2026-07-26', format: 'PDF + QR' }
  },
]

const reviewerNotifs: Notif[] = [
  {
    id: 7, type: 'assignment', text: 'New submission assigned for review', time: '5 min ago', read: false,
    from: { name: 'System', role: 'Automatic' }, relatedId: 'RES-2026-003',
    title: 'IoT Smart Grid Optimization',
    description: 'A new research has been assigned to you for review. Please evaluate the methodology, results, and provide your recommendation within the specified deadline.',
    actionUrl: '/admin/reviews', metadata: { deadline: '2026-08-02', priority: 'High', submittedBy: 'Omar Youssef' }
  },
  {
    id: 8, type: 'comment', text: 'Dr. Ali commented on RES-2026-002', time: '30 min ago', read: false,
    from: { name: 'Dr. Ali', role: 'Reviewer' }, relatedId: 'RES-2026-002',
    title: 'AI-Based Crop Disease Detection',
    description: 'Dr. Ali has left a comment on the research review. The comment requires your attention before final approval can be granted.',
    actionUrl: '/admin/reviews', metadata: { comment: 'Please check the dataset size in section 3.2', requiresAction: true }
  },
]

const allData: Record<string, Notif[]> = {
  admin: adminNotifs,
  student: studentNotifs,
  reviewer: reviewerNotifs,
}

export default function NotificationBell({ user }: { user: 'admin' | 'student' | 'reviewer' }) {
  const [notifs, setNotifs] = useState<Notif[]>([])
  const [open, setOpen] = useState(false)
  const [detail, setDetail] = useState<Notif | null>(null)

  useEffect(() => {
    setNotifs(allData[user])
  }, [user])

  const count = notifs.filter(n => !n.read).length

  const markRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })))
    setOpen(false)
  }

  const openDetail = (n: Notif) => {
    setOpen(false)
    setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))
    setDetail(n)
  }

  return (
    <>
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => { if (open) { markRead(); setDetail(null) } else setOpen(true) }}
          style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid rgba(148,163,184,.2)', background: 'rgba(255,255,255,.5)', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}
        >
          <Bell className="w-4 h-4" />
          {count > 0 && (
            <span style={{ position: 'absolute', top: 4, right: 4, minWidth: 16, height: 16, borderRadius: 8, background: '#EF4444', color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px', boxShadow: '0 2px 4px rgba(239,68,68,.4)' }}>
              {count}
            </span>
          )}
        </button>

        {open && (
          <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: 380, background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 20px 60px rgba(15,23,42,.15)', overflow: 'hidden', zIndex: 100 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>Notifications</span>
              <button onClick={markRead} style={{ fontSize: 11, color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Mark all read</button>
            </div>
            <div style={{ maxHeight: 360, overflow: 'auto' }}>
              {notifs.length === 0 && (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#94A3B8', fontSize: 13 }}>No notifications</div>
              )}
              {notifs.map(n => (
                <div key={n.id} onClick={() => openDetail(n)} style={{ cursor: 'pointer', display: 'flex', gap: 12, padding: '12px 16px', borderBottom: '1px solid #f8fafc', background: n.read ? '#fff' : '#EFF6FF', transition: 'background .15s' }}
                  onMouseEnter={e => { if (n.read) e.currentTarget.style.background = '#F8FAFC' }}
                  onMouseLeave={e => { if (n.read) e.currentTarget.style.background = '#fff' }}
                >
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: `${typeColors[n.type] || '#94A3B8'}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: typeColors[n.type] || '#94A3B8' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, color: '#1E293B', margin: 0, lineHeight: 1.5, fontWeight: n.read ? 400 : 600 }}>{n.text}</p>
                    <span style={{ fontSize: 11, color: '#94A3B8', marginTop: 4, display: 'block' }}>{n.time}</span>
                  </div>
                  {!n.read && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#2563EB', flexShrink: 0, marginTop: 6 }} />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {detail && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '1rem' }} onClick={() => setDetail(null)}>
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 520, maxHeight: '80vh', overflow: 'auto', boxShadow: '0 40px 80px rgba(15,23,42,.2)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: typeColors[detail.type] || '#94A3B8' }} />
                <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', textTransform: 'capitalize' }}>{detail.type} Notification</span>
              </div>
              <button onClick={() => setDetail(null)} style={{ width: 30, height: 30, borderRadius: 8, border: 'none', background: '#F1F5F9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}>
                <X size={15} />
              </button>
            </div>

            <div style={{ padding: '20px' }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', margin: '0 0 4px' }}>{detail.title}</h3>
              <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 20px', lineHeight: 1.7 }}>{detail.description}</p>

              <div style={{ background: '#F8FAFC', borderRadius: 12, padding: '16px', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <User size={15} style={{ color: '#94A3B8', flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: '#475569' }}><strong>From:</strong> {detail.from.name} ({detail.from.role})</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Hash size={15} style={{ color: '#94A3B8', flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: '#475569' }}><strong>Reference:</strong> {detail.relatedId}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Calendar size={15} style={{ color: '#94A3B8', flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: '#475569' }}><strong>Time:</strong> {detail.time}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Tag size={15} style={{ color: '#94A3B8', flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: '#475569' }}><strong>Type:</strong> {detail.type}</span>
                </div>
              </div>

              {Object.keys(detail.metadata).length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <h4 style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '.05em', margin: '0 0 10px' }}>Additional Details</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {Object.entries(detail.metadata).map(([key, val]) => (
                      <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f1f5f9', fontSize: 13 }}>
                        <span style={{ color: '#64748B', textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span style={{ color: '#0F172A', fontWeight: 600 }}>{String(val)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => { setDetail(null); window.location.href = detail.actionUrl }}
                style={{ width: '100%', padding: '10px', background: '#2563EB', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              >
                <ExternalLink size={14} />
                View Details
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
