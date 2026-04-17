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
    title: 'Bharath',
    subtitle: 'Student Success Story',
    videoUrl: '/videos/bharath.mp4',
  },
  {
    title: 'Divya',
    subtitle: 'Student Success Story',
    videoUrl: '/videos/divya.mp4',
  },
  {
    title: 'Keerthika',
    subtitle: 'Student Success Story',
    videoUrl: '/videos/keerthika.mp4',
  },
  {
    title: 'Honest Feedback',
    subtitle: 'From a Confident Speaker',
    videoUrl: '/videos/white-dress.mp4',
  },
  {
    title: 'Class Interaction',
    subtitle: 'Inside the Classroom',
    videoUrl: '/videos/interaction.mp4',
  },
  {
    title: 'Direct Classroom',
    subtitle: 'Coimbatore Branch',
    videoUrl: '/videos/offline.mp4',
  }
]

const stats = [
  { value: '200,000+', numeric: '200000', label: 'Satisfied Students' },
  { value: '100+',     numeric: '100',    label: 'Expert Trainers' },
  { value: '24/7',     numeric: null,     label: 'Learning Support' },
  { value: '1M+',      numeric: null,     label: 'Learning Community' },
]

function VideoCard({ v, onPlay }) {
  const videoRef = useRef(null)
  const wrapperRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [ready, setReady] = useState(false)
  const wantsPlayRef = useRef(false)

  // Load video only when card is near viewport (small margin on mobile)
  useEffect(() => {
    if (!wrapperRef.current) return
    const isMobile = window.innerWidth <= 640
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoaded(true)
          obs.disconnect()
        }
      },
      { rootMargin: isMobile ? '100px' : '400px' }
    )
    obs.observe(wrapperRef.current)
    return () => obs.disconnect()
  }, [])

  // Mark ready once enough has buffered, and honor a queued play intent
  useEffect(() => {
    const video = videoRef.current
    if (!video || !loaded) return

    const onCanPlay = () => {
      setReady(true)
      if (wantsPlayRef.current) startPlayback()
    }

    const onPause = () => setIsPlaying(false)

    video.addEventListener('canplay', onCanPlay)
    video.addEventListener('pause', onPause)
    if (video.readyState >= 3) onCanPlay()

    return () => {
      video.removeEventListener('canplay', onCanPlay)
      video.removeEventListener('pause', onPause)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded])

  const startPlayback = () => {
    const video = videoRef.current
    if (!video) return
    onPlay(video)
    video.muted = false
    video.play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        video.muted = true
        video.play().then(() => setIsPlaying(true)).catch(() => {})
      })
  }

  const handleMouseEnter = () => {
    wantsPlayRef.current = true
    if (ready) startPlayback()
  }

  const handleMouseLeave = () => {
    wantsPlayRef.current = false
    if (videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const handleClick = () => {
    const video = videoRef.current
    if (!video) return
    if (!loaded) setLoaded(true)
    if (video.paused) {
      wantsPlayRef.current = true
      startPlayback()
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

  return (
    <div
      ref={wrapperRef}
      className="video-card-wrapper"
      onMouseEnter={isTouchDevice ? undefined : handleMouseEnter}
      onMouseLeave={isTouchDevice ? undefined : handleMouseLeave}
      onClick={handleClick}
    >
      <div className="video-card-poster">
        <video
          ref={videoRef}
          src={loaded ? `${v.videoUrl}#t=0.1` : undefined}
          loop
          muted
          playsInline
          webkit-playsinline="true"
          preload="metadata"
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
  const count100 = useCountUp(100, 1400, inView)

  if (stat.numeric === '200000') return formatIndian(count200k) + '+'
  if (stat.numeric === '100') return count100 + '+'
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
  const activeVideoRef = useRef(null)

  const handlePlay = (video) => {
    if (activeVideoRef.current && activeVideoRef.current !== video) {
      activeVideoRef.current.pause()
    }
    activeVideoRef.current = video
  }

  // Native Infinite Auto-Scroll — only runs when section is visible
  useEffect(() => {
    let animationId;
    let lastTime = performance.now();
    let isVisible = false;
    const speed = 0.05;

    const step = (time) => {
      if (!containerRef.current || !isVisible) {
        animationId = requestAnimationFrame(step);
        return;
      }

      const deltaTime = Math.min(time - lastTime, 50); // cap delta to avoid jumps
      lastTime = time;

      if (!isHoveredRef.current && !isDraggingRef.current) {
        containerRef.current.scrollLeft += speed * deltaTime;
      }

      const scrollWidth = containerRef.current.scrollWidth;
      const singleChunkWidth = scrollWidth / 2;

      if (containerRef.current.scrollLeft >= singleChunkWidth) {
        containerRef.current.scrollLeft -= singleChunkWidth;
      } else if (containerRef.current.scrollLeft <= 0) {
        containerRef.current.scrollLeft += singleChunkWidth;
      }

      animationId = requestAnimationFrame(step);
    };

    // Observe visibility to pause/resume the loop
    const obs = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) lastTime = performance.now();
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      containerRef.current.scrollLeft = 0;
      obs.observe(containerRef.current);
    }

    animationId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(animationId);
      obs.disconnect();
    };
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
            <VideoCard key={i} v={v} onPlay={handlePlay} />
          ))}
        </div>
      </div>
    </section>
  )
}
