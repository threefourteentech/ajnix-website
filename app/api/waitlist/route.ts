import { NextResponse } from 'next/server';
import { z } from 'zod';
import { addToWaitlist, getWaitlistCount } from '@/lib/waitlist';

const submitSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  locale: z.enum(['en', 'fr']).default('en'),
  source: z.string().optional(),
  recaptchaToken: z.string().optional(),
});

export async function GET() {
  const { count, target } = await getWaitlistCount();
  const res = NextResponse.json({ count, target });
  res.headers.set('Cache-Control', 'no-store');
  return res;
}

async function verifyRecaptcha(token: string | undefined): Promise<{
  ok: boolean;
  score?: number;
  reason?: string;
}> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.warn('[waitlist] RECAPTCHA_SECRET_KEY missing, skipping verification');
    return { ok: true };
  }
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
      action?: string;
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
    console.error('[waitlist] recaptcha verify error', err);
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

  const captcha = await verifyRecaptcha(parsed.data.recaptchaToken);
  if (!captcha.ok) {
    console.warn(
      `[waitlist] recaptcha rejected email=${parsed.data.email} reason=${captcha.reason} score=${captcha.score ?? 'n/a'}`,
    );
    return NextResponse.json(
      { ok: false, error: 'captcha_rejected' },
      { status: 400 },
    );
  }

  try {
    const { recaptchaToken: _drop, ...entry } = parsed.data;
    const result = await addToWaitlist(entry);
    const { count, target } = await getWaitlistCount();
    console.log(
      `[waitlist] ${entry.email} (${entry.locale}) alreadyOnList=${result.alreadyOnList ?? false} total=${count}`,
    );
    return NextResponse.json({
      ok: true,
      alreadyOnList: result.alreadyOnList ?? false,
      count,
      target,
    });
  } catch (err) {
    console.error('[waitlist] write failed', err);
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
  }
}
