import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { authApi } from '../../api'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast'
import { User, Mail, Phone, Lock, Gift, Sparkles, ArrowRight } from 'lucide-react'

export default function SignupPage() {
  const [f, setF] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    mobileNumber: '',
    username: '',
    password: '',
    referralCode: ''
  })
  const [loading, setLoading] = useState(false)
  const { setUserAuth } = useAuthStore()
  const navigate = useNavigate()

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await authApi.signup(f)
      const d = res.data.data
      setUserAuth(d.token, d)
      toast.success('Account created!')
      navigate('/user/dashboard')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial from-accent-purple/20 via-transparent to-transparent animate-pulse" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-radial from-accent-blue/20 via-transparent to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-lg"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles className="w-8 h-8 text-accent-purple" />
            <span className="text-3xl font-bold text-gradient">PsychoCare</span>
          </div>
          <p className="text-text-secondary text-sm">Create your account and start your journey</p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="glass-card p-8"
        >
          <h1 className="text-2xl font-bold text-white mb-6">Get Started</h1>

          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">First Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    value={f.firstName}
                    onChange={set('firstName')}
                    placeholder="John"
                    required
                    className="input-field pl-11 text-sm"
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
                    placeholder="Doe"
                    required
                    className="input-field pl-11 text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="email"
                  value={f.emailId}
                  onChange={set('emailId')}
                  placeholder="you@example.com"
                  required
                  className="input-field pl-12"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="tel"
                  value={f.mobileNumber}
                  onChange={set('mobileNumber')}
                  placeholder="10-digit mobile number"
                  className="input-field pl-12"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Username</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">@</span>
                <input
                  type="text"
                  value={f.username}
                  onChange={set('username')}
                  placeholder="username"
                  required
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="password"
                  value={f.password}
                  onChange={set('password')}
                  placeholder="Create a secure password"
                  required
                  className="input-field pl-12"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Referral Code <span className="text-text-muted">(optional)</span>
              </label>
              <div className="relative">
                <Gift className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-gold" />
                <input
                  type="text"
                  value={f.referralCode}
                  onChange={set('referralCode')}
                  placeholder="Enter referral code for bonus"
                  className="input-field pl-12 border-accent-gold/30 focus:border-accent-gold/50"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-6"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Account <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-center text-text-secondary text-sm">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-accent-purple font-semibold hover:text-accent-purple/80 transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
