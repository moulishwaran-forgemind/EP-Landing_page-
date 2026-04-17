import { useEffect, useState, lazy, Suspense } from 'react'
import Navbar from './Navbar'
import HeroCarousel from './sections/HeroCarousel'
import './App.css'

// Below-the-fold: lazy-loaded so initial bundle stays small
const WhoIsItFor = lazy(() => import('./sections/WhoIsItFor'))
const Courses = lazy(() => import('./sections/Courses'))
const BeforeAfter = lazy(() => import('./sections/BeforeAfter'))
const Testimonials = lazy(() => import('./sections/Testimonials'))
const FAQ = lazy(() => import('./sections/FAQ'))
const Contact = lazy(() => import('./sections/Contact'))
const Footer = lazy(() => import('./sections/Footer'))

// Non-critical UI: defer so they never block LCP
const WhatsAppFloat = lazy(() => import('./components/WhatsAppFloat'))
const LetterPop = lazy(() => import('./components/LetterPop'))
const StickyCTA = lazy(() => import('./components/StickyCTA'))

const WA_LINK = 'https://api.whatsapp.com/send/?phone=918667272183&text=Hi%2C+I+would+like+to+know+more+about+the+courses.&type=phone_number&app_absent=0'

export default function App() {
  const [introDone] = useState(true)
  const [deferredReady, setDeferredReady] = useState(false)

  useEffect(() => {
    document.body.classList.add('page-ready')
    // Defer non-critical widgets until browser is idle so they don't fight LCP
    const schedule = window.requestIdleCallback || ((cb) => setTimeout(cb, 1200))
    const id = schedule(() => setDeferredReady(true))
    return () => {
      if (window.cancelIdleCallback && typeof id === 'number') window.cancelIdleCallback(id)
      else clearTimeout(id)
    }
  }, [])

  return (
    <>
      {/* Deferred floating widgets — load after first paint */}
      {deferredReady && (
        <Suspense fallback={null}>
          <WhatsAppFloat />
          <LetterPop />
          <StickyCTA />
        </Suspense>
      )}

      {/* Site shell */}
      <div className={`site-shell ${introDone ? 'visible' : ''}`}>
        <Navbar visible={introDone} />

        {/* ── Hero ── */}
        <main className="hero-placeholder" id="home">
          <div className="hero-content">

            <div className="hero-badge hero-fade-in" style={{ animationDelay: '0.1s' }}>
              🎓 Direct 1-1 Personalized Training Classes at Coimbatore
            </div>

            <h1 className="hero-headline hero-fade-in" style={{ animationDelay: '0.2s' }}>
              Unlock <span className="highlight-red">Global Opportunities.</span><br />
              Achieve Absolute <span className="highlight-blue">Fluency in English.</span>
            </h1>

            <p className="hero-sub hero-fade-in" style={{ animationDelay: '0.35s' }}>
              Join Coimbatore's Exclusive Direct Class at English Partner Spoken English Training
              Institution. Our direct classes offer a hybrid curriculum of individualized language
              coaching and interactive group sessions designed to bridge the gap between learning
              and real-world communication.
            </p>

            <div className="hero-actions hero-fade-in" style={{ animationDelay: '0.5s' }}>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                💬 Book a Free Demo
              </a>
              <a href="#who-is-it-for" className="btn-ghost">Learn More ↓</a>
            </div>

          </div>

          {/* Cinematic Hero Carousel */}
          <HeroCarousel introDone={introDone} />

          {/* Decorative glow orbs */}
          <div className="glow-orb orb-red" />
          <div className="glow-orb orb-blue" />

          {/* Scroll indicator (CSS-animated, desktop only) */}
          <div className="scroll-indicator hero-fade-in" style={{ animationDelay: '1s' }}>
            <span>Scroll</span>
            <div className="scroll-dot" />
          </div>
        </main>

        {/* ── All Sections (lazy) ── */}
        <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
          <WhoIsItFor />
          <Courses />
          <BeforeAfter />
          <Testimonials />
          <FAQ />
          <Contact />
          <Footer />
        </Suspense>
      </div>
    </>
  )
}
