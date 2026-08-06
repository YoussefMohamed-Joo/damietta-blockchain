import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { Submission } from '../lib/store'

const COLORS: Record<string, string> = {
  Approved: '#14B8A6',
  Pending: '#F59E0B',
  'Under Review': '#2563EB',
  Rejected: '#EF4444',
}

function SubmissionsChart({ submissions }: { submissions: Submission[] }) {
  const data = Array.from({ length: 12 }, (_, i) => {
    const count = submissions.filter(s => s.month === i + 1).length
    return { month: `${i + 1}`, count }
  })
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
        <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#94A3B8' }} tickLine={false} axisLine={false} />
        <Tooltip cursor={{ fill: 'rgba(37,99,235,.06)' }} contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12 }} />
        <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={30}>
          {data.map((d, i) => (
            <Cell key={i} fill={d.count > 0 ? '#2563EB' : '#E2E8F0'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default function Charts({ submissions }: { submissions: Submission[] }) {
  const statuses = ['Approved', 'Pending', 'Under Review', 'Rejected']
  const pie = statuses.map(s => ({ name: s, value: submissions.filter(x => x.status === s).length })).filter(d => d.value > 0)
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.25rem' }}>
      <div>
        <SubmissionsChart submissions={submissions} />
      </div>
      <div>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={pie} dataKey="value" nameKey="name" innerRadius={45} outerRadius={85} paddingAngle={3} stroke="none">
              {pie.map((d, i) => <Cell key={i} fill={COLORS[d.name] || '#94A3B8'} />)}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 12 }} />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.6rem 1rem', justifyContent: 'center', marginTop: '.25rem' }}>
          {pie.map(d => (
            <span key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '.72rem', color: '#475569' }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: COLORS[d.name] || '#94A3B8' }} />
              {d.name} ({d.value})
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
