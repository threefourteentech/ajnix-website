# Documentation du plugin Ajnix pour WordPress

Version documentée : **0.1.0** (première version publique, 22 avril 2026)
Compatibilité : WordPress 5.8+, PHP 7.4+, MySQL 5.7+ / MariaDB 10.3+ (moteur InnoDB requis).
Source canonique dans le dépôt : `wp/wp-content/plugins/ajnix/`.

Ce document est la référence produit destinée au site `ajnix.com` (pages marketing, centre d'aide, blog, onboarding). Il décrit ce que fait réellement le plugin, comment il fonctionne, et quelles décisions techniques ou de confidentialité sous-tendent chaque fonctionnalité.

---

## 1. Qu'est-ce qu'Ajnix ?

Ajnix est un plugin d'analytique marketing et d'attribution **auto-hébergé** pour WordPress. Il capture les visites, sessions, points de contact et conversions directement dans la base de données WordPress du site — **aucun compte SaaS externe, aucun appel réseau vers Ajnix, aucune PII** (e-mail, nom, valeurs de formulaire) stockés à côté des événements.

En une phrase : **Ajnix remplace Google Analytics + un outil d'attribution + un tableau de bord e-commerce, sans envoyer de données à un tiers**.

### Positionnement

- **Privacy-first par conception**, pas par option : IP tronquées avant écriture en base, Do Not Track respecté, environnements staging/dev exclus automatiquement.
- **Complet hors WooCommerce** (trafic, attribution, buts, link builder), **révélé au complet avec WooCommerce** (revenu, COGS, marges, remboursements).
- **Gratuit avec un chemin Pro clair** : les fonctions Pro réutilisent les mêmes événements déjà collectés — passer à Pro est une bascule, pas une réinstrumentation.

### Ce qui distingue Ajnix des concurrents

| Besoin | Ajnix | GA4 | MonsterInsights | Matomo auto-hébergé |
|---|---|---|---|---|
| Données restent sur votre serveur | Oui | Non | Non (passe par GA) | Oui |
| Attribution multi-touch (Pro) | Oui | Partielle | Non | Add-on payant |
| Revenu WooCommerce décomposé (gross/net/COGS/fees/refunded) | Oui | Non | Partiel | Non natif |
| Buts de conversion sans code (URL / clic / formulaire / scroll / temps) | Oui | Configurable | Partiel | Oui |
| Respect automatique des bannières de consentement (Complianz, CookieYes, Cookiebot, Iubenda) | Oui | Manuel | Manuel | Manuel |
| Tracker ≤ 7 KB gzippés | Oui (6,8 KB) | Non (~45 KB) | Non | ~22 KB |

---

## 2. Fonctionnalités en un coup d'œil

- **Tracking multi-canal** : UTM (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`) + 6 identifiants de clic publicitaires (`gclid`, `fbclid`, `msclkid`, `ttclid`, `li_fat_id`, `twclid`), référents, devices, pages, durées de session, taux de rebond.
- **Attribution last-touch** avec fenêtre de 30 jours. Cinq modèles Pro supplémentaires (first-touch, linéaire, time-decay, position-based, data-driven ML) prévus pour la Phase 2.
- **WooCommerce natif** : suivi automatique des achats et remboursements, décomposition du revenu (gross / subtotal / tax / shipping / fees / discount / COGS / refunded / net / gross profit), détection automatique des frais Stripe / PayPal / Square, édition en ligne du COGS produit avec calcul de marge.
- **Buts personnalisés** (goals) sans code : visite d'URL, clic sur sélecteur CSS, soumission de formulaire, événement personnalisé, profondeur de scroll, temps sur page.
- **Intégrations formulaires auto-détectées** : Contact Form 7, WPForms, Gravity Forms, Fluent Forms.
- **Coûts manuels + ROI** : dépenses publicitaires, forfaits d'agence, coûts offline avec répartition proportionnelle (prorata linéaire) sur la plage de dates.
- **UTM Link Builder** avec aperçu en direct, autocomplétion depuis l'historique, téléchargement du QR code en SVG, compteur de conversions par lien.
- **Consent-aware** : détection automatique de Complianz, CookieYes, Cookiebot, Iubenda, hook JS personnalisé. Le tracker attend l'accord "analytics" avant de charger.
- **API publique** : fonctions PHP, 18+ hooks d'action, 20+ filtres, REST endpoints, API JavaScript du tracker — toutes documentées et versionnées en semver.
- **Export** : `GET /wp-json/ajnix/v1/events` et `/conversions` renvoient tout en JSON.

### Limites du plan gratuit

- Attribution : last-touch uniquement.
- **5 buts actifs** maximum (filtrable via `ajnix_goals_free_limit`).
- **10 coûts manuels actifs** maximum (filtrable via `ajnix_manual_costs_free_limit`).
- Coûts récurrents verrouillés Pro.
- Rétention : événements conservés 90 jours (les conversions pour toujours), sessions 180 jours. Pro lève ces limites.
- Pas encore d'aggrégation globale multisite (chaque site garde son `site_id`).

---

## 3. Confidentialité & conformité

Ajnix est pensé pour minimiser la collecte, pas pour cocher des cases de conformité a posteriori.

### Par défaut, sans configuration

- **Troncature IP avant insertion** : IPv4 en `/24`, IPv6 en `/48`. L'IP complète ne touche jamais la base.
- **Aucune PII stockée** avec les événements : pas d'e-mail, pas de nom, pas de valeur de champ de formulaire. La valeur du champ "nom" sur un CF7 n'entre jamais dans `wp_ajnix_events`.
- **Do Not Track** du navigateur respecté.
- **Détection d'environnement** : staging/dev détectés et exclus automatiquement (`*.local`, `staging.*`, `dev.*`, domaine contenant `staging`, etc.) via `Ajnix_Site::get_environment()`.
- **Aucun cookie tiers** n'est posé. Les seuls cookies first-party servent à identifier visiteur/session et peuvent être bloqués par le consentement.
- **Aucun appel sortant** : aucune télémétrie, aucun "phone home" vers Ajnix.

### Intégrations de consentement

Avec **Privacy → Respect consent banner** activé, le tracker attend qu'une des bannières suivantes signale le consentement "analytics" :

- Complianz (`cmplzEnableScripts`)
- CookieYes (`cookieyes_consent_update`)
- Cookiebot (`CookiebotOnAccept`)
- Iubenda (`iubendaConsentAccept`)
- Événement `window` personnalisé (documenté dans les réglages)

### Cadres réglementaires

- **RGPD / UE** : troncature IP, pas de PII, consentement explicite via bannière connectée → base légale "intérêt légitime" ou "consentement" selon votre setup.
- **CCPA / Californie** : pas de vente de données (les données ne sortent jamais du serveur).
- **PIPEDA / Canada** : rétention limitée, droit d'accès via les endpoints REST.
- **HIPAA** : Ajnix ne stocke aucune PHI ; reste à évaluer par votre DPO selon le contexte d'hébergement.

Une documentation détaillée figure dans `SECURITY.md` et `readme.txt` section "Privacy" du plugin.

---

## 4. Installation

1. **Téléverser** le zip via **Extensions → Ajouter → Téléverser une extension** (ou cloner dans `wp-content/plugins/ajnix`).
2. **Activer** le plugin.
3. Redirection automatique vers **Ajnix → Overview** avec une modale de bienvenue et une checklist d'installation persistante.
4. Suivre la checklist : vérifier que le tracker est détecté, exclure les admins, créer un premier but.
5. Si WooCommerce est actif, les achats sont suivis automatiquement — aucun câblage supplémentaire.

### Distribution du zip

Le zip inclut le code source `src/`, les builds `build/` et les dépendances `vendor/` (Composer). **Les utilisateurs n'ont jamais besoin de `npm install` ni de `composer install`**. Les fichiers de dev (`node_modules/`, `tests/`, `.git/`, etc.) sont exclus via `.distignore`.

### Exigences techniques

| | Minimum | Recommandé |
|---|---|---|
| WordPress | 5.8 | 6.4+ |
| PHP | 7.4 | 8.1+ |
| MySQL / MariaDB | 5.7 / 10.3 | 8.0 / 10.6 |
| Moteur | **InnoDB obligatoire** (transactions) | — |
| WooCommerce | — | 7.0+ pour l'onglet Ecommerce |

### Compatibilité thèmes et builders

Ajnix s'accroche à `wp_head` et à la REST API standard — compatible avec tout thème ou constructeur qui ne dépouille pas les scripts standard : **Astra, Kadence, GeneratePress, Elementor, Divi, Bricks, Blocksy, Oxygen**, etc.

---

## 5. Comment fonctionne le tracking

### Architecture en une image

```
Navigateur                        Serveur WordPress                  MySQL / InnoDB
──────────                        ─────────────────                  ──────────────
tracker.js (6.8 KB gz)  ──POST──▶ REST /ajnix/v1/track  ──────────▶  wp_ajnix_visitors
  UTM + clickIDs                  - valide UUID v4                   wp_ajnix_sessions
  touchpoint                      - rate limit 100/min/IP            wp_ajnix_touchpoints
  sendBeacon unload               - enrichit (geo, UA, IP tronquée)  wp_ajnix_events
                                  - INSERT IGNORE (dédup UUID)
                                  - transaction atomique
```

### Les 4 entités canoniques

1. **Visitor** — identité pseudonyme persistante (UUID v4 first-party). Un visiteur a plusieurs sessions.
2. **Session** — une visite (30 minutes d'inactivité = nouvelle session). Une session a un `landing_page_url`, un device, une géoloc, et 0..N événements.
3. **Touchpoint** — le contexte marketing au moment du landing : source, medium, campaign, clickId, referrer. Change si le visiteur revient via une autre source. C'est ce qui est attribué.
4. **Event** — tout le reste : pageview, clic, soumission de formulaire, achat, événement custom. Un événement peut être flaggé `is_conversion=1` — alors il déclenche l'attribution et l'alimentation du CA.

### Règles intangibles

- **Toutes les clés métier sont des UUID v4** (`CHAR(36)`) avec une PK surrogate `BIGINT` pour préserver la clusterisation InnoDB séquentielle et la déduplication globale pour la synchro Pro à venir.
- **Dédup** : chaque table à clé métier a `UNIQUE KEY` + `INSERT IGNORE`. Un batch rejoué ne double jamais.
- **IP tronquée** à l'entrée du serveur, filtrable via `ajnix_truncated_ip`.
- **Rétention** : purge hebdomadaire (lundi 04:30, TZ du site) des événements > 90 j (sauf conversions), sessions > 180 j, touchpoints orphelins. Batch `LIMIT 500` pour ne pas bloquer InnoDB.

### Bot detection

Le tracker écarte les bots connus côté client (User-Agent heuristique) **et** côté serveur. Les événements rejetés ne sont jamais écrits.

### Tracker JS

- ~**6,8 KB gzippés**, vanilla JS, asynchrone.
- File d'attente `window.ajnix(...)` : le code qui appelle `ajnix('event', ...)` avant le boot est rejoué une fois le tracker prêt.
- Unload via `sendBeacon` : la dernière pageview part même si l'utilisateur ferme l'onglet.
- Servi par défaut depuis `cdn.ajnix.com` (LiteSpeed, HTTP/2 + HTTP/3). **Bascule self-hosted** en un toggle : **Settings → Advanced → Self-host tracker**.

---

## 6. Attribution

### Last-touch (plan gratuit)

- Fenêtre de **30 jours** avant la conversion.
- Résout le dernier touchpoint du visiteur ; si aucun, attribue au canal virtuel `direct`.
- Recalcul **idempotent** via `ON DUPLICATE KEY UPDATE` sur `wp_ajnix_attribution_results`.
- Les **remboursements** ne créent pas de ligne d'attribution séparée (ils mutent le `net` de l'achat original). Évite le double-comptage.
- Hook : `ajnix_after_track_event` priorité 10.

### Modèles Pro (Phase 2)

La colonne `model` est déjà prête. Aucun changement de schéma pour ajouter :

- **First-touch** — crédite la première source.
- **Linear** — poids égal à tous les touchpoints.
- **Time-decay** — pondération exponentielle vers la conversion.
- **Position-based (40/20/40)** — premier et dernier boostés.
- **Data-driven (ML)** — poids appris des parcours réels.

### Daily aggregator

- Cron quotidien 03:15 (TZ site).
- Upsert dans `wp_ajnix_daily_aggregates`, clé `(site_id, date, channel, source, medium, campaign)`.
- Alimente les graphs du dashboard sans rejouer les événements bruts.

---

## 7. WooCommerce

Ajnix est **déjà intégré** dès que WooCommerce est actif — aucune configuration.

### Décomposition du revenu

Chaque ligne d'événement `purchase` contient :

| Colonne | Ce que c'est |
|---|---|
| `conversion_value_gross` | Total TTC payé par le client |
| `conversion_value_subtotal` | Sous-total hors taxes |
| `conversion_tax` | TVA / taxes |
| `conversion_shipping` | Expédition |
| `conversion_fees` | Frais de passerelle (Stripe, PayPal, Square, etc.) |
| `conversion_discount` | Remises / codes promo |
| `conversion_cogs` | COGS calculé depuis `Ajnix_Product_COGS` |
| `conversion_refunded` | Montant remboursé (mise à jour à chaque refund) |
| `conversion_value_net` | gross − tax − shipping − fees − cogs − refunded |
| `conversion_gross_profit` | net − cogs |

### COGS produit

- **Édition en ligne** depuis **Ajnix → Ecommerce → Products** avec marge calculée en direct.
- Par variation quand la variation existe.
- Warning de couverture si < 80 % des produits vendus ont un COGS.

### Frais de transaction auto-détectés

Ajnix scanne 7 meta keys de passerelle connues pour extraire les frais réels, filtrable via `ajnix_transaction_fee_meta_keys`. Support natif de :

Stripe, PayPal, Square, Mollie, Razorpay, Klarna, WooCommerce Payments.

### Remboursements

Sur `woocommerce_refund_created`, Ajnix recalcule le `net` et le `gross_profit` de la commande originale. Aucune nouvelle ligne de conversion.

### Visiteurs "server-only"

Un achat effectué sans tracker (API, checkout-headless, admin-create) ne perd pas son revenu : l'événement est écrit avec `origin='server'` et un visiteur est créé si besoin. L'attribution tombera sur `direct` s'il n'y a aucun touchpoint.

---

## 8. Buts (Goals)

6 types, tous configurables via une modale 4 étapes (**Ajnix → Goals → New goal**) :

| Type | Déclenche quand… |
|---|---|
| **URL** | L'URL visitée match une règle (exact / contains / starts_with / regex) |
| **Click** | Clic sur un sélecteur CSS |
| **Form submit** | Soumission d'un formulaire détecté (CF7 / WPForms / Gravity / Fluent) |
| **Custom event** | Le nom d'événement match (via `ajnix('event', ...)` ou `ajnix_track_event()`) |
| **Scroll** | Profondeur (% ou px) atteinte |
| **Time on page** | Secondes passées sur la page |

### Mécanique

- Evaluator sur `ajnix_after_track_event` priorité 5, **first-match wins**.
- Un événement promu en conversion déclenche une 2ᵉ passe de `ajnix_after_track_event` avec `_goal_promoted=true` pour que les intégrations tierces puissent skipper les side-effects déjà exécutés.
- Pour créer un but depuis le code :
  ```php
  ajnix_register_goal( 'pricing-viewed', [
      'label'         => 'Pricing page viewed',
      'type'          => 'url',
      'match_rules'   => [ 'mode' => 'contains', 'pattern' => '/pricing' ],
      'default_value' => 0,
      'is_active'     => 1,
  ] );
  ```

---

## 9. Coûts & ROI

### Coûts manuels

Ajnix → Costs → **Add cost**. Saisie : libellé, canal, UTMs optionnelles, date de début, date de fin (ou récurrence Pro), montant, devise, actif/inactif.

- **Répartition prorata linéaire** : un coût de 3 000 $ du 1ᵉʳ au 30 avril compte pour 100 $/jour et se découpe correctement dans toute plage de dashboard (y compris plages qui chevauchent partiellement).
- **10 coûts actifs max** sur free ; récurrence `weekly/monthly/yearly` verrouillée Pro.

### Dashboard ROI

5 KPIs, graphe dépenses-vs-revenu, répartition par canal. ROI = `(revenu_attribué − coût) / coût`. ROAS = `revenu_attribué / coût`.

### Frais de transaction

Automatiquement extraits des achats WooCommerce (cf. section 7). Visibles dans **Costs → Transaction fees** avec période filtrable.

---

## 10. UTM Link Builder

**Ajnix → Link Builder** — bâtir, sauvegarder et partager des liens UTM propres.

- Champs : URL de base, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`.
- **Autocomplétion** puisant dans (1) les touchpoints historiques du site et (2) les liens déjà sauvegardés.
- **Aperçu en direct** de l'URL complète, copie presse-papier en un clic.
- **Historique sauvegardé** avec comptage de conversions par campagne.
- **QR code SVG** téléchargeable (via `qrcode-svg`).

Hook côté code : `ajnix_saved_link_created` à la création.

---

## 11. Dashboard admin

Menu **Ajnix** dans la sidebar WP. 16 pages, toutes rendues via React (`build/admin.js`) dans le wrapper `.ajnix-admin` (CSS scopé pour cohabiter avec n'importe quel thème admin).

### Ordre du menu

1. **Overview** — 4 KPIs, courbe trafic, top sources, top pages, conversions récentes, checklist d'installation.
2. **Traffic** — détail par canal / source / medium / campaign / landing page.
3. **Conversions** — liste filtrée + détail par événement.
4. **Attribution** — last-touch actif + 5 modèles Pro en preview verrouillée.
5. **Ecommerce** (si WC actif) — 5 KPIs, courbe revenu, top produits, barres par canal, commandes récentes.
6. **Goals** — CRUD, modale 4 étapes, toggle actif/inactif.
7. **Costs & ROI** — coûts manuels, COGS produit, frais transaction, résumé ROI.
8. **Link Builder** — cf. section 10.
9. **Visitors** — exploration par visiteur (Pro affiche le parcours complet).
10. **Customer Journey** `PRO`
11. **Funnels** `PRO`
12. **Cohorts** `PRO`
13. **Live visitors** `PRO`
14. **Heatmaps** `PRO`
15. **Alerts** `PRO`
16. **Integrations** — consent, formulaires, WooCommerce.
17. **Settings** — 6 onglets (cf. section 12).
18. **Upgrade to Pro** — gradient violet dans le menu.

### Modale de bienvenue & checklist

Apparaît à la 1ʳᵉ activation. La checklist reste visible dans Overview tant qu'elle n'est pas complétée :

- Tracker détecté sur la page d'accueil
- Admin exclu du tracking
- Premier but créé
- WooCommerce connecté (si présent)
- Consent banner configuré (si détectée)

---

## 12. Réglages

**Ajnix → Settings**, 6 onglets :

| Onglet | Contenu |
|---|---|
| **General** | Nom du site, devise, fuseau horaire, plan affiché |
| **Tracking** | Activation tracker, self-host vs CDN, événements activés, rate limit |
| **Privacy** | Respect DNT, respect bannière de consentement (Complianz / CookieYes / Cookiebot / Iubenda / custom), fenêtre d'attribution |
| **Data** | Rétention événements / sessions / touchpoints, purge manuelle, `POST /settings/purge-all` (nécessite `"confirm": "PURGE"`) |
| **Exclusions** | Rôles exclus du tracking (admin par défaut), IPs, user-agents, URLs exclues |
| **Advanced** | Self-host tracker, exécution manuelle de cron (`daily` / `weekly`), niveau de log, environnement (override) |

### Exclusions par défaut

- Administrateurs (cochable par rôle).
- URLs d'admin WP (`/wp-admin/*`).
- Environnements staging/dev (auto-détectés).

---

## 13. Schéma de données

9 tables actives (+ 1 Phase 2), toutes préfixées `wp_ajnix_` :

| Table | Contient |
|---|---|
| `wp_ajnix_visitors` | UUID visiteur, first/last seen, compteurs, origine (`client`/`server`) |
| `wp_ajnix_sessions` | UUID session, landing, exit, device, géoloc, IP tronquée |
| `wp_ajnix_touchpoints` | Source/medium/campaign + 6 clickIDs, referrer, canal |
| `wp_ajnix_events` | Tous les événements, 11 colonnes de revenu décomposé |
| `wp_ajnix_goals` | Buts + règles `match_rules` (JSON) |
| `wp_ajnix_saved_links` | UTMs sauvegardés + short_code |
| `wp_ajnix_manual_costs` | Coûts manuels avec date_start / date_end / récurrence |
| `wp_ajnix_product_cogs` | COGS par `(site_id, product_id, variation_id)` |
| `wp_ajnix_attribution_results` | Une ligne par `(event_id, model)` |
| `wp_ajnix_daily_aggregates` | Rollup quotidien par dimension marketing |
| `wp_ajnix_sync_queue` | *Phase 2 — file de synchro Pro* |

Schémas complets dans `includes/class-ajnix-db.php`. Migrations versionnées idempotentes via `Ajnix_DB::maybe_upgrade()` (DB version courante : **4**).

---

## 14. API développeur

Tout est documenté et **stable en semver intra-majeure** dans `docs/developers.md`.

### Fonctions PHP

```php
// Identité
ajnix_get_site_id();        // UUID v4
ajnix_is_premium();         // bool
ajnix_get_environment();    // 'production' | 'staging' | 'development'

// Lookups
ajnix_get_visitor( $uuid );
ajnix_get_session( $uuid );
ajnix_get_attribution( $event_id, 'last_touch' );
ajnix_get_conversions( [ 'date_start' => '2026-04-01', 'limit' => 100 ] );

// Émission
ajnix_track_event( 'download_started', [ 'asset' => 'whitepaper.pdf' ] );
ajnix_track_conversion( 'newsletter-signup', 0.0, [ 'source' => 'footer' ] );
ajnix_track_purchase( $order_id );
ajnix_identify_visitor( $visitor_id, 'user@example.com', [ 'plan' => 'enterprise' ] );

// Goals CRUD
ajnix_register_goal( $slug, $args );
ajnix_get_goal( $slug );
```

### Hooks d'action (18)

Entre autres :

- `ajnix_before_track_event` / `ajnix_after_track_event` / `ajnix_after_track_conversion`
- `ajnix_session_started`
- `ajnix_goal_triggered` / `_created` / `_updated` / `_deleted`
- `ajnix_product_cogs_updated`
- `ajnix_integration_activated`
- `ajnix_retention_purged`
- `ajnix_daily_aggregation_completed`

### Filtres (20+)

Les plus utiles :

- `ajnix_event_data` — réécrire / augmenter un événement avant écriture.
- `ajnix_track_event` — bloquer un événement (`return false`).
- `ajnix_visitor_id` — stitching d'identité (anonyme → utilisateur connecté).
- `ajnix_should_track_current_user` — exclure un utilisateur dynamiquement.
- `ajnix_conversion_value` / `ajnix_conversion_cogs` / `ajnix_wc_revenue_breakdown` — surcharger les calculs WC.
- `ajnix_truncated_ip` — changer la granularité de troncature IP.
- `ajnix_tracker_cdn_url` — pointer vers un autre CDN / miroir.
- `ajnix_goals_free_limit`, `ajnix_manual_costs_free_limit` — changer les caps free.

**Exemple** — stitcher visiteur anonyme à un utilisateur connecté :

```php
add_filter( 'ajnix_visitor_id', function ( $visitor_id, $event_name, $event ) {
    if ( ! is_user_logged_in() ) return $visitor_id;
    $uid = get_current_user_id();
    $known = get_user_meta( $uid, '_ajnix_stable_visitor', true );
    if ( ! $known ) {
        update_user_meta( $uid, '_ajnix_stable_visitor', $visitor_id );
        return $visitor_id;
    }
    return $known;
}, 10, 3 );
```

### REST API

Toutes les routes sous `/wp-json/ajnix/v1/` :

**Public** (rate-limité, site_id validé) :

```
POST /track
POST /track/batch   (jusqu'à 100 événements)
```

**Admin** (`manage_options` requis) :

```
GET  /overview?start=&end=
GET  /attribution?start=&end=
GET  /ecommerce?start=&end=
GET  /setup-checklist
GET  /events            (filtres : date_start, date_end, event_name, visitor_id, goal_id, limit, offset)
GET  /conversions
GET|POST|PUT|DELETE /goals[/{slug}]
POST /goals/{slug}/toggle
GET  /goals-detected-forms
GET|POST /costs/manual[/{id}]
GET|PUT|DELETE /costs/cogs[/{product_id}]
GET  /costs/fees?start=&end=
GET  /costs/roi?start=&end=&model=last_touch
GET|POST|DELETE /links[/{link_id}]
GET  /links/suggestions?field=&q=
POST /links/preview
GET|POST /settings
POST /settings/purge-all     ({ "confirm": "PURGE" })
POST /settings/cron-run      ({ "job": "daily" | "weekly" })
```

### API JavaScript

```js
ajnix( 'ready', () => console.log( 'AjnixTracker booted' ) );
ajnix( 'event', 'demo_request', { plan: 'enterprise' } );

const id      = AjnixTracker.getVisitorId();
const session = AjnixTracker.getSessionId();
const tp      = AjnixTracker.getCurrentTouchpoint();
const premium = AjnixTracker.isPremium();
const config  = AjnixTracker.getConfig();
```

---

## 15. Sécurité

Résumé de `SECURITY.md` (audit complet dans le dépôt) :

- **56 appels `$wpdb->prepare()`** sur 16 fichiers. Zéro interpolation non préparée.
- Zéro `eval`, `extract` ou `unserialize` sur des entrées utilisateur.
- Tous les endpoints REST admin derrière `manage_options`.
- Rate limiting REST ingestion : 100 requêtes/minute par `REMOTE_ADDR` (X-Forwarded-For **ignoré** pour empêcher la rotation de bucket).
- Noms de tables dérivés uniquement de `Ajnix_DB::table_names()` (whitelist).
- Événements JSON plafonnés à 10 KB.
- Validation UUID v4 stricte sur toutes les clés métier.
- Nonces WP sur toutes les mutations admin.
- CSP-friendly : aucun `inline script` non-nonced côté front.

Politique de divulgation responsable : `security@ajnix.com` avec PGP (clé dans `SECURITY.md`).

---

## 16. Performance

- Tracker **6,8 KB gzippés**, chargé asynchrone, ne bloque jamais le rendu.
- Un achat WooCommerce = 1 `INSERT` indexé — imperceptible sur tout hébergeur moderne.
- Event ingestion : transaction atomique (visitor + session + touchpoint + event) avec `INSERT IGNORE`.
- Dashboard : requêtes indexées sur les clés composites `(site_id, occurred_at)`, `(visitor_id, occurred_at)`, etc.
- Daily aggregator décharge les graphes à long historique sur `wp_ajnix_daily_aggregates` (requêtes O(jours) et non O(événements)).
- Cache objet WordPress (`wp_cache_get/set`) sur les lookups hot : visiteur (30 s), session (30 s), conversions (30 s), attribution (60 s).

---

## 17. Retention & maintenance automatique

- **Cron quotidien 03:15** (TZ site) : daily aggregator.
- **Cron hebdomadaire 04:30** (TZ site) : purge.
  - Événements > 90 jours (sauf `is_conversion=1`).
  - Sessions > 180 jours.
  - Touchpoints orphelins.
  - Batch `LIMIT 500` pour ne pas verrouiller InnoDB.
- Exécutable manuellement via `POST /wp-json/ajnix/v1/settings/cron-run` ou WP-CLI.
- Hook `ajnix_retention_purged` avec rapport détaillé (`rows_deleted`, `duration_ms`) pour monitoring.

---

## 18. FAQ

**Est-ce qu'Ajnix envoie des données à un service externe ?**
Non. Tout est stocké dans votre propre base WordPress. Le script tracker charge par défaut depuis `cdn.ajnix.com` pour la vitesse globale — bascule self-hosted en un toggle dans **Settings → Advanced**.

**Est-ce conforme RGPD / CCPA / PIPEDA ?**
Par défaut, oui : IPs tronquées, pas de PII stockée, Do Not Track respecté. Avec **Privacy → Respect consent banner**, le tracker attend l'accord analytics de votre plugin de consentement (Complianz, CookieYes, Cookiebot, Iubenda, ou hook custom).

**Est-ce que ça ralentit mon site ?**
Tracker 6,8 KB gzippés, chargé en async. Côté serveur, un achat WooCommerce = un INSERT indexé. Imperceptible sur tout hébergeur moderne.

**Ça fonctionne sans WooCommerce ?**
Oui. WooCommerce débloque le dashboard Ecommerce et l'attribution de revenu ; le cœur (trafic, attribution, buts, link builder) fonctionne seul.

**Compatible avec Astra / Kadence / GeneratePress / Elementor / Divi / Bricks ?**
Oui. Ajnix s'accroche à `wp_head` et à la REST API standard.

**Combien de temps les données sont-elles conservées ?**
Plan gratuit : événements 90 jours (conversions pour toujours), sessions 180 jours. Pro : illimité.

**Je peux exporter mes données ?**
`GET /wp-json/ajnix/v1/events` et `/conversions` retournent tout en JSON. Export CSV natif prévu sur la roadmap Pro.

**Ça fonctionne en multisite ?**
Chaque site du réseau conserve son propre `site_id` et ses propres données. L'agrégation globale cross-sites n'est pas encore supportée en Phase 1.

**Je peux re-tracker un achat manuellement ?**
Oui : `ajnix_track_purchase( $order_id )` — utile après un "mark as paid" admin hors flux normal.

**Comment désactiver le tracking pour un rôle spécifique ?**
**Settings → Exclusions** (UI) ou `add_filter( 'ajnix_should_track_current_user', '__return_false' )` pour du conditionnel.

**Est-ce que les click IDs publicitaires sont capturés même sans UTM ?**
Oui. `gclid`, `fbclid`, `msclkid`, `ttclid`, `li_fat_id`, `twclid` sont stockés sur le touchpoint indépendamment des UTMs.

---

## 19. Free vs Pro

Le plugin gratuit est **complet** pour les cas d'usage d'une PME / d'un créateur WooCommerce solo. Ajnix Pro débloque ce que les équipes marketing matures exigent :

### Free (plan actuel)

- Tracking complet + last-touch
- WooCommerce décomposé + COGS + frais transaction
- 5 buts actifs, 10 coûts manuels actifs
- Link Builder + QR codes
- Rétention 90 / 180 jours
- Support communautaire

### Pro (Phase 2)

- **5 modèles d'attribution supplémentaires** (first, linear, time-decay, position-based, data-driven ML)
- **Customer Journey** — parcours complet par visiteur
- **Funnels** multi-étapes avec drop-off
- **Cohorts** — rétention / LTV par cohorte d'acquisition
- **Live visitors** — temps réel
- **Heatmaps + session replay**
- **Alerts** — seuils de trafic / conversion / anomalies
- **Sync plateformes Ads** (Google, Meta, TikTok, LinkedIn, X) — upload automatique des conversions
- **Buts & coûts illimités**, coûts récurrents
- **Rétention illimitée**
- Support prioritaire

**Les fonctions Pro tournent sur les mêmes événements que le plugin gratuit collecte déjà.** Passer à Pro ne demande aucune réinstrumentation : c'est une bascule de licence.

---

## 20. Feuille de route

### Phase 1 — ✅ Livrée (avril 2026)

Plugin WordPress gratuit, self-hosted, complet. Cf. `CHANGELOG.md`.

### Phase 2 — Pro SaaS

- Sync cloud Ajnix (`wp_ajnix_sync_queue` → API Ajnix)
- 5 modèles d'attribution supplémentaires
- Dashboards Pro (Journey, Funnels, Cohorts, Live, Heatmaps, Alerts)
- Pairing `?ajnix_pair={token}` (stub déjà en place dans `Ajnix_Pairing`)
- Apps iOS / Android

### Phase 3 — Multi-site & agences

- Agrégation cross-sites
- White-label
- API partenaires

---

## 21. Liens utiles

- Site : https://ajnix.com
- Upgrade : https://ajnix.com/upgrade
- Documentation développeur (dans le plugin) : `docs/developers.md`
- Sécurité : `SECURITY.md` dans le plugin
- Changelog : `CHANGELOG.md` dans le plugin
- Support : https://ajnix.com/support
- Sœurs produits consentement : [Petit Biscuit](https://petitbiscuit.ca) (FR) / [Little Cookie](https://littlecookie.ca) (EN)

---

*Document maintenu par l'équipe Ajnix. Dernière mise à jour alignée sur le plugin **v0.1.0** (22 avril 2026).*
