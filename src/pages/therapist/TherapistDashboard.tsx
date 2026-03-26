import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/authStore'
import { therapistApi } from '../../api'
import { Calendar, Users, CheckCircle2, UserCircle, FileText, ArrowRight } from 'lucide-react'

export default function TherapistDashboard() {
  const { therapist } = useAuthStore()
  const navigate = useNavigate()
  const [stats, setStats] = useState({ total: 0, upcoming: 0, completed: 0 })

  useEffect(() => {
    therapistApi.getSessions().then(r => {
      const content: any[] = r.data.data?.content || []
      const total: number = r.data.data?.totalElements || 0
      setStats({
        total,
        upcoming: content.filter(s => s.status === 'UPCOMING').length,
        completed: content.filter(s => s.status === 'COMPLETED').length
      })
    }).catch(() => {})
  }, [])

  const statCards = [
    { label: 'Total Sessions', value: stats.total, icon: Calendar, gradient: 'from-neon-pink to-neon-purple' },
    { label: 'Upcoming', value: stats.upcoming, icon: Users, gradient: 'from-blue-500 to-cyan-500' },
    { label: 'Completed', value: stats.completed, icon: CheckCircle2, gradient: 'from-emerald-500 to-teal-500' },
  ]

  const navCards = [
    { title: 'My Sessions', desc: 'View and manage appointments', to: '/therapist/sessions', icon: Calendar, gradient: 'from-violet-500 to-purple-500' },
    { title: 'Profile & Onboarding', desc: 'Complete your profile setup', to: '/therapist/profile', icon: UserCircle, gradient: 'from-neon-pink to-rose-500' },
    { title: 'Prescriptions', desc: 'Issue and manage prescriptions', to: '/therapist/prescriptions', icon: FileText, gradient: 'from-emerald-500 to-teal-500' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome, <span className="bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent">{therapist?.firstName}!</span>
        </h1>
        <p className="text-white/60">Therapist Dashboard</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-card p-6 relative overflow-hidden group"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${s.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
              <div className="relative">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`text-4xl font-black bg-gradient-to-r ${s.gradient} bg-clip-text text-transparent`}>
                  {s.value}
                </div>
                <div className="text-sm text-white/60 mt-1">{s.label}</div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {navCards.map((c, i) => {
          const Icon = c.icon
          return (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => navigate(c.to)}
              className="glass-card p-6 cursor-pointer group relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${c.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
              <div className="relative flex items-start justify-between">
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{c.title}</h3>
                  <p className="text-sm text-white/50">{c.desc}</p>
                </div>
                <motion.div
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <ArrowRight className="w-5 h-5 text-white/50" />
                </motion.div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
