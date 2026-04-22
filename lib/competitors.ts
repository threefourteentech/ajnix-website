export type CompetitorFeature = {
  label: { en: string; fr: string };
  ajnix: 'yes' | 'no' | 'partial' | string;
  them: 'yes' | 'no' | 'partial' | string;
  note?: { en: string; fr: string };
};

export type CompetitorCategory = {
  name: { en: string; fr: string };
  features: CompetitorFeature[];
};

export type CompetitorPricing = {
  ajnix: { en: string; fr: string };
  them: { en: string; fr: string };
};

export type Competitor = {
  slug: string; // e.g. "monsterinsights" → /vs-monsterinsights
  name: string;
  tagline: { en: string; fr: string };
  hero: {
    h1: { en: string; fr: string };
    subtitle: { en: string; fr: string };
  };
  verdict: {
    en: { chooseAjnix: string[]; chooseThem: string[] };
    fr: { chooseAjnix: string[]; chooseThem: string[] };
  };
  pricing: CompetitorPricing;
  categories: CompetitorCategory[];
  updatedOn: string;
};

const cat = (en: string, fr: string, features: CompetitorFeature[]): CompetitorCategory => ({
  name: { en, fr },
  features,
});

export const competitors: Record<string, Competitor> = {
  monsterinsights: {
    slug: 'monsterinsights',
    name: 'MonsterInsights',
    tagline: {
      en: 'A Google Analytics wrapper for WordPress',
      fr: 'Un wrapper Google Analytics pour WordPress',
    },
    hero: {
      h1: {
        en: 'Ajnix vs MonsterInsights: which is better for your WooCommerce store?',
        fr: 'Ajnix vs MonsterInsights : lequel est meilleur pour votre boutique WooCommerce ?',
      },
      subtitle: {
        en: 'MonsterInsights wraps GA4 in a friendlier WordPress UI. Ajnix replaces the dependency on GA4 entirely with native multi-touch attribution. Here is the honest comparison.',
        fr: 'MonsterInsights enveloppe GA4 dans une UI WordPress plus amicale. Ajnix remplace entièrement la dépendance à GA4 avec une vraie attribution multi-touch. Voici la comparaison honnête.',
      },
    },
    verdict: {
      en: {
        chooseAjnix: [
          'You want real multi-touch attribution, not GA4 reports inside WordPress',
          'You run WooCommerce seriously and need native COGS, fees, refunds',
          'You want privacy-first by default, no GA4 consent dance',
          'You want a French-native UI for your team',
        ],
        chooseThem: [
          'You already use GA4 heavily and want a friendlier wrapper',
          'You need their popular posts widgets and SEO add-ons',
          'You depend on their 12+ other integrations',
          'Multi-touch attribution is not on your roadmap',
        ],
      },
      fr: {
        chooseAjnix: [
          'Vous voulez de la vraie attribution multi-touch, pas des rapports GA4 dans WordPress',
          'Vous prenez WooCommerce au sérieux et avez besoin de COGS, frais, remboursements natifs',
          'Vous voulez du privacy-first par défaut, sans danse de consentement GA4',
          'Vous voulez une UI française native pour votre équipe',
        ],
        chooseThem: [
          'Vous utilisez déjà GA4 intensivement et voulez un wrapper plus amical',
          'Vous avez besoin de leurs widgets popular posts et add-ons SEO',
          'Vous dépendez de leurs 12+ autres intégrations',
          'L\'attribution multi-touch n\'est pas sur votre roadmap',
        ],
      },
    },
    pricing: {
      ajnix: { en: 'Free (Pro from $39/mo)', fr: 'Gratuit (Pro à partir de 39 $/mois)' },
      them: { en: '$99/yr to $399/yr', fr: '99 $/an à 399 $/an' },
    },
    categories: [
      cat('Attribution', 'Attribution', [
        { label: { en: 'Real multi-touch attribution', fr: 'Vraie attribution multi-touch' }, ajnix: 'yes', them: 'no' },
        { label: { en: 'Six attribution models', fr: 'Six modèles d\'attribution' }, ajnix: 'yes', them: 'no' },
        { label: { en: 'Data-driven (ML) model', fr: 'Modèle data-driven (ML)' }, ajnix: 'yes', them: 'no' },
        { label: { en: 'Last-click only fallback', fr: 'Fallback last-click seulement' }, ajnix: 'yes', them: 'yes' },
      ]),
      cat('WooCommerce', 'WooCommerce', [
        { label: { en: 'Native order tracking', fr: 'Suivi des commandes natif' }, ajnix: 'yes', them: 'partial', note: { en: 'Via GA4 events, not native', fr: 'Via events GA4, pas natif' } },
        { label: { en: 'COGS / net profit', fr: 'COGS / profit net' }, ajnix: 'yes', them: 'no' },
        { label: { en: 'Per-channel ROAS', fr: 'ROAS par canal' }, ajnix: 'yes', them: 'partial' },
      ]),
      cat('Privacy', 'Vie privée', [
        { label: { en: 'Privacy-first by default', fr: 'Privacy-first par défaut' }, ajnix: 'yes', them: 'no' },
        { label: { en: 'No consent banner needed', fr: 'Aucun bandeau de consentement requis' }, ajnix: 'yes', them: 'no' },
        { label: { en: 'Self-hosted data', fr: 'Données auto-hébergées' }, ajnix: 'yes', them: 'no' },
      ]),
      cat('Operations', 'Opérations', [
        { label: { en: 'French native UI', fr: 'UI française native' }, ajnix: 'yes', them: 'no' },
        { label: { en: 'Unlimited sites on Free', fr: 'Sites illimités en gratuit' }, ajnix: 'yes', them: 'no' },
        { label: { en: 'Made in Canada', fr: 'Fait au Canada' }, ajnix: 'yes', them: 'no' },
      ]),
    ],
    updatedOn: '2026-04-21',
  },

  'google-analytics-4': {
    slug: 'google-analytics-4',
    name: 'Google Analytics 4',
    tagline: {
      en: 'Free, ubiquitous, and built for everything except WooCommerce attribution',
      fr: 'Gratuit, omniprésent, et conçu pour tout sauf l\'attribution WooCommerce',
    },
    hero: {
      h1: {
        en: 'Ajnix vs Google Analytics 4: the WooCommerce attribution comparison',
        fr: 'Ajnix vs Google Analytics 4 : la comparaison attribution WooCommerce',
      },
      subtitle: {
        en: 'GA4 is free, but the real cost is hours of setup, sampling that hides your best channels, and a fundamentally last-click view of your funnel. Here is when each makes sense.',
        fr: 'GA4 est gratuit, mais le vrai coût est des heures de configuration, un échantillonnage qui cache vos meilleurs canaux, et une vue fondamentalement last-click de votre funnel. Voici quand chacun a du sens.',
      },
    },
    verdict: {
      en: {
        chooseAjnix: [
          'Your store is on WooCommerce and attribution accuracy matters',
          'You want a tool you can install in 5 minutes, not 5 weeks',
          'You want to keep your data on your own servers',
          'You sell internationally and care about consent compliance',
        ],
        chooseThem: [
          'You need cross-platform site + app tracking',
          'You depend on the broader Google Marketing Platform',
          'You have a dedicated analytics team that already knows GA4',
          'Free at any scale matters more than attribution accuracy',
        ],
      },
      fr: {
        chooseAjnix: [
          'Votre boutique est sur WooCommerce et la précision d\'attribution compte',
          'Vous voulez un outil installable en 5 minutes, pas 5 semaines',
          'Vous voulez garder vos données sur vos propres serveurs',
          'Vous vendez à l\'international et vous souciez du consentement',
        ],
        chooseThem: [
          'Vous avez besoin de tracking site + app cross-plateforme',
          'Vous dépendez de la Google Marketing Platform élargie',
          'Vous avez une équipe analytics dédiée qui connaît déjà GA4',
          'Le gratuit à toute échelle compte plus que la précision d\'attribution',
        ],
      },
    },
    pricing: {
      ajnix: { en: 'Free (Pro from $39/mo)', fr: 'Gratuit (Pro à partir de 39 $/mois)' },
      them: { en: 'Free (GA4 360 from $50k/yr)', fr: 'Gratuit (GA4 360 à partir de 50 000 $/an)' },
    },
    categories: [
      cat('Attribution', 'Attribution', [
        { label: { en: 'Real multi-touch attribution', fr: 'Vraie attribution multi-touch' }, ajnix: 'yes', them: 'partial' },
        { label: { en: 'Six attribution models', fr: 'Six modèles d\'attribution' }, ajnix: 'yes', them: 'partial' },
        { label: { en: 'No data sampling', fr: 'Aucun échantillonnage de données' }, ajnix: 'yes', them: 'no' },
      ]),
      cat('WooCommerce', 'WooCommerce', [
        { label: { en: 'Native WooCommerce orders', fr: 'Commandes WooCommerce natives' }, ajnix: 'yes', them: 'no' },
        { label: { en: 'COGS, fees, refunds', fr: 'COGS, frais, remboursements' }, ajnix: 'yes', them: 'no' },
        { label: { en: 'No GTM required', fr: 'Aucun GTM requis' }, ajnix: 'yes', them: 'no' },
      ]),
      cat('Privacy & ops', 'Vie privée & ops', [
        { label: { en: 'Self-hosted data', fr: 'Données auto-hébergées' }, ajnix: 'yes', them: 'no' },
        { label: { en: 'No consent banner needed', fr: 'Aucun bandeau de consentement requis' }, ajnix: 'yes', them: 'no' },
        { label: { en: 'Setup in under 5 min', fr: 'Configuration en moins de 5 min' }, ajnix: 'yes', them: 'no' },
        { label: { en: 'French native UI', fr: 'UI française native' }, ajnix: 'yes', them: 'yes' },
      ]),
    ],
    updatedOn: '2026-04-21',
  },

  'woocommerce-analytics': {
    slug: 'woocommerce-analytics',
    name: 'WooCommerce Analytics',
    tagline: {
      en: 'The official analytics built into WooCommerce. Solid for orders, blind for marketing.',
      fr: 'L\'analytique officielle intégrée à WooCommerce. Solide pour les commandes, aveugle pour le marketing.',
    },
    hero: {
      h1: {
        en: 'Ajnix vs WooCommerce Analytics: the marketing attribution gap',
        fr: 'Ajnix vs WooCommerce Analytics : le gap d\'attribution marketing',
      },
      subtitle: {
        en: 'WooCommerce Analytics is great at counting your orders. It can\'t tell you which marketing channels drove them. Ajnix fills that gap with real attribution on top of the same data.',
        fr: 'WooCommerce Analytics est excellent pour compter vos commandes. Il ne peut pas vous dire quels canaux marketing les ont générées. Ajnix comble ce gap avec une vraie attribution par-dessus les mêmes données.',
      },
    },
    verdict: {
      en: {
        chooseAjnix: [
          'You want to know which marketing channels drive orders, not just count them',
          'You need multi-touch attribution across the customer journey',
          'You want native ads sync (in Pro)',
          'You want goals beyond orders (form submits, downloads, custom events)',
        ],
        chooseThem: [
          'You only need order reports inside WordPress, no marketing analysis',
          'You don\'t want to add another plugin to your stack',
          'Last-click attribution via UTMs is enough for your decisions',
          'You don\'t care about COGS, fees or net profit',
        ],
      },
      fr: {
        chooseAjnix: [
          'Vous voulez savoir quels canaux marketing génèrent les commandes, pas juste les compter',
          'Vous avez besoin d\'attribution multi-touch sur le parcours client',
          'Vous voulez de la sync ads native (en Pro)',
          'Vous voulez des objectifs au-delà des commandes (formulaires, téléchargements, events custom)',
        ],
        chooseThem: [
          'Vous avez juste besoin de rapports de commandes dans WordPress, pas d\'analyse marketing',
          'Vous ne voulez pas ajouter un autre plugin à votre stack',
          'L\'attribution last-click via UTM suffit pour vos décisions',
          'Vous ne vous souciez pas de COGS, frais ou profit net',
        ],
      },
    },
    pricing: {
      ajnix: { en: 'Free (Pro from $39/mo)', fr: 'Gratuit (Pro à partir de 39 $/mois)' },
      them: { en: 'Free (built-in)', fr: 'Gratuit (intégré)' },
    },
    categories: [
      cat('Attribution', 'Attribution', [
        { label: { en: 'Multi-touch attribution', fr: 'Attribution multi-touch' }, ajnix: 'yes', them: 'no' },
        { label: { en: 'Six attribution models', fr: 'Six modèles d\'attribution' }, ajnix: 'yes', them: 'no' },
        { label: { en: 'Data-driven (ML) model', fr: 'Modèle data-driven (ML)' }, ajnix: 'yes', them: 'no' },
      ]),
      cat('Tracking', 'Suivi', [
        { label: { en: 'Order tracking', fr: 'Suivi des commandes' }, ajnix: 'yes', them: 'yes' },
        { label: { en: 'Custom goals (forms, etc.)', fr: 'Objectifs personnalisés (formulaires, etc.)' }, ajnix: 'yes', them: 'no' },
        { label: { en: 'Manual marketing costs', fr: 'Coûts marketing manuels' }, ajnix: 'yes', them: 'no' },
        { label: { en: 'Real-time visitor stream', fr: 'Flux de visiteurs en temps réel' }, ajnix: 'yes', them: 'no' },
      ]),
      cat('Ads sync', 'Sync ads', [
        { label: { en: 'Google Ads + Meta', fr: 'Google Ads + Meta' }, ajnix: 'yes', them: 'no' },
        { label: { en: 'LinkedIn / TikTok / etc.', fr: 'LinkedIn / TikTok / etc.' }, ajnix: 'yes', them: 'no' },
      ]),
    ],
    updatedOn: '2026-04-21',
  },
};

export const competitorSlugs = Object.keys(competitors);

export function getCompetitor(slug: string): Competitor | null {
  return competitors[slug] ?? null;
}
