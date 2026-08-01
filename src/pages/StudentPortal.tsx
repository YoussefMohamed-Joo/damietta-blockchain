export default function StudentPortal() {
  return (
    <>
      <div className="page-header">
        <h1>Student Portal</h1>
        <p>Your central hub for managing research submissions and blockchain certificates.</p>
      </div>
      <div className="content-section"><div className="content-card">
        <h2>Dashboard Overview</h2>
        <p>The Student Portal provides a comprehensive dashboard where you can track all your research submissions, view verification status, download digital certificates, and manage your account settings. Each submission is displayed with its current status — Draft, Under Review, Revisions Required, Approved, or Minted.</p>
        <h2>Submit New Research</h2>
        <p>Upload your graduation project or research paper directly through the portal. The system supports PDF, DOCX, and LaTeX formats with a maximum file size of 50 MB. Once uploaded, the platform automatically generates a cryptographic hash and initiates the faculty review workflow.</p>
        <h2>Track Submission Status</h2>
        <p>Monitor the progress of your submissions in real-time. Receive notifications when your research moves through each stage of the review process. If revisions are requested, you'll see detailed feedback from faculty reviewers and can resubmit updated files directly.</p>
        <h2>Download Certificates</h2>
        <p>Once your research is approved and minted on the blockchain, you can download your digital certificate directly from the portal. The certificate includes a QR code that links to the blockchain record, making it verifiable by any third party worldwide.</p>
      </div></div>
    </>
  )
}
