// import { useEffect, useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { therapistApi } from '../../api'
// import toast from 'react-hot-toast'
// import { User, GraduationCap, Briefcase, Award, BadgeCheck, Building2, CreditCard, Plus, X, Save } from 'lucide-react'
//
// const TABS = [
//   { name: 'Basic Info', icon: User },
//   { name: 'Qualifications', icon: GraduationCap },
//   { name: 'Experience', icon: Briefcase },
//   { name: 'Specializations', icon: BadgeCheck },
//   { name: 'Expertise', icon: Award },
//   { name: 'Awards', icon: Award },
//   { name: 'Memberships', icon: Building2 },
//   { name: 'Bank Details', icon: CreditCard }
// ]
//
// export default function TherapistProfilePage() {
//   const [tab, setTab] = useState(0)
//   const [profile, setProfile] = useState<any>({})
//   const [lists, setLists] = useState<Record<string, any[]>>({ quals: [], exps: [], specs: [], expertise: [], awards: [], memberships: [] })
//   const [bank, setBank] = useState<any>({})
//   const [saving, setSaving] = useState(false)
//   const [newItem, setNewItem] = useState<Record<string, string>>({})
//
//   useEffect(() => {
//     therapistApi.getProfile().then(r => setProfile(r.data.data || {})).catch(() => {})
//     therapistApi.getBankDetails().then(r => setBank(r.data.data || {})).catch(() => {})
//     Promise.all([
//       therapistApi.getQualifications().then(r => r.data.data || []),
//       therapistApi.getExperiences().then(r => r.data.data || []),
//       therapistApi.getSpecializations().then(r => r.data.data || []),
//       therapistApi.getExpertise().then(r => r.data.data || []),
//       therapistApi.getAwards().then(r => r.data.data || []),
//       therapistApi.getMemberships().then(r => r.data.data || []),
//     ]).then(([quals, exps, specs, expertise, awards, memberships]) =>
//       setLists({ quals, exps, specs, expertise, awards, memberships })
//     )
//   }, [])
//
//   const setP = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
//     setProfile((p: any) => ({ ...p, [k]: e.target.value }))
//   const setB = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
//     setBank((b: any) => ({ ...b, [k]: e.target.value }))
//
//   async function saveProfile(e: React.FormEvent) {
//     e.preventDefault(); setSaving(true)
//     try { await therapistApi.saveProfile(profile); toast.success('Profile saved') }
//     catch (err: any) { toast.error(err.response?.data?.message || 'Failed') }
//     finally { setSaving(false) }
//   }
//
//   async function saveBankDetails(e: React.FormEvent) {
//     e.preventDefault(); setSaving(true)
//     try { await therapistApi.saveBankDetails(bank); toast.success('Bank details saved') }
//     catch (err: any) { toast.error(err.response?.data?.message || 'Failed') }
//     finally { setSaving(false) }
//   }
//
//   const listConfigs: Record<number, { key: string; fields: [string, string][]; addFn: Function; delFn: Function; label: string }> = {
//     1: { key: 'quals', fields: [['degree', 'Degree'], ['institution', 'Institution'], ['passingYear', 'Year']], addFn: therapistApi.addQualification, delFn: therapistApi.deleteQualification, label: 'degree' },
//     2: { key: 'exps', fields: [['organization', 'Organization'], ['designation', 'Designation'], ['fromYear', 'From Year']], addFn: therapistApi.addExperience, delFn: therapistApi.deleteExperience, label: 'organization' },
//     3: { key: 'specs', fields: [['specializationName', 'Specialization']], addFn: therapistApi.addSpecialization, delFn: therapistApi.deleteSpecialization, label: 'specializationName' },
//     4: { key: 'expertise', fields: [['areaName', 'Area Name']], addFn: therapistApi.addExpertise, delFn: therapistApi.deleteExpertise, label: 'areaName' },
//     5: { key: 'awards', fields: [['awardName', 'Award Name'], ['awardingBody', 'Awarding Body'], ['year', 'Year']], addFn: therapistApi.addAward, delFn: therapistApi.deleteAward, label: 'awardName' },
//     6: { key: 'memberships', fields: [['organizationName', 'Organization'], ['membershipId', 'Membership ID']], addFn: therapistApi.addMembership, delFn: therapistApi.deleteMembership, label: 'organizationName' },
//   }
//
//   async function addItem(e: React.FormEvent, cfg: typeof listConfigs[number]) {
//     e.preventDefault()
//     try {
//       await cfg.addFn(newItem)
//       toast.success('Added')
//       setNewItem({})
//       const key = cfg.key
//       const refreshFns: Record<string, Function> = {
//         quals: () => therapistApi.getQualifications().then(r => r.data.data || []),
//         exps: () => therapistApi.getExperiences().then(r => r.data.data || []),
//         specs: () => therapistApi.getSpecializations().then(r => r.data.data || []),
//         expertise: () => therapistApi.getExpertise().then(r => r.data.data || []),
//         awards: () => therapistApi.getAwards().then(r => r.data.data || []),
//         memberships: () => therapistApi.getMemberships().then(r => r.data.data || []),
//       }
//       const updated = await refreshFns[key]()
//       setLists(l => ({ ...l, [key]: updated }))
//     } catch (err: any) { toast.error(err.response?.data?.message || 'Failed') }
//   }
//
//   async function delItem(id: number, cfg: typeof listConfigs[number]) {
//     try {
//       await cfg.delFn(id)
//       setLists(l => ({ ...l, [cfg.key]: l[cfg.key].filter((x: any) => x.id !== id) }))
//       toast.success('Removed')
//     } catch { toast.error('Failed to remove') }
//   }
//
//   const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-neon-pink/50 focus:ring-1 focus:ring-neon-pink/50 transition-all"
//   const labelClass = "block text-sm font-medium text-white/70 mb-2"
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
//         Profile & Onboarding
//       </motion.h1>
//
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.1 }}
//         className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin"
//       >
//         {TABS.map((t, i) => {
//           const Icon = t.icon
//           return (
//             <motion.button
//               key={t.name}
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => setTab(i)}
//               className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
//                 tab === i
//                   ? 'bg-gradient-to-r from-neon-pink to-neon-purple text-white'
//                   : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
//               }`}
//             >
//               <Icon className="w-4 h-4" />
//               {t.name}
//             </motion.button>
//           )
//         })}
//       </motion.div>
//
//       <AnimatePresence mode="wait">
//         {tab === 0 && (
//           <motion.form
//             key="basic"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             onSubmit={saveProfile}
//             className="glass-card p-8 max-w-2xl space-y-6"
//           >
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className={labelClass}>Prefix</label>
//                 <select className={inputClass} value={profile.prefix || ''} onChange={setP('prefix')}>
//                   <option value="">Select</option>
//                   {['Dr.', 'Mr.', 'Ms.', 'Mrs.'].map(p => <option key={p} value={p}>{p}</option>)}
//                 </select>
//               </div>
//               <div>
//                 <label className={labelClass}>Category</label>
//                 <input className={inputClass} value={profile.category || ''} onChange={setP('category')} placeholder="e.g. Clinical Psychologist" />
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className={labelClass}>First Name</label>
//                 <input className={inputClass} value={profile.firstName || ''} onChange={setP('firstName')} />
//               </div>
//               <div>
//                 <label className={labelClass}>Last Name</label>
//                 <input className={inputClass} value={profile.lastName || ''} onChange={setP('lastName')} />
//               </div>
//             </div>
//             <div>
//               <label className={labelClass}>Brief Description</label>
//               <textarea className={`${inputClass} resize-none`} rows={4} value={profile.briefDescription || ''} onChange={setP('briefDescription')} placeholder="Describe your expertise..." />
//             </div>
//             <div className="grid grid-cols-3 gap-4">
//               <div>
//                 <label className={labelClass}>Experience (yrs)</label>
//                 <input className={inputClass} type="number" value={profile.experience || ''} onChange={setP('experience')} />
//               </div>
//               <div>
//                 <label className={labelClass}>Chat Fee</label>
//                 <input className={inputClass} type="number" value={profile.consultationFeeChat || ''} onChange={setP('consultationFeeChat')} />
//               </div>
//               <div>
//                 <label className={labelClass}>Video Fee</label>
//                 <input className={inputClass} type="number" value={profile.consultationFeeVideo || ''} onChange={setP('consultationFeeVideo')} />
//               </div>
//             </div>
//             <div>
//               <label className={labelClass}>Language</label>
//               <input className={inputClass} value={profile.language || ''} onChange={setP('language')} placeholder="e.g. English, Hindi" />
//             </div>
//             <div>
//               <label className={labelClass}>City</label>
//               <input className={inputClass} value={profile.presentCity || ''} onChange={setP('presentCity')} />
//             </div>
//             <motion.button
//               whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(233,30,140,0.4)' }}
//               whileTap={{ scale: 0.98 }}
//               type="submit"
//               disabled={saving}
//               className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple text-white font-semibold"
//             >
//               <Save className="w-4 h-4" />
//               {saving ? 'Saving...' : 'Save Profile'}
//             </motion.button>
//           </motion.form>
//         )}
//
//         {tab === 7 && (
//           <motion.form
//             key="bank"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             onSubmit={saveBankDetails}
//             className="glass-card p-8 max-w-lg space-y-6"
//           >
//             {[['accountHolderName', 'Account Holder Name'], ['accountNumber', 'Account Number'], ['ifscCode', 'IFSC Code'], ['bankName', 'Bank Name'], ['branchName', 'Branch Name'], ['upiId', 'UPI ID (optional)']].map(([k, l]) => (
//               <div key={k}>
//                 <label className={labelClass}>{l}</label>
//                 <input className={inputClass} value={bank[k] || ''} onChange={setB(k)} />
//               </div>
//             ))}
//             <motion.button
//               whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(233,30,140,0.4)' }}
//               whileTap={{ scale: 0.98 }}
//               type="submit"
//               disabled={saving}
//               className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple text-white font-semibold"
//             >
//               <Save className="w-4 h-4" />
//               {saving ? 'Saving...' : 'Save Bank Details'}
//             </motion.button>
//           </motion.form>
//         )}
//
//         {[1, 2, 3, 4, 5, 6].includes(tab) && (() => {
//           const cfg = listConfigs[tab]
//           return (
//             <motion.div
//               key={`list-${tab}`}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="glass-card p-8 max-w-xl space-y-6"
//             >
//               <div className="space-y-3">
//                 {lists[cfg.key].length === 0 ? (
//                   <p className="text-white/40 text-center py-4">None added yet.</p>
//                 ) : (
//                   lists[cfg.key].map((item: any) => (
//                     <motion.div
//                       key={item.id}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10"
//                     >
//                       <span className="text-white">{item[cfg.label]}</span>
//                       <motion.button
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         onClick={() => delItem(item.id, cfg)}
//                         className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
//                       >
//                         <X className="w-4 h-4" />
//                       </motion.button>
//                     </motion.div>
//                   ))
//                 )}
//               </div>
//
//               <div className="border-t border-white/10 pt-6">
//                 <h3 className="font-semibold text-white mb-4">Add New</h3>
//                 <form onSubmit={e => addItem(e, cfg)} className="space-y-4">
//                   {cfg.fields.map(([k, l]) => (
//                     <div key={k}>
//                       <label className={labelClass}>{l}</label>
//                       <input
//                         className={inputClass}
//                         value={newItem[k] || ''}
//                         onChange={e => setNewItem(p => ({ ...p, [k]: e.target.value }))}
//                       />
//                     </div>
//                   ))}
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     type="submit"
//                     className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple text-white font-semibold"
//                   >
//                     <Plus className="w-4 h-4" />
//                     Add
//                   </motion.button>
//                 </form>
//               </div>
//             </motion.div>
//           )
//         })()}
//       </AnimatePresence>
//     </motion.div>
//   )
// }


import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { therapistApi } from '../../api'
import toast from 'react-hot-toast'
import { User, GraduationCap, Briefcase, Award, BadgeCheck, Building2, CreditCard, Plus, X, Save } from 'lucide-react'

const COLORS = {
  sage: "#8BAF8E", sageLight: "#B8D4BB", sageDark: "#4A7A52",
  cream: "#F5F0E8", warmWhite: "#FDFAF5", deep: "#1A1F2E",
  charcoal: "#3D4454", gold: "#C9A96E", muted: "#7A8090", bg: "#F8F5EF",
  border: "rgba(26,31,46,0.08)", shadow: "0 4px 20px rgba(26,31,46,0.06)",
}

const TABS = [
  { name: 'Basic Info', icon: User },
  { name: 'Qualifications', icon: GraduationCap },
  { name: 'Experience', icon: Briefcase },
  { name: 'Specializations', icon: BadgeCheck },
  { name: 'Expertise', icon: Award },
  { name: 'Awards', icon: Award },
  { name: 'Memberships', icon: Building2 },
  { name: 'Bank Details', icon: CreditCard }
]

export default function TherapistProfilePage() {
  const [tab, setTab] = useState(0)
  const [profile, setProfile] = useState<any>({})
  const [lists, setLists] = useState<Record<string, any[]>>({ quals: [], exps: [], specs: [], expertise: [], awards: [], memberships: [] })
  const [bank, setBank] = useState<any>({})
  const [saving, setSaving] = useState(false)
  const [newItem, setNewItem] = useState<Record<string, string>>({})

  useEffect(() => {
    therapistApi.getProfile().then(r => setProfile(r.data.data || {})).catch(() => {})
    therapistApi.getBankDetails().then(r => setBank(r.data.data || {})).catch(() => {})
    Promise.all([
      therapistApi.getQualifications().then(r => r.data.data || []),
      therapistApi.getExperiences().then(r => r.data.data || []),
      therapistApi.getSpecializations().then(r => r.data.data || []),
      therapistApi.getExpertise().then(r => r.data.data || []),
      therapistApi.getAwards().then(r => r.data.data || []),
      therapistApi.getMemberships().then(r => r.data.data || []),
    ]).then(([quals, exps, specs, expertise, awards, memberships]) =>
      setLists({ quals, exps, specs, expertise, awards, memberships })
    )
  }, [])

  const setP = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setProfile((p: any) => ({ ...p, [k]: e.target.value }))
  const setB = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setBank((b: any) => ({ ...b, [k]: e.target.value }))

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault(); setSaving(true)
    try { await therapistApi.saveProfile(profile); toast.success('Profile saved') }
    catch (err: any) { toast.error(err.response?.data?.message || 'Failed') }
    finally { setSaving(false) }
  }

  async function saveBankDetails(e: React.FormEvent) {
    e.preventDefault(); setSaving(true)
    try { await therapistApi.saveBankDetails(bank); toast.success('Bank details saved') }
    catch (err: any) { toast.error(err.response?.data?.message || 'Failed') }
    finally { setSaving(false) }
  }

  const listConfigs: Record<number, { key: string; fields: [string, string][]; addFn: Function; delFn: Function; label: string }> = {
    1: { key: 'quals', fields: [['degree', 'Degree'], ['institution', 'Institution'], ['passingYear', 'Year']], addFn: therapistApi.addQualification, delFn: therapistApi.deleteQualification, label: 'degree' },
    2: { key: 'exps', fields: [['organization', 'Organization'], ['designation', 'Designation'], ['fromYear', 'From Year']], addFn: therapistApi.addExperience, delFn: therapistApi.deleteExperience, label: 'organization' },
    3: { key: 'specs', fields: [['specializationName', 'Specialization']], addFn: therapistApi.addSpecialization, delFn: therapistApi.deleteSpecialization, label: 'specializationName' },
    4: { key: 'expertise', fields: [['areaName', 'Area Name']], addFn: therapistApi.addExpertise, delFn: therapistApi.deleteExpertise, label: 'areaName' },
    5: { key: 'awards', fields: [['awardName', 'Award Name'], ['awardingBody', 'Awarding Body'], ['year', 'Year']], addFn: therapistApi.addAward, delFn: therapistApi.deleteAward, label: 'awardName' },
    6: { key: 'memberships', fields: [['organizationName', 'Organization'], ['membershipId', 'Membership ID']], addFn: therapistApi.addMembership, delFn: therapistApi.deleteMembership, label: 'organizationName' },
  }

  async function addItem(e: React.FormEvent, cfg: typeof listConfigs[number]) {
    e.preventDefault()
    try {
      await cfg.addFn(newItem)
      toast.success('Added')
      setNewItem({})
      const key = cfg.key
      const refreshFns: Record<string, Function> = {
        quals: () => therapistApi.getQualifications().then(r => r.data.data || []),
        exps: () => therapistApi.getExperiences().then(r => r.data.data || []),
        specs: () => therapistApi.getSpecializations().then(r => r.data.data || []),
        expertise: () => therapistApi.getExpertise().then(r => r.data.data || []),
        awards: () => therapistApi.getAwards().then(r => r.data.data || []),
        memberships: () => therapistApi.getMemberships().then(r => r.data.data || []),
      }
      const updated = await refreshFns[key]()
      setLists(l => ({ ...l, [key]: updated }))
    } catch (err: any) { toast.error(err.response?.data?.message || 'Failed') }
  }

  async function delItem(id: number, cfg: typeof listConfigs[number]) {
    try {
      await cfg.delFn(id)
      setLists(l => ({ ...l, [cfg.key]: l[cfg.key].filter((x: any) => x.id !== id) }))
      toast.success('Removed')
    } catch { toast.error('Failed to remove') }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', background: COLORS.warmWhite, border: `1px solid ${COLORS.border}`,
    borderRadius: 12, padding: '12px 16px', fontSize: 14, color: COLORS.deep,
    outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
      style={{ maxWidth: 800, margin: '0 auto', padding: '0 16px' }}
    >
      <style>{`
        .tp-input:focus { border-color: ${COLORS.sageDark} !important; box-shadow: 0 0 0 3px rgba(74,122,82,0.12) !important; }
        .tp-tab:hover { background: ${COLORS.sageLight}22 !important; color: ${COLORS.sageDark} !important; }
        .tp-item:hover { box-shadow: 0 8px 24px rgba(26,31,46,0.08) !important; transform: translateY(-1px); }
        .tp-item { transition: all 0.2s ease; }
        .tp-save-btn:hover { box-shadow: 0 8px 24px rgba(74,122,82,0.3) !important; transform: translateY(-1px); }
        .tp-save-btn { transition: all 0.25s ease; }
        .tp-del-btn:hover { background: rgba(220,53,69,0.12) !important; }
      `}</style>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
        style={{ marginBottom: 32, position: 'relative' }}
      >
        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: COLORS.sageDark, fontWeight: 500, marginBottom: 8 }}>
          Therapist Portal
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 700, color: COLORS.deep, lineHeight: 1.1, marginBottom: 6 }}>
          Profile &amp; <em style={{ fontStyle: 'italic', color: COLORS.sageDark }}>Onboarding</em>
        </h1>
        <p style={{ fontSize: 14, color: COLORS.muted, fontWeight: 300 }}>Complete your profile to start accepting sessions.</p>
      </motion.div>

      {/* Tab Bar */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.08 }}
        style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 28, justifyContent: 'center', flexWrap: 'wrap' }}
      >
        {TABS.map((t, i) => {
          const Icon = t.icon
          const active = tab === i
          return (
            <motion.button
              key={t.name}
              whileTap={{ scale: 0.97 }}
              onClick={() => setTab(i)}
              className="tp-tab"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '9px 16px', borderRadius: 12, fontSize: 13, fontWeight: 500,
                cursor: 'pointer', border: 'none', whiteSpace: 'nowrap', transition: 'all 0.2s',
                background: active ? COLORS.sageDark : COLORS.warmWhite,
                color: active ? 'white' : COLORS.charcoal,
                boxShadow: active ? `0 4px 14px rgba(74,122,82,0.25)` : COLORS.shadow,
              }}
            >
              <Icon size={14} />
              {t.name}
            </motion.button>
          )
        })}
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">

        {/* Basic Info */}
        {tab === 0 && (
          <motion.form
            key="basic"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            onSubmit={saveProfile}
            style={{ background: 'white', borderRadius: 22, padding: '32px 36px', border: `1px solid ${COLORS.border}`, boxShadow: COLORS.shadow, display: 'flex', flexDirection: 'column', gap: 20 }}
          >
            <SectionTitle>Personal Information</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <FieldWrap label="Prefix">
                <select className="tp-input" style={inputStyle} value={profile.prefix || ''} onChange={setP('prefix')}>
                  <option value="">Select</option>
                  {['Dr.', 'Mr.', 'Ms.', 'Mrs.'].map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </FieldWrap>
              <FieldWrap label="Category">
                <input className="tp-input" style={inputStyle} value={profile.category || ''} onChange={setP('category')} placeholder="e.g. Clinical Psychologist" />
              </FieldWrap>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <FieldWrap label="First Name">
                <input className="tp-input" style={inputStyle} value={profile.firstName || ''} onChange={setP('firstName')} />
              </FieldWrap>
              <FieldWrap label="Last Name">
                <input className="tp-input" style={inputStyle} value={profile.lastName || ''} onChange={setP('lastName')} />
              </FieldWrap>
            </div>
            <FieldWrap label="Brief Description">
              <textarea className="tp-input" style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }} rows={4} value={profile.briefDescription || ''} onChange={setP('briefDescription')} placeholder="Describe your expertise and approach..." />
            </FieldWrap>

            <SectionTitle style={{ marginTop: 8 }}>Professional Details</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              <FieldWrap label="Experience (yrs)">
                <input className="tp-input" style={inputStyle} type="number" value={profile.experience || ''} onChange={setP('experience')} />
              </FieldWrap>
              <FieldWrap label="Chat Fee (₹)">
                <input className="tp-input" style={inputStyle} type="number" value={profile.consultationFeeChat || ''} onChange={setP('consultationFeeChat')} />
              </FieldWrap>
              <FieldWrap label="Video Fee (₹)">
                <input className="tp-input" style={inputStyle} type="number" value={profile.consultationFeeVideo || ''} onChange={setP('consultationFeeVideo')} />
              </FieldWrap>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <FieldWrap label="Language">
                <input className="tp-input" style={inputStyle} value={profile.language || ''} onChange={setP('language')} placeholder="e.g. English, Hindi" />
              </FieldWrap>
              <FieldWrap label="City">
                <input className="tp-input" style={inputStyle} value={profile.presentCity || ''} onChange={setP('presentCity')} />
              </FieldWrap>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
              <button
                type="submit"
                disabled={saving}
                className="tp-save-btn"
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '13px 36px', borderRadius: 14, border: 'none', cursor: 'pointer',
                  background: COLORS.sageDark, color: 'white', fontSize: 14, fontWeight: 600,
                }}
              >
                <Save size={16} />
                {saving ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </motion.form>
        )}

        {/* Bank Details */}
        {tab === 7 && (
          <motion.form
            key="bank"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            onSubmit={saveBankDetails}
            style={{ background: 'white', borderRadius: 22, padding: '32px 36px', border: `1px solid ${COLORS.border}`, boxShadow: COLORS.shadow, display: 'flex', flexDirection: 'column', gap: 18 }}
          >
            <SectionTitle>Bank Information</SectionTitle>
            {([['accountHolderName', 'Account Holder Name'], ['accountNumber', 'Account Number'], ['ifscCode', 'IFSC Code'], ['bankName', 'Bank Name'], ['branchName', 'Branch Name'], ['upiId', 'UPI ID (optional)']] as [string, string][]).map(([k, l]) => (
              <FieldWrap key={k} label={l}>
                <input className="tp-input" style={inputStyle} value={bank[k] || ''} onChange={setB(k)} />
              </FieldWrap>
            ))}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
              <button
                type="submit"
                disabled={saving}
                className="tp-save-btn"
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '13px 36px', borderRadius: 14, border: 'none', cursor: 'pointer',
                  background: COLORS.sageDark, color: 'white', fontSize: 14, fontWeight: 600,
                }}
              >
                <Save size={16} />
                {saving ? 'Saving...' : 'Save Bank Details'}
              </button>
            </div>
          </motion.form>
        )}

        {/* List Tabs */}
        {[1, 2, 3, 4, 5, 6].includes(tab) && (() => {
          const cfg = listConfigs[tab]
          return (
            <motion.div
              key={`list-${tab}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              style={{ background: 'white', borderRadius: 22, padding: '32px 36px', border: `1px solid ${COLORS.border}`, boxShadow: COLORS.shadow, display: 'flex', flexDirection: 'column', gap: 20 }}
            >
              <SectionTitle>Added Items</SectionTitle>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {lists[cfg.key].length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '28px 0', color: COLORS.muted, fontSize: 14, background: COLORS.bg, borderRadius: 14 }}>
                    No items added yet.
                  </div>
                ) : (
                  lists[cfg.key].map((item: any) => (
                    <motion.div
                      key={item.id}
                      className="tp-item"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '14px 18px', borderRadius: 14,
                        background: COLORS.warmWhite, border: `1px solid ${COLORS.border}`,
                      }}
                    >
                      <span style={{ fontSize: 14, color: COLORS.deep, fontWeight: 500 }}>{item[cfg.label]}</span>
                      <button
                        className="tp-del-btn"
                        onClick={() => delItem(item.id, cfg)}
                        style={{
                          border: 'none', cursor: 'pointer', padding: '7px 10px', borderRadius: 10,
                          background: 'rgba(220,53,69,0.07)', color: '#dc3545', transition: 'background 0.2s',
                          display: 'flex', alignItems: 'center',
                        }}
                      >
                        <X size={14} />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 24 }}>
                <SectionTitle>Add New</SectionTitle>
                <form onSubmit={e => addItem(e, cfg)} style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
                  {cfg.fields.map(([k, l]) => (
                    <FieldWrap key={k} label={l}>
                      <input
                        className="tp-input"
                        style={inputStyle}
                        value={newItem[k] || ''}
                        onChange={e => setNewItem(p => ({ ...p, [k]: e.target.value }))}
                      />
                    </FieldWrap>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button
                      type="submit"
                      className="tp-save-btn"
                      style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '12px 32px', borderRadius: 14, border: 'none', cursor: 'pointer',
                        background: COLORS.sageDark, color: 'white', fontSize: 14, fontWeight: 600,
                      }}
                    >
                      <Plus size={15} />
                      Add Item
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </motion.div>
  )
}

// Helper components
function SectionTitle({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: '#1A1F2E', ...style }}>
      {children}
    </div>
  )
}

function FieldWrap({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 500, color: '#7A8090', letterSpacing: 0.3 }}>{label}</label>
      {children}
    </div>
  )
}