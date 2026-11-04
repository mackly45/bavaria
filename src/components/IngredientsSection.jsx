import Reveal from './Reveal';
import { flavors, BASE_INGREDIENTS } from '../data/flavors';
import { useI18n } from '../i18n/I18nProvider';
import { motion, useScroll, useTransform } from 'framer-motion';

const IngredientsSection = ({ flavor = 'orange' }) => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -100]); // Gentle parallax


    const { t, lang } = useI18n();
    const currentData = flavors[flavor];
    const name = currentData.title[lang];
    const ingredients = [...BASE_INGREDIENTS[lang], currentData.fruit[lang]];

    return (
        <section id="ingredients" className="section" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="container">
                <div className="grid" style={{ alignItems: 'center' }}>
                    <div className="col-6 col-md-12 text-center-mobile" style={{ order: 2 }}>
                        <motion.div style={{ y, display: 'flex', justifyContent: 'center' }}>
                            {/* Animated Flavor Image */}
                            <motion.video
                                key={flavor}
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="metadata"
                                poster={currentData.ingredientsVideo.poster}
                                aria-label={t('ingredients.visualAlt', { name })}
                                className="blend-video"
                                style={{
                                    maxWidth: '90%',
                                    height: 'auto',
                                    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
                                }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                <source src={currentData.ingredientsVideo.mp4} type="video/mp4" />
                            </motion.video>
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
                                {t('ingredients.eyebrow')}
                            </p>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <h2 style={{ marginBottom: '2rem' }}>{t('ingredients.title')}</h2>
                        </Reveal>
                        <Reveal delay={0.4}>
                            <p className="margin-inline-auto-mobile" style={{
                                opacity: 0.8,
                                maxWidth: '500px',
                                lineHeight: 1.6,
                                fontSize: 'var(--fs-body)'
                            }}>
                                {t('ingredients.text')}
                            </p>
                            <h3 className="ingredients-list-title">{t('ingredients.listTitle', { name })}</h3>
                            <ul className="ingredients-list" style={{ '--flavor': currentData.color }}>
                                {ingredients.map((item) => <li key={item}>{item}</li>)}
                            </ul>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IngredientsSection;
