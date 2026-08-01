export default function HowItWorks() {
  const steps = [
    { num: '01', title: 'Student Registration', desc: 'Create your official university account using your student ID or university email address. Verify your identity through the confirmation link sent to your inbox before accessing the platform.' },
    { num: '02', title: 'Upload & Hash Generation', desc: 'Upload your graduation project or research paper in PDF, DOCX, or LaTeX format. The system automatically generates a unique SHA-256 cryptographic hash of your file and stores an encrypted copy on IPFS.' },
    { num: '03', title: 'Faculty Review', desc: 'Your submission is assigned to a faculty review committee. Reviewers evaluate the research, verify ownership, and either approve or request revisions. You can track the review progress in real-time.' },
    { num: '04', title: 'Blockchain Minting', desc: 'Once approved, the research hash is permanently recorded on the blockchain. You receive a digital certificate with a QR code that links to the blockchain record, verifiable by anyone worldwide.' },
  ]

  return (
    <>
      <div className="page-header">
        <h1>How It Works</h1>
        <p>Four simple steps to protect your research with blockchain technology.</p>
      </div>
      {steps.map(({ num, title, desc }) => (
        <div className="content-section" key={num}>
          <div className="content-card">
            <div className="flex items-center gap-4 mb-4">
              <div className="step-number">{num}</div>
              <h2 style={{ margin: 0 }}>{title}</h2>
            </div>
            <p>{desc}</p>
          </div>
        </div>
      ))}
    </>
  )
}
