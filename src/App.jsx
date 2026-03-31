import { useEffect, useState } from 'react';
import './index.css';

function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
        // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        const handleScroll = () => {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll);

        // Intersection Observer for scroll reveals
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.12 });

        // Observe all .reveal elements
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        // Steps staggered reveal
        document.querySelectorAll('.step-card').forEach((el, i) => {
            el.style.transitionDelay = `${i * 0.12}s`;
            observer.observe(el);
        });

        // Category cards staggered reveal
        document.querySelectorAll('.cat-card').forEach((el, i) => {
            el.style.transitionDelay = `${i * 0.07}s`;
            observer.observe(el);
        });

        // Trust cards staggered reveal
        document.querySelectorAll('.trust-card').forEach((el, i) => {
            el.style.transitionDelay = `${i * 0.1}s`;
            observer.observe(el);
        });

        // Testimonial cards staggered reveal
        document.querySelectorAll('.testi-card').forEach((el, i) => {
            el.style.transitionDelay = `${i * 0.12}s`;
            observer.observe(el);
        });

        // Dual cards
        document.querySelectorAll('.dual-card').forEach(el => observer.observe(el));

        // Animated counter for numbers section
        function animateCounter(el, target, suffix = '') {
            let start = 0;
            const dur = 1400;
            const startTime = performance.now();
            function step(now) {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / dur, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(eased * target) + suffix;
                if (progress < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        }

        const numObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const nums = entry.target.querySelectorAll('.num-val');
                    const data = [65, 9, 20, 5];
                    const suffixes = ['+', '', '+', ''];
                    nums.forEach((el, i) => animateCounter(el, data[i], suffixes[i]));
                    numObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        const numSection = document.querySelector('.numbers-grid');
        if (numSection) numObserver.observe(numSection);

        // Smooth scroll for nav links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
            });
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {/* NAVBAR */}
            <nav id="navbar">
                <div className="nav-logo">Rent<span>Nearby</span></div>
                <button
                    className={`nav-toggle${menuOpen ? ' open' : ''}`}
                    onClick={() => setMenuOpen(o => !o)}
                    aria-label="Toggle navigation"
                >
                    <span></span><span></span><span></span>
                </button>
                <div className={`nav-links${menuOpen ? ' open' : ''}`} id="navLinks">
                    <a href="#how" onClick={() => setMenuOpen(false)}>How it works</a>
                    <a href="#categories" onClick={() => setMenuOpen(false)}>Browse</a>
                    <a href="#trust" onClick={() => setMenuOpen(false)}>Why us</a>
                    <a href="#" className="btn-nav" onClick={() => setMenuOpen(false)}>Get Started →</a>
                </div>
            </nav>

            {/* HERO */}
            <section className="hero">
                <div className="hero-bg-circle" style={{ width: '600px', height: '600px', top: '-200px', right: '-150px' }}></div>
                <div className="hero-bg-circle" style={{ width: '300px', height: '300px', bottom: '0', left: '-100px', animationDelay: '3s' }}></div>
                <div className="hero-grid">
                    <div>
                        <div className="hero-eyebrow">Now live in your city</div>
                        <h1 className="hero-h1">Rent <em>anything</em><br />from someone<br />nearby</h1>
                        <p className="hero-sub">Cameras, bikes, tools, instruments, rooms — discover and borrow from real people within 2–20 km. No shipping. No waiting. Just neighbours helping neighbours.</p>
                        <div className="hero-ctas">
                            <a href="#" className="btn-primary">Start Renting →</a>
                            <a href="#" className="btn-secondary">List Your Item</a>
                        </div>
                        <div className="hero-stats">
                            <div className="stat-item">
                                <div className="stat-num">20km</div>
                                <div className="stat-label">Max search radius</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-num">7+</div>
                                <div className="stat-label">Categories</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-num">2</div>
                                <div className="stat-label">Rental modes</div>
                            </div>
                        </div>
                    </div>
                    <div className="hero-visual">
                        {/* Card 1 */}
                        <div className="listing-card card-1">
                            <div className="distance-chip">📍 1.2 km</div>
                            <div className="card-img">
                                <svg viewBox="0 0 60 50" style={{ width: '48px', height: '48px', stroke: 'var(--amber)', fill: 'none', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }}>
                                    <rect x="5" y="10" width="50" height="34" rx="3" />
                                    <circle cx="30" cy="27" r="9" />
                                    <circle cx="30" cy="27" r="4" />
                                    <rect x="8" y="13" width="8" height="6" rx="1" />
                                </svg>
                            </div>
                            <div className="card-title">Sony A7III Camera</div>
                            <div className="card-meta">Electronics · Guwahati</div>
                            <div className="card-price">₹450 / hr</div>
                            <div className="card-badge">✓ Available now</div>
                        </div>
                        {/* Card 2 */}
                        <div className="listing-card card-2">
                            <div className="distance-chip">📍 3.8 km</div>
                            <div className="card-img">
                                <svg viewBox="0 0 60 50" style={{ width: '48px', height: '48px', stroke: 'var(--amber)', fill: 'none', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }}>
                                    <circle cx="14" cy="37" r="6" />
                                    <circle cx="46" cy="37" r="6" />
                                    <path d="M8 37h-4v-10l6-12h30l6 8v14h-6" />
                                    <path d="M20 37h20" />
                                    <path d="M10 25h30" />
                                </svg>
                            </div>
                            <div className="card-title">Royal Enfield Bike</div>
                            <div className="card-meta">Bikes · Paltan Bazar</div>
                            <div className="card-price">₹800 / day</div>
                            <div className="card-badge">✓ Available now</div>
                        </div>
                        {/* Card 3 */}
                        <div className="listing-card card-3">
                            <div className="distance-chip">📍 0.6 km</div>
                            <div className="card-img">
                                <svg viewBox="0 0 60 50" style={{ width: '48px', height: '48px', stroke: 'var(--amber)', fill: 'none', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }}>
                                    <path d="M6 44V22L30 6l24 16v22H6z" />
                                    <rect x="20" y="28" width="20" height="16" rx="1" />
                                    <path d="M30 28v16" />
                                </svg>
                            </div>
                            <div className="card-title">Furnished Room, 1BHK</div>
                            <div className="card-meta">Room Rent · Chandmari</div>
                            <div className="card-price">₹7,500 / mo</div>
                            <div className="card-badge">✓ Available</div>
                        </div>
                        {/* Notification */}
                        <div className="notification-pop">Rahul just booked your camera!</div>
                    </div>
                </div>
            </section>

            {/* MARQUEE */}
            <div className="marquee-section">
                <div className="marquee-track" id="marquee">
                    <span className="marquee-item">Electronics</span>
                    <span className="marquee-item">Instruments</span>
                    <span className="marquee-item">Bikes</span>
                    <span className="marquee-item">Tools</span>
                    <span className="marquee-item">Sports Gear</span>
                    <span className="marquee-item">Party & Events</span>
                    <span className="marquee-item">Room Rent</span>
                    <span className="marquee-item">Electronics</span>
                    <span className="marquee-item">Instruments</span>
                    <span className="marquee-item">Bikes</span>
                    <span className="marquee-item">Tools</span>
                    <span className="marquee-item">Sports Gear</span>
                    <span className="marquee-item">Party & Events</span>
                    <span className="marquee-item">Room Rent</span>
                </div>
            </div>

            {/* DUAL LISTING TYPES */}
            <section className="section">
                <div className="section-inner">
                    <div className="reveal">
                        <div className="section-tag">Two ways to rent</div>
                        <h2 className="section-title">One platform,<br /><em>two rental modes</em></h2>
                    </div>
                    <div className="dual-grid">
                        <div className="dual-card dual-card-rental reveal" style={{ transitionDelay: '0.1s' }}>
                            <div className="dual-card-badge badge-rental">Book Now</div>
                            <div className="dual-card-bg-shape rental-shape"></div>
                            <div className="dual-card-icon rental-icon">
                                <svg viewBox="0 0 24 24" style={{ width: '24px', height: '24px', stroke: 'var(--amber)', fill: 'none', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }}>
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                </svg>
                            </div>
                            <h3>Item & Room Rental</h3>
                            <p>Rent cameras, bikes, tools, instruments, or rooms by the hour or day from owners nearby. Full booking, payment trail, and review system included.</p>
                            <div className="dual-card-features">
                                <div className="feature-row"><div className="feature-dot"></div>Hourly & daily pricing</div>
                                <div className="feature-row"><div className="feature-dot"></div>Instant price estimate before committing</div>
                                <div className="feature-row"><div className="feature-dot"></div>Payment acknowledgment trail</div>
                                <div className="feature-row"><div className="feature-dot"></div>Post-rental reviews update trust score</div>
                            </div>
                        </div>
                        <div className="dual-card dual-card-room reveal" style={{ transitionDelay: '0.2s' }}>
                            <div className="dual-card-badge badge-room">Chat First</div>
                            <div className="dual-card-bg-shape room-shape"></div>
                            <div className="dual-card-icon room-icon">
                                <svg viewBox="0 0 24 24" style={{ width: '24px', height: '24px', stroke: 'var(--amber)', fill: 'none', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }}>
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    <polyline points="9 22 9 12 15 12 15 22" />
                                </svg>
                            </div>
                            <h3>Room Rent Listings</h3>
                            <p>Landlords post monthly room listings. Tenants discover and contact owners directly via real-time chat. No booking flow, no platform fees — just hyperlocal discovery.</p>
                            <div className="dual-card-features">
                                <div className="feature-row"><div className="feature-dot"></div>OLX-style listing posts</div>
                                <div className="feature-row"><div className="feature-dot"></div>Direct landlord–tenant chat</div>
                                <div className="feature-row"><div className="feature-dot"></div>Monthly price filtering</div>
                                <div className="feature-row"><div className="feature-dot"></div>Owner deactivates when room is taken</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="section how-section" id="how">
                <div className="section-inner">
                    <div className="reveal" style={{ textAlign: 'center' }}>
                        <div className="section-tag" style={{ justifyContent: 'center', color: 'var(--amber-light)' }}>Simple process</div>
                        <h2 className="section-title" style={{ color: 'white' }}>How it <em>works</em></h2>
                        <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '1rem', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto', fontSize: '0.95rem', lineHeight: '1.7' }}>From signup to renting in minutes — no complicated onboarding, no waiting.</p>
                    </div>
                    <div className="steps-grid" id="stepsGrid">
                        <div className="step-card">
                            <div className="step-num">01</div>
                            <h4>Sign up with phone</h4>
                            <p>OTP-based login — no passwords. Enter your number and verify in seconds.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-num">02</div>
                            <h4>Search nearby</h4>
                            <p>Browse items within 2–20 km. Results are grouped by distance band — closest first.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-num">03</div>
                            <h4>Book or chat</h4>
                            <p>For rentals, book instantly and agree to the rental policy. For rooms, chat with the landlord directly.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-num">04</div>
                            <h4>Pay & review</h4>
                            <p>Pay directly (cash, UPI). The platform tracks acknowledgment. Leave a review to build trust.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CATEGORIES */}
            <section className="section" id="categories">
                <div className="section-inner">
                    <div className="reveal" style={{ textAlign: 'center' }}>
                        <div className="section-tag" style={{ justifyContent: 'center' }}>Browse by category</div>
                        <h2 className="section-title">What's <em>available</em><br />near you</h2>
                    </div>
                    <div className="cat-grid" id="catGrid">
                        <div className="cat-card">
                            <div className="cat-emoji">
                                <svg viewBox="0 0 24 24">
                                    <rect x="2" y="6" width="20" height="14" rx="2" />
                                    <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                                    <circle cx="12" cy="13" r="2" />
                                </svg>
                            </div>
                            <div className="cat-name">Electronics</div>
                            <div className="cat-count">Cameras, drones & more</div>
                        </div>
                        <div className="cat-card">
                            <div className="cat-emoji">
                                <svg viewBox="0 0 24 24">
                                    <path d="M9 18V5l12-2v13" />
                                    <circle cx="6" cy="18" r="3" />
                                    <circle cx="18" cy="16" r="3" />
                                </svg>
                            </div>
                            <div className="cat-name">Instruments</div>
                            <div className="cat-count">Guitars, keyboards & more</div>
                        </div>
                        <div className="cat-card">
                            <div className="cat-emoji">
                                <svg viewBox="0 0 24 24">
                                    <circle cx="18.5" cy="17.5" r="2.5" />
                                    <circle cx="5.5" cy="17.5" r="2.5" />
                                    <path d="M15 17.5H8M2 8h2l2 9h12l2-6H7" />
                                </svg>
                            </div>
                            <div className="cat-name">Bikes</div>
                            <div className="cat-count">Cycles, scooters & more</div>
                        </div>
                        <div className="cat-card">
                            <div className="cat-emoji">
                                <svg viewBox="0 0 24 24">
                                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                                </svg>
                            </div>
                            <div className="cat-name">Tools</div>
                            <div className="cat-count">Drills, saws & more</div>
                        </div>
                        <div className="cat-card">
                            <div className="cat-emoji">
                                <svg viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                                    <path d="M2 12h20" />
                                </svg>
                            </div>
                            <div className="cat-name">Sports Gear</div>
                            <div className="cat-count">Kits, equipment & more</div>
                        </div>
                        <div className="cat-card">
                            <div className="cat-emoji">
                                <svg viewBox="0 0 24 24">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                            </div>
                            <div className="cat-name">Party & Events</div>
                            <div className="cat-count">Decor, speakers & more</div>
                        </div>
                        <div className="cat-card">
                            <div className="cat-emoji">
                                <svg viewBox="0 0 24 24">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    <polyline points="9 22 9 12 15 12 15 22" />
                                </svg>
                            </div>
                            <div className="cat-name">Room Rent</div>
                            <div className="cat-count">PGs, 1BHK, shared rooms</div>
                        </div>
                    </div>
                    <p className="reveal" style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.82rem', color: 'var(--slate-soft)' }}>New categories added by admins — no code deploys needed.</p>
                </div>
            </section>

            {/* NUMBERS */}
            <section className="section numbers-section">
                <div className="section-inner">
                    <div className="numbers-grid reveal">
                        <div className="num-item"><div className="num-val">0</div><div className="num-label">API Endpoints</div></div>
                        <div className="num-item"><div className="num-val">0</div><div className="num-label">Microservices</div></div>
                        <div className="num-item"><div className="num-val">0</div><div className="num-label">DB Tables</div></div>
                        <div className="num-item"><div className="num-val">0</div><div className="num-label">Distance Bands</div></div>
                    </div>
                </div>
            </section>

            {/* TRUST */}
            <section className="section" id="trust">
                <div className="section-inner">
                    <div className="reveal">
                        <div className="section-tag">Built for trust</div>
                        <h2 className="section-title">Safety &amp; trust<br /><em>baked in</em></h2>
                    </div>
                    <div className="trust-grid" id="trustGrid">
                        <div className="trust-card">
                            <div className="trust-icon">
                                <svg viewBox="0 0 24 24">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                            </div>
                            <h4>Rental Score (0–100)</h4>
                            <p>Every user has a trust score that updates automatically when they receive reviews. See who you're renting from before you book.</p>
                        </div>
                        <div className="trust-card">
                            <div className="trust-icon">
                                <svg viewBox="0 0 24 24">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </div>
                            <h4>OTP Login + ID Verify</h4>
                            <p>Phone-based OTP authentication — no passwords to forget or leak. Government ID (Aadhaar/DL) verification support built in.</p>
                        </div>
                        <div className="trust-card">
                            <div className="trust-icon">
                                <svg viewBox="0 0 24 24">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
                            </div>
                            <h4>Real-Time Chat</h4>
                            <p>WebSocket-powered 1-to-1 chat with read receipts and typing indicators. All messages persisted for dispute reference.</p>
                        </div>
                        <div className="trust-card">
                            <div className="trust-icon">
                                <svg viewBox="0 0 24 24">
                                    <path d="M22 7H2v5h20V7z" />
                                    <path d="M12 22V7" />
                                    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                                    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                                </svg>
                            </div>
                            <h4>Support Tickets</h4>
                            <p>Dispute, report, or seek help via structured support tickets linked to bookings and listings. Threaded conversations with our team.</p>
                        </div>
                        <div className="trust-card">
                            <div className="trust-icon">
                                <svg viewBox="0 0 24 24">
                                    <polyline points="9 11 12 14 22 4" />
                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                </svg>
                            </div>
                            <h4>Policy Acknowledgment</h4>
                            <p>Renters must explicitly agree to the rental policy before booking. Timestamp and IP recorded — clear accountability for both parties.</p>
                        </div>
                        <div className="trust-card">
                            <div className="trust-icon">
                                <svg viewBox="0 0 24 24">
                                    <line x1="12" y1="1" x2="12" y2="23" />
                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                </svg>
                            </div>
                            <h4>Payment Trail</h4>
                            <p>Payments happen directly (cash/UPI) but the platform tracks acknowledgment from both sides, creating a trust trail without holding your money.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="section" style={{ background: 'var(--warm-white)' }}>
                <div className="section-inner">
                    <div className="reveal" style={{ textAlign: 'center' }}>
                        <div className="section-tag" style={{ justifyContent: 'center' }}>Early users</div>
                        <h2 className="section-title">People <em>love it</em></h2>
                    </div>
                    <div className="testi-grid" id="testiGrid">
                        <div className="testi-card">
                            <div className="stars">★★★★★</div>
                            <div className="testi-text">"Rented a DSLR for my sister's wedding for just ₹900. The owner was 1.4 km away. Couldn't believe it was this simple — booked in 3 minutes."</div>
                            <div className="testi-author">
                                <div className="testi-avatar" style={{ background: '#2E3347' }}>A</div>
                                <div><div className="testi-name">Aditya R.</div><div className="testi-loc">Guwahati, Assam</div></div>
                            </div>
                        </div>
                        <div className="testi-card">
                            <div className="stars">★★★★★</div>
                            <div className="testi-text">"I listed my guitar and made ₹3,200 in a month. It was just collecting dust. The chat feature makes coordinating with renters super easy."</div>
                            <div className="testi-author">
                                <div className="testi-avatar" style={{ background: '#E8732A' }}>P</div>
                                <div><div className="testi-name">Priya M.</div><div className="testi-loc">Dispur, Assam</div></div>
                            </div>
                        </div>
                        <div className="testi-card">
                            <div className="stars">★★★★☆</div>
                            <div className="testi-text">"Found a furnished room 0.8 km from my office within 2 days. Messaged the landlord through the app and moved in the next week."</div>
                            <div className="testi-author">
                                <div className="testi-avatar" style={{ background: '#4A5068' }}>K</div>
                                <div><div className="testi-name">Kabir S.</div><div className="testi-loc">Chandmari, Guwahati</div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <div className="cta-section" id="cta">
                <div className="cta-glow" style={{ width: '400px', height: '400px', top: '-150px', left: '-100px' }}></div>
                <div className="cta-glow" style={{ width: '300px', height: '300px', bottom: '-100px', right: '-50px', animationDelay: '2s' }}></div>
                <h2 style={{ position: 'relative', zIndex: 1 }}>Ready to rent from<br />your <em>neighbourhood?</em></h2>
                <p style={{ position: 'relative', zIndex: 1 }}>Join RentNearby today. List your unused items, find rooms, rent gear — all within a few kilometres of home.</p>
                <div className="cta-btns" style={{ position: 'relative', zIndex: 1 }}>
                    <a href="#" className="btn-primary" style={{ background: 'var(--amber)', boxShadow: '0 6px 28px rgba(232,115,42,0.4)' }}>Start Renting →</a>
                    <a href="#" className="btn-secondary" style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: 'white' }}>List an Item</a>
                </div>
            </div>

            {/* FOOTER */}
            <footer>
                <div className="footer-inner">
                    <div>
                        <div className="footer-logo">Rent<span>Nearby</span></div>
                        <div className="footer-desc">A hyperlocal peer-to-peer rental platform. Rent items by the hour or day, or find monthly rooms — all within your neighbourhood.</div>
                        <div className="tech-pills" style={{ marginTop: '1rem' }}>
                            <span className="tech-pill">FastAPI</span>
                            <span className="tech-pill">PostgreSQL</span>
                            <span className="tech-pill">Redis</span>
                            <span className="tech-pill">Docker</span>
                            <span className="tech-pill">WebSockets</span>
                        </div>
                    </div>
                    <div className="footer-col">
                        <h5>Platform</h5>
                        <a href="#">Browse Rentals</a>
                        <a href="#">Room Listings</a>
                        <a href="#">List an Item</a>
                        <a href="#">How it Works</a>
                    </div>
                    <div className="footer-col">
                        <h5>Support</h5>
                        <a href="#">Help Center</a>
                        <a href="#">Report a User</a>
                        <a href="#">Open a Ticket</a>
                        <a href="#">Contact Us</a>
                    </div>
                    <div className="footer-col">
                        <h5>Legal</h5>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Rental Policy</a>
                        <a href="#">Community Rules</a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <span>© 2026 RentNearby. All rights reserved.</span>
                    <span>Made with ♥ in Assam, India</span>
                </div>
            </footer>
        </>
    );
}

export default App;