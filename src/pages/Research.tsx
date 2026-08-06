import { useState } from 'react'
import { useI18n } from '../i18n'
import { useDB } from '../lib/store'
import { Search, FileText } from 'lucide-react'

const statusColor: Record<string, string> = {
  Approved: '#047857', Pending: '#B45309', 'Under Review': '#1E40AF', Rejected: '#B91C1C',
}
const statusBg: Record<string, string> = {
  Approved: 'rgba(16,185,129,.12)', Pending: 'rgba(245,158,11,.12)', 'Under Review': 'rgba(37,99,235,.1)', Rejected: 'rgba(239,68,68,.1)',
}

export default function Research() {
  const { t } = useI18n()
  const db = useDB()
  const [q, setQ] = useState('')
  const [faculty, setFaculty] = useState('all')
  const [status, setStatus] = useState('all')

  const keyword = q.trim().toLowerCase()
  const list = db.submissions.filter(s => {
    const matchText = !keyword || s.title.toLowerCase().includes(keyword) || s.student.toLowerCase().includes(keyword) || s.supervisor.toLowerCase().includes(keyword) || s.id.toLowerCase().includes(keyword)
    const matchFac = faculty === 'all' || s.faculty === faculty
    const matchStatus = status === 'all' || s.status === status
    return matchText && matchFac && matchStatus
  })

  const selectStyle = {
    padding: '.6rem .8rem', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: '.85rem', outline: 'none', background: '#fff', color: '#475569', cursor: 'pointer',
  }

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '6rem 1.25rem 3rem' }}>
      <header style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}><FileText size={22} style={{ color: '#004ac6' }} /> {t('research.title')}</h1>
        <p style={{ color: '#64748B', fontSize: '.92rem', margin: '.35rem 0 0' }}>{t('research.subtitle')}</p>
      </header>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        <div style={{ flex: '1 1 280px', position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder={t('research.search_placeholder')} style={{ width: '100%', padding: '.65rem .85rem .65rem 2.2rem', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: '.88rem', outline: 'none', boxSizing: 'border-box', transition: 'all .2s' }}
            onFocus={e => { e.currentTarget.style.borderColor = '#004ac6'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,74,198,.08)' }}
            onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' }} />
        </div>
        <select value={faculty} onChange={e => setFaculty(e.target.value)} style={selectStyle}>
          <option value="all">{t('research.all_faculties')}</option>
          <option value="Computer Science">{t('research.faculty_cs')}</option>
          <option value="Engineering">{t('research.faculty_eng')}</option>
        </select>
        <select value={status} onChange={e => setStatus(e.target.value)} style={selectStyle}>
          <option value="all">{t('research.all_statuses')}</option>
          <option value="Approved">{t('research.status_approved')}</option>
          <option value="Pending">{t('research.status_pending')}</option>
          <option value="Under Review">{t('research.status_review')}</option>
          <option value="Rejected">{t('research.status_rejected')}</option>
        </select>
      </div>

      <div style={{ background: 'rgba(255,255,255,.9)', border: '1px solid rgba(226,232,240,.8)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px rgba(15,23,42,.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
              <th style={{ padding: '.85rem 1rem', fontSize: '.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '.04em' }}>{t('research.table_id')}</th>
              <th style={{ padding: '.85rem 1rem', fontSize: '.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '.04em' }}>{t('research.table_title')}</th>
              <th style={{ padding: '.85rem 1rem', fontSize: '.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '.04em' }}>{t('research.table_student')}</th>
              <th style={{ padding: '.85rem 1rem', fontSize: '.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '.04em' }}>{t('research.table_faculty')}</th>
              <th style={{ padding: '.85rem 1rem', fontSize: '.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '.04em' }}>{t('research.table_status')}</th>
              <th style={{ padding: '.85rem 1rem', fontSize: '.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '.04em' }}>{t('research.table_hash')}</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 && (
              <tr><td colSpan={6} style={{ padding: '2.5rem', textAlign: 'center', color: '#94A3B8', fontSize: '.88rem' }}>{t('research.no_results')}</td></tr>
            )}
            {list.map(s => (
              <tr key={s.id} style={{ borderTop: '1px solid #f1f5f9' }}>
                <td style={{ padding: '.8rem 1rem', fontSize: '.8rem', fontWeight: 600, color: '#004ac6', whiteSpace: 'nowrap' }}>{s.id}</td>
                <td style={{ padding: '.8rem 1rem', fontSize: '.85rem', fontWeight: 600, color: '#0F172A' }}>{s.title}</td>
                <td style={{ padding: '.8rem 1rem', fontSize: '.82rem', color: '#475569' }}>{s.student}</td>
                <td style={{ padding: '.8rem 1rem', fontSize: '.82rem', color: '#475569', whiteSpace: 'nowrap' }}>{s.faculty}</td>
                <td style={{ padding: '.8rem 1rem' }}>
                  <span style={{ fontSize: '.72rem', fontWeight: 700, padding: '3px 9px', borderRadius: 20, color: statusColor[s.status] || '#475569', background: statusBg[s.status] || '#f1f5f9' }}>{t('research.status_' + s.status.toLowerCase().replace(' ', '_'))}</span>
                </td>
                <td style={{ padding: '.8rem 1rem', fontSize: '.72rem', color: '#94A3B8', fontFamily: 'monospace', maxWidth: 130, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.hash}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: '.8rem', color: '#64748B', marginTop: '1rem' }}>{`${list.length} ${t('research.results_count')} · ${t('research.blockchain_note')}`}</p>
    </div>
  )
}