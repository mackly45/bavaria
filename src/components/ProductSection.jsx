import React from 'react';
import Reveal from './Reveal';

const ProductSection = () => {
    return (
        <section id="product" className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px' }}>
                    <div style={{ gridColumn: 'span 6' }} className="col-12-mobile">
                        <Reveal>
                            <p style={{
                                color: 'var(--color-accent)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                marginBottom: '1rem'
                            }}>
                                The Experience
                            </p>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Unmatched Freshness</h2>
                        </Reveal>
                        <Reveal delay={0.4}>
                            <p style={{ opacity: 0.8, marginBottom: '2rem', maxWidth: '500px' }}>
                                Brewed with pure mineral water from our own spring, Bavaria offers a crisp, clean
                                taste. The added orange essence brings a vibrant, citrusy kick that awakens your senses.
                            </p>
                            <ul style={{ color: 'var(--color-text-secondary)', listStyle: 'none' }}>
                                <li style={{ marginBottom: '0.5rem' }}>• 0.0% Alcohol</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Natural Ingredients</li>
                                <li>• Low Calorie</li>
                            </ul>
                        </Reveal>
                    </div>

                    <div style={{ gridColumn: 'span 6', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="col-12-mobile">
                        {/* Placeholder for Product Image */}
                        <div style={{
                            width: '100%',
                            height: '400px',
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <span style={{ opacity: 0.3 }}>Interactive 3D Can Placeholder</span>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                @media (max-width: 768px) {
                    .col-12-mobile { grid-column: span 12 !important; }
                }
            `}</style>
        </section>
    );
};

export default ProductSection;
