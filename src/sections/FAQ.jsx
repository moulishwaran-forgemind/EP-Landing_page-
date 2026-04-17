import { motion } from 'framer-motion'
import './FAQ.css'
import { useState } from 'react'

const faqs = [
  {
    q: 'Where are the direct classes held?',
    a: (
      <>
        Our direct classroom training is held exclusively in Coimbatore at English Partner Spoken English Training Institute.
        <br />
        <br />
        <strong>Our Address:</strong>
        <br />
        English Partner, Arima Wakefield, Peelamedu, Coimbatore, Tamil Nadu 641004.
      </>
    ),
  },
  {
    q: 'What is the class format?',
    a: 'We have Direct 1-on-1 Personalized Training classes and Direct Group training classes. The classroom setting ensures structured lessons, daily conversation practice, and real-time feedback from experienced trainers.',
  },
  {
    q: 'Who is this training designed for?',
    a: 'This training is for college students, job seekers, working professionals, and anyone who wants to improve how they communicate in personal, professional, and social life.',
  },
  {
    q: 'Can I attend a demo class before enrolling?',
    a: 'Yes! We offer a free demo class at English Partner Spoken English Training Institute, Coimbatore, and based on the demo you can express your requirements and decide.',
  },
  {
    q: 'Do I need prior English knowledge to join?',
    a: 'Not at all. Our trainers start from the basics and guide you step-by-step. Whether you\'re a complete beginner or someone who understands English but hesitates to speak, the course is designed to meet you at your level.',
  },
  {
    q: 'How do I book a demo class?',
    a: 'Simply click "Book a Free Demo" anywhere on this page and it will open WhatsApp with a pre-filled message. Our team will get back to you within minutes.',
  },
]

function FAQItem({ q, a, isOpen, onClick }) {
  return (
    <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`} onClick={onClick}>
      <div className="faq-question">
        <span>{q}</span>
        <span className="faq-icon">{isOpen ? '−' : '+'}</span>
      </div>
      <motion.div
        className="faq-answer"
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <p>{a}</p>
      </motion.div>
    </div>
  )
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <section className="faq-section" id="faq">
      <div className="section-header">
        <span className="section-label">FAQ</span>
        <h2 className="section-title">
          Frequently asked <span className="title-accent">questions</span>
        </h2>
        <p className="section-sub">Everything you need to know before booking your free demo.</p>
      </div>

      <div className="faq-list">
        {faqs.map((f, i) => (
          <FAQItem
            key={i}
            q={f.q}
            a={f.a}
            isOpen={openIdx === i}
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
          />
        ))}
      </div>
    </section>
  )
}
