// import { useEffect, useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { adminApi } from '../../api'
// import { Search, Users, IndianRupee } from 'lucide-react'
//
// export default function AdminUsers() {
//   const [users, setUsers] = useState<any[]>([])
//   const [loading, setLoading] = useState(true)
//   const [search, setSearch] = useState('')
//
//   useEffect(() => {
//     adminApi.getUsers().then(r => setUsers(r.data.data || [])).finally(() => setLoading(false))
//   }, [])
//
//   const filtered = users.filter(u =>
//     !search || `${u.firstName} ${u.lastName} ${u.emailId} ${u.username}`.toLowerCase().includes(search.toLowerCase())
//   )
//
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="space-y-6"
//     >
//       <motion.h1
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-3xl font-bold text-white"
//       >
//         Manage Users
//       </motion.h1>
//
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.1 }}
//         className="relative max-w-md"
//       >
//         <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
//         <input
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//           className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-neon-pink/50 focus:ring-1 focus:ring-neon-pink/50 transition-all"
//           placeholder="Search by name, email or username..."
//         />
//       </motion.div>
//
//       <AnimatePresence mode="wait">
//         {loading ? (
//           <motion.div
//             key="loading"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="flex justify-center items-center py-20"
//           >
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
//               className="w-10 h-10 border-3 border-white/10 border-t-neon-pink rounded-full"
//             />
//           </motion.div>
//         ) : filtered.length === 0 ? (
//           <motion.div
//             key="empty"
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="glass-card p-16 text-center"
//           >
//             <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
//               <Users className="w-10 h-10 text-white/30" />
//             </div>
//             <p className="text-white/50 text-lg">No users found</p>
//           </motion.div>
//         ) : (
//           <motion.div
//             key="table"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="glass-card overflow-hidden"
//           >
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-white/10">
//                     {['Name', 'Email', 'Username', 'Mobile', 'Wallet', 'Joined', 'Status'].map(h => (
//                       <th key={h} className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white/50">
//                         {h}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filtered.map((u: any, i: number) => (
//                     <motion.tr
//                       key={u.userId}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: i * 0.03 }}
//                       className="border-b border-white/5 hover:bg-white/5 transition-colors"
//                     >
//                       <td className="px-6 py-4">
//                         <span className="font-semibold text-white">{u.firstName} {u.lastName}</span>
//                       </td>
//                       <td className="px-6 py-4 text-white/60">{u.emailId}</td>
//                       <td className="px-6 py-4 text-white/60">{u.username}</td>
//                       <td className="px-6 py-4 text-white/60">{u.mobileNumber || '-'}</td>
//                       <td className="px-6 py-4">
//                         <span className="inline-flex items-center gap-1 font-semibold text-emerald-400">
//                           <IndianRupee className="w-3 h-3" />
//                           {(u.walletBalance || 0).toFixed(2)}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-white/60">
//                         {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN') : '-'}
//                       </td>
//                       <td className="px-6 py-4">
//                         <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
//                           u.active !== false
//                             ? 'bg-emerald-500/20 text-emerald-400'
//                             : 'bg-red-500/20 text-red-400'
//                         }`}>
//                           {u.active !== false ? 'Active' : 'Inactive'}
//                         </span>
//                       </td>
//                     </motion.tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   )
// }

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { adminApi } from '../../api'
import { Search, Users, IndianRupee } from 'lucide-react'

const COLORS = {
  sage: "#8BAF8E", sageLight: "#B8D4BB", sageDark: "#4A7A52",
  cream: "#F5F0E8", warmWhite: "#FDFAF5", deep: "#1A1F2E",
  charcoal: "#3D4454", gold: "#C9A96E", goldLight: "#E8C98A",
  muted: "#7A8090", bg: "#F8F5EF",
}

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
      transition={{ duration: 0.4 }}
      style={{ maxWidth: 1100, margin: '0 auto', padding: '0 8px' }}
    >
      <style>{`
        .au-row:hover { background: rgba(139,175,142,0.06) !important; }
        .au-row { transition: background 0.2s; }
        .au-search:focus { border-color: rgba(201,169,110,0.55) !important; box-shadow: 0 0 0 3px rgba(201,169,110,0.10) !important; }
        .au-spin { animation: auSpin 1s linear infinite; }
        @keyframes auSpin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{ marginBottom: 32, position: 'relative', textAlign: 'center' }}
      >
        <div style={{ position: 'absolute', inset: '-20px -28px', background: 'radial-gradient(ellipse at 50% 50%, rgba(201,169,110,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: COLORS.gold, fontWeight: 500, marginBottom: 8 }}>
          Admin Panel
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: COLORS.deep, lineHeight: 1.1, marginBottom: 8 }}>
          Manage <em style={{ fontStyle: 'italic', color: COLORS.gold }}>Users</em>
        </h1>
        <p style={{ fontSize: 15, color: COLORS.muted, fontWeight: 300 }}>Browse and monitor all registered platform users.</p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}
      >
        <div style={{ position: 'relative', width: '100%', maxWidth: 420 }}>
          <Search size={17} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: COLORS.muted, pointerEvents: 'none' }} />
          <input
            className="au-search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email or username..."
            style={{
              width: '100%',
              paddingLeft: 46, paddingRight: 18, paddingTop: 13, paddingBottom: 13,
              borderRadius: 14,
              border: '1.5px solid rgba(26,31,46,0.12)',
              background: 'white',
              fontSize: 14,
              color: COLORS.deep,
              outline: 'none',
              boxShadow: '0 2px 10px rgba(26,31,46,0.05)',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              boxSizing: 'border-box',
            }}
          />
        </div>
      </motion.div>

      {/* Table / States */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
            <div className="au-spin" style={{ width: 36, height: 36, border: `2px solid rgba(201,169,110,0.2)`, borderTopColor: COLORS.gold, borderRadius: '50%' }} />
          </motion.div>
        ) : filtered.length === 0 ? (
          <motion.div key="empty" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            style={{ background: 'white', borderRadius: 22, padding: '64px 32px', textAlign: 'center', border: '1px solid rgba(26,31,46,0.07)', boxShadow: '0 4px 20px rgba(26,31,46,0.05)' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(201,169,110,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Users size={32} style={{ color: COLORS.gold }} />
            </div>
            <p style={{ color: COLORS.muted, fontSize: 16, fontWeight: 300 }}>No users found</p>
          </motion.div>
        ) : (
          <motion.div key="table" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ background: 'white', borderRadius: 22, border: '1px solid rgba(26,31,46,0.07)', boxShadow: '0 4px 20px rgba(26,31,46,0.05)', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(26,31,46,0.07)', background: COLORS.bg }}>
                    {['Name', 'Email', 'Username', 'Mobile', 'Wallet', 'Joined', 'Status'].map(h => (
                      <th key={h} style={{ textAlign: 'center', padding: '14px 18px', fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: COLORS.muted }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u: any, i: number) => (
                    <motion.tr
                      key={u.userId}
                      className="au-row"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      style={{ borderBottom: '1px solid rgba(26,31,46,0.05)' }}
                    >
                      <td style={{ padding: '16px 18px', textAlign: 'center' }}>
                        <span style={{ fontWeight: 600, color: COLORS.deep, fontSize: 14 }}>{u.firstName} {u.lastName}</span>
                      </td>
                      <td style={{ padding: '16px 18px', color: COLORS.muted, fontSize: 13, textAlign: 'center' }}>{u.emailId}</td>
                      <td style={{ padding: '16px 18px', color: COLORS.muted, fontSize: 13, textAlign: 'center' }}>{u.username}</td>
                      <td style={{ padding: '16px 18px', color: COLORS.muted, fontSize: 13, textAlign: 'center' }}>{u.mobileNumber || '-'}</td>
                      <td style={{ padding: '16px 18px', textAlign: 'center' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 600, color: COLORS.sageDark, fontSize: 14 }}>
                          <IndianRupee size={13} />
                          {(u.walletBalance || 0).toFixed(2)}
                        </span>
                      </td>
                      <td style={{ padding: '16px 18px', color: COLORS.muted, fontSize: 13, textAlign: 'center' }}>
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN') : '-'}
                      </td>
                      <td style={{ padding: '16px 18px', textAlign: 'center' }}>
                        <span style={{
                          display: 'inline-flex', padding: '5px 14px', borderRadius: 100, fontSize: 12, fontWeight: 600,
                          color: u.active !== false ? COLORS.sageDark : '#B94A48',
                          background: u.active !== false ? 'rgba(74,122,82,0.10)' : 'rgba(185,74,72,0.08)',
                          border: `1px solid ${u.active !== false ? 'rgba(74,122,82,0.28)' : 'rgba(185,74,72,0.22)'}`,
                        }}>
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
