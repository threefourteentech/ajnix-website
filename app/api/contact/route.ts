import { promises as fs } from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendMail } from '@/lib/mailer';

const submitSchema = z.object({
  name: z.string().trim().min(2).max(200),
  email: z.string().trim().toLowerCase().email(),
  topic: z.string().trim().min(1).max(120),
  message: z.string().trim().min(10).max(8000),
  locale: z.enum(['en', 'fr']).default('en'),
  company: z.string().optional(),
  recaptchaToken: z.string().optional(),
});

type Entry = {
  name: string;
  email: string;
  topic: string;
  message: string;
  locale: 'en' | 'fr';
  createdAt: string;
};

type Store = { entries: Entry[] };

const CONTACT_FILE = path.join(process.cwd(), 'data', 'contact.json');

async function readStore(): Promise<Store> {
  try {
    const raw = await fs.readFile(CONTACT_FILE, 'utf8');
    return JSON.parse(raw) as Store;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return { entries: [] };
    throw err;
  }
}

async function writeStore(store: Store) {
  await fs.mkdir(path.dirname(CONTACT_FILE), { recursive: true });
  await fs.writeFile(CONTACT_FILE, JSON.stringify(store, null, 2), 'utf8');
}

async function verifyRecaptcha(token: string | undefined): Promise<{
  ok: boolean;
  score?: number;
  reason?: string;
}> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return { ok: true };
  if (!token) return { ok: false, reason: 'missing_token' };

  const minScore = Number(process.env.RECAPTCHA_MIN_SCORE ?? '0.5');
  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = (await res.json()) as {
      success: boolean;
      score?: number;
      'error-codes'?: string[];
    };
    if (!data.success) {
      return { ok: false, reason: data['error-codes']?.join(',') ?? 'verify_failed' };
    }
    if (typeof data.score === 'number' && data.score < minScore) {
      return { ok: false, score: data.score, reason: 'low_score' };
    }
    return { ok: true, score: data.score };
  } catch (err) {
    console.error('[contact] recaptcha verify error', err);
    return { ok: false, reason: 'verify_error' };
  }
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = submitSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'invalid_input', issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  if (parsed.data.company && parsed.data.company.trim() !== '') {
    console.warn(`[contact] honeypot tripped email=${parsed.data.email}`);
    return NextResponse.json({ ok: true });
  }

  const captcha = await verifyRecaptcha(parsed.data.recaptchaToken);
  if (!captcha.ok) {
    console.warn(
      `[contact] recaptcha rejected email=${parsed.data.email} reason=${captcha.reason} score=${captcha.score ?? 'n/a'}`,
    );
    return NextResponse.json({ ok: false, error: 'captcha_rejected' }, { status: 400 });
  }

  try {
    const entry: Entry = {
      name: parsed.data.name,
      email: parsed.data.email,
      topic: parsed.data.topic,
      message: parsed.data.message,
      locale: parsed.data.locale,
      createdAt: new Date().toISOString(),
    };
    const store = await readStore();
    store.entries.push(entry);
    await writeStore(store);
    console.log(
      `[contact] new message from=${entry.email} topic="${entry.topic}" locale=${entry.locale}`,
    );

    const subject = `[Ajnix contact] ${entry.topic} — ${entry.name}`;
    const text = [
      `From: ${entry.name} <${entry.email}>`,
      `Topic: ${entry.topic}`,
      `Locale: ${entry.locale}`,
      `Received: ${entry.createdAt}`,
      '',
      entry.message,
    ].join('\n');
    const escape = (s: string) =>
      s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;font-size:14px;line-height:1.55;color:#111">
        <p><strong>From:</strong> ${escape(entry.name)} &lt;<a href="mailto:${escape(entry.email)}">${escape(entry.email)}</a>&gt;</p>
        <p><strong>Topic:</strong> ${escape(entry.topic)} · <strong>Locale:</strong> ${entry.locale}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
        <div style="white-space:pre-wrap">${escape(entry.message)}</div>
      </div>
    `;

    const mail = await sendMail({ subject, text, html, replyTo: entry.email });
    if (!mail.sent) {
      console.warn(`[contact] mail not sent (${mail.reason}); entry persisted`);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] write failed', err);
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
  }
}
