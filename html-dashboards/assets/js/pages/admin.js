/* ============================================================
   Admin Dashboard — Page Script
   Renders users, submissions, blockchain, certificates, settings.
   ============================================================ */

let adminUsers = JSON.parse(JSON.stringify(DUMMY.users));
let adminSearch = '';
let adminStatusFilter = 'All Status';

function switchView(view) {
  showOnlySection(view);
  if (view === 'settings') renderSettings();
}
window.SWITCH_VIEW = switchView;

/* ---------- Filter helpers ---------- */
function matches(item, fields) {
  const q = adminSearch.toLowerCase();
  const okQ = !q || fields.some(f => String(item[f]).toLowerCase().includes(q));
  const okS = adminStatusFilter === 'All Status' || item.status === adminStatusFilter;
  return okQ && okS;
}
function applySearch() {
  adminStatusFilter = document.getElementById('status-filter') ? document.getElementById('status-filter').value : 'All Status';
  renderRecent();
  renderUsers();
  renderAllSubmissions();
  renderBlockchain();
  renderCerts();
}
window.GLOBAL_SEARCH = function (value) { adminSearch = value; applySearch(); };

/* ---------- Recent submissions (overview) ---------- */
function renderRecent() {
  document.getElementById('recent-submissions-body').innerHTML = DUMMY.submissions.filter(s => matches(s, ['id', 'student', 'title', 'status', 'date'])).map(r => `
    <tr>
      <td class="fw-semibold" style="color:#2563EB;">${esc(r.id)}</td>
      <td style="color:var(--text-dark);">${esc(r.student)}</td>
      <td class="text-truncate-1" style="color:var(--text-body);max-width:200px;">${esc(r.title)}</td>
      <td>${statusBadge(r.status)}</td>
      <td style="color:var(--text-muted);">${esc(r.date)}</td>
      <td>
        <div class="d-flex" style="gap:6px;">
          <button class="btn-icon sm" onclick="toast('Viewing details for ${r.id}','info')" title="View"><i class="bi bi-eye"></i></button>
          <button class="btn-icon sm teal" onclick="toast('${r.id} approved successfully!','success')" title="Approve"><i class="bi bi-check-circle"></i></button>
          <button class="btn-icon sm red" onclick="toast('${r.id} rejected.','error')" title="Reject"><i class="bi bi-x-circle"></i></button>
        </div>
      </td>
    </tr>`).join('');
}

/* ---------- Users ---------- */
function renderUsers() {
  document.getElementById('users-body').innerHTML = adminUsers.filter(u => matches(u, ['name', 'email', 'role', 'status'])).map(u => `
    <tr>
      <td class="fw-semibold" style="color:var(--text-dark);">${esc(u.name)}</td>
      <td style="color:var(--text-muted);">${esc(u.email)}</td>
      <td>${roleBadge(u.role)}</td>
      <td>${statusBadge(u.status)}</td>
      <td style="color:var(--text-body);">${u.papers}</td>
      <td><button class="btn-icon" onclick="toast('Managing user: ${esc(u.name)}','info')" title="Manage"><i class="bi bi-three-dots"></i></button></td>
    </tr>`).join('');
}

function addUser() {
  const name = document.getElementById('nu-name').value.trim();
  const email = document.getElementById('nu-email').value.trim();
  const password = document.getElementById('nu-password').value.trim();
  const role = document.getElementById('nu-role').value;
  if (!name || !email || !password) { toast('Please fill all fields', 'error'); return; }
  adminUsers.push({ name: name, email: email, role: role, status: 'Active', papers: 0 });
  closeModal('add-user-modal');
  renderUsers();
  toast(`${name} added successfully!`, 'success');
}

/* ---------- All submissions ---------- */
function renderAllSubmissions() {
  const data = DUMMY.submissions.concat(DUMMY.submissions).slice(0, 8);
  document.getElementById('all-submissions-body').innerHTML = data.filter(r => matches(r, ['id', 'student', 'title', 'status', 'date'])).map(r => `
    <tr>
      <td class="fw-semibold" style="color:#2563EB;">${esc(r.id)}</td>
      <td style="color:var(--text-dark);">${esc(r.student)}</td>
      <td style="color:var(--text-body);">${esc(r.title)}</td>
      <td>${statusBadge(r.status)}</td>
      <td style="color:var(--text-muted);">${esc(r.date)}</td>
      <td>
        <div class="d-flex" style="gap:6px;">
          <button class="btn-icon" onclick="toast('Viewing details for ${r.id}','info')" title="View"><i class="bi bi-eye"></i></button>
          <button class="btn-icon teal" onclick="toast('${esc(r.title)} approved!','success')" title="Approve"><i class="bi bi-check-circle"></i></button>
          <button class="btn-icon red" onclick="toast('${esc(r.title)} rejected.','error')" title="Reject"><i class="bi bi-x-circle"></i></button>
        </div>
      </td>
    </tr>`).join('');
}

/* ---------- Blockchain ---------- */
function renderBlockchain() {
  document.getElementById('blockchain-body').innerHTML = DUMMY.blockchain.filter(b => matches(b, ['tx', 'research', 'timestamp', 'block', 'status'])).map(b => `
    <tr>
      <td class="hash fw-semibold" style="color:#2563EB;">${esc(b.tx)}</td>
      <td style="color:var(--text-dark);">${esc(b.research)}</td>
      <td style="color:var(--text-muted);font-size:.8rem;">${esc(b.timestamp)}</td>
      <td class="hash" style="color:var(--text-body);">${b.block}</td>
      <td>${statusBadge(b.status)}</td>
      <td><button class="btn-sm-icon primary" onclick="toast('Viewing transaction ${b.tx}')"><i class="bi bi-eye"></i> View</button></td>
    </tr>`).join('');
}

/* ---------- Certificates ---------- */
function renderCerts() {
  document.getElementById('certs-body').innerHTML = DUMMY.certsAdmin.filter(c => matches(c, ['id', 'student', 'research', 'issued', 'qr'])).map(c => `
    <tr>
      <td class="fw-semibold" style="color:#2563EB;">${esc(c.id)}</td>
      <td style="color:var(--text-dark);">${esc(c.student)}</td>
      <td style="color:var(--text-body);">${esc(c.research)}</td>
      <td style="color:var(--text-muted);">${esc(c.issued)}</td>
      <td><span class="hash" style="color:var(--text-faint);background:rgba(0,0,0,.03);padding:4px 8px;border-radius:6px;">${esc(c.qr)}</span></td>
      <td>
        <div class="d-flex" style="gap:6px;">
          <button class="btn-icon" onclick="toast('Viewing certificate ${c.id}','info')" title="View"><i class="bi bi-eye"></i></button>
          <button class="btn-icon teal" onclick="dummyDownload('${c.id}.pdf')" title="Download"><i class="bi bi-download"></i></button>
        </div>
      </td>
    </tr>`).join('');
}

/* ---------- Settings ---------- */
let toggles = { 'Maintenance Mode': false, 'Auto-Certificate Generation': true, 'Notification Alerts': true };
let uploadSize = '50 MB';

function renderSettings() {
  const settings = [
    { label: 'Maintenance Mode', desc: 'Disable user access during maintenance', type: 'toggle', icon: 'bi-shield-check' },
    { label: 'Blockchain Network', desc: 'Sepolia Testnet (Chain ID: 11155111)', type: 'info', icon: 'bi-wifi', info: 'Sepolia Testnet' },
    { label: 'Auto-Certificate Generation', desc: 'Automatically issue certificates upon approval', type: 'toggle', icon: 'bi-award' },
    { label: 'Storage Provider', desc: 'IPFS (InterPlanetary File System) - 98.2% Uptime', type: 'info', icon: 'bi-hdd', info: 'IPFS' },
    { label: 'Max Upload Size', desc: '50 MB per research document', type: 'text', icon: 'bi-upload' },
    { label: 'Notification Alerts', desc: 'Send email notifications for reviews and approvals', type: 'toggle', icon: 'bi-bell' },
  ];
  document.getElementById('settings-list').innerHTML = settings.map(s => `
    <div class="setting-row">
      <div class="d-flex align-items-center" style="gap:12px;">
        <div class="setting-icon"><i class="bi ${s.icon}"></i></div>
        <div>
          <div class="fw-semibold" style="color:var(--text-dark);font-size:.9rem;">${s.label}</div>
          <div style="font-size:.8rem;color:var(--text-muted);margin-top:2px;">${s.desc}</div>
        </div>
      </div>
      ${s.type === 'toggle'
        ? `<div class="toggle${toggles[s.label] ? ' on' : ''}" onclick="toggleSetting('${s.label}')"><div class="knob"></div></div>`
        : s.type === 'info'
          ? `<span class="badge-status" style="background:rgba(37,99,235,.08);color:#2563EB;border-radius:8px;">${s.info}</span>`
          : `<input class="form-input" style="width:100px;text-align:center;" value="${esc(uploadSize)}" onchange="uploadSize = this.value">`}
    </div>`).join('');
}
function toggleSetting(label) {
  toggles[label] = !toggles[label];
  renderSettings();
}
function saveSettings() {
  toast('Settings saved successfully!', 'success');
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderRecent();
  renderUsers();
  renderAllSubmissions();
  renderBlockchain();
  renderCerts();
});
