import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import './Testimonials.css'

/* ── Count-Up Hook ── */
function useCountUp(end, duration, shouldStart) {
  const [count, setCount] = useState(0)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!shouldStart || hasRun.current) return
    hasRun.current = true

    let startTime = null
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [end, duration, shouldStart])

  return count
}

/* ── Indian number format: 2,00,000 ── */
function formatIndian(num) {
  const str = num.toString()
  if (str.length <= 3) return str
  const last3 = str.slice(-3)
  const rest = str.slice(0, -3)
  const formatted = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',')
  return formatted + ',' + last3
}

const videoTestimonials = [
  {
    title: 'Student Feedback',
    subtitle: 'From College Student',
    videoUrl: 'https://englishpartner.com/wp-content/uploads/2026/01/Lets-hear-what-our-students-say-_-%E2%98%8E-91-7708605866-_-English-Partner-Tamil.mp4',
  },
  {
    title: 'School Students',
    subtitle: 'Learning English Online',
    videoUrl: 'https://englishpartner.com/wp-content/uploads/2026/01/English-Partner-x-School-students-%F0%9F%91%A8_%F0%9F%8F%AB_-English-Partner-_-Learn-English-Online.mp4',
  },
  {
    title: 'Appreciation & Love',
    subtitle: 'Mr. Azmy',
    videoUrl: 'https://englishpartner.com/wp-content/uploads/2026/01/Our-student-Mr.-Azmys-token-of-appreciation-and-love-for-his-trainer-_-English-Partner-_-Online-Ep.mp4',
  },
  {
    title: 'Honest Feedback',
    subtitle: 'Shanthi from Kanyakumari',
    videoUrl: 'https://englishpartner.com/wp-content/uploads/2026/01/Honest-feedback-of-Shanthi-from-Kanyakumari-_-%E2%98%8E-9342789176-_-English-Partner-_-Spoken-English-Online-1.mp4',
  },
  {
    title: 'Corporate Training',
    subtitle: 'Client Feedback Survey',
    videoUrl: 'https://englishpartner.com/wp-content/uploads/2026/01/Voice-of-our-clients-at-Forar-Tech-_-Client-Feedback-Survey-Business-Communication-_-Englishpartner.mp4',
  },
  {
    title: 'Success Story Revealed',
    subtitle: 'Speaking Confidently',
    videoUrl: 'https://englishpartner.com/wp-content/uploads/2026/01/Student-Success-Stories-Revealed-_-English-Partner-_-Spoken-English-_-%E2%98%8E%EF%B8%8F-91-9944960485.mp4',
  }
]

const stats = [
  { value: '2,00,000+', numeric: '200000', label: 'Learners Trusted Us' },
  { value: '#1',        numeric: null,      label: 'Most Reviewed in TN' },
  { value: '7-Day',     numeric: '7',       label: 'Money-Back Guarantee' },
  { value: 'Lifetime',  numeric: null,      label: 'Trainer Assistance' },
]

function VideoCard({ v }) {
  const videoRef = useRef(null)
  const wrapperRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!wrapperRef.current) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoaded(true)
          obs.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    obs.observe(wrapperRef.current)
    return () => obs.disconnect()
  }, [])

  const handleMouseEnter = () => {
    if (videoRef.current) {
      // Attempt to play the video with sound
      videoRef.current.muted = false;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        // Browsers block auto-playing unmuted audio if the user hasn't clicked anywhere on the webpage yet.
        // If it blocks us, immediately fallback to playing the video muted.
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
          setIsPlaying(true);
        }
      });
    }
  }

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const handleClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        // Tapping counts as user interaction, so audio is guaranteed allowed here
        videoRef.current.muted = false;
        videoRef.current.play().catch(() => {})
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }

  return (
    <div
      ref={wrapperRef}
      className="video-card-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="video-card-poster">
        <video
          ref={videoRef}
          src={loaded ? v.videoUrl : undefined}
          loop
          playsInline
          preload="none"
          className="side-moving-video"
        />
        <div className="video-cinematic-overlay" />
        
        {!isPlaying && (
          <div className="hover-play-indicator">
            <svg viewBox="0 0 24 24" fill="white" width="32" height="32">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}
        
        <div className="video-card-info">
          <h3 className="video-card-title">{v.title}</h3>
          <p className="video-card-subtitle">{v.subtitle}</p>
        </div>
      </div>
    </div>
  )
}

function StatValue({ stat, inView }) {
  const count200k = useCountUp(200000, 2200, inView)
  const count7 = useCountUp(7, 1200, inView)

  if (stat.numeric === '200000') return formatIndian(count200k) + '+'
  if (stat.numeric === '7') return count7 + '-Day'
  return stat.value
}

export default function Testimonials() {
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, amount: 0.5 })
  const containerRef = useRef(null)
  const isHoveredRef = useRef(false)
  const isDraggingRef = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  // Native Infinite Auto-Scroll
  useEffect(() => {
    let animationId;
    let lastTime = performance.now();
    const speed = 0.05; // Adjust speed multiplier

    const step = (time) => {
      if (!containerRef.current) return;
      
      const deltaTime = time - lastTime;
      lastTime = time;

      // Only auto scroll if the user isn't hovering or dragging
      if (!isHoveredRef.current && !isDraggingRef.current) {
         containerRef.current.scrollLeft += speed * deltaTime;
      }

      // We render the array 2 times; reset between halves for an infinite loop feel.
      const scrollWidth = containerRef.current.scrollWidth;
      const singleChunkWidth = scrollWidth / 2;

      if (containerRef.current.scrollLeft >= singleChunkWidth) {
         containerRef.current.scrollLeft -= singleChunkWidth;
      } else if (containerRef.current.scrollLeft <= 0) {
         containerRef.current.scrollLeft += singleChunkWidth;
      }

      animationId = requestAnimationFrame(step);
    }

    if (containerRef.current) {
        // Start at beginning of first chunk
        containerRef.current.scrollLeft = 0;
    }

    animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Mouse Drag Events
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  }

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    isDraggingRef.current = false;
  }

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  }

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Drag speed
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  }

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="stats-bar" ref={statsRef}>
        {stats.map((s, i) => (
          <div key={i} className="stat-item">
            <span className="stat-value">
              <StatValue stat={s} inView={statsInView} />
            </span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="section-header">
        <span className="section-label">Success Stories</span>
        <h2 className="section-title">
          Watch our <span className="title-accent">students speak</span>
        </h2>
        <p className="section-sub">
          Hear directly from learners who transformed their English.
        </p>
      </div>

      {/* ── JS-Driven Swipeable Infinite Marquee ── */}
      <div 
        ref={containerRef}
        className="video-marquee-container"
        onMouseEnter={() => (isHoveredRef.current = true)}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={() => (isDraggingRef.current = true)}
        onTouchEnd={() => (isDraggingRef.current = false)}
      >
        <div className="video-marquee-track">
          {[...videoTestimonials, ...videoTestimonials].map((v, i) => (
            <VideoCard key={i} v={v} />
          ))}
        </div>
      </div>
    </section>
  )
}
