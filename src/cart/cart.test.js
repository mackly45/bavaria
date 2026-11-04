import { describe, expect, it } from 'vitest';
import { buildOrderMessage, cartCount, cartReducer, cartTotal, MAX_QUANTITY, whatsappUrl } from './cart';

describe('cartReducer', () => {
    it('adds, decrements and removes items', () => {
        let state = cartReducer({}, { type: 'add', key: 'orange' });
        state = cartReducer(state, { type: 'add', key: 'orange' });
        state = cartReducer(state, { type: 'add', key: 'apple' });
        expect(state).toEqual({ orange: 2, apple: 1 });
        state = cartReducer(state, { type: 'decrement', key: 'apple' });
        expect(state).toEqual({ orange: 2 });
        state = cartReducer(state, { type: 'remove', key: 'orange' });
        expect(state).toEqual({});
    });

    it('caps quantities', () => {
        expect(cartReducer({ orange: MAX_QUANTITY }, { type: 'add', key: 'orange' }).orange).toBe(MAX_QUANTITY);
    });
});

describe('cart helpers', () => {
    it('counts items and computes totals only when every price is known', () => {
        expect(cartCount({ orange: 2, apple: 3 })).toBe(5);
        expect(cartTotal({ orange: 2, apple: 1 }, { orange: 1.5, apple: 2 })).toBe(5);
        expect(cartTotal({ orange: 2, wheat: 1 }, { orange: 1.5 })).toBeNull();
    });

    it('builds an encoded WhatsApp order', () => {
        const message = buildOrderMessage({
            items: { orange: 2 },
            names: { orange: 'Bavaria Orange' },
            intro: 'Bonjour',
            totalLine: '',
        });
        expect(message).toBe('Bonjour\n- 2 × Bavaria Orange');
        expect(whatsappUrl('242061234567', message)).toBe(`https://wa.me/242061234567?text=${encodeURIComponent(message)}`);
    });
});
