import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { userApi } from '../../api'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast'
import { User, Mail, Phone, Calendar, Globe, Lock, Copy, Check } from 'lucide-react'

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore()
  const [f, setF] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    timezone: '',
    mobileNumber: ''
  })
  const [pw, setPw] = useState({ newPassword: '', confirmPassword: '' })
  const [saving, setSaving] = useState(false)
  const [changingPw, setChangingPw] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    userApi
      .getProfile()
      .then((r) => {
        const u = r.data.data
        updateUser(u)
        setF({
          firstName: u.firstName || '',
          lastName: u.lastName || '',
          dateOfBirth: u.dateOfBirth || '',
          gender: u.gender || '',
          timezone: u.timezone || '',
          mobileNumber: u.mobileNumber || ''
        })
      })
      .catch(() => {
        if (user) {
          setF({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            dateOfBirth: user.dateOfBirth || '',
            gender: user.gender || '',
            timezone: user.timezone || '',
            mobileNumber: user.mobileNumber || ''
          })
        }
      })
  }, [])

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }))

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const r = await userApi.updateProfile(f)
      updateUser(r.data.data)
      toast.success('Profile updated successfully')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Update failed')
    } finally {
      setSaving(false)
    }
  }

  async function changePw(e: React.FormEvent) {
    e.preventDefault()
    if (pw.newPassword !== pw.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    setChangingPw(true)
    try {
      await userApi.changePassword(pw)
      toast.success('Password changed successfully')
      setPw({ newPassword: '', confirmPassword: '' })
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Change failed')
    } finally {
      setChangingPw(false)
    }
  }

  function copyReferral() {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast.success('Referral code copied!')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">My Profile</h1>
        <p className="text-text-secondary">Manage your account information</p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6 mb-6"
      >
        {/* Header */}
        <div className="flex items-center gap-5 mb-8 pb-6 border-b border-white/10">
          <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center text-white font-bold text-2xl shadow-glow">
            {user?.firstName?.[0]}
            {user?.lastName?.[0]}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-text-muted flex items-center gap-2 mt-1">
              <Mail className="w-4 h-4" />
              {user?.emailId}
            </p>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs text-text-muted">Referral Code:</span>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={copyReferral}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent-purple/10 border border-accent-purple/30 text-accent-purple text-sm font-mono"
              >
                {user?.referralCode}
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={save} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">First Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  value={f.firstName}
                  onChange={set('firstName')}
                  className="input-field pl-11"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Last Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  value={f.lastName}
                  onChange={set('lastName')}
                  className="input-field pl-11"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Date of Birth</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="date"
                value={f.dateOfBirth}
                onChange={set('dateOfBirth')}
                className="input-field pl-11"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Gender</label>
            <select value={f.gender} onChange={set('gender')} className="input-field">
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Non-binary</option>
              <option>Prefer not to say</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Timezone</label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <select value={f.timezone} onChange={set('timezone')} className="input-field pl-11">
                <option value="">Select Timezone</option>
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="America/New_York">America/New_York (EST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
                <option value="Asia/Dubai">Asia/Dubai (GST)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Mobile Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="tel"
                value={f.mobileNumber}
                onChange={set('mobileNumber')}
                placeholder="10-digit mobile"
                className="input-field pl-11"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Email (cannot change)</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="email"
                value={user?.emailId || ''}
                disabled
                className="input-field pl-11 opacity-50 cursor-not-allowed"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={saving}
            className="btn-primary w-full mt-6"
          >
            {saving ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
            ) : (
              'Update Profile'
            )}
          </motion.button>
        </form>
      </motion.div>

      {/* Change Password */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6"
      >
        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Lock className="w-5 h-5 text-accent-purple" />
          Change Password
        </h2>

        <form onSubmit={changePw} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">New Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="password"
                value={pw.newPassword}
                onChange={(e) => setPw((p) => ({ ...p, newPassword: e.target.value }))}
                placeholder="Min 6 characters"
                required
                className="input-field pl-11"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="password"
                value={pw.confirmPassword}
                onChange={(e) => setPw((p) => ({ ...p, confirmPassword: e.target.value }))}
                required
                className="input-field pl-11"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={changingPw}
            className="btn-secondary w-full"
          >
            {changingPw ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
            ) : (
              'Change Password'
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}
