import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { userApi } from '../../api'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast'
import { Wallet, Plus, ArrowUpRight, ArrowDownRight, RefreshCw, Gift, CreditCard } from 'lucide-react'

const QUICK = [100, 500, 1000, 2000, 5000]

const TYPE_CONFIG: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  CREDIT:         { icon: ArrowDownRight, color: '#4A7A52', bg: 'rgba(74,122,82,0.1)'  },
  DEBIT:          { icon: ArrowUpRight,   color: '#B85450', bg: 'rgba(184,84,80,0.1)'  },
  REFUND:         { icon: RefreshCw,      color: '#5A7FA8', bg: 'rgba(90,127,168,0.1)' },
  REFERRAL_BONUS: { icon: Gift,           color: '#C9A96E', bg: 'rgba(201,169,110,0.1)'},
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
*, *::before, *::after { box-sizing: border-box; }

.pc-page { max-width: 900px; margin: 0 auto; font-family: 'DM Sans', sans-serif; }

.pc-eyebrow { font-family:'Cormorant Garamond',serif; font-size:11px; letter-spacing:2.5px; text-transform:uppercase; color:#8BAF8E; margin-bottom:5px; }
.pc-title   { font-family:'Playfair Display',serif; font-size:28px; font-weight:700; color:#1A1F2E; margin-bottom:4px; }
.pc-sub     { font-size:13.5px; color:#7A8090; font-weight:300; margin-bottom:30px; }

.pc-grid2 { display:grid; grid-template-columns:1fr 1fr; gap:18px; margin-bottom:22px; }
@media(max-width:700px){ .pc-grid2 { grid-template-columns:1fr; } }

/* Balance card */
.pc-balance-card {
  border-radius:22px; padding:28px;
  background:#1A1F2E;
  position:relative; overflow:hidden;
}
.pc-balance-glow1 { position:absolute; width:220px; height:220px; background:radial-gradient(ellipse, rgba(139,175,142,0.18) 0%, transparent 65%); top:-60px; right:-60px; pointer-events:none; }
.pc-balance-glow2 { position:absolute; width:160px; height:160px; background:radial-gradient(ellipse, rgba(201,169,110,0.12) 0%, transparent 65%); bottom:-40px; left:-40px; pointer-events:none; }
.pc-balance-label { font-size:11px; letter-spacing:2px; text-transform:uppercase; color:rgba(255,255,255,0.4); margin-bottom:4px; }
.pc-balance-sub   { font-size:10px; color:rgba(255,255,255,0.25); margin-bottom:22px; }
.pc-balance-icon-row { display:flex; align-items:center; gap:12px; margin-bottom:16px; }
.pc-balance-icon-wrap { width:46px; height:46px; border-radius:13px; background:rgba(139,175,142,0.15); border:1px solid rgba(139,175,142,0.2); display:flex; align-items:center; justify-content:center; }
.pc-balance-amount { font-family:'Playfair Display',serif; font-size:38px; font-weight:700; color:white; line-height:1; margin-bottom:10px; }
.pc-balance-footer { display:flex; align-items:center; gap:7px; font-size:12px; color:rgba(255,255,255,0.3); }

/* Add money card */
.pc-card { background:white; border-radius:22px; padding:26px; border:1px solid rgba(26,31,46,0.08); box-shadow:0 4px 20px rgba(26,31,46,0.06); }
.pc-card-title { font-family:'Playfair Display',serif; font-size:17px; font-weight:700; color:#1A1F2E; margin-bottom:18px; display:flex; align-items:center; gap:8px; }

.pc-quick { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:16px; }
.pc-quick-btn {
  padding:7px 14px; border-radius:10px; font-size:13px; font-weight:500;
  border:1.5px solid rgba(26,31,46,0.12); background:#FDFAF5;
  color:#7A8090; cursor:pointer; transition:all 0.18s;
  font-family:'DM Sans',sans-serif;
}
.pc-quick-btn:hover  { border-color:#8BAF8E; color:#1A1F2E; }
.pc-quick-btn.active { border-color:#4A7A52; background:rgba(74,122,82,0.08); color:#4A7A52; font-weight:600; }

.pc-input-row { display:flex; gap:10px; }
.pc-input {
  flex:1; padding:11px 14px; border-radius:12px;
  border:1.5px solid rgba(26,31,46,0.1); background:#FDFAF5;
  font-size:14px; color:#1A1F2E; font-family:'DM Sans',sans-serif;
  outline:none; transition:border-color 0.2s, box-shadow 0.2s;
}
.pc-input::placeholder { color:#B8BDC7; }
.pc-input:focus { border-color:#8BAF8E; box-shadow:0 0 0 3px rgba(139,175,142,0.13); }
.pc-add-btn {
  padding:11px 22px; border-radius:12px; border:none;
  background:#1A1F2E; color:white;
  font-size:14px; font-weight:600; font-family:'DM Sans',sans-serif;
  cursor:pointer; transition:all 0.22s;
}
.pc-add-btn:hover:not(:disabled) { background:#4A7A52; }
.pc-add-btn:disabled { opacity:0.55; cursor:not-allowed; }

/* Txn table */
.pc-txn-card { background:white; border-radius:22px; padding:26px; border:1px solid rgba(26,31,46,0.08); box-shadow:0 4px 20px rgba(26,31,46,0.06); }
.pc-table { width:100%; border-collapse:collapse; }
.pc-thead th { padding:10px 14px; text-align:left; font-size:11px; font-weight:600; color:#7A8090; letter-spacing:1.2px; text-transform:uppercase; border-bottom:1px solid rgba(26,31,46,0.08); }
.pc-thead th:last-child, .pc-thead th:nth-last-child(2) { text-align:right; }
.pc-tr { border-bottom:1px solid rgba(26,31,46,0.05); transition:background 0.15s; }
.pc-tr:hover { background:rgba(139,175,142,0.04); }
.pc-td { padding:13px 14px; font-size:13.5px; color:#1A1F2E; }
.pc-td.muted { color:#7A8090; }
.pc-td.right { text-align:right; }
.pc-badge { display:inline-flex; align-items:center; gap:5px; padding:4px 10px; border-radius:8px; font-size:11.5px; font-weight:600; }
.pc-empty { text-align:center; padding:60px 20px; }
.pc-empty-icon { color:#C0C5CE; margin-bottom:12px; }
.pc-empty-text { font-size:14px; color:#7A8090; }

.pc-spinner { width:17px; height:17px; border:2px solid rgba(255,255,255,0.25); border-top-color:white; border-radius:50%; animation:pcSpin 0.7s linear infinite; }
@keyframes pcSpin { to{transform:rotate(360deg)} }

.pc-hide-mobile { display: table-cell; }
@media (max-width: 767px) {
  .pc-hide-mobile { display: none; }
  .pc-page { padding: 20px 16px; }
  .pc-title { font-size: 24px; }
  .pc-balance-card { padding: 20px; }
  .pc-balance-amount { font-size: 30px; }
  .pc-balance-icon-row { gap: 10px; }
  .pc-balance-icon-wrap { width: 40px; height: 40px; }
  .pc-card { padding: 20px; }
  .pc-card-title { font-size: 16px; }
  .pc-quick { gap: 6px; }
  .pc-quick-btn { padding: 6px 12px; font-size: 12px; }
  .pc-input-row { flex-direction: column; gap: 12px; }
  .pc-input { padding: 10px 12px; font-size: 13px; }
  .pc-add-btn { width: 100%; padding: 10px; font-size: 13px; }
  .pc-txn-card { padding: 20px; }
  .pc-table { font-size: 12px; }
  .pc-td { padding: 10px 12px; }
  .pc-badge { padding: 3px 8px; font-size: 10px; }
  .pc-empty { padding: 40px 20px; }
  .pc-empty-icon { font-size: 36px; }
  .pc-empty-text { font-size: 13px; }
}
`

export default function WalletPage() {
  const [balance, setBalance] = useState(0)
  const [amount, setAmount]   = useState('')
  const [txns, setTxns]       = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const { updateUser }        = useAuthStore()

  useEffect(() => {
    userApi.getWallet().then((r) => {
      setBalance(r.data.data.balance)
      updateUser({ walletBalance: r.data.data.balance })
    })
    userApi.getTransactions().then((r) => setTxns(r.data.data?.content || []))
  }, [])

  async function add() {
    const a = parseFloat(amount)
    if (!a || a < 1) { toast.error('Enter valid amount'); return }
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
    } finally { setLoading(false) }
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="pc-page">
        <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}>
          <div className="pc-eyebrow">Account</div>
          <div className="pc-title">My Wallet</div>
          <div className="pc-sub">Manage your wallet balance and transactions</div>
        </motion.div>

        <div className="pc-grid2">
          {/* Balance Card */}
          <motion.div className="pc-balance-card" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}>
            <div className="pc-balance-glow1" />
            <div className="pc-balance-glow2" />
            <div style={{ position:'relative', zIndex:1 }}>
              <div className="pc-balance-icon-row">
                <div className="pc-balance-icon-wrap"><Wallet size={20} color="#8BAF8E" /></div>
                <div>
                  <div className="pc-balance-label">Available Balance</div>
                  <div className="pc-balance-sub">PsychoCare Wallet</div>
                </div>
              </div>
              <div className="pc-balance-amount">₹{balance.toFixed(2)}</div>
              <div className="pc-balance-footer"><CreditCard size={13} /> Virtual Wallet</div>
            </div>
          </motion.div>

          {/* Add Money */}
          <motion.div className="pc-card" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.15 }}>
            <div className="pc-card-title"><Plus size={17} color="#4A7A52" /> Add Money</div>
            <div className="pc-quick">
              {QUICK.map(q => (
                <button key={q} className={`pc-quick-btn${amount === String(q) ? ' active' : ''}`} onClick={() => setAmount(String(q))}>
                  ₹{q}
                </button>
              ))}
            </div>
            <div className="pc-input-row">
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount" className="pc-input" />
              <button onClick={add} disabled={loading} className="pc-add-btn">
                {loading ? <div className="pc-spinner" /> : 'Add'}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Transactions */}
        <motion.div className="pc-txn-card" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}>
          <div className="pc-card-title">Transaction History</div>
          {txns.length === 0 ? (
            <div className="pc-empty">
              <Wallet size={44} className="pc-empty-icon" style={{ margin:'0 auto 12px' }} />
              <div className="pc-empty-text">No transactions yet</div>
            </div>
          ) : (
            <div style={{ overflowX:'auto' }}>
              <table className="pc-table">
                <thead className="pc-thead">
                  <tr>
                    <th>Date</th><th>Description</th><th>Type</th>
                    <th style={{textAlign:'right'}}>Amount</th><th className="pc-hide-mobile" style={{textAlign:'right'}}>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {txns.map((t: any, i: number) => {
                    const cfg = TYPE_CONFIG[t.type] || TYPE_CONFIG.CREDIT
                    const Icon = cfg.icon
                    return (
                      <motion.tr key={t.id} className="pc-tr"
                        initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }} transition={{ delay: i * 0.03 }}>
                        <td className="pc-td muted">{new Date(t.createdAt).toLocaleDateString('en-IN')}</td>
                        <td className="pc-td">{t.description}</td>
                        <td className="pc-td">
                          <span className="pc-badge" style={{ background: cfg.bg, color: cfg.color }}>
                            <Icon size={11} />{t.type}
                          </span>
                        </td>
                        <td className="pc-td right" style={{ fontWeight:700, color: t.type==='DEBIT' ? '#B85450' : '#4A7A52' }}>
                          {t.type==='DEBIT' ? '-' : '+'}₹{t.amount}
                        </td>
                        <td className="pc-td right muted pc-hide-mobile">₹{t.balanceAfter?.toFixed(2)}</td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </>
  )
}