import React, { useState } from 'react';
import Reveal from './Reveal';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQSection = () => {
    return (
        <section id="faq" className="section">
            <div className="container" style={{ maxWidth: '800px' }}>
                <Reveal width="100%">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <p style={{ color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Common Questions</p>
                        <h2 style={{ fontSize: '3rem' }}>FAQ</h2>
                    </div>
                </Reveal>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <FAQItem
                        question="Is Bavaria alcoholic?"
                        answer="No, Bavaria is 100% non-alcoholic (0.0%), making it perfect for any time of the day."
                        delay={0.2}
                    />
                    <FAQItem
                        question="Is it suitable for vegans?"
                        answer="Yes, all our ingredients are plant-based and suitable for a vegan diet."
                        delay={0.3}
                    />
                    <FAQItem
                        question="Where can I buy it?"
                        answer="You can order directly from our shop or find us at major retailers nationwide."
                        delay={0.4}
                    />
                </div>
            </div>
        </section>
    );
};

const FAQItem = ({ question, answer, delay }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Reveal width="100%" delay={delay}>
            <div
                style={{ borderBottom: '1px solid var(--color-divider)', padding: '1.5rem 0', cursor: 'pointer' }}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 500, color: isOpen ? 'var(--color-accent)' : 'inherit', transition: 'color 0.3s' }}>
                        {question}
                    </h3>
                    {isOpen ? <Minus size={20} color="var(--color-accent)" /> : <Plus size={20} />}
                </div>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ overflow: 'hidden' }}
                        >
                            <p style={{ paddingTop: '1rem', opacity: 0.7, lineHeight: 1.6 }}>{answer}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Reveal>
    );
};

export default FAQSection;
