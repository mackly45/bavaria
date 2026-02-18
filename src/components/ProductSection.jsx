import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Reveal from './Reveal';

const ProductSection = ({ flavor = 'orange' }) => {
    const cardRef = useRef(null);

    const products = {
        orange: {
            title: "Orange",
            subtitle: "de Bavaria",
            description: "Une intensité d'orange éclatante. Fraîcheur pure. Caractère affirmé.",
            color: "var(--color-accent)",
            image: "https://tsnyhcvvkcmsrdgcbqzl.supabase.co/storage/v1/object/sign/web/Suppression%20AI_image%20(14).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZDM3ODgyZi1mYTk5LTQyOTMtOGE4Yy1hMGMzNmU1ZjIyOGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIvU3VwcHJlc3Npb24gQUlfaW1hZ2UgKDE0KS5wbmciLCJpYXQiOjE3NzEzNjg4NDcsImV4cCI6MTkyOTA0ODg0N30.2xD32gqThyTJV-52mX_P511FiqEompd35p8JPBKs7mU"
        },
        apple: {
            title: "Pomme",
            subtitle: "de Bavaria",
            description: "Une explosion de pomme verte. Vivacité naturelle. Goût authentique.",
            color: "#7cbd1e",
            image: "https://tsnyhcvvkcmsrdgcbqzl.supabase.co/storage/v1/object/sign/web/Suppression%20AI_image%20(16).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZDM3ODgyZi1mYTk5LTQyOTMtOGE4Yy1hMGMzNmU1ZjIyOGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIvU3VwcHJlc3Npb24gQUlfaW1hZ2UgKDE2KS5wbmciLCJpYXQiOjE3NzEzNzc5MDMsImV4cCI6MjAyMzY2NTkwM30._5Q0Bx0FzlMsBB4kALuG5rAkD7cD0qJnbdU7D_zfaYo"
        },
        strawberry: {
            title: "Fraise",
            subtitle: "de Bavaria",
            description: "La douceur irrésistible de la fraise. Fruitée, sucrée, inoubliable.",
            color: "#ff3d5a",
            image: "https://tsnyhcvvkcmsrdgcbqzl.supabase.co/storage/v1/object/sign/web/fraise.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZDM3ODgyZi1mYTk5LTQyOTMtOGE4Yy1hMGMzNmU1ZjIyOGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIvZnJhaXNlLnBuZyIsImlhdCI6MTc3MTM4NjAwNywiZXhwIjoyMDIzNjc0MDA3fQ.iB1Pd2vz2VP8if92D3koDsStnHiabCkNIGCo8LwLid0"
        },
        pineapple: {
            title: "Ananas",
            subtitle: "de Bavaria",
            description: "Une évasion tropicale instantanée. Intense, ensoleillé, rafraîchissant.",
            color: "#ffcc00",
            image: "https://tsnyhcvvkcmsrdgcbqzl.supabase.co/storage/v1/object/sign/web/anan.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZDM3ODgyZi1mYTk5LTQyOTMtOGE4Yy1hMGMzNmU1ZjIyOGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIvYW5hbi5wbmciLCJpYXQiOjE3NzE0MDQ0NDEsImV4cCI6MjAyMzY5MjQ0MX0.VxEFmZfiOrmzIX9XknxSx4YoOARqWjys7Npzlkg7b6s"
        },
        wheat: {
            title: "Blé",
            subtitle: "de Bavaria",
            description: "L'essence même de nos champs. Doux, authentique, naturellement riche.",
            color: "#d4a373",
            image: "https://tsnyhcvvkcmsrdgcbqzl.supabase.co/storage/v1/object/sign/web%20plus/blefa.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZDM3ODgyZi1mYTk5LTQyOTMtOGE4Yy1hMGMzNmU1ZjIyOGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIgcGx1cy9ibGVmYS5wbmciLCJpYXQiOjE3NzE0MTM2MDUsImV4cCI6MjAyMzcwMTYwNX0.7h6Ml8K-jcRQwaonphzNcUkwQ3sksUG8LvaxKRlA9E4"
        }
    };

    const currentProduct = products[flavor];

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
                                L'Expérience
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
                                <li style={{ marginBottom: '0.5rem' }}>• 0.0% Alcohol</li>
                                <li style={{ marginBottom: '0.5rem' }}>• Natural Ingredients</li>
                                <li>• Low Calorie</li>
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
                                    src={currentProduct.image}
                                    alt={`Bavaria ${flavor} Can 3D`}
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
