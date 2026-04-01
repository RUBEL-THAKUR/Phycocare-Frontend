import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { userApi } from '../../api'
import toast from 'react-hot-toast'
import { Award, Copy, Calendar, ChevronDown, ChevronUp, Gift } from 'lucide-react'

export default function RewardsPage() {
  const [rewards, setRewards] = useState<any[]>([])
  const [expanded, setExpanded] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    userApi
      .getRewards()
      .then((r) => setRewards(r.data.data || []))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .rp-root {
          min-height: 100vh;
          background: #F8F5EF;
          font-family: 'DM Sans', sans-serif;
          padding: 48px 28px 72px;
        }

        .rp-wrap {
          max-width: 1100px;
          margin: 0 auto;
        }

        /* ── HEADER ── */
        .rp-header {
          text-align: center;
          margin-bottom: 44px;
        }
        .rp-header-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 18px;
          background: rgba(139,175,142,0.12);
          border: 1px solid rgba(139,175,142,0.3);
          border-radius: 40px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #8BAF8E;
          margin-bottom: 16px;
        }
        .rp-page-title {
          font-family: 'Playfair Display', serif;
          font-size: 42px;
          font-weight: 700;
          color: #1A1F2E;
          line-height: 1.1;
          margin-bottom: 10px;
        }
        .rp-page-title em {
          font-style: italic;
          color: #4A7A52;
        }
        .rp-page-sub {
          font-size: 15px;
          color: #7A8090;
          font-weight: 300;
          max-width: 400px;
          margin: 0 auto;
          line-height: 1.6;
        }
        .rp-header-line {
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, #8BAF8E, transparent);
          margin: 20px auto 0;
          border-radius: 2px;
        }

        /* ── SUMMARY — same look as ud-stats ── */
        .rp-summary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          margin-bottom: 36px;
          padding: 22px 32px;
          background: white;
          border-radius: 20px;
          border: 1px solid rgba(26,31,46,0.07);
          box-shadow: 0 4px 20px rgba(26,31,46,0.05);
          flex-wrap: wrap;
        }
        .rp-summary-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .rp-summary-value {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #1A1F2E;
          line-height: 1;
        }
        .rp-summary-label {
          font-size: 13px;
          color: #7A8090;
          font-weight: 400;
        }
        .rp-summary-divider {
          width: 1px;
          height: 36px;
          background: rgba(26,31,46,0.08);
        }

        /* ── SECTION HEAD — same as ud-section-head ── */
        .rp-section-head {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 20px;
        }
        .rp-section-title {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          color: #1A1F2E;
        }
        .rp-section-sub {
          font-size: 13px;
          color: #7A8090;
          font-weight: 300;
        }

        /* ── GRID ── */
        .rp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 16px;
        }
        @media (max-width: 560px) { .rp-grid { grid-template-columns: 1fr; } }

        /* ── CARD — mirrors ud-card exactly ── */
        .rp-card {
          background: white;
          border-radius: 20px;
          border: 1px solid rgba(26,31,46,0.07);
          box-shadow: 0 4px 20px rgba(26,31,46,0.04);
          overflow: hidden;
          transition: all 0.25s;
          position: relative;
        }
        .rp-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #4A7A52;
          opacity: 0;
          transition: opacity 0.25s;
          pointer-events: none;
          border-radius: inherit;
          z-index: 0;
        }
        .rp-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(26,31,46,0.1);
          border-color: #8BAF8E;
        }
        .rp-card:hover::before { opacity: 0.04; }

        /* green top stripe */
        .rp-card-stripe {
          height: 4px;
          background: linear-gradient(90deg, #4A7A52, #8BAF8E);
          position: relative;
          z-index: 1;
        }

        .rp-card-header {
          padding: 20px 22px 16px;
          border-bottom: 1px solid rgba(26,31,46,0.06);
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 14px;
          position: relative;
          z-index: 1;
        }

        /* icon wrap — same as ud-card-icon-wrap */
        .rp-icon-wrap {
          width: 46px; height: 46px;
          border-radius: 13px;
          background: #4A7A5218;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 14px;
        }

        .rp-card-partner {
          font-family: 'Playfair Display', serif;
          font-size: 17px;
          font-weight: 700;
          color: #1A1F2E;
          margin-bottom: 4px;
          transition: color 0.2s;
        }
        .rp-card:hover .rp-card-partner { color: #4A7A52; }

        .rp-card-desc {
          font-size: 13px;
          color: #7A8090;
          font-weight: 300;
          line-height: 1.5;
        }

        /* discount badge — green tint like ud-stat-icon bg */
        .rp-discount-badge {
          flex-shrink: 0;
          background: #EDF3EE;
          border: 1px solid rgba(74,122,82,0.2);
          color: #4A7A52;
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          font-weight: 700;
          padding: 8px 14px;
          border-radius: 14px;
          text-align: center;
          line-height: 1.2;
          white-space: nowrap;
        }
        .rp-discount-badge span {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          color: #8BAF8E;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .rp-card-body {
          padding: 18px 22px 22px;
          position: relative;
          z-index: 1;
        }

        /* promo code box */
        .rp-promo-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: #F8F5EF;
          border: 1.5px dashed rgba(139,175,142,0.5);
          border-radius: 12px;
          margin-bottom: 14px;
        }
        .rp-promo-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #8BAF8E;
          margin-bottom: 3px;
        }
        .rp-promo-code {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 700;
          color: #1A1F2E;
          letter-spacing: 1px;
        }
        .rp-copy-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          background: #1A1F2E;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .rp-copy-btn:hover { background: #4A7A52; }

        /* validity */
        .rp-validity {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 12.5px;
          color: #7A8090;
          margin-bottom: 14px;
        }

        /* terms toggle — green */
        .rp-terms-toggle {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12.5px;
          font-weight: 500;
          color: #4A7A52;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 14px;
          transition: color 0.2s;
        }
        .rp-terms-toggle:hover { color: #3D7A5A; }

        .rp-terms-body {
          font-size: 12.5px;
          color: #7A8090;
          line-height: 1.6;
          padding: 12px 14px;
          background: #EDF3EE;
          border-radius: 10px;
          margin-bottom: 14px;
          overflow: hidden;
        }

        /* claim btn — dark → green on hover, same as copy */
        .rp-claim-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 13px;
          background: #1A1F2E;
          color: white;
          border: none;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.25s;
          letter-spacing: 0.3px;
        }
        .rp-claim-btn:hover {
          background: #4A7A52;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(74,122,82,0.25);
        }

        /* ── EMPTY ── */
        .rp-empty {
          text-align: center;
          padding: 80px 40px;
          background: white;
          border-radius: 24px;
          border: 1px solid rgba(26,31,46,0.07);
          box-shadow: 0 4px 20px rgba(26,31,46,0.04);
        }
        .rp-empty-icon {
          width: 72px; height: 72px;
          border-radius: 50%;
          background: #EDF3EE;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
        }
        .rp-empty-title {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 700;
          color: #1A1F2E;
          margin-bottom: 8px;
        }
        .rp-empty-sub {
          font-size: 14px;
          color: #7A8090;
          font-weight: 300;
        }

        /* ── LOADING ── */
        .rp-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 280px;
        }
        .rp-spinner {
          width: 36px; height: 36px;
          border: 2.5px solid rgba(139,175,142,0.2);
          border-top-color: #8BAF8E;
          border-radius: 50%;
          animation: rp-spin 0.8s linear infinite;
        }
        @keyframes rp-spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="rp-root">
        <div className="rp-wrap">

          {/* HEADER */}
          <motion.div
            className="rp-header"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rp-header-badge">
              <Award size={12} />
              Exclusive Offers
            </div>
            <div className="rp-page-title">Your <em>Rewards</em></div>
            <div className="rp-page-sub">
              Unlock exclusive partner offers and claim your well-earned benefits
            </div>
            <div className="rp-header-line" />
          </motion.div>

          {/* SUMMARY */}
          {!loading && rewards.length > 0 && (
            <motion.div
              className="rp-summary"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              <div className="rp-summary-item">
                <div className="rp-summary-value">{rewards.length}</div>
                <div className="rp-summary-label">Available Rewards</div>
              </div>
              <div className="rp-summary-divider" />
              <div className="rp-summary-item">
                <div className="rp-summary-value">
                  ₹{rewards.reduce((s: number, r: any) => s + (r.discountValue || 0), 0)}
                </div>
                <div className="rp-summary-label">Total Savings</div>
              </div>
              <div className="rp-summary-divider" />
              <div className="rp-summary-item">
                <div className="rp-summary-value">
                  {rewards.filter((r: any) => r.validTill && new Date(r.validTill) > new Date()).length}
                </div>
                <div className="rp-summary-label">Active Offers</div>
              </div>
            </motion.div>
          )}

          {/* CONTENT */}
          {loading ? (
            <div className="rp-loading"><div className="rp-spinner" /></div>
          ) : rewards.length === 0 ? (
            <motion.div
              className="rp-empty"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="rp-empty-icon">
                <Award size={30} style={{ color: '#4A7A52' }} />
              </div>
              <div className="rp-empty-title">No Rewards Yet</div>
              <div className="rp-empty-sub">Check back later for exclusive partner offers</div>
            </motion.div>
          ) : (
            <>
              <div className="rp-section-head">
                <div className="rp-section-title">All Offers</div>
                <div className="rp-section-sub">{rewards.length} rewards available</div>
              </div>

              <motion.div
                className="rp-grid"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
                }}
              >
                {rewards.map((r: any) => (
                  <motion.div
                    key={r.id}
                    className="rp-card"
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                    }}
                  >
                    <div className="rp-card-stripe" />

                    <div className="rp-card-header">
                      <div>
                        <div className="rp-icon-wrap">
                          <Gift size={20} style={{ color: '#4A7A52' }} />
                        </div>
                        <div className="rp-card-partner">{r.partnerName}</div>
                        <div className="rp-card-desc">{r.description}</div>
                      </div>
                      <div className="rp-discount-badge">
                        ₹{r.discountValue}
                        <span>OFF</span>
                      </div>
                    </div>

                    <div className="rp-card-body">
                      <div className="rp-promo-box">
                        <div>
                          <div className="rp-promo-label">Promo Code</div>
                          <div className="rp-promo-code">{r.promoCode}</div>
                        </div>
                        <motion.button
                          className="rp-copy-btn"
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => {
                            navigator.clipboard.writeText(r.promoCode)
                            toast.success('Code copied!')
                          }}
                        >
                          <Copy size={12} /> Copy
                        </motion.button>
                      </div>

                      {r.validTill && (
                        <div className="rp-validity">
                          <Calendar size={13} />
                          Valid till {new Date(r.validTill).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                      )}

                      <button
                        className="rp-terms-toggle"
                        onClick={() => setExpanded(expanded === r.id ? null : r.id)}
                      >
                        {expanded === r.id
                          ? <><ChevronUp size={14} /> Hide Terms</>
                          : <><ChevronDown size={14} /> View Terms</>
                        }
                      </button>

                      <AnimatePresence>
                        {expanded === r.id && (
                          <motion.div
                            className="rp-terms-body"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {r.terms}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.button
                        className="rp-claim-btn"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Gift size={15} /> Claim Reward
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}

        </div>
      </div>
    </>
  )
}