import { useEffect, useState } from 'react';
import Reveal from './Reveal';
import { config } from '../config';
import { useCart } from '../cart/CartProvider';
import { useI18n } from '../i18n/I18nProvider';
import { mailtoUrl } from '../cart/cart';

const postForm = async (endpoint, data) => {
    const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
};

const useSubmit = (send) => {
    const [status, setStatus] = useState('idle');
    const submit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = Object.fromEntries(new FormData(form));
        if (data._gotcha) return;
        delete data._gotcha;
        setStatus('sending');
        try {
            await send(data);
            setStatus('success');
            form.reset();
        } catch {
            setStatus('error');
        }
    };
    return [status, submit];
};

const Status = ({ status, successKey }) => {
    const { t } = useI18n();
    if (status === 'success') return <p className="form-status success" role="status">{t(successKey)}</p>;
    if (status === 'error') return <p className="form-status error" role="alert">{t('contact.error')}</p>;
    return null;
};

const Honeypot = () => (
    <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />
);

const ContactForm = () => {
    const { t, lang } = useI18n();
    const { orderDraft, setOrderDraft } = useCart();
    const [message, setMessage] = useState('');
    const available = Boolean(config.contactEndpoint || config.contactEmail);

    useEffect(() => {
        if (orderDraft) {
            setMessage(orderDraft);
            setOrderDraft('');
            document.getElementById('contact-name')?.focus({ preventScroll: true });
        }
    }, [orderDraft, setOrderDraft]);

    const [status, submit] = useSubmit(async (data) => {
        if (config.contactEndpoint) {
            await postForm(config.contactEndpoint, { ...data, lang });
        } else {
            window.location.href = mailtoUrl(config.contactEmail, `Bavaria – ${data.name}`, `${data.message}\n\n${data.name} <${data.email}>`);
        }
        setMessage('');
    });

    return (
        <form className="contact-form" onSubmit={submit} aria-label={t('contact.title')}>
            <div className="form-row">
                <label htmlFor="contact-name">{t('contact.name')}</label>
                <input id="contact-name" name="name" required autoComplete="name" maxLength={100} />
            </div>
            <div className="form-row">
                <label htmlFor="contact-email">{t('contact.email')}</label>
                <input id="contact-email" name="email" type="email" required autoComplete="email" maxLength={200} />
            </div>
            <div className="form-row">
                <label htmlFor="contact-message">{t('contact.message')}</label>
                <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    maxLength={3000}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>
            <Honeypot />
            <p className="form-consent">
                {t('contact.consent')} <a href="/confidentialite">{t('footer.privacy')}</a>
            </p>
            <button type="submit" className="btn btn-primary" disabled={!available || status === 'sending'}>
                {status === 'sending' ? t('contact.sending') : t('contact.send')}
            </button>
            {!available && <p className="form-status">{t('contact.unavailable')}</p>}
            <Status status={status} successKey="contact.success" />
        </form>
    );
};

const NewsletterForm = () => {
    const { t, lang } = useI18n();
    const available = Boolean(config.newsletterEndpoint);
    const [status, submit] = useSubmit((data) => postForm(config.newsletterEndpoint, { ...data, lang }));

    return (
        <form className="newsletter-form" onSubmit={submit} aria-labelledby="newsletter-title">
            <h3 id="newsletter-title">{t('contact.newsletterTitle')}</h3>
            <p>{t('contact.newsletterText')}</p>
            <div className="newsletter-row">
                <label htmlFor="newsletter-email" className="sr-only">{t('contact.email')}</label>
                <input id="newsletter-email" name="email" type="email" required autoComplete="email" placeholder="email@exemple.com" />
                <button type="submit" className="btn btn-secondary" disabled={!available || status === 'sending'}>
                    {t('contact.subscribe')}
                </button>
            </div>
            <Honeypot />
            {!available && <p className="form-status">{t('contact.unavailable')}</p>}
            <Status status={status} successKey="contact.subscribed" />
        </form>
    );
};

const ContactSection = () => {
    const { t } = useI18n();

    return (
        <footer id="contact" className="site-footer">
            <div className="container">
                <Reveal width="100%">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <p className="eyebrow">{t('contact.eyebrow')}</p>
                        <h2>{t('contact.title')}</h2>
                    </div>
                </Reveal>

                <div className="contact-layout">
                    <ContactForm />
                    <NewsletterForm />
                </div>

                <div className="footer-brand">
                    <h2>BAVARIA</h2>
                    <p>{t('footer.tagline')}</p>
                </div>

                {config.social.length > 0 && (
                    <div className="footer-social">
                        {config.social.map((link) => (
                            <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="hover-link">
                                {link.name}
                            </a>
                        ))}
                    </div>
                )}

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} {config.legal.company || 'Bavaria'}. {t('footer.rights')}</p>
                    <nav aria-label={t('footer.legal')}>
                        <a href="/mentions-legales" className="hover-link">{t('footer.legal')}</a>
                        <a href="/confidentialite" className="hover-link">{t('footer.privacy')}</a>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default ContactSection;
