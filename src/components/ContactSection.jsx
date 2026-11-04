// Renseigner les URLs des réseaux sociaux : seuls les liens non vides sont affichés.
const socialLinks = [
    { name: 'Instagram', url: '' },
    { name: 'Twitter', url: '' },
    { name: 'Facebook', url: '' },
].filter((link) => link.url);

const ContactSection = () => {
    return (
        <footer id="contact" style={{ padding: '8vh 5vw', borderTop: '1px solid var(--color-divider)', textAlign: 'center', backgroundColor: '#050505' }}>
            <div className="container">
                <h2 style={{ marginBottom: '1.5rem', letterSpacing: '-0.02em', fontWeight: 800 }}>BAVARIA</h2>
                <p style={{ marginBottom: '2.5rem', opacity: 0.8, fontSize: 'var(--fs-body)' }}>Conçu pour l&apos;audace. À consommer frais.</p>

                {socialLinks.length > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover-link"
                                style={{ opacity: 0.6, fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                )}

                <div style={{ opacity: 0.4, fontSize: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem' }}>
                    <p>&copy; {new Date().getFullYear()} Bavaria N.V. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
};

export default ContactSection;
