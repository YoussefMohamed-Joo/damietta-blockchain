import { useState } from 'react'

interface FaqItemProps {
  question: string
  children: React.ReactNode
}

export default function FaqItem({ question, children }: FaqItemProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="faq-item">
      <div className={`faq-question ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
        <span>{question}</span>
        <span className="faq-icon">+</span>
      </div>
      <div className={`faq-answer ${open ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  )
}
