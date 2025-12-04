'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(5, 5, 5, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border)',
        zIndex: 100
      }}>
        <Link href="/" style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: 'var(--orange)',
          textShadow: '0 0 10px var(--orange-glow)',
          textDecoration: 'none'
        }}>
          EDEN
        </Link>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href="/research" style={{ color: 'var(--text)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--orange)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text)'}>
            Research
          </Link>
          <Link href="/research" style={{
            padding: '0.75rem 1.5rem',
            background: 'transparent',
            border: '1px solid var(--orange)',
            color: 'var(--orange)',
            borderRadius: '4px',
            fontSize: '0.9rem',
            transition: 'all 0.3s',
            boxShadow: '0 0 10px var(--orange-glow)',
            textDecoration: 'none',
            display: 'inline-block'
          }} onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--orange)';
            e.currentTarget.style.color = 'var(--bg)';
            e.currentTarget.style.boxShadow = '0 0 20px var(--orange-glow), 0 0 40px rgba(255, 102, 0, 0.2)';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--orange)';
            e.currentTarget.style.boxShadow = '0 0 10px var(--orange-glow)';
          }}>
            Try It Now
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated background elements */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, var(--orange-glow) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          opacity: 0.3,
          animation: 'pulse-glow 4s ease-in-out infinite',
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, var(--amber-glow) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          opacity: 0.2,
          animation: 'pulse-glow 5s ease-in-out infinite',
          zIndex: 0
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>
          <div style={{
            fontSize: '0.9rem',
            color: 'var(--orange)',
            marginBottom: '1rem',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.6s ease-in',
            textTransform: 'uppercase',
            letterSpacing: '3px'
          }}>
            AI-Powered Intelligence
          </div>
          
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            background: 'var(--gradient-fire)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.8s ease-in 0.2s',
            lineHeight: 1.1,
            textShadow: '0 0 30px var(--orange-glow)'
          }}>
            Your Next-Gen
            <br />
            AI Agent
          </h1>

          <p style={{
            fontSize: '1.25rem',
            color: 'var(--text-muted)',
            marginBottom: '2.5rem',
            maxWidth: '600px',
            margin: '0 auto 2.5rem',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.8s ease-in 0.4s',
            lineHeight: 1.6
          }}>
            Experience the future of artificial intelligence with an agent that understands, learns, and adapts to your needs in real-time.
          </p>

          <div style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.8s ease-in 0.6s'
          }}>
            <Link href="/research" style={{
              padding: '1rem 2.5rem',
              background: 'var(--gradient-fire)',
              border: 'none',
              color: 'var(--bg)',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: 'var(--glow-orange)',
              position: 'relative',
              overflow: 'hidden',
              textDecoration: 'none',
              display: 'inline-block'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 0 30px var(--orange-glow), 0 0 60px rgba(255, 102, 0, 0.3)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'var(--glow-orange)';
            }}>
              Start Research
            </Link>
            
            <Link href="/research" style={{
              padding: '1rem 2.5rem',
              background: 'transparent',
              border: '1px solid var(--orange)',
              color: 'var(--orange)',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 0 10px var(--orange-glow)',
              textDecoration: 'none',
              display: 'inline-block'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--orange)';
              e.currentTarget.style.color = 'var(--bg)';
              e.currentTarget.style.boxShadow = '0 0 20px var(--orange-glow), 0 0 40px rgba(255, 102, 0, 0.2)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--orange)';
              e.currentTarget.style.boxShadow = '0 0 10px var(--orange-glow)';
            }}>
              Try It Now
            </Link>
          </div>
        </div>

        {/* Data stream animation */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '20%',
          width: '2px',
          height: '100%',
          background: 'linear-gradient(to bottom, transparent, var(--orange), transparent)',
          opacity: 0.3,
          animation: 'data-stream 3s linear infinite'
        }} />
        <div style={{
          position: 'absolute',
          top: 0,
          left: '80%',
          width: '2px',
          height: '100%',
          background: 'linear-gradient(to bottom, transparent, var(--amber), transparent)',
          opacity: 0.3,
          animation: 'data-stream 4s linear infinite 1s'
        }} />
      </section>

      {/* Features Section */}
      <section id="features" style={{
        padding: '6rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        <h2 style={{
          fontSize: '3rem',
          textAlign: 'center',
          marginBottom: '4rem',
          color: 'var(--text-bright)',
          background: 'var(--gradient-warm)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Powerful Features
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {[
            {
              title: 'Intelligent Learning',
              description: 'Adaptive AI that learns from every interaction and continuously improves its responses.'
            },
            {
              title: 'Real-Time Processing',
              description: 'Lightning-fast responses with real-time data processing and analysis capabilities.'
            },
            {
              title: 'Secure & Private',
              description: 'Enterprise-grade security with end-to-end encryption and privacy-first architecture.'
            },
            {
              title: 'Multi-Modal',
              description: 'Process text, images, audio, and video with seamless multi-modal understanding.'
            },
            {
              title: 'Customizable',
              description: 'Fully customizable agents tailored to your specific use cases and requirements.'
            },
            {
              title: 'Scalable',
              description: 'Built to scale from prototype to production with enterprise-level infrastructure.'
            }
          ].map((feature, index) => (
            <div key={index} style={{
              padding: '2.5rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--orange)';
              e.currentTarget.style.boxShadow = 'var(--glow-orange)';
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.background = 'var(--bg-elevated)';
              const accentLine = e.currentTarget.querySelector('[data-accent-line]') as HTMLElement;
              if (accentLine) accentLine.style.opacity = '1';
              const indicator = e.currentTarget.querySelector('[data-indicator]') as HTMLElement;
              if (indicator) {
                indicator.style.opacity = '1';
                indicator.style.borderColor = 'var(--orange)';
              }
            }} onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'var(--bg-card)';
              const accentLine = e.currentTarget.querySelector('[data-accent-line]') as HTMLElement;
              if (accentLine) accentLine.style.opacity = '0';
              const indicator = e.currentTarget.querySelector('[data-indicator]') as HTMLElement;
              if (indicator) {
                indicator.style.opacity = '0.5';
                indicator.style.borderColor = 'var(--border)';
              }
            }}>
              {/* Accent line */}
              <div 
                data-accent-line
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '4px',
                  height: '100%',
                  background: 'var(--gradient-fire)',
                  opacity: 0,
                  transition: 'opacity 0.4s'
                }}
              />
              
              <h3 style={{
                fontSize: '1.5rem',
                color: 'var(--text-bright)',
                marginBottom: '1rem',
                fontWeight: '600',
                letterSpacing: '-0.02em',
                lineHeight: 1.3
              }}>{feature.title}</h3>
              
              <p style={{
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                fontSize: '0.95rem',
                margin: 0
              }}>{feature.description}</p>
              
              {/* Hover indicator */}
              <div 
                data-indicator
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  right: '1.5rem',
                  width: '24px',
                  height: '24px',
                  border: '1px solid var(--border)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.4s',
                  opacity: 0.5
                }}
              >
                <div style={{
                  width: '6px',
                  height: '6px',
                  background: 'var(--orange)',
                  borderRadius: '50%',
                  transition: 'all 0.4s'
                }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '3rem 2rem',
        textAlign: 'center',
        borderTop: '1px solid var(--border)',
        color: 'var(--text-muted)',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: 'var(--orange)',
          marginBottom: '1rem',
          textShadow: '0 0 10px var(--orange-glow)'
        }}>
          EDEN
        </div>
        <p style={{ marginBottom: '1rem' }}>© 2024 Eden AI Agent. All rights reserved.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--orange)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Privacy</a>
          <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--orange)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Terms</a>
          <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--orange)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Contact</a>
        </div>
      </footer>
    </div>
  );
}
