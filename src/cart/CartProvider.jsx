import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { cartReducer, cartCount } from './cart';
import { FLAVOR_KEYS } from '../data/flavors';

const STORAGE_KEY = 'bavaria-cart';
const CartContext = createContext(null);

const loadCart = () => {
    try {
        const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');
        return Object.fromEntries(
            Object.entries(saved).filter(([key, qty]) => FLAVOR_KEYS.includes(key) && Number.isInteger(qty) && qty > 0)
        );
    } catch {
        return {};
    }
};

export const CartProvider = ({ children }) => {
    const [items, dispatch] = useReducer(cartReducer, undefined, loadCart);
    const [isOpen, setIsOpen] = useState(false);
    const [orderDraft, setOrderDraft] = useState('');

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const value = useMemo(
        () => ({
            items,
            count: cartCount(items),
            isOpen,
            setIsOpen,
            orderDraft,
            setOrderDraft,
            add: (key) => dispatch({ type: 'add', key }),
            decrement: (key) => dispatch({ type: 'decrement', key }),
            remove: (key) => dispatch({ type: 'remove', key }),
            clear: () => dispatch({ type: 'clear' }),
        }),
        [items, isOpen, orderDraft]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used inside CartProvider');
    return ctx;
};
