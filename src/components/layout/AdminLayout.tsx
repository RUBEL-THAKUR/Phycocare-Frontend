import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '../../store/authStore'
import {
  LayoutDashboard,
  Stethoscope,
  Users,
  LogOut,
  Shield,
  ChevronRight
} from 'lucide-react'

const NAV = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/therapists', label: 'Manage Therapists', icon: Stethoscope },
  { to: '/admin/users', label: 'Manage Users', icon: Users },
]

export default function AdminLayout() {
  const { adminName, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="flex h-screen overflow-hidden bg-dark-900">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-800/50 backdrop-blur-xl border-r border-accent-gold/10 flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Shield className="w-7 h-7 text-accent-gold" />
            <div>
              <div className="text-xl font-bold text-gradient">PsychoCare</div>
              <div className="text-[10px] text-accent-gold/70 uppercase tracking-wider font-medium">Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Admin Profile */}
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-black font-bold text-sm shadow-glow-gold flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)' }}>
              <Shield className="w-5 h-5" />
            </div>
            <div className="overflow-hidden flex-1">
              <div className="text-sm font-semibold text-white truncate">
                {adminName || 'Admin'}
              </div>
              <div className="text-xs text-accent-gold font-medium">
                Administrator
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 overflow-y-auto">
          <div className="space-y-1">
            {NAV.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.to

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="block"
                >
                  <motion.div
                    whileHover={{ x: 4 }}
                    className={`relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-accent-gold/20 to-yellow-500/10 text-white font-medium'
                        : 'text-text-secondary hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="adminActiveIndicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full"
                        style={{ background: 'linear-gradient(180deg, #f59e0b 0%, #fbbf24 100%)' }}
                      />
                    )}
                    <Icon className={`w-4 h-4 ${isActive ? 'text-accent-gold' : ''}`} />
                    <span className="flex-1">{item.label}</span>
                    {isActive && <ChevronRight className="w-3 h-3 text-accent-gold" />}
                  </motion.div>
                </NavLink>
              )
            })}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-white/5">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              logout()
              navigate('/admin/login')
            }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-red-500/20 to-red-600/10 text-red-400 font-medium text-sm hover:from-red-500/30 hover:to-red-600/20 transition-all border border-red-500/20"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </motion.button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
