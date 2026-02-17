import React from 'react';

const ContactSection = () => {
    return (
        <footer id="contact" style={{ padding: '4rem 5vw', borderTop: '1px solid var(--color-divider)', textAlign: 'center' }}>
            <div className="container">
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem', letterSpacing: '-0.02em', fontWeight: 700 }}>BAVARIA</h2>
                <p style={{ marginBottom: '2rem', opacity: 0.8 }}>Designed for the bold. Drink responsibly.</p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem' }}>
                    <a href="#" style={{ opacity: 0.7, transition: '0.3s', textTransform: 'uppercase', fontSize: '0.8rem' }} className="hover-link">Instagram</a>
                    <a href="#" style={{ opacity: 0.7, transition: '0.3s', textTransform: 'uppercase', fontSize: '0.8rem' }} className="hover-link">Twitter</a>
                    <a href="#" style={{ opacity: 0.7, transition: '0.3s', textTransform: 'uppercase', fontSize: '0.8rem' }} className="hover-link">Facebook</a>
                </div>

                <p style={{ opacity: 0.4, fontSize: '0.8rem' }}>&copy; 2026 Bavaria N.V. All rights reserved.</p>
            </div>
            <style>{`
                .hover-link:hover { opacity: 1 !important; color: var(--color-accent); }
            `}</style>
        </footer>
    );
};

export default ContactSection;
