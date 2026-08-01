const sections = [
  { num: '01', title: 'Acceptance of Terms', text: 'By accessing or using the Damietta IP Portal, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use the platform. These terms constitute a legally binding agreement between you and Damietta University.' },
  { num: '02', title: 'Account Registration', text: 'You must be a currently enrolled student or faculty member of Damietta University to register for an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use.' },
  { num: '03', title: 'User Obligations', text: 'You agree to provide accurate and complete information during registration and to keep this information updated. You agree not to upload plagiarized content, malicious files, or material that infringes on the intellectual property rights of others. You are solely responsible for the content you submit.' },
  { num: '04', title: 'Intellectual Property', text: 'You retain all intellectual property rights to the research you submit. By using the platform, you grant Damietta University a non-exclusive license to store, hash, and display your research metadata for verification purposes. The blockchain record of your research hash is permanent and cannot be reversed.' },
  { num: '05', title: 'Limitation of Liability', text: 'Damietta University provides the platform on an "as is" basis and makes no warranties regarding the uninterrupted availability or error-free operation of the service. The university is not liable for any damages arising from the use or inability to use the platform, including but not limited to data loss or blockchain network issues.' },
  { num: '06', title: 'Termination', text: 'We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or misuse the platform. Upon termination, your access to the platform will be revoked, but blockchain records previously created will remain permanent.' },
  { num: '07', title: 'Changes to Terms', text: 'We may update these terms from time to time. Users will be notified of significant changes via email or platform notification. Continued use of the platform after changes constitutes acceptance of the updated terms.' },
]

export default function Terms() {
  return (
    <>
      <div className="page-header">
        <h1>Terms of Service</h1>
        <p>Please read these terms carefully before using the Damietta IP Portal.</p>
      </div>
      <div className="content-section">
        <div style={{
          maxWidth: 800, margin: '0 auto',
          background: 'rgba(255,255,255,.95)',
          borderRadius: 24, border: '1px solid rgba(255,255,255,.4)',
          boxShadow: '0 8px 32px rgba(0,0,0,.04)',
          padding: '3rem 3.5rem',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {sections.map((s, i) => (
              <div key={s.title} style={{
                position: 'relative',
                paddingLeft: '4rem',
                borderBottom: i < sections.length - 1 ? '1px solid rgba(148,163,184,.15)' : 'none',
                paddingBottom: i < sections.length - 1 ? '2.5rem' : 0,
              }}>
                <div style={{
                  position: 'absolute', left: 0, top: 0,
                  fontSize: '.7rem', fontWeight: 700, color: '#94A3B8',
                  letterSpacing: '.1em',
                  background: 'rgba(37,99,235,.06)',
                  padding: '.25rem .6rem',
                  borderRadius: 6,
                  lineHeight: '1.4rem',
                }}>{s.num}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '.5rem', marginTop: 0 }}>{s.title}</h3>
                <p style={{ color: '#475569', fontSize: '.9rem', lineHeight: 1.8, margin: 0 }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
