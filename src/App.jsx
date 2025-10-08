import { Outlet, NavLink } from 'react-router-dom'
import { Sun, Moon, Activity, Database, Shield, Gauge, Cpu, Home, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import './App.css'

function AppLayout() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : true
  })
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-full transition border whitespace-nowrap flex-shrink-0 text-sm ${isActive ? 'border-neon-violet/40 bg-white/80 dark:bg-white/10 text-neon-cyan shadow-glow' : 'border-transparent hover:bg-white/70 dark:hover:bg-white/5 text-gray-700 dark:text-gray-200'}`

  return (
    <div className="min-h-screen bg-white dark:bg-mining-bg">
      <header className="sticky top-0 z-20 border-b border-gray-200 dark:border-white/10 bg-white/70 dark:bg-black/30 backdrop-blur-md">
        <div className="w-full mx-auto flex items-center justify-between gap-3 px-4 py-3 min-h-[60px]">
          <div className="flex items-center gap-2 flex-shrink-0">
            <Database className="text-neon-cyan flex-shrink-0" />
            <span className="font-medium tracking-tight text-sm hidden sm:inline">Campus Data Integration</span>
            <span className="font-medium tracking-tight text-sm sm:hidden">CDI</span>
          </div>
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto">
            <NavLink to="/" className={linkClasses} end>
              <Home size={16} /> Dashboard
            </NavLink>
            <NavLink to="/pumps" className={linkClasses}>
              <Database size={16} /> Entity Resolution
            </NavLink>
            <NavLink to="/solar" className={linkClasses}>
              <Database size={16} /> Data Integration
            </NavLink>
            <NavLink to="/ml" className={linkClasses}>
              <Cpu size={16} /> Timeline Generation
            </NavLink>
            <NavLink to="/reports" className={linkClasses}>
              <Shield size={16} /> Security Dashboard
            </NavLink>
            <NavLink to="/health" className={linkClasses}>
              <Activity size={16} /> Predictive Monitoring
            </NavLink>
            <NavLink to="/optimizer" className={linkClasses}>
              <Cpu size={16} /> Predictive Analytics
            </NavLink>
          </nav>
          {/* Medium screen navigation - fewer items */}
          <nav className="hidden md:flex lg:hidden items-center gap-1 overflow-x-auto">
            <NavLink to="/" className={linkClasses} end>
              <Home size={16} /> Dashboard
            </NavLink>
            <NavLink to="/pumps" className={linkClasses}>
              <Database size={16} /> Entity
            </NavLink>
            <NavLink to="/solar" className={linkClasses}>
              <Database size={16} /> Data
            </NavLink>
            <NavLink to="/ml" className={linkClasses}>
              <Cpu size={16} /> Timeline
            </NavLink>
            <NavLink to="/reports" className={linkClasses}>
              <Shield size={16} /> Security
            </NavLink>
            <NavLink to="/health" className={linkClasses}>
              <Activity size={16} /> Monitor
            </NavLink>
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsDark(v => !v)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/10">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(v => !v)} 
              className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/10"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-white/10 bg-white/95 dark:bg-black/95 backdrop-blur-md">
            <div className="px-4 py-3 space-y-2">
              <NavLink to="/" className={`${linkClasses} block w-full`} end onClick={() => setIsMobileMenuOpen(false)}>
                <Home size={16} /> Dashboard
              </NavLink>
              <NavLink to="/pumps" className={`${linkClasses} block w-full`} onClick={() => setIsMobileMenuOpen(false)}>
                <Database size={16} /> Entity Resolution
              </NavLink>
              <NavLink to="/solar" className={`${linkClasses} block w-full`} onClick={() => setIsMobileMenuOpen(false)}>
                <Database size={16} /> Data Integration
              </NavLink>
              <NavLink to="/ml" className={`${linkClasses} block w-full`} onClick={() => setIsMobileMenuOpen(false)}>
                <Cpu size={16} /> Timeline Generation
              </NavLink>
              <NavLink to="/reports" className={`${linkClasses} block w-full`} onClick={() => setIsMobileMenuOpen(false)}>
                <Shield size={16} /> Security Dashboard
              </NavLink>
              <NavLink to="/health" className={`${linkClasses} block w-full`} onClick={() => setIsMobileMenuOpen(false)}>
                <Activity size={16} /> Predictive Monitoring
              </NavLink>
              <NavLink to="/optimizer" className={`${linkClasses} block w-full`} onClick={() => setIsMobileMenuOpen(false)}>
                <Cpu size={16} /> Predictive Analytics
              </NavLink>
            </div>
          </div>
        )}
      </header>
      <main className="pt-2">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
