import React from 'react';
import Reveal from './Reveal';

const NutritionSection = () => {
    return (
        <section id="nutrition" className="section">
            <div className="container" style={{ textAlign: 'center' }}>
                <Reveal width="100%">
                    <h2 style={{ fontSize: '3rem', marginBottom: '3rem' }}>Nutritional Values</h2>
                </Reveal>

                <Reveal width="100%" delay={0.4}>
                    <div style={{ overflowX: 'auto', display: 'flex', justifyContent: 'center' }}>
                        <table style={{
                            width: '100%',
                            maxWidth: '800px',
                            borderCollapse: 'collapse',
                            textAlign: 'left'
                        }}>
                            <tbody>
                                <TableRow label="Per 100ml" value="Value" header />
                                <TableRow label="Energy" value="28 kcal" />
                                <TableRow label="Carbohydrates" value="6.5g" />
                                <TableRow label="- Sugars" value="6.5g" />
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
