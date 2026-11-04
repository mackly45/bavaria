import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { flavors } from '../data/flavors';

const Hero = ({ flavor, setFlavor }) => {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();


    const currentFlavor = flavors[flavor];

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
            {/* Background Atmosphere - Fixed Dark */}
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                background: 'radial-gradient(circle at center, rgba(30,30,30,0.4) 0%, rgba(0,0,0,1) 90%)',
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
                    key={`static-${flavor}`} // Force re-render on change
                    src={currentFlavor.canImg}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                        opacity: showAnim ? 0 : 1,
                        scale: 1
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    alt={`Canette Bavaria ${currentFlavor.title}`}
                    loading="eager"
                    fetchpriority="high"
                    style={{
                        position: 'absolute', // Maintain absolute to stack images
                        height: 'auto',
                        width: 'auto',
                        maxHeight: '70vh',
                        maxWidth: '80%',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.5))',
                        willChange: 'transform, opacity' // Optimization
                    }}
                />

                {/* Animated WebP */}
                <motion.img
                    key={`anim-${flavor}`}
                    src={currentFlavor.heroAnimImg}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    style={{
                        position: 'absolute', // Maintain absolute to stack images
                        height: 'auto',
                        width: 'auto',
                        maxHeight: '70vh',
                        maxWidth: '80%',
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
                <div className="grid" style={{ width: '100%', alignItems: 'center' }}>
                    {/* Left Column: Title & Subtitle */}
                    <motion.div
                        className="col-6 col-sm-12 text-center-mobile"
                        style={{ textAlign: 'left', opacity, y: y1 }}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <h1 style={{
                            textTransform: 'uppercase',
                            marginBottom: '1rem'
                        }}>
                            <motion.span
                                key={`title-${flavor}`}
                                initial={{ color: '#fff' }}
                                animate={{ color: currentFlavor.color }}
                                transition={{ duration: 0.5 }}
                            >
                                {currentFlavor.title}
                            </motion.span> <br />
                            <motion.span
                                key={flavor}
                                initial={{ color: '#fff' }}
                                animate={{ color: currentFlavor.color }}
                                transition={{ duration: 0.5 }}
                            >
                                {currentFlavor.subtitle}
                            </motion.span>
                        </h1>
                        <p style={{
                            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                            opacity: 0.9,
                            fontWeight: 600,
                            color: currentFlavor.color // Dynamic color
                        }}>
                            Boisson pétillante
                        </p>
                    </motion.div>

                    {/* Right Column: Description & Buttons */}
                    <motion.div
                        className="col-6 col-sm-12 text-center-mobile"
                        style={{
                            textAlign: 'right',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            opacity,
                            y: y1
                        }}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.7 }}
                    >
                        {/* Wrapper for mobile center alignment */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'inherit' }}>
                            <motion.p
                                key={`desc-${flavor}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="margin-inline-auto-mobile"
                                style={{
                                    maxWidth: '400px',
                                    marginBottom: '2rem',
                                    lineHeight: 1.6,
                                    fontWeight: 300,
                                    fontSize: 'var(--fs-body)'
                                }}
                            >
                                {currentFlavor.description}
                            </motion.p>

                            <div style={{ display: 'flex', gap: '1rem', pointerEvents: 'auto', marginBottom: '2.5rem', justifyContent: 'inherit' }}>
                                <a href="#product" className="btn btn-secondary">Découvrir</a>
                                <a href="#shop" className="btn btn-primary" style={{
                                    backgroundColor: currentFlavor.color,
                                    borderColor: currentFlavor.color,
                                    color: '#fff'
                                }}>Acheter</a>
                            </div>

                            {/* Flavor Switcher Controls */}
                            <div style={{
                                display: 'flex',
                                gap: '12px',
                                pointerEvents: 'auto',
                                background: 'rgba(255,255,255,0.05)',
                                padding: '10px 20px',
                                borderRadius: '100px',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                {Object.keys(flavors).map((key) => (
                                    <button
                                        key={key}
                                        onClick={() => setFlavor(key)}
                                        style={{
                                            width: '28px',
                                            height: '28px',
                                            borderRadius: '50%',
                                            background: flavors[key].color,
                                            border: flavor === key ? '2px solid #fff' : '2px solid transparent',
                                            boxShadow: flavor === key ? `0 0 15px ${flavors[key].color}` : 'none',
                                            cursor: 'pointer',
                                            scale: flavor === key ? 1.2 : 1,
                                            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                        }}
                                        aria-label={`Saveur ${flavors[key].title}`}
                                        aria-pressed={flavor === key}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
