import { useMemo, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function PredictiveAnalytics() {
  const [predictionAccuracy, setPredictionAccuracy] = useState(78)
  const [anomalyThreshold, setAnomalyThreshold] = useState(24)

  const analytics = useMemo(() => Array.from({ length: 24 }, (_, i) => ({
    h: `${i}:00`,
    predictions: Math.max(0, Math.sin((i/24)*Math.PI) * (600 + predictionAccuracy) + 50),
    anomalies: 250 + (i%3===0?40:0) + Math.random()*30,
  })), [predictionAccuracy])

  return (
    <div className="space-y-6">
      <div className="text-2xl font-semibold tracking-tight">Predictive Analytics</div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-xl bg-white dark:bg-mining-card p-4 border border-white/10">
          <div className="font-medium">Prediction Accuracy (%)</div>
          <input type="range" min="50" max="100" value={predictionAccuracy} onChange={e=>setPredictionAccuracy(Number(e.target.value))} className="w-full" />
          <div className="text-sm text-gray-500">Current: {predictionAccuracy}%</div>
        </div>
        <div className="rounded-xl bg-white dark:bg-mining-card p-4 border border-white/10">
          <div className="font-medium">Anomaly Threshold (%)</div>
          <input type="range" min="0" max="60" value={anomalyThreshold} onChange={e=>setAnomalyThreshold(Number(e.target.value))} className="w-full" />
          <div className="text-sm text-gray-500">Current: {anomalyThreshold}%</div>
        </div>
        <div className="rounded-xl bg-white dark:bg-mining-card p-4 border border-white/10">
          <div className="font-medium">Analytics Notes</div>
          <ul className="text-sm list-disc ml-4 text-gray-600 dark:text-gray-300">
            <li>Increase accuracy on high-confidence patterns</li>
            <li>Adjust threshold during peak activity</li>
            <li>Align predictions to behavioral patterns</li>
          </ul>
        </div>
      </div>

      <div className="rounded-xl bg-white dark:bg-mining-card p-4 border border-white/10">
        <div className="font-medium mb-2">Predictions vs Anomalies</div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytics}>
              <XAxis dataKey="h" stroke="currentColor" opacity={0.6} />
              <YAxis stroke="currentColor" opacity={0.6} />
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <Tooltip />
              <Line dataKey="predictions" stroke="#22d3ee" strokeWidth={2} dot={false} />
              <Line dataKey="anomalies" stroke="#f5ad42" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
