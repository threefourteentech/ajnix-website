import { ObfuscatedEmail } from '@/components/ui/ObfuscatedEmail';

const PRIVACY_EMAIL = { user: 'privacy', domain: 'ajnix.com' } as const;

export function PrivacyContentEN() {
  return (
    <>
      <h2 id="introduction">Introduction</h2>
      <p>
        This privacy policy describes how Ajnix collects, uses, and protects your
        personal information when you use our website ajnix.com and associated
        services (the WordPress plugin, the Pro version, and the API).
      </p>
      <p>
        We take privacy seriously. It&apos;s actually at the heart of our product: Ajnix
        is designed to analyze marketing data without collecting personally
        identifiable information. The same philosophy applies to our own site.
      </p>
      <p>This policy complies with several international legal frameworks:</p>
      <ul>
        <li>General Data Protection Regulation (GDPR) — European Union</li>
        <li>Act Respecting the Protection of Personal Information in the Private Sector (Law 25) — Quebec, Canada</li>
        <li>Personal Information Protection and Electronic Documents Act (PIPEDA) — Canada</li>
        <li>California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA) — California, USA</li>
        <li>Lei Geral de Proteção de Dados (LGPD) — Brazil</li>
        <li>UK GDPR — United Kingdom</li>
        <li>Privacy Act 1988 — Australia</li>
      </ul>
      <p>
        If you reside in a jurisdiction that grants you additional rights, those
        rights apply to you. Contact us with any questions.
      </p>

      <h2 id="controller">Data controller</h2>
      <p>
        Ajnix is operated by <strong>Eric St-Amant</strong>, based in Quebec, Canada.
      </p>
      <p>For any question regarding your personal information:</p>
      <p>
        <ObfuscatedEmail user={PRIVACY_EMAIL.user} domain={PRIVACY_EMAIL.domain} />
      </p>
      <p>
        If you are located in the European Union, you can exercise your rights
        directly at this address. We do not currently have a designated EU
        representative, but we process all requests within the regulatory
        timeframes.
      </p>

      <h2 id="data">Information collected</h2>

      <h3>On the ajnix.com website</h3>

      <h4>Signup forms (plugin waitlist, Pro waitlist, contact)</h4>
      <p>When you sign up for a waitlist or contact us, we collect:</p>
      <ul>
        <li>Email address (required)</li>
        <li>First name (optional)</li>
        <li>WordPress site type, approximate GMV, or other contextual information if you provide it</li>
        <li>Signup source (which page you were on, which CTA you clicked)</li>
      </ul>
      <p>
        This information is used only to keep you informed about the launch,
        personalize our communications, and understand which marketing channels are
        working.
      </p>

      <h4>Browsing data</h4>
      <p>When you visit ajnix.com, some technical data is collected:</p>
      <ul>
        <li>IP address (anonymized)</li>
        <li>Browser type and operating system</li>
        <li>Pages visited and visit duration</li>
        <li>Referring source</li>
        <li>Approximate country (based on IP geolocation)</li>
      </ul>
      <p>
        This data is collected via Google Analytics 4, only if you have given your
        consent to analytics cookies through the consent banner.
      </p>
      <p>
        In the short term, we plan to replace Google Analytics with our own Ajnix
        plugin on ajnix.com (dogfooding), which will eliminate any data transfer to
        third-party servers.
      </p>

      <h4>Customer account (once the Pro version launches)</h4>
      <p>If you create an account on Ajnix Pro, we will also collect:</p>
      <ul>
        <li>Email address</li>
        <li>Password (hashed, never stored in plain text)</li>
        <li>URL(s) of the connected WordPress site(s)</li>
        <li>Billing information (handled by our payment processor, we do not store any card data)</li>
      </ul>

      <h3>On your WordPress site (via the plugin)</h3>
      <p>
        <strong>Important</strong>: the Ajnix plugin installed on your WordPress
        site collects data about your own visitors. This data stays on{' '}
        <strong>your server</strong>, not ours. For the free version, no data is
        ever transmitted to us.
      </p>
      <p>
        See the <a href="#plugin">Ajnix plugin and your own visitors</a> section for
        technical details.
      </p>

      <h2 id="cookies">Cookies and tracking technologies</h2>

      <h3>Essential cookies (always active)</h3>
      <p>
        These cookies are necessary for the site to function. No consent is required
        because they are not used for tracking.
      </p>
      <ul>
        <li>Language preference (en/fr)</li>
        <li>Theme preference (light/dark, if applicable)</li>
        <li>Session token for users logged in to the Pro admin</li>
        <li>Analytics cookie consent preference</li>
      </ul>

      <h3>Analytics cookies (with consent)</h3>
      <p>
        <strong>Google Analytics 4 (GA4)</strong> — Audience measurement, pages
        visited, traffic sources, browsing behavior. IP addresses are anonymized.
      </p>
      <p>
        These cookies are activated only if you give your explicit consent via the
        banner displayed on your first visit. You can change your preferences at
        any time by clicking the &ldquo;Cookie preferences&rdquo; link in the
        footer.
      </p>
      <p>
        Data processed by Google LLC.{' '}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noreferrer noopener"
        >
          Google Privacy Policy
        </a>
        .
      </p>

      <h3>Coming soon: Ajnix on ajnix.com</h3>
      <p>
        In the short term, we&apos;ll replace Google Analytics with our own Ajnix plugin
        to track our site. This migration will eliminate the use of third-party
        cookies and data transfers to Google. This policy will be updated
        accordingly.
      </p>

      <h3>No marketing cookies</h3>
      <p>
        Our ajnix.com site uses <strong>no</strong> advertising retargeting cookies:
      </p>
      <ul>
        <li>No Meta Pixel (Facebook)</li>
        <li>No LinkedIn Insight Tag</li>
        <li>No TikTok Pixel</li>
        <li>No Google Ads remarketing</li>
        <li>No session replay tools (Hotjar, FullStory, etc.)</li>
      </ul>
      <p>
        If we add marketing cookies in the future (for example, an advertising
        pixel for specific campaigns), an explicit consent banner will be
        implemented and you&apos;ll be able to decline without any impact on your
        experience.
      </p>

      <h2 id="use">Use of information</h2>
      <p>Your personal information is used only to:</p>
      <ul>
        <li>Reply when you contact us</li>
        <li>Send you emails related to your waitlist (launch announcements, early access)</li>
        <li>Send you emails related to your customer account if you create one (invoices, product updates, support)</li>
        <li>Improve our product by analyzing how visitors use the site (aggregated, anonymized data)</li>
      </ul>
      <p>
        We <strong>never</strong> use your personal information to:
      </p>
      <ul>
        <li>Sell or rent to third parties</li>
        <li>Profile for advertising purposes</li>
        <li>Train artificial intelligence models</li>
        <li>Any purpose not mentioned above</li>
      </ul>

      <h2 id="sharing">Sharing of information</h2>
      <p>
        We do not sell, rent, or share your personal information with any third
        party, except in the following cases:
      </p>

      <h3>Technical service providers</h3>
      <p>
        To operate our site and services, we use a few third-party tools that may
        process your data on our behalf:
      </p>
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Purpose</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Loops.so</td>
            <td>Marketing and waitlist email delivery</td>
            <td>United States</td>
          </tr>
          <tr>
            <td>Mailgun</td>
            <td>Transactional email delivery</td>
            <td>United States or Europe</td>
          </tr>
          <tr>
            <td>Google Analytics</td>
            <td>Audience measurement</td>
            <td>United States</td>
          </tr>
          <tr>
            <td>Stripe</td>
            <td>Payment processing (once Pro launches)</td>
            <td>United States, Ireland</td>
          </tr>
          <tr>
            <td>AWS (Amazon Web Services)</td>
            <td>Site hosting</td>
            <td>Global</td>
          </tr>
        </tbody>
      </table>
      <p>
        Each of these providers has its own privacy policy and security measures.
        We choose our partners by prioritizing those that meet GDPR standards.
      </p>

      <h3>Legal obligation</h3>
      <p>
        We may be required to disclose your information in response to a court
        order, a request from a competent authority, or to comply with a legal
        obligation.
      </p>

      <h3>Business transfer</h3>
      <p>
        In the hypothetical case of a merger, acquisition, or sale of assets, your
        information could be transferred to the successor. We will inform you and
        offer you the option to delete your data before the transfer.
      </p>

      <h2 id="retention">Data retention</h2>
      <table>
        <thead>
          <tr>
            <th>Type of data</th>
            <th>Retention period</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Waitlist signups</td>
            <td>Until you unsubscribe or convert to a customer</td>
          </tr>
          <tr>
            <td>Contact emails</td>
            <td>24 months after the last exchange</td>
          </tr>
          <tr>
            <td>Customer account (Pro)</td>
            <td>For the duration of your subscription + 12 months after cancellation</td>
          </tr>
          <tr>
            <td>Billing data</td>
            <td>7 years (legal tax obligation)</td>
          </tr>
          <tr>
            <td>Analytics browsing data</td>
            <td>24 months</td>
          </tr>
          <tr>
            <td>Server logs (security)</td>
            <td>90 days</td>
          </tr>
        </tbody>
      </table>
      <p>
        You can request the deletion of your data at any time, except for data
        subject to a legal retention obligation (invoices in particular).
      </p>

      <h2 id="security">Security</h2>
      <p>
        We take appropriate technical and organizational measures to protect your
        personal information:
      </p>
      <ul>
        <li>HTTPS encryption on all pages of the site</li>
        <li>Passwords hashed with bcrypt (never stored in plain text)</li>
        <li>Data access restricted to authorized personnel</li>
        <li>Encrypted backups with rotation</li>
        <li>Regular security audits of code and infrastructure</li>
      </ul>
      <p>
        No system is completely secure. In the event of a data breach affecting
        your personal information, we will notify you within 72 hours in accordance
        with GDPR and other applicable laws.
      </p>

      <h2 id="rights">Your rights</h2>
      <p>
        Depending on your jurisdiction, you have rights over your personal
        information. Here are the main ones:
      </p>

      <h3>Right of access</h3>
      <p>You can request a copy of all the data we hold about you.</p>

      <h3>Right to rectification</h3>
      <p>You can request the correction of inaccurate or incomplete data.</p>

      <h3>Right to erasure (right to be forgotten)</h3>
      <p>
        You can request the deletion of your data, subject to legal retention
        obligations.
      </p>

      <h3>Right to portability</h3>
      <p>
        You can request a structured copy of your data in a machine-readable format
        (JSON, CSV).
      </p>

      <h3>Right to object</h3>
      <p>
        You can object to the processing of your data for certain purposes
        (notably marketing).
      </p>

      <h3>Right to withdraw your consent</h3>
      <p>
        If processing is based on your consent, you can withdraw it at any time
        without affecting the lawfulness of prior processing.
      </p>

      <h3>Right to lodge a complaint</h3>
      <p>
        If you believe your rights are not being respected, you can file a
        complaint with the data protection authority of your jurisdiction:
      </p>
      <ul>
        <li><strong>European Union</strong>: national data protection authority (CNIL in France, AEPD in Spain, etc.)</li>
        <li><strong>United Kingdom</strong>: Information Commissioner&apos;s Office (ICO)</li>
        <li><strong>Quebec</strong>: Commission d&apos;accès à l&apos;information (CAI)</li>
        <li><strong>Canada (other provinces)</strong>: Office of the Privacy Commissioner of Canada</li>
        <li><strong>California</strong>: California Privacy Protection Agency (CPPA)</li>
        <li><strong>Brazil</strong>: Autoridade Nacional de Proteção de Dados (ANPD)</li>
      </ul>
      <p>
        To exercise these rights, contact us at{' '}
        <ObfuscatedEmail user={PRIVACY_EMAIL.user} domain={PRIVACY_EMAIL.domain} />. We commit to
        respond within 30 days.
      </p>

      <h3>Rights specific to California residents (CCPA/CPRA)</h3>
      <p>If you reside in California, you have additional rights:</p>
      <ul>
        <li>Right to know which categories of data are collected</li>
        <li>Right to know whether your data has been sold or shared (Ajnix does not sell or share for targeted advertising purposes)</li>
        <li>Right to non-discrimination for exercising your rights</li>
      </ul>
      <p>
        You can exercise these rights via{' '}
        <ObfuscatedEmail user={PRIVACY_EMAIL.user} domain={PRIVACY_EMAIL.domain} />. No special
        authentication is required beyond confirming your email address.
      </p>

      <h2 id="transfers">International transfers</h2>
      <p>
        Your data may be transferred and processed in countries outside your
        jurisdiction of residence, including Canada, the United States, and Europe,
        depending on the service providers used.
      </p>
      <p>
        We ensure that these transfers are carried out in compliance with
        applicable legal frameworks:
      </p>
      <ul>
        <li><strong>For transfers to the United States</strong>: our providers are certified under the EU-US Data Privacy Framework (when applicable) or use Standard Contractual Clauses approved by the European Commission.</li>
        <li><strong>For transfers to Canada</strong>: Canada benefits from an adequacy decision from the European Commission, meaning its protection is deemed equivalent to GDPR.</li>
        <li><strong>For other jurisdictions</strong>: we evaluate case by case and apply appropriate safeguards.</li>
      </ul>

      <h2 id="plugin">The Ajnix plugin and your own visitors</h2>
      <p>
        This section applies only to users of the Ajnix WordPress plugin installed
        on their own site.
      </p>

      <h3>Data collected by the plugin</h3>
      <p>
        When you install Ajnix on your WordPress site, the plugin collects data
        about <strong>your visitors</strong>:
      </p>
      <ul>
        <li>Random visitor identifier (UUID, no personal identification)</li>
        <li>Browsing sessions</li>
        <li>Pages visited</li>
        <li>Traffic sources (UTMs, ad click IDs)</li>
        <li>E-commerce conversions (if WooCommerce is active)</li>
      </ul>

      <h3>Where this data is stored</h3>
      <p>
        <strong>In the free version</strong>: all data stays on your WordPress
        server, in your own database tables. Ajnix receives <strong>none</strong>{' '}
        of this data.
      </p>
      <p>
        <strong>In the Pro version</strong>: data stays on your server by default.
        You can optionally enable synchronization to our SaaS servers to benefit
        from advanced features (centralized dashboard, AI insights, server-side
        conversions). This synchronization is disabled by default and requires
        your explicit activation.
      </p>

      <h3>Privacy-first by design</h3>
      <p>
        Ajnix was designed to minimize the collection of personal data:
      </p>
      <ul>
        <li>IP addresses are <strong>truncated before being stored</strong> (IPv4 /24, IPv6 /48)</li>
        <li>No email, name, or form field is stored with events</li>
        <li>No browser or device fingerprinting</li>
        <li>Do Not Track signal is respected</li>
        <li>No third-party cookies, only first-party cookies on your own domain</li>
      </ul>

      <h3>Your responsibility as the site operator</h3>
      <p>
        As a plugin user, you are responsible for the processing of your own
        visitors&apos; data. Depending on your jurisdiction and the nature of your
        site, you may need to:
      </p>
      <ul>
        <li>Update your own privacy policy to mention Ajnix</li>
        <li>Install a consent banner (Ajnix integrates natively with Complianz, CookieYes, Cookiebot, and Iubenda)</li>
        <li>Declare the processing to your local authority if required</li>
      </ul>
      <p>
        See our{' '}
        <a href="/docs/concepts/privacy-by-design">
          privacy-by-design documentation
        </a>{' '}
        for more technical details.
      </p>

      <h2 id="modifications">Modifications</h2>
      <p>
        We reserve the right to modify this privacy policy at any time. The date
        of the last update is indicated at the top of this page.
      </p>
      <p>
        In case of significant changes (substantial change in the collection or
        use of your data), we will notify you by email if you are on a list or
        have an account with us.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        For any question regarding this policy or the processing of your personal
        information:
      </p>
      <p>
        <strong>Eric St-Amant</strong>
        <br />
        <ObfuscatedEmail user={PRIVACY_EMAIL.user} domain={PRIVACY_EMAIL.domain} />
      </p>
      <p>
        For requests to exercise your rights (access, rectification, deletion,
        portability), specify in your message:
      </p>
      <ul>
        <li>The nature of your request</li>
        <li>Your email address associated with our services</li>
        <li>Your jurisdiction of residence (to apply the applicable rights)</li>
      </ul>
      <p>Response guaranteed within 30 days.</p>
    </>
  );
}
