import { config } from '../config';
import { useI18n } from '../i18n/I18nProvider';

const HOST = 'Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA – vercel.com';

const content = {
    fr: {
        notice: {
            title: 'Mentions légales',
            sections: (v) => [
                ['Éditeur du site', [`Raison sociale : ${v.company}`, `Adresse : ${v.address}`, `Immatriculation : ${v.registration}`, `Directeur de la publication : ${v.director}`, `Contact : ${v.email}`]],
                ['Hébergement', [HOST]],
                ['Propriété intellectuelle', ['Les textes, visuels, logos et marques présents sur ce site sont protégés. Toute reproduction sans autorisation écrite est interdite.']],
            ],
        },
        privacy: {
            title: 'Politique de confidentialité',
            sections: (v) => [
                ['Responsable du traitement', [`${v.company} – ${v.address} – ${v.email}`]],
                ['Données collectées', [
                    'Formulaire de contact : nom, email et message, utilisés uniquement pour vous répondre.',
                    'Newsletter : adresse email, utilisée pour l’envoi de nos actualités. Désinscription possible à tout moment.',
                    'Commande : le contenu de votre panier est transmis par WhatsApp, email ou formulaire uniquement lorsque vous le décidez.',
                ]],
                ['Stockage local', ['Votre panier et votre langue sont enregistrés dans votre navigateur (localStorage). Ils ne sont pas transmis à nos serveurs.']],
                ['Mesure d’audience', ['Nous utilisons Vercel Web Analytics et Speed Insights, qui produisent des statistiques agrégées sans cookie.']],
                ['Vos droits', [`Vous pouvez demander l’accès, la rectification ou la suppression de vos données en écrivant à ${v.email}.`]],
            ],
        },
    },
    en: {
        notice: {
            title: 'Legal notice',
            sections: (v) => [
                ['Publisher', [`Company: ${v.company}`, `Address: ${v.address}`, `Registration: ${v.registration}`, `Publication director: ${v.director}`, `Contact: ${v.email}`]],
                ['Hosting', [HOST]],
                ['Intellectual property', ['Texts, visuals, logos and trademarks on this site are protected. Any reproduction without written permission is prohibited.']],
            ],
        },
        privacy: {
            title: 'Privacy policy',
            sections: (v) => [
                ['Data controller', [`${v.company} – ${v.address} – ${v.email}`]],
                ['Data we collect', [
                    'Contact form: name, email and message, used only to reply to you.',
                    'Newsletter: email address, used to send our news. You can unsubscribe at any time.',
                    'Orders: your cart is sent by WhatsApp, email or form only when you choose to.',
                ]],
                ['Local storage', ['Your cart and language are stored in your browser (localStorage). They are not sent to our servers.']],
                ['Analytics', ['We use Vercel Web Analytics and Speed Insights, which produce aggregated, cookie-free statistics.']],
                ['Your rights', [`You can request access to, correction or deletion of your data by writing to ${v.email}.`]],
            ],
        },
    },
};

const LegalPage = ({ page }) => {
    const { t, lang } = useI18n();
    const missing = t('legal.missing');
    const values = {
        company: config.legal.company || missing,
        address: config.legal.address || missing,
        registration: config.legal.registration || missing,
        director: config.legal.director || missing,
        email: config.contactEmail || config.orderEmail || missing,
    };
    const doc = content[lang][page];

    return (
        <main className="legal-page">
            <div className="container" style={{ maxWidth: '800px' }}>
                <a href="/" className="hover-link legal-back">← {t('legal.back')}</a>
                <h1>{doc.title}</h1>
                {doc.sections(values).map(([heading, paragraphs]) => (
                    <section key={heading}>
                        <h2>{heading}</h2>
                        {paragraphs.map((p) => <p key={p}>{p}</p>)}
                    </section>
                ))}
            </div>
        </main>
    );
};

export default LegalPage;
