import { NextResponse } from 'next/server';
import { z } from 'zod';
import { addToWaitlist, getWaitlistCount } from '@/lib/waitlist';

const submitSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  locale: z.enum(['en', 'fr']).default('en'),
  source: z.string().optional(),
});

export async function GET() {
  const { count, target } = await getWaitlistCount();
  return NextResponse.json({ count, target });
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

  try {
    const result = await addToWaitlist(parsed.data);
    const { count, target } = await getWaitlistCount();
    console.log(
      `[waitlist] ${parsed.data.email} (${parsed.data.locale}) position=${result.position} total=${count}`,
    );
    return NextResponse.json({
      ok: true,
      position: result.position,
      alreadyOnList: result.alreadyOnList ?? false,
      count,
      target,
    });
  } catch (err) {
    console.error('[waitlist] write failed', err);
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
  }
}
