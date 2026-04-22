export type BlogPostSeed = {
  slug: string;
  locales: {
    en: { title: string; excerpt: string; content: string };
    fr: { title: string; excerpt: string; content: string };
  };
  category: 'Attribution' | 'WooCommerce' | 'Marketing' | 'Privacy' | 'Tutorials' | 'Comparisons' | 'Product';
  readingMinutes: number;
  author: { name: string; role: string };
  publishedAt: string; // ISO
  gradient: [string, string];
  featured?: boolean;
};

const articleBody = (kind: 'long' | 'short') => {
  if (kind === 'short') {
    return `<p>Ajnix gives you honest attribution without the setup circus. Plug the plugin in, connect WooCommerce, and within minutes you see the revenue each channel <em>actually</em> drives — not what last-click insists on.</p>
<h2>Why last-click is lying to you</h2>
<p>Last-click attribution hands all the credit to whatever brought a visitor to the checkout page. That ignores every touch that came before — the Instagram post that introduced your brand, the newsletter that kept them warm, the comparison article that tipped them over.</p>
<blockquote>Attribution is no longer a commodity — it's a competitive edge.</blockquote>
<h2>What changes with multi-touch</h2>
<p>With six models side by side you stop arguing about which is "right" and start seeing which channels consistently show up across all of them. That's the signal worth funding.</p>
<h3>Getting started</h3>
<ul><li>Install the plugin.</li><li>Verify tracking.</li><li>Set your first goal.</li></ul>
<p>Takes five minutes.</p>`;
  }
  return `<p>Running an e-commerce operation in 2026 without real attribution is like flying without an altimeter. You might land fine, but most of your decisions are vibes.</p>
<h2>The last-click problem</h2>
<p>Last-click attribution is the default in Google Analytics for a reason: it's computationally trivial. The browser knows where the visitor came from when they hit the order confirmation, so Google logs it. Done.</p>
<p>Except the last channel before conversion is very rarely the channel that <em>earned</em> the conversion. It's just the channel that happened to be last. A direct-to-site visit. A branded search. A remarketing ad that the user was going to click anyway because they'd already decided to buy.</p>
<h2>Six models, six truths</h2>
<p>Ajnix gives you six attribution models side by side:</p>
<ul>
<li><strong>Last-touch</strong> — for comparison, and for short purchase cycles.</li>
<li><strong>First-touch</strong> — where the journey began.</li>
<li><strong>Linear</strong> — equal credit everywhere.</li>
<li><strong>Time-decay</strong> — more credit to touches near conversion.</li>
<li><strong>Position-based</strong> — 40/20/40 across first, middle, last.</li>
<li><strong>Data-driven</strong> — a Markov model trained on your own journeys.</li>
</ul>
<blockquote>Don't pick a model. Pick <em>all six</em> and look at which channels show up across the board.</blockquote>
<h3>What good looks like</h3>
<p>A channel that gets 20% of revenue in Last-touch, 35% in First-touch, and 28% in Data-driven is doing real work across the funnel. A channel that gets 40% in Last-touch but 5% in First-touch is probably being over-credited by default dashboards.</p>
<h2>How it's built</h2>
<p>Every event is stored in your own WordPress database. No third-party servers. The attribution calculations run in a background queue on your server, with results cached so dashboards load instantly.</p>
<h3>Getting started</h3>
<p>Install from WordPress.org, activate, and Ajnix auto-detects WooCommerce. The first attribution dashboard is ready within 30 minutes of your first order.</p>`;
};

export const blogPostsSeed: BlogPostSeed[] = [
  {
    slug: 'why-last-click-attribution-is-lying-to-you',
    category: 'Attribution',
    readingMinutes: 8,
    author: { name: 'Eric St-Amant', role: 'Founder, Ajnix' },
    publishedAt: '2026-04-14',
    gradient: ['#6366f1', '#a855f7'],
    featured: true,
    locales: {
      en: {
        title: 'Why last-click attribution is lying to you',
        excerpt:
          'Default dashboards give the last channel all the credit. That makes sense for a database. It makes zero sense for how you should spend your marketing budget.',
        content: articleBody('long'),
      },
      fr: {
        title: 'Pourquoi l\'attribution last-click vous ment',
        excerpt:
          'Les tableaux de bord par défaut donnent tout le crédit au dernier canal. Ça a du sens pour une base de données. Aucun sens pour décider où dépenser votre budget marketing.',
        content: articleBody('long'),
      },
    },
  },
  {
    slug: 'markov-attribution-explained-plain-english',
    category: 'Attribution',
    readingMinutes: 12,
    author: { name: 'Eric St-Amant', role: 'Founder, Ajnix' },
    publishedAt: '2026-04-08',
    gradient: ['#a855f7', '#ec4899'],
    locales: {
      en: {
        title: 'Markov attribution, explained in plain English',
        excerpt: 'No math degree required. What a Markov model does with your customer journeys, and why the "removal effect" changes how you read your channel mix.',
        content: articleBody('short'),
      },
      fr: {
        title: 'L\'attribution Markov, expliquée en français',
        excerpt: 'Pas besoin d\'un diplôme en maths. Ce qu\'un modèle Markov fait avec vos parcours clients, et pourquoi « l\'effet de retrait » change la lecture de votre mix canaux.',
        content: articleBody('short'),
      },
    },
  },
  {
    slug: 'woocommerce-cogs-how-to-track-true-net-profit',
    category: 'WooCommerce',
    readingMinutes: 6,
    author: { name: 'Eric St-Amant', role: 'Founder, Ajnix' },
    publishedAt: '2026-04-01',
    gradient: ['#6366f1', '#06b6d4'],
    locales: {
      en: {
        title: 'WooCommerce COGS: how to track true net profit per channel',
        excerpt: 'Gross revenue is vanity. Net profit is sanity. Three ways to surface cost of goods, payment fees and refunds in your WooCommerce dashboards.',
        content: articleBody('short'),
      },
      fr: {
        title: 'COGS WooCommerce : suivre le vrai profit net par canal',
        excerpt: 'Le revenu brut est une vanité. Le profit net est une sanité. Trois façons de faire ressortir COGS, frais et remboursements dans vos tableaux WooCommerce.',
        content: articleBody('short'),
      },
    },
  },
  {
    slug: 'do-you-really-need-a-consent-banner',
    category: 'Privacy',
    readingMinutes: 5,
    author: { name: 'Eric St-Amant', role: 'Founder, Ajnix' },
    publishedAt: '2026-03-24',
    gradient: ['#6366f1', '#a855f7'],
    locales: {
      en: {
        title: 'Do you really need a consent banner?',
        excerpt: 'GDPR, PIPEDA, CCPA — what each actually requires, what they don\'t, and why IP truncation plus email hashing gets you compliant in most stores.',
        content: articleBody('short'),
      },
      fr: {
        title: 'Avez-vous vraiment besoin d\'un bandeau de consentement ?',
        excerpt: 'RGPD, PIPEDA, CCPA — ce que chacun exige réellement, ce qu\'il n\'exige pas, et pourquoi la troncature IP et le hachage email suffisent dans la plupart des boutiques.',
        content: articleBody('short'),
      },
    },
  },
  {
    slug: 'ajnix-vs-monsterinsights-honest-comparison',
    category: 'Comparisons',
    readingMinutes: 7,
    author: { name: 'Eric St-Amant', role: 'Founder, Ajnix' },
    publishedAt: '2026-03-17',
    gradient: ['#a855f7', '#6366f1'],
    locales: {
      en: {
        title: 'Ajnix vs MonsterInsights: an honest comparison',
        excerpt: 'MonsterInsights is a GA4 wrapper with a nice UI. Ajnix is a real attribution tool. Pick based on what problem you\'re actually solving.',
        content: articleBody('short'),
      },
      fr: {
        title: 'Ajnix vs MonsterInsights : une comparaison honnête',
        excerpt: 'MonsterInsights est un wrapper GA4 avec une belle UI. Ajnix est un vrai outil d\'attribution. Choisissez selon le problème que vous résolvez vraiment.',
        content: articleBody('short'),
      },
    },
  },
  {
    slug: 'utm-parameters-the-tiny-guide-that-saves-you-months',
    category: 'Marketing',
    readingMinutes: 4,
    author: { name: 'Eric St-Amant', role: 'Founder, Ajnix' },
    publishedAt: '2026-03-10',
    gradient: ['#ec4899', '#6366f1'],
    locales: {
      en: {
        title: 'UTM parameters: the tiny guide that saves you months',
        excerpt: 'Five rules for UTM hygiene. Your future self and your attribution tool will both thank you.',
        content: articleBody('short'),
      },
      fr: {
        title: 'Paramètres UTM : le petit guide qui vous fait gagner des mois',
        excerpt: 'Cinq règles d\'hygiène UTM. Votre futur vous et votre outil d\'attribution vous remercieront.',
        content: articleBody('short'),
      },
    },
  },
  {
    slug: 'setting-up-ajnix-on-woocommerce-in-under-5-minutes',
    category: 'Tutorials',
    readingMinutes: 5,
    author: { name: 'Eric St-Amant', role: 'Founder, Ajnix' },
    publishedAt: '2026-03-03',
    gradient: ['#06b6d4', '#6366f1'],
    locales: {
      en: {
        title: 'Set up Ajnix on WooCommerce in under 5 minutes',
        excerpt: 'Install, verify, goal. The three steps that get you from zero to an attribution dashboard faster than your Monday coffee break.',
        content: articleBody('short'),
      },
      fr: {
        title: 'Installer Ajnix sur WooCommerce en moins de 5 minutes',
        excerpt: 'Installer, vérifier, objectif. Les trois étapes qui vous amènent de zéro à un dashboard d\'attribution plus vite qu\'une pause café.',
        content: articleBody('short'),
      },
    },
  },
  {
    slug: 'the-real-cost-of-ga4-for-e-commerce',
    category: 'Marketing',
    readingMinutes: 9,
    author: { name: 'Eric St-Amant', role: 'Founder, Ajnix' },
    publishedAt: '2026-02-24',
    gradient: ['#f97316', '#ec4899'],
    locales: {
      en: {
        title: 'The real cost of GA4 for e-commerce',
        excerpt: '"Free" doesn\'t mean free. Counting the hours spent wrestling with sampling, data stream configs, and conversion events that mysteriously drift.',
        content: articleBody('short'),
      },
      fr: {
        title: 'Le vrai coût de GA4 pour l\'e-commerce',
        excerpt: '« Gratuit » ne veut pas dire gratuit. Compter les heures passées à lutter contre l\'échantillonnage, les data streams et les events qui dérivent mystérieusement.',
        content: articleBody('short'),
      },
    },
  },
  {
    slug: 'what-changed-in-ajnix-1-2',
    category: 'Product',
    readingMinutes: 3,
    author: { name: 'Eric St-Amant', role: 'Founder, Ajnix' },
    publishedAt: '2026-02-17',
    gradient: ['#6366f1', '#a855f7'],
    locales: {
      en: {
        title: 'What changed in Ajnix 1.2',
        excerpt: 'HPOS fully supported. New form provider integrations. Per-product COGS imports. All the details, and the one breaking change.',
        content: articleBody('short'),
      },
      fr: {
        title: 'Ce qui a changé dans Ajnix 1.2',
        excerpt: 'HPOS entièrement supporté. Nouvelles intégrations de formulaires. Imports COGS par produit. Tous les détails, et le breaking change à connaître.',
        content: articleBody('short'),
      },
    },
  },
];
