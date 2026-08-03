/* ============================================================
   Damietta IP Portal — Shared App Helpers
   Toast, status badges, role badges, modal helpers, dummy data.
   ============================================================ */

/* ---------- Toast ---------- */
function toast(msg, type) {
  let el = document.getElementById('toast-dash');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast-dash';
    el.className = 'toast-dash';
    document.body.appendChild(el);
  }
  const colors = { error: '#EF4444', warning: '#F59E0B', info: '#2563EB', success: '#14B8A6' };
  el.style.background = colors[type] || '#14B8A6';
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 2500);
}

/* ---------- Status badges ---------- */
const STATUS_MAP = {
  'Approved': ['rgba(20,184,166,.12)', '#14B8A6', 'bi-check-circle'],
  'Pending': ['rgba(245,158,11,.12)', '#F59E0B', 'bi-clock'],
  'Under Review': ['rgba(37,99,235,.12)', '#2563EB', 'bi-arrow-repeat'],
  'Revisions Needed': ['rgba(245,158,11,.12)', '#F59E0B', 'bi-clock-history'],
  'Rejected': ['rgba(239,68,68,.12)', '#EF4444', 'bi-x-circle'],
  'Confirmed': ['rgba(20,184,166,.12)', '#14B8A6', 'bi-check-circle'],
  'Active': ['rgba(20,184,166,.12)', '#14B8A6', 'bi-check-circle'],
  'Inactive': ['rgba(239,68,68,.12)', '#EF4444', 'bi-x-circle'],
  'Success': ['rgba(20,184,166,.12)', '#14B8A6', 'bi-check-circle'],
  'Info': ['rgba(37,99,235,.12)', '#2563EB', 'bi-info-circle'],
  'Warning': ['rgba(245,158,11,.12)', '#F59E0B', 'bi-exclamation-triangle'],
  'Danger': ['rgba(239,68,68,.12)', '#EF4444', 'bi-x-circle'],
};

function statusBadge(status) {
  const [bg, color, ic] = STATUS_MAP[status] || ['rgba(148,163,184,.12)', '#94A3B8', 'bi-exclamation-triangle'];
  return `<span class="badge-status" style="background:${bg};color:${color};"><i class="bi ${ic}" style="font-size:.7rem;"></i> ${tr(status)}</span>`;
}

function roleBadge(role) {
  const m = {
    Admin: ['rgba(239,68,68,.12)', '#EF4444'],
    Reviewer: ['rgba(37,99,235,.12)', '#2563EB'],
    Student: ['rgba(20,184,166,.12)', '#14B8A6'],
  };
  const [bg, color] = m[role] || ['rgba(148,163,184,.12)', '#64748B'];
  return `<span class="role-badge" style="background:${bg};color:${color};">${tr(role)}</span>`;
}

/* ---------- Modal ---------- */
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

/* Closes any open modal when clicking the overlay backdrop */
document.addEventListener('click', (e) => {
  if (e.target.classList && e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

/* Dispatch layout in-page view switching to the page script */
window.dispatchView = function (viewKey) {
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  const target = document.querySelector(`.nav-item[data-view="${viewKey}"]`);
  if (target) target.classList.add('active');
  const title = document.getElementById('page-title');
  if (title) title.textContent = (viewKey.charAt(0).toUpperCase() + viewKey.slice(1)).replace(/-/g, ' ');
  if (window.SWITCH_VIEW) window.SWITCH_VIEW(viewKey);
  else {
    const section = document.getElementById(`section-${viewKey}`);
    if (section) showOnlySection(viewKey);
  }
};

/* Show one content section and hide the others */
function showOnlySection(activeKey) {
  document.querySelectorAll('[data-section]').forEach(s => {
    s.style.display = s.dataset.section === activeKey ? 'block' : 'none';
  });
}

/* Small escape helper for building HTML rows safely */
function esc(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/* Simulated file download (no real file — dummy data) */
function dummyDownload(name) {
  const a = document.createElement('a');
  a.href = '#';
  a.download = name || 'document.pdf';
  a.click();
  toast(t('toast.download_started'), 'info');
}

/* ---------- Dummy Data ---------- */
const DUMMY = {
  students: [
    { id: 'RES-2026-001', title: 'Blockchain for Healthcare Data', status: 'Approved', date: '2026-07-24', hash: '0x7f8a...3b2c' },
    { id: 'RES-2026-002', title: 'AI-Based Crop Disease Detection', status: 'Pending', date: '2026-07-23', hash: '—' },
    { id: 'RES-2026-003', title: 'IoT Smart Grid Optimization', status: 'Under Review', date: '2026-07-22', hash: '—' },
  ],
  certs: [
    { id: 'CERT-2026-001', research: 'Blockchain for Healthcare Data', issued: '2026-07-24', expires: '2031-07-24' },
  ],
  reviews: [
    { id: 'RES-2026-001', student: 'Ahmed Hassan', title: 'Blockchain for Healthcare Data', date: '2026-07-24', status: 'Under Review', dept: 'Computer Science' },
    { id: 'RES-2026-003', student: 'Omar Youssef', title: 'IoT Smart Grid Optimization', date: '2026-07-22', status: 'Revisions Needed', dept: 'Electrical Engineering' },
    { id: 'RES-2026-006', student: 'Nadia Fawzi', title: 'ML for Arabic OCR', date: '2026-07-19', status: 'Under Review', dept: 'Computer Science' },
  ],
  users: [
    { name: 'Dr. Khaled Ibrahim', email: 'k.ibrahim@du.edu.eg', role: 'Admin', status: 'Active', papers: 42 },
    { name: 'Dr. Samira Younis', email: 's.younis@du.edu.eg', role: 'Reviewer', status: 'Active', papers: 28 },
    { name: 'Ahmed Hassan', email: 'ahmed.hassan@stud.du.edu.eg', role: 'Student', status: 'Active', papers: 3 },
    { name: 'Mariam Ali', email: 'mariam.ali@stud.du.edu.eg', role: 'Student', status: 'Active', papers: 1 },
    { name: 'Sarah Nabil', email: 's.nabil@du.edu.eg', role: 'Reviewer', status: 'Inactive', papers: 15 },
  ],
  submissions: [
    { id: 'RES-2026-001', student: 'Ahmed Hassan', title: 'Blockchain for Healthcare Data', status: 'Approved', date: '2026-07-24', hash: '0x7f8a...3b2c' },
    { id: 'RES-2026-002', student: 'Mariam Ali', title: 'AI-Based Crop Disease Detection', status: 'Pending', date: '2026-07-23', hash: '—' },
    { id: 'RES-2026-003', student: 'Omar Youssef', title: 'IoT Smart Grid Optimization', status: 'Under Review', date: '2026-07-22', hash: '—' },
    { id: 'RES-2026-004', student: 'Nour El-Din', title: 'NLP for Arabic Sentiment Analysis', status: 'Approved', date: '2026-07-21', hash: '0x9d2f...7e1a' },
    { id: 'RES-2026-005', student: 'Laila Mahmoud', title: 'Deep Learning for Medical Imaging', status: 'Rejected', date: '2026-07-20', hash: '—' },
  ],
  blockchain: [
    { tx: '0x7f8a...3b2c', research: 'Blockchain for Healthcare Data', timestamp: '2026-07-24 14:32:18', block: 18472921, status: 'Confirmed' },
    { tx: '0x9d2f...7e1a', research: 'NLP for Arabic Sentiment Analysis', timestamp: '2026-07-21 09:15:42', block: 18471200, status: 'Confirmed' },
    { tx: '0x4b1e...8f3d', research: 'Renewable Energy Forecasting', timestamp: '2026-07-18 16:04:55', block: 18468934, status: 'Confirmed' },
    { tx: '0x2c8a...5e9f', research: 'Smart Agriculture System', timestamp: '2026-07-15 11:22:30', block: 18465412, status: 'Confirmed' },
  ],
  certsAdmin: [
    { id: 'CERT-2026-001', student: 'Ahmed Hassan', research: 'Blockchain for Healthcare Data', issued: '2026-07-24', qr: '••••' },
    { id: 'CERT-2026-002', student: 'Nour El-Din', research: 'NLP for Arabic Sentiment Analysis', issued: '2026-07-21', qr: '••••' },
    { id: 'CERT-2026-003', student: 'Hossam Kamal', research: 'Renewable Energy Forecasting', issued: '2026-07-18', qr: '••••' },
  ],
  auditLogs: [
    { id: 'AUD-0001', action: 'User Login', user: 'Ahmed Hassan', role: 'Student', ip: '197.45.22.101', time: '2026-07-25 09:12:44', status: 'Success' },
    { id: 'AUD-0002', action: 'Research Submitted', user: 'Ahmed Hassan', role: 'Student', ip: '197.45.22.101', time: '2026-07-24 14:32:18', status: 'Info' },
    { id: 'AUD-0003', action: 'Research Approved', user: 'Dr. Khaled Ibrahim', role: 'Admin', ip: '196.202.18.45', time: '2026-07-24 15:01:03', status: 'Success' },
    { id: 'AUD-0004', action: 'Certificate Issued', user: 'Dr. Samira Younis', role: 'Reviewer', ip: '196.202.18.77', time: '2026-07-24 15:02:11', status: 'Success' },
    { id: 'AUD-0005', action: 'Revision Requested', user: 'Omar Youssef', role: 'Student', ip: '41.65.133.9', time: '2026-07-23 11:47:52', status: 'Warning' },
    { id: 'AUD-0006', action: 'Password Reset', user: 'Mariam Ali', role: 'Student', ip: '41.65.200.3', time: '2026-07-22 08:30:15', status: 'Info' },
    { id: 'AUD-0007', action: 'User Login Failed', user: 'Unknown', role: '—', ip: '203.0.113.55', time: '2026-07-22 03:18:02', status: 'Danger' },
    { id: 'AUD-0008', action: 'Settings Updated', user: 'Dr. Khaled Ibrahim', role: 'Admin', ip: '196.202.18.45', time: '2026-07-21 16:05:40', status: 'Info' },
  ],
  notifications: [
    { id: 'NTF-0001', type: 'success', icon: 'bi-shield-check', color: '#14B8A6', bg: 'rgba(20,184,166,.12)', title: 'Research Approved', body: 'Your research "Blockchain for Healthcare Data" has been approved and recorded on-chain.', time: '2 days ago', unread: true },
    { id: 'NTF-0002', type: 'warning', icon: 'bi-clock-history', color: '#F59E0B', bg: 'rgba(245,158,11,.12)', title: 'Revision Requested', body: 'Reviewer requested revisions for "IoT Smart Grid Optimization".', time: '3 days ago', unread: true },
    { id: 'NTF-0003', type: 'info', icon: 'bi-award', color: '#8B5CF6', bg: 'rgba(139,92,246,.12)', title: 'Certificate Issued', body: 'Certificate CERT-2026-001 is now available for download.', time: '3 days ago', unread: true },
    { id: 'NTF-0004', type: 'info', icon: 'bi-bell', color: '#2563EB', bg: 'rgba(37,99,235,.12)', title: 'Welcome to the Portal', body: 'Submit your graduation project to get it verified on the blockchain.', time: '1 week ago', unread: false },
  ],
};
