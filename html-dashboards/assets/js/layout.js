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
      { key: 'overview', icon: 'bi-grid-1x2', labelKey: 'nav.overview' },
      { key: 'my-research', icon: 'bi-file-earmark-text', labelKey: 'nav.my_research' },
      { key: 'certificates', icon: 'bi-award', labelKey: 'nav.certificates' },
      { key: 'profile', icon: 'bi-person', labelKey: 'nav.profile' },
    ],
    reviewer: [
      { key: 'dashboard', icon: 'bi-file-earmark-text', labelKey: 'nav.dashboard' },
      { key: 'reviews', icon: 'bi-person-check', labelKey: 'nav.reviews' },
      { key: 'feedback', icon: 'bi-chat-left-text', labelKey: 'nav.feedback' },
    ],
    admin: [
      { key: 'overview', icon: 'bi-grid-1x2', labelKey: 'nav.overview' },
      { key: 'users', icon: 'bi-people', labelKey: 'nav.users' },
      { key: 'submissions', icon: 'bi-file-earmark-text', labelKey: 'nav.submissions' },
      { key: 'blockchain', icon: 'bi-shield-check', labelKey: 'nav.blockchain' },
      { key: 'certificates', icon: 'bi-award', labelKey: 'nav.certificates' },
      { key: 'settings', icon: 'bi-gear', labelKey: 'nav.settings' },
      { key: 'audit', icon: 'bi-clipboard-data', labelKey: 'nav.audit' },
      { key: 'notifications', icon: 'bi-bell', labelKey: 'nav.notifications' },
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
              icon(n.icon) + '<span>' + t(n.labelKey) + '</span></button>';
          }).join('') +
        '</nav>' +
        '<div class="sidebar-foot">' +
          '<a href="/" class="nav-item">' + icon('bi-house') + '<span>' + t('nav.home') + '</span></a>' +
          '<a href="/login" class="nav-item logout">' + icon('bi-box-arrow-right') + '<span>' + t('nav.logout') + '</span></a>' +
        '</div>' +
      '</aside>'
    );
  }

  function topbar() {
    return (
      '<header class="topbar">' +
        '<div class="topbar-left">' +
          '<button class="btn-icon" id="sidebar-toggle">' + icon('bi-list') + '</button>' +
          '<h2 class="page-title" id="page-title" data-i18n="' + pageTitleKey() + '">' + (C.title || '') + '</h2>' +
        '</div>' +
        '<div class="topbar-right">' +
          '<div class="search-wrap"><i class="bi bi-search"></i>' +
            '<input class="search-input" id="global-search" placeholder="' + t('common.search') + '" autocomplete="off" data-i18n="common.search"></div>' +
          '<div class="bell-wrap" id="bell-root"></div>' +
          '<div class="avatar-logo">' + C.initials + '</div>' +
        '</div>' +
      '</header>'
    );
  }

  function pageTitleKey() {
    const map = {
      student: { overview: 'nav.overview', 'my-research': 'nav.my_research', certificates: 'nav.certificates', profile: 'nav.profile' },
      reviewer: { dashboard: 'nav.dashboard', reviews: 'nav.reviews', feedback: 'nav.feedback' },
      admin: { overview: 'nav.overview', users: 'nav.users', submissions: 'nav.submissions', blockchain: 'nav.blockchain', certificates: 'nav.certificates', settings: 'nav.settings' },
    };
    return (map[C.role] && map[C.role][C.active]) || 'nav.overview';
  }

  function bell() {
    return (
      '<button class="bell-btn" id="bell-btn">' + icon('bi-bell') + '<span class="bell-dot"></span></button>' +
      '<div class="dropdown-menu-dash" id="bell-menu">' +
        '<div class="dropdown-header" data-i18n="topbar.notifications">' + t('topbar.notifications') + '</div>' +
        '<div class="dropdown-item-dash unread" data-href="notifications.html">' +
          '<div class="notif-icon" style="background:rgba(20,184,166,.12);color:#14B8A6;">' + icon('bi-shield-check') + '</div>' +
          '<div><div style="font-size:.85rem;font-weight:600;color:#0F172A;">' + t('status.approved') + '</div>' +
          '<div style="font-size:.75rem;color:#64748B;">Blockchain for Healthcare Data</div></div>' +
        '</div>' +
        '<div class="dropdown-item-dash" data-href="notifications.html">' +
          '<div class="notif-icon" style="background:rgba(245,158,11,.12);color:#F59E0B;">' + icon('bi-clock-history') + '</div>' +
          '<div><div style="font-size:.85rem;font-weight:600;color:#0F172A;">' + t('status.revisions') + '</div>' +
          '<div style="font-size:.75rem;color:#64748B;">IoT Smart Grid Optimization</div></div>' +
        '</div>' +
        '<div class="dropdown-header" style="border:none;text-align:center;padding:.5rem;">' +
          '<a href="notifications.html" style="font-size:.8rem;color:#2563EB;font-weight:600;" data-i18n="topbar.view_all">' + t('topbar.view_all') + '</a>' +
        '</div>' +
      '</div>'
    );
  }

  function footer() {
    return (
      '<footer class="dashboard-footer">' +
        '<div class="dashboard-footer-inner">' +
          '<div class="dashboard-footer-brand">' +
            '<div class="avatar-logo">' + C.initials + '</div>' +
            '<div><div class="fw-bold" style="font-size:.9rem;">Damietta IP Portal</div>' +
            '<div style="font-size:.75rem;color:var(--text-faint);" data-i18n="footer.tagline">' + t('footer.tagline') + '</div></div>' +
          '</div>' +
          '<div class="dashboard-footer-links">' +
            '<a href="student-dashboard.html" data-i18n="footer.student_dash">' + t('footer.student_dash') + '</a>' +
            '<a href="reviewer-dashboard.html" data-i18n="footer.reviewer_dash">' + t('footer.reviewer_dash') + '</a>' +
            '<a href="admin-dashboard.html" data-i18n="footer.admin_dash">' + t('footer.admin_dash') + '</a>' +
            '<a href="audit-logs.html" data-i18n="footer.audit_logs">' + t('footer.audit_logs') + '</a>' +
            '<a href="notifications.html" data-i18n="footer.notifications">' + t('footer.notifications') + '</a>' +
          '</div>' +
          '<button class="lang-toggle" id="lang-toggle">' + t('footer.switch_lang') + '</button>' +
          '<div class="dashboard-footer-copy" data-i18n="footer.rights">' + t('footer.rights') + '</div>' +
        '</div>' +
      '</footer>'
    );
  }

  function bindShell() {
    var toggle = document.getElementById('sidebar-toggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var sb = document.querySelector('.sidebar');
        if (window.innerWidth <= 992) {
          sb.classList.toggle('mobile-open');
        } else {
          sb.classList.toggle('collapsed');
        }
      });
    }

    var langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
      langBtn.addEventListener('click', function () {
        setLanguage(getLang() === 'ar' ? 'en' : 'ar');
      });
    }

    var bellBtn = document.getElementById('bell-btn');
    var bellMenu = document.getElementById('bell-menu');
    if (bellBtn && bellMenu) {
      bellBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        bellMenu.classList.toggle('open');
      });
      bellMenu.querySelectorAll('[data-href]').forEach(function (el) {
        el.addEventListener('click', function () { window.location.href = el.dataset.href; });
      });
    }

    // Global search -> route to each page's search handler
    var search = document.getElementById('global-search');
    if (search) {
      search.addEventListener('input', function () {
        if (window.GLOBAL_SEARCH) window.GLOBAL_SEARCH(search.value);
      });
    }

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

  function renderShell() {
    var oldFooter = document.querySelector('.dashboard-footer');
    if (oldFooter) oldFooter.remove();
    document.getElementById('sidebar-root').innerHTML = sidebar();
    document.getElementById('navbar-root').innerHTML = topbar();
    document.getElementById('bell-root').innerHTML = bell();
    document.querySelector('.main-wrap').insertAdjacentHTML('beforeend', footer());
    bindShell();
  }

  document.addEventListener('click', function () {
    var bellMenu = document.getElementById('bell-menu');
    if (bellMenu) bellMenu.classList.remove('open');
  });

  document.addEventListener('langchange', renderShell);

  function mount() {
    renderShell();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
