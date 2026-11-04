import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Reveal from './Reveal';
import { flavors } from '../data/flavors';

const ProductSection = ({ flavor = 'orange' }) => {
    const cardRef = useRef(null);


    const currentProduct = flavors[flavor];

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;

        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <section id="product" className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <div className="container">
                <div className="grid" style={{ alignItems: 'center' }}>
                    <div className="col-6 col-md-12 text-center-mobile">
                        <Reveal>
                            <p style={{
                                color: currentProduct.color,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                marginBottom: '1rem',
                                fontWeight: 600
                            }}>
                                L’Expérience
                            </p>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <h2 style={{ marginBottom: '1.5rem' }}>
                                {currentProduct.title} <br />
                                <span style={{ color: currentProduct.color }}>{currentProduct.subtitle}</span>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.4}>
                            <p className="margin-inline-auto-mobile" style={{ opacity: 0.8, marginBottom: '2rem', maxWidth: '500px' }}>
                                {currentProduct.description}
                            </p>
                            <ul style={{
                                color: 'var(--color-text-secondary)',
                                listStyle: 'none',
                                display: 'inline-block',
                                textAlign: 'left'
                            }}>
                                <li style={{ marginBottom: '0.5rem' }}>• 0,0 % d’alcool</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Ingrédients naturels</li>
                                <li>• Faible en calories</li>
                            </ul>
                            <div style={{ marginTop: '2.5rem' }}>
                                <a href="#shop" className="btn btn-primary" style={{ backgroundColor: currentProduct.color, borderColor: currentProduct.color }}>Acheter maintenant</a>
                            </div>
                        </Reveal>
                    </div>

                    <div className="col-6 col-md-12" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {/* 3D Interactive Card Container */}
                        <div
                            ref={cardRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                width: '100%',
                                height: 'clamp(300px, 50vh, 500px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                perspective: '1000px',
                                cursor: 'grab'
                            }}
                        >
                            <motion.div
                                style={{
                                    rotateX: rotateX,
                                    rotateY: rotateY,
                                    transformStyle: 'preserve-3d',
                                    position: 'relative'
                                }}
                                // Floating Animation
                                animate={{ y: [0, -15, 0] }}
                                transition={{
                                    y: {
                                        duration: 4,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        ease: "easeInOut"
                                    }
                                }}
                            >
                                {/* The Can */}
                                <motion.img
                                    key={flavor} // Force re-render on switch for clean transition
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    src={currentProduct.canImg}
                                    alt={`Canette Bavaria ${currentProduct.title}`}
                                    loading="lazy"
                                    style={{
                                        height: 'clamp(250px, 40vh, 450px)',
                                        width: 'auto',
                                        objectFit: 'contain',
                                        filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.6))', // Strong shadow for depth
                                        transform: 'translateZ(50px)' // Pushed forward slightly
                                    }}
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductSection;
