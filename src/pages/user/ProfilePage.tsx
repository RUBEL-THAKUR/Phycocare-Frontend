import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { userApi } from '../../api'
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast'
import { User, Mail, Phone, Calendar, Globe, Lock, Copy, Check } from 'lucide-react'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
*, *::before, *::after { box-sizing: border-box; }

.pr-page { max-width: 600px; margin: 0 auto; font-family:'DM Sans',sans-serif; }
.pr-eyebrow { font-family:'Cormorant Garamond',serif; font-size:11px; letter-spacing:2.5px; text-transform:uppercase; color:#8BAF8E; margin-bottom:5px; }
.pr-title   { font-family:'Playfair Display',serif; font-size:28px; font-weight:700; color:#1A1F2E; margin-bottom:4px; }
.pr-sub     { font-size:13.5px; color:#7A8090; font-weight:300; margin-bottom:28px; }

.pr-card { background:white; border-radius:22px; padding:28px; border:1px solid rgba(26,31,46,0.08); box-shadow:0 4px 20px rgba(26,31,46,0.06); margin-bottom:18px; }

/* Avatar header */
.pr-header { display:flex; align-items:center; gap:18px; margin-bottom:26px; padding-bottom:22px; border-bottom:1px solid rgba(26,31,46,0.08); }
.pr-avatar { width:72px; height:72px; border-radius:18px; background:#1A1F2E; display:flex; align-items:center; justify-content:center; font-family:'Cormorant Garamond',serif; font-size:26px; font-weight:600; color:white; flex-shrink:0; }
.pr-avatar-name { font-family:'Playfair Display',serif; font-size:20px; font-weight:700; color:#1A1F2E; margin-bottom:3px; }
.pr-avatar-email { font-size:13px; color:#7A8090; display:flex; align-items:center; gap:6px; margin-bottom:10px; }
.pr-ref-row { display:flex; align-items:center; gap:8px; }
.pr-ref-lbl { font-size:12px; color:#7A8090; }
.pr-ref-btn {
  display:flex; align-items:center; gap:6px; padding:5px 12px;
  border-radius:8px; background:rgba(74,122,82,0.08); border:1px solid rgba(74,122,82,0.2);
  color:#4A7A52; font-size:12.5px; font-family:'Cormorant Garamond',serif;
  font-weight:600; letter-spacing:1px; cursor:pointer; transition:all 0.18s;
}
.pr-ref-btn:hover { background:rgba(74,122,82,0.14); }

/* Form */
.pr-grid2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
@media(max-width:500px){ .pr-grid2 { grid-template-columns:1fr; } }
.pr-field { margin-bottom:14px; }
.pr-label { display:block; font-size:12.5px; font-weight:500; color:#3D4454; margin-bottom:7px; letter-spacing:0.2px; }
.pr-input-wrap { position:relative; }
.pr-icon { position:absolute; left:13px; top:50%; transform:translateY(-50%); color:#8BAF8E; pointer-events:none; }
.pr-input, .pr-select {
  width:100%; padding:11px 13px 11px 40px;
  border-radius:12px; border:1.5px solid rgba(26,31,46,0.1);
  background:#FDFAF5; font-size:13.5px; color:#1A1F2E;
  font-family:'DM Sans',sans-serif; outline:none;
  transition:border-color 0.2s, box-shadow 0.2s;
}
.pr-input::placeholder { color:#B8BDC7; }
.pr-input:focus, .pr-select:focus { border-color:#8BAF8E; box-shadow:0 0 0 3px rgba(139,175,142,0.13); }
.pr-input:disabled { opacity:0.5; cursor:not-allowed; }
.pr-select { padding-left:40px; }

.pr-btn {
  width:100%; padding:13px; border-radius:13px; border:none; margin-top:6px;
  background:#1A1F2E; color:white;
  font-size:14px; font-weight:600; font-family:'DM Sans',sans-serif;
  cursor:pointer; transition:all 0.22s;
}
.pr-btn:hover:not(:disabled) { background:#4A7A52; }
.pr-btn:disabled { opacity:0.55; cursor:not-allowed; }
.pr-btn.secondary { background:#F8F5EF; color:#1A1F2E; border:1.5px solid rgba(26,31,46,0.12); }
.pr-btn.secondary:hover { border-color:#8BAF8E; background:rgba(139,175,142,0.08); }

.pr-section-title { font-family:'Playfair Display',serif; font-size:17px; font-weight:700; color:#1A1F2E; margin-bottom:18px; display:flex; align-items:center; gap:8px; }

.pr-spinner { width:17px; height:17px; border:2px solid rgba(255,255,255,0.25); border-top-color:white; border-radius:50%; animation:prSpin 0.7s linear infinite; margin:0 auto; }
.pr-spinner.dark { border-color:rgba(26,31,46,0.15); border-top-color:#1A1F2E; }
@keyframes prSpin { to{transform:rotate(360deg)} }
`

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore()
  const [f, setF] = useState({ firstName:'', lastName:'', dateOfBirth:'', gender:'', timezone:'', mobileNumber:'' })
  const [pw, setPw]           = useState({ newPassword:'', confirmPassword:'' })
  const [saving, setSaving]   = useState(false)
  const [changingPw, setChangingPw] = useState(false)
  const [copied, setCopied]   = useState(false)

  useEffect(() => {
    userApi.getProfile().then(r => {
      const u = r.data.data
      updateUser(u)
      setF({ firstName: u.firstName||'', lastName: u.lastName||'', dateOfBirth: u.dateOfBirth||'', gender: u.gender||'', timezone: u.timezone||'', mobileNumber: u.mobileNumber||'' })
    }).catch(() => {
      if (user) setF({ firstName: user.firstName||'', lastName: user.lastName||'', dateOfBirth: user.dateOfBirth||'', gender: user.gender||'', timezone: user.timezone||'', mobileNumber: user.mobileNumber||'' })
    })
  }, [])

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF(p => ({ ...p, [k]: e.target.value }))

  async function save(e: React.FormEvent) {
    e.preventDefault(); setSaving(true)
    try {
      const r = await userApi.updateProfile(f)
      updateUser(r.data.data)
      toast.success('Profile updated successfully')
    } catch (err: any) { toast.error(err.response?.data?.message || 'Update failed') }
    finally { setSaving(false) }
  }

  async function changePw(e: React.FormEvent) {
    e.preventDefault()
    if (pw.newPassword !== pw.confirmPassword) { toast.error('Passwords do not match'); return }
    setChangingPw(true)
    try {
      await userApi.changePassword(pw)
      toast.success('Password changed successfully')
      setPw({ newPassword:'', confirmPassword:'' })
    } catch (err: any) { toast.error(err.response?.data?.message || 'Change failed') }
    finally { setChangingPw(false) }
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
    <>
      <style>{CSS}</style>
      <div className="pr-page">
        <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}>
          <div className="pr-eyebrow">Account</div>
          <div className="pr-title">My Profile</div>
          <div className="pr-sub">Manage your account information</div>
        </motion.div>

        {/* Profile Card */}
        <motion.div className="pr-card" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}>
          {/* Header */}
          <div className="pr-header">
            <div className="pr-avatar">{user?.firstName?.[0]}{user?.lastName?.[0]}</div>
            <div style={{ flex:1 }}>
              <div className="pr-avatar-name">{user?.firstName} {user?.lastName}</div>
              <div className="pr-avatar-email"><Mail size={13} />{user?.emailId}</div>
              <div className="pr-ref-row">
                <span className="pr-ref-lbl">Referral Code:</span>
                <button className="pr-ref-btn" onClick={copyReferral}>
                  {user?.referralCode}
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                </button>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={save}>
            <div className="pr-grid2">
              <div className="pr-field">
                <label className="pr-label">First Name</label>
                <div className="pr-input-wrap"><User size={14} className="pr-icon" /><input type="text" value={f.firstName} onChange={set('firstName')} className="pr-input" /></div>
              </div>
              <div className="pr-field">
                <label className="pr-label">Last Name</label>
                <div className="pr-input-wrap"><User size={14} className="pr-icon" /><input type="text" value={f.lastName} onChange={set('lastName')} className="pr-input" /></div>
              </div>
            </div>

            <div className="pr-field">
              <label className="pr-label">Date of Birth</label>
              <div className="pr-input-wrap"><Calendar size={14} className="pr-icon" /><input type="date" value={f.dateOfBirth} onChange={set('dateOfBirth')} className="pr-input" /></div>
            </div>

            <div className="pr-field">
              <label className="pr-label">Gender</label>
              <div className="pr-input-wrap">
                <User size={14} className="pr-icon" />
                <select value={f.gender} onChange={set('gender')} className="pr-select">
                  <option value="">Select Gender</option>
                  <option>Male</option><option>Female</option><option>Non-binary</option><option>Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className="pr-field">
              <label className="pr-label">Timezone</label>
              <div className="pr-input-wrap">
                <Globe size={14} className="pr-icon" />
                <select value={f.timezone} onChange={set('timezone')} className="pr-select">
                  <option value="">Select Timezone</option>
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  <option value="America/New_York">America/New_York (EST)</option>
                  <option value="Europe/London">Europe/London (GMT)</option>
                  <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                </select>
              </div>
            </div>

            <div className="pr-field">
              <label className="pr-label">Mobile Number</label>
              <div className="pr-input-wrap"><Phone size={14} className="pr-icon" /><input type="tel" value={f.mobileNumber} onChange={set('mobileNumber')} placeholder="10-digit mobile" className="pr-input" /></div>
            </div>

            <div className="pr-field">
              <label className="pr-label">Email <span style={{ color:'#B0B5BF', fontWeight:400, fontSize:11 }}>(cannot change)</span></label>
              <div className="pr-input-wrap"><Mail size={14} className="pr-icon" /><input type="email" value={user?.emailId||''} disabled className="pr-input" /></div>
            </div>

            <button type="submit" disabled={saving} className="pr-btn">
              {saving ? <div className="pr-spinner" /> : 'Update Profile'}
            </button>
          </form>
        </motion.div>

        {/* Change Password */}
        <motion.div className="pr-card" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.15 }}>
          <div className="pr-section-title"><Lock size={16} color="#8BAF8E" /> Change Password</div>
          <form onSubmit={changePw}>
            <div className="pr-field">
              <label className="pr-label">New Password</label>
              <div className="pr-input-wrap"><Lock size={14} className="pr-icon" /><input type="password" value={pw.newPassword} onChange={e => setPw(p => ({ ...p, newPassword: e.target.value }))} placeholder="Min 6 characters" required className="pr-input" /></div>
            </div>
            <div className="pr-field">
              <label className="pr-label">Confirm Password</label>
              <div className="pr-input-wrap"><Lock size={14} className="pr-icon" /><input type="password" value={pw.confirmPassword} onChange={e => setPw(p => ({ ...p, confirmPassword: e.target.value }))} required className="pr-input" /></div>
            </div>
            <button type="submit" disabled={changingPw} className="pr-btn secondary">
              {changingPw ? <div className="pr-spinner dark" /> : 'Change Password'}
            </button>
          </form>
        </motion.div>
      </div>
    </>
  )
}