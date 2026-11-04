import Reveal from './Reveal';
import { useI18n } from '../i18n/I18nProvider';

const ReviewsSection = () => {
    const { t } = useI18n();
    const reviews = t('reviews.items');
    return (
        <section id="reviews" className="section" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="container">
                <Reveal width="100%">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <p style={{ color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>{t('reviews.eyebrow')}</p>
                        <h2>{t('reviews.title')}</h2>
                    </div>
                </Reveal>

                <div className="grid">
                    {reviews.map((review, i) => (
                        <div key={review.author} className="col-6 col-md-12">
                            <Reveal delay={0.2 * (i + 1)}>
                                <ReviewCard quote={review.quote} author={review.author} />
                            </Reveal>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ReviewCard = ({ quote, author }) => (
    <div style={{
        padding: '2rem',
        background: 'rgba(255,255,255,0.03)',
        borderLeft: '2px solid var(--color-accent)',
        borderRadius: '0 10px 10px 0'
    }}>
        <p style={{ fontSize: '1.1rem', marginBottom: '1rem', fontStyle: 'italic' }}>&laquo; {quote} &raquo;</p>
        <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>— {author}</p>
    </div>
);

export default ReviewsSection;
