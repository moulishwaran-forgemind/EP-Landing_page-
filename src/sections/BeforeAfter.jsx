import { useRef } from 'react'
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import './BeforeAfter.css'

const transformations = [
  {
    before: { icon: '😰', text: 'Hesitate to speak in public', tag: 'Nervous' },
    after:  { icon: '🎤', text: 'Speak fluently & clearly',     tag: 'Confident' },
  },
  {
    before: { icon: '😓', text: 'Fear of making mistakes',       tag: 'Anxious' },
    after:  { icon: '💪', text: 'Learn from mistakes boldly',    tag: 'Fearless' },
  },
  {
    before: { icon: '😶', text: 'Silent in meetings',            tag: 'Unheard' },
    after:  { icon: '🏆', text: 'Lead meetings & presentations', tag: 'Leader' },
  },
  {
    before: { icon: '📖', text: 'Struggle with vocabulary',      tag: 'Limited' },
    after:  { icon: '📚', text: 'Rich vocabulary & expressions', tag: 'Eloquent' },
  },
  {
    before: { icon: '🤐', text: 'Avoid English conversations',   tag: 'Withdrawn' },
    after:  { icon: '🗣️', text: 'Enjoy English conversations',   tag: 'Engaging' },
  },
]

const N = transformations.length
const SEG = 100 / N

export default function BeforeAfter() {
  const trackRef = useRef(null)
  const headersRef = useRef(null)
  const afterBgRef = useRef(null)
  const sliderBarRef = useRef(null)
  const hintRef = useRef(null)
  const beforeLayerRefs = useRef([])
  const afterLayerRefs = useRef([])
  const cardRefs = useRef([])

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  const slider = useTransform(scrollYProgress, [0.08, 0.92], [0, 100], { clamp: true })

  // Drive all clip-paths / styles directly from the MotionValue — no React re-renders
  useMotionValueEvent(slider, 'change', (v) => {
    if (afterBgRef.current) afterBgRef.current.style.clipPath = `inset(0 0 0 ${v}%)`
    if (sliderBarRef.current) sliderBarRef.current.style.left = `${v}%`

    for (let i = 0; i < N; i++) {
      const start = i * SEG
      const progress = Math.max(0, Math.min(1, (v - start) / SEG))
      const before = beforeLayerRefs.current[i]
      const after = afterLayerRefs.current[i]
      const card = cardRefs.current[i]
      if (before) before.style.clipPath = `inset(0 ${progress * 100}% 0 0)`
      if (after) after.style.clipPath = `inset(0 0 0 ${(1 - progress) * 100}%)`
      if (card) {
        const isAfter = progress >= 0.5
        card.classList.toggle('is-after', isAfter)
        card.classList.toggle('is-before', !isAfter)
      }
    }

    if (headersRef.current) {
      headersRef.current.classList.toggle('is-after-active', v >= 50)
      headersRef.current.classList.toggle('is-before-active', v < 50)
    }
    if (hintRef.current) {
      hintRef.current.textContent = v < 95
        ? 'Scroll down to reveal the transformation'
        : 'You just saw the transformation ✨'
    }
  })

  return (
    <section className="before-after-section" ref={trackRef}>
      <div className="ba-sticky">
        <div className="section-header">
          <span className="section-label">Transformation</span>
          <h2 className="section-title">
            See the <span className="title-accent">difference</span>
          </h2>
          <p className="section-sub">
            Keep scrolling — watch every habit transform, one by one.
          </p>
        </div>

        <div className="ba-wrapper">
          <div ref={headersRef} className="ba-col-headers is-before-active">
            <div className="ba-col-header ba-col-header--before">
              <span className="ba-dot ba-dot--before" /> Before Training
            </div>
            <div className="ba-col-header ba-col-header--after">
              After Training <span className="ba-dot ba-dot--after" />
            </div>
          </div>

          <div className="ba-container">
            <div className="ba-bg ba-bg--before" />
            <div ref={afterBgRef} className="ba-bg ba-bg--after" style={{ clipPath: 'inset(0 0 0 0%)' }} />

            <div className="ba-cards">
              {transformations.map((card, i) => (
                <div
                  key={i}
                  ref={(el) => (cardRefs.current[i] = el)}
                  className="ba-card is-before"
                >
                  <div
                    ref={(el) => (beforeLayerRefs.current[i] = el)}
                    className="ba-card-state ba-card-state--before"
                    style={{ clipPath: 'inset(0 0% 0 0)' }}
                  >
                    <div className="ba-card-icon ba-card-icon--before">{card.before.icon}</div>
                    <span className="ba-card-tag ba-card-tag--before">{card.before.tag}</span>
                    <span className="ba-card-label ba-card-label--before">{card.before.text}</span>
                  </div>

                  <div
                    ref={(el) => (afterLayerRefs.current[i] = el)}
                    className="ba-card-state ba-card-state--after"
                    style={{ clipPath: 'inset(0 0 0 100%)' }}
                  >
                    <div className="ba-card-icon ba-card-icon--after">{card.after.icon}</div>
                    <span className="ba-card-tag ba-card-tag--after">{card.after.tag}</span>
                    <span className="ba-card-label ba-card-label--after">{card.after.text}</span>
                  </div>
                </div>
              ))}
            </div>

            <div ref={sliderBarRef} className="ba-slider" style={{ left: '0%' }}>
              <div className="ba-slider-line" />
              <div className="ba-slider-handle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </div>
            </div>
          </div>

          <p className="ba-hint">
            <span className="ba-hint-dot" />
            <span ref={hintRef}>Scroll down to reveal the transformation</span>
          </p>
        </div>
      </div>
    </section>
  )
}
