import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { therapistAuthApi } from '../../api'
import toast from 'react-hot-toast'
import { User, Mail, Phone, Lock, FileText, Stethoscope, ArrowRight, CheckCircle } from 'lucide-react'

export default function TherapistSignupPage() {
  const [f, setF] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    password: '',
    mobileNumber: '',
    isAbove18: false,
    acceptedTerms: false
  })
  const [cv, setCv] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((p) => ({ ...p, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!cv) {
      toast.error('Upload your CV')
      return
    }
    if (!f.isAbove18) {
      toast.error('Must be 18+')
      return
    }
    if (!f.acceptedTerms) {
      toast.error('Accept terms')
      return
    }
    const fd = new FormData()
    Object.entries(f).forEach(([k, v]) => fd.append(k, String(v)))
    fd.append('cv', cv)
    setLoading(true)
    try {
      await therapistAuthApi.signup(fd)
      toast.success('Application submitted! Pending approval.')
      navigate('/therapist/login')
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
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial from-accent-cyan/20 via-transparent to-transparent animate-pulse" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-radial from-accent-blue/20 via-transparent to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
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
            <Stethoscope className="w-8 h-8 text-accent-cyan" />
            <span className="text-3xl font-bold text-gradient">PsychoCare</span>
          </div>
          <p className="text-text-secondary text-sm">Join our network of mental health professionals</p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="glass-card p-8"
        >
          <h1 className="text-2xl font-bold text-white mb-6">Therapist Registration</h1>

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
                    placeholder="First name"
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
                    placeholder="Last name"
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
                  placeholder="therapist@example.com"
                  required
                  className="input-field pl-12"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Mobile</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="tel"
                  value={f.mobileNumber}
                  onChange={set('mobileNumber')}
                  placeholder="Mobile number"
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
                  value={f.password}
                  onChange={set('password')}
                  placeholder="Create a secure password"
                  required
                  className="input-field pl-12"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">CV (PDF)</label>
              <div className="relative">
                <label
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
                    cv
                      ? 'border-accent-cyan/50 bg-accent-cyan/5'
                      : 'border-white/10 bg-dark-500/50 hover:border-white/20'
                  }`}
                >
                  <FileText className={`w-6 h-6 ${cv ? 'text-accent-cyan' : 'text-text-muted'}`} />
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${cv ? 'text-white' : 'text-text-secondary'}`}>
                      {cv ? cv.name : 'Upload your CV'}
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">
                      {cv ? `${(cv.size / 1024 / 1024).toFixed(2)} MB` : 'PDF format, max 5MB'}
                    </p>
                  </div>
                  {cv && <CheckCircle className="w-5 h-5 text-accent-cyan" />}
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setCv(e.target.files?.[0] || null)}
                    className="hidden"
                    required
                  />
                </label>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    checked={f.isAbove18}
                    onChange={set('isAbove18')}
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 rounded border border-white/20 bg-dark-500/50 peer-checked:bg-accent-cyan peer-checked:border-accent-cyan transition-all flex items-center justify-center">
                    {f.isAbove18 && <CheckCircle className="w-3 h-3 text-white" />}
                  </div>
                </div>
                <span className="text-sm text-text-secondary group-hover:text-white transition-colors">
                  I confirm that I am 18 years or older
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    checked={f.acceptedTerms}
                    onChange={set('acceptedTerms')}
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 rounded border border-white/20 bg-dark-500/50 peer-checked:bg-accent-cyan peer-checked:border-accent-cyan transition-all flex items-center justify-center">
                    {f.acceptedTerms && <CheckCircle className="w-3 h-3 text-white" />}
                  </div>
                </div>
                <span className="text-sm text-text-secondary group-hover:text-white transition-colors">
                  I accept the Terms and Conditions
                </span>
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 mt-6 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
                boxShadow: loading ? 'none' : '0 0 30px rgba(6, 182, 212, 0.3)'
              }}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Submit Application <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-center text-text-secondary text-sm">
              Already registered?{' '}
              <Link
                to="/therapist/login"
                className="text-accent-cyan font-semibold hover:text-accent-cyan/80 transition-colors"
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
