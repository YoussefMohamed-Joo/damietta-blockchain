import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY || '',
  dangerouslyAllowBrowser: true,
})

export async function chatWithAI(
  message: string,
  context?: string
): Promise<string> {
  const systemPrompt = context
    ? `You are an AI assistant for Damietta IP Portal, a blockchain research protection platform at Damietta University. Context: ${context}`
    : `You are an AI assistant for Damietta IP Portal, a blockchain research protection platform at Damietta University. Help users with questions about research protection, blockchain, intellectual property, and platform features. Be concise and helpful. Only respond in clear Arabic or English. Never output random characters, symbols, or non-sensical text.`

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.2,
      max_tokens: 500,
    })

    return completion.choices[0]?.message?.content || 'No response generated.'
  } catch (error) {
    console.error('Groq API error:', error)
    throw error
  }
}
