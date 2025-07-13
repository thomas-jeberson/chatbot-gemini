import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Correct import
import SplineScene from "./SplineScene";

const LandingPage = () => {
    const navigate = useNavigate(); // ✅ Hook

    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = `
            @keyframes float {
                0%, 100% {
                    transform: translateY(0px) rotate(0deg);
                }
                50% {
                    transform: translateY(-20px) rotate(180deg);
                }
            }

            @keyframes pulse-glow {
                0%, 100% {
                    box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
                    transform: scale(1);
                }
                50% {
                    box-shadow: 0 0 40px rgba(168, 85, 247, 0.6);
                    transform: scale(1.02);
                }
            }

            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            * {
                box-sizing: border-box;
            }
        `;
        document.head.appendChild(styleSheet);
        return () => {
            if (document.head.contains(styleSheet)) {
                document.head.removeChild(styleSheet);
            }
        };
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.heroSection}>
                <nav style={styles.nav}>
                    <div style={styles.navContainer}>
                        <div style={styles.navContent}>
                            <div style={styles.logo}>
                                <div style={styles.logoIcon}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                        <polyline points="16 18 22 12 16 6"></polyline>
                                        <polyline points="8 6 2 12 8 18"></polyline>
                                    </svg>
                                </div>
                                <span style={styles.logoText}>Thomas's Chatbot</span>
                            </div>
                            <div style={styles.authButtons}>
                                <button
                                    style={styles.loginButton}
                                    onClick={() => navigate('/login')}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                                        <polyline points="10 17 15 12 10 7"></polyline>
                                        <line x1="15" y1="12" x2="3" y2="12"></line>
                                    </svg>
                                    Login
                                </button>
                                <button
                                    style={styles.registerButton}
                                    onClick={() => navigate('/register')}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <line x1="19" y1="8" x2="19" y2="14"></line>
                                        <line x1="22" y1="11" x2="16" y2="11"></line>
                                    </svg>
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                <div style={styles.heroContainer}>
                    <SplineScene style={styles.splineBackground} />
                    <div style={styles.heroContent}>
                        <div style={styles.heroBadge}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={styles.badgeIcon}>
                                <path d="M12 2a2 2 0 0 1 1.6.8L15 5h6a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6l1.4-2.2A2 2 0 0 1 12 2z"></path>
                                <circle cx="12" cy="13" r="3"></circle>
                            </svg>
                            AI-Powered Computer Science Assistant
                        </div>

                        <h1 style={styles.mainHeading}>
                            Intelligent <span style={styles.gradientText}>ChatBot</span><br />
                            for Developers
                        </h1>

                        <div>
                            <p style={styles.subheading}>
                                Seamlessly integrate our advanced AI chatbot into your website.
                                Built with Spring Boot backend and JWT authentication for enterprise-grade security.
                            </p>
                        </div>

                        <div style={styles.featurePills}>
                            {["Spring Boot API", "JWT Authentication", "Secure API Calls", "Easy Integration"].map((text, index) => (
                                <div style={styles.featurePill} key={index}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={styles.pillIcon}>
                                        <circle cx="12" cy="12" r="10"></circle>
                                    </svg>
                                    {text}
                                </div>
                            ))}
                        </div>

                        <div style={styles.ctaButtons}>
                            <button
                                style={styles.primaryButton}
                                onClick={() => navigate('/register')} // ✅ Navigate to register
                            >
                                Get Started Free
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={styles.buttonIcon}>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </button>

                            <button style={styles.secondaryButton}>
                                View Documentation
                            </button>
                        </div>

                        <div style={styles.stats}>
                            <div style={styles.statItem}>
                                <div style={styles.statNumber}>99.9%</div>
                                <div style={styles.statLabel}>Uptime Guaranteed</div>
                            </div>
                            <div style={styles.statItem}>
                                <div style={styles.statNumber}>{"< 100ms"}</div>
                                <div style={styles.statLabel}>Avg. Response Time</div>
                            </div>
                            <div style={styles.statItem}>
                                <div style={styles.statNumber}>Unbeatable</div>
                                <div style={styles.statLabel}>Performance</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
        backgroundColor: '#000000',
        color: '#ffffff',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    },
    
    // Navigation Styles - now relative instead of fixed
    nav: {
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: 'rgba(255, 255, 255, 0)', // ✅ fully transparent
        backdropFilter: 'blur(10px)',              // keep if you want glass effect
        WebkitBackdropFilter: 'blur(10px)',        // for Safari support
        borderBottom: '1px solid rgba(168, 85, 247, 0.1)',
        width: '100%',
    },
    navContainer: {
        maxWidth: '2000px',
        margin: '0 auto',
        padding: '0 5rem',
        backgroundColor: 'transparent',           // ✅ make sure it's transparent
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
    },
    navContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '3.5rem',
        width: '100%',
        backgroundColor: 'transparent',           // ✅ ensure it's not adding background
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
    },
    logoIcon: {
        width: '2.5rem',
        height: '2.5rem',
        background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
        borderRadius: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
    },
    logoText: {
        fontSize: '1.5rem',
        fontWeight: '700',
        background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
    },
    authButtons: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    loginButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: 'transparent',
        color: '#a855f7',
        border: '1px solid rgba(168, 85, 247, 0.3)',
        borderRadius: '0.5rem',
        fontSize: '0.875rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontFamily: 'inherit',
    },
    registerButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
        color: 'white',
        border: 'none',
        borderRadius: '0.5rem',
        fontSize: '0.875rem',
        fontWeight: '600',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
        transition: 'all 0.3s ease',
        fontFamily: 'inherit',
    },
    heroSection: {
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: 'black',
    },
    splineBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -10,
        pointerEvents: 'auto',
        transform: 'scale(1.3)',
    },
    heroContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0rem 1rem 1rem 1rem',
        position: 'relative',
        zIndex: 10,
        pointerEvents: 'none',
    },
    heroContent: {
        position: 'relative',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        backdropFilter: 'blur(10px)',
        borderRadius: '1.5rem',
        padding: '4rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        maxWidth: '70rem',
        textAlign: 'center',
        zIndex: 10,
        pointerEvents: 'none',
    },
    heroBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        borderRadius: '9999px',
        background: 'rgba(255, 255, 255, 0.2)',
        color: '#ffffff',
        fontSize: '0.875rem',
        fontWeight: '500',
        marginBottom: '2rem',
        backdropFilter: 'blur(10px)',
    },
    badgeIcon: {
        width: '1rem',
        height: '1rem',
    },
    mainHeading: {
        fontSize: '3.75rem',
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: '1.5rem',
        lineHeight: '1.1',
        textShadow: '0 4px 8px rgba(0, 0, 0, 0.8)',
    },
    gradientText: {
        background: 'linear-gradient(135deg, #a855f7, #c084fc)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    subheading: {
        fontSize: '1.25rem',
        color: '#e5e7eb',
        marginBottom: '2rem',
        lineHeight: '1.6',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
    },
    featurePills: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '2rem',
    },
    featurePill: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '9999px',
        color: '#ffffff',
        fontSize: '0.875rem',
        fontWeight: '500',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    pillIcon: {
        width: '1rem',
        height: '1rem',
    },
    ctaButtons: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '3rem',
    },
    primaryButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '1rem 2rem',
        background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
        color: 'white',
        border: 'none',
        borderRadius: '0.5rem',
        fontSize: '1.125rem',
        fontWeight: '600',
        cursor: 'pointer',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s',
        animation: 'pulse-glow 2s ease-in-out infinite',
        pointerEvents: 'auto',
    },
    secondaryButton: {
        padding: '1rem 2rem',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        color: '#ffffff',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '0.5rem',
        fontSize: '1.125rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s',
        backdropFilter: 'blur(10px)',
        pointerEvents: 'auto',
    },
    stats: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '2rem',
        marginTop: '3rem',
        paddingTop: '2rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
    },
    statItem: {
        textAlign: 'center',
    },
    statNumber: {
        fontSize: '1.875rem',
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: '0.5rem',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
    },
    statLabel: {
        color: '#e5e7eb',
        fontSize: '0.875rem',
    },
};

export default LandingPage;
