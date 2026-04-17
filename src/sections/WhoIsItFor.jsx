import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import './WhoIsItFor.css'

const audiences = [
  {
    id: '01',
    title: 'Students',
    desc: 'Master the academic stage. Enhance your participation in seminars, excel in group projects, and build the foundational confidence required for your very first campus placement interviews.',
    image: '/assets/Who is this Training for Images/Students.avif',
    color: 'linear-gradient(135deg, #60A5FA, #3B82F6)',
    objectPosition: 'top',
    details: {
      headline: 'Built to help students speak up — in class and beyond.',
      paragraph:
        'College is where communication habits are formed. Our sessions give students a safe, practical space to move past shyness, build fluency, and think clearly in English so classroom discussions, seminars, and campus interviews stop feeling intimidating.',
      points: [
        'Speak comfortably in classroom discussions and group activities',
        'Handle seminar and presentation Q&A without freezing up',
        'Prepare for campus placements, GDs and HR interviews',
        'Build strong day-to-day vocabulary for real conversations',
        'Improve pronunciation and remove mother-tongue influence gradually',
      ],
    },
  },
  {
    id: '02',
    title: 'Job Seekers',
    desc: 'Bridge the gap to employment. Refine your interview presence, navigate complex group discussions with ease, and develop the professional vocabulary needed to secure your ideal career role.',
    image: '/assets/Who is this Training for Images/Job Seekers.jpg',
    color: 'linear-gradient(135deg, #F472B6, #EC4899)',
    objectPosition: 'top',
    details: {
      headline: 'Turn interviews from stressful to winnable.',
      paragraph:
        'Most candidates know their subject — they lose offers because they cannot express it clearly under pressure. We train job seekers to structure answers, speak with confidence, and carry themselves well in every round.',
      points: [
        'Interview-specific speaking practice (HR, technical, behavioural)',
        'Group discussion strategy, turn-taking and body language',
        'Frame clear answers for "Tell me about yourself" & tricky questions',
        'Improve fluency, tone and professional vocabulary',
        'Mock sessions with real-time feedback from trainers',
      ],
    },
  },
  {
    id: '03',
    title: 'Working Professionals',
    desc: 'Command the corporate room. Elevate your influence in high-stakes meetings, deliver persuasive executive presentations, and articulate your ideas with the precision that drives significant career progression.',
    image: '/assets/Who is this Training for Images/Working Professionals.jpg',
    color: 'linear-gradient(135deg, #34D399, #10B981)',
    objectPosition: 'center',
    details: {
      headline: 'Communicate like the leader you want to become.',
      paragraph:
        'At work, the person who communicates clearly gets the opportunities. Our training helps professionals lead meetings, present ideas, handle clients and speak up in reviews — without second-guessing their English.',
      points: [
        'Confidently lead meetings, stand-ups and client calls',
        'Deliver presentations that sound structured and persuasive',
        'Email and business writing that gets responses',
        'Handle feedback, disagreements and negotiations in English',
        'Flexible batch timings designed around work schedules',
      ],
    },
  },
  {
    id: '04',
    title: 'Aspiring Speakers',
    desc: 'Transform your everyday voice. Perfect your communication for social settings, master the art of public speaking, and project a charismatic presence in every personal and professional interaction.',
    image: '/assets/Who is this Training for Images/Aspiring Speakers.avif',
    color: 'linear-gradient(135deg, #A78BFA, #8B5CF6)',
    objectPosition: 'top',
    details: {
      headline: 'Speak English the way you actually want to live it.',
      paragraph:
        'For anyone who wants to hold a real conversation in English — whether with colleagues, new people, travel situations or family. We focus on natural, everyday speaking, not textbook grammar drills.',
      points: [
        'Everyday conversation practice on real-life topics',
        'Overcome hesitation, fear of making mistakes and stage fear',
        'Build listening skills to understand native-paced English',
        'Storytelling, opinions and small-talk that feels natural',
        'Supportive classroom where mistakes are welcomed, not judged',
      ],
    },
  },
]

export default function WhoIsItFor() {
  const [activeId, setActiveId] = useState(null)
  const active = audiences.find((a) => a.id === activeId) || null

  useEffect(() => {
    if (!active) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setActiveId(null)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [active])

  return (
    <section className="audience-section" id="who-is-it-for">
      <div className="section-header">
        <span className="section-label">LEARNER FOCUS</span>
        <h2 className="section-title">
          Who is this <span className="title-accent">Training for?</span>
        </h2>
        <p className="section-sub">
          This training is designed for people who want to improve how they communicate in their personal,
          professional and social life. Whether you are starting from the basics or looking to speak more confidently,
          the classroom environment helps you practice, learn, and grow at your own pace.
        </p>
      </div>

      <div className="audience-grid">
        {audiences.map((aud, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveId(aud.id)}
            className="audience-card"
            style={{ '--hover-color': aud.color }}
            aria-label={`Read more about ${aud.title}`}
          >
            <div className="audience-number-watermark">{aud.id}</div>

            <div 
              className="audience-asset-container"
              style={{ 
                background: aud.color,
                animationDuration: `${4 + i * 0.5}s`
              }}
            >
              <img 
                className="audience-image-box" 
                src={aud.image} 
                alt={aud.title} 
                loading="lazy" 
                decoding="async" 
                style={{ objectPosition: aud.objectPosition || 'center' }}
              />
            </div>

            <div className="audience-content">
              <h3 className="audience-title">{aud.title}</h3>
              <p className="audience-desc">{aud.desc}</p>
            </div>

            <span className="audience-arrow" aria-hidden style={{ background: aud.color }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </button>
        ))}
      </div>

      {createPortal(
      <AnimatePresence>
        {active && (
          <motion.div
            className="audience-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveId(null)}
          >
            <motion.div
              className="audience-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="audience-modal-title"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="audience-modal-close"
                onClick={() => setActiveId(null)}
                aria-label="Close"
              >
                ×
              </button>

              <div className="audience-modal-header" style={{ background: active.color }}>
                <img className="audience-modal-img" src={active.image} alt={active.title} />
                <div>
                  <span className="audience-modal-id">{active.id}</span>
                  <h3 id="audience-modal-title" className="audience-modal-title">
                    {active.title}
                  </h3>
                </div>
              </div>

              <div className="audience-modal-body">
                <h4 className="audience-modal-headline">{active.details.headline}</h4>
                <p className="audience-modal-para">{active.details.paragraph}</p>

                <ul className="audience-modal-points">
                  {active.details.points.map((p, idx) => (
                    <li key={idx}>
                      <span className="audience-modal-bullet" style={{ background: active.color }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}
    </section>
  )
}
