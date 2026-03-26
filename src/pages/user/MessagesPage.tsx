import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { userApi } from '../../api'
import toast from 'react-hot-toast'
import {
  Inbox,
  Star,
  AlertCircle,
  Send,
  Trash2,
  Plus,
  ArrowLeft,
  Mail,
  X
} from 'lucide-react'

const FOLDERS = [
  { key: 'inbox', label: 'Inbox', icon: Inbox },
  { key: 'starred', label: 'Starred', icon: Star },
  { key: 'important', label: 'Important', icon: AlertCircle },
  { key: 'sent', label: 'Sent', icon: Send },
  { key: 'trash', label: 'Trash', icon: Trash2 }
]

const API_MAP: Record<string, (p: number) => Promise<any>> = {
  inbox: userApi.getInbox,
  sent: userApi.getSentMessages,
  starred: userApi.getStarred,
  important: userApi.getImportant,
  trash: userApi.getTrash
}

export default function MessagesPage() {
  const [folder, setFolder] = useState('inbox')
  const [msgs, setMsgs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [composing, setComposing] = useState(false)
  const [compose, setCompose] = useState({ recipientEmail: '', subject: '', body: '' })
  const [selected, setSelected] = useState<any>(null)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    load()
  }, [folder])

  async function load() {
    setLoading(true)
    try {
      const r = await API_MAP[folder](0)
      setMsgs(r.data.data?.content || [])
    } finally {
      setLoading(false)
    }
  }

  async function send(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    try {
      await userApi.composeMessage(compose)
      toast.success('Message sent!')
      setComposing(false)
      setCompose({ recipientEmail: '', subject: '', body: '' })
      if (folder === 'sent') load()
    } catch {
      toast.error('Failed to send')
    } finally {
      setSending(false)
    }
  }

  async function toggleStar(e: React.MouseEvent, id: number) {
    e.stopPropagation()
    await userApi.toggleStar(id)
    load()
  }

  async function toggleImportant(e: React.MouseEvent, id: number) {
    e.stopPropagation()
    await userApi.toggleImportant(id)
    load()
  }

  async function deleteMsg(e: React.MouseEvent, id: number) {
    e.stopPropagation()
    await userApi.deleteMessage(id)
    toast.success('Moved to trash')
    load()
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Messages</h1>
          <p className="text-text-secondary text-sm">Stay connected with your therapists</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setComposing(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Compose
        </motion.button>
      </motion.div>

      <div className="flex gap-6">
        {/* Sidebar folders */}
        <motion.nav
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-48 flex-shrink-0"
        >
          <div className="glass-card p-2 space-y-1">
            {FOLDERS.map((f) => {
              const Icon = f.icon
              return (
                <motion.button
                  key={f.key}
                  whileHover={{ x: 4 }}
                  onClick={() => {
                    setFolder(f.key)
                    setSelected(null)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all ${
                    folder === f.key
                      ? 'bg-gradient-to-r from-accent-purple/20 to-accent-blue/10 text-white font-medium'
                      : 'text-text-secondary hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${folder === f.key ? 'text-accent-purple' : ''}`} />
                  {f.label}
                </motion.button>
              )
            })}
          </div>
        </motion.nav>

        {/* Main content */}
        <div className="flex-1">
          {/* Compose form */}
          <AnimatePresence>
            {composing && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass-card p-6 mb-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-white">New Message</h2>
                  <button
                    onClick={() => setComposing(false)}
                    className="p-1 rounded-lg hover:bg-white/10 text-text-muted hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={send} className="space-y-3">
                  <input
                    value={compose.recipientEmail}
                    onChange={(e) => setCompose((c) => ({ ...c, recipientEmail: e.target.value }))}
                    className="input-field"
                    type="email"
                    placeholder="To (email)"
                    required
                  />
                  <input
                    value={compose.subject}
                    onChange={(e) => setCompose((c) => ({ ...c, subject: e.target.value }))}
                    className="input-field"
                    placeholder="Subject"
                    required
                  />
                  <textarea
                    value={compose.body}
                    onChange={(e) => setCompose((c) => ({ ...c, body: e.target.value }))}
                    className="input-field resize-y min-h-[120px]"
                    placeholder="Write your message..."
                    required
                  />
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={sending}
                      className="btn-primary flex items-center gap-2"
                    >
                      {sending ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send
                        </>
                      )}
                    </motion.button>
                    <button
                      type="button"
                      onClick={() => setComposing(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Message detail view */}
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key="detail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card p-6"
              >
                <motion.button
                  whileHover={{ x: -4 }}
                  onClick={() => setSelected(null)}
                  className="flex items-center gap-2 text-accent-purple hover:text-accent-purple/80 mb-4 text-sm font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to messages
                </motion.button>
                <h2 className="text-xl font-bold text-white mb-2">{selected.subject}</h2>
                <div className="text-sm text-text-muted mb-6 pb-4 border-b border-white/10">
                  From: <span className="text-white">{selected.senderName}</span> ·{' '}
                  {new Date(selected.createdAt).toLocaleString()}
                </div>
                <div className="text-text-secondary leading-relaxed whitespace-pre-wrap">
                  {selected.body}
                </div>
              </motion.div>
            ) : loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-64"
              >
                <div className="w-8 h-8 border-2 border-accent-purple/30 border-t-accent-purple rounded-full animate-spin" />
              </motion.div>
            ) : msgs.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card p-16 text-center"
              >
                <Mail className="w-16 h-16 mx-auto text-text-muted mb-4" />
                <p className="text-text-muted">No messages in {folder}</p>
              </motion.div>
            ) : (
              <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                {msgs.map((m: any, i: number) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    whileHover={{ x: 4 }}
                    onClick={() => setSelected(m)}
                    className={`glass-card p-4 cursor-pointer hover:border-white/20 transition-all ${
                      !m.isRead ? 'border-l-2 border-l-accent-purple' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div
                          className={`font-medium truncate ${!m.isRead ? 'text-white' : 'text-text-secondary'}`}
                        >
                          {m.subject}
                        </div>
                        <div className="text-sm text-text-muted mt-1 truncate">
                          {m.senderName} · {m.body?.slice(0, 60)}...
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={(e) => toggleStar(e, m.id)}
                          className={`p-1.5 rounded-lg hover:bg-white/10 transition-colors ${
                            m.isStarred ? 'text-accent-gold' : 'text-text-muted'
                          }`}
                        >
                          <Star className={`w-4 h-4 ${m.isStarred ? 'fill-accent-gold' : ''}`} />
                        </button>
                        <button
                          onClick={(e) => toggleImportant(e, m.id)}
                          className={`p-1.5 rounded-lg hover:bg-white/10 transition-colors ${
                            m.isImportant ? 'text-red-400' : 'text-text-muted'
                          }`}
                        >
                          <AlertCircle className="w-4 h-4" />
                        </button>
                        {folder !== 'trash' && (
                          <button
                            onClick={(e) => deleteMsg(e, m.id)}
                            className="p-1.5 rounded-lg hover:bg-white/10 text-text-muted hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                        <span className="text-xs text-text-muted ml-2">
                          {new Date(m.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
