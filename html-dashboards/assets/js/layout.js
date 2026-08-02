/* ============================================================
   Damietta IP Portal — Shared Layout Builder
   Injects the Sidebar + Topbar/Navbar from ONE source so every
   dashboard page keeps the exact same chrome.
   ---------------------------------------------
   BEFORE this script, set:
     window.DASHBOARD = {
       role: 'student' | 'reviewer' | 'admin',
       active: 'key-of-active-nav',
       title: 'Page heading',
       name: 'Display Name',
       subtitle: 'Student | Faculty Reviewer | Admin Panel',
       initials: 'AH',
       logo: '/img/logo.png'   // optional
     }
   Page JS must expose window.SWITCH_VIEW(viewKey) to handle
   in-page section switching.
   For Laravel: the markup this file builds mirrors the partials
   in /partials (header, sidebar, navbar, footer).
   ============================================================ */

(function () {
  const NAV = {
    student: [
      { key: 'overview', icon: 'bi-grid-1x2', label: 'Overview' },
      { key: 'my-research', icon: 'bi-file-earmark-text', label: 'My Research' },
      { key: 'certificates', icon: 'bi-award', label: 'Certificates' },
      { key: 'profile', icon: 'bi-person', label: 'Profile' },
    ],
    reviewer: [
      { key: 'dashboard', icon: 'bi-file-earmark-text', label: 'Dashboard' },
      { key: 'reviews', icon: 'bi-person-check', label: 'My Reviews' },
      { key: 'feedback', icon: 'bi-chat-left-text', label: 'Feedback' },
    ],
    admin: [
      { key: 'overview', icon: 'bi-grid-1x2', label: 'Overview' },
      { key: 'users', icon: 'bi-people', label: 'Users' },
      { key: 'submissions', icon: 'bi-file-earmark-text', label: 'Submissions' },
      { key: 'blockchain', icon: 'bi-shield-check', label: 'Blockchain Records' },
      { key: 'certificates', icon: 'bi-award', label: 'Certificates' },
      { key: 'settings', icon: 'bi-gear', label: 'Settings' },
      { key: 'audit', icon: 'bi-clipboard-data', label: 'Audit Logs' },
      { key: 'notifications', icon: 'bi-bell', label: 'Notifications' },
    ],
  };

  const C = window.DASHBOARD || { role: 'admin', active: 'overview', title: 'Overview', name: 'Admin', subtitle: 'Admin Panel', initials: 'AK' };
  const navItems = NAV[C.role] || NAV.admin;
  const dark = C.role !== 'student';

  function icon(name) { return '<i class="bi ' + name + '"></i>'; }

  function sidebar() {
    return (
      '<aside class="sidebar' + (dark ? ' dark' : '') + '">' +
        '<a href="/" class="sidebar-header">' +
          (C.logo ? '<img src="' + C.logo + '" alt="Logo">' : '<div class="avatar-logo">' + C.initials + '</div>') +
          '<div><div class="sidebar-title">' + C.name + '</div><div class="sidebar-subtitle">' + C.subtitle + '</div></div>' +
        '</a>' +
        '<nav class="sidebar-nav">' +
          navItems.map(function (n) {
            return '<button class="nav-item' + (n.key === C.active ? ' active' : '') + '" data-view="' + n.key + '">' +
              icon(n.icon) + '<span>' + n.label + '</span></button>';
          }).join('') +
        '</nav>' +
        '<div class="sidebar-foot">' +
          '<a href="/" class="nav-item">' + icon('bi-house') + '<span>Home</span></a>' +
          '<a href="/login" class="nav-item logout">' + icon('bi-box-arrow-right') + '<span>Logout</span></a>' +
        '</div>' +
      '</aside>'
    );
  }

  function topbar() {
    return (
      '<header class="topbar">' +
        '<div class="topbar-left">' +
          '<button class="btn-icon" id="sidebar-toggle">' + icon('bi-list') + '</button>' +
          '<h2 class="page-title" id="page-title">' + (C.title || '') + '</h2>' +
        '</div>' +
        '<div class="topbar-right">' +
          '<div class="search-wrap"><i class="bi bi-search"></i>' +
            '<input class="search-input" id="global-search" placeholder="Search..." autocomplete="off"></div>' +
          '<div class="bell-wrap" id="bell-root"></div>' +
          '<div class="avatar-logo">' + C.initials + '</div>' +
        '</div>' +
      '</header>'
    );
  }

  function bell() {
    return (
      '<button class="bell-btn" id="bell-btn">' + icon('bi-bell') + '<span class="bell-dot"></span></button>' +
      '<div class="dropdown-menu-dash" id="bell-menu">' +
        '<div class="dropdown-header">Notifications</div>' +
        '<div class="dropdown-item-dash unread" data-href="notifications.html">' +
          '<div class="notif-icon" style="background:rgba(20,184,166,.12);color:#14B8A6;">' + icon('bi-shield-check') + '</div>' +
          '<div><div style="font-size:.85rem;font-weight:600;color:#0F172A;">Research approved</div>' +
          '<div style="font-size:.75rem;color:#64748B;">Blockchain for Healthcare Data approved</div></div>' +
        '</div>' +
        '<div class="dropdown-item-dash" data-href="notifications.html">' +
          '<div class="notif-icon" style="background:rgba(245,158,11,.12);color:#F59E0B;">' + icon('bi-clock-history') + '</div>' +
          '<div><div style="font-size:.85rem;font-weight:600;color:#0F172A;">Revision requested</div>' +
          '<div style="font-size:.75rem;color:#64748B;">IoT Smart Grid Optimization needs revisions</div></div>' +
        '</div>' +
        '<div class="dropdown-header" style="border:none;text-align:center;padding:.5rem;">' +
          '<a href="notifications.html" style="font-size:.8rem;color:#2563EB;font-weight:600;">View all</a>' +
        '</div>' +
      '</div>'
    );
  }

  function mount() {
    document.getElementById('sidebar-root').innerHTML = sidebar();
    document.getElementById('navbar-root').innerHTML = topbar();
    document.getElementById('bell-root').innerHTML = bell();

    var toggle = document.getElementById('sidebar-toggle');
    toggle.addEventListener('click', function () {
      var sb = document.querySelector('.sidebar');
      if (window.innerWidth <= 992) {
        sb.classList.toggle('mobile-open');
      } else {
        sb.classList.toggle('collapsed');
      }
    });

    var bellBtn = document.getElementById('bell-btn');
    var bellMenu = document.getElementById('bell-menu');
    bellBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      bellMenu.classList.toggle('open');
    });
    document.addEventListener('click', function () { bellMenu.classList.remove('open'); });
    bellMenu.querySelectorAll('[data-href]').forEach(function (el) {
      el.addEventListener('click', function () { window.location.href = el.dataset.href; });
    });

    // Global search -> route to each page's search handler
    var search = document.getElementById('global-search');
    search.addEventListener('input', function () {
      if (window.GLOBAL_SEARCH) window.GLOBAL_SEARCH(search.value);
    });

    // Sidebar nav -> in-page view switching or cross-page links
    document.querySelectorAll('.sidebar-nav .nav-item[data-view]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var view = btn.dataset.view;
        if (view === 'audit') { window.location.href = 'audit-logs.html'; return; }
        if (view === 'notifications') { window.location.href = 'notifications.html'; return; }
        document.querySelectorAll('.sidebar-nav .nav-item').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        if (window.SWITCH_VIEW) window.SWITCH_VIEW(view);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
