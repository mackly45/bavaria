import Reveal from './Reveal';
import { flavors } from '../data/flavors';
import { motion, useScroll, useTransform } from 'framer-motion';

const IngredientsSection = ({ flavor = 'orange' }) => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -100]); // Gentle parallax


    const currentData = flavors[flavor];

    return (
        <section id="ingredients" className="section" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="container">
                <div className="grid" style={{ alignItems: 'center' }}>
                    <div className="col-6 col-md-12 text-center-mobile" style={{ order: 2 }}>
                        <motion.div style={{ y, display: 'flex', justifyContent: 'center' }}>
                            {/* Animated Flavor Image */}
                            <motion.img
                                key={flavor}
                                src={currentData.ingredientsImg}
                                alt={`Ingrédients de la saveur ${currentData.title}`}
                                loading="lazy"
                                style={{
                                    maxWidth: '90%',
                                    height: 'auto',
                                    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
                                }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                            />
                        </motion.div>
                    </div>

                    <div className="col-6 col-md-12 text-center-mobile" style={{ order: 1 }}>
                        <Reveal>
                            <p style={{
                                color: currentData.color,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                marginBottom: '1rem',
                                fontWeight: 600
                            }}>
                                Pure et simple
                            </p>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <h2 style={{ marginBottom: '2rem' }}>Le meilleur de la nature</h2>
                        </Reveal>
                        <Reveal delay={0.4}>
                            <p className="margin-inline-auto-mobile" style={{
                                opacity: 0.8,
                                maxWidth: '500px',
                                lineHeight: 1.6,
                                fontSize: 'var(--fs-body)'
                            }}>
                                Nous croyons en la transparence. Sans colorants artificiels, sans conservateurs.
                                Juste la qualité du malt d’orge, du houblon et des extraits naturels de fruits.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IngredientsSection;
