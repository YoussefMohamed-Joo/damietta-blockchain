export default function FacultyGuide() {
  return (
    <>
      <div className="page-header">
        <h1>Faculty Guide</h1>
        <p>A comprehensive guide for faculty members on reviewing and managing research submissions.</p>
      </div>
      <div className="content-section"><div className="content-card">
        <h2>Getting Started</h2>
        <p>As a faculty reviewer, you play a crucial role in the Damietta IP Portal ecosystem. Your responsibilities include evaluating student research submissions, verifying ownership and originality, and approving projects for blockchain minting. This guide covers everything you need to know to effectively use the platform.</p>
        <h2>Review Dashboard</h2>
        <p>Your review dashboard displays all assigned submissions sorted by priority and deadline. Each submission shows the student's name, project title, submission date, and current status. You can filter submissions by department, date range, or status to efficiently manage your workload.</p>
        <h2>Evaluation Process</h2>
        <p>When reviewing a submission, you can access the uploaded research document, view the automatically generated cryptographic hash, and verify ownership details. Provide feedback, request revisions, or approve the submission for minting. All actions are recorded on the blockchain for full transparency.</p>
        <h2>Committee Collaboration</h2>
        <p>For complex submissions, the platform supports multi-reviewer evaluation workflows. Committee members can discuss submissions through the built-in messaging system and submit individual or collective approval decisions. The system tracks all reviewer actions for audit purposes.</p>
      </div></div>
    </>
  )
}
