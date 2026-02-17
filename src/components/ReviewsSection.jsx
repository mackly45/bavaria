import React from 'react';
import Reveal from './Reveal';

const ReviewsSection = () => {
    return (
        <section id="reviews" className="section" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="container">
                <Reveal width="100%">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <p style={{ color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Community</p>
                        <h2 style={{ fontSize: '3rem' }}>What People Say</h2>
                    </div>
                </Reveal>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem' }}>
                    <div style={{ gridColumn: 'span 6' }} className="col-12-mobile">
                        <Reveal delay={0.2}>
                            <ReviewCard
                                quote="Absolutely refreshing! The malt gives it a depth that soda just doesn't have, and the orange is perfectly balanced."
                                author="Sarah M."
                            />
                        </Reveal>
                    </div>
                    <div style={{ gridColumn: 'span 6' }} className="col-12-mobile">
                        <Reveal delay={0.4}>
                            <ReviewCard
                                quote="My go-to drink after a workout. Hydrating without being overly sweet. Love the new design too!"
                                author="David K."
                            />
                        </Reveal>
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
