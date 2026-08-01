import { useState, useEffect } from 'react'

export default function TypewriterText({ text, speed = 50, className = '' }: { text: string; speed?: number; className?: string }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    setDisplayed('')
    setDone(false)
    const timer = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(timer)
        setDone(true)
      }
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed])

  return (
    <span className={className}>
      {displayed}
      <span className={`inline-block w-[2px] h-[1em] bg-primary ml-0.5 align-middle ${done ? 'animate-blink' : 'animate-pulse'}`} style={{ animationDuration: done ? '1s' : '0.6s' }} />
    </span>
  )
}
