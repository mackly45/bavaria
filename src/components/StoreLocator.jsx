import { useState } from 'react';
import { config } from '../config';
import { useI18n } from '../i18n/I18nProvider';

const mapUrl = ({ lat, lng }) => {
    const d = 0.01;
    const bbox = [lng - d, lat - d, lng + d, lat + d].join(',');
    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
};

const StoreLocator = () => {
    const { t } = useI18n();
    const stores = config.stores.filter((s) => s.name && Number.isFinite(s.lat) && Number.isFinite(s.lng));
    const [active, setActive] = useState(0);
    if (!stores.length) return null;
    const store = stores[Math.min(active, stores.length - 1)];

    return (
        <div className="stores">
            <h3>{t('shop.storesTitle')}</h3>
            <div className="stores-layout">
                <ul className="stores-list">
                    {stores.map((s, i) => (
                        <li key={`${s.name}-${i}`}>
                            <button type="button" aria-pressed={i === active} onClick={() => setActive(i)}>
                                <strong>{s.name}</strong>
                                {s.address && <span>{s.address}</span>}
                            </button>
                        </li>
                    ))}
                </ul>
                <iframe
                    key={store.name}
                    title={t('shop.mapTitle', { name: store.name })}
                    src={mapUrl(store)}
                    loading="lazy"
                    className="stores-map"
                />
            </div>
        </div>
    );
};

export default StoreLocator;
