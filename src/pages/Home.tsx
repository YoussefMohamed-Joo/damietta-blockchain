import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FileCheck2, BookOpen, Shield, Building, Hexagon, Award, History, QrCode, Database, UserCheck, Search, XCircle, CheckCircle, FileText } from 'lucide-react'

export default function Home() {
  useEffect(() => {
    const els = document.querySelectorAll('.stat-number')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement
          const target = parseInt(el.getAttribute('data-target') || '0')
          const suffix = target === 100 ? '%' : '+'
          let cur = 0
          const inc = target / (2000 / 16)
          const timer = setInterval(() => {
            cur += inc
            if (cur >= target) {
              el.textContent = target + suffix
              clearInterval(timer)
            } else {
              el.textContent = Math.floor(cur) + suffix
            }
          }, 16)
          obs.unobserve(el)
        }
      })
    }, { threshold: 0.5 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('.animate-on-scroll')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.15 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <div className="w-full relative">
        <img src="/img/img-hero3.png" alt="" className="w-full h-auto block select-none" draggable="false" style={{ userSelect: 'none', WebkitUserSelect: 'none', WebkitTouchCallout: 'none' }} onContextMenu={e => e.preventDefault()} />
        <div className="absolute bottom-[8%] sm:bottom-[10%] lg:bottom-[12%] right-[5%] sm:right-[6%] lg:right-[8%] z-10 flex flex-col gap-3 sm:gap-4 items-end pointer-events-auto">
          <Link to="/register" className="hero-btn hero-btn-primary text-xs sm:text-sm lg:text-base px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-2.5">Register</Link>
          <Link to="/verify" className="hero-btn hero-btn-outline text-xs sm:text-sm lg:text-base px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-2.5">Verify Research</Link>
        </div>
      </div>

      <div className="gradient-orb w-[500px] h-[500px] -top-40 -left-40 hidden lg:block" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.14) 0%, rgba(59,130,246,0.06) 45%, transparent 72%)' }}></div>
      <div className="gradient-orb w-[400px] h-[400px] bottom-20 right-10" style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.14) 0%, rgba(20,184,166,0.06) 45%, transparent 72%)' }}></div>

      <section>
        <div className="stats-glass mx-auto max-w-5xl px-6 sm:px-10 py-8 sm:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { target: 1250, icon: FileCheck2, label: 'Protected Projects' },
              { target: 850, icon: BookOpen, label: 'Registered Researchers' },
              { target: 100, icon: Shield, label: 'Tamper-Proof Records' },
              { target: 12, icon: Building, label: 'Faculties & Departments' },
            ].map(({ target, icon: Icon, label }) => (
              <div className="text-center" key={label}>
                <div className="stat-number" data-target={target}>0</div>
                <div className="flex items-center justify-center gap-1.5 mt-1.5">
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-slate-600">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features">
        <h2 className="section-title">Core Features</h2>
        <p className="section-sub">Everything you need to protect and verify academic research with blockchain technology.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {[
            { icon: Hexagon, title: 'Blockchain-Based Protection', desc: 'Every research is minted with a unique cryptographic hash on the chain.' },
            { icon: Award, title: 'Instant Digital Certificate', desc: 'Issue verifiable QR-coded certificates for every accepted research project.' },
            { icon: History, title: 'Tamper-Proof Timestamps', desc: 'Immutable record proving exact ownership date and time down to the second.' },
            { icon: QrCode, title: 'Public Verification Portal', desc: 'Anyone, including employers and universities, can verify paper authenticity instantly.' },
            { icon: Database, title: 'Encrypted IPFS File Storage', desc: 'Decentralized document storage ensuring files are never lost or modified.' },
            { icon: UserCheck, title: 'Committee Review System', desc: 'Multi-stage academic approval workflow before minting the final hash.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div className="glass-card feature-card animate-on-scroll" key={title}>
              <div className="icon-wrap"><Icon className="w-7 h-7 text-primary" /></div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <p className="section-sub">Four simple steps to protect your research with blockchain technology.</p>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { num: '01', title: 'Student Registration', desc: 'Create your official university account using your student ID or university email.' },
            { num: '02', title: 'Upload & Hash Generation', desc: 'Upload your graduation project and the system generates a unique digital fingerprint (SHA-256 Hash).' },
            { num: '03', title: 'Faculty Review', desc: 'The evaluation committee and the university review and verify research ownership.' },
            { num: '04', title: 'Blockchain Minting', desc: 'Register the research on the blockchain and issue an IP certificate with QR Code.' },
          ].map(({ num, title, desc }) => (
            <div className="step-card flex flex-col items-center text-center animate-on-scroll" key={num}>
              <div className="step-number">{num}</div>
              <div className="step-line"></div>
              <h3 className="font-bold text-slate-800 mt-4 mb-2 text-base">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="comparison">
        <h2 className="section-title">Why Choose Damietta IP Portal?</h2>
        <p className="section-sub">See how blockchain-powered protection outperforms traditional paper-based methods.</p>
        <div className="flex flex-col lg:flex-row gap-6 max-w-5xl mx-auto">
          <div className="comparison-card traditional animate-on-scroll" style={{ transitionDelay: '0s' }}>
            <div className="flex items-center gap-3 mb-5"><FileText className="w-6 h-6 text-red-400" /><h3 className="font-bold text-slate-700 text-lg">Traditional Paper Process</h3></div>
            <ul>
              {['Documents prone to loss or damage','Risk of idea theft or alteration','Difficulty proving ownership date','Takes months for official certification'].map(t => (
                <li key={t}><XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" /><span>{t}</span></li>
              ))}
            </ul>
          </div>
          <div className="comparison-card modern animate-on-scroll" style={{ transitionDelay: '.2s' }}>
            <div className="flex items-center gap-3 mb-5"><CheckCircle className="w-6 h-6 text-teal-500" /><h3 className="font-bold text-slate-800 text-lg">Damietta IP Portal</h3></div>
            <ul>
              {['Instant verification upon upload','Immutable and theft-proof with SHA-256 encryption','Global digital certificate with QR Code','Free verification for any third party'].map(t => (
                <li key={t}><CheckCircle className="w-5 h-5 text-teal-500 mt-0.5 shrink-0" /><span>{t}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="verify">
        <h2 className="section-title">Verify a Research</h2>
        <p className="section-sub">Enter the Research Hash ID or Student ID to instantly verify authenticity.</p>
        <div className="search-glass animate-on-scroll">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input type="text" placeholder="Enter Research Hash ID or Student ID (e.g. 0x7f8a...)" className="ml-3" />
          <Link to="/verify" className="search-btn">Verify Now</Link>
        </div>
      </section>
    </>
  )
}
