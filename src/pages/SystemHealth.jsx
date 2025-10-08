import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

export default function PredictiveMonitoring() {
  const predictionAccuracy = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    t: `t${i}`,
    accuracy: Math.round(85 + Math.sin(i/5) * 10 + Math.random() * 5)
  })), [])

  const systemReliability = useMemo(() => Array.from({ length: 14 }, (_, i) => ({
    day: `D${i+1}`,
    reliability: Math.round(95 + Math.random() * 3)
  })), [])

  const tiles = [
    { k: 'Entity Resolution', v: 'Operational', c: 'text-emerald-500' },
    { k: 'Data Integration', v: 'Stable', c: 'text-emerald-500' },
    { k: 'ML Predictions', v: 'Nominal', c: 'text-emerald-500' },
    { k: 'Security Alerts', v: 'Active', c: 'text-amber-400' },
  ]

  return (
    <div className="space-y-6">
      <div className="text-2xl font-semibold tracking-tight">Predictive Monitoring</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4" role="status">
        {tiles.map(t => (
          <div key={t.k} className="rounded-xl p-4 bg-white dark:bg-mining-card border border-white/10">
            <div className="text-xs text-gray-500">{t.k}</div>
            <div className={`text-lg font-semibold ${t.c}`}>{t.v}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl bg-white dark:bg-mining-card p-4 border border-white/10">
          <div className="font-medium mb-2">Prediction Accuracy (%)</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={predictionAccuracy}>
                <XAxis dataKey="t" stroke="currentColor" opacity={0.6} />
                <YAxis stroke="currentColor" opacity={0.6} />
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <Tooltip />
                <Line dataKey="accuracy" stroke="#22d3ee" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl bg-white dark:bg-mining-card p-4 border border-white/10">
          <div className="font-medium mb-2">System Reliability (%)</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={systemReliability}>
                <defs>
                  <linearGradient id="uptime" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#a78bfa" stopOpacity={0.02}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="currentColor" opacity={0.6} />
                <YAxis stroke="currentColor" opacity={0.6} domain={[95, 100]} />
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <Tooltip />
                <Area dataKey="reliability" stroke="#a78bfa" fill="url(#uptime)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
