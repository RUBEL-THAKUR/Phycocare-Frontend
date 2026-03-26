import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { adminApi } from '../../api'
import { Search, Users, IndianRupee } from 'lucide-react'

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    adminApi.getUsers().then(r => setUsers(r.data.data || [])).finally(() => setLoading(false))
  }, [])

  const filtered = users.filter(u =>
    !search || `${u.firstName} ${u.lastName} ${u.emailId} ${u.username}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-white"
      >
        Manage Users
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative max-w-md"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-pink/50 focus:ring-1 focus:ring-neon-pink/50 transition-all"
          placeholder="Search by name, email or username..."
        />
      </motion.div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center py-20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-10 h-10 border-3 border-white/10 border-t-neon-pink rounded-full"
            />
          </motion.div>
        ) : filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-16 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <Users className="w-10 h-10 text-white/30" />
            </div>
            <p className="text-white/50 text-lg">No users found</p>
          </motion.div>
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    {['Name', 'Email', 'Username', 'Mobile', 'Wallet', 'Joined', 'Status'].map(h => (
                      <th key={h} className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/50">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u: any, i: number) => (
                    <motion.tr
                      key={u.userId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="font-semibold text-white">{u.firstName} {u.lastName}</span>
                      </td>
                      <td className="px-6 py-4 text-white/60">{u.emailId}</td>
                      <td className="px-6 py-4 text-white/60">{u.username}</td>
                      <td className="px-6 py-4 text-white/60">{u.mobileNumber || '-'}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-400">
                          <IndianRupee className="w-3 h-3" />
                          {(u.walletBalance || 0).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white/60">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN') : '-'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          u.active !== false
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {u.active !== false ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
