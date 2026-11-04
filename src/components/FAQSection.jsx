import { useId, useState } from 'react';
import Reveal from './Reveal';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: 'Bavaria contient-elle de l\'alcool ?',
        answer: 'Non, Bavaria est 100 % sans alcool (0,0 %), parfaite à tout moment de la journée.'
    },
    {
        question: 'Convient-elle aux végans ?',
        answer: 'Oui, tous nos ingrédients sont d\'origine végétale et adaptés à une alimentation végane.'
    },
    {
        question: 'Où puis-je l\'acheter ?',
        answer: 'Vous pouvez commander directement sur notre boutique ou nous trouver chez les principaux revendeurs.'
    }
];

const FAQSection = () => {
    return (
        <section id="faq" className="section">
            <div className="container" style={{ maxWidth: '800px' }}>
                <Reveal width="100%">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <p style={{ color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Questions fréquentes</p>
                        <h2>FAQ</h2>
                    </div>
                </Reveal>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {faqs.map((faq, i) => (
                        <FAQItem key={faq.question} question={faq.question} answer={faq.answer} delay={0.2 + i * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const FAQItem = ({ question, answer, delay }) => {
    const [isOpen, setIsOpen] = useState(false);
    const answerId = useId();

    return (
        <Reveal width="100%" delay={delay}>
            <div style={{ borderBottom: '1px solid var(--color-divider)', padding: '1.5rem 0' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 500 }}>
                    <button
                        type="button"
                        className="faq-question"
                        aria-expanded={isOpen}
                        aria-controls={answerId}
                        onClick={() => setIsOpen(!isOpen)}
                        style={{ color: isOpen ? 'var(--color-accent)' : 'inherit', transition: 'color 0.3s' }}
                    >
                        {question}
                        {isOpen ? <Minus size={20} color="var(--color-accent)" aria-hidden="true" /> : <Plus size={20} aria-hidden="true" />}
                    </button>
                </h3>
                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.div
                            id={answerId}
                            role="region"
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
