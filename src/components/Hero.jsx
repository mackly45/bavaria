import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

const Hero = () => {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();

    // Mouse Parallax Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth mouse movement
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        const rect = containerRef.current.getBoundingClientRect();
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

    // Parallax & Scale Logic
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    // Start slightly larger to fill space better, then grow
    const scale = useTransform(scrollY, [0, 500], [1.1, 1.4]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]); // Content fade out

    // Image Swap Logic: 
    // Static hidden when scroll > 50, Anim shown when scroll > 50
    const [showAnim, setShowAnim] = useState(false);

    useEffect(() => {
        const unsubscribe = scrollY.on("change", (latest) => {
            setShowAnim(latest > 50);
        });
        return () => unsubscribe();
    }, [scrollY]);

    return (
        <section
            id="home"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                height: '100vh',
                width: '100%',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                perspective: '1200px' // Essential for 3D
            }}
        >
            {/* Background Gradient/Atmosphere */}
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: 'radial-gradient(circle at center, rgba(60,20,0,0.4) 0%, rgba(0,0,0,1) 90%)',
                zIndex: 0,
                pointerEvents: 'none'
            }}></div>

            {/* 3D Container for Image */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                    pointerEvents: 'none',
                    rotateX: rotateX,
                    rotateY: rotateY,
                    scale: scale,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* Static Image */}
                <motion.img
                    src="https://tsnyhcvvkcmsrdgcbqzl.supabase.co/storage/v1/object/sign/web/Suppression%20AI_image%20(14).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZDM3ODgyZi1mYTk5LTQyOTMtOGE4Yy1hMGMzNmU1ZjIyOGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIvU3VwcHJlc3Npb24gQUlfaW1hZ2UgKDE0KS5wbmciLCJpYXQiOjE3NzEzNjg4NDcsImV4cCI6MTkyOTA0ODg0N30.2xD32gqThyTJV-52mX_P511FiqEompd35p8JPBKs7mU"
                    alt="Bavaria Static"
                    style={{
                        position: 'absolute', // Maintain absolute to stack images
                        height: '80vh',
                        width: 'auto',
                        objectFit: 'contain',
                        opacity: showAnim ? 0 : 1,
                        transition: 'opacity 0.8s ease-in-out',
                        filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.5))',
                        willChange: 'transform, opacity' // Optimization
                    }}
                />

                {/* Animated WebP */}
                <motion.img
                    src="https://tsnyhcvvkcmsrdgcbqzl.supabase.co/storage/v1/object/sign/web/beb9d821-bba8-43c0-bb28-61d8e9fef4c9-27fb641c-a117-4da4-86de-c877e6c150ad-ezgif.com-video-to-webp-converter.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZDM3ODgyZi1mYTk5LTQyOTMtOGE4Yy1hMGMzNmU1ZjIyOGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIvYmViOWQ4MjEtYmJhOC00M2MwLWJiMjgtNjFkOGU5ZmVmNGM5LTI3ZmI2NDFjLWExMTctNGRhNC04NmRlLWM4NzdlNmMxNTBhZC1lemdpZi5jb20tdmlkZW8tdG8td2VicC1jb252ZXJ0ZXIud2VicCIsImlhdCI6MTc3MTM2ODg3OSwiZXhwIjoxOTI5MDQ4ODc5fQ.wp0fCDBL0bJztXJ7utjE_dEHfUW9HJgYh-BRxWCK-Mk"
                    alt="Bavaria Animated"
                    style={{
                        position: 'absolute', // Maintain absolute to stack images
                        height: '80vh',
                        width: 'auto',
                        objectFit: 'contain',
                        opacity: showAnim ? 1 : 0,
                        transition: 'opacity 0.8s ease-in-out',
                        filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.5))',
                        willChange: 'transform, opacity'
                    }}
                />
            </motion.div>

            {/* Content Layers */}
            <div className="container" style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', alignItems: 'center' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 'min(30vw, 500px)', // Gap to push text away from center can
                    width: '100%',
                    alignItems: 'center',
                    pointerEvents: 'none' // Let mouse pass through to container for tilt
                }}>
                    {/* Left Column: Title & Subtitle */}
                    <motion.div
                        style={{ textAlign: 'left', opacity, y: y1 }}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <h1 style={{
                            fontSize: 'clamp(3rem, 6vw, 5rem)',
                            fontWeight: 700,
                            lineHeight: 1.1,
                            marginBottom: '0.5rem',
                            textTransform: 'uppercase'
                        }}>
                            Orange <br />
                            <span style={{ color: 'var(--color-primary)' }}>de Bavière</span>
                        </h1>
                        <p style={{
                            fontSize: '1.5rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                            opacity: 0.9,
                            fontWeight: 300
                        }}>
                            Boisson pétillante
                        </p>
                    </motion.div>

                    {/* Right Column: Description & Buttons */}
                    <motion.div
                        style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', opacity, y: y1 }}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.7 }}
                    >
                        <p style={{
                            fontSize: '1.25rem',
                            maxWidth: '400px',
                            marginBottom: '2rem',
                            lineHeight: 1.6,
                            fontWeight: 300
                        }}>
                            Une intensité d'orange éclatante. Fraîcheur pur. Caractère affirmé.
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', pointerEvents: 'auto' }}>
                            <a href="#product" className="btn btn-secondary">Découvrir</a>
                            <a href="#shop" className="btn btn-primary">Acheter</a>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Mobile Responsive Adjustment Styles */}
            <style>{`
                @media (max-width: 768px) {
                    .container > div {
                        grid-template-columns: 1fr !important;
                        text-align: center !important;
                        gap: 4rem !important;
                    }
                    .container > div > div {
                        text-align: center !important;
                        align-items: center !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Hero;
