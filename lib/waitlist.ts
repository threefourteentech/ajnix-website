import { promises as fs } from 'node:fs';
import path from 'node:path';

const WAITLIST_FILE = path.join(process.cwd(), 'data', 'waitlist.json');
export const WAITLIST_TARGET = 100;
export const WAITLIST_SYNTHETIC_BASE = 72;

type Entry = {
  email: string;
  locale: 'en' | 'fr';
  source?: string;
  createdAt: string;
};

type Store = {
  entries: Entry[];
};

async function readStore(): Promise<Store> {
  try {
    const raw = await fs.readFile(WAITLIST_FILE, 'utf8');
    return JSON.parse(raw) as Store;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      return { entries: [] };
    }
    throw err;
  }
}

async function writeStore(store: Store) {
  await fs.mkdir(path.dirname(WAITLIST_FILE), { recursive: true });
  await fs.writeFile(WAITLIST_FILE, JSON.stringify(store, null, 2), 'utf8');
}

function displayCount(realCount: number): number {
  return Math.min(WAITLIST_TARGET, realCount + WAITLIST_SYNTHETIC_BASE);
}

export async function getWaitlistCount(): Promise<{ count: number; target: number }> {
  const store = await readStore();
  return { count: displayCount(store.entries.length), target: WAITLIST_TARGET };
}

async function pushToLoops(entry: Omit<Entry, 'createdAt'>): Promise<void> {
  const apiKey = process.env.LOOPS_API_KEY;
  const listId = process.env.LOOPS_PRO_WAITLIST_ID;
  if (!apiKey || !listId) {
    console.warn('[waitlist] Loops env vars missing, skipping push');
    return;
  }

  const body = {
    email: entry.email,
    source: entry.source ?? 'pro_waitlist',
    userGroup: 'pro_waitlist',
    signupAt: new Date().toISOString(),
    subscribed: true,
    mailingLists: { [listId]: true },
  };

  try {
    const res = await fetch('https://app.loops.so/api/v1/contacts/create', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      if (res.status === 409 || /already/i.test(text)) {
        await fetch('https://app.loops.so/api/v1/contacts/update', {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        return;
      }
      console.error('[waitlist] Loops push failed', res.status, text);
    }
  } catch (err) {
    console.error('[waitlist] Loops push error', err);
  }
}

export async function addToWaitlist(entry: Omit<Entry, 'createdAt'>): Promise<{
  ok: boolean;
  alreadyOnList?: boolean;
}> {
  const store = await readStore();
  const normalized = entry.email.trim().toLowerCase();
  const existingIndex = store.entries.findIndex(
    (e) => e.email.toLowerCase() === normalized,
  );
  const clean = { ...entry, email: normalized };

  if (existingIndex === -1) {
    const full: Entry = { ...clean, createdAt: new Date().toISOString() };
    store.entries.push(full);
    await writeStore(store);
  }

  await pushToLoops(clean);
  return { ok: true, alreadyOnList: existingIndex !== -1 };
}
