/* ============================================================
   Student Dashboard — Page Script
   Renders dummy data, handles section switching, upload form,
   profile picture crop. Loaded last (after app.js + layout.js).
   ============================================================ */

const studentSubmissions = JSON.parse(JSON.stringify(DUMMY.students));
const studentCerts = JSON.parse(JSON.stringify(DUMMY.certs));

/* ---------- Section switching ---------- */
function switchView(view) {
  showOnlySection(view);
}
window.SWITCH_VIEW = switchView;

function goToUpload() {
  showOnlySection('my-research');
  setTimeout(scrollToUpload, 120);
}
function scrollToUpload() {
  const el = document.getElementById('upload-section');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => document.getElementById('up-title').focus(), 450);
  }
}

/* ---------- Activity list ---------- */
function renderActivity() {
  const acts = [
    { icon: 'bi-upload', color: '#2563EB', bg: 'rgba(37,99,235,.08)', action: 'Research Submitted', desc: 'AI-Based Crop Disease Detection', time: '2 days ago' },
    { icon: 'bi-award', color: '#8B5CF6', bg: 'rgba(139,92,246,.08)', action: 'Certificate Issued', desc: 'Blockchain for Healthcare Data', time: '3 days ago' },
    { icon: 'bi-graph-up-arrow', color: '#F59E0B', bg: 'rgba(245,158,11,.08)', action: 'Status Update', desc: 'IoT Research moved to Under Review', time: '5 days ago' },
  ];
  document.getElementById('activity-list').innerHTML = acts.map(a => `
    <div class="d-flex" style="gap:12px;">
      <div class="rounded-3 d-flex align-items-center justify-content-center" style="width:36px;height:36px;background:${a.bg};color:${a.color};flex-shrink:0;"><i class="bi ${a.icon}"></i></div>
      <div>
        <div class="fw-semibold" style="font-size:.85rem;color:var(--text-dark);">${a.action}</div>
        <div style="font-size:.8rem;color:var(--text-muted);">${a.desc}</div>
        <div style="font-size:.75rem;color:var(--text-faint);">${a.time}</div>
      </div>
    </div>`).join('');
}

/* ---------- Research table ---------- */
function renderResearch() {
  document.getElementById('research-body').innerHTML = studentSubmissions.map(r => `
    <tr>
      <td class="fw-semibold" style="color:#2563EB;">${esc(r.id)}</td>
      <td class="fw-medium" style="color:var(--text-dark);">${esc(r.title)}</td>
      <td>${statusBadge(r.status)}</td>
      <td style="color:var(--text-muted);">${esc(r.date)}</td>
      <td class="hash" style="color:${r.hash === '—' ? 'var(--text-faint)' : '#2563EB'};">${esc(r.hash)}</td>
      <td>
        <div class="d-flex" style="gap:6px;">
          <button class="btn-icon sm" onclick="viewSubmission('${r.id}')" title="View"><i class="bi bi-eye"></i></button>
          <button class="btn-icon sm teal" onclick="dummyDownload('${r.id}.pdf')" title="Download"><i class="bi bi-download"></i></button>
        </div>
      </td>
    </tr>`).join('');
}

function viewSubmission(id) {
  const r = studentSubmissions.find(s => s.id === id);
  if (!r) return;
  document.getElementById('md-id').textContent = r.id;
  document.getElementById('md-title').textContent = r.title;
  document.getElementById('md-status').innerHTML = statusBadge(r.status);
  document.getElementById('md-date').textContent = r.date;
  document.getElementById('md-hash').textContent = r.hash;
  openModal('submission-modal');
}

/* ---------- Submit new research ---------- */
function submitResearch() {
  const title = document.getElementById('up-title').value.trim();
  const supervisor = document.getElementById('up-supervisor').value.trim();
  if (!title || !supervisor) {
    toast('Please fill in Research Title and Supervisor Name', 'error');
    return;
  }
  const newId = 'RES-2026-' + String(studentSubmissions.length + 1).padStart(3, '0');
  studentSubmissions.unshift({ id: newId, title: title, status: 'Pending', date: new Date().toISOString().slice(0, 10), hash: '—' });
  renderResearch();
  document.getElementById('up-title').value = '';
  document.getElementById('up-supervisor').value = '';
  document.getElementById('up-keywords').value = '';
  document.getElementById('file-name').textContent = 'Choose File (PDF)';
  toast(`"${title}" submitted! Hash generated.`, 'success');
}

/* ---------- Certificates ---------- */
function renderCerts() {
  const list = document.getElementById('cert-list');
  if (!studentCerts.length) {
    list.innerHTML = `<div class="empty-state"><i class="bi bi-award"></i><p>No certificates issued yet. Submit and get your research approved first.</p></div>`;
    return;
  }
  list.innerHTML = studentCerts.map(c => `
    <div class="d-flex justify-content-between align-items-center p-4" style="background:rgba(255,255,255,.5);border-radius:12px;border:1px solid rgba(255,255,255,.3);">
      <div class="d-flex align-items-center" style="gap:1rem;">
        <div class="d-flex align-items-center justify-content-center" style="width:48px;height:48px;border-radius:12px;background:rgba(139,92,246,.12);color:#8B5CF6;"><i class="bi bi-award fs-5"></i></div>
        <div>
          <div class="fw-bold" style="color:var(--text-dark);font-size:.9rem;">${esc(c.research)}</div>
          <div class="d-flex flex-wrap" style="gap:1rem;font-size:.8rem;color:var(--text-muted);margin-top:4px;">
            <span>ID: ${esc(c.id)}</span><span>Issued: ${esc(c.issued)}</span><span>Expires: ${esc(c.expires)}</span>
          </div>
        </div>
      </div>
      <div class="d-flex" style="gap:8px;">
        <button class="btn-icon" onclick="window.open('/certificate/${c.id}','_blank')" title="View"><i class="bi bi-eye"></i></button>
        <button class="btn-icon teal" onclick="dummyDownload('${c.id}.pdf')" title="Download"><i class="bi bi-download"></i></button>
      </div>
    </div>`).join('');
}

/* ---------- Profile ---------- */
function updateProfile() {
  const name = document.getElementById('prof-name').value.trim();
  const email = document.getElementById('prof-email').value.trim();
  if (!name || !email) {
    toast('Name and Email are required', 'error');
    return;
  }
  toast('Profile updated successfully!', 'success');
}

/* ---------- Crop profile picture ---------- */
let cropData = null, cropZoom = 1, cropPos = { x: 0, y: 0 }, dragging = false, dragStart = { x: 0, y: 0 };

function openCrop(input) {
  const f = input.files[0];
  if (!f) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    cropData = e.target.result;
    cropZoom = 1;
    cropPos = { x: 0, y: 0 };
    document.getElementById('crop-img').src = cropData;
    document.getElementById('crop-zoom').value = 1;
    applyZoom();
    openModal('crop-modal');
  };
  reader.readAsDataURL(f);
  input.value = '';
}

function applyZoom() {
  cropZoom = Number(document.getElementById('crop-zoom').value);
  const img = document.getElementById('crop-img');
  img.style.transform = `translate(calc(-50% + ${cropPos.x}px), calc(-50% + ${cropPos.y}px)) scale(${cropZoom})`;
}

function zoomCrop(delta) {
  const el = document.getElementById('crop-zoom');
  el.value = Math.min(3, Math.max(0.5, Number(el.value) + delta));
  applyZoom();
}

function initCrop() {
  const circle = document.getElementById('crop-circle');
  circle.addEventListener('mousedown', (e) => {
    dragging = true;
    dragStart = { x: e.clientX - cropPos.x, y: e.clientY - cropPos.y };
    circle.style.cursor = 'grabbing';
  });
  document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    cropPos = { x: e.clientX - dragStart.x, y: e.clientY - dragStart.y };
    applyZoom();
  });
  document.addEventListener('mouseup', () => { dragging = false; circle.style.cursor = 'grab'; });
}

function saveCrop() {
  document.getElementById('avatar-img').src = cropData;
  document.getElementById('avatar-img').style.display = 'block';
  document.getElementById('avatar-text').style.display = 'none';
  closeModal('crop-modal');
  toast('Profile picture updated!', 'success');
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderActivity();
  renderResearch();
  renderCerts();
  initCrop();
});
