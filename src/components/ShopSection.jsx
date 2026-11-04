import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import Reveal from './Reveal';
import StoreLocator from './StoreLocator';
import { flavors } from '../data/flavors';
import { config } from '../config';
import { formatPrice } from '../cart/cart';
import { useCart } from '../cart/CartProvider';
import { useI18n } from '../i18n/I18nProvider';

const ShopSection = ({ flavor, setFlavor }) => {
    const { t, lang } = useI18n();
    const { add, setIsOpen } = useCart();
    const [announcement, setAnnouncement] = useState('');

    const handleAdd = (key) => {
        add(key);
        setFlavor(key);
        setAnnouncement(t('shop.added', { name: flavors[key].title[lang] }));
    };

    return (
        <section id="shop" className="section" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="container">
                <Reveal width="100%">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <p className="eyebrow">{t('shop.eyebrow')}</p>
                        <h2>{t('shop.title')}</h2>
                    </div>
                </Reveal>

                <div className="shop-grid">
                    {Object.entries(flavors).map(([key, item], i) => {
                        const isActive = flavor === key;
                        const name = item.title[lang];
                        return (
                            <Reveal key={key} width="100%" delay={0.1 * i}>
                                <article className={`shop-card${isActive ? ' is-active' : ''}`} style={{ '--flavor': item.color }}>
                                    <button
                                        type="button"
                                        className="shop-card-select"
                                        onClick={() => setFlavor(key)}
                                        aria-pressed={isActive}
                                        aria-label={t('flavorLabel', { name })}
                                    >
                                        <img
                                            src={item.can.src}
                                            srcSet={item.can.srcSet}
                                            sizes="120px"
                                            alt={t('canAlt', { name })}
                                            loading="lazy"
                                            width="100"
                                            height="200"
                                        />
                                        <span className="shop-card-name">{name}</span>
                                        {typeof config.prices[key] === 'number' && (
                                            <span className="shop-card-price">{formatPrice(config.prices[key], config.currency, lang)}</span>
                                        )}
                                        <span className="shop-card-state">{isActive ? t('shop.selected') : t('shop.choose')}</span>
                                    </button>
                                    <button type="button" className="btn btn-primary shop-card-add" onClick={() => handleAdd(key)}>
                                        <ShoppingBag size={16} aria-hidden="true" /> {t('shop.add')}
                                    </button>
                                </article>
                            </Reveal>
                        );
                    })}
                </div>

                <p className="sr-only" role="status" aria-live="polite">{announcement}</p>
                {announcement && (
                    <p className="shop-feedback">
                        {announcement} ·{' '}
                        <button type="button" className="link-btn" onClick={() => setIsOpen(true)}>{t('cart.title')}</button>
                    </p>
                )}

                <StoreLocator />

                <Reveal width="100%" delay={0.3}>
                    <p style={{ textAlign: 'center', marginTop: '3rem', opacity: 0.7 }}>
                        {t('shop.resellers')} <a href="#contact" style={{ color: flavors[flavor].color, fontWeight: 600 }}>{t('shop.contact')}</a>
                    </p>
                </Reveal>
            </div>
        </section>
    );
};

export default ShopSection;
