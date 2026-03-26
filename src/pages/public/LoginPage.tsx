import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { authApi } from '../../api'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast'
import { Mail, Lock, Smartphone, ArrowRight, Sparkles } from 'lucide-react'

export default function LoginPage() {
  const [tab, setTab] = useState<'pw' | 'otp'>('pw')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const { setUserAuth } = useAuthStore()
  const navigate = useNavigate()

  async function loginPw(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await authApi.login({ emailId: email, password })
      const d = res.data.data
      setUserAuth(d.token, d)
      toast.success('Welcome back!')
      navigate('/user/dashboard')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  async function sendOtp() {
    if (!email) {
      toast.error('Enter email or mobile')
      return
    }
    setLoading(true)
    try {
      await authApi.requestOtp(email)
      setOtpSent(true)
      toast.success('OTP sent!')
    } catch {
      toast.error('Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  async function loginOtp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await authApi.verifyOtp(email, otp)
      const d = res.data.data
      setUserAuth(d.token, d)
      toast.success('Welcome back!')
      navigate('/user/dashboard')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Invalid OTP')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-accent-purple/20 via-transparent to-transparent animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-accent-blue/20 via-transparent to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
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
        className="relative z-10 w-full max-w-md"
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
          <p className="text-text-secondary text-sm">Your premium mental health companion</p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="glass-card p-8"
        >
          <h1 className="text-2xl font-bold text-white mb-6">Welcome Back</h1>

          {/* Tabs */}
          <div className="flex bg-dark-600 rounded-xl p-1 mb-6">
            <button
              onClick={() => setTab('pw')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                tab === 'pw'
                  ? 'bg-gradient-primary text-white shadow-glow-sm'
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              Password
            </button>
            <button
              onClick={() => setTab('otp')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                tab === 'otp'
                  ? 'bg-gradient-primary text-white shadow-glow-sm'
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              OTP
            </button>
          </div>

          {tab === 'pw' ? (
            <motion.form
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={loginPw}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="input-field pl-12"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="input-field pl-12"
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
                    Sign In <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </motion.form>
          ) : (
            <motion.form
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={loginOtp}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Email or Mobile</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email or mobile number"
                      required
                      className="input-field pl-12"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={sendOtp}
                    disabled={loading}
                    className="btn-secondary whitespace-nowrap"
                  >
                    {otpSent ? 'Resend' : 'Send OTP'}
                  </motion.button>
                </div>
              </div>

              {otpSent && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-sm font-medium text-text-secondary mb-2">OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    required
                    className="input-field text-center tracking-[0.5em] font-mono text-lg"
                  />
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={!otpSent || loading}
                className="btn-primary w-full flex items-center justify-center gap-2 mt-6"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Verify & Login <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </motion.form>
          )}

          {/* Divider */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-center text-text-secondary text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-accent-purple font-semibold hover:text-accent-purple/80 transition-colors">
                Sign Up
              </Link>
            </p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <Link
                to="/therapist/login"
                className="text-sm text-accent-blue hover:text-accent-blue/80 transition-colors"
              >
                Therapist Login
              </Link>
              <span className="text-white/20">|</span>
              <Link
                to="/admin/login"
                className="text-sm text-text-muted hover:text-white/60 transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
