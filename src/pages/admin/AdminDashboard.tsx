import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { adminApi } from '../../api'
import { Users, UserCheck, Clock, CheckCircle2, Calendar } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminApi.getStats().then(r => setStats(r.data.data)).finally(() => setLoading(false))
  }, [])

  const cards = stats ? [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, gradient: 'from-blue-500 to-cyan-500' },
    { label: 'Total Therapists', value: stats.totalTherapists, icon: UserCheck, gradient: 'from-violet-500 to-purple-500' },
    { label: 'Pending Approvals', value: stats.pendingTherapists, icon: Clock, gradient: 'from-yellow-500 to-orange-500' },
    { label: 'Approved Therapists', value: stats.approvedTherapists, icon: CheckCircle2, gradient: 'from-emerald-500 to-teal-500' },
    { label: 'Total Sessions', value: stats.totalSessions, icon: Calendar, gradient: 'from-neon-pink to-neon-purple' },
  ] : []

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
        <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-white/60">Platform overview and statistics</p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-10 h-10 border-3 border-white/10 border-t-neon-pink rounded-full"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {cards.map((c, i) => {
            const Icon = c.icon
            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="glass-card p-6 relative overflow-hidden group"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${c.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
                <div className="relative">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`text-4xl font-black bg-gradient-to-r ${c.gradient} bg-clip-text text-transparent`}>
                    {c.value}
                  </div>
                  <div className="text-sm text-white/60 mt-2">{c.label}</div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}
