import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Produit', href: '#product' },
        { name: 'Ingrédients', href: '#ingredients' },
        { name: 'Nutrition', href: '#nutrition' },
        { name: 'Boutique', href: '#shop' },
        { name: 'Avis', href: '#reviews' },
        { name: 'FAQ', href: '#faq' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`navbar ${scrolled ? 'scrolled' : ''}`}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                padding: scrolled ? '1rem 5vw' : '2rem 5vw',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 1000,
                transition: 'padding 0.3s ease, background-color 0.3s ease',
                backgroundColor: scrolled ? 'rgba(5, 5, 5, 0.8)' : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
            }}
        >
            <a href="#home" className="nav-logo" aria-label="Bavaria - Accueil" style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: '1.5rem',
                letterSpacing: '-0.02em'
            }}>
                BAVARIA
            </a>

            {/* Desktop Menu */}
            <ul className="nav-links desktop-only" style={{ display: 'flex', gap: '2rem' }}>
                {navLinks.map((link) => (
                    <li key={link.name}>
                        <a href={link.href} className="nav-link" style={{
                            textTransform: 'uppercase',
                            fontSize: '0.875rem',
                            opacity: 0.8,
                            transition: 'opacity 0.2s'
                        }}>
                            {link.name}
                        </a>
                    </li>
                ))}
            </ul>

            {/* Mobile Toggle */}
            <button
                type="button"
                className="mobile-toggle desktop-hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                style={{ position: 'relative', zIndex: 20 }}
            >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        id="mobile-menu"
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            width: '80%',
                            maxWidth: '400px',
                            height: '100vh',
                            backgroundColor: 'rgba(5, 5, 5, 0.95)',
                            backdropFilter: 'blur(30px)',
                            padding: '120px 2rem 2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2rem',
                            zIndex: 10,
                            borderLeft: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: '-10px 0 50px rgba(0,0,0,0.5)'
                        }}
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 + 0.3 }}
                                onClick={() => setMobileMenuOpen(false)}
                                style={{
                                    textTransform: 'uppercase',
                                    fontSize: '1.5rem',
                                    fontWeight: 600,
                                    letterSpacing: '0.05em',
                                    opacity: 0.8
                                }}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
