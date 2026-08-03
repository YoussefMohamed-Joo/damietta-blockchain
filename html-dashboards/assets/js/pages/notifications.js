/* ============================================================
   Notifications — Page Script
   Renders dummy notifications with read/unread handling.
   ============================================================ */

let notifData = JSON.parse(JSON.stringify(DUMMY.notifications));

function renderNotifications() {
  const unread = notifData.filter(n => n.unread).length;
  document.getElementById('unread-count').textContent = unread
    ? tf(unread > 1 ? 'notif.unread_plural' : 'notif.unread', { n: unread })
    : t('notif.caught_up');

  document.getElementById('notif-list').innerHTML = notifData.length ? notifData.map(n => `
    <div class="notif-item${n.unread ? ' unread' : ''}" onclick="markRead('${n.id}')">
      <div class="notif-icon" style="background:${n.bg};color:${n.color};"><i class="bi ${n.icon}"></i></div>
      <div class="flex-1">
        <div class="d-flex justify-content-between align-items-center" style="gap:8px;">
          <div class="fw-semibold" style="font-size:.9rem;color:var(--text-dark);">${esc(tr(n.title))}</div>
          <div style="font-size:.75rem;color:var(--text-faint);white-space:nowrap;">${esc(n.time)}</div>
        </div>
        <div style="font-size:.82rem;color:var(--text-muted);margin-top:2px;">${esc(n.body)}</div>
      </div>
      ${n.unread ? '<span class="bell-dot" style="position:static;flex-shrink:0;margin-top:6px;"></span>' : ''}
    </div>`).join('')
    : `<div class="empty-state"><i class="bi bi-bell"></i><p>${t('notif.none')}</p></div>`;
}

function markRead(id) {
  const n = notifData.find(x => x.id === id);
  if (n) { n.unread = false; renderNotifications(); }
}

function markAllRead() {
  notifData.forEach(n => { n.unread = false; });
  renderNotifications();
  toast(t('toast.all_read'), 'success');
}

document.addEventListener('langchange', renderNotifications);

document.addEventListener('DOMContentLoaded', renderNotifications);
