import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductSection from './components/ProductSection';
import IngredientsSection from './components/IngredientsSection';
import NutritionSection from './components/NutritionSection';
import ReviewsSection from './components/ReviewsSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    const [flavor, setFlavor] = useState('orange');

    useEffect(() => {
        // Initialize Lenis Smooth Scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);

        // Simulate Asset Loading
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && <Loader key="loader" />}
            </AnimatePresence>

            {!isLoading && (
                <div className="app-content">
                    <Navbar />
                    <Hero flavor={flavor} setFlavor={setFlavor} />
                    <ProductSection flavor={flavor} />
                    <IngredientsSection flavor={flavor} />
                    <NutritionSection />
                    <ReviewsSection />
                    <FAQSection />
                    <ContactSection />
                </div>
            )}
        </>
    );
}

export default App;
