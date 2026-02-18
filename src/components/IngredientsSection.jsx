import React from 'react';
import Reveal from './Reveal';
import { motion, useScroll, useTransform } from 'framer-motion';

const IngredientsSection = ({ flavor = 'orange' }) => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -100]); // Gentle parallax

    const ingredientsData = {
        orange: {
            staticImg: "https://tsnyhcvvkcmsrdgcbqzl.supabase.co/storage/v1/object/sign/web/tranche%20d'orange.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZDM3ODgyZi1mYTk5LTQyOTMtOGE4Yy1hMGMzNmU1ZjIyOGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIvdHJhbmNoZSBkJ29yYW5nZS5wbmciLCJpYXQiOjE3NzEzODE4MzUsImV4cCI6MjAyMzY2OTgzNX0.CWCXDG7QO0WQqN9pcWG9A0oT3CQKCTKj88nHYAWPxBA",
            animImg: "https://tsnyhcvvkcmsrdgcbqzl.supabase.co/storage/v1/object/sign/web/orange-ezgif.com-video-to-webp-converter.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZDM3ODgyZi1mYTk5LTQyOTMtOGE4Yy1hMGMzNmU1ZjIyOGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIvb3JhbmdlLWV6Z2lmLmNvbS12aWRlby10by13ZWJwLWNvbnZlcnRlci53ZWJwIiwiaWF0IjoxNzcxMzgyMDc2LCJleHAiOjIwMjM2NzAwNzZ9.81KfP0ImV0iU2C6iy1RHntJW-Auuk20Cxi2Bq4wsgFs",
            accent: "var(--color-accent)"
        },
        apple: {
            staticImg: "https://tsnyhcvvkcmsrdgcbqzl.supabase.co/storage/v1/object/sign/web/tranche%20de%20pomme.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZDM3ODgyZi1mYTk5LTQyOTMtOGE4Yy1hMGMzNmU1ZjIyOGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIvdHJhbmNoZSBkZSBwb21tZS5wbmciLCJpYXQiOjE3NzEzODIxOTIsImV4cCI6MjAyMzY3MDE5Mn0.35-OjeaxqW04W3SThdvagt5sSkCdmRIWfRI_plhrj1o",
            animImg: "https://tsnyhcvvkcmsrdgcbqzl.supabase.co/storage/v1/object/sign/web/754c502c-984c-471e-ac8b-fc5678802b91-db3cc489-ad19-4fc0-83f3-8d40fc436d24-ezgif.com-video-to-webp-converter.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZDM3ODgyZi1mYTk5LTQyOTMtOGE4Yy1hMGMzNmU1ZjIyOGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIvNzU0YzUwMmMtOTg0Yy00NzFlLWFjOGItZmM1Njc4ODAyYjkxLWRiM2NjNDg5LWFkMTktNGZjMC04M2YzLThkNDBmYzQzNmQyNC1lemdpZi5jb20tdmlkZW8tdG8td2VicC1jb252ZXJ0ZXIud2VicCIsImlhdCI6MTc3MTM4MjM0NSwiZXhwIjoyMDIzNjcwMzQ1fQ.G82-DXwW-WfCq5FhTo1mF7YOwVpiJBEA4_A_eCSQ2tA",
            accent: "#7cbd1e"
        },
        strawberry: {
            staticImg: "https://tsnyhcvvkcmsrdgcbqzl.supabase.co/storage/v1/object/sign/web/fraise.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZDM3ODgyZi1mYTk5LTQyOTMtOGE4Yy1hMGMzNmU1ZjIyOGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIvZnJhaXNlLnBuZyIsImlhdCI6MTc3MTM4NjAwNywiZXhwIjoyMDIzNjc0MDA3fQ.iB1Pd2vz2VP8if92D3koDsStnHiabCkNIGCo8LwLid0",
            animImg: "https://tsnyhcvvkcmsrdgcbqzl.supabase.co/storage/v1/object/sign/web/fray.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZDM3ODgyZi1mYTk5LTQyOTMtOGE4Yy1hMGMzNmU1ZjIyOGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIvZnJheS53ZWJwIiwiaWF0IjoxNzcxNDAwMzQ3LCJleHAiOjIwMjM2ODgzNDd9.c9VqABqvPq2UdYTlKk9azsxCMGLFDBn3TLHsqwdMOzM",
            accent: "#ff3d5a"
        },
        pineapple: {
            staticImg: "https://tsnyhcvvkcmsrdgcbqzl.supabase.co/storage/v1/object/sign/web/anan.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZDM3ODgyZi1mYTk5LTQyOTMtOGE4Yy1hMGMzNmU1ZjIyOGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIvYW5hbi5wbmciLCJpYXQiOjE3NzE0MDQ0NDEsImV4cCI6MjAyMzY5MjQ0MX0.VxEFmZfiOrmzIX9XknxSx4YoOARqWjys7Npzlkg7b6s",
            animImg: "https://tsnyhcvvkcmsrdgcbqzl.supabase.co/storage/v1/object/sign/web/blebleble.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZDM3ODgyZi1mYTk5LTQyOTMtOGE4Yy1hMGMzNmU1ZjIyOGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIvYmxlYmxlYmxlLndlYnAiLCJpYXQiOjE3NzE0MDQ3NTcsImV4cCI6MjAyMzY5Mjc1N30.33XwA89nJhMfsJkMAqdX0jYxCGqvSH11NIOwH0SrYqc",
            accent: "#ffcc00"
        },
        wheat: {
            staticImg: "https://tsnyhcvvkcmsrdgcbqzl.supabase.co/storage/v1/object/sign/web%20plus/blefa.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZDM3ODgyZi1mYTk5LTQyOTMtOGE4Yy1hMGMzNmU1ZjIyOGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIgcGx1cy9ibGVmYS5wbmciLCJpYXQiOjE3NzE0MTM2MDUsImV4cCI6MjAyMzcwMTYwNX0.7h6Ml8K-jcRQwaonphzNcUkwQ3sksUG8LvaxKRlA9E4",
            animImg: "https://tsnyhcvvkcmsrdgcbqzl.supabase.co/storage/v1/object/sign/web/anananana-ezgif.com-video-to-webp-converter.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80ZDM3ODgyZi1mYTk5LTQyOTMtOGE4Yy1hMGMzNmU1ZjIyOGUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ3ZWIvYW5hbmFuYW5hLWV6Z2lmLmNvbS12aWRlby10by13ZWJwLWNvbnZlcnRlci53ZWJwIiwiaWF0IjoxNzcxNDEzNjYyLCJleHAiOjIwMjM3MDE2NjJ9.LriCkhJeK8vfBcB7yFKjhTGISyFHI4PUuIDhNPJdSy8",
            accent: "#d4a373"
        }
    };

    const currentData = ingredientsData[flavor];

    return (
        <section id="ingredients" className="section" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="container">
                <div className="grid" style={{ alignItems: 'center' }}>
                    <div className="col-6 col-md-12 text-center-mobile" style={{ order: 2 }}>
                        <motion.div style={{ y, display: 'flex', justifyContent: 'center' }}>
                            {/* Animated Flavor Image */}
                            <motion.img
                                key={flavor}
                                src={currentData.animImg}
                                alt={`${flavor} slices animation`}
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
                                color: currentData.accent,
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
                                Juste la qualité du malt d'orge, du houblon et des extraits naturels de fruits.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IngredientsSection;
