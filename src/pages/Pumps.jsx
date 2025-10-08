import { useMemo, useState } from 'react'
import { Power, Filter, Database, User, Mail, CreditCard, Camera, Hash } from 'lucide-react'

function Toggle({ checked, onChange }) {
  return (
    <button onClick={() => onChange(!checked)} className={`px-3 py-1 rounded-md text-sm border transition ${checked ? 'bg-green-600 text-white border-green-600' : 'bg-red-600 text-white border-red-600'}`}>
      {checked ? 'Active' : 'Inactive'}
    </button>
  )
}

const TYPES = ['student','staff','visitor']

export default function EntityResolution() {
  const [entities, setEntities] = useState(() => Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    type: i % 3 === 0 ? 'visitor' : i % 2 === 0 ? 'staff' : 'student',
    studentId: i % 3 === 0 ? null : `STU${String(i).padStart(4, '0')}`,
    email: `user${i+1}@campus.edu`,
    cardId: `CARD${String(i+1).padStart(6, '0')}`,
    deviceHash: `DEV${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
    confidence: Math.round(75 + Math.random() * 20),
    active: Math.random() > 0.3,
  })))
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [sortBy, setSortBy] = useState('id')

  const filtered = useMemo(() => {
    let arr = entities
    if (statusFilter !== 'all') arr = arr.filter(e => e.active === (statusFilter === 'active'))
    if (typeFilter !== 'all') arr = arr.filter(e => e.type === typeFilter)
    if (sortBy === 'confidence') arr = [...arr].sort((a,b) => b.confidence - a.confidence)
    if (sortBy === 'id') arr = [...arr].sort((a,b) => a.id - b.id)
    return arr
  }, [entities, statusFilter, typeFilter, sortBy])

  const toggleEntity = (id, value) => {
    setEntities(prev => prev.map(e => e.id === id ? { ...e, active: value } : e))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 text-sm">
          <Filter size={16} />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-2 py-1 rounded-md bg-white dark:bg-mining-card border border-gray-200 dark:border-white/10">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-2 py-1 rounded-md bg-white dark:bg-mining-card border border-gray-200 dark:border-white/10">
            <option value="all">All Types</option>
            {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-2 py-1 rounded-md bg-white dark:bg-mining-card border border-gray-200 dark:border-white/10">
            <option value="id">Sort: ID</option>
            <option value="confidence">Sort: Confidence</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {filtered.map(e => (
          <div key={e.id} className={`rounded-xl p-4 shadow-soft border ${e.active ? 'border-emerald-200 bg-emerald-50/50 dark:bg-emerald-400/5 dark:border-emerald-900/30' : 'border-rose-200 bg-rose-50/50 dark:bg-rose-400/5 dark:border-rose-900/30'}`}>
            <div className="flex items-center justify-between">
              <div className="font-semibold">Entity #{e.id}</div>
              <Toggle checked={e.active} onChange={(v) => toggleEntity(e.id, v)} />
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <div className="p-2 rounded-md bg-white/60 dark:bg-white/5 border border-gray-100 dark:border-white/10">Type: <span className="font-medium">{e.type}</span></div>
              <div className="p-2 rounded-md bg-white/60 dark:bg-white/5 border border-gray-100 dark:border-white/10">Confidence: <span className="font-medium">{e.confidence}%</span></div>
              <div className="p-2 rounded-md bg-white/60 dark:bg-white/5 border border-gray-100 dark:border-white/10">Student ID: <span className="font-medium">{e.studentId || 'N/A'}</span></div>
              <div className="p-2 rounded-md bg-white/60 dark:bg-white/5 border border-gray-100 dark:border-white/10">Card ID: <span className="font-medium">{e.cardId}</span></div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <Power size={14} className={e.active ? 'text-green-600' : 'text-rose-600'} />
              <span className={e.active ? 'text-green-700 dark:text-green-300' : 'text-rose-700 dark:text-rose-300'}>
                {e.active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
