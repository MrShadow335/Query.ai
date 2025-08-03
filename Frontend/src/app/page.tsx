'use client';

import { useEffect } from 'react';
import './globals.css';

export default function Home() {
  useEffect(() => {
    // Initialize the app functionality
    const initializeApp = () => {
      console.log('Initializing Enhanced DocBot Landing Page...');

      const header = document.querySelector('.header');
      const navLinks = document.querySelectorAll('.nav__link');
      const signInBtn = document.querySelector('#signInBtn');
      const signUpBtn = document.querySelector('#signUpBtn');
      const contactForm = document.querySelector('#contactForm');
      const images = document.querySelectorAll('img');

      // Image loading optimization
      function optimizeImages() {
        images.forEach((img) => {
          // Add loading="lazy" for performance
          if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
          }

          // Add fade-in effect when image loads
          img.style.opacity = '0';
          img.style.transition = 'opacity 0.5s ease-out';

          const imageLoadHandler = () => {
            img.style.opacity = '1';
            img.removeEventListener('load', imageLoadHandler);
          };

          if (img.complete) {
            img.style.opacity = '1';
          } else {
            img.addEventListener('load', imageLoadHandler);

            // Fallback for failed images
            img.addEventListener('error', () => {
              img.style.opacity = '0.5';
              console.warn('Failed to load image:', img.src);
            });
          }
        });
      }

      // Notification system
      function createNotification(message: string, type: string = 'info') {
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.cssText = `
          position: fixed;
          top: 80px;
          right: 20px;
          z-index: 10000;
          min-width: 300px;
          max-width: 500px;
          padding: 16px;
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          transform: translateX(100%);
          transition: transform 0.3s ease-out;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;

        if (type === 'success') {
          notification.style.borderColor = '#10b981';
          notification.style.background = '#f0fdf4';
        } else if (type === 'error') {
          notification.style.borderColor = '#ef4444';
          notification.style.background = '#fef2f2';
        }

        notification.innerHTML = `
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="font-weight: 500;">${message}</div>
            <button onclick="this.parentElement.parentElement.remove()" style="margin-left: auto; background: none; border: none; font-size: 18px; cursor: pointer;">×</button>
          </div>
        `;

        document.body.appendChild(notification);

        requestAnimationFrame(() => {
          notification.style.transform = 'translateX(0)';
        });

        setTimeout(() => {
          if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
          }
        }, 5000);
      }

      // Header scroll effect
      function handleScroll() {
        const scrollY = window.scrollY;
        if (header) {
          if (scrollY > 50) {
            (header as HTMLElement).style.background = 'rgba(255, 255, 253, 0.98)';
            (header as HTMLElement).style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)';
          } else {
            (header as HTMLElement).style.background = 'rgba(255, 255, 253, 0.95)';
            (header as HTMLElement).style.boxShadow = 'none';
          }
        }
      }

      // Smooth scroll navigation
      function smoothScrollTo(targetId: string) {
        const targetElement = document.querySelector(targetId);
        if (targetElement && header) {
          const headerHeight = (header as HTMLElement).offsetHeight;
          const targetPosition = (targetElement as HTMLElement).offsetTop - headerHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          navLinks.forEach(l => l.classList.remove('active'));
          const activeLink = document.querySelector(`a[href="${targetId}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      }

      // Navigation link handlers
      navLinks.forEach(link => {
        link.addEventListener('click', function(e: Event) {
          e.preventDefault();
          const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
          if (targetId) {
            smoothScrollTo(targetId);
          }
        });
      });

      // Sign in/up button handlers
      if (signInBtn) {
        signInBtn.addEventListener('click', () => {
          createNotification('Redirecting to Sign In page...', 'info');
          setTimeout(() => {
            window.location.href = '/signin';
          }, 1000);
        });
      }

      if (signUpBtn) {
        signUpBtn.addEventListener('click', () => {
          createNotification('Redirecting to Sign Up page...', 'info');
          setTimeout(() => {
            window.location.href = '/signup';
          }, 1000);
        });
      }

      // Contact form handler
      if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          createNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
          (contactForm as HTMLFormElement).reset();
        });
      }

      // Intersection Observer for animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, observerOptions);

      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      animatedElements.forEach(el => observer.observe(el));

      // Event listeners
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial call
      optimizeImages(); // Initialize image optimization
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
      initializeApp();
    }
  }, []);

  return (
    <>
      {/* Header */}
      <header className="header">
        <nav className="nav container">
          <div className="nav__brand">
            <div className="nav__logo">🤖</div>
            <span className="nav__brand-text">DocBot</span>
          </div>

          <ul className="nav__menu">
            <li><a href="#features" className="nav__link">Features</a></li>
            <li><a href="#about" className="nav__link">About Us</a></li>
            <li><a href="#contact" className="nav__link">Contact</a></li>
          </ul>

          <div className="nav__actions">
            <button className="btn btn--outline btn--sm" id="signInBtn">Sign In</button>
            <button className="btn btn--primary btn--sm" id="signUpBtn">Sign Up</button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero__content">
            <div className="hero__text">
              <h1 className="hero__title">Transform Documents into Instant Insights</h1>
              <p className="hero__subtitle">Upload any document, email, or contract and get AI-powered analysis, summaries, and answers in seconds. No more hours spent reading through complex files.</p>
            </div>
            <div className="hero__visual">
              <div className="hero__card">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=entropy&auto=format&fm=webp&q=75" 
                  alt="AI analyzing documents with charts and graphs" 
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-base)',
                    marginBottom: 'var(--space-16)'
                  }}
                />
                <div className="hero__card-highlight">✨ AI Analysis Complete</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features animate-on-scroll">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Powerful Features</h2>
            <p className="section__subtitle">Everything you need to understand your documents better</p>
          </div>

          <div className="features__grid">
            <div className="feature__card">
              <img 
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=100&h=100&fit=crop&crop=entropy&auto=format&fm=webp&q=75" 
                alt="Document processing diagram" 
                style={{
                  width: '60px',
                  height: '60px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-base)',
                  marginBottom: 'var(--space-16)'
                }}
              />
              <h3 className="feature__title">Smart Document Analysis</h3>
              <p className="feature__description">AI-powered analysis of PDFs, Word docs, emails, and contracts with instant insights and summaries.</p>
            </div>

            <div className="feature__card">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop&crop=entropy&auto=format&fm=webp&q=75" 
                alt="High-speed processing visualization" 
                style={{
                  width: '60px',
                  height: '60px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-base)',
                  marginBottom: 'var(--space-16)'
                }}
              />
              <h3 className="feature__title">Lightning Fast Processing</h3>
              <p className="feature__description">Get results in seconds, not hours. Process multiple documents simultaneously with advanced AI.</p>
            </div>

            <div className="feature__card">
              <img 
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&h=100&fit=crop&crop=entropy&auto=format&fm=webp&q=75" 
                alt="Search interface with magnifying glass" 
                style={{
                  width: '60px',
                  height: '60px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-base)',
                  marginBottom: 'var(--space-16)'
                }}
              />
              <h3 className="feature__title">Intelligent Search</h3>
              <p className="feature__description">Ask questions about your documents and get precise answers with relevant citations.</p>
            </div>

            <div className="feature__card">
              <img 
                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=100&fit=crop&crop=entropy&auto=format&fm=webp&q=75" 
                alt="Security lock and shield icons" 
                style={{
                  width: '60px',
                  height: '60px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-base)',
                  marginBottom: 'var(--space-16)'
                }}
              />
              <h3 className="feature__title">Secure & Private</h3>
              <p className="feature__description">Enterprise-grade security ensures your sensitive documents remain completely private.</p>
            </div>

            <div className="feature__card">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&crop=entropy&auto=format&fm=webp&q=75" 
                alt="Data visualization charts and graphs" 
                style={{
                  width: '60px',
                  height: '60px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-base)',
                  marginBottom: 'var(--space-16)'
                }}
              />
              <h3 className="feature__title">Visual Summaries</h3>
              <p className="feature__description">Get visual insights, charts, and key data points extracted from your documents.</p>
            </div>

            <div className="feature__card">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&h=100&fit=crop&crop=entropy&auto=format&fm=webp&q=75" 
                alt="Team collaboration workspace" 
                style={{
                  width: '60px',
                  height: '60px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-base)',
                  marginBottom: 'var(--space-16)'
                }}
              />
              <h3 className="feature__title">Team Collaboration</h3>
              <p className="feature__description">Share insights with your team and collaborate on document analysis projects.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="about animate-on-scroll">
        <div className="container">
          <div className="about__content">
            <div className="about__text">
              <div className="section__header">
                <h2 className="section__title">About DocBot</h2>
                <p className="section__subtitle">Revolutionizing how professionals interact with documents</p>
              </div>

              <div className="about__description">
                <p>DocBot was born from the frustration of spending countless hours reading through lengthy contracts, policy documents, and reports. Our team of AI researchers and software engineers came together to create a solution that transforms how professionals consume and understand document content.</p>

                <p>Using cutting-edge natural language processing and machine learning technologies, DocBot can instantly analyze, summarize, and answer questions about any document you upload. Whether you're a lawyer reviewing contracts, a business analyst studying reports, or a researcher going through academic papers, DocBot saves you time and provides deeper insights.</p>

                <p>Our mission is to democratize access to document intelligence, making it easy for anyone to quickly understand complex information and make informed decisions.</p>
              </div>

              <div className="about__stats">
                <div className="stat">
                  <div className="stat__number">95%</div>
                  <div className="stat__label">Time Saved</div>
                </div>
                <div className="stat">
                  <div className="stat__number">99.9%</div>
                  <div className="stat__label">Accuracy Rate</div>
                </div>
                <div className="stat">
                  <div className="stat__number">24/7</div>
                  <div className="stat__label">Available</div>
                </div>
              </div>
            </div>

            <div className="about__visual">
              <div style={{ position: 'relative' }}>
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=400&fit=crop&crop=entropy&auto=format&fm=webp&q=75" 
                  alt="Professional team working with AI technology" 
                  style={{
                    width: '100%',
                    maxWidth: '300px',
                    height: '400px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-lg)'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--color-primary)',
                  color: 'var(--color-btn-primary-text)',
                  padding: 'var(--space-8) var(--space-16)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-semibold)'
                }}>
                  🚀 AI-Powered Intelligence
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact animate-on-scroll">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Get in Touch</h2>
            <p className="section__subtitle">Have questions? We'd love to hear from you.</p>
          </div>

          <div className="contact__content">
            <div className="contact__info">
              <div className="contact__item">
                <div className="contact__icon">📧</div>
                <div className="contact__details">
                  <h4>Email Us</h4>
                  <p>hello@docbot.ai</p>
                </div>
              </div>

              <div className="contact__item">
                <div className="contact__icon">💬</div>
                <div className="contact__details">
                  <h4>Live Chat</h4>
                  <p>Available 24/7 for support</p>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1596726114024-fa4d23183d15?w=150&h=100&fit=crop&crop=entropy&auto=format&fm=webp&q=75" 
                  alt="Customer support chat interface" 
                  style={{
                    width: '100px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-base)',
                    marginLeft: 'auto'
                  }}
                />
              </div>

              <div className="contact__item">
                <div className="contact__icon">📱</div>
                <div className="contact__details">
                  <h4>Phone</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
            </div>

            <form className="contact__form" id="contactForm">
              <div className="form__group">
                <label htmlFor="name" className="form__label">Name</label>
                <input type="text" id="name" name="name" className="form__input" required />
              </div>

              <div className="form__group">
                <label htmlFor="email" className="form__label">Email</label>
                <input type="email" id="email" name="email" className="form__input" required />
              </div>

              <div className="form__group">
                <label htmlFor="message" className="form__label">Message</label>
                <textarea id="message" name="message" rows={5} className="form__input form__textarea" required></textarea>
              </div>

              <button type="submit" className="btn btn--primary btn--full">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer__content">
            <div className="footer__brand">
              <div className="nav__brand">
                <div className="nav__logo">🤖</div>
                <span className="nav__brand-text">DocBot</span>
              </div>
              <p className="footer__description">Transform documents into instant insights with AI-powered analysis.</p>
            </div>

            <div className="footer__links">
              <div className="footer__column">
                <h4 className="footer__title">Product</h4>
                <ul className="footer__list">
                  <li><a href="#features" className="footer__link">Features</a></li>
                  <li><a href="#" className="footer__link">Pricing</a></li>
                  <li><a href="#" className="footer__link">Security</a></li>
                </ul>
              </div>

              <div className="footer__column">
                <h4 className="footer__title">Company</h4>
                <ul className="footer__list">
                  <li><a href="#about" className="footer__link">About</a></li>
                  <li><a href="#contact" className="footer__link">Contact</a></li>
                  <li><a href="#" className="footer__link">Careers</a></li>
                </ul>
              </div>

              <div className="footer__column">
                <h4 className="footer__title">Support</h4>
                <ul className="footer__list">
                  <li><a href="#" className="footer__link">Help Center</a></li>
                  <li><a href="#" className="footer__link">API Docs</a></li>
                  <li><a href="#" className="footer__link">Status</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer__bottom">
            <p className="footer__copyright">© 2025 DocBot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
