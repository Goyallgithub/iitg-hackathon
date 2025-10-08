import { useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts'

const COLORS = ['#f5ad42', '#60a5fa', '#34d399']

export default function DataIntegration() {
  const dataSources = useMemo(() => Array.from({ length: 4 }, (_, i) => ({
    id: `DS-${i + 1}`,
    name: ['Wi-Fi Logs', 'Card Swipes', 'Library Checkouts', 'CCTV Footage'][i],
    records: Math.round(1500 + i * 500 + Math.random() * 200),
    integration: Math.round(75 + Math.random() * 20),
  })), [])

  const pie = [
    { name: 'Structured Data', value: 45 },
    { name: 'Unstructured Data', value: 35 },
    { name: 'Visual Data', value: 20 },
  ]

  const daily = useMemo(() => Array.from({ length: 14 }, (_, i) => ({
    day: `D${i + 1}`,
    records: Math.round(800 + Math.sin((i / 14) * Math.PI) * 300 + Math.random() * 120),
  })), [])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl bg-white dark:bg-mining-card p-4 shadow-soft border border-gray-100 dark:border-white/5">
          <div className="font-medium mb-2">Daily Data Processing Volume (Records)</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={daily}>
                <XAxis dataKey="day" stroke="currentColor" opacity={0.6} />
                <YAxis stroke="currentColor" opacity={0.6} />
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <Tooltip />
                <Line type="monotone" dataKey="records" stroke="#f5ad42" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl bg-white dark:bg-mining-card p-4 shadow-soft border border-gray-100 dark:border-white/5">
          <div className="font-medium mb-2">Data Type Distribution</div>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pie} dataKey="value" nameKey="name" outerRadius={100} label>
                  {pie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {dataSources.map(ds => (
          <div key={ds.id} className="rounded-xl bg-white dark:bg-mining-card p-4 shadow-soft border border-gray-100 dark:border-white/5">
            <div className="font-semibold">{ds.name}</div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <div className="p-2 rounded-md bg-white/60 dark:bg-white/5 border border-gray-100 dark:border-white/10">Records: <span className="font-medium">{ds.records.toLocaleString()}</span></div>
              <div className="p-2 rounded-md bg-white/60 dark:bg-white/5 border border-gray-100 dark:border-white/10">Integration: <span className="font-medium">{ds.integration}%</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
