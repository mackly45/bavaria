// Configuration publique du site, renseignée via les variables d'environnement Vite (voir .env.example).
const env = import.meta.env;

export const SITE_URL = env.VITE_SITE_URL || 'https://bavaria-premium.vercel.app';

export const config = {
    orderWhatsApp: (env.VITE_ORDER_WHATSAPP || '').replace(/[^\d]/g, ''),
    orderEmail: env.VITE_ORDER_EMAIL || '',
    contactEmail: env.VITE_CONTACT_EMAIL || '',
    contactEndpoint: env.VITE_CONTACT_ENDPOINT || '',
    newsletterEndpoint: env.VITE_NEWSLETTER_ENDPOINT || '',
    currency: env.VITE_CURRENCY || 'EUR',
    // Prix unitaires par saveur, ex. VITE_PRICES={"orange":1.5,"apple":1.5}
    prices: parseJson(env.VITE_PRICES, {}),
    // Points de vente, ex. VITE_STORES=[{"name":"...","address":"...","lat":0,"lng":0}]
    stores: parseJson(env.VITE_STORES, []),
    social: [
        { name: 'Instagram', url: env.VITE_SOCIAL_INSTAGRAM || '' },
        { name: 'X', url: env.VITE_SOCIAL_X || '' },
        { name: 'Facebook', url: env.VITE_SOCIAL_FACEBOOK || '' },
    ].filter((link) => link.url),
    legal: {
        company: env.VITE_LEGAL_COMPANY || '',
        address: env.VITE_LEGAL_ADDRESS || '',
        registration: env.VITE_LEGAL_REGISTRATION || '',
        director: env.VITE_LEGAL_DIRECTOR || '',
    },
};

function parseJson(value, fallback) {
    if (!value) return fallback;
    try {
        return JSON.parse(value);
    } catch {
        return fallback;
    }
}
