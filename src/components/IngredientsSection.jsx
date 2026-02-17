import React from 'react';
import Reveal from './Reveal';
import { motion, useScroll, useTransform } from 'framer-motion';

const IngredientsSection = () => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -100]); // Gentle parallax

    return (
        <section id="ingredients" className="section" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px', alignItems: 'center' }}>
                    <div style={{ gridColumn: 'span 6', order: 2 }} className="col-12-mobile">
                        <motion.div style={{ y }}>
                            <div style={{
                                width: '100%',
                                height: '400px',
                                background: 'rgba(255,107,0,0.1)',
                                borderRadius: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid rgba(255,107,0,0.2)'
                            }}>
                                <span style={{ opacity: 0.5, color: 'var(--color-accent)' }}>Floating Orange Slices</span>
                            </div>
                        </motion.div>
                    </div>

                    <div style={{ gridColumn: 'span 6', paddingRight: '2rem', order: 1 }} className="col-12-mobile">
                        <Reveal>
                            <p style={{
                                color: 'var(--color-accent)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                marginBottom: '1rem'
                            }}>
                                Pure & Simple
                            </p>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Nature's Best</h2>
                        </Reveal>
                        <Reveal delay={0.4}>
                            <p style={{ opacity: 0.8, maxWidth: '500px' }}>
                                We believe in transparency. No artificial colors, no preservatives. Just the
                                goodness of barley malt, hops, and natural fruit extracts.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </div>
            <style>{`
                @media (max-width: 768px) {
                    .col-12-mobile { grid-column: span 12 !important; order: initial !important; }
                }
            `}</style>
        </section>
    );
};

export default IngredientsSection;
