import { motion } from 'framer-motion'
import './WhatsAppFloat.css'

const WA_LINK = 'https://api.whatsapp.com/send/?phone=918667272183&text=Hi%2C+I+would+like+to+know+more+about+the+courses.&type=phone_number&app_absent=0'

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={WA_LINK}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 3, duration: 0.4, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="whatsapp-label">Know about classes</span>
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#25D366"/>
        <path
          d="M22.5 9.5A9.05 9.05 0 0 0 16 7C11.03 7 7 11.03 7 16c0 1.59.41 3.14 1.2 4.5L7 25l4.62-1.21A9 9 0 0 0 16 25c4.97 0 9-4.03 9-9a9.05 9.05 0 0 0-2.5-6.5ZM16 23.5a7.45 7.45 0 0 1-3.8-1.04l-.27-.16-2.74.72.73-2.67-.18-.28A7.5 7.5 0 1 1 16 23.5Zm4.12-5.62c-.23-.11-1.34-.66-1.54-.73-.21-.08-.36-.11-.51.11-.15.23-.58.73-.71.88-.13.15-.26.17-.49.06-.23-.11-.97-.36-1.85-1.14-.68-.61-1.14-1.36-1.27-1.59-.13-.23-.01-.35.1-.46.1-.1.23-.26.34-.39.11-.13.15-.23.23-.38.07-.15.04-.28-.02-.39-.06-.11-.51-1.24-.7-1.7-.18-.44-.37-.38-.51-.39h-.44c-.15 0-.39.06-.6.28-.2.23-.77.75-.77 1.83s.79 2.12.9 2.27c.11.15 1.55 2.37 3.76 3.32.53.23.94.36 1.26.46.53.17 1.01.14 1.39.09.42-.06 1.3-.53 1.48-1.04.18-.51.18-.95.13-1.04-.05-.09-.2-.14-.42-.25Z"
          fill="white"
        />
      </svg>
      <span className="whatsapp-pulse" />
    </motion.a>
  )
}
