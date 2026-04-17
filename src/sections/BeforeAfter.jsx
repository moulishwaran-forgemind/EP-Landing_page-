import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import './BeforeAfter.css'

const transformations = [
  {
    before: { img: '/assets/transformations/before-1.webp', text: 'Hesitate to speak in public',    tag: 'Nervous' },
    after:  { img: '/assets/transformations/after-1.webp',  text: 'Speak fluently & clearly',        tag: 'Confident' },
  },
  {
    before: { img: '/assets/transformations/before-2.webp', text: 'Fear of making mistakes',        tag: 'Anxious' },
    after:  { img: '/assets/transformations/after-2.webp',  text: 'Learn from mistakes boldly',     tag: 'Fearless' },
  },
  {
    before: { img: '/assets/transformations/before-3.webp', text: 'Silent in meetings',             tag: 'Unheard' },
    after:  { img: '/assets/transformations/after-3.webp',  text: 'Lead meetings & presentations',   tag: 'Leader' },
  },
  {
    before: { img: '/assets/transformations/before-4.webp', text: 'Struggle with vocabulary',       tag: 'Limited' },
    after:  { img: '/assets/transformations/after-4.webp',  text: 'Rich vocabulary & expressions',   tag: 'Eloquent' },
  },
  {
    before: { img: '/assets/transformations/before-5.webp', text: 'Avoid English conversations',    tag: 'Withdrawn' },
    after:  { img: '/assets/transformations/after-5.webp',  text: 'Enjoy English conversations',    tag: 'Engaging' },
  },
]

const N = transformations.length
const SEG = 100 / N

/* ══════════════════════════════════════════════════
   Mobile: slider comparison + thumbnail selectors
   ══════════════════════════════════════════════════ */

function MobileBeforeAfter() {
  const [active, setActive] = useState(0)
  const [sliderX, setSliderX] = useState(50)
  const compareRef = useRef(null)
  const dragging = useRef(false)

  const card = transformations[active]

  const getPercent = (e) => {
    const rect = compareRef.current.getBoundingClientRect()
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left
    return Math.max(8, Math.min(92, (x / rect.width) * 100))
  }

  const onStart = (e) => { dragging.current = true; setSliderX(getPercent(e)) }
  const onMove = (e) => {
    if (!dragging.current) return
    e.preventDefault()
    setSliderX(getPercent(e))
  }
  const onEnd = () => { dragging.current = false }

  // Reset slider to center when switching transformation
  useEffect(() => { setSliderX(50) }, [active])

  return (
    <section className="before-after-section ba-mobile">
      <div className="section-header">
        <span className="section-label">Transformation</span>
        <h2 className="section-title">
          See the <span className="title-accent">difference</span>
        </h2>
        <p className="section-sub">
          Slide to see the transformation
        </p>
      </div>

      <div className="ba-m-box">
        {/* Before / After labels */}
        <div className="ba-m-top-labels">
          <span className="ba-m-top-label ba-m-top-label--before">Before</span>
          <span className="ba-m-top-label ba-m-top-label--after">After</span>
        </div>

        {/* Image comparison */}
        <div
          className="ba-m-compare"
          ref={compareRef}
          onTouchStart={onStart}
          onTouchMove={onMove}
          onTouchEnd={onEnd}
          onMouseDown={onStart}
          onMouseMove={onMove}
          onMouseUp={onEnd}
          onMouseLeave={onEnd}
        >
          {/* Before layer */}
          <div
            className="ba-m-layer ba-m-layer--before"
            style={{ clipPath: `inset(0 ${100 - sliderX}% 0 0)` }}
          >
            <img src={card.before.img} alt={card.before.tag} draggable="false" />
          </div>

          {/* After layer */}
          <div
            className="ba-m-layer ba-m-layer--after"
            style={{ clipPath: `inset(0 0 0 ${sliderX}%)` }}
          >
            <img src={card.after.img} alt={card.after.tag} draggable="false" />
          </div>

          {/* Slider line + handle */}
          <div className="ba-m-slider" style={{ left: `${sliderX}%` }}>
            <div className="ba-m-slider-line" />
            <div className="ba-m-slider-knob">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </div>
          </div>
        </div>

        {/* Description row */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="ba-m-desc"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
          >
            <div className="ba-m-desc-side ba-m-desc-side--before">
              <span className="ba-m-desc-tag">{card.before.tag}</span>
              <span className="ba-m-desc-text">{card.before.text}</span>
            </div>
            <div className="ba-m-desc-arrow">→</div>
            <div className="ba-m-desc-side ba-m-desc-side--after">
              <span className="ba-m-desc-tag">{card.after.tag}</span>
              <span className="ba-m-desc-text">{card.after.text}</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Thumbnail selectors */}
        <div className="ba-m-thumbs">
          {transformations.map((t, i) => (
            <button
              key={i}
              type="button"
              className={`ba-m-thumb ${i === active ? 'ba-m-thumb--active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Transformation ${i + 1}: ${t.after.tag}`}
            >
              <div className="ba-m-thumb-img">
                <img src={t.after.img} alt={t.after.tag} draggable="false" />
              </div>
              <span className="ba-m-thumb-name">{t.after.tag}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════
   Desktop: scroll-pinned animation (unchanged)
   ══════════════════════════════════════════════════ */

function DesktopBeforeAfter() {
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
                    <div className="ba-card-icon ba-card-icon--before">
                      <img
                        src={card.before.img}
                        alt={card.before.tag}
                        className="ba-icon-img"
                        width="256"
                        height="256"
                        loading="lazy"
                        decoding="async"
                        fetchpriority="low"
                        draggable="false"
                      />
                    </div>
                    <span className="ba-card-tag ba-card-tag--before">{card.before.tag}</span>
                    <span className="ba-card-label ba-card-label--before">{card.before.text}</span>
                  </div>

                  <div
                    ref={(el) => (afterLayerRefs.current[i] = el)}
                    className="ba-card-state ba-card-state--after"
                    style={{ clipPath: 'inset(0 0 0 100%)' }}
                  >
                    <div className="ba-card-icon ba-card-icon--after">
                      <img
                        src={card.after.img}
                        alt={card.after.tag}
                        className="ba-icon-img"
                        width="256"
                        height="256"
                        loading="lazy"
                        decoding="async"
                        fetchpriority="low"
                        draggable="false"
                      />
                    </div>
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

/* ══════════════════════════════════════════════════
   Entry: pick layout based on viewport
   ══════════════════════════════════════════════════ */

export default function BeforeAfter() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth <= 640
  )

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 640px)')
    setIsMobile(mql.matches)
    const handler = (e) => setIsMobile(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return isMobile ? <MobileBeforeAfter /> : <DesktopBeforeAfter />
}
