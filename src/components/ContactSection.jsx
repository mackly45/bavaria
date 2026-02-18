import React from 'react';

const ContactSection = () => {
    return (
        <footer id="contact" style={{ padding: '8vh 5vw', borderTop: '1px solid var(--color-divider)', textAlign: 'center', backgroundColor: '#050505' }}>
            <div className="container">
                <h2 style={{ marginBottom: '1.5rem', letterSpacing: '-0.02em', fontWeight: 800 }}>BAVARIA</h2>
                <p style={{ marginBottom: '2.5rem', opacity: 0.8, fontSize: 'var(--fs-body)' }}>Conçu pour l'audace. À consommer frais.</p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
                    <a href="#" className="hover-link" style={{ opacity: 0.6, fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Instagram</a>
                    <a href="#" className="hover-link" style={{ opacity: 0.6, fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Twitter</a>
                    <a href="#" className="hover-link" style={{ opacity: 0.6, fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Facebook</a>
                </div>

                <div style={{ opacity: 0.4, fontSize: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem' }}>
                    <p>&copy; 2026 Bavaria N.V. Tous droits réservés.</p>
                </div>
            </div>
            <style>{`
                .hover-link { transition: all 0.3s ease; }
                .hover-link:hover { opacity: 1 !important; color: var(--color-accent); transform: translateY(-2px); }
            `}</style>
        </footer>
    );
};

export default ContactSection;
