import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts'

export default function TimelineGeneration() {
  const data = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
    t: `T${i}`,
    actual: Math.round(400 + Math.sin((i / 10) * Math.PI) * 120 + Math.random() * 50),
    predicted: Math.round(410 + Math.sin((i / 10) * Math.PI) * 110 + Math.random() * 40),
    low: Math.round(380 + Math.sin((i / 10) * Math.PI) * 100),
    high: Math.round(460 + Math.sin((i / 10) * Math.PI) * 120),
  })), [])

  const forecast = useMemo(() => Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}h`,
    activities: Math.round(300 + Math.sin((i / 24) * Math.PI) * 120 + Math.random() * 40),
  })), [])

  // Simulated solar elevation angle (°) over 24h for visualization
  const solarAngle = useMemo(() => Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}h`,
    angle: Math.max(0, Math.round(Math.sin((i / 24) * Math.PI) * 75 + (Math.random() * 4 - 2)))
  })), [])

  const features = [
    { name: 'Location Data', importance: 0.32 },
    { name: 'Time Patterns', importance: 0.22 },
    { name: 'Access Logs', importance: 0.17 },
    { name: 'Device Usage', importance: 0.12 },
    { name: 'Social Patterns', importance: 0.09 },
    { name: 'Historical Data', importance: 0.08 },
  ]

  const matrix = useMemo(() => Array.from({ length: 8 }, (_, r) => (
    Array.from({ length: 12 }, (_, c) => ({
      key: `r${r}c${c}`,
      value: Math.round(40 + Math.sin((r+c)/4) * 30 + Math.random() * 20)
    }))
  )), [])

  const last = data[data.length - 1]
  const saved = Math.max(0, last.predicted - last.actual)

  const epochs = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    e: i + 1,
    loss: Number((0.9 ** (i/2) + Math.random() * 0.05).toFixed(3)),
  })), [])

  return (
    <div className="space-y-8">
      <div className="rounded-xl bg-white dark:bg-mining-card p-4 border border-white/10">
        <div className="text-lg font-semibold">How Campus Data Integration generates activity timelines</div>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          We combine multiple data sources to reconstruct complete activity timelines and predict future behaviors using explainable AI.
        </div>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-5 gap-2 text-xs">
          <div className="px-3 py-2 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-center">Ingest: Multi-Source Data</div>
          <div className="px-3 py-2 rounded-full bg-white/40 dark:bg-white/5 border border-white/20 text-center">Entity Resolution</div>
          <div className="px-3 py-2 rounded-full bg-neon-violet/10 border border-neon-violet/30 text-neon-violet text-center">Timeline Reconstruction</div>
          <div className="px-3 py-2 rounded-full bg-amber-100/40 dark:bg-amber-400/10 border border-amber-300/40 text-amber-600 dark:text-amber-200 text-center">Predict (ML)</div>
          <div className="px-3 py-2 rounded-full bg-white/40 dark:bg-white/5 border border-white/20 text-center">Generate Insights</div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-xl bg-white dark:bg-mining-card p-4 shadow-soft border border-gray-100 dark:border-white/5">
          <div className="text-sm text-gray-500">Predicted Activity Events</div>
          <div className="mt-1 text-3xl font-semibold">{saved.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Based on last cycle</div>
        </div>
        <div className="rounded-xl bg-white dark:bg-mining-card p-4 shadow-soft border border-gray-100 dark:border-white/5">
          <div className="text-sm text-gray-500">Confidence</div>
          <div className="mt-1 text-3xl font-semibold">92%</div>
          <div className="text-xs text-gray-500">95% interval displayed</div>
        </div>
        <div className="rounded-xl bg-white dark:bg-mining-card p-4 shadow-soft border border-gray-100 dark:border-white/5">
          <div className="text-sm text-gray-500">Next 24h Forecast Avg</div>
          <div className="mt-1 text-3xl font-semibold">{Math.round(forecast.reduce((a,b)=>a+b.activities,0)/forecast.length)} events</div>
          <div className="text-xs text-gray-500">Auto-updating hourly</div>
        </div>
      </div>

      <div className="rounded-xl bg-white dark:bg-mining-card p-4 shadow-soft border border-gray-100 dark:border-white/5">
        <div className="font-medium mb-2">Predicted vs Actual Activity Events</div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="t" stroke="currentColor" opacity={0.6} />
              <YAxis stroke="currentColor" opacity={0.6} />
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <Tooltip />
              <Line name="Actual" dataKey="actual" stroke="#60a5fa" strokeWidth={2} dot={false} />
              <Line name="Predicted" dataKey="predicted" stroke="#34d399" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="h-24 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="conf" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0.02}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="t" hide />
              <YAxis hide />
              <Area name="Upper band" dataKey="high" stroke="transparent" fill="url(#conf)" />
              <Area name="Lower band" dataKey="low" stroke="transparent" fill="#0000" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="rounded-xl bg-white dark:bg-mining-card p-4 shadow-soft border border-gray-100 dark:border-white/5">
          <div className="font-medium mb-2">Feature Importance</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={features} layout="vertical" margin={{ left: 40 }}>
                <XAxis type="number" hide domain={[0, 0.4]} />
                <YAxis type="category" dataKey="name" width={140} />
                <Tooltip />
                <Bar dataKey="importance" fill="#a78bfa" radius={[4,4,4,4]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl bg-white dark:bg-mining-card p-4 shadow-soft border border-gray-100 dark:border-white/5">
          <div className="font-medium mb-2">Next 24h Activity Forecast</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecast}>
                <XAxis dataKey="hour" stroke="currentColor" opacity={0.6} />
                <YAxis stroke="currentColor" opacity={0.6} />
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <Tooltip />
                <Line dataKey="activities" stroke="#22d3ee" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="text-xs text-gray-500 mt-2">Hook up your ML API here later.</div>
        </div>
      </div>

      <div className="rounded-xl bg-white dark:bg-mining-card p-4 shadow-soft border border-gray-100 dark:border-white/5">
        <div className="font-medium mb-1">Activity Pattern Analysis</div>
        <div className="text-xs text-gray-500 mb-2">Higher activity levels generally indicate normal campus behavior patterns and help identify anomalies.</div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={solarAngle}>
              <XAxis dataKey="hour" stroke="currentColor" opacity={0.6} />
              <YAxis stroke="currentColor" opacity={0.6} domain={[0, 90]} />
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <Tooltip />
              <Line name="Activity Level" dataKey="angle" stroke="#f59e0b" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl p-4 border border-white/10 bg-gradient-to-br from-neon-violet/10 to-neon-cyan/10">
        <div className="font-medium mb-2">Correlation Matrix</div>
        <div className="grid" style={{gridTemplateColumns: `repeat(${12}, minmax(0,1fr))`}}>
          {matrix.flat().map((cell, idx) => (
            <div key={cell.key} className="aspect-square rounded-sm m-[1px]" style={{
              background: `linear-gradient(180deg, rgba(167,139,250,${cell.value/120}), rgba(34,211,238,${cell.value/140}))`
            }} />
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl bg-white dark:bg-mining-card p-4 shadow-soft border border-gray-100 dark:border-white/5">
          <div className="font-medium mb-2">Training Curve (Loss ↓ over epochs)</div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={epochs}>
                <XAxis dataKey="e" stroke="currentColor" opacity={0.6} />
                <YAxis stroke="currentColor" opacity={0.6} domain={[0, 1.2]} />
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <Tooltip />
                <Line name="Loss" dataKey="loss" stroke="#a78bfa" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="text-xs text-gray-500 mt-2">Lower loss means the model is learning patterns that better fit historical data.</div>
        </div>
        <div className="rounded-xl bg-white dark:bg-mining-card p-4 shadow-soft border border-gray-100 dark:border-white/5">
          <div className="font-medium mb-1">In plain English</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">We analyze location data, access patterns, and device usage to reconstruct complete activity timelines. The model learns behavioral patterns and predicts future activities with confidence intervals. This helps identify anomalies and missing entities across campus data sources.</div>
        </div>
      </div>
    </div>
  )
}
