import { useState, useRef, useEffect } from 'react'
import { X, Send, Sparkles } from 'lucide-react'
import { chatWithAI } from '../lib/groq'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function AIAssistant({ context }: { context?: string }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I\'m your AI assistant. Ask me anything about the IP Portal.' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }])
    setLoading(true)
    try {
      const reply = await chatWithAI(userMsg, context)
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `⚠️ ${e?.message || 'Connection error. Make sure VITE_GROQ_API_KEY is set in .env'}` },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#2563EB] px-5 py-3 text-white shadow-lg transition-all hover:bg-[#1d4ed8] hover:scale-105"
        >
          <Sparkles size={18} />
          <span className="text-sm font-medium">AI Assistant</span>
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 flex w-[360px] flex-col rounded-2xl bg-[#0F172A] shadow-2xl border border-white/10 overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-[#14B8A6]" />
              <span className="text-sm font-semibold text-white">AI Assistant</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white">
              <X size={18} />
            </button>
          </div>

          <div className="flex h-[400px] flex-col gap-3 overflow-y-auto p-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#2563EB] text-white'
                      : 'bg-white/10 text-gray-200'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-xl bg-white/10 px-3 py-2 text-sm text-gray-400">
                  <span className="animate-pulse">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-white/10 p-3">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask anything..."
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-[#2563EB]"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2563EB] text-white transition hover:bg-[#1d4ed8] disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
