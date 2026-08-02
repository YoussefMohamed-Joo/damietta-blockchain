/* ============================================================
   Reviewer Dashboard — Page Script
   Renders dummy reviews, approve/revise/reject actions, search.
   ============================================================ */

let reviewerReviews = JSON.parse(JSON.stringify(DUMMY.reviews));

function switchView(view) {
  showOnlySection(view);
  if (view === 'reviews') renderMyReviews();
  if (view === 'feedback') renderFeedback();
}
window.SWITCH_VIEW = switchView;

/* ---------- Reviews table ---------- */
function renderReviews() {
  const q = (window._search || '').toLowerCase();
  const filtered = reviewerReviews.filter(r =>
    !q || [r.id, r.student, r.title, r.dept, r.status].some(f => String(f).toLowerCase().includes(q)));
  document.getElementById('reviews-body').innerHTML = filtered.length ? filtered.map(r => `
    <tr>
      <td class="fw-semibold" style="color:#2563EB;">${esc(r.id)}</td>
      <td style="color:var(--text-dark);">${esc(r.student)}</td>
      <td style="color:var(--text-body);">${esc(r.title)}</td>
      <td style="color:var(--text-muted);font-size:.8rem;">${esc(r.dept)}</td>
      <td>${statusBadge(r.status)}</td>
      <td style="color:var(--text-muted);">${esc(r.date)}</td>
      <td>
        <div class="d-flex flex-wrap" style="gap:6px;">
          <button class="btn-sm-icon primary" onclick="approve('${r.id}')"><i class="bi bi-check-circle"></i> Approve</button>
          <button class="btn-sm-icon amber" onclick="revise('${r.id}')"><i class="bi bi-clock"></i> Revise</button>
          <button class="btn-sm-icon red" onclick="reject('${r.id}')"><i class="bi bi-x-circle"></i> Reject</button>
        </div>
      </td>
    </tr>`).join('')
    : `<tr><td colspan="7" class="text-center py-4" style="color:var(--text-faint);">No reviews match your search.</td></tr>`;
}

function approve(id) {
  const r = reviewerReviews.find(x => x.id === id);
  r.status = 'Approved';
  renderReviews();
  toast(`${r.title} approved!`, 'success');
}
function revise(id) {
  const r = reviewerReviews.find(x => x.id === id);
  r.status = 'Revisions Needed';
  renderReviews();
  toast(`Revisions requested for ${id}`, 'warning');
}
function reject(id) {
  const r = reviewerReviews.find(x => x.id === id);
  r.status = 'Rejected';
  renderReviews();
  toast(`${r.title} rejected.`, 'error');
}

/* ---------- My Reviews ---------- */
function renderMyReviews() {
  const done = reviewerReviews.filter(r => r.status === 'Approved' || r.status === 'Rejected');
  document.getElementById('my-reviews-list').innerHTML = done.length ? done.map(r => `
    <div class="d-flex justify-content-between align-items-center p-3" style="background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;">
      <div>
        <div class="fw-semibold" style="color:var(--text-dark);font-size:.9rem;">${esc(r.title)}</div>
        <div style="font-size:.8rem;color:var(--text-muted);">${esc(r.student)} &middot; ${esc(r.id)}</div>
      </div>
      <div>${statusBadge(r.status)}</div>
    </div>`).join('')
    : `<div class="empty-state"><i class="bi bi-clipboard-check"></i><p>No completed reviews yet.</p></div>`;
}

/* ---------- Feedback ---------- */
function renderFeedback() {
  document.getElementById('feedback-list').innerHTML = `
    <div class="p-3" style="background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;">
      <div class="fw-semibold mb-2" style="color:var(--text-dark);font-size:.9rem;">Feedback Guidelines</div>
      <div style="font-size:.85rem;color:var(--text-muted);line-height:1.6;">Provide constructive feedback on methodology, originality, and technical merit. Comments are visible to the student and become part of the official review record.</div>
    </div>
    <div class="p-3" style="background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;">
      <div class="fw-semibold mb-2" style="color:var(--text-dark);font-size:.9rem;">Average Rating</div>
      <div class="d-flex align-items-center" style="gap:12px;">
        <div class="fs-2 fw-bold" style="color:#2563EB;">4.2</div>
        <div style="color:#F59E0B;"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-half"></i></div>
        <div style="font-size:.8rem;color:var(--text-muted);">/ 5 from 48 reviews</div>
      </div>
    </div>`;
}

/* ---------- Global search hook ---------- */
window.GLOBAL_SEARCH = function (value) {
  window._search = value;
  renderReviews();
};

document.addEventListener('DOMContentLoaded', () => {
  renderReviews();
});
