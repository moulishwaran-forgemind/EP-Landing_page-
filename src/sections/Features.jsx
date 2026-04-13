import { motion } from 'framer-motion'
import './Features.css'

const features = [
  {
    icon: '🧑‍🏫',
    title: 'Physical Presence Demands Your Full Attention',
    desc: 'One-to-one trainer guidance helps you focus on speaking clearly, correcting mistakes, and improving step by step.',
  },
  {
    icon: '🎤',
    title: 'Presenting Live Sharpens Your Professional Confidence',
    desc: 'Learning alongside others creates a supportive environment where practice feels easier and progress happens faster.',
  },
  {
    icon: '🤝',
    title: 'Body Language Adds Power To Words',
    desc: 'Through real-life speaking exercises, you learn how voice, expression, and posture strengthen communication and build confidence.',
  },
  {
    icon: '💬',
    title: '1-on-1 Personalised Training',
    desc: 'Personalised coaching ensures your weaknesses are addressed directly by the trainer — not a generic curriculum.',
  },
  {
    icon: '🗣️',
    title: 'Daily Conversation Practice',
    desc: 'Our direct classes combine Trainer Guidance, Structured Lessons, and Daily Conversation practice so learners improve naturally.',
  },
  {
    icon: '🏆',
    title: 'Most Reviewed Institute in TN',
    desc: 'Trusted by 2,00,000+ learners across Tamil Nadu. With lifetime trainer assistance and a 7-day money-back guarantee.',
  },
]

export default function Features() {
  return (
    <section className="features-section" id="features">
      <div className="section-header">
        <span className="section-label">Why Direct Training?</span>
        <h2 className="section-title">
          The classroom experience<br />
          <span className="title-accent">makes the difference</span>
        </h2>
        <p className="section-sub">
          Learning in a classroom creates a different level of focus and engagement. With a trainer present
          and learners around you, speaking becomes a regular habit rather than something you practice occasionally.
        </p>
      </div>

      <div className="features-grid">
        {features.map((f, i) => (
          <motion.div
            key={i}
            className="feature-card"
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            <div className="feature-icon">{f.icon}</div>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-desc">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
