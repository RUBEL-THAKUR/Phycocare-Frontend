import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { userApi } from '../../api'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast'
import { Gift, Copy, Users, Calendar, Check, Wallet, Award } from 'lucide-react'

export default function ReferEarnPage() {
  const { user } = useAuthStore()
  const [refs, setRefs] = useState<any[]>([])
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    userApi.getReferrals().then((r) => setRefs(r.data.data?.content || []))
  }, [])

  function copyCode() {
    navigator.clipboard.writeText(user?.referralCode || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast.success('Referral code copied!')
  }

  const stats = [
    { label: 'Total Referrals', value: refs.length, icon: Users },
    { label: 'Sessions Booked', value: refs.filter((r) => r.sessionBooked).length, icon: Calendar },
    {
      label: 'Credits Earned',
      value: 'Rs. ' + refs.filter((r) => r.creditIssued).length * 200,
      icon: Wallet
    }
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Refer & Earn</h1>
        <p className="text-text-secondary">Earn Rs. 200 for every friend who books their first session</p>
      </motion.div>

      {/* Referral Code Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative overflow-hidden rounded-2xl p-6 mb-6"
        style={{
          background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #06b6d4 100%)'
        }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white/70 text-sm">Your Referral Code</p>
              <p className="text-xs text-white/50">Share with friends and family</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold text-white font-mono tracking-widest">
              {user?.referralCode}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyCode}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm text-white font-medium text-sm hover:bg-white/30 transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </motion.button>
          </div>

          <p className="text-white/60 text-sm mt-4">
            When your friend signs up and books their first session, you earn Rs. 200!
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-4 mb-6"
      >
        {stats.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="glass-card p-5 text-center"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-primary mx-auto mb-3 flex items-center justify-center">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-gradient">{s.value}</div>
              <div className="text-xs text-text-muted mt-1">{s.label}</div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Referral History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-gold to-yellow-500 flex items-center justify-center">
            <Award className="w-5 h-5 text-white" />
          </div>
          <h2 className="font-bold text-white">Referral History</h2>
        </div>

        {refs.length === 0 ? (
          <div className="text-center py-12">
            <Gift className="w-12 h-12 mx-auto text-text-muted mb-3" />
            <p className="text-text-muted">No referrals yet. Share your code to start earning!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-xs font-medium text-text-muted uppercase tracking-wider">
                    Used By
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-text-muted uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-text-muted uppercase tracking-wider">
                    Session
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-text-muted uppercase tracking-wider">
                    Credit
                  </th>
                </tr>
              </thead>
              <tbody>
                {refs.map((r: any, i: number) => (
                  <motion.tr
                    key={r.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.03 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4 text-white">
                      {r.referredUser?.firstName} {r.referredUser?.lastName}
                    </td>
                    <td className="py-4 px-4 text-text-muted">
                      {new Date(r.usedOn).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-lg ${
                          r.sessionBooked
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-white/10 text-text-muted border border-white/10'
                        }`}
                      >
                        {r.sessionBooked ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`font-bold ${r.creditIssued ? 'text-green-400' : 'text-text-muted'}`}
                      >
                        {r.creditIssued ? '+Rs. ' + r.creditAmount : 'Pending'}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  )
}
