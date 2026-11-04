import React from 'react';
import ReactDOM from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import App from './App.jsx';
import { I18nProvider } from './i18n/I18nProvider';
import { CartProvider } from './cart/CartProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <I18nProvider>
            <CartProvider>
                <App />
            </CartProvider>
        </I18nProvider>
        <Analytics />
        <SpeedInsights />
    </React.StrictMode>,
);
