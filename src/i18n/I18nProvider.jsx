import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { LANGUAGES, translations } from './translations';

const STORAGE_KEY = 'bavaria-lang';
const I18nContext = createContext(null);

const detectLanguage = () => {
    if (typeof window === 'undefined') return 'fr';
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (LANGUAGES.includes(fromUrl)) return fromUrl;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (LANGUAGES.includes(stored)) return stored;
    return window.navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'fr';
};

const lookup = (lang, path) => path.split('.').reduce((node, key) => node?.[key], translations[lang]);

export const I18nProvider = ({ children, initialLang }) => {
    const [lang, setLang] = useState(() => initialLang || detectLanguage());

    useEffect(() => {
        document.documentElement.lang = lang;
        document.title = translations[lang].meta.title;
        document.querySelector('meta[name="description"]')?.setAttribute('content', translations[lang].meta.description);
        window.localStorage.setItem(STORAGE_KEY, lang);
    }, [lang]);

    const t = useCallback(
        (path, vars) => {
            const value = lookup(lang, path) ?? lookup('fr', path) ?? path;
            if (typeof value !== 'string' || !vars) return value;
            return value.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? '');
        },
        [lang]
    );

    const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);
    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
    const ctx = useContext(I18nContext);
    if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
    return ctx;
};
