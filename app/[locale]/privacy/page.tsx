import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LegalPage } from '@/components/legal/LegalPage';
import { PrivacyContentFR } from '@/components/legal/PrivacyContentFR';
import { PrivacyContentEN } from '@/components/legal/PrivacyContentEN';

const TOC_FR = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'responsable', label: 'Responsable du traitement' },
  { id: 'donnees', label: 'Renseignements collectés' },
  { id: 'cookies', label: 'Cookies et technologies de suivi' },
  { id: 'utilisation', label: 'Utilisation des renseignements' },
  { id: 'partage', label: 'Partage des renseignements' },
  { id: 'conservation', label: 'Conservation des données' },
  { id: 'securite', label: 'Sécurité' },
  { id: 'droits', label: 'Tes droits' },
  { id: 'transferts', label: 'Transferts internationaux' },
  { id: 'plugin', label: 'Le plugin Ajnix et tes propres visiteurs' },
  { id: 'modifications', label: 'Modifications' },
  { id: 'contact', label: 'Contact' },
];

const TOC_EN = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'controller', label: 'Data controller' },
  { id: 'data', label: 'Information collected' },
  { id: 'cookies', label: 'Cookies and tracking technologies' },
  { id: 'use', label: 'Use of information' },
  { id: 'sharing', label: 'Sharing of information' },
  { id: 'retention', label: 'Data retention' },
  { id: 'security', label: 'Security' },
  { id: 'rights', label: 'Your rights' },
  { id: 'transfers', label: 'International transfers' },
  { id: 'plugin', label: 'The Ajnix plugin and your own visitors' },
  { id: 'modifications', label: 'Modifications' },
  { id: 'contact', label: 'Contact' },
];

const COPY = {
  en: {
    eyebrow: 'LEGAL',
    title: 'Privacy policy',
    lastUpdated: 'Last updated: April 2026',
    tocLabel: 'On this page',
    metaTitle: 'Privacy policy · Ajnix',
    metaDescription:
      'How Ajnix collects, uses, and protects your personal information. GDPR, Law 25, PIPEDA, CCPA/CPRA, LGPD, UK GDPR, and Australian Privacy Act compliant.',
  },
  fr: {
    eyebrow: 'LÉGAL',
    title: 'Politique de confidentialité',
    lastUpdated: 'Dernière mise à jour : avril 2026',
    tocLabel: 'Sur cette page',
    metaTitle: 'Politique de confidentialité · Ajnix',
    metaDescription:
      'Comment Ajnix collecte, utilise et protège tes renseignements personnels. Conforme RGPD, Loi 25, PIPEDA, CCPA/CPRA, LGPD, UK GDPR et Privacy Act australien.',
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = locale === 'fr' ? COPY.fr : COPY.en;
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: locale === 'fr' ? '/fr/confidentialite' : '/privacy',
      languages: {
        en: '/privacy',
        fr: '/fr/confidentialite',
      },
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  await getTranslations({ locale });

  const isFr = locale === 'fr';
  const copy = isFr ? COPY.fr : COPY.en;
  const toc = isFr ? TOC_FR : TOC_EN;

  return (
    <>
      <Header />
      <main id="main">
        <LegalPage
          eyebrow={copy.eyebrow}
          title={copy.title}
          lastUpdated={copy.lastUpdated}
          tocLabel={copy.tocLabel}
          toc={toc}
        >
          {isFr ? <PrivacyContentFR /> : <PrivacyContentEN />}
        </LegalPage>
      </main>
      <Footer />
    </>
  );
}
