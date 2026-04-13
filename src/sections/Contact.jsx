import './Contact.css'

const WA_LINK = 'https://api.whatsapp.com/send/?phone=918667272183&text=Hi%2C+I+would+like+to+know+more+about+the+courses.&type=phone_number&app_absent=0'

export default function Contact() {
  return (
    <section className="contact-section" id="contact">
      {/* CTA Banner */}
      <div className="cta-banner">
        <div className="cta-glow cta-glow--red" />
        <div className="cta-glow cta-glow--blue" />
        <div className="cta-content">
          <h2 className="cta-heading">Your first step towards confident English starts here.</h2>
          <p className="cta-sub">
            Book a free demo class at English Partner, our Coimbatore centre. Come in,
            experience the classroom, meet the trainer, and decide from there.
          </p>
          <div className="cta-actions">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="cta-btn cta-btn--primary"
            >
              <span>💬</span> Book My Free Demo
            </a>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="cta-btn cta-btn--ghost">
              📞 Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="contact-info">
        {[
          { icon: '📍', label: 'Address', value: 'English Partner, Arima Wakefield, Coimbatore, Tamil Nadu' },
          { icon: '💬', label: 'WhatsApp', value: '+91 86672 72183' },
          { icon: '🌐', label: 'Website',  value: 'englishpartner.net' },
        ].map((item, i) => (
          <div key={i} className="contact-card">
            <span className="contact-icon">{item.icon}</span>
            <div>
              <div className="contact-label">{item.label}</div>
              <div className="contact-value">{item.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Map Section */}
      <div className="contact-map">
        <div className="map-header">
          <span className="map-pin">📍</span>
          <div>
            <h3 className="map-title">Visit Our Classroom</h3>
            <p className="map-address">English Partner, Arima Wakefield, Coimbatore, Tamil Nadu</p>
          </div>
        </div>
        <div className="map-frame">
          <iframe
            title="English Partner Location"
            src="https://www.google.com/maps?q=English+Partner,+Arima+Wakefield,+Coimbatore,+Tamil+Nadu,+India&output=embed&z=15"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <a
          href="https://www.google.com/maps/search/English+Partner+Arima+Wakefield+Coimbatore"
          target="_blank"
          rel="noreferrer"
          className="map-directions-btn"
        >
          Get Directions
        </a>
      </div>
    </section>
  )
}
