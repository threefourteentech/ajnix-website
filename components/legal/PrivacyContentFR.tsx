import { ObfuscatedEmail } from '@/components/ui/ObfuscatedEmail';

const PRIVACY_EMAIL = { user: 'privacy', domain: 'ajnix.com' } as const;

export function PrivacyContentFR() {
  return (
    <>
      <h2 id="introduction">Introduction</h2>
      <p>
        Cette politique de confidentialité décrit comment Ajnix collecte, utilise et
        protège tes renseignements personnels lorsque tu utilises notre site web
        ajnix.com et nos services associés (le plugin WordPress, la version Pro et
        l&apos;API).
      </p>
      <p>
        On prend la confidentialité au sérieux. C&apos;est même au cœur de notre
        produit : Ajnix est conçu pour analyser des données marketing sans collecter
        d&apos;informations personnelles identifiables. La même philosophie s&apos;applique
        à notre propre site.
      </p>
      <p>Cette politique respecte les exigences de plusieurs cadres légaux internationaux :</p>
      <ul>
        <li>Règlement général sur la protection des données (RGPD) — Union européenne</li>
        <li>Loi sur la protection des renseignements personnels dans le secteur privé (Loi 25) — Québec, Canada</li>
        <li>Loi sur la protection des renseignements personnels et les documents électroniques (PIPEDA) — Canada</li>
        <li>California Consumer Privacy Act (CCPA) et California Privacy Rights Act (CPRA) — Californie, États-Unis</li>
        <li>Lei Geral de Proteção de Dados (LGPD) — Brésil</li>
        <li>UK GDPR — Royaume-Uni</li>
        <li>Privacy Act 1988 — Australie</li>
      </ul>
      <p>
        Si tu résides dans une juridiction qui t&apos;accorde des droits supplémentaires,
        ces droits s&apos;appliquent à toi. Contacte-nous pour toute question.
      </p>

      <h2 id="responsable">Responsable du traitement</h2>
      <p>
        Ajnix est édité par <strong>Eric St-Amant</strong>, basé au Québec, Canada.
      </p>
      <p>Pour toute question concernant tes renseignements personnels :</p>
      <p>
        <ObfuscatedEmail user={PRIVACY_EMAIL.user} domain={PRIVACY_EMAIL.domain} />
      </p>
      <p>
        Si tu te trouves dans l&apos;Union européenne, tu peux exercer tes droits
        directement à cette adresse. Nous n&apos;avons pas de représentant désigné dans
        l&apos;UE pour le moment, mais nous traitons toutes les demandes dans les délais
        réglementaires.
      </p>

      <h2 id="donnees">Renseignements collectés</h2>

      <h3>Sur le site ajnix.com</h3>

      <h4>Formulaires d&apos;inscription (waitlist plugin, waitlist Pro, contact)</h4>
      <p>Lorsque tu t&apos;inscris à une liste d&apos;attente ou que tu nous contactes, on collecte :</p>
      <ul>
        <li>Adresse email (obligatoire)</li>
        <li>Prénom (optionnel)</li>
        <li>Type de site WordPress, GMV approximatif, ou autres informations contextuelles si tu les fournis</li>
        <li>Source d&apos;inscription (quelle page tu utilisais, quel CTA tu as cliqué)</li>
      </ul>
      <p>
        Ces informations servent uniquement à te tenir informé du lancement, à
        personnaliser nos communications, et à comprendre quels canaux marketing
        fonctionnent.
      </p>

      <h4>Données de navigation</h4>
      <p>Lorsque tu visites ajnix.com, certaines données techniques sont collectées :</p>
      <ul>
        <li>Adresse IP (anonymisée)</li>
        <li>Type de navigateur et système d&apos;exploitation</li>
        <li>Pages visitées et durée de la visite</li>
        <li>Source de référencement</li>
        <li>Pays approximatif (basé sur la géolocalisation IP)</li>
      </ul>
      <p>
        Ces données sont collectées via Google Analytics 4, uniquement si tu as donné
        ton consentement aux cookies analytiques via le bandeau de consentement.
      </p>
      <p>
        À court terme, nous prévoyons remplacer Google Analytics par notre propre
        plugin Ajnix sur ajnix.com (dogfooding), ce qui éliminera tout transfert de
        données vers des serveurs tiers.
      </p>

      <h4>Compte client (lorsque la version Pro sera lancée)</h4>
      <p>Si tu crées un compte sur Ajnix Pro, on collectera également :</p>
      <ul>
        <li>Adresse email</li>
        <li>Mot de passe (haché, jamais stocké en clair)</li>
        <li>URL du ou des sites WordPress connectés</li>
        <li>Informations de facturation (gérées par notre processeur de paiement, on ne stocke aucune donnée de carte)</li>
      </ul>

      <h3>Sur ton site WordPress (via le plugin)</h3>
      <p>
        <strong>Important</strong> : le plugin Ajnix installé sur ton site WordPress
        collecte des données sur tes propres visiteurs. Ces données restent sur{' '}
        <strong>ton serveur</strong>, pas le nôtre. Pour la version gratuite, aucune
        donnée ne nous est jamais transmise.
      </p>
      <p>
        Voir la section{' '}
        <a href="#plugin">Le plugin Ajnix et tes propres visiteurs</a> pour les détails
        techniques.
      </p>

      <h2 id="cookies">Cookies et technologies de suivi</h2>

      <h3>Cookies essentiels (toujours actifs)</h3>
      <p>
        Ces cookies sont nécessaires au fonctionnement du site. Aucun consentement
        n&apos;est requis car ils ne servent pas à du tracking.
      </p>
      <ul>
        <li>Préférence de langue (fr/en)</li>
        <li>Préférence de thème (clair/sombre, si applicable)</li>
        <li>Token de session pour les utilisateurs connectés à l&apos;admin Pro</li>
        <li>Préférence de consentement aux cookies analytiques</li>
      </ul>

      <h3>Cookies analytiques (avec consentement)</h3>
      <p>
        <strong>Google Analytics 4 (GA4)</strong> — Mesure d&apos;audience, pages
        visitées, sources de trafic, comportement de navigation. Les adresses IP sont
        anonymisées.
      </p>
      <p>
        Ces cookies ne sont activés que si tu donnes ton consentement explicite via
        le bandeau affiché lors de ta première visite. Tu peux modifier tes
        préférences en tout temps en cliquant sur le lien «&nbsp;Préférences
        cookies&nbsp;» dans le pied de page.
      </p>
      <p>
        Données traitées par Google LLC.{' '}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noreferrer noopener"
        >
          Politique de confidentialité Google
        </a>
        .
      </p>

      <h3>À venir : Ajnix sur ajnix.com</h3>
      <p>
        À court terme, nous remplacerons Google Analytics par notre propre plugin
        Ajnix pour le tracking de notre site. Cette migration éliminera l&apos;utilisation
        de cookies tiers et de transferts de données vers Google. Cette politique
        sera mise à jour en conséquence.
      </p>

      <h3>Pas de cookies marketing</h3>
      <p>
        Notre site ajnix.com n&apos;utilise <strong>aucun</strong> cookie de retargeting
        publicitaire :
      </p>
      <ul>
        <li>Pas de Meta Pixel (Facebook)</li>
        <li>Pas de LinkedIn Insight Tag</li>
        <li>Pas de TikTok Pixel</li>
        <li>Pas de Google Ads remarketing</li>
        <li>Pas d&apos;outils de session replay (Hotjar, FullStory, etc.)</li>
      </ul>
      <p>
        Si nous ajoutons des cookies marketing dans le futur (par exemple un pixel
        publicitaire pour des campagnes spécifiques), un bandeau de consentement
        explicite sera mis en place et tu pourras refuser sans impact sur ton
        expérience.
      </p>

      <h2 id="utilisation">Utilisation des renseignements</h2>
      <p>Tes renseignements personnels sont utilisés uniquement pour :</p>
      <ul>
        <li>Te répondre lorsque tu nous contactes</li>
        <li>T&apos;envoyer des emails liés à ta liste d&apos;attente (annonces de lancement, accès anticipé)</li>
        <li>T&apos;envoyer des emails liés à ton compte client si tu en crées un (factures, mises à jour produit, support)</li>
        <li>Améliorer notre produit en analysant comment les visiteurs utilisent le site (données agrégées, anonymisées)</li>
      </ul>
      <p>
        On n&apos;utilise <strong>jamais</strong> tes renseignements personnels pour :
      </p>
      <ul>
        <li>Vendre ou louer à des tiers</li>
        <li>Profiler à des fins publicitaires</li>
        <li>Entraîner des modèles d&apos;intelligence artificielle</li>
        <li>Toute finalité non mentionnée ci-dessus</li>
      </ul>

      <h2 id="partage">Partage des renseignements</h2>
      <p>
        On ne vend, ne loue et ne partage tes renseignements personnels avec aucun
        tiers, sauf dans les cas suivants :
      </p>

      <h3>Fournisseurs de services techniques</h3>
      <p>
        Pour faire fonctionner notre site et nos services, on utilise quelques outils
        tiers qui peuvent traiter tes données pour notre compte :
      </p>
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Finalité</th>
            <th>Localisation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Loops.so</td>
            <td>Envoi des emails marketing et waitlist</td>
            <td>États-Unis</td>
          </tr>
          <tr>
            <td>Mailgun</td>
            <td>Envoi des emails transactionnels</td>
            <td>États-Unis ou Europe</td>
          </tr>
          <tr>
            <td>Google Analytics</td>
            <td>Mesure d&apos;audience</td>
            <td>États-Unis</td>
          </tr>
          <tr>
            <td>Stripe</td>
            <td>Traitement des paiements (lorsque Pro sera lancé)</td>
            <td>États-Unis, Irlande</td>
          </tr>
          <tr>
            <td>AWS (Amazon Web Services)</td>
            <td>Hébergement du site</td>
            <td>Mondial</td>
          </tr>
        </tbody>
      </table>
      <p>
        Chacun de ces fournisseurs a sa propre politique de confidentialité et ses
        propres mesures de sécurité. On choisit nos partenaires en privilégiant ceux
        qui respectent les standards RGPD.
      </p>

      <h3>Obligation légale</h3>
      <p>
        On peut être tenu de divulguer tes renseignements en réponse à une ordonnance
        d&apos;un tribunal, à une demande d&apos;une autorité compétente ou pour répondre à
        une obligation légale.
      </p>

      <h3>Transfert d&apos;entreprise</h3>
      <p>
        Dans le cas hypothétique d&apos;une fusion, acquisition ou vente d&apos;actifs, tes
        renseignements pourraient être transférés au successeur. Nous t&apos;en
        informerons et t&apos;offrirons l&apos;option de supprimer tes données avant le
        transfert.
      </p>

      <h2 id="conservation">Conservation des données</h2>
      <table>
        <thead>
          <tr>
            <th>Type de données</th>
            <th>Durée de conservation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Inscriptions waitlist</td>
            <td>Jusqu&apos;à ta désinscription ou conversion en client</td>
          </tr>
          <tr>
            <td>Emails de contact</td>
            <td>24 mois après le dernier échange</td>
          </tr>
          <tr>
            <td>Compte client (Pro)</td>
            <td>Pendant la durée de ton abonnement + 12 mois après résiliation</td>
          </tr>
          <tr>
            <td>Données de facturation</td>
            <td>7 ans (obligation légale fiscale)</td>
          </tr>
          <tr>
            <td>Données de navigation analytiques</td>
            <td>24 mois</td>
          </tr>
          <tr>
            <td>Logs serveur (sécurité)</td>
            <td>90 jours</td>
          </tr>
        </tbody>
      </table>
      <p>
        Tu peux demander la suppression de tes données en tout temps, sauf pour les
        données soumises à une obligation légale de conservation (factures
        notamment).
      </p>

      <h2 id="securite">Sécurité</h2>
      <p>
        On prend les mesures techniques et organisationnelles appropriées pour
        protéger tes renseignements personnels :
      </p>
      <ul>
        <li>Chiffrement HTTPS sur toutes les pages du site</li>
        <li>Mots de passe hachés avec bcrypt (jamais stockés en clair)</li>
        <li>Accès aux données restreint aux personnes autorisées</li>
        <li>Sauvegardes chiffrées avec rotation</li>
        <li>Audits de sécurité réguliers du code et de l&apos;infrastructure</li>
      </ul>
      <p>
        Aucun système n&apos;est totalement sécurisé. En cas de violation de données
        affectant tes renseignements personnels, on te notifiera dans les 72 heures
        conformément aux exigences du RGPD et des autres lois applicables.
      </p>

      <h2 id="droits">Tes droits</h2>
      <p>
        Selon ta juridiction, tu disposes de droits sur tes renseignements
        personnels. Voici les principaux :
      </p>

      <h3>Droit d&apos;accès</h3>
      <p>Tu peux demander une copie de toutes les données qu&apos;on détient sur toi.</p>

      <h3>Droit de rectification</h3>
      <p>Tu peux demander la correction de données inexactes ou incomplètes.</p>

      <h3>Droit à l&apos;effacement (droit à l&apos;oubli)</h3>
      <p>
        Tu peux demander la suppression de tes données, sous réserve des obligations
        légales de conservation.
      </p>

      <h3>Droit à la portabilité</h3>
      <p>
        Tu peux demander une copie structurée de tes données dans un format lisible
        par machine (JSON, CSV).
      </p>

      <h3>Droit d&apos;opposition</h3>
      <p>
        Tu peux t&apos;opposer au traitement de tes données pour certaines finalités
        (notamment marketing).
      </p>

      <h3>Droit de retirer ton consentement</h3>
      <p>
        Si le traitement repose sur ton consentement, tu peux le retirer à tout
        moment sans affecter la légalité des traitements antérieurs.
      </p>

      <h3>Droit de déposer une plainte</h3>
      <p>
        Si tu estimes que tes droits ne sont pas respectés, tu peux déposer une
        plainte auprès de l&apos;autorité de protection des données de ta juridiction :
      </p>
      <ul>
        <li><strong>Union européenne</strong> : autorité nationale de protection des données (CNIL en France, AEPD en Espagne, etc.)</li>
        <li><strong>Royaume-Uni</strong> : Information Commissioner&apos;s Office (ICO)</li>
        <li><strong>Québec</strong> : Commission d&apos;accès à l&apos;information (CAI)</li>
        <li><strong>Canada (autres provinces)</strong> : Commissariat à la protection de la vie privée du Canada</li>
        <li><strong>Californie</strong> : California Privacy Protection Agency (CPPA)</li>
        <li><strong>Brésil</strong> : Autoridade Nacional de Proteção de Dados (ANPD)</li>
      </ul>
      <p>
        Pour exercer ces droits, contacte-nous à{' '}
        <ObfuscatedEmail user={PRIVACY_EMAIL.user} domain={PRIVACY_EMAIL.domain} />. On s&apos;engage à
        répondre dans un délai de 30 jours.
      </p>

      <h3>Droits spécifiques aux résidents de Californie (CCPA/CPRA)</h3>
      <p>Si tu résides en Californie, tu disposes de droits supplémentaires :</p>
      <ul>
        <li>Droit de savoir quelles catégories de données sont collectées</li>
        <li>Droit de savoir si tes données ont été vendues ou partagées (Ajnix ne vend ni ne partage pour des fins de publicité ciblée)</li>
        <li>Droit à la non-discrimination pour avoir exercé tes droits</li>
      </ul>
      <p>
        Tu peux exercer ces droits via{' '}
        <ObfuscatedEmail user={PRIVACY_EMAIL.user} domain={PRIVACY_EMAIL.domain} />. Aucune
        authentification spéciale n&apos;est requise au-delà de la confirmation de ton
        adresse email.
      </p>

      <h2 id="transferts">Transferts internationaux</h2>
      <p>
        Tes données peuvent être transférées et traitées dans des pays situés en
        dehors de ta juridiction de résidence, notamment au Canada, aux États-Unis et
        en Europe, selon les fournisseurs de services utilisés.
      </p>
      <p>
        Nous nous assurons que ces transferts s&apos;effectuent dans le respect des cadres
        légaux applicables :
      </p>
      <ul>
        <li><strong>Pour les transferts vers les États-Unis</strong> : nos fournisseurs sont certifiés au Data Privacy Framework UE-USA (lorsque applicable) ou utilisent des Clauses Contractuelles Types approuvées par la Commission européenne.</li>
        <li><strong>Pour les transferts vers le Canada</strong> : le Canada bénéficie d&apos;une décision d&apos;adéquation de la Commission européenne, ce qui signifie que la protection y est jugée équivalente à celle du RGPD.</li>
        <li><strong>Pour les autres juridictions</strong> : nous évaluons au cas par cas et appliquons les garanties appropriées.</li>
      </ul>

      <h2 id="plugin">Le plugin Ajnix et tes propres visiteurs</h2>
      <p>
        Cette section concerne uniquement les utilisateurs du plugin WordPress Ajnix
        installé sur leur propre site.
      </p>

      <h3>Données collectées par le plugin</h3>
      <p>
        Lorsque tu installes Ajnix sur ton site WordPress, le plugin collecte des
        données sur <strong>tes visiteurs</strong> :
      </p>
      <ul>
        <li>Identifiant aléatoire de visiteur (UUID, pas d&apos;identification personnelle)</li>
        <li>Sessions de navigation</li>
        <li>Pages visitées</li>
        <li>Sources de trafic (UTMs, click IDs publicitaires)</li>
        <li>Conversions e-commerce (si WooCommerce est actif)</li>
      </ul>

      <h3>Où sont stockées ces données</h3>
      <p>
        <strong>Dans la version gratuite</strong> : toutes les données restent sur
        ton serveur WordPress, dans tes propres tables de base de données. Ajnix ne
        reçoit <strong>aucune</strong> de ces données.
      </p>
      <p>
        <strong>Dans la version Pro</strong> : les données restent par défaut sur ton
        serveur. Tu peux activer optionnellement une synchronisation vers nos
        serveurs SaaS pour bénéficier des fonctionnalités avancées (dashboard
        centralisé, insights IA, conversions server-side). Cette synchronisation est
        désactivée par défaut et nécessite ton activation explicite.
      </p>

      <h3>Privacy-first par design</h3>
      <p>Ajnix a été conçu pour minimiser la collecte de données personnelles :</p>
      <ul>
        <li>Les adresses IP sont <strong>tronquées avant d&apos;être stockées</strong> (IPv4 /24, IPv6 /48)</li>
        <li>Aucun email, nom ou champ de formulaire n&apos;est stocké avec les événements</li>
        <li>Aucun fingerprinting de navigateur ou d&apos;appareil</li>
        <li>Respect du signal Do Not Track</li>
        <li>Aucun cookie tiers, uniquement des cookies first-party sur ton propre domaine</li>
      </ul>

      <h3>Ta responsabilité en tant qu&apos;opérateur du site</h3>
      <p>
        En tant qu&apos;utilisateur du plugin, tu es responsable du traitement des données
        de tes propres visiteurs. Selon ta juridiction et la nature de ton site, tu
        pourrais avoir besoin de :
      </p>
      <ul>
        <li>Mettre à jour ta propre politique de confidentialité pour mentionner Ajnix</li>
        <li>Installer un bandeau de consentement (Ajnix s&apos;intègre nativement avec Complianz, CookieYes, Cookiebot et Iubenda)</li>
        <li>Déclarer le traitement à ton autorité locale si requis</li>
      </ul>
      <p>
        Voir notre{' '}
        <a href="/docs/concepts/privacy-by-design">
          documentation privacy-by-design
        </a>{' '}
        pour plus de détails techniques.
      </p>

      <h2 id="modifications">Modifications</h2>
      <p>
        On se réserve le droit de modifier cette politique de confidentialité en tout
        temps. La date de la dernière mise à jour est indiquée en haut de cette page.
      </p>
      <p>
        En cas de modification importante (changement substantiel dans la collecte
        ou l&apos;utilisation de tes données), nous t&apos;informerons par email si tu es
        inscrit à une liste ou si tu as un compte chez nous.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        Pour toute question concernant cette politique ou le traitement de tes
        renseignements personnels :
      </p>
      <p>
        <strong>Eric St-Amant</strong>
        <br />
        <ObfuscatedEmail user={PRIVACY_EMAIL.user} domain={PRIVACY_EMAIL.domain} />
      </p>
      <p>
        Pour les demandes d&apos;exercice de droits (accès, rectification, suppression,
        portabilité), précise dans ton message :
      </p>
      <ul>
        <li>La nature de ta demande</li>
        <li>Ton adresse email associée à nos services</li>
        <li>Ta juridiction de résidence (pour appliquer les droits applicables)</li>
      </ul>
      <p>Réponse garantie sous 30 jours.</p>
    </>
  );
}
