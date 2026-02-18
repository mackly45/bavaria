import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

const Hero = ({ flavor, setFlavor }) => {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();
    // const [flavor, setFlavor] = useState('orange'); // Moved to App.jsx

    // Flavor Data
    const flavors = {
        orange: {
            title: "Orange",
            subtitle: "de Bavaria",
            description: "Une intensité d'orange éclatante. Fraîcheur pur. Caractère affirmé.",
            color: "var(--color-accent)",
            staticImg: "https://tsnyhcvvkcmsrdgcbqzl.supabase.co/storage/v1/object/sign/web/Suppression%20AI_image%20(14).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZDM3ODgyZi1mYTk5LTQyOTMtOGE4Yy1hMGMzNmU1ZjIyOGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIvU3VwcHJlc3Npb24gQUlfaW1hZ2UgKDE0KS5wbmciLCJpYXQiOjE3NzEzNjg4NDcsImV4cCI6MTkyOTA0ODg0N30.2xD32gqThyTJV-52mX_P511FiqEompd35p8JPBKs7mU",
            animImg: "https://tsnyhcvvkcmsrdgcbqzl.supabase.co/storage/v1/object/sign/web/beb9d821-bba8-43c0-bb28-61d8e9fef4c9-27fb641c-a117-4da4-86de-c877e6c150ad-ezgif.com-video-to-webp-converter.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZDM3ODgyZi1mYTk5LTQyOTMtOGE4Yy1hMGMzNmU1ZjIyOGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIvYmViOWQ4MjEtYmJhOC00M2MwLWJiMjgtNjFkOGU5ZmVmNGM5LTI3ZmI2NDFjLWExMTctNGRhNC04NmRlLWM4NzdlNmMxNTBhZC1lemdpZi5jb20tdmlkZW8tdG8td2VicC1jb252ZXJ0ZXIud2VicCIsImlhdCI6MTc3MTM2ODg3OSwiZXhwIjoxOTI5MDQ4ODc5fQ.wp0fCDBL0bJztXJ7utjE_dEHfUW9HJgYh-BRxWCK-Mk"
        },
        apple: {
            title: "Pomme",
            subtitle: "de Bavaria",
            description: "Une explosion de pomme verte. Vivacité naturelle. Goût authentique.",
            color: "#7cbd1e", // Apple Green
            staticImg: "https://tsnyhcvvkcmsrdgcbqzl.supabase.co/storage/v1/object/sign/web/Suppression%20AI_image%20(16).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZDM3ODgyZi1mYTk5LTQyOTMtOGE4Yy1hMGMzNmU1ZjIyOGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIvU3VwcHJlc3Npb24gQUlfaW1hZ2UgKDE2KS5wbmciLCJpYXQiOjE3NzEzNzc3MDcsImV4cCI6MjAyMzY2NTcwN30.iNol04U1o5ZrdbUtfPWKGfoK0SDKBkqHRM_2Kh0y8CE",
            animImg: "https://tsnyhcvvkcmsrdgcbqzl.supabase.co/storage/v1/object/sign/web/97b88ed2-d759-4c28-ae0f-5e0c29a35c01-e8126a31-4d7e-4661-a392-add15836f97e-ezgif.com-video-to-webp-converter.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZDM3ODgyZi1mYTk5LTQyOTMtOGE4Yy1hMGMzNmU1ZjIyOGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIvOTdiODhlZDItZDc1OS00YzI4LWFlMGYtNWUwYzI5YTM1YzAxLWU4MTI2YTMxLTRkN2UtNDY2MS1hMzkyLWFkZDE1ODM2Zjk3ZS1lemdpZi5jb20tdmlkZW8tdG8td2VicC1jb252ZXJ0ZXIud2VicCIsImlhdCI6MTc3MTM3OTU1MCwiZXhwIjoyMDIzNjY3NTUwfQ.W5hluU6Ao16ZzSVl743cT9XlHHCQXaBQe-w-UsAw9mk"
        },
        strawberry: {
            title: "Fraise",
            subtitle: "de Bavaria",
            description: "La douceur irrésistible de la fraise. Fruitée, sucrée, inoubliable.",
            color: "#ff3d5a",
            staticImg: "https://tsnyhcvvkcmsrdgcbqzl.supabase.co/storage/v1/object/sign/web/fraise.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZDM3ODgyZi1mYTk5LTQyOTMtOGE4Yy1hMGMzNmU1ZjIyOGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIvZnJhaXNlLnBuZyIsImlhdCI6MTc3MTM4NjAwNywiZXhwIjoyMDIzNjc0MDA3fQ.iB1Pd2vz2VP8if92D3koDsStnHiabCkNIGCo8LwLid0",
            animImg: "https://tsnyhcvvkcmsrdgcbqzl.supabase.co/storage/v1/object/sign/web/fraiseweb.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZDM3ODgyZi1mYTk5LTQyOTMtOGE4Yy1hMGMzNmU1ZjIyOGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIvZnJhaXNld2ViLndlYnAiLCJpYXQiOjE3NzEzODYyMDEsImV4cCI6MjAyMzY3NDIwMX0.9YgwxZEgAdn_OJj8kYjT-ZGWiF9hmG02-PxfSaVhgnE"
        },
        pineapple: {
            title: "Ananas",
            subtitle: "de Bavaria",
            description: "Une évasion tropicale instantanée. Intense, ensoleillé, rafraîchissant.",
            color: "#ffcc00",
            staticImg: "https://tsnyhcvvkcmsrdgcbqzl.supabase.co/storage/v1/object/sign/web/anan.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZDM3ODgyZi1mYTk5LTQyOTMtOGE4Yy1hMGMzNmU1ZjIyOGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIvYW5hbi5wbmciLCJpYXQiOjE3NzE0MDQ0NDEsImV4cCI6MjAyMzY5MjQ0MX0.VxEFmZfiOrmzIX9XknxSx4YoOARqWjys7Npzlkg7b6s",
            animImg: "https://tsnyhcvvkcmsrdgcbqzl.supabase.co/storage/v1/object/sign/web/blebleble.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZDM3ODgyZi1mYTk5LTQyOTMtOGE4Yy1hMGMzNmU1ZjIyOGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIvYmxlYmxlYmxlLndlYnAiLCJpYXQiOjE3NzE0MDQ3NTcsImV4cCI6MjAyMzY5Mjc1N30.33XwA89nJhMfsJkMAqdX0jYxCGqvSH11NIOwH0SrYqc"
        },
        wheat: {
            title: "Blé",
            subtitle: "de Bavaria",
            description: "L'essence même de nos champs. Doux, authentique, naturellement riche.",
            color: "#d4a373", // Wheat Gold
            staticImg: "https://tsnyhcvvkcmsrdgcbqzl.supabase.co/storage/v1/object/sign/web%20plus/blefa.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZDM3ODgyZi1mYTk5LTQyOTMtOGE4Yy1hMGMzNmU1ZjIyOGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIgcGx1cy9ibGVmYS5wbmciLCJpYXQiOjE3NzE0MTM2MDUsImV4cCI6MjAyMzcwMTYwNX0.7h6Ml8K-jcRQwaonphzNcUkwQ3sksUG8LvaxKRlA9E4",
            animImg: "https://tsnyhcvvkcmsrdgcbqzl.supabase.co/storage/v1/object/sign/web/anananana-ezgif.com-video-to-webp-converter.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZDM3ODgyZi1mYTk5LTQyOTMtOGE4Yy1hMGMzNmU1ZjIyOGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIvYW5hbmFuYW5hLWV6Z2lmLmNvbS12aWRlby10by13ZWJwLWNvbnZlcnRlci53ZWJwIiwiaWF0IjoxNzcxNDEzNjYyLCJleHAiOjIwMjM3MDE2NjJ9.LriCkhJeK8vfBcB7yFKjhTGISyFHI4PUuIDhNPJdSy8"
        }
    };

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
                    src={currentFlavor.staticImg}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                        opacity: showAnim ? 0 : 1,
                        scale: 1
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    alt="Bavaria Static"
                    style={{
                        position: 'absolute', // Maintain absolute to stack images
                        height: '80vh',
                        width: 'auto',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.5))',
                        willChange: 'transform, opacity' // Optimization
                    }}
                />

                {/* Animated WebP */}
                <motion.img
                    key={`anim-${flavor}`}
                    src={currentFlavor.animImg}
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
                            fontSize: '1.5rem',
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
                        style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', opacity, y: y1 }}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.7 }}
                    >
                        <motion.p
                            key={`desc-${flavor}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{
                                fontSize: '1.25rem',
                                maxWidth: '400px',
                                marginBottom: '2rem',
                                lineHeight: 1.6,
                                fontWeight: 300
                            }}
                        >
                            {currentFlavor.description}
                        </motion.p>

                        <div style={{ display: 'flex', gap: '1rem', pointerEvents: 'auto', marginBottom: '2rem' }}>
                            <a href="#product" className="btn btn-secondary">Découvrir</a>
                            <a href="#shop" className="btn btn-primary" style={{
                                backgroundColor: currentFlavor.color,
                                borderColor: currentFlavor.color,
                                color: '#fff'
                            }}>Acheter</a>
                        </div>

                        {/* Flavor Switcher Controls */}
                        <div style={{ display: 'flex', gap: '10px', pointerEvents: 'auto' }}>
                            <button
                                onClick={() => setFlavor('orange')}
                                style={{
                                    width: '30px', height: '30px', borderRadius: '50%',
                                    background: 'var(--color-accent)',
                                    border: flavor === 'orange' ? '2px solid white' : 'none',
                                    cursor: 'pointer',
                                    scale: flavor === 'orange' ? 1.2 : 1,
                                    transition: 'all 0.3s ease'
                                }}
                                aria-label="Switch to Orange Flavor"
                            />
                            <button
                                onClick={() => setFlavor('apple')}
                                style={{
                                    width: '30px', height: '30px', borderRadius: '50%',
                                    background: '#7cbd1e',
                                    border: flavor === 'apple' ? '2px solid white' : 'none',
                                    cursor: 'pointer',
                                    scale: flavor === 'apple' ? 1.2 : 1,
                                    transition: 'all 0.3s ease'
                                }}
                                aria-label="Switch to Apple Flavor"
                            />
                            <button
                                onClick={() => setFlavor('strawberry')}
                                style={{
                                    width: '30px', height: '30px', borderRadius: '50%',
                                    background: '#ff3d5a',
                                    border: flavor === 'strawberry' ? '2px solid white' : 'none',
                                    cursor: 'pointer',
                                    scale: flavor === 'strawberry' ? 1.2 : 1,
                                    transition: 'all 0.3s ease'
                                }}
                                aria-label="Switch to Strawberry Flavor"
                            />
                            <button
                                onClick={() => setFlavor('pineapple')}
                                style={{
                                    width: '30px', height: '30px', borderRadius: '50%',
                                    background: '#ffcc00',
                                    border: flavor === 'pineapple' ? '2px solid white' : 'none',
                                    cursor: 'pointer',
                                    scale: flavor === 'pineapple' ? 1.2 : 1,
                                    transition: 'all 0.3s ease'
                                }}
                                aria-label="Switch to Pineapple Flavor"
                            />
                            <button
                                onClick={() => setFlavor('wheat')}
                                style={{
                                    width: '30px', height: '30px', borderRadius: '50%',
                                    background: '#d4a373',
                                    border: flavor === 'wheat' ? '2px solid white' : 'none',
                                    cursor: 'pointer',
                                    scale: flavor === 'wheat' ? 1.2 : 1,
                                    transition: 'all 0.3s ease'
                                }}
                                aria-label="Switch to Wheat Flavor"
                            />
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
