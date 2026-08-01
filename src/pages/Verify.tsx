import { Search } from 'lucide-react'

export default function Verify() {
  return (
    <>
      <div className="page-header">
        <h1>Verify Research</h1>
        <p>Enter the Research Hash ID or Student ID to instantly verify authenticity.</p>
      </div>
      <div className="content-section">
        <div className="search-glass" style={{ marginBottom: '3rem' }}>
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input type="text" placeholder="Enter Research Hash ID or Student ID (e.g. 0x7f8a...)" className="ml-3" />
          <button className="search-btn">Verify Now</button>
        </div>
      </div>
      <div className="content-section" style={{ paddingTop: 0 }}>
        <div className="content-card">
          <h2>How Verification Works</h2>
          <p>The verification system uses the cryptographic hash stored on the blockchain to confirm the authenticity of a research document. When you enter a hash ID, the system looks up the corresponding blockchain record and returns the verification status, timestamp, and ownership details.</p>
          <p>This verification is completely open and does not require any login or account. Anyone with a hash ID can verify a research paper's authenticity instantly, making it ideal for employers, journal editors, conference organizers, and academic collaborators.</p>
          <h2>What You Can Verify</h2>
          <p>You can verify the authenticity of any research paper or graduation project registered on the Damietta IP Portal. The verification result includes the registered owner's name, the submission date, the faculty and department, and the blockchain transaction ID.</p>
        </div>
      </div>
    </>
  )
}
