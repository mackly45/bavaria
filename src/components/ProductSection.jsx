import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Reveal from './Reveal';

const ProductSection = () => {
    const cardRef = useRef(null);

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
                        {/* 3D Interactive Card Container */}
                        <div
                            ref={cardRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                width: '100%',
                                height: '500px', // Increased height for the can
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
                                    src="https://tsnyhcvvkcmsrdgcbqzl.supabase.co/storage/v1/object/sign/web/Suppression%20AI_image%20(14).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZDM3ODgyZi1mYTk5LTQyOTMtOGE4Yy1hMGMzNmU1ZjIyOGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIvU3VwcHJlc3Npb24gQUlfaW1hZ2UgKDE0KS5wbmciLCJpYXQiOjE3NzEzNjg4NDcsImV4cCI6MTkyOTA0ODg0N30.2xD32gqThyTJV-52mX_P511FiqEompd35p8JPBKs7mU"
                                    alt="Bavaria Can 3D"
                                    style={{
                                        height: '450px',
                                        width: 'auto',
                                        objectFit: 'contain',
                                        filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.6))', // Strong shadow for depth
                                        transform: 'translateZ(50px)' // Pushed forward slightly
                                    }}
                                />
                                {/* Optional: Back glow/shadow element could go here if needed */}
                            </motion.div>
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
