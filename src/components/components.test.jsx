import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { I18nProvider } from '../i18n/I18nProvider';
import { CartProvider } from '../cart/CartProvider';
import FAQSection from './FAQSection';
import ShopSection from './ShopSection';
import CartDrawer from './CartDrawer';
import Navbar from './Navbar';
import NutritionSection from './NutritionSection';

const renderWithProviders = (ui, lang = 'fr') =>
    render(
        <I18nProvider initialLang={lang}>
            <CartProvider>{ui}</CartProvider>
        </I18nProvider>
    );

describe('FAQSection', () => {
    it('toggles answers with aria-expanded', () => {
        renderWithProviders(<FAQSection />);
        const question = screen.getByRole('button', { name: /contient-elle de l'alcool/i });
        expect(question).toHaveAttribute('aria-expanded', 'false');
        fireEvent.click(question);
        expect(question).toHaveAttribute('aria-expanded', 'true');
        expect(screen.getByText(/100 % sans alcool/)).toBeInTheDocument();
    });

    it('renders in English', () => {
        renderWithProviders(<FAQSection />, 'en');
        expect(screen.getByRole('button', { name: /does bavaria contain alcohol/i })).toBeInTheDocument();
    });
});

describe('Shop and cart', () => {
    it('adds flavors to the cart and updates quantities', () => {
        renderWithProviders(
            <>
                <Navbar />
                <ShopSection flavor="orange" setFlavor={() => {}} />
                <CartDrawer />
            </>
        );
        const addButtons = screen.getAllByRole('button', { name: /ajouter au panier/i });
        fireEvent.click(addButtons[0]);
        fireEvent.click(addButtons[0]);
        expect(screen.getByTestId('cart-count')).toHaveTextContent('2');

        fireEvent.click(screen.getByRole('button', { name: /ouvrir le panier/i }));
        const drawer = screen.getByRole('dialog', { name: /votre panier/i });
        expect(within(drawer).getByTestId('qty-orange')).toHaveTextContent('2');
        fireEvent.click(within(drawer).getByRole('button', { name: /retirer une canette orange/i }));
        expect(within(drawer).getByTestId('qty-orange')).toHaveTextContent('1');
        expect(JSON.parse(window.localStorage.getItem('bavaria-cart'))).toEqual({ orange: 1 });
    });
});

describe('Language switch', () => {
    it('switches the navbar to English and updates <html lang>', () => {
        renderWithProviders(<Navbar />);
        fireEvent.click(screen.getByRole('button', { name: /switch to english/i }));
        expect(screen.getAllByText('Shop').length).toBeGreaterThan(0);
        expect(document.documentElement.lang).toBe('en');
    });
});

describe('NutritionSection', () => {
    it('shows the selected flavor', () => {
        renderWithProviders(<NutritionSection flavor="apple" />);
        expect(screen.getByText(/pour 100 ml – pomme/i)).toBeInTheDocument();
    });
});
