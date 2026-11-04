import Reveal from './Reveal';
import { flavors } from '../data/flavors';
import { useI18n } from '../i18n/I18nProvider';

const formatNumber = (value, lang) =>
    typeof value === 'number' ? value.toLocaleString(lang === 'en' ? 'en-GB' : 'fr-FR', { minimumFractionDigits: 1 }) : value;

const NutritionSection = ({ flavor = 'orange' }) => {
    const { t, lang } = useI18n();
    const current = flavors[flavor];
    const n = current.nutrition;
    const g = (v) => `${formatNumber(v, lang)} g`;
    return (
        <section id="nutrition" className="section">
            <div className="container" style={{ textAlign: 'center' }}>
                <Reveal width="100%">
                    <h2 style={{ marginBottom: '3rem' }}>{t('nutrition.title')}</h2>
                </Reveal>

                <Reveal width="100%" delay={0.4}>
                    <div style={{ overflowX: 'auto', display: 'flex', justifyContent: 'center', padding: '0 1rem' }}>
                        <table style={{
                            width: '100%',
                            maxWidth: '800px',
                            borderCollapse: 'collapse',
                            textAlign: 'left',
                            fontSize: 'var(--fs-body)'
                        }}>
                            <tbody>
                                <TableRow label={t('nutrition.per', { name: current.title[lang] })} value={t('nutrition.value')} header />
                                <TableRow label={t('nutrition.energy')} value={`${n.energyKcal} kcal`} />
                                <TableRow label={t('nutrition.carbs')} value={g(n.carbs)} />
                                <TableRow label={t('nutrition.sugars')} value={g(n.sugars)} />
                                <TableRow label={t('nutrition.protein')} value={g(n.protein)} />
                                <TableRow label={t('nutrition.salt')} value={g(n.salt)} />
                            </tbody>
                        </table>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

const TableRow = ({ label, value, header }) => (
    <tr style={{ borderBottom: '1px solid var(--color-divider)' }}>
        <td style={{
            padding: '1.5rem',
            fontWeight: header ? 700 : 400,
            opacity: header ? 1 : 0.8
        }}>{label}</td>
        <td style={{
            padding: '1.5rem',
            fontWeight: header ? 700 : 400,
            opacity: header ? 1 : 0.8
        }}>{value}</td>
    </tr>
);

export default NutritionSection;
