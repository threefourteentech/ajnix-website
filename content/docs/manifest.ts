// Single source of truth for the docs tree.
// Consumed by the sidebar, prev/next, sitemap, and static params.
//
// Slug convention:
//   ''                                    -> /docs (home)
//   'getting-started/installation'        -> /docs/getting-started/installation
//
// Add an entry here first, then create the MDX file at:
//   content/docs/{en|fr}/{slug}.mdx
//   (home page lives at content/docs/{en|fr}/index.mdx)

import type { Locale } from '@/i18n/routing';

export type Tier = 'free' | 'pro' | 'agency';
export type DocPhase = 'phase1' | 'phase2' | 'phase2b';

export type DocEntry = {
  slug: string;
  titles: Record<Locale, string>;
  tier?: Tier;
  phase?: DocPhase;
  children?: DocEntry[];
};

export type DocSectionKind =
  | 'tutorials'
  | 'concepts'
  | 'guides'
  | 'reference'
  | 'integrations'
  | 'security'
  | 'meta';

export type DocSection = {
  id: string;
  kind: DocSectionKind;
  titles: Record<Locale, string>;
  entries: DocEntry[];
};

// ---------------------------------------------------------------------------
// Home and top-level standalone pages
// ---------------------------------------------------------------------------

const home: DocEntry = {
  slug: '',
  titles: { en: 'Documentation', fr: 'Documentation' },
};

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

const gettingStarted: DocSection = {
  id: 'getting-started',
  kind: 'tutorials',
  titles: { en: 'Getting started', fr: 'Démarrage' },
  entries: [
    {
      slug: 'getting-started/installation',
      titles: { en: 'Installation', fr: 'Installation' },
    },
    {
      slug: 'getting-started/premier-dashboard',
      titles: { en: 'First dashboard', fr: 'Premier dashboard' },
    },
    {
      slug: 'getting-started/verifier-tracking',
      titles: { en: 'Verify tracking', fr: 'Vérifier le tracking' },
    },
    {
      slug: 'getting-started/premier-objectif',
      titles: { en: 'Your first goal', fr: 'Premier objectif' },
    },
    {
      slug: 'getting-started/en-5-minutes',
      titles: { en: 'Ajnix in 5 minutes', fr: 'Ajnix en 5 minutes' },
    },
  ],
};

const concepts: DocSection = {
  id: 'concepts',
  kind: 'concepts',
  titles: { en: 'Concepts', fr: 'Concepts' },
  entries: [
    {
      slug: 'concepts/attribution-multi-touch',
      titles: { en: 'Multi-touch attribution', fr: 'Attribution multi-touch' },
    },
    {
      slug: 'concepts/modeles-attribution',
      titles: { en: 'Attribution models', fr: "Modèles d'attribution" },
      children: [
        {
          slug: 'concepts/modeles-attribution/last-touch',
          titles: { en: 'Last-touch', fr: 'Last-touch' },
          tier: 'free',
        },
        {
          slug: 'concepts/modeles-attribution/first-touch',
          titles: { en: 'First-touch', fr: 'First-touch' },
          tier: 'pro',
        },
        {
          slug: 'concepts/modeles-attribution/lineaire',
          titles: { en: 'Linear', fr: 'Linéaire' },
          tier: 'pro',
        },
        {
          slug: 'concepts/modeles-attribution/time-decay',
          titles: { en: 'Time-decay', fr: 'Time-decay' },
          tier: 'pro',
        },
        {
          slug: 'concepts/modeles-attribution/position-based',
          titles: { en: 'Position-based', fr: 'Position-based' },
          tier: 'pro',
        },
        {
          slug: 'concepts/modeles-attribution/data-driven',
          titles: { en: 'Data-driven', fr: 'Data-driven' },
          tier: 'pro',
        },
      ],
    },
    {
      slug: 'concepts/touchpoints-vs-sessions',
      titles: { en: 'Touchpoints vs sessions', fr: 'Touchpoints vs sessions' },
    },
    {
      slug: 'concepts/vrai-revenu-vs-ventes-brutes',
      titles: { en: 'Net revenue vs gross sales', fr: 'Vrai revenu vs ventes brutes' },
    },
    {
      slug: 'concepts/multi-currency',
      titles: { en: 'Multi-currency', fr: 'Multi-devises' },
    },
    {
      slug: 'concepts/privacy-by-design',
      titles: { en: 'Privacy by design', fr: 'Privacy by design' },
    },
    {
      slug: 'concepts/server-side-vs-client-side',
      titles: { en: 'Server-side vs client-side', fr: 'Server-side vs client-side' },
      tier: 'pro',
    },
  ],
};

const guides: DocSection = {
  id: 'guides',
  kind: 'guides',
  titles: { en: 'How-to guides', fr: 'Guides pratiques' },
  entries: [
    {
      slug: 'guides/tracking',
      titles: { en: 'Tracking', fr: 'Tracking' },
      children: [
        { slug: 'guides/tracking/configurer-woocommerce', titles: { en: 'Configure WooCommerce', fr: 'Configurer WooCommerce' } },
        { slug: 'guides/tracking/integrer-un-formulaire', titles: { en: 'Integrate a form', fr: 'Intégrer un formulaire' } },
        { slug: 'guides/tracking/tracker-un-clic-custom', titles: { en: 'Track a custom click', fr: 'Tracker un clic custom' } },
        { slug: 'guides/tracking/exclure-admins-du-tracking', titles: { en: 'Exclude admins from tracking', fr: 'Exclure les admins du tracking' } },
        { slug: 'guides/tracking/definir-objectifs-personnalises', titles: { en: 'Custom goals', fr: 'Définir des objectifs personnalisés' } },
        { slug: 'guides/tracking/self-hoster-le-tracker', titles: { en: 'Self-host the tracker', fr: 'Self-hoster le tracker' } },
      ],
    },
    {
      slug: 'guides/attribution',
      titles: { en: 'Attribution', fr: 'Attribution' },
      children: [
        { slug: 'guides/attribution/choisir-son-modele', titles: { en: 'Choose your model', fr: 'Choisir son modèle' } },
        { slug: 'guides/attribution/interpreter-le-dashboard', titles: { en: 'Read the dashboard', fr: 'Interpréter le dashboard' } },
        { slug: 'guides/attribution/comparer-modeles', titles: { en: 'Compare models', fr: 'Comparer les modèles' }, tier: 'pro' },
        { slug: 'guides/attribution/debugger-touchpoints', titles: { en: 'Debug touchpoints', fr: 'Débugger les touchpoints' } },
      ],
    },
    {
      slug: 'guides/revenue',
      titles: { en: 'Revenue', fr: 'Revenu' },
      children: [
        { slug: 'guides/revenue/configurer-cogs', titles: { en: 'Configure COGS', fr: 'Configurer les COGS' } },
        { slug: 'guides/revenue/importer-cogs-csv', titles: { en: 'Import COGS from CSV', fr: 'Importer les COGS via CSV' }, tier: 'pro' },
        { slug: 'guides/revenue/ajouter-couts-manuels', titles: { en: 'Add manual costs', fr: 'Ajouter des coûts manuels' } },
        { slug: 'guides/revenue/calculer-vrai-roas', titles: { en: 'Calculate true ROAS', fr: 'Calculer le vrai ROAS' } },
        { slug: 'guides/revenue/gerer-remboursements', titles: { en: 'Handle refunds', fr: 'Gérer les remboursements' } },
        { slug: 'guides/revenue/frais-de-transaction', titles: { en: 'Transaction fees', fr: 'Frais de transaction' } },
      ],
    },
    {
      slug: 'guides/utm-links',
      titles: { en: 'UTM links', fr: 'Liens UTM' },
      children: [
        { slug: 'guides/utm-links/creer-un-lien-utm', titles: { en: 'Create a UTM link', fr: 'Créer un lien UTM' } },
        { slug: 'guides/utm-links/preregler-des-campagnes', titles: { en: 'Preset campaigns', fr: 'Préregler des campagnes' } },
        { slug: 'guides/utm-links/exporter-un-qr-code', titles: { en: 'Export a QR code', fr: 'Exporter un QR code' } },
      ],
    },
    {
      slug: 'guides/multi-currency',
      titles: { en: 'Multi-currency', fr: 'Multi-devises' },
      tier: 'pro',
      phase: 'phase2',
      children: [
        { slug: 'guides/multi-currency/sites-multi-devises', titles: { en: 'Multi-currency sites', fr: 'Sites multi-devises' } },
        { slug: 'guides/multi-currency/configurer-avec-aelia', titles: { en: 'Configure with Aelia', fr: 'Configurer avec Aelia' }, tier: 'pro' },
        { slug: 'guides/multi-currency/configurer-avec-wpml', titles: { en: 'Configure with WPML', fr: 'Configurer avec WPML' }, tier: 'pro' },
        { slug: 'guides/multi-currency/configurer-avec-fox', titles: { en: 'Configure with FOX', fr: 'Configurer avec FOX' }, tier: 'pro' },
        { slug: 'guides/multi-currency/fallback-taux-fx', titles: { en: 'FX rate fallback', fr: 'Fallback des taux FX' }, tier: 'pro' },
      ],
    },
    {
      slug: 'guides/server-side-conversions',
      titles: { en: 'Server-side conversions', fr: 'Conversions server-side' },
      tier: 'pro',
      children: [
        { slug: 'guides/server-side-conversions/setup-meta-capi', titles: { en: 'Meta CAPI setup', fr: 'Setup Meta CAPI' }, tier: 'pro' },
        { slug: 'guides/server-side-conversions/setup-google-enhanced', titles: { en: 'Google Enhanced setup', fr: 'Setup Google Enhanced' }, tier: 'pro' },
        { slug: 'guides/server-side-conversions/setup-tiktok-events', titles: { en: 'TikTok Events setup', fr: 'Setup TikTok Events' }, tier: 'pro', phase: 'phase2b' },
        { slug: 'guides/server-side-conversions/setup-pinterest-capi', titles: { en: 'Pinterest CAPI setup', fr: 'Setup Pinterest CAPI' }, tier: 'pro', phase: 'phase2b' },
        { slug: 'guides/server-side-conversions/setup-linkedin', titles: { en: 'LinkedIn setup', fr: 'Setup LinkedIn' }, tier: 'agency' },
        { slug: 'guides/server-side-conversions/gestion-consent-mode', titles: { en: 'Consent Mode', fr: 'Gestion du Consent Mode' }, tier: 'pro' },
        { slug: 'guides/server-side-conversions/dedup-pixel-et-server', titles: { en: 'Dedup pixel + server', fr: 'Dédup pixel et server' }, tier: 'pro' },
        { slug: 'guides/server-side-conversions/debugger-destinations', titles: { en: 'Debug destinations', fr: 'Debugger les destinations' }, tier: 'pro' },
      ],
    },
    {
      slug: 'guides/ads-sync',
      titles: { en: 'Ads sync', fr: 'Synchronisation publicitaire' },
      tier: 'pro',
      children: [
        { slug: 'guides/ads-sync/connecter-google-ads', titles: { en: 'Connect Google Ads', fr: 'Connecter Google Ads' }, tier: 'pro' },
        { slug: 'guides/ads-sync/connecter-meta-ads', titles: { en: 'Connect Meta Ads', fr: 'Connecter Meta Ads' }, tier: 'pro' },
        { slug: 'guides/ads-sync/connecter-tiktok-ads', titles: { en: 'Connect TikTok Ads', fr: 'Connecter TikTok Ads' }, tier: 'pro', phase: 'phase2b' },
        { slug: 'guides/ads-sync/connecter-pinterest-ads', titles: { en: 'Connect Pinterest Ads', fr: 'Connecter Pinterest Ads' }, tier: 'pro', phase: 'phase2b' },
      ],
    },
    {
      slug: 'guides/integrations',
      titles: { en: 'Integrations', fr: 'Intégrations' },
      children: [
        { slug: 'guides/integrations/cookiebot', titles: { en: 'Cookiebot', fr: 'Cookiebot' } },
        { slug: 'guides/integrations/cookieyes', titles: { en: 'CookieYes', fr: 'CookieYes' } },
        { slug: 'guides/integrations/complianz', titles: { en: 'Complianz', fr: 'Complianz' } },
        { slug: 'guides/integrations/iubenda', titles: { en: 'Iubenda', fr: 'Iubenda' } },
        { slug: 'guides/integrations/wp-rocket', titles: { en: 'WP Rocket', fr: 'WP Rocket' } },
        { slug: 'guides/integrations/cloudflare', titles: { en: 'Cloudflare', fr: 'Cloudflare' } },
      ],
    },
    {
      slug: 'guides/migration',
      titles: { en: 'Migration', fr: 'Migration' },
      children: [
        { slug: 'guides/migration/depuis-monsterinsights', titles: { en: 'From MonsterInsights', fr: 'Depuis MonsterInsights' } },
        { slug: 'guides/migration/depuis-ga4', titles: { en: 'From GA4', fr: 'Depuis GA4' } },
        { slug: 'guides/migration/depuis-matomo', titles: { en: 'From Matomo', fr: 'Depuis Matomo' } },
        { slug: 'guides/migration/depuis-wc-analytics', titles: { en: 'From WC Analytics', fr: 'Depuis WC Analytics' } },
      ],
    },
    {
      slug: 'guides/multi-sites',
      titles: { en: 'Multi-sites', fr: 'Multi-sites' },
      tier: 'pro',
      children: [
        { slug: 'guides/multi-sites/ajouter-un-site', titles: { en: 'Add a site', fr: 'Ajouter un site' }, tier: 'pro' },
        { slug: 'guides/multi-sites/dashboard-centralise', titles: { en: 'Centralised dashboard', fr: 'Dashboard centralisé' }, tier: 'agency' },
        { slug: 'guides/multi-sites/gerer-les-permissions', titles: { en: 'Manage permissions', fr: 'Gérer les permissions' }, tier: 'agency' },
      ],
    },
    {
      slug: 'guides/troubleshooting',
      titles: { en: 'Troubleshooting', fr: 'Dépannage' },
      children: [
        { slug: 'guides/troubleshooting/events-ne-remontent-pas', titles: { en: "Events don't show up", fr: 'Les events ne remontent pas' } },
        { slug: 'guides/troubleshooting/chiffres-ne-correspondent-pas-au-wc', titles: { en: "Numbers don't match WooCommerce", fr: 'Les chiffres ne correspondent pas à WC' } },
        { slug: 'guides/troubleshooting/tracking-bloque-par-adblocker', titles: { en: 'Tracking blocked by adblocker', fr: 'Tracking bloqué par adblocker' } },
        { slug: 'guides/troubleshooting/staging-vs-production', titles: { en: 'Staging vs production', fr: 'Staging vs production' } },
        { slug: 'guides/troubleshooting/conflit-de-plugin', titles: { en: 'Plugin conflict', fr: 'Conflit de plugin' } },
        { slug: 'guides/troubleshooting/probleme-de-cache', titles: { en: 'Cache issues', fr: 'Problème de cache' } },
      ],
    },
  ],
};

const reference: DocSection = {
  id: 'reference',
  kind: 'reference',
  titles: { en: 'Reference', fr: 'Référence' },
  entries: [
    {
      slug: 'reference/tracker-js',
      titles: { en: 'Tracker JS', fr: 'Tracker JS' },
      children: [
        { slug: 'reference/tracker-js/api-publique', titles: { en: 'Public API', fr: 'API publique' } },
        { slug: 'reference/tracker-js/ajnix-event', titles: { en: 'ajnix.event()', fr: 'ajnix.event()' } },
        { slug: 'reference/tracker-js/ajnix-ready', titles: { en: 'ajnix.ready()', fr: 'ajnix.ready()' } },
        { slug: 'reference/tracker-js/ajnix-tracker-accessors', titles: { en: 'Tracker accessors', fr: 'Accesseurs du tracker' } },
        { slug: 'reference/tracker-js/click-ids-supportes', titles: { en: 'Supported click IDs', fr: 'Click IDs supportés' } },
      ],
    },
    {
      slug: 'reference/php-api',
      titles: { en: 'PHP API', fr: 'API PHP' },
      children: [
        {
          slug: 'reference/php-api/fonctions-publiques',
          titles: { en: 'Public functions', fr: 'Fonctions publiques' },
          children: [
            { slug: 'reference/php-api/fonctions-publiques/ajnix-get-site-id', titles: { en: 'ajnix_get_site_id', fr: 'ajnix_get_site_id' } },
            { slug: 'reference/php-api/fonctions-publiques/ajnix-is-premium', titles: { en: 'ajnix_is_premium', fr: 'ajnix_is_premium' } },
            { slug: 'reference/php-api/fonctions-publiques/ajnix-get-environment', titles: { en: 'ajnix_get_environment', fr: 'ajnix_get_environment' } },
            { slug: 'reference/php-api/fonctions-publiques/ajnix-get-visitor', titles: { en: 'ajnix_get_visitor', fr: 'ajnix_get_visitor' } },
            { slug: 'reference/php-api/fonctions-publiques/ajnix-get-session', titles: { en: 'ajnix_get_session', fr: 'ajnix_get_session' } },
            { slug: 'reference/php-api/fonctions-publiques/ajnix-get-attribution', titles: { en: 'ajnix_get_attribution', fr: 'ajnix_get_attribution' } },
            { slug: 'reference/php-api/fonctions-publiques/ajnix-get-conversions', titles: { en: 'ajnix_get_conversions', fr: 'ajnix_get_conversions' } },
            { slug: 'reference/php-api/fonctions-publiques/ajnix-track-event', titles: { en: 'ajnix_track_event', fr: 'ajnix_track_event' } },
            { slug: 'reference/php-api/fonctions-publiques/ajnix-track-conversion', titles: { en: 'ajnix_track_conversion', fr: 'ajnix_track_conversion' } },
            { slug: 'reference/php-api/fonctions-publiques/ajnix-track-purchase', titles: { en: 'ajnix_track_purchase', fr: 'ajnix_track_purchase' } },
            { slug: 'reference/php-api/fonctions-publiques/ajnix-identify-visitor', titles: { en: 'ajnix_identify_visitor', fr: 'ajnix_identify_visitor' }, tier: 'pro' },
            { slug: 'reference/php-api/fonctions-publiques/ajnix-register-goal', titles: { en: 'ajnix_register_goal', fr: 'ajnix_register_goal' } },
            { slug: 'reference/php-api/fonctions-publiques/ajnix-get-goal', titles: { en: 'ajnix_get_goal', fr: 'ajnix_get_goal' } },
          ],
        },
        {
          slug: 'reference/php-api/hooks-actions',
          titles: { en: 'Hooks (actions)', fr: 'Hooks (actions)' },
          children: [
            { slug: 'reference/php-api/hooks-actions/ajnix-before-track-event', titles: { en: 'ajnix_before_track_event', fr: 'ajnix_before_track_event' } },
            { slug: 'reference/php-api/hooks-actions/ajnix-after-track-event', titles: { en: 'ajnix_after_track_event', fr: 'ajnix_after_track_event' } },
            { slug: 'reference/php-api/hooks-actions/ajnix-after-track-conversion', titles: { en: 'ajnix_after_track_conversion', fr: 'ajnix_after_track_conversion' } },
            { slug: 'reference/php-api/hooks-actions/ajnix-session-started', titles: { en: 'ajnix_session_started', fr: 'ajnix_session_started' } },
            { slug: 'reference/php-api/hooks-actions/ajnix-visitor-identified', titles: { en: 'ajnix_visitor_identified', fr: 'ajnix_visitor_identified' }, tier: 'pro' },
            { slug: 'reference/php-api/hooks-actions/ajnix-goal-triggered', titles: { en: 'ajnix_goal_triggered', fr: 'ajnix_goal_triggered' } },
            { slug: 'reference/php-api/hooks-actions/ajnix-goal-created-updated-deleted', titles: { en: 'ajnix_goal_created/updated/deleted', fr: 'ajnix_goal_created/updated/deleted' } },
            { slug: 'reference/php-api/hooks-actions/ajnix-saved-link-created', titles: { en: 'ajnix_saved_link_created', fr: 'ajnix_saved_link_created' } },
            { slug: 'reference/php-api/hooks-actions/ajnix-product-cogs-updated', titles: { en: 'ajnix_product_cogs_updated', fr: 'ajnix_product_cogs_updated' } },
            { slug: 'reference/php-api/hooks-actions/ajnix-integration-activated', titles: { en: 'ajnix_integration_activated', fr: 'ajnix_integration_activated' } },
            { slug: 'reference/php-api/hooks-actions/ajnix-retention-purged', titles: { en: 'ajnix_retention_purged', fr: 'ajnix_retention_purged' } },
            { slug: 'reference/php-api/hooks-actions/ajnix-daily-aggregation-completed', titles: { en: 'ajnix_daily_aggregation_completed', fr: 'ajnix_daily_aggregation_completed' } },
          ],
        },
        {
          slug: 'reference/php-api/filters',
          titles: { en: 'Filters', fr: 'Filtres' },
          children: [
            { slug: 'reference/php-api/filters/ajnix-event-data', titles: { en: 'ajnix_event_data', fr: 'ajnix_event_data' } },
            { slug: 'reference/php-api/filters/ajnix-track-event', titles: { en: 'ajnix_track_event', fr: 'ajnix_track_event' } },
            { slug: 'reference/php-api/filters/ajnix-visitor-id', titles: { en: 'ajnix_visitor_id', fr: 'ajnix_visitor_id' } },
            { slug: 'reference/php-api/filters/ajnix-should-track-current-user', titles: { en: 'ajnix_should_track_current_user', fr: 'ajnix_should_track_current_user' } },
            { slug: 'reference/php-api/filters/ajnix-conversion-value', titles: { en: 'ajnix_conversion_value', fr: 'ajnix_conversion_value' } },
            { slug: 'reference/php-api/filters/ajnix-conversion-cogs', titles: { en: 'ajnix_conversion_cogs', fr: 'ajnix_conversion_cogs' } },
            { slug: 'reference/php-api/filters/ajnix-wc-revenue-breakdown', titles: { en: 'ajnix_wc_revenue_breakdown', fr: 'ajnix_wc_revenue_breakdown' } },
            { slug: 'reference/php-api/filters/ajnix-truncated-ip', titles: { en: 'ajnix_truncated_ip', fr: 'ajnix_truncated_ip' } },
            { slug: 'reference/php-api/filters/ajnix-geolocation', titles: { en: 'ajnix_geolocation', fr: 'ajnix_geolocation' } },
            { slug: 'reference/php-api/filters/ajnix-is-premium', titles: { en: 'ajnix_is_premium', fr: 'ajnix_is_premium' } },
            { slug: 'reference/php-api/filters/ajnix-plan', titles: { en: 'ajnix_plan', fr: 'ajnix_plan' } },
            { slug: 'reference/php-api/filters/ajnix-form-submit-metadata', titles: { en: 'ajnix_form_submit_metadata', fr: 'ajnix_form_submit_metadata' } },
            { slug: 'reference/php-api/filters/ajnix-form-submit-tracked', titles: { en: 'ajnix_form_submit_tracked', fr: 'ajnix_form_submit_tracked' } },
            { slug: 'reference/php-api/filters/ajnix-goal-match', titles: { en: 'ajnix_goal_match', fr: 'ajnix_goal_match' } },
            { slug: 'reference/php-api/filters/ajnix-goals-free-limit', titles: { en: 'ajnix_goals_free_limit', fr: 'ajnix_goals_free_limit' } },
            { slug: 'reference/php-api/filters/ajnix-manual-costs-free-limit', titles: { en: 'ajnix_manual_costs_free_limit', fr: 'ajnix_manual_costs_free_limit' } },
            { slug: 'reference/php-api/filters/ajnix-transaction-fee-meta-keys', titles: { en: 'ajnix_transaction_fee_meta_keys', fr: 'ajnix_transaction_fee_meta_keys' } },
            { slug: 'reference/php-api/filters/ajnix-tracker-cdn-url', titles: { en: 'ajnix_tracker_cdn_url', fr: 'ajnix_tracker_cdn_url' } },
            { slug: 'reference/php-api/filters/ajnix-should-inject-tracker', titles: { en: 'ajnix_should_inject_tracker', fr: 'ajnix_should_inject_tracker' } },
            { slug: 'reference/php-api/filters/ajnix-detected-forms', titles: { en: 'ajnix_detected_forms', fr: 'ajnix_detected_forms' } },
          ],
        },
      ],
    },
    {
      slug: 'reference/rest-api',
      titles: { en: 'REST API', fr: 'REST API' },
      children: [
        { slug: 'reference/rest-api/authentication', titles: { en: 'Authentication', fr: 'Authentification' } },
        { slug: 'reference/rest-api/rate-limiting', titles: { en: 'Rate limiting', fr: 'Rate limiting' } },
        {
          slug: 'reference/rest-api/ingestion',
          titles: { en: 'Ingestion', fr: 'Ingestion' },
          children: [
            { slug: 'reference/rest-api/ingestion/post-track', titles: { en: 'POST /track', fr: 'POST /track' } },
            { slug: 'reference/rest-api/ingestion/post-track-batch', titles: { en: 'POST /track/batch', fr: 'POST /track/batch' } },
          ],
        },
        {
          slug: 'reference/rest-api/analytics',
          titles: { en: 'Analytics', fr: 'Analytics' },
          children: [
            { slug: 'reference/rest-api/analytics/get-overview', titles: { en: 'GET /overview', fr: 'GET /overview' } },
            { slug: 'reference/rest-api/analytics/get-attribution', titles: { en: 'GET /attribution', fr: 'GET /attribution' } },
            { slug: 'reference/rest-api/analytics/get-ecommerce', titles: { en: 'GET /ecommerce', fr: 'GET /ecommerce' } },
            { slug: 'reference/rest-api/analytics/get-setup-checklist', titles: { en: 'GET /setup-checklist', fr: 'GET /setup-checklist' } },
          ],
        },
        {
          slug: 'reference/rest-api/events-conversions',
          titles: { en: 'Events & conversions', fr: 'Events et conversions' },
          children: [
            { slug: 'reference/rest-api/events-conversions/get-events', titles: { en: 'GET /events', fr: 'GET /events' } },
            { slug: 'reference/rest-api/events-conversions/get-conversions', titles: { en: 'GET /conversions', fr: 'GET /conversions' } },
          ],
        },
        {
          slug: 'reference/rest-api/goals',
          titles: { en: 'Goals', fr: 'Objectifs' },
          children: [
            { slug: 'reference/rest-api/goals/crud-goals', titles: { en: 'CRUD /goals', fr: 'CRUD /goals' } },
            { slug: 'reference/rest-api/goals/toggle-goal', titles: { en: 'Toggle goal', fr: 'Toggle goal' } },
            { slug: 'reference/rest-api/goals/detected-forms', titles: { en: 'Detected forms', fr: 'Formulaires détectés' } },
          ],
        },
        {
          slug: 'reference/rest-api/costs',
          titles: { en: 'Costs', fr: 'Coûts' },
          children: [
            { slug: 'reference/rest-api/costs/manual-costs', titles: { en: 'Manual costs', fr: 'Coûts manuels' } },
            { slug: 'reference/rest-api/costs/product-cogs', titles: { en: 'Product COGS', fr: 'COGS produit' } },
            { slug: 'reference/rest-api/costs/transaction-fees', titles: { en: 'Transaction fees', fr: 'Frais de transaction' } },
            { slug: 'reference/rest-api/costs/roi', titles: { en: 'ROI', fr: 'ROI' } },
          ],
        },
        {
          slug: 'reference/rest-api/links',
          titles: { en: 'Links', fr: 'Liens' },
          children: [
            { slug: 'reference/rest-api/links/crud-links', titles: { en: 'CRUD /links', fr: 'CRUD /links' } },
            { slug: 'reference/rest-api/links/suggestions', titles: { en: 'Suggestions', fr: 'Suggestions' } },
            { slug: 'reference/rest-api/links/preview', titles: { en: 'Preview', fr: 'Aperçu' } },
          ],
        },
        {
          slug: 'reference/rest-api/settings',
          titles: { en: 'Settings', fr: 'Paramètres' },
          children: [
            { slug: 'reference/rest-api/settings/get-set-settings', titles: { en: 'GET/SET settings', fr: 'GET/SET settings' } },
            { slug: 'reference/rest-api/settings/purge-all', titles: { en: 'Purge all', fr: 'Purger tout' } },
            { slug: 'reference/rest-api/settings/cron-run', titles: { en: 'Cron run', fr: 'Cron run' } },
          ],
        },
      ],
    },
    {
      slug: 'reference/webhooks',
      titles: { en: 'Webhooks', fr: 'Webhooks' },
      tier: 'pro',
      children: [
        { slug: 'reference/webhooks/configurer-un-webhook', titles: { en: 'Configure a webhook', fr: 'Configurer un webhook' }, tier: 'pro' },
        { slug: 'reference/webhooks/evenements-disponibles', titles: { en: 'Available events', fr: 'Événements disponibles' }, tier: 'pro' },
        { slug: 'reference/webhooks/format-payload', titles: { en: 'Payload format', fr: 'Format du payload' }, tier: 'pro' },
        { slug: 'reference/webhooks/signature-hmac', titles: { en: 'HMAC signature', fr: 'Signature HMAC' }, tier: 'pro' },
      ],
    },
    {
      slug: 'reference/data-schema',
      titles: { en: 'Data schema', fr: 'Schéma de données' },
      children: [
        { slug: 'reference/data-schema/event', titles: { en: 'Event', fr: 'Event' } },
        { slug: 'reference/data-schema/visitor', titles: { en: 'Visitor', fr: 'Visitor' } },
        { slug: 'reference/data-schema/session', titles: { en: 'Session', fr: 'Session' } },
        { slug: 'reference/data-schema/touchpoint', titles: { en: 'Touchpoint', fr: 'Touchpoint' } },
        { slug: 'reference/data-schema/goal', titles: { en: 'Goal', fr: 'Goal' } },
        { slug: 'reference/data-schema/saved-link', titles: { en: 'Saved link', fr: 'Saved link' } },
        { slug: 'reference/data-schema/manual-cost', titles: { en: 'Manual cost', fr: 'Manual cost' } },
        { slug: 'reference/data-schema/product-cogs', titles: { en: 'Product COGS', fr: 'Product COGS' } },
        { slug: 'reference/data-schema/schema-versioning', titles: { en: 'Schema versioning', fr: 'Versioning du schéma' } },
      ],
    },
    {
      slug: 'reference/database-tables',
      titles: { en: 'Database tables', fr: 'Tables SQL' },
      children: [
        { slug: 'reference/database-tables/wp-ajnix-visitors', titles: { en: 'wp_ajnix_visitors', fr: 'wp_ajnix_visitors' } },
        { slug: 'reference/database-tables/wp-ajnix-sessions', titles: { en: 'wp_ajnix_sessions', fr: 'wp_ajnix_sessions' } },
        { slug: 'reference/database-tables/wp-ajnix-touchpoints', titles: { en: 'wp_ajnix_touchpoints', fr: 'wp_ajnix_touchpoints' } },
        { slug: 'reference/database-tables/wp-ajnix-events', titles: { en: 'wp_ajnix_events', fr: 'wp_ajnix_events' } },
        { slug: 'reference/database-tables/wp-ajnix-goals', titles: { en: 'wp_ajnix_goals', fr: 'wp_ajnix_goals' } },
        { slug: 'reference/database-tables/wp-ajnix-saved-links', titles: { en: 'wp_ajnix_saved_links', fr: 'wp_ajnix_saved_links' } },
        { slug: 'reference/database-tables/wp-ajnix-manual-costs', titles: { en: 'wp_ajnix_manual_costs', fr: 'wp_ajnix_manual_costs' } },
        { slug: 'reference/database-tables/wp-ajnix-product-cogs', titles: { en: 'wp_ajnix_product_cogs', fr: 'wp_ajnix_product_cogs' } },
        { slug: 'reference/database-tables/wp-ajnix-attribution-results', titles: { en: 'wp_ajnix_attribution_results', fr: 'wp_ajnix_attribution_results' } },
        { slug: 'reference/database-tables/wp-ajnix-daily-aggregates', titles: { en: 'wp_ajnix_daily_aggregates', fr: 'wp_ajnix_daily_aggregates' } },
      ],
    },
    {
      slug: 'reference/glossaire',
      titles: { en: 'Glossary', fr: 'Glossaire' },
    },
  ],
};

const integrations: DocSection = {
  id: 'integrations',
  kind: 'integrations',
  titles: { en: 'Integrations', fr: 'Intégrations' },
  entries: [
    { slug: 'integrations/woocommerce', titles: { en: 'WooCommerce', fr: 'WooCommerce' } },
    {
      slug: 'integrations/formulaires',
      titles: { en: 'Forms', fr: 'Formulaires' },
      children: [
        { slug: 'integrations/formulaires/contact-form-7', titles: { en: 'Contact Form 7', fr: 'Contact Form 7' } },
        { slug: 'integrations/formulaires/wpforms', titles: { en: 'WPForms', fr: 'WPForms' } },
        { slug: 'integrations/formulaires/gravity-forms', titles: { en: 'Gravity Forms', fr: 'Gravity Forms' } },
        { slug: 'integrations/formulaires/fluent-forms', titles: { en: 'Fluent Forms', fr: 'Fluent Forms' } },
        { slug: 'integrations/formulaires/elementor-forms', titles: { en: 'Elementor Forms', fr: 'Elementor Forms' }, tier: 'pro' },
        { slug: 'integrations/formulaires/ninja-forms', titles: { en: 'Ninja Forms', fr: 'Ninja Forms' }, tier: 'pro' },
        { slug: 'integrations/formulaires/forminator', titles: { en: 'Forminator', fr: 'Forminator' }, tier: 'pro' },
        { slug: 'integrations/formulaires/formidable-forms', titles: { en: 'Formidable Forms', fr: 'Formidable Forms' }, tier: 'pro' },
      ],
    },
    {
      slug: 'integrations/consent-managers',
      titles: { en: 'Consent managers', fr: 'Consent managers' },
      children: [
        { slug: 'integrations/consent-managers/cookiebot', titles: { en: 'Cookiebot', fr: 'Cookiebot' } },
        { slug: 'integrations/consent-managers/cookieyes', titles: { en: 'CookieYes', fr: 'CookieYes' } },
        { slug: 'integrations/consent-managers/complianz', titles: { en: 'Complianz', fr: 'Complianz' } },
        { slug: 'integrations/consent-managers/iubenda', titles: { en: 'Iubenda', fr: 'Iubenda' } },
        { slug: 'integrations/consent-managers/custom-event', titles: { en: 'Custom event', fr: 'Événement custom' } },
      ],
    },
    {
      slug: 'integrations/multi-currency-plugins',
      titles: { en: 'Multi-currency plugins', fr: 'Plugins multi-devises' },
      tier: 'pro',
      phase: 'phase2',
      children: [
        { slug: 'integrations/multi-currency-plugins/aelia', titles: { en: 'Aelia', fr: 'Aelia' }, tier: 'pro' },
        { slug: 'integrations/multi-currency-plugins/wpml', titles: { en: 'WPML', fr: 'WPML' }, tier: 'pro' },
        { slug: 'integrations/multi-currency-plugins/fox', titles: { en: 'FOX', fr: 'FOX' }, tier: 'pro' },
        { slug: 'integrations/multi-currency-plugins/curcy', titles: { en: 'CURCY', fr: 'CURCY' }, tier: 'pro' },
      ],
    },
    {
      slug: 'integrations/ads-platforms',
      titles: { en: 'Ad platforms', fr: 'Plateformes publicitaires' },
      tier: 'pro',
      children: [
        { slug: 'integrations/ads-platforms/google-ads', titles: { en: 'Google Ads', fr: 'Google Ads' }, tier: 'pro' },
        { slug: 'integrations/ads-platforms/meta-ads', titles: { en: 'Meta Ads', fr: 'Meta Ads' }, tier: 'pro' },
        { slug: 'integrations/ads-platforms/tiktok-ads', titles: { en: 'TikTok Ads', fr: 'TikTok Ads' }, tier: 'pro', phase: 'phase2b' },
        { slug: 'integrations/ads-platforms/pinterest-ads', titles: { en: 'Pinterest Ads', fr: 'Pinterest Ads' }, tier: 'pro', phase: 'phase2b' },
        { slug: 'integrations/ads-platforms/linkedin-ads', titles: { en: 'LinkedIn Ads', fr: 'LinkedIn Ads' }, tier: 'agency' },
        { slug: 'integrations/ads-platforms/microsoft-ads', titles: { en: 'Microsoft Ads', fr: 'Microsoft Ads' }, tier: 'agency' },
      ],
    },
    {
      slug: 'integrations/automation',
      titles: { en: 'Automation', fr: 'Automatisation' },
      tier: 'pro',
      children: [
        { slug: 'integrations/automation/zapier', titles: { en: 'Zapier', fr: 'Zapier' }, tier: 'pro' },
        { slug: 'integrations/automation/make', titles: { en: 'Make', fr: 'Make' }, tier: 'pro' },
        { slug: 'integrations/automation/n8n', titles: { en: 'n8n', fr: 'n8n' }, tier: 'pro' },
      ],
    },
  ],
};

const security: DocSection = {
  id: 'security',
  kind: 'security',
  titles: { en: 'Security', fr: 'Sécurité' },
  entries: [
    { slug: 'security/vue-ensemble', titles: { en: 'Overview', fr: "Vue d'ensemble" } },
    { slug: 'security/privacy-policy', titles: { en: 'Privacy policy', fr: 'Politique de confidentialité' } },
    { slug: 'security/pii-handling', titles: { en: 'PII handling', fr: 'Gestion des PII' } },
    { slug: 'security/rate-limiting', titles: { en: 'Rate limiting', fr: 'Rate limiting' } },
    { slug: 'security/sql-injection-prevention', titles: { en: 'SQL injection prevention', fr: 'Prévention des injections SQL' } },
    { slug: 'security/csrf-nonces', titles: { en: 'CSRF nonces', fr: 'Nonces CSRF' } },
    { slug: 'security/report-a-vulnerability', titles: { en: 'Report a vulnerability', fr: 'Signaler une vulnérabilité' } },
  ],
};

const meta: DocSection = {
  id: 'meta',
  kind: 'meta',
  titles: { en: 'Resources', fr: 'Ressources' },
  entries: [
    { slug: 'faq', titles: { en: 'FAQ', fr: 'FAQ' } },
    { slug: 'changelog', titles: { en: 'Changelog', fr: 'Changelog' } },
    {
      slug: 'support',
      titles: { en: 'Support', fr: 'Support' },
      children: [
        { slug: 'support/contact', titles: { en: 'Contact', fr: 'Contact' } },
        { slug: 'support/community', titles: { en: 'Community', fr: 'Communauté' } },
        { slug: 'support/report-bug', titles: { en: 'Report a bug', fr: 'Signaler un bug' } },
      ],
    },
  ],
};

export const docsHome = home;

export const docsSections: DocSection[] = [
  gettingStarted,
  concepts,
  guides,
  reference,
  integrations,
  security,
  meta,
];

// ---------------------------------------------------------------------------
// Derived helpers (flat lookups)
// ---------------------------------------------------------------------------

export type FlatDoc = {
  slug: string;
  titles: Record<Locale, string>;
  sectionId: string;
  sectionKind: DocSectionKind;
  tier?: Tier;
  phase?: DocPhase;
  parentSlug?: string;
};

function flatten(
  entries: DocEntry[],
  section: DocSection,
  parentSlug: string | undefined,
  acc: FlatDoc[],
) {
  for (const entry of entries) {
    acc.push({
      slug: entry.slug,
      titles: entry.titles,
      sectionId: section.id,
      sectionKind: section.kind,
      tier: entry.tier,
      phase: entry.phase,
      parentSlug,
    });
    if (entry.children) {
      flatten(entry.children, section, entry.slug, acc);
    }
  }
}

let flatCache: FlatDoc[] | null = null;
export function getFlatDocs(): FlatDoc[] {
  if (flatCache) return flatCache;
  const acc: FlatDoc[] = [];
  for (const section of docsSections) {
    flatten(section.entries, section, undefined, acc);
  }
  flatCache = acc;
  return acc;
}

export function getDocBySlug(slug: string): FlatDoc | undefined {
  return getFlatDocs().find((d) => d.slug === slug);
}

export function getDocNeighbors(slug: string): { prev?: FlatDoc; next?: FlatDoc } {
  const flat = getFlatDocs();
  const idx = flat.findIndex((d) => d.slug === slug);
  if (idx === -1) return {};
  return { prev: flat[idx - 1], next: flat[idx + 1] };
}
