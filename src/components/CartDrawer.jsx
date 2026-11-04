import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, Trash2, X } from 'lucide-react';
import { useCart } from '../cart/CartProvider';
import { buildOrderMessage, cartTotal, formatPrice, mailtoUrl, whatsappUrl } from '../cart/cart';
import { flavors } from '../data/flavors';
import { config } from '../config';
import { useI18n } from '../i18n/I18nProvider';

const CartDrawer = () => {
    const { items, isOpen, setIsOpen, add, decrement, remove, setOrderDraft } = useCart();
    const { t, lang } = useI18n();
    const closeRef = useRef(null);
    const entries = Object.entries(items);
    const total = cartTotal(items, config.prices);
    const price = (amount) => formatPrice(amount, config.currency, lang);

    useEffect(() => {
        if (!isOpen) return undefined;
        closeRef.current?.focus();
        const onKey = (e) => e.key === 'Escape' && setIsOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen, setIsOpen]);

    const message = buildOrderMessage({
        items,
        names: Object.fromEntries(Object.entries(flavors).map(([key, f]) => [key, `Bavaria ${f.title[lang]}`])),
        intro: t('cart.message'),
        totalLine: total !== null ? t('cart.totalLine', { total: price(total) }) : '',
    });

    let order;
    if (config.orderWhatsApp) {
        order = { href: whatsappUrl(config.orderWhatsApp, message), label: t('cart.orderWhatsApp'), external: true };
    } else if (config.orderEmail) {
        order = { href: mailtoUrl(config.orderEmail, t('cart.subject'), message), label: t('cart.orderEmail') };
    } else {
        order = {
            href: '#contact',
            label: t('cart.orderContact'),
            onClick: () => {
                setOrderDraft(message);
                setIsOpen(false);
            },
        };
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="cart-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    />
                    <motion.aside
                        id="cart-drawer"
                        className="cart-drawer"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="cart-title"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 28, stiffness: 240 }}
                        data-lenis-prevent
                    >
                        <div className="cart-header">
                            <h2 id="cart-title">{t('cart.title')}</h2>
                            <button ref={closeRef} type="button" className="icon-btn" onClick={() => setIsOpen(false)} aria-label={t('cart.close')}>
                                <X size={22} aria-hidden="true" />
                            </button>
                        </div>

                        {entries.length === 0 ? (
                            <p className="cart-empty">{t('cart.empty')}</p>
                        ) : (
                            <>
                                <ul className="cart-items">
                                    {entries.map(([key, qty]) => {
                                        const flavor = flavors[key];
                                        const name = flavor.title[lang];
                                        return (
                                            <li key={key} className="cart-item">
                                                <img src={flavor.can.src} alt="" width="48" height="96" />
                                                <div className="cart-item-info">
                                                    <span style={{ color: flavor.color, fontWeight: 700 }}>{name}</span>
                                                    {typeof config.prices[key] === 'number' && (
                                                        <span className="cart-item-price">{price(config.prices[key] * qty)}</span>
                                                    )}
                                                </div>
                                                <div className="qty-controls">
                                                    <button type="button" className="icon-btn" onClick={() => decrement(key)} aria-label={t('cart.decrease', { name })}>
                                                        <Minus size={16} aria-hidden="true" />
                                                    </button>
                                                    <span aria-live="polite" data-testid={`qty-${key}`}>{qty}</span>
                                                    <button type="button" className="icon-btn" onClick={() => add(key)} aria-label={t('cart.increase', { name })}>
                                                        <Plus size={16} aria-hidden="true" />
                                                    </button>
                                                    <button type="button" className="icon-btn" onClick={() => remove(key)} aria-label={t('cart.remove', { name })}>
                                                        <Trash2 size={16} aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <div className="cart-footer">
                                    {total !== null && (
                                        <p className="cart-total">
                                            <span>{t('cart.total')}</span>
                                            <strong>{price(total)}</strong>
                                        </p>
                                    )}
                                    <a
                                        href={order.href}
                                        className="btn btn-primary cart-order"
                                        onClick={order.onClick}
                                        {...(order.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                    >
                                        {order.label}
                                    </a>
                                    <p className="cart-note">{t('cart.note')}</p>
                                </div>
                            </>
                        )}
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
