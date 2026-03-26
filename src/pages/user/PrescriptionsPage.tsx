import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { userApi } from '../../api'
import { FileText, Calendar, User, Hash } from 'lucide-react'

export default function PrescriptionsPage() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    userApi
      .getPrescriptions()
      .then((r) => setData(r.data.data?.content || []))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Prescriptions</h1>
        <p className="text-text-secondary">Prescriptions issued by your therapists</p>
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-accent-purple/30 border-t-accent-purple rounded-full animate-spin" />
        </div>
      ) : data.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-16 text-center"
        >
          <FileText className="w-16 h-16 mx-auto text-text-muted mb-4" />
          <p className="text-text-muted">No prescriptions yet</p>
          <p className="text-sm text-text-muted mt-2">
            After your therapy sessions, prescriptions will appear here
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-dark-600/50 border-b border-white/10">
                  <th className="text-left py-4 px-6 text-xs font-medium text-text-muted uppercase tracking-wider">
                    <span className="flex items-center gap-2">
                      <Hash className="w-3 h-3" />
                      Session
                    </span>
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-text-muted uppercase tracking-wider">
                    <span className="flex items-center gap-2">
                      <User className="w-3 h-3" />
                      Therapist
                    </span>
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-text-muted uppercase tracking-wider">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      Date
                    </span>
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-text-muted uppercase tracking-wider">
                    Notes
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-text-muted uppercase tracking-wider">
                    Follow-up
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((p: any, i: number) => (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <span className="font-mono text-sm text-accent-purple">#{p.session?.id}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-medium text-white">
                        {p.therapist?.firstName} {p.therapist?.lastName}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-text-muted">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-text-secondary max-w-[200px] truncate">
                      {p.notes || '-'}
                    </td>
                    <td className="py-4 px-6 text-text-muted">
                      {p.followUpDate ? new Date(p.followUpDate).toLocaleDateString() : '-'}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  )
}
