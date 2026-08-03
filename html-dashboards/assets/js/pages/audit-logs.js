/* ============================================================
   Audit Logs — Page Script
   Renders dummy audit trail with status + action filters.
   ============================================================ */

function renderAuditLogs() {
  const statusFilter = document.getElementById('audit-status-filter').value;
  const actionFilter = document.getElementById('audit-action-filter').value;
  const q = (window._search || '').toLowerCase();
  const rows = DUMMY.auditLogs.filter(l => {
    const okStatus = statusFilter === 'All Status' || l.status === statusFilter;
    const okAction = actionFilter === 'All Actions' || l.action === actionFilter;
    const okQ = !q || [l.id, l.action, l.user, l.role, l.ip, l.time, l.status].some(f => String(f).toLowerCase().includes(q));
    return okStatus && okAction && okQ;
  });

  document.getElementById('audit-body').innerHTML = rows.length ? rows.map(l => `
    <tr>
      <td class="fw-semibold hash" style="color:var(--text-muted);">${esc(l.id)}</td>
      <td style="color:var(--text-dark);font-weight:500;">${esc(tr(l.action))}</td>
      <td style="color:var(--text-body);">${esc(l.user)}</td>
      <td>${roleBadge(l.role)}</td>
      <td class="hash" style="color:var(--text-muted);font-size:.8rem;">${esc(l.ip)}</td>
      <td class="hash" style="color:var(--text-muted);font-size:.8rem;">${esc(l.time)}</td>
      <td>${statusBadge(l.status)}</td>
    </tr>`).join('')
    : `<tr><td colspan="7" class="text-center py-4" style="color:var(--text-faint);">${t('empty.no_logs')}</td></tr>`;
}

window.GLOBAL_SEARCH = function (value) { window._search = value; renderAuditLogs(); };

document.addEventListener('langchange', renderAuditLogs);

document.addEventListener('DOMContentLoaded', renderAuditLogs);
