import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './HeroCarousel.css'

const WA_LINK =
  'https://api.whatsapp.com/send/?phone=918667272183&text=Hi%2C+I+would+like+to+know+more+about+the+courses.&type=phone_number&app_absent=0'

const slides = [
  {
    tag: 'Coimbatore \u00b7 Direct Classes',
    heading: 'Face-to-Face Classroom Training Now In Coimbatore',
    description:
      'Direct spoken English classes are now available exclusively in Coimbatore, combining 1 to 1 trainer personalised training and group learning.',
    cta: 'Book a Free Demo',
    image: '/assets/banners/Banner3.webp',
    accent: 'red',
  },
  {
    tag: '1-to-1 Personalised Training',
    heading: 'Physical Presence Demands Your Full Attention',
    description:
      'One-to-one trainer guidance helps you focus on speaking clearly, correcting mistakes, and improving step by step.',
    cta: 'Book a Free Demo',
    image: '/assets/banners/Banner.webp',
    accent: 'blue',
  },
  {
    tag: 'Group Learning',
    heading: 'Presenting Live Sharpens Your Professional Confidence',
    description:
      'Learning alongside others creates a supportive environment where practice feels easier and progress happens faster.',
    cta: 'Book a Free Demo',
    image: '/assets/banners/Banner1.webp',
    accent: 'red',
  },
  {
    tag: 'Real-Life Speaking',
    heading: 'Body Language Adds Power To Words',
    description:
      'Through real-life speaking exercises, you learn how voice, expression, and posture strengthen communication and build confidence.',
    cta: 'Book a Free Demo',
    image: '/assets/banners/banner4.webp',
    accent: 'blue',
  },
]

const INTERVAL = 5000
const EXPO_OUT = [0.16, 1, 0.3, 1]

// Desktop: cinematic 3D transform. Mobile: simple fade+slide (no rotateY/z).
const getSlideVariants = (isMobile) =>
  isMobile
    ? {
        enter: (dir) => ({ x: dir > 0 ? '30%' : '-30%', opacity: 0 }),
        center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: EXPO_OUT } },
        exit: (dir) => ({ x: dir > 0 ? '-20%' : '20%', opacity: 0, transition: { duration: 0.25 } }),
      }
    : {
        enter: (dir) => ({
          x: dir > 0 ? '80%' : '-80%',
          opacity: 0,
          scale: 0.88,
          rotateY: dir > 0 ? 14 : -14,
          z: -250,
        }),
        center: {
          x: 0, opacity: 1, scale: 1, rotateY: 0, z: 0,
          transition: { duration: 0.75, ease: EXPO_OUT },
        },
        exit: (dir) => ({
          x: dir > 0 ? '-55%' : '55%',
          opacity: 0, scale: 0.85,
          rotateY: dir > 0 ? -10 : 10, z: -300,
          transition: { duration: 0.5, ease: 'easeIn' },
        }),
      }

const textVariants = {
  enter: (dir) => ({ x: dir > 0 ? 30 : -30, opacity: 0, y: 10 }),
  center: { x: 0, opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.45, ease: EXPO_OUT } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.18 } },
}

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 860 : false
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 860px)')
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return isMobile
}

export default function HeroCarousel({ introDone }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPaused, setIsPaused] = useState(false)
  const [inView, setInView] = useState(true)
  const wrapperRef = useRef(null)
  const isMobile = useIsMobile()

  // Pause auto-advance when carousel scrolls out of view (saves mobile CPU/battery)
  useEffect(() => {
    if (!wrapperRef.current) return
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 }
    )
    obs.observe(wrapperRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (isPaused || !introDone || !inView) return
    const id = setInterval(() => {
      setDirection(1)
      setCurrent((c) => (c + 1) % slides.length)
    }, INTERVAL)
    return () => clearInterval(id)
  }, [current, isPaused, introDone, inView])

  const goTo = (index) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  const goPrev = () => {
    setDirection(-1)
    setCurrent((c) => (c - 1 + slides.length) % slides.length)
  }

  const goNext = () => {
    setDirection(1)
    setCurrent((c) => (c + 1) % slides.length)
  }

  const slide = slides[current]
  const slideVariants = getSlideVariants(isMobile)

  return (
    <section
      ref={wrapperRef}
      className="hero-carousel-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Progress bar */}
      <div className="carousel-progress">
        <motion.div
          key={current}
          className="carousel-progress-fill"
          initial={{ width: '0%' }}
          animate={isPaused || !inView ? {} : { width: '100%' }}
          transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
        />
      </div>

      <div className="carousel-stage">
        <div className="carousel-track">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              className={`carousel-slide accent-${slide.accent}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={isMobile ? undefined : { transformStyle: 'preserve-3d' }}
            >
              <motion.div
                className="slide-text-col"
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <span className="slide-tag">{slide.tag}</span>
                <h2 className="slide-heading">{slide.heading}</h2>
                <p className="slide-description">{slide.description}</p>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary carousel-cta"
                >
                  {slide.cta}
                </a>
              </motion.div>

              {/* Image column — shimmer background shows through until image paints */}
              <div className="slide-image-col">
                <div className="slide-image-frame">
                  <img
                    src={slide.image}
                    alt={slide.tag}
                    width="420"
                    height="420"
                    loading={current === 0 ? 'eager' : 'lazy'}
                    fetchpriority={current === 0 ? 'high' : 'low'}
                    decoding="async"
                    draggable="false"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          className="carousel-arrow prev"
          onClick={goPrev}
          aria-label="Previous slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          className="carousel-arrow next"
          onClick={goNext}
          aria-label="Next slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      </div>

      <div className="carousel-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
