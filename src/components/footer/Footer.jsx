import React, { useState } from 'react'
import './footer.scss'
import { Container } from '../container/container'
import { Link, NavLink } from 'react-router-dom'
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react'

export const Footer = ({ darkMode }) => {

  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className={`footer-dark${darkMode ? ' dark' : ''}`}>
        <Container>
          <div className="foot">
            <div className="footer-top">
              <div className="about-school">
                <div className="footer-logo">
                  <NavLink to='/' className='footer-logo-icon'>
                    N
                  </NavLink>
                  <NavLink to='/' className='footer-logo-text'>Nurdawlet's School</NavLink>
                </div>
                <div className="footer-about">
                  <p>
                    Providing quality education since 1998.
                    Developing knowledge, creativity, and
                    character.
                  </p>
                </div>
                <div className="footer-social-medias">
                  <div className="social-medias">
                    <Link to="https://github.com/nurdawletmaksetov">
                      <Facebook size={20} />
                    </Link>
                  </div>
                  <div className="social-medias">
                    <Link to="https://github.com/nurdawletmaksetov">
                      <Instagram size={20} />
                    </Link>
                  </div>
                  <div className="social-medias">
                    <Link to="https://github.com/nurdawletmaksetov">
                      <Twitter size={20} />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="footer-quick-list">
                <h3>
                  Quick Links
                </h3>
                <div className="nav-lists">
                  <ul className='nav-ul'>
                    <li><NavLink to="/about" onClick={handleClick}>About Us</NavLink></li>
                    <li><NavLink to="/education" onClick={handleClick}>Education</NavLink></li>
                    <li><NavLink to="/news" onClick={handleClick}>News & Events</NavLink></li>
                    <li><NavLink to="/support" onClick={handleClick}>Support</NavLink></li>
                    <li><NavLink to="/rules" onClick={handleClick}>Rules & Documents</NavLink></li>
                  </ul>
                </div>
              </div>
              <div className="footer-contact-us">
                <h3>Contact Us</h3>
                <div className="contact-us">
                  <p>
                    <MapPin className='contact-us-icon' size={34} />Kateks. 1-Politechnicum, Nukus, Karakhalpakstan, Uzbekistan
                  </p>
                  <p>
                    <Phone className='contact-us-icon' size={17} /> +1 234 567 890
                  </p>
                  <p>
                    <Mail className='contact-us-icon' size={17} /> nurdawletmaksetov@gmail.com
                  </p>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© 2025 1-POLITECHNIKUM. Developer: Nurdawlet Maksetov.</p>
            </div>
          </div>
        </Container>
      </footer>
    </>
  )
}
