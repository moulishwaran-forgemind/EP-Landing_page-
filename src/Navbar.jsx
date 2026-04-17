import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import './Navbar.css'

const WA_LINK = 'https://api.whatsapp.com/send/?phone=918667272183&text=Hi%2C+I+would+like+to+know+more+about+the+courses.&type=phone_number&app_absent=0'

export default function Navbar({ visible }) {
  const [logoStep, setLogoStep] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setLogoStep(1), 200),
      setTimeout(() => setLogoStep(2), 600),
      setTimeout(() => setLogoStep(3), 1100),
      setTimeout(() => setLogoStep(4), 1600),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const isExpanded = logoStep >= 3
  const showSubtitle = logoStep >= 4

  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -20 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
    >
      {/* Logo */}
      <a href="#home" className="nav-logo">
        <div className="nav-logo-tiles">
          <AnimatePresence>
            {logoStep >= 1 && (
              <motion.div
                className="nav-logo-tile red"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 320, damping: 20 }}
              >
                <span className="nav-first-char">E</span>
                <motion.span
                  className="nav-rest-clip"
                  initial={{ maxWidth: 0, opacity: 0 }}
                  animate={{
                    maxWidth: isExpanded ? '80px' : 0,
                    opacity: isExpanded ? 1 : 0,
                  }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  nglish
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {logoStep >= 2 && (
              <motion.div
                className="nav-logo-tile blue"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 320, damping: 20 }}
              >
                <span className="nav-first-char">P</span>
                <motion.span
                  className="nav-rest-clip"
                  initial={{ maxWidth: 0, opacity: 0 }}
                  animate={{
                    maxWidth: isExpanded ? '80px' : 0,
                    opacity: isExpanded ? 1 : 0,
                  }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  artner
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.span
          className="nav-logo-subtitle"
          initial={{ opacity: 0, y: 4 }}
          animate={{
            opacity: showSubtitle ? 0.7 : 0,
            y: showSubtitle ? 0 : 4,
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          The Language Hub
        </motion.span>
      </a>

      {/* Nav links */}
      <ul className="nav-links">
        <li><a href="#courses">Who It's For</a></li>
        <li><a href="#testimonials">Reviews</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ul>

      <a href={WA_LINK} target="_blank" rel="noreferrer" className="nav-cta">
        Book Free Demo
      </a>
    </motion.nav>
  )
}
