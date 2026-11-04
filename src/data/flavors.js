const media = (name) => `/media/${name}`;

const can = (key) => ({
    src: media(`${key}-can-960.webp`),
    srcSet: `${media(`${key}-can-480.webp`)} 480w, ${media(`${key}-can-960.webp`)} 960w`,
});

const video = (name) => ({
    mp4: media(`${name}.mp4`),
    poster: media(`${name}-poster.jpg`),
});

// Valeurs indicatives communes à toutes les saveurs, à remplacer par les données validées de chaque recette.
const defaultNutrition = {
    energyKcal: 28,
    carbs: 6.5,
    sugars: 6.5,
    protein: 0,
    salt: '< 0,01',
};

export const flavors = {
    orange: {
        title: { fr: 'Orange', en: 'Orange' },
        color: 'var(--color-accent)',
        hex: '#ff6b00',
        can: can('orange'),
        heroVideo: video('orange-hero'),
        ingredientsVideo: video('orange-ingredients'),
        fruit: { fr: "Extrait naturel d'orange", en: 'Natural orange extract' },
        nutrition: defaultNutrition,
    },
    apple: {
        title: { fr: 'Pomme', en: 'Apple' },
        color: '#7cbd1e',
        hex: '#7cbd1e',
        can: can('apple'),
        heroVideo: video('apple-hero'),
        ingredientsVideo: video('apple-ingredients'),
        fruit: { fr: 'Extrait naturel de pomme verte', en: 'Natural green apple extract' },
        nutrition: defaultNutrition,
    },
    strawberry: {
        title: { fr: 'Fraise', en: 'Strawberry' },
        color: '#ff3d5a',
        hex: '#ff3d5a',
        can: can('strawberry'),
        heroVideo: video('strawberry-hero'),
        ingredientsVideo: video('strawberry-ingredients'),
        fruit: { fr: 'Extrait naturel de fraise', en: 'Natural strawberry extract' },
        nutrition: defaultNutrition,
    },
    pineapple: {
        title: { fr: 'Ananas', en: 'Pineapple' },
        color: '#ffcc00',
        hex: '#ffcc00',
        can: can('pineapple'),
        heroVideo: video('pineapple-hero'),
        // Visuel ingrédients dédié à fournir : on réutilise l'animation de la canette.
        ingredientsVideo: video('pineapple-hero'),
        fruit: { fr: "Extrait naturel d'ananas", en: 'Natural pineapple extract' },
        nutrition: defaultNutrition,
    },
    wheat: {
        title: { fr: 'Blé', en: 'Wheat' },
        color: '#d4a373',
        hex: '#d4a373',
        can: can('wheat'),
        heroVideo: video('wheat-hero'),
        // Visuel ingrédients dédié à fournir : on réutilise l'animation de la canette.
        ingredientsVideo: video('wheat-hero'),
        fruit: { fr: 'Malt de blé', en: 'Wheat malt' },
        nutrition: defaultNutrition,
    },
};

export const BASE_INGREDIENTS = {
    fr: ['Eau gazéifiée', "Malt d'orge", 'Houblon'],
    en: ['Carbonated water', 'Barley malt', 'Hops'],
};

export const FLAVOR_KEYS = Object.keys(flavors);
export const DEFAULT_FLAVOR = 'orange';
