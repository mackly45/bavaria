import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductSection from './components/ProductSection';
import IngredientsSection from './components/IngredientsSection';
import NutritionSection from './components/NutritionSection';
import ShopSection from './components/ShopSection';
import ReviewsSection from './components/ReviewsSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import CartDrawer from './components/CartDrawer';
import LegalPage from './components/LegalPage';
import { LEGAL_PATHS } from './data/routes';
import { flavors, DEFAULT_FLAVOR } from './data/flavors';

const MIN_LOADER_MS = 800;
const MAX_LOADER_MS = 4000;

const preloadImage = (src) =>
    new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve;
        img.src = src;
    });

function App() {
    const legalPage = LEGAL_PATHS[window.location.pathname.replace(/\/$/, '')];
    const [isLoading, setIsLoading] = useState(!legalPage);
    const [flavor, setFlavor] = useState(DEFAULT_FLAVOR);

    useEffect(() => {
        if (legalPage) return undefined;
        let cancelled = false;
        const minDelay = new Promise((resolve) => setTimeout(resolve, MIN_LOADER_MS));
        const maxDelay = new Promise((resolve) => setTimeout(resolve, MAX_LOADER_MS));
        const heroImage = preloadImage(flavors[DEFAULT_FLAVOR].can.src);

        Promise.race([Promise.all([minDelay, heroImage]), maxDelay]).then(() => {
            if (!cancelled) setIsLoading(false);
        });

        return () => {
            cancelled = true;
        };
    }, [legalPage]);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            anchors: true,
        });

        let frameId;
        const raf = (time) => {
            lenis.raf(time);
            frameId = requestAnimationFrame(raf);
        };
        frameId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(frameId);
            lenis.destroy();
        };
    }, []);

    return (
        <MotionConfig reducedMotion="user">
            <AnimatePresence mode="wait">
                {isLoading && <Loader key="loader" />}
            </AnimatePresence>

            {!isLoading && (
                <div className="app-content">
                    <Navbar />
                    <CartDrawer />
                    {legalPage ? <LegalPage page={legalPage} /> : (
                    <main>
                        <Hero flavor={flavor} setFlavor={setFlavor} />
                        <ProductSection flavor={flavor} />
                        <IngredientsSection flavor={flavor} />
                        <NutritionSection flavor={flavor} />
                        <ShopSection flavor={flavor} setFlavor={setFlavor} />
                        <ReviewsSection />
                        <FAQSection />
                    </main>
                    )}
                    <ContactSection />
                </div>
            )}
        </MotionConfig>
    );
}

export default App;
