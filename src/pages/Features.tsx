import { Hexagon, Award, History, QrCode, Database, UserCheck } from 'lucide-react'
import TypewriterText from '../components/TypewriterText'

export default function Features() {
  const features = [
    { icon: Hexagon, title: 'Blockchain-Based Protection', desc: 'Every research is minted with a unique cryptographic hash on the chain, ensuring permanent, immutable proof of existence. Once recorded, the hash cannot be altered or deleted, providing a verifiable chain of custody for every academic submission.' },
    { icon: Award, title: 'Instant Digital Certificate', desc: 'Upon successful verification and faculty approval, the system automatically generates a blockchain-anchored digital certificate with a unique QR code. This certificate can be shared electronically, printed, or verified by any third party worldwide.' },
    { icon: History, title: 'Tamper-Proof Timestamps', desc: 'Each submission is timestamped using blockchain consensus, creating an immutable record that proves the exact date and time of ownership down to the second. This timestamp is independently verifiable and legally defensible.' },
    { icon: QrCode, title: 'Public Verification Portal', desc: 'Our open verification portal allows anyone — employers, journal editors, conference organizers — to instantly verify a research paper\'s authenticity by entering its unique hash ID or scanning the QR code. No account or login required.' },
    { icon: Database, title: 'Encrypted IPFS File Storage', desc: 'All uploaded research documents are encrypted using AES-256 and stored on the InterPlanetary File System (IPFS), a decentralized storage network. This ensures files remain accessible, uncensorable, and tamper-proof.' },
    { icon: UserCheck, title: 'Committee Review System', desc: 'The platform supports a multi-stage academic review workflow. Assigned faculty reviewers evaluate submissions, request revisions if needed, and approve research for blockchain minting. The entire review history is recorded on-chain.' },
  ]

  return (
    <>
      <div className="page-header">
        <h1>Core Features</h1>
        <p>Everything you need to protect and verify academic research with blockchain technology.</p>
      </div>
      {features.map(({ icon: Icon, title, desc }, idx) => (
        <div className="content-section" key={title}>
          <div className="content-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="icon-wrap"><Icon className="w-7 h-7 text-primary" /></div>
              <h2 style={{ margin: 0, minHeight: '1.4em' }}>
                <TypewriterText text={title} speed={40 + idx * 15} />
              </h2>
            </div>
            <p>{desc}</p>
          </div>
        </div>
      ))}
    </>
  )
}
