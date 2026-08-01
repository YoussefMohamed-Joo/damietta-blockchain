const sections = [
  { num: '01', title: 'Information We Collect', text: 'We collect personal information that you provide directly to us when registering an account, including your full name, university email address, student ID, and faculty affiliation. We also collect the research documents and metadata you upload to the platform.' },
  { num: '02', title: 'How We Use Your Information', text: 'Your personal information is used to create and maintain your account, verify your identity as a Damietta University student, process your research submissions, and communicate with you about the status of your submissions. The research metadata stored on the blockchain is public by design to enable verification.' },
  { num: '03', title: 'Data Security', text: 'All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Research documents are stored on IPFS with encryption, ensuring only authorized parties can access the original files. The blockchain only stores cryptographic hashes and metadata, not the actual research content.' },
  { num: '04', title: 'Data Retention', text: 'Your account information is retained for as long as your account is active. Blockchain records are permanent and cannot be deleted due to the immutable nature of the technology. Research documents stored on IPFS are retained indefinitely to ensure ongoing verification.' },
  { num: '05', title: 'Your Rights', text: 'You have the right to access, update, or delete your personal information at any time through your account settings. You can request a copy of all data associated with your account. For privacy-related inquiries, contact our data protection officer at privacy@damietta-ip.edu.eg.' },
  { num: '06', title: 'Third-Party Sharing', text: 'We do not share your personal information with third parties except as required by law or with your explicit consent. The verification portal displays only the information necessary for authenticity verification — research hash, timestamp, and ownership — and does not expose your personal contact details.' },
]

export default function Privacy() {
  return (
    <>
      <div className="page-header">
        <h1>Privacy Policy</h1>
        <p>How Damietta University collects, uses, and protects your personal data.</p>
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
