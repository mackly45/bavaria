export const MAX_QUANTITY = 99;

export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'add': {
            const next = Math.min((state[action.key] || 0) + (action.quantity || 1), MAX_QUANTITY);
            return { ...state, [action.key]: next };
        }
        case 'decrement': {
            const next = (state[action.key] || 0) - 1;
            if (next > 0) return { ...state, [action.key]: next };
            const rest = { ...state };
            delete rest[action.key];
            return rest;
        }
        case 'remove': {
            const rest = { ...state };
            delete rest[action.key];
            return rest;
        }
        case 'clear':
            return {};
        default:
            return state;
    }
};

export const cartCount = (items) => Object.values(items).reduce((sum, qty) => sum + qty, 0);

export const cartTotal = (items, prices) => {
    const entries = Object.entries(items);
    if (!entries.length || entries.some(([key]) => typeof prices[key] !== 'number')) return null;
    return entries.reduce((sum, [key, qty]) => sum + prices[key] * qty, 0);
};

export const formatPrice = (amount, currency, lang) =>
    new Intl.NumberFormat(lang === 'en' ? 'en-GB' : 'fr-FR', { style: 'currency', currency }).format(amount);

export const buildOrderMessage = ({ items, names, intro, totalLine }) => {
    const lines = Object.entries(items).map(([key, qty]) => `- ${qty} × ${names[key]}`);
    return [intro, ...lines, totalLine].filter(Boolean).join('\n');
};

export const whatsappUrl = (phone, message) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

export const mailtoUrl = (email, subject, body) =>
    `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
