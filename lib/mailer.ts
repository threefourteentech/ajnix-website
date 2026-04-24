import 'server-only';
import nodemailer, { type Transporter } from 'nodemailer';

type MailInput = {
  to?: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

let cachedTransporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (cachedTransporter) return cachedTransporter;
  const host = process.env.SMTP_HOST;
  if (!host) return null;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const secure = (process.env.SMTP_SECURE ?? (port === 465 ? 'true' : 'false')) === 'true';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: user && pass ? { user, pass } : undefined,
  });
  return cachedTransporter;
}

export async function sendMail({ to, subject, text, html, replyTo }: MailInput): Promise<
  { sent: true; messageId?: string } | { sent: false; reason: string }
> {
  const transporter = getTransporter();
  if (!transporter) return { sent: false, reason: 'smtp_not_configured' };

  const from = process.env.MAIL_FROM ?? 'Ajnix <noreply@ajnix.com>';
  const recipient = to ?? process.env.CONTACT_TO ?? 'eric@stamant.me';

  try {
    const info = await transporter.sendMail({
      from,
      to: recipient,
      subject,
      text,
      html,
      replyTo,
    });
    return { sent: true, messageId: info.messageId };
  } catch (err) {
    console.error('[mailer] send failed', err);
    return { sent: false, reason: 'send_error' };
  }
}
