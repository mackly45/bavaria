import React from 'react';
import Reveal from './Reveal';

const ReviewsSection = () => {
    return (
        <section id="reviews" className="section" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="container">
                <Reveal width="100%">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <p style={{ color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Communauté</p>
                        <h2>Ce que les gens disent</h2>
                    </div>
                </Reveal>

                <div className="grid">
                    <div className="col-6 col-md-12">
                        <Reveal delay={0.2}>
                            <ReviewCard
                                quote="Absolument rafraîchissant ! Le malt donne une profondeur que les sodas n'ont pas, et l'orange est parfaitement équilibrée."
                                author="Sarah M."
                            />
                        </Reveal>
                    </div>
                    <div className="col-6 col-md-12">
                        <Reveal delay={0.4}>
                            <ReviewCard
                                quote="Ma boisson préférée après une séance de sport. Hydratante sans être trop sucrée. J'adore le nouveau design !"
                                author="David K."
                            />
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ReviewCard = ({ quote, author }) => (
    <div style={{
        padding: '2rem',
        background: 'rgba(255,255,255,0.03)',
        borderLeft: '2px solid var(--color-accent)',
        borderRadius: '0 10px 10px 0'
    }}>
        <p style={{ fontSize: '1.1rem', marginBottom: '1rem', fontStyle: 'italic' }}>"{quote}"</p>
        <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>— {author}</p>
    </div>
);

export default ReviewsSection;
