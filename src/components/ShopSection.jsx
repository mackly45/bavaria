import Reveal from './Reveal';
import { flavors } from '../data/flavors';

const ShopSection = ({ flavor, setFlavor }) => {
    return (
        <section id="shop" className="section" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="container">
                <Reveal width="100%">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <p style={{ color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Boutique</p>
                        <h2>Choisissez votre saveur</h2>
                    </div>
                </Reveal>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
                    {Object.entries(flavors).map(([key, item], i) => {
                        const isActive = flavor === key;
                        return (
                            <Reveal key={key} width="100%" delay={0.1 * i}>
                                <button
                                    type="button"
                                    onClick={() => setFlavor(key)}
                                    aria-pressed={isActive}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: '2rem 1rem',
                                        background: 'rgba(255,255,255,0.03)',
                                        border: `1px solid ${isActive ? item.color : 'var(--color-divider)'}`,
                                        borderRadius: '16px',
                                        color: 'inherit',
                                        font: 'inherit',
                                        cursor: 'pointer',
                                        transition: 'border-color 0.3s ease, transform 0.3s ease',
                                        transform: isActive ? 'translateY(-4px)' : 'none'
                                    }}
                                >
                                    <img
                                        src={item.canImg}
                                        alt={`Canette Bavaria ${item.title}`}
                                        loading="lazy"
                                        style={{ height: '200px', width: 'auto', objectFit: 'contain', mixBlendMode: 'lighten' }}
                                    />
                                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.25rem', color: item.color }}>
                                        {item.title}
                                    </span>
                                    <span style={{ fontSize: 'var(--fs-small)', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                        {isActive ? 'Sélectionnée' : 'Choisir'}
                                    </span>
                                </button>
                            </Reveal>
                        );
                    })}
                </div>

                <Reveal width="100%" delay={0.3}>
                    <p style={{ textAlign: 'center', marginTop: '3rem', opacity: 0.7 }}>
                        Disponible chez nos revendeurs partenaires. <a href="#contact" style={{ color: flavors[flavor].color, fontWeight: 600 }}>Nous contacter</a>
                    </p>
                </Reveal>
            </div>
        </section>
    );
};

export default ShopSection;
