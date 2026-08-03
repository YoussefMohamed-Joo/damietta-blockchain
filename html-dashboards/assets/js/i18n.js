/* ============================================================
   Damietta IP Portal — i18n (Arabic / English)
   Lightweight translation for the dashboard pages.
   Load this BEFORE app.js and layout.js.
   Usage:
     t('key')                  -> translated string
     currentLang               -> 'en' | 'ar'
     setLanguage('en'|'ar')    -> switch + persist + re-render
   Pages: add data-i18n="key" to static text, use t() in JS.
   ============================================================ */

const TRANSLATIONS = {
  en: {
    // Nav
    'nav.overview': 'Overview',
    'nav.my_research': 'My Research',
    'nav.certificates': 'Certificates',
    'nav.profile': 'Profile',
    'nav.dashboard': 'Dashboard',
    'nav.reviews': 'My Reviews',
    'nav.feedback': 'Feedback',
    'nav.users': 'Users',
    'nav.submissions': 'Submissions',
    'nav.blockchain': 'Blockchain Records',
    'nav.settings': 'Settings',
    'nav.audit': 'Audit Logs',
    'nav.notifications': 'Notifications',
    'nav.home': 'Home',
    'nav.logout': 'Logout',

    // Common
    'common.search': 'Search...',
    'common.view_all': 'View All',
    'common.actions': 'Actions',
    'common.view': 'View',
    'common.download': 'Download',
    'common.approve': 'Approve',
    'common.reject': 'Reject',
    'common.close': 'Close',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.export': 'Export',
    'common.status': 'Status',
    'common.date': 'Date',
    'common.id': 'ID',
    'common.title': 'Title',
    'common.student': 'Student',
    'common.department': 'Department',
    'common.name': 'Name',
    'common.email': 'Email',
    'common.role': 'Role',
    'common.papers': 'Papers',
    'common.add_user': 'Add User',
    'common.full_name': 'Full Name',
    'common.password': 'Password',
    'common.manage': 'Manage',
    'common.issue_new': 'Issue New',
    'common.all': 'All',
    'common.confirmed': 'Confirmed',

    // Status
    'status.approved': 'Approved',
    'status.pending': 'Pending',
    'status.under_review': 'Under Review',
    'status.revisions': 'Revisions Needed',
    'status.rejected': 'Rejected',
    'status.active': 'Active',
    'status.inactive': 'Inactive',
    'status.success': 'Success',
    'status.info': 'Info',
    'status.warning': 'Warning',
    'status.danger': 'Danger',

    // Roles
    'role.admin': 'Admin',
    'role.reviewer': 'Reviewer',
    'role.student': 'Student',

    // Topbar / footer
    'topbar.notifications': 'Notifications',
    'topbar.view_all': 'View all',
    'footer.tagline': 'Blockchain research protection system',
    'footer.rights': '© 2026 Damietta University. All rights reserved.',
    'footer.dashboards': 'Dashboards',
    'footer.quick_links': 'Quick Links',
    'footer.resources': 'Resources',
    'footer.legal': 'Legal & Security',
    'footer.student_dash': 'Student Dashboard',
    'footer.reviewer_dash': 'Reviewer Dashboard',
    'footer.admin_dash': 'Admin Dashboard',
    'footer.audit_logs': 'Audit Logs',
    'footer.notifications': 'Notifications',
    'footer.switch_lang': 'عربي',

    // Student
    'std.total_submissions': 'Total Submissions',
    'std.approved': 'Approved',
    'std.pending_review': 'Pending Review',
    'std.certificates': 'Certificates',
    'std.recent_activity': 'Recent Activity',
    'std.submit_new': 'Submit New Research',
    'std.submit_desc': 'Upload your graduation project to get it verified and protected on the blockchain.',
    'std.upload_project': 'Upload Project',
    'std.my_research': 'My Research Submissions',
    'std.new_submission': 'New Submission',
    'std.upload_new': 'Upload New Research',
    'std.research_title': 'Research Title',
    'std.supervisor': 'Supervisor Name',
    'std.keywords': 'Keywords (comma separated)',
    'std.choose_file': 'Choose File (PDF)',
    'std.submit_hash': 'Submit & Generate Hash',
    'std.my_certificates': 'My Certificates',
    'std.no_certs': 'No certificates issued yet. Submit and get your research approved first.',
    'std.profile': 'Profile Settings',
    'std.student_id': 'Student ID',
    'std.update_profile': 'Update Profile',
    'std.blockchain_hash': 'Blockchain Hash',
    'std.submitted': 'Submitted',
    'std.details': 'Submission Details',
    'std.issued': 'Issued',
    'std.expires': 'Expires',
    'std.crop_title': 'Crop Profile Picture',
    'std.crop_hint': 'Drag to reposition, use slider to zoom',

    // Reviewer
    'rev.dashboard': 'Review Dashboard',
    'rev.pending_reviews': 'Pending Reviews',
    'rev.completed': 'Completed',
    'rev.revisions': 'Revisions Needed',
    'rev.avg_time': 'Avg. Review Time',
    'rev.assigned': 'Assigned Reviews',
    'rev.my_reviews': 'My Completed Reviews',
    'rev.no_completed': 'No completed reviews yet.',
    'rev.feedback': 'Feedback Overview',
    'rev.guidelines_title': 'Feedback Guidelines',
    'rev.guidelines': 'Provide constructive feedback on methodology, originality, and technical merit. Comments are visible to the student and become part of the official review record.',
    'rev.avg_rating': 'Average Rating',

    // Admin
    'adm.users': 'User Management',
    'adm.total_users': 'Total Users',
    'adm.total_research': 'Total Research',
    'adm.certs_issued': 'Certificates Issued',
    'adm.pending_reviews': 'Pending Reviews',
    'adm.recent_submissions': 'Recent Submissions',
    'adm.all_submissions': 'All Submissions',
    'adm.blockchain': 'Blockchain Transactions',
    'adm.network': 'Network: Ethereum Sepolia',
    'adm.digital_certs': 'Digital Certificates',
    'adm.cert_id': 'Certificate ID',
    'adm.issued_date': 'Issued Date',
    'adm.qr': 'QR Code',
    'adm.platform_settings': 'Platform Settings',
    'adm.save_changes': 'Save Changes',
    'adm.add_new_user': 'Add New User',
    'adm.all_status': 'All Status',
    'adm.role': 'Role',
    'adm.block_num': 'Block',
    'adm.explorer': 'Explorer',
    'adm.tx_hash': 'Transaction Hash',
    'adm.timestamp': 'Timestamp',

    // Audit
    'aud.title': 'Audit Logs',
    'aud.desc': 'Immutable record of actions across the platform. Data is dummy for demonstration.',
    'aud.all_actions': 'All Actions',
    'aud.action': 'Action',
    'aud.user': 'User',
    'aud.ip': 'IP Address',
    'aud.time': 'Timestamp',
    'aud.no_entries': 'No log entries match the current filters.',

    // Notifications
    'notif.title': 'Notifications',
    'notif.unread': '{n} unread notification',
    'notif.unread_plural': '{n} unread notifications',
    'notif.caught_up': 'All caught up — you have no unread notifications.',
    'notif.mark_all': 'Mark all as read',
    'notif.none': 'No notifications.',
    'notif.research_approved': 'Research Approved',
    'notif.revision_requested': 'Revision Requested',
    'notif.certificate_issued': 'Certificate Issued',
    'notif.welcome': 'Welcome to the Portal',

    // Table headers
    'th.id': 'ID',
    'th.title': 'Title',
    'th.student': 'Student',
    'th.department': 'Department',
    'th.status': 'Status',
    'th.date': 'Date',
    'th.action': 'Action',
    'th.actions': 'Actions',
    'th.blockchain_hash': 'Blockchain Hash',
    'th.name': 'Name',
    'th.email': 'Email',
    'th.role': 'Role',
    'th.papers': 'Papers',
    'th.tx_hash': 'Transaction Hash',
    'th.research': 'Research',
    'th.timestamp': 'Timestamp',
    'th.block': 'Block',
    'th.explorer': 'Explorer',
    'th.cert_id': 'Certificate ID',
    'th.issued_date': 'Issued Date',
    'th.qr': 'QR Code',
    'th.log_id': 'Log ID',
    'th.user': 'User',
    'th.ip': 'IP Address',

    // Buttons / actions
    'act.approve': 'Approve',
    'act.revise': 'Revise',
    'act.reject': 'Reject',
    'act.view': 'View',
    'act.export': 'Export',

    // Form labels
    'form.full_name': 'Full Name',
    'form.email': 'Email',
    'form.email_address': 'Email Address',
    'form.password': 'Password',
    'form.role': 'Role',

    // Empty states
    'empty.no_search': 'No reviews match your search.',
    'empty.no_logs': 'No log entries match the current filters.',

    // Activity feed
    'act.research_submitted': 'Research Submitted',
    'act.certificate_issued': 'Certificate Issued',
    'act.status_update': 'Status Update',

    // Toasts
    'toast.viewing_details': 'Viewing details for {id}',
    'toast.approved': 'Approved successfully!',
    'toast.rejected': 'Rejected.',
    'toast.approved_title': '"{title}" approved!',
    'toast.rejected_title': '"{title}" rejected.',
    'toast.revisions_requested': 'Revisions requested for {id}',
    'toast.fill_fields': 'Please fill all fields',
    'toast.managing_user': 'Managing user: {name}',
    'toast.add_user_success': 'added successfully!',
    'toast.download_started': 'Download started',
    'toast.profile_updated': 'Profile updated successfully!',
    'toast.pic_updated': 'Profile picture updated!',
    'toast.settings_saved': 'Settings saved successfully!',
    'toast.all_read': 'All notifications marked as read',
    'toast.cert_form': 'Certificate issuance form opened',
    'toast.submit_success': '"{title}" submitted! Hash generated.',
    'toast.fill_title_supervisor': 'Please fill in Research Title and Supervisor Name',
    'toast.viewing_tx': 'Viewing transaction {tx}',
    'toast.viewing_cert': 'Viewing certificate {id}',
    'toast.name_email_required': 'Name and Email are required',

    // Reviewer
    'rev.from_reviews': '/ 5 from 48 reviews',

    // Settings
    'set.maintenance': 'Maintenance Mode',
    'set.maintenance_desc': 'Disable user access during maintenance',
    'set.blockchain_network': 'Blockchain Network',
    'set.blockchain_network_desc': 'Sepolia Testnet (Chain ID: 11155111)',
    'set.auto_cert': 'Auto-Certificate Generation',
    'set.auto_cert_desc': 'Automatically issue certificates upon approval',
    'set.storage': 'Storage Provider',
    'set.storage_desc': 'IPFS (InterPlanetary File System) - 98.2% Uptime',
    'set.max_upload': 'Max Upload Size',
    'set.max_upload_desc': '50 MB per research document',
    'set.notif_alerts': 'Notification Alerts',
    'set.notif_alerts_desc': 'Send email notifications for reviews and approvals',

    // Audit actions
    'aud.act_user_login': 'User Login',
    'aud.act_login_failed': 'User Login Failed',
    'aud.act_research_submitted': 'Research Submitted',
    'aud.act_research_approved': 'Research Approved',
    'aud.act_revision_requested': 'Revision Requested',
    'aud.act_cert_issued': 'Certificate Issued',
    'aud.act_password_reset': 'Password Reset',
    'aud.act_settings_updated': 'Settings Updated',
  },

  ar: {
    // Nav
    'nav.overview': 'نظرة عامة',
    'nav.my_research': 'أبحاثي',
    'nav.certificates': 'الشهادات',
    'nav.profile': 'الملف الشخصي',
    'nav.dashboard': 'لوحة التحكم',
    'nav.reviews': 'مراجعاتي',
    'nav.feedback': 'التقييمات',
    'nav.users': 'المستخدمون',
    'nav.submissions': 'الطلبات المقدمة',
    'nav.blockchain': 'سجلات البلوكشين',
    'nav.settings': 'الإعدادات',
    'nav.audit': 'سجل التدقيق',
    'nav.notifications': 'الإشعارات',
    'nav.home': 'الرئيسية',
    'nav.logout': 'تسجيل الخروج',

    // Common
    'common.search': 'بحث...',
    'common.view_all': 'عرض الكل',
    'common.actions': 'إجراءات',
    'common.view': 'عرض',
    'common.download': 'تحميل',
    'common.approve': 'اعتماد',
    'common.reject': 'رفض',
    'common.close': 'إغلاق',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.export': 'تصدير',
    'common.status': 'الحالة',
    'common.date': 'التاريخ',
    'common.id': 'المعرف',
    'common.title': 'العنوان',
    'common.student': 'الطالب',
    'common.department': 'القسم',
    'common.name': 'الاسم',
    'common.email': 'البريد الإلكتروني',
    'common.role': 'الدور',
    'common.papers': 'الأبحاث',
    'common.add_user': 'إضافة مستخدم',
    'common.full_name': 'الاسم الكامل',
    'common.password': 'كلمة المرور',
    'common.manage': 'إدارة',
    'common.issue_new': 'إصدار جديد',
    'common.all': 'الكل',
    'common.confirmed': 'مؤكد',

    // Status
    'status.approved': 'معتمد',
    'status.pending': 'قيد الانتظار',
    'status.under_review': 'قيد المراجعة',
    'status.revisions': 'يحتاج تعديلات',
    'status.rejected': 'مرفوض',
    'status.active': 'نشط',
    'status.inactive': 'غير نشط',
    'status.success': 'نجاح',
    'status.info': 'معلومة',
    'status.warning': 'تحذير',
    'status.danger': 'خطر',

    // Roles
    'role.admin': 'مدير',
    'role.reviewer': 'مراجع',
    'role.student': 'طالب',

    // Topbar / footer
    'topbar.notifications': 'الإشعارات',
    'topbar.view_all': 'عرض الكل',
    'footer.tagline': 'نظام حماية الأبحاث بالبلوكشين',
    'footer.rights': '© 2026 جامعة دمياط. جميع الحقوق محفوظة.',
    'footer.dashboards': 'لوحات التحكم',
    'footer.quick_links': 'روابط سريعة',
    'footer.resources': 'الموارد',
    'footer.legal': 'قانوني وأمني',
    'footer.student_dash': 'لوحة الطالب',
    'footer.reviewer_dash': 'لوحة المراجع',
    'footer.admin_dash': 'لوحة المدير',
    'footer.audit_logs': 'سجل التدقيق',
    'footer.notifications': 'الإشعارات',
    'footer.switch_lang': 'English',

    // Student
    'std.total_submissions': 'إجمالي الطلبات المقدمة',
    'std.approved': 'معتمدة',
    'std.pending_review': 'قيد المراجعة',
    'std.certificates': 'الشهادات',
    'std.recent_activity': 'النشاط الأخير',
    'std.submit_new': 'تقديم بحث جديد',
    'std.submit_desc': 'ارفع مشروع تخرجك ليتم توثيقه وحمايته على البلوكشين.',
    'std.upload_project': 'رفع المشروع',
    'std.my_research': 'طلباتي البحثية',
    'std.new_submission': 'تقديم جديد',
    'std.upload_new': 'رفع بحث جديد',
    'std.research_title': 'عنوان البحث',
    'std.supervisor': 'اسم المشرف',
    'std.keywords': 'الكلمات المفتاحية (مفصولة بفاصلة)',
    'std.choose_file': 'اختر ملف (PDF)',
    'std.submit_hash': 'تقديم وتوليد الهاش',
    'std.my_certificates': 'شهاداتي',
    'std.no_certs': 'لم يتم إصدار شهادات بعد. قدم بحثك وانتظر اعتماده أولاً.',
    'std.profile': 'إعدادات الملف الشخصي',
    'std.student_id': 'رقم الطالب',
    'std.update_profile': 'تحديث الملف الشخصي',
    'std.blockchain_hash': 'هاش البلوكشين',
    'std.submitted': 'تاريخ التقديم',
    'std.details': 'تفاصيل الطلب',
    'std.issued': 'صادر',
    'std.expires': 'ينتهي',
    'std.crop_title': 'قص صورة الملف الشخصي',
    'std.crop_hint': 'اسحب لإعادة التموضع، واستخدم الشريط للتكبير',

    // Reviewer
    'rev.dashboard': 'لوحة المراجعة',
    'rev.pending_reviews': 'مراجعات قيد الانتظار',
    'rev.completed': 'مكتملة',
    'rev.revisions': 'تعديلات مطلوبة',
    'rev.avg_time': 'متوسط وقت المراجعة',
    'rev.assigned': 'المراجعات المخصصة',
    'rev.my_reviews': 'مراجعاتي المكتملة',
    'rev.no_completed': 'لا توجد مراجعات مكتملة بعد.',
    'rev.feedback': 'نظرة عامة على التقييمات',
    'rev.guidelines_title': 'إرشادات التقييم',
    'rev.guidelines': 'قدّم تقييمًا بناءً على المنهجية والأصالة والجدارة الفنية. التعليقات مرئية للطالب وتصبح جزءًا من السجل الرسمي للمراجعة.',
    'rev.avg_rating': 'متوسط التقييم',

    // Admin
    'adm.users': 'إدارة المستخدمين',
    'adm.total_users': 'إجمالي المستخدمين',
    'adm.total_research': 'إجمالي الأبحاث',
    'adm.certs_issued': 'الشهادات الصادرة',
    'adm.pending_reviews': 'مراجعات قيد الانتظار',
    'adm.recent_submissions': 'الطلبات الحديثة',
    'adm.all_submissions': 'جميع الطلبات',
    'adm.blockchain': 'معاملات البلوكشين',
    'adm.network': 'الشبكة: إيثريوم سيبوليا',
    'adm.digital_certs': 'الشهادات الرقمية',
    'adm.cert_id': 'معرف الشهادة',
    'adm.issued_date': 'تاريخ الإصدار',
    'adm.qr': 'رمز QR',
    'adm.platform_settings': 'إعدادات المنصة',
    'adm.save_changes': 'حفظ التغييرات',
    'adm.add_new_user': 'إضافة مستخدم جديد',
    'adm.all_status': 'جميع الحالات',
    'adm.role': 'الدور',
    'adm.block_num': 'الكتلة',
    'adm.explorer': 'المستكشف',
    'adm.tx_hash': 'هاش المعاملة',
    'adm.timestamp': 'الطابع الزمني',

    // Audit
    'aud.title': 'سجل التدقيق',
    'aud.desc': 'سجل دائم للإجراءات على المنصة. البيانات تجريبية للعرض فقط.',
    'aud.all_actions': 'جميع الإجراءات',
    'aud.action': 'الإجراء',
    'aud.user': 'المستخدم',
    'aud.ip': 'عنوان IP',
    'aud.time': 'الطابع الزمني',
    'aud.no_entries': 'لا توجد سجلات تطابق عوامل التصفية الحالية.',

    // Notifications
    'notif.title': 'الإشعارات',
    'notif.unread': 'إشعار غير مقروء',
    'notif.unread_plural': 'إشعارات غير مقروءة',
    'notif.caught_up': 'لا يوجد لديك إشعارات غير مقروءة.',
    'notif.mark_all': 'تحديد الكل كمقروء',
    'notif.none': 'لا توجد إشعارات.',
    'notif.research_approved': 'تم اعتماد البحث',
    'notif.revision_requested': 'تم طلب تعديلات',
    'notif.certificate_issued': 'تم إصدار شهادة',
    'notif.welcome': 'مرحبًا بك في المنصة',

    // Table headers
    'th.id': 'المعرف',
    'th.title': 'العنوان',
    'th.student': 'الطالب',
    'th.department': 'القسم',
    'th.status': 'الحالة',
    'th.date': 'التاريخ',
    'th.action': 'الإجراء',
    'th.actions': 'إجراءات',
    'th.blockchain_hash': 'هاش البلوكشين',
    'th.name': 'الاسم',
    'th.email': 'البريد الإلكتروني',
    'th.role': 'الدور',
    'th.papers': 'الأبحاث',
    'th.tx_hash': 'هاش المعاملة',
    'th.research': 'البحث',
    'th.timestamp': 'الطابع الزمني',
    'th.block': 'الكتلة',
    'th.explorer': 'المستكشف',
    'th.cert_id': 'معرف الشهادة',
    'th.issued_date': 'تاريخ الإصدار',
    'th.qr': 'رمز QR',
    'th.log_id': 'معرف السجل',
    'th.user': 'المستخدم',
    'th.ip': 'عنوان IP',

    // Buttons / actions
    'act.approve': 'اعتماد',
    'act.revise': 'تعديل',
    'act.reject': 'رفض',
    'act.view': 'عرض',
    'act.export': 'تصدير',

    // Form labels
    'form.full_name': 'الاسم الكامل',
    'form.email': 'البريد الإلكتروني',
    'form.email_address': 'البريد الإلكتروني',
    'form.password': 'كلمة المرور',
    'form.role': 'الدور',

    // Empty states
    'empty.no_search': 'لا توجد مراجعات تطابق بحثك.',
    'empty.no_logs': 'لا توجد سجلات تطابق عوامل التصفية الحالية.',

    // Activity feed
    'act.research_submitted': 'تم تقديم بحث',
    'act.certificate_issued': 'تم إصدار شهادة',
    'act.status_update': 'تحديث الحالة',

    // Toasts
    'toast.viewing_details': 'عرض تفاصيل {id}',
    'toast.approved': 'تم الاعتماد بنجاح!',
    'toast.rejected': 'تم الرفض.',
    'toast.approved_title': 'تم اعتماد "{title}"!',
    'toast.rejected_title': 'تم رفض "{title}".',
    'toast.revisions_requested': 'تم طلب تعديلات لـ {id}',
    'toast.fill_fields': 'يرجى ملء جميع الحقول',
    'toast.managing_user': 'إدارة المستخدم: {name}',
    'toast.add_user_success': 'تمت الإضافة بنجاح!',
    'toast.download_started': 'بدأ التحميل',
    'toast.profile_updated': 'تم تحديث الملف الشخصي بنجاح!',
    'toast.pic_updated': 'تم تحديث الصورة الشخصية!',
    'toast.settings_saved': 'تم حفظ الإعدادات بنجاح!',
    'toast.all_read': 'تم تحديد جميع الإشعارات كمقروءة',
    'toast.cert_form': 'تم فتح نموذج إصدار الشهادة',
    'toast.submit_success': 'تم تقديم "{title}"! تم توليد الهاش.',
    'toast.fill_title_supervisor': 'يرجى إدخال عنوان البحث واسم المشرف',
    'toast.viewing_tx': 'عرض المعاملة {tx}',
    'toast.viewing_cert': 'عرض الشهادة {id}',
    'toast.name_email_required': 'الاسم والبريد الإلكتروني مطلوبان',

    // Reviewer
    'rev.from_reviews': '/ 5 من 48 مراجعة',

    // Settings
    'set.maintenance': 'وضع الصيانة',
    'set.maintenance_desc': 'تعطيل وصول المستخدمين أثناء الصيانة',
    'set.blockchain_network': 'شبكة البلوكشين',
    'set.blockchain_network_desc': 'شبكة سيبوليا التجريبية (معرف السلسلة: 11155111)',
    'set.auto_cert': 'التوليد التلقائي للشهادات',
    'set.auto_cert_desc': 'إصدار الشهادات تلقائيًا عند الاعتماد',
    'set.storage': 'مزود التخزين',
    'set.storage_desc': 'IPFS - نسبة توفر 98.2%',
    'set.max_upload': 'الحد الأقصى لحجم الرفع',
    'set.max_upload_desc': '50 ميجابايت لكل مستند بحثي',
    'set.notif_alerts': 'تنبيهات الإشعارات',
    'set.notif_alerts_desc': 'إرسال إشعارات بالبريد للمراجعات والموافقات',

    // Audit actions
    'aud.act_user_login': 'تسجيل دخول',
    'aud.act_login_failed': 'فشل تسجيل الدخول',
    'aud.act_research_submitted': 'تقديم بحث',
    'aud.act_research_approved': 'اعتماد بحث',
    'aud.act_revision_requested': 'طلب تعديلات',
    'aud.act_cert_issued': 'إصدار شهادة',
    'aud.act_password_reset': 'إعادة تعيين كلمة المرور',
    'aud.act_settings_updated': 'تحديث الإعدادات',
  },
};

let currentLang = 'en';

function getLang() {
  return currentLang;
}

function detectLang() {
  try {
    const saved = localStorage.getItem('ipp_lang');
    return saved === 'ar' ? 'ar' : 'en';
  } catch (e) {
    return 'en';
  }
}

function t(key) {
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  return dict[key] != null ? dict[key] : key;
}

/* Translate with {placeholder} interpolation, e.g. tf('toast.viewing_details', { id: 'RES-1' }) */
function tf(key, params) {
  let str = t(key);
  if (params) {
    Object.keys(params).forEach(k => {
      str = str.split('{' + k + '}').join(String(params[k]));
    });
  }
  return str;
}

/* Map a known English label (status/role/action) to its translated string */
function tr(enLabel) {
  const map = {
    Approved: 'status.approved', Pending: 'status.pending',
    'Under Review': 'status.under_review', 'Revisions Needed': 'status.revisions',
    Rejected: 'status.rejected', Active: 'status.active', Inactive: 'status.inactive',
    Success: 'status.success', Info: 'status.info', Warning: 'status.warning',
    Danger: 'status.danger', Confirmed: 'common.confirmed',
    Admin: 'role.admin', Reviewer: 'role.reviewer', Student: 'role.student',
    'Research Approved': 'aud.act_research_approved',
    'Revision Requested': 'aud.act_revision_requested',
    'Certificate Issued': 'aud.act_cert_issued',
    'Welcome to the Portal': 'notif.welcome',
    'Research Submitted': 'aud.act_research_submitted',
    'Status Update': 'act.status_update',
    'User Login': 'aud.act_user_login',
    'User Login Failed': 'aud.act_login_failed',
    'Password Reset': 'aud.act_password_reset',
    'Settings Updated': 'aud.act_settings_updated',
  };
  return map[enLabel] ? t(map[enLabel]) : enLabel;
}

function setLanguage(lang) {
  currentLang = lang === 'ar' ? 'ar' : 'en';
  try { localStorage.setItem('ipp_lang', currentLang); } catch (e) {}
  const html = document.documentElement;
  html.lang = currentLang === 'ar' ? 'ar' : 'en';
  html.dir = 'ltr';
  applyTranslations();
  if (window.ON_LANG_CHANGE) window.ON_LANG_CHANGE(currentLang);
}

/* Translate all elements with data-i18n, placeholders with data-i18n-ph */
function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = t(key);
    if (val !== key) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = val;
      else el.textContent = val;
    }
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const val = t(el.dataset.i18nHtml);
    if (val !== el.dataset.i18nHtml) el.innerHTML = val;
  });
  /* Re-render JS-built sections via custom event */
  window.dispatchEvent(new CustomEvent('langchange'));
}

currentLang = detectLang();
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    html.lang = currentLang === 'ar' ? 'ar' : 'en';
    html.dir = 'ltr';
    applyTranslations();
  });
} else {
  const html = document.documentElement;
  html.lang = currentLang === 'ar' ? 'ar' : 'en';
  html.dir = 'ltr';
}
