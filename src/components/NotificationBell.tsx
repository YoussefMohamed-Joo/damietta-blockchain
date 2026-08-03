import { useState, useEffect } from 'react'
import { Bell, X, ExternalLink, Calendar, User, Hash, Tag } from 'lucide-react'
import { useI18n } from '../i18n'

interface Notif {
  id: number
  type: string
  textKey: string
  timeKey: string
  read: boolean
  from: { name: string; roleKey: string }
  relatedId: string
  titleKey?: string
  title: string
  descriptionKey: string
  actionUrl: string
  metadata: Record<string, any>
}

const typeColors: Record<string, string> = {
  submission: '#2563EB', certificate: '#14B8A6', review: '#F59E0B',
  registration: '#8B5CF6', approval: '#10B981', assignment: '#3B82F6',
  comment: '#F97316', alert: '#EF4444', update: '#6366F1', deadline: '#EC4899',
}

const typeKeys: Record<string, string> = {
  submission: 'admin.notif_type_submission',
  certificate: 'admin.notif_type_certificate',
  review: 'admin.notif_type_review',
  registration: 'admin.notif_type_registration',
  approval: 'admin.notif_type_approval',
  assignment: 'admin.notif_type_assignment',
  comment: 'admin.notif_type_comment',
}

const metaLabels: Record<string, string> = {
  faculty: 'admin.meta_faculty',
  year: 'admin.meta_year',
  supervisor: 'admin.meta_supervisor',
  issuedDate: 'admin.meta_issued_date',
  expiresDate: 'admin.meta_expires_date',
  blockchainHash: 'admin.meta_blockchain_hash',
  verdict: 'admin.meta_verdict',
  score: 'admin.meta_score',
  duration: 'admin.meta_duration',
  department: 'admin.meta_department',
  studentId: 'admin.meta_student_id',
  approvedBy: 'admin.meta_approved_by',
  hash: 'admin.meta_hash',
  certificateId: 'admin.meta_certificate_id',
  format: 'admin.meta_format',
  deadline: 'admin.meta_deadline',
  priority: 'admin.meta_priority',
  submittedBy: 'admin.meta_submitted_by',
  comment: 'admin.meta_comment',
  requiresAction: 'admin.meta_requires_action',
}

const adminNotifs: Notif[] = [
  {
    id: 1, type: 'submission', textKey: 'admin.notif_admin1_text', timeKey: 'admin.notif_time_2min', read: false,
    from: { name: 'Ahmed Hassan', roleKey: 'admin.role_student' }, relatedId: 'RES-2026-001',
    title: 'Blockchain for Healthcare Data',
    descriptionKey: 'admin.notif_admin1_desc',
    actionUrl: '/admin', metadata: { faculty: 'Computer Science', year: '2026', supervisor: 'Dr. Khaled' }
  },
  {
    id: 2, type: 'certificate', textKey: 'admin.notif_admin2_text', timeKey: 'admin.notif_time_15min', read: false,
    from: { name: 'System', roleKey: 'admin.role_automatic' }, relatedId: 'CERT-2026-001',
    titleKey: 'admin.notif_cert_title', title: 'IP Protection Certificate',
    descriptionKey: 'admin.notif_admin2_desc',
    actionUrl: '/admin', metadata: { issuedDate: '2026-07-26', expiresDate: '2031-07-26', blockchainHash: '0x7f8a...3b2c' }
  },
  {
    id: 3, type: 'review', textKey: 'admin.notif_admin3_text', timeKey: 'admin.notif_time_1hr', read: false,
    from: { name: 'Dr. Mohamed', roleKey: 'admin.role_reviewer' }, relatedId: 'RES-2026-002',
    title: 'AI-Based Crop Disease Detection',
    descriptionKey: 'admin.notif_admin3_desc',
    actionUrl: '/admin/reviews', metadata: { verdict: 'admin.meta_verdict_approved_revisions', score: '4.2/5', duration: 'admin.meta_duration_3days' }
  },
  {
    id: 4, type: 'registration', textKey: 'admin.notif_admin4_text', timeKey: 'admin.notif_time_3hr', read: false,
    from: { name: 'Mariam Ali', roleKey: 'admin.role_student' }, relatedId: 'STU-2026-045',
    titleKey: 'admin.notif_registration_title', title: 'New Account Registration',
    descriptionKey: 'admin.notif_admin4_desc',
    actionUrl: '/admin', metadata: { faculty: 'Engineering', department: 'Electronics', studentId: '2026045' }
  },
]

const studentNotifs: Notif[] = [
  {
    id: 5, type: 'approval', textKey: 'admin.notif_student1_text', timeKey: 'admin.notif_time_10min', read: false,
    from: { name: 'Review Committee', roleKey: 'admin.role_committee' }, relatedId: 'RES-2026-001',
    title: 'Blockchain for Healthcare Data',
    descriptionKey: 'admin.notif_student1_desc',
    actionUrl: '/dashboard', metadata: { approvedBy: 'Dr. Khaled, Dr. Ali', hash: '0x7f8a...3b2c', certificateId: 'CERT-2026-001' }
  },
  {
    id: 6, type: 'certificate', textKey: 'admin.notif_student2_text', timeKey: 'admin.notif_time_1hr', read: false,
    from: { name: 'System', roleKey: 'admin.role_automatic' }, relatedId: 'CERT-2026-001',
    titleKey: 'admin.notif_cert_title', title: 'IP Protection Certificate',
    descriptionKey: 'admin.notif_student2_desc',
    actionUrl: '/dashboard', metadata: { issuedDate: '2026-07-26', format: 'admin.meta_format_pdf_qr' }
  },
]

const reviewerNotifs: Notif[] = [
  {
    id: 7, type: 'assignment', textKey: 'admin.notif_reviewer1_text', timeKey: 'admin.notif_time_5min', read: false,
    from: { name: 'System', roleKey: 'admin.role_automatic' }, relatedId: 'RES-2026-003',
    title: 'IoT Smart Grid Optimization',
    descriptionKey: 'admin.notif_reviewer1_desc',
    actionUrl: '/admin/reviews', metadata: { deadline: '2026-08-02', priority: 'admin.meta_priority_high', submittedBy: 'Omar Youssef' }
  },
  {
    id: 8, type: 'comment', textKey: 'admin.notif_reviewer2_text', timeKey: 'admin.notif_time_30min', read: false,
    from: { name: 'Dr. Ali', roleKey: 'admin.role_reviewer' }, relatedId: 'RES-2026-002',
    title: 'AI-Based Crop Disease Detection',
    descriptionKey: 'admin.notif_reviewer2_desc',
    actionUrl: '/admin/reviews', metadata: { comment: 'admin.meta_comment_dataset', requiresAction: 'admin.meta_requires_action_yes' }
  },
]

const allData: Record<string, Notif[]> = {
  admin: adminNotifs,
  student: studentNotifs,
  reviewer: reviewerNotifs,
}

export default function NotificationBell({ user }: { user: 'admin' | 'student' | 'reviewer' }) {
  const { t } = useI18n()
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
              <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{t('admin.notifications')}</span>
              <button onClick={markRead} style={{ fontSize: 11, color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>{t('admin.mark_all_read')}</button>
            </div>
            <div style={{ maxHeight: 360, overflow: 'auto' }}>
              {notifs.length === 0 && (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#94A3B8', fontSize: 13 }}>{t('admin.no_notifications')}</div>
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
                    <p style={{ fontSize: 13, color: '#1E293B', margin: 0, lineHeight: 1.5, fontWeight: n.read ? 400 : 600 }}>{t(n.textKey)}</p>
                    <span style={{ fontSize: 11, color: '#94A3B8', marginTop: 4, display: 'block' }}>{t(n.timeKey)}</span>
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
                <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', textTransform: 'capitalize' }}>{t(typeKeys[detail.type] ?? detail.type)} {t('admin.notification')}</span>
              </div>
              <button onClick={() => setDetail(null)} style={{ width: 30, height: 30, borderRadius: 8, border: 'none', background: '#F1F5F9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}>
                <X size={15} />
              </button>
            </div>

            <div style={{ padding: '20px' }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', margin: '0 0 4px' }}>{t(detail.titleKey ?? detail.title)}</h3>
              <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 20px', lineHeight: 1.7 }}>{t(detail.descriptionKey)}</p>

              <div style={{ background: '#F8FAFC', borderRadius: 12, padding: '16px', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <User size={15} style={{ color: '#94A3B8', flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: '#475569' }}><strong>{t('admin.from')}</strong> {detail.from.name} ({t(detail.from.roleKey)})</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Hash size={15} style={{ color: '#94A3B8', flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: '#475569' }}><strong>{t('admin.reference')}</strong> {detail.relatedId}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Calendar size={15} style={{ color: '#94A3B8', flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: '#475569' }}><strong>{t('admin.time')}</strong> {t(detail.timeKey)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Tag size={15} style={{ color: '#94A3B8', flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: '#475569' }}><strong>{t('admin.type')}</strong> {t(typeKeys[detail.type] ?? detail.type)}</span>
                </div>
              </div>

              {Object.keys(detail.metadata).length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <h4 style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '.05em', margin: '0 0 10px' }}>{t('admin.additional_details')}</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {Object.entries(detail.metadata).map(([key, val]) => (
                      <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f1f5f9', fontSize: 13 }}>
                        <span style={{ color: '#64748B', textTransform: 'capitalize' }}>{t(metaLabels[key] ?? key.replace(/([A-Z])/g, ' $1').trim())}</span>
                        <span style={{ color: '#0F172A', fontWeight: 600 }}>{t(String(val))}</span>
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
                {t('admin.view_details')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
