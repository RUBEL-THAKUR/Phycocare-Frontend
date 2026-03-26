import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { adminApi } from '../../api'
import toast from 'react-hot-toast'
import { UserCheck, Users, X, CheckCircle2, XCircle, Clock } from 'lucide-react'

const STATUS_CONFIG: Record<string, { gradient: string; icon: any }> = {
  PENDING: { gradient: 'from-yellow-500 to-orange-500', icon: Clock },
  APPROVED: { gradient: 'from-emerald-500 to-teal-500', icon: CheckCircle2 },
  REJECTED: { gradient: 'from-red-500 to-rose-500', icon: XCircle },
  SUSPENDED: { gradient: 'from-gray-500 to-slate-500', icon: XCircle },
}

export default function AdminTherapists() {
  const [therapists, setTherapists] = useState<any[]>([])
  const [filter, setFilter] = useState('ALL')
  const [loading, setLoading] = useState(true)
  const [rejectTarget, setRejectTarget] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState('')

  useEffect(() => { load() }, [filter])

  async function load() {
    setLoading(true)
    try {
      const r = await adminApi.getTherapists(filter === 'ALL' ? undefined : filter)
      setTherapists(r.data.data || [])
    } finally { setLoading(false) }
  }

  async function approve(id: string) {
    try { await adminApi.approveTherapist(id); toast.success('Therapist approved'); load() }
    catch (err: any) { toast.error(err.response?.data?.message || 'Failed') }
  }

  async function reject() {
    if (!rejectTarget || !rejectReason.trim()) { toast.error('Enter rejection reason'); return }
    try {
      await adminApi.rejectTherapist(rejectTarget, rejectReason)
      toast.success('Therapist rejected')
      setRejectTarget(null); setRejectReason(''); load()
    } catch (err: any) { toast.error(err.response?.data?.message || 'Failed') }
  }

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
        Manage Therapists
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 overflow-x-auto pb-2"
      >
        {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map(f => (
          <motion.button
            key={f}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === f
                ? 'bg-gradient-to-r from-neon-pink to-neon-purple text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
            }`}
          >
            {f}
          </motion.button>
        ))}
      </motion.div>

      {/* Reject Modal */}
      <AnimatePresence>
        {rejectTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setRejectTarget(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="glass-card p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Reject Therapist</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => { setRejectTarget(null); setRejectReason('') }}
                  className="p-2 rounded-lg bg-white/5 text-white/50 hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              <textarea
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50 resize-none mb-4"
                placeholder="Enter rejection reason..."
              />
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={reject}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold"
                >
                  Reject
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { setRejectTarget(null); setRejectReason('') }}
                  className="flex-1 py-3 rounded-xl border border-white/10 text-white/70 hover:bg-white/5"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
        ) : therapists.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-16 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <Users className="w-10 h-10 text-white/30" />
            </div>
            <p className="text-white/50 text-lg">No therapists found</p>
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
                    {['Name', 'Email', 'Mobile', 'Status', 'Registered', 'Actions'].map(h => (
                      <th key={h} className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/50">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {therapists.map((t: any, i: number) => {
                    const statusConfig = STATUS_CONFIG[t.status] || STATUS_CONFIG.SUSPENDED
                    return (
                      <motion.tr
                        key={t.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="font-semibold text-white">{t.firstName} {t.lastName}</span>
                        </td>
                        <td className="px-6 py-4 text-white/60">{t.emailId}</td>
                        <td className="px-6 py-4 text-white/60">{t.mobileNumber}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${statusConfig.gradient} text-white`}>
                            {t.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-white/60">
                          {t.createdAt ? new Date(t.createdAt).toLocaleDateString('en-IN') : '-'}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            {t.status === 'PENDING' && (
                              <>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => approve(t.id)}
                                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-semibold"
                                >
                                  Approve
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => setRejectTarget(t.id)}
                                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-semibold"
                                >
                                  Reject
                                </motion.button>
                              </>
                            )}
                            {t.status === 'APPROVED' && (
                              <span className="text-emerald-400 font-semibold text-sm flex items-center gap-1">
                                <UserCheck className="w-4 h-4" />
                                Active
                              </span>
                            )}
                            {t.status === 'REJECTED' && (
                              <span className="text-red-400 text-sm">Rejected</span>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
