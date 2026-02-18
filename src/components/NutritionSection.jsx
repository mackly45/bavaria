import React from 'react';
import Reveal from './Reveal';

const NutritionSection = () => {
    return (
        <section id="nutrition" className="section">
            <div className="container" style={{ textAlign: 'center' }}>
                <Reveal width="100%">
                    <h2 style={{ marginBottom: '3rem' }}>Valeurs Nutritionnelles</h2>
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
                                <TableRow label="Pour 100ml" value="Valeur" header />
                                <TableRow label="Énergie" value="28 kcal" />
                                <TableRow label="Glucides" value="6.5g" />
                                <TableRow label="- dont sucres" value="6.5g" />
                                <TableRow label="Protéines" value="0.0g" />
                                <TableRow label="Sel" value="< 0.01g" />
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
