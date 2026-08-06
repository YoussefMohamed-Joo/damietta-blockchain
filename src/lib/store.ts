import { useSyncExternalStore } from 'react'

export type Status = 'Approved' | 'Pending' | 'Under Review' | 'Rejected'

export interface Submission {
  id: string
  student: string
  title: string
  faculty: string
  supervisor: string
  status: Status
  date: string
  hash: string
  month: number
}

export interface User {
  name: string
  email: string
  role: 'Admin' | 'Reviewer' | 'Student'
  status: 'Active' | 'Inactive'
  papers: number
}

export interface Certificate {
  id: string
  student: string
  research: string
  issued: string
  expires: string
  hash: string
  faculty: string
  supervisor: string
}

export interface BlockchainRecord {
  tx: string
  research: string
  timestamp: string
  block: number
  status: 'Confirmed'
}

export interface Session {
  name: string
  email: string
  role: 'Admin' | 'Reviewer' | 'Student'
  avatar?: string
}

export interface SiteNotification {
  id: number
  type: string
  title: string
  text: string
  time: string
  read: boolean
  user?: string
}

export interface DB {
  submissions: Submission[]
  users: User[]
  certificates: Certificate[]
  blockchain: BlockchainRecord[]
  notifications: SiteNotification[]
  verifiedIds: string[]
  session: Session | null
}

const KEY = 'ipp_db_v1'

const months = [1, 2, 3, 4, 5, 6, 7]
const titles = [
  'Blockchain for Healthcare Data',
  'AI-Based Crop Disease Detection',
  'IoT Smart Grid Optimization',
  'NLP for Arabic Sentiment Analysis',
  'Deep Learning for Medical Imaging',
  'Renewable Energy Forecasting',
  'Smart Agriculture System',
  'Quantum Cryptography in IoT',
  'Machine Learning for Fraud Detection',
  'Computer Vision for Autonomous Vehicles',
  'Blockchain-Based Voting Systems',
  'Edge Computing in Healthcare',
]
const students = ['Ahmed Hassan', 'Mariam Ali', 'Omar Youssef', 'Nour El-Din', 'Laila Mahmoud', 'Hossam Kamal', 'Yara Mostafa', 'Karim Saad', 'Salma Fathy', 'Tarek Nabil', 'Hana Adel', 'Mostafa Gamal']

function hashFor(status: Status): string {
  if (status === 'Rejected' || status === 'Pending' || status === 'Under Review') return '—'
  const chars = '0123456789abcdef'
  let h = ''
  for (let k = 0; k < 12; k++) h += chars[Math.floor(Math.random() * 16)]
  return '0x' + h
}

function seed(): DB {
  const statuses: Status[] = ['Approved', 'Approved', 'Pending', 'Under Review', 'Rejected', 'Approved']
  const submissions: Submission[] = months.map((m, i) => {
    const status = statuses[i % statuses.length]
    const h = hashFor(status)
    const date = `2026-${String(m).padStart(2, '0')}-${String(10 + (i % 18)).padStart(2, '0')}`
    return {
      id: `RES-2026-${String(i + 1).padStart(3, '0')}`,
      student: students[i % students.length],
      title: titles[i % titles.length],
      faculty: i % 2 === 0 ? 'Computer Science' : 'Engineering',
      supervisor: `Dr. ${['Khaled Ibrahim', 'Samira Younis', 'Mohamed Adel', 'Nadia Hassan'][i % 4]}`,
      status,
      date,
      hash: h,
      month: m,
    }
  })

  const approved = submissions.filter(s => s.status === 'Approved')
  const certificates: Certificate[] = approved.slice(0, 4).map((s, i) => ({
    id: `CERT-2026-${String(i + 1).padStart(3, '0')}`,
    student: s.student,
    research: s.title,
    issued: s.date,
    expires: `2031-${s.date.slice(5)}`,
    hash: s.hash,
    faculty: s.faculty,
    supervisor: s.supervisor,
  }))

  const blockchain: BlockchainRecord[] = approved.map((s, i) => ({
    tx: s.hash,
    research: s.title,
    timestamp: `${s.date} 14:32:18`,
    block: 18470000 + i * 137,
    status: 'Confirmed',
  }))

  const notifications: SiteNotification[] = [
    { id: 1, type: 'submission', title: 'New research registered', text: 'A new research "Edge Computing in Healthcare" was registered on the portal.', time: '2 min ago', read: false },
    { id: 2, type: 'approval', title: 'Research approved', text: '"Renewable Energy Forecasting" was approved and a certificate was issued.', time: '1 hr ago', read: false },
    { id: 3, type: 'update', title: 'Portal maintenance', text: 'Scheduled maintenance on Saturday 02:00–04:00 AM.', time: '5 hr ago', read: true },
    { id: 4, type: 'alert', title: 'Security notice', text: 'New blockchain verification endpoint is live for public use.', time: '1 day ago', read: true },
    { id: 5, type: 'submission', title: 'Your research received', text: '"Blockchain for Healthcare Data" has been received and is pending review.', time: '3 min ago', read: false, user: 'Ahmed Hassan' },
    { id: 6, type: 'update', title: 'Review in progress', text: '"AI-Based Crop Disease Detection" is now under review.', time: '40 min ago', read: false, user: 'Mariam Ali' },
  ]

  return {
    submissions,
    users: [
      { name: 'Dr. Khaled Ibrahim', email: 'k.ibrahim@du.edu.eg', role: 'Admin', status: 'Active', papers: 42 },
      { name: 'Dr. Samira Younis', email: 's.younis@du.edu.eg', role: 'Reviewer', status: 'Active', papers: 28 },
      { name: 'Ahmed Hassan', email: 'ahmed.hassan@stud.du.edu.eg', role: 'Student', status: 'Active', papers: 3 },
      { name: 'Mariam Ali', email: 'mariam.ali@stud.du.edu.eg', role: 'Student', status: 'Active', papers: 1 },
      { name: 'Sarah Nabil', email: 's.nabil@du.edu.eg', role: 'Reviewer', status: 'Inactive', papers: 15 },
    ],
    certificates,
    blockchain,
    notifications,
    verifiedIds: approved.map(s => s.hash),
    session: null,
  }
}

function load(): DB {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as DB
      return { ...parsed, session: parsed.session ?? null }
    }
  } catch (e) { /* ignore */ }
  const db = seed()
  try { localStorage.setItem(KEY, JSON.stringify(db)) } catch (e) { /* ignore */ }
  return db
}

let db = load()
const listeners = new Set<() => void>()
let version = 0

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(db)) } catch (e) { /* ignore */ }
  version++
  listeners.forEach(l => l())
}

export function getDB(): DB { return db }
export function getSnapshot(): number { return version }
export function subscribe(fn: () => void): () => void {
  listeners.add(fn)
  return () => { listeners.delete(fn) }
}
export function useDB(): DB {
  useSyncExternalStore(subscribe, getSnapshot)
  return db
}

export function approveSubmission(id: string) {
  const s = db.submissions.find(x => x.id === id)
  if (!s) return
  s.status = 'Approved'
  s.hash = '0x' + Array.from({ length: 12 }, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('')
  const cid = `CERT-2026-${String(db.certificates.length + 1).padStart(3, '0')}`
  db.certificates.unshift({ id: cid, student: s.student, research: s.title, issued: new Date().toISOString().slice(0, 10), expires: '2031-08-01', hash: s.hash, faculty: s.faculty, supervisor: s.supervisor })
  db.blockchain.unshift({ tx: s.hash, research: s.title, timestamp: new Date().toLocaleString(), block: 18480000 + db.blockchain.length * 97, status: 'Confirmed' })
  db.verifiedIds.push(s.hash)
  db.notifications.unshift({ id: Date.now(), type: 'approval', title: 'Research approved', text: `"${s.title}" was approved and certificate ${cid} issued.`, time: 'Just now', read: false, user: s.student })
  save()
}

export function rejectSubmission(id: string) {
  const s = db.submissions.find(x => x.id === id)
  if (!s) return
  s.status = 'Rejected'
  s.hash = '—'
  db.notifications.unshift({ id: Date.now(), type: 'alert', title: 'Research rejected', text: `"${s.title}" was rejected by the review committee.`, time: 'Just now', read: false, user: s.student })
  save()
}

export function addUser(u: { name: string; email: string; role: 'Admin' | 'Reviewer' | 'Student' }) {
  db.users.unshift({ name: u.name, email: u.email, role: u.role, status: 'Active', papers: 0 })
  save()
}

export function addSubmission(data: { title: string; supervisor: string; faculty?: string }) {
  const n = db.submissions.length + 1
  const id = `RES-2026-${String(n).padStart(3, '0')}`
  const now = new Date()
  db.submissions.unshift({
    id,
    student: 'Ahmed Hassan',
    title: data.title,
    faculty: data.faculty || 'Computer Science',
    supervisor: data.supervisor,
    status: 'Pending',
    date: now.toISOString().slice(0, 10),
    hash: '—',
    month: now.getMonth() + 1,
  })
  db.notifications.unshift({ id: Date.now(), type: 'submission', title: 'New research submitted', text: `"${data.title}" was submitted and is pending review.`, time: 'Just now', read: false, user: 'Ahmed Hassan' })
  save()
  return id
}

export function markNotifsRead() {
  db.notifications.forEach(n => { n.read = true })
  save()
}

export function login(name: string, email: string, role: Session['role'] = 'Student') {
  db.session = { name, email, role }
  save()
}

export function register(data: { name: string; email: string; role?: Session['role'] }) {
  if (!db.users.some(u => u.email.toLowerCase() === data.email.toLowerCase())) {
    db.users.unshift({ name: data.name, email: data.email, role: data.role || 'Student', status: 'Active', papers: 0 })
  }
  db.session = { name: data.name, email: data.email, role: data.role || 'Student' }
  db.notifications.unshift({ id: Date.now(), type: 'update', title: 'Welcome to the portal', text: `Account registered for ${data.name}. Your notifications will appear here.`, time: 'Just now', read: false, user: data.name })
  save()
}

export function logout() {
  db.session = null
  save()
}

export function updateProfile(data: { name?: string; email?: string; avatar?: string }) {
  if (!db.session) return
  if (data.name !== undefined) db.session.name = data.name
  if (data.email !== undefined) db.session.email = data.email
  if (data.avatar !== undefined) db.session.avatar = data.avatar
  save()
}

export function resetDB() {
  db = seed()
  save()
}

export function findVerified(query: string): { submission?: Submission; certificate?: Certificate; valid: boolean } {
  const q = query.trim().toLowerCase()
  if (!q) return { valid: false }
  const cert = db.certificates.find(c => c.id.toLowerCase() === q || c.student.toLowerCase() === q || c.hash.toLowerCase() === q)
  const sub = db.submissions.find(s => s.id.toLowerCase() === q || s.student.toLowerCase() === q || (s.hash !== '—' && s.hash.toLowerCase() === q))
  if (cert || (sub && sub.status === 'Approved')) {
    return { submission: sub, certificate: cert, valid: true }
  }
  return { submission: sub, valid: false }
}
