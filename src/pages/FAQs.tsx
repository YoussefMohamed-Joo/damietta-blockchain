import FaqItem from '../components/FaqItem'

export default function FAQs() {
  return (
    <>
      <div className="page-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about Damietta IP Portal.</p>
      </div>
      <div className="content-section">
        <div className="content-card" id="faqContainer">
          <FaqItem question="What is Damietta IP Portal?">
            <p>Damietta IP Portal is a blockchain-based digital platform developed by Damietta University to protect, verify, and manage intellectual property rights for student research and graduation projects. It uses cryptographic hashing, decentralized IPFS storage, and blockchain technology to create tamper-proof, verifiable records of academic work. The platform issues digital certificates with QR codes that can be verified by any third party worldwide.</p>
          </FaqItem>
          <FaqItem question="How do I register as a student?">
            <p>To register, go to the Register page and fill in your full name, university email address, and a secure password. Your university email must be the official one provided by Damietta University (typically ending with @du.edu.eg). After registration, you will receive a verification email to confirm your identity. Once verified, you can log in and start submitting your research projects for blockchain certification.</p>
          </FaqItem>
          <FaqItem question="What file formats are supported for upload?">
            <p>The platform supports PDF, Microsoft Word (DOCX), LaTeX source files, and plain text files. Files should not exceed 50 MB in size. For large research projects with multiple files, we recommend combining them into a single PDF with proper table of contents. The system automatically generates a cryptographic hash of the uploaded file and stores an encrypted copy on IPFS for permanent decentralized preservation.</p>
          </FaqItem>
          <FaqItem question="How long does the review process take?">
            <p>The review process typically takes 7 to 14 business days, depending on the faculty committee's workload and the complexity of the research. You can track the status of your submission in real-time through the Student Portal. If revisions are requested, the timeline resets once you resubmit the updated file. Once approved, blockchain minting and certificate generation happen automatically within 24 hours of approval.</p>
          </FaqItem>
          <FaqItem question="Can I verify a research without an account?">
            <p>Yes, absolutely. The verification portal is completely open and does not require any login or account. Anyone — including employers, journal editors, conference organizers, and academic collaborators — can enter a research hash ID or student ID on the Verify Research page to instantly retrieve the blockchain-verified record. This open access is a core feature designed to maximize transparency and trust in Damietta University's academic credentials.</p>
          </FaqItem>
          <FaqItem question="Is my research data secure?">
            <p>Yes, all data is encrypted both in transit and at rest. The uploaded research files are encrypted using AES-256 encryption before being stored on IPFS. The cryptographic hash (SHA-256) is recorded on the blockchain, making it immutable and tamper-proof. Only authorized faculty reviewers and the student themselves can access the original files. The blockchain only stores the hash and metadata, not the full research content, ensuring your intellectual property remains protected.</p>
          </FaqItem>
          <FaqItem question="Can I get a physical certificate?">
            <p>While the primary certificate is digital, you can download and print your blockchain-verified certificate from the Student Portal at any time. The printed certificate includes the QR code that links to the blockchain record, so anyone scanning it can verify authenticity online. For official university-stamped physical copies, please contact your faculty administration office. The digital certificate is internationally recognized and can be shared electronically with institutions worldwide.</p>
          </FaqItem>
        </div>
      </div>
    </>
  )
}
