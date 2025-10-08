import { useEffect, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Activity, Database, Shield, Sun, Gauge } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

function useLiveNumber(initial, minDelta, maxDelta, min=0, max=999999) {
  const [value, setValue] = useState(initial)
  useEffect(() => {
    const t = setInterval(() => {
      setValue(v => {
        const delta = (Math.random() * (maxDelta - minDelta) + minDelta) * (Math.random() > 0.5 ? 1 : -1)
        const next = Math.max(min, Math.min(max, v + delta))
        return Math.round(next)
      })
    }, 1200)
    return () => clearInterval(t)
  }, [])
  return value
}

function Card({ icon: Icon, title, value, suffix }) {
  return (
    <div className="rounded-xl bg-white dark:bg-mining-card p-4 shadow-soft border border-gray-100 dark:border-white/5">
      <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
        <Icon className="text-mining-accent" size={18} />
        <span>{title}</span>
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{value}{suffix}</div>
    </div>
  )
}

export default function Dashboard() {
  const totalSolar = useLiveNumber(125000, 100, 800, 100000, 300000)
  const dieselSaved = useLiveNumber(830, 1, 5, 600, 2000)
  const costSaved = useLiveNumber(215000, 500, 2000, 150000, 600000)
  const carbonReduced = useLiveNumber(72, 0.1, 0.6, 50, 200)
  const totalDewatered = useLiveNumber(12800, 5, 40, 8000, 50000)
  const solarKW = useLiveNumber(420, 5, 20, 100, 800)
  const activePumps = useLiveNumber(11, 0, 1, 0, 16)
  const waterDepth = useLiveNumber(38, 0.1, 0.6, 15, 60)

  const timeSeries = useMemo(() => {
    const now = Date.now()
    return Array.from({ length: 24 }, (_, i) => {
      const t = new Date(now - (23 - i) * 60 * 60 * 1000)
      return {
        time: `${t.getHours()}:00`,
        solar: Math.max(0, Math.sin((i / 24) * Math.PI) * 600 + Math.random() * 40),
        pump: 200 + Math.random() * 80 + (i % 3 === 0 ? 40 : 0),
        level: 40 - Math.sin((i / 12) * Math.PI) * 6 + Math.random() * 1.5,
      }
    })
  }, [])

  const mode = solarKW > 300 ? 'Solar' : solarKW > 150 ? 'Hybrid' : 'Grid'

  return (
    <div className="space-y-8 p-4 md:p-6 max-w-full overflow-x-hidden">
      {/* Ethos Hackathon Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-purple-300/50 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-6 md:p-8 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-sm font-medium">Live Event</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
            ETHOS HACKATHON
          </h1>
          <p className="text-xl md:text-2xl font-semibold mb-4 text-blue-100">
            IIT Guwahati
          </p>
          <p className="text-base md:text-lg text-blue-100 max-w-2xl mx-auto">
            Building the future of campus data integration with AI-powered solutions
          </p>
         
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 shadow-soft bg-gradient-to-br from-amber-100 via-white to-white dark:from-amber-500/10 dark:via-mining-card dark:to-mining-card p-6 md:p-8">
        <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="absolute -left-10 -bottom-10 w-56 h-56 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="relative">
          <div className="text-xs uppercase tracking-wider text-amber-700/70 dark:text-amber-300">Welcome to</div>
          <div className="mt-1 text-3xl md:text-4xl font-extrabold tracking-tight">Campus Data Integration System</div>
          <div className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-300 ">Connecting silos, unifying insights. Track activities of students, staff, and assets across multiple data sources with predictive capabilities.</div>
          <div className="mt-5 flex items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-white/10 border border-gray-200 dark:border-white/10 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live System
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-white/10 border border-gray-200 dark:border-white/10 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400" /> AI-Powered
            </span>
          </div>
          <div className="mt-6 flex justify-center">
            <a href="#plan" className="px-6 py-3 rounded-xl bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 hover:bg-neon-cyan/30 transition shadow-glow text-sm md:text-base">
              View System Architecture
            </a>
          </div>
        </div>
      </div>

      {/* Live Monitoring - moved to top */}
      <div className="rounded-xl bg-white dark:bg-mining-card p-4 shadow-soft border border-gray-100 dark:border-white/5 space-y-3">
        <div className="font-medium">Live Monitoring</div>
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="p-3 rounded-lg bg-gray-50 dark:bg-white/5">
            <div className="text-gray-500">Active Entities</div>
            <div className="text-xl font-semibold">{waterDepth}</div>
          </div>
          <div className="p-3 rounded-lg bg-gray-50 dark:bg-white/5">
            <div className="text-gray-500">Data Sources</div>
            <div className="text-xl font-semibold">{activePumps}/16</div>
          </div>
          <div className="p-3 rounded-lg bg-gray-50 dark:bg-white/5">
            <div className="text-gray-500">Confidence Score</div>
            <div className="text-xl font-semibold">{solarKW}%</div>
          </div>
        </div>
        <div className="h-28">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeries.slice(-12)} margin={{ left: 8, right: 8, top: 10 }}>
              <XAxis dataKey="time" hide />
              <YAxis hide />
              <Line dataKey="level" stroke="#60a5fa" dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>



      {/* Mode + KPIs (moved up) */}
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2 py-1 rounded-md text-xs border border-amber-300/40 bg-amber-100/40 text-amber-700 dark:bg-amber-400/10 dark:text-amber-200">Mode: {mode}</span>
        </div>

        <div className="mt-3 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <NavLink to="/solar" className="block hover:-translate-y-0.5 transition-transform" aria-label="Entities Resolved">
            <Card icon={Database} title="Entities Resolved" value={totalSolar.toLocaleString()} suffix="" />
          </NavLink>
          <NavLink to="/reports" className="block hover:-translate-y-0.5 transition-transform" aria-label="Anomalies Detected">
            <Card icon={Activity} title="Anomalies Detected" value={dieselSaved.toLocaleString()} suffix="" />
          </NavLink>
          <NavLink to="/reports" className="block hover:-translate-y-0.5 transition-transform" aria-label="Security Alerts">
            <Card icon={Shield} title="Security Alerts" value={`${costSaved.toLocaleString()}`} />
          </NavLink>
          <NavLink to="/reports" className="block hover:-translate-y-0.5 transition-transform" aria-label="Predictions Generated">
            <Card icon={Sun} title="Predictions Generated" value={carbonReduced.toLocaleString()} suffix="" />
          </NavLink>
          <NavLink to="/pumps" className="block hover:-translate-y-0.5 transition-transform" aria-label="Data Points Processed">
            <Card icon={Database} title="Data Points Processed" value={totalDewatered.toLocaleString()} suffix="" />
          </NavLink>
        </div>
      </div>

      

      
      

      <div className="grid gap-6 grid-cols-1">
        <div className="rounded-xl bg-white dark:bg-mining-card p-4 shadow-soft border border-gray-100 dark:border-white/5">
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium flex items-center gap-2">Entity Resolution Activity <span className="text-[10px] px-2 py-0.5 rounded-full bg-neon-violet/10 text-neon-violet border border-neon-violet/30">Area</span></div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeSeries} margin={{ left: 8, right: 8, top: 10 }}>
                <defs>
                  <linearGradient id="solarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f5ad42" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f5ad42" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="time" stroke="currentColor" opacity={0.6} />
                <YAxis stroke="currentColor" opacity={0.6} />
                <Tooltip />
                <Area type="monotone" dataKey="solar" stroke="#f5ad42" fill="url(#solarGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="rounded-xl bg-white dark:bg-mining-card p-4 shadow-soft border border-gray-100 dark:border-white/5">
          <div className="font-medium mb-2 flex items-center gap-2">Data Processing Load <span className="text-[10px] px-2 py-0.5 rounded-full bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30">Line</span></div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeries}>
                <XAxis dataKey="time" stroke="currentColor" opacity={0.6} />
                <YAxis stroke="currentColor" opacity={0.6} />
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <Tooltip />
                <Line type="monotone" dataKey="pump" stroke="#34d399" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl bg-white dark:bg-mining-card p-4 shadow-soft border border-gray-100 dark:border-white/5">
          <div className="font-medium mb-2 flex items-center gap-2">Confidence Score Trend <span className="text-[10px] px-2 py-0.5 rounded-full bg-neon-pink/10 text-neon-pink border border-neon-pink/30">Line</span></div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeries}>
                <XAxis dataKey="time" stroke="currentColor" opacity={0.6} />
                <YAxis stroke="currentColor" opacity={0.6} />
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <Tooltip />
                <Line type="monotone" dataKey="level" stroke="#60a5fa" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Project plan - moved to bottom */}
      <div id="plan" className="rounded-2xl border border-white/10 bg-gradient-to-br from-neon-violet/10 to-neon-cyan/10 p-5 md:p-6">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">System Architecture</div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-white/50 dark:bg-white/10 border border-white/20">Showcase Ready</span>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl bg-white/70 dark:bg-mining-card p-4 border border-white/20">
            <div className="font-medium mb-1">Entity Resolution</div>
            <ul className="text-sm list-disc ml-4 space-y-1 text-gray-600 dark:text-gray-300">
              <li>Multi-identifier matching</li>
              <li>Confidence scoring</li>
              <li>Cross-source linking</li>
            </ul>
          </div>
          <div className="rounded-xl bg-white/70 dark:bg-mining-card p-4 border border-white/20">
            <div className="font-medium mb-1">Data Integration</div>
            <ul className="text-sm list-disc ml-4 space-y-1 text-gray-600 dark:text-gray-300">
              <li>Structured & unstructured data</li>
              <li>Visual data processing</li>
              <li>Real-time streaming</li>
            </ul>
          </div>
          <div className="rounded-xl bg-white/70 dark:bg-mining-card p-4 border border-white/20">
            <div className="font-medium mb-1">Timeline Generation</div>
            <ul className="text-sm list-disc ml-4 space-y-1 text-gray-600 dark:text-gray-300">
              <li>Activity reconstruction</li>
              <li>ML-based gap filling</li>
              <li>Human-readable timelines</li>
            </ul>
          </div>
          <div className="rounded-xl bg-white/70 dark:bg-mining-card p-4 border border-white/20">
            <div className="font-medium mb-1">Predictive Monitoring</div>
            <ul className="text-sm list-disc ml-4 space-y-1 text-gray-600 dark:text-gray-300">
              <li>Anomaly detection</li>
              <li>Behavior prediction</li>
              <li>Explainable AI insights</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="rounded-lg p-4 bg-white dark:bg-white/5 border border-white/10">
            <div className="text-sm text-gray-500">Entity Resolution</div>
            <div className="mt-1 text-sm">72%</div>
            <div className="h-2 mt-2 rounded bg-white/20 overflow-hidden">
              <div className="h-full w-[72%] bg-neon-cyan" />
            </div>
          </div>
          <div className="rounded-lg p-4 bg-white dark:bg-white/5 border border-white/10">
            <div className="text-sm text-gray-500">Data Integration</div>
            <div className="mt-1 text-sm">-58%</div>
            <div className="h-2 mt-2 rounded bg-white/20 overflow-hidden">
              <div className="h-full w-[58%] bg-neon-violet" />
            </div>
          </div>
          <div className="rounded-lg p-4 bg-white dark:bg-white/5 border border-white/10">
            <div className="text-sm text-gray-500">Prediction Accuracy</div>
            <div className="mt-1 text-sm">92% / 95%</div>
            <div className="h-2 mt-2 rounded bg-white/20 overflow-hidden">
              <div className="h-full w-[92%] bg-amber-400" />
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {[
            { t: 'Entity Resolution', s: 100 },
            { t: 'Data Integration', s: 85 },
            { t: 'ML Tuning', s: 70 },
            { t: 'Security Dashboard', s: 90 },
          ].map((m, i) => (
            <div key={i} className="rounded-md p-3 bg-white/70 dark:bg-mining-card border border-white/20">
              <div className="flex items-center justify-between">
                <span>{m.t}</span>
                <span>{m.s}%</span>
              </div>
              <div className="h-1.5 mt-2 rounded bg-white/30 overflow-hidden">
                <div className="h-full" style={{ width: `${m.s}%`, background: 'linear-gradient(90deg,#a78bfa,#22d3ee)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
