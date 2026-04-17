import { motion } from 'framer-motion'
import './Courses.css'

const trainings = [
  {
    image: '/assets/Three ways to build fluency/1-to-1 Personalised Training.jpg',
    accent: 'red',
    name: '1-to-1 Personalised Training',
    tagline: 'Focused. Personal. Effective.',
    description:
      'One-to-one trainer guidance helps you focus on speaking clearly, correcting mistakes, and improving step by step at your own pace.',
    highlights: [
      'Dedicated personal trainer',
      'Customised to your level',
      'Flexible scheduling',
      'Track your progress weekly',
    ],
  },
  {
    image: '/assets/Three ways to build fluency/Group Learning.jpg',
    accent: 'blue',
    name: 'Group Learning',
    tagline: 'Practice. Collaborate. Grow.',
    description:
      'Learning alongside others creates a supportive environment where practice feels easier and progress happens faster through real interaction.',
    highlights: [
      'Small batch sizes',
      'Live speaking practice',
      'Peer-to-peer learning',
      'Build real confidence',
    ],
  },
  {
    image: '/assets/Three ways to build fluency/Real-Life Speaking.jpg',
    accent: 'purple',
    name: 'Real-Life Speaking',
    tagline: 'Express. Present. Lead.',
    description:
      'Through real-life speaking exercises, you learn how voice, expression, and posture strengthen communication and build lasting confidence.',
    highlights: [
      'Body language training',
      'Public speaking practice',
      'Presentation skills',
      'Professional communication',
    ],
  },
]

const WA_LINK =
  'https://api.whatsapp.com/send/?phone=918667272183&text=Hi%2C+I+would+like+to+know+more+about+the+courses.&type=phone_number&app_absent=0'

export default function Courses() {
  return (
    <section className="courses-section" id="courses">
      <div className="section-header">
        <span className="section-label">Training Methods</span>
        <h2 className="section-title">
          Three ways to <span className="title-accent">build fluency</span>
        </h2>
        <p className="section-sub">
          Each training method is designed to develop a different aspect of your
          communication — combine them for the best results.
        </p>
      </div>

      <div className="courses-grid">
        {trainings.map((t, i) => (
          <motion.div
            key={i}
            className={`course-card course-card--${t.accent}`}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            <div className={`card-glow card-glow--${t.accent}`} />

            <div className="card-image-wrap">
              <img className="card-image" src={t.image} alt={t.name} loading="lazy" decoding="async" />
            </div>

            <h3 className="course-name">{t.name}</h3>
            <p className="course-tagline">{t.tagline}</p>
            <p className="course-desc">{t.description}</p>

            <ul className="course-highlights">
              {t.highlights.map((h, j) => (
                <li key={j}>
                  <span className={`highlight-dot dot--${t.accent}`} />
                  {h}
                </li>
              ))}
            </ul>

            <motion.a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className={`course-cta course-cta--${t.accent}`}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Book Free Demo
            </motion.a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
