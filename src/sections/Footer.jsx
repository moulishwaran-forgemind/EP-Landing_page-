import './Footer.css'

const WA_LINK = 'https://api.whatsapp.com/send/?phone=918667272183&text=Hi%2C+I+would+like+to+know+more+about+the+courses.&type=phone_number&app_absent=0'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-logo-red">English</span>
            <span className="footer-logo-blue">Partner</span>
          </div>
          <p className="footer-tagline">Direct Classroom Training · Coimbatore</p>
          <p className="footer-copy-inline">Trusted by 2,00,000+ learners across Tamil Nadu</p>
        </div>

        <div className="footer-links">
          <a href="#features">Why Direct?</a>
          <a href="#courses">Who It's For</a>
          <a href="#testimonials">Reviews</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Book Demo</a>
        </div>

        <div className="footer-cta-col">
          <a href={WA_LINK} target="_blank" rel="noreferrer" className="footer-wa-btn">
            Book a Free Demo
          </a>
          <a href="https://englishpartner.net" target="_blank" rel="noreferrer" className="footer-website">
            englishpartner.net
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} EnglishPartner. All rights reserved.</span>
        <span className="footer-trust">Most Reviewed English Institute in Tamil Nadu</span>
      </div>
    </footer>
  )
}
