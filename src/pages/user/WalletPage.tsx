import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { userApi } from '../../api'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast'
import { Wallet, Plus, ArrowUpRight, ArrowDownRight, RefreshCw, Gift, CreditCard } from 'lucide-react'

const QUICK = [100, 500, 1000, 2000, 5000]

const TYPE_CONFIG: Record<string, { icon: React.ElementType; color: string; bgColor: string }> = {
  CREDIT: { icon: ArrowDownRight, color: 'text-green-400', bgColor: 'bg-green-500/20' },
  DEBIT: { icon: ArrowUpRight, color: 'text-red-400', bgColor: 'bg-red-500/20' },
  REFUND: { icon: RefreshCw, color: 'text-blue-400', bgColor: 'bg-blue-500/20' },
  REFERRAL_BONUS: { icon: Gift, color: 'text-purple-400', bgColor: 'bg-purple-500/20' }
}

export default function WalletPage() {
  const [balance, setBalance] = useState(0)
  const [amount, setAmount] = useState('')
  const [txns, setTxns] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const { updateUser } = useAuthStore()

  useEffect(() => {
    userApi.getWallet().then((r) => {
      setBalance(r.data.data.balance)
      updateUser({ walletBalance: r.data.data.balance })
    })
    userApi.getTransactions().then((r) => setTxns(r.data.data?.content || []))
  }, [])

  async function add() {
    const a = parseFloat(amount)
    if (!a || a < 1) {
      toast.error('Enter valid amount')
      return
    }
    setLoading(true)
    try {
      const r = await userApi.addMoney({ amount: a, paymentMethod: 'Online', referenceId: 'TXN' + Date.now() })
      setBalance(r.data.data.balance)
      updateUser({ walletBalance: r.data.data.balance })
      setAmount('')
      toast.success('Rs. ' + a + ' added!')
      userApi.getTransactions().then((r) => setTxns(r.data.data?.content || []))
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Wallet</h1>
        <p className="text-text-secondary">Manage your wallet balance</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-2xl p-6"
          style={{
            background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #06b6d4 100%)'
          }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white/70 text-sm">Available Balance</p>
                <p className="text-xs text-white/50">PsychoCare Wallet</p>
              </div>
            </div>
            <div className="text-4xl font-bold text-white mb-2">Rs. {balance.toFixed(2)}</div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-white/50" />
              <span className="text-white/50 text-sm">Virtual Wallet</span>
            </div>
          </div>
        </motion.div>

        {/* Add Money Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-accent-purple" />
            Add Money
          </h2>

          <div className="flex flex-wrap gap-2 mb-4">
            {QUICK.map((q) => (
              <motion.button
                key={q}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAmount(String(q))}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  amount === String(q)
                    ? 'bg-accent-purple text-white shadow-glow-sm'
                    : 'bg-dark-500/50 text-text-secondary hover:text-white border border-white/10'
                }`}
              >
                Rs. {q}
              </motion.button>
            ))}
          </div>

          <div className="flex gap-3">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="input-field flex-1"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={add}
              disabled={loading}
              className="btn-primary px-6"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Add'
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Transaction History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6"
      >
        <h2 className="text-lg font-bold text-white mb-6">Transaction History</h2>

        {txns.length === 0 ? (
          <div className="text-center py-12">
            <Wallet className="w-12 h-12 mx-auto text-text-muted mb-3" />
            <p className="text-text-muted">No transactions yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-xs font-medium text-text-muted uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-text-muted uppercase tracking-wider">
                    Description
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-text-muted uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-text-muted uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-text-muted uppercase tracking-wider">
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody>
                {txns.map((t: any, i: number) => {
                  const config = TYPE_CONFIG[t.type] || TYPE_CONFIG.CREDIT
                  const Icon = config.icon
                  return (
                    <motion.tr
                      key={t.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 px-4 text-text-muted text-sm">
                        {new Date(t.createdAt).toLocaleDateString('en-IN')}
                      </td>
                      <td className="py-4 px-4 text-white text-sm">{t.description}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg ${config.bgColor} ${config.color}`}
                        >
                          <Icon className="w-3 h-3" />
                          {t.type}
                        </span>
                      </td>
                      <td
                        className={`py-4 px-4 text-right font-bold ${t.type === 'DEBIT' ? 'text-red-400' : 'text-green-400'}`}
                      >
                        {t.type === 'DEBIT' ? '-' : '+'}Rs. {t.amount}
                      </td>
                      <td className="py-4 px-4 text-right text-text-secondary">
                        Rs. {t.balanceAfter?.toFixed(2)}
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  )
}
