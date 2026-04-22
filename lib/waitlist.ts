import { promises as fs } from 'node:fs';
import path from 'node:path';

const WAITLIST_FILE = path.join(process.cwd(), 'data', 'waitlist.json');
export const WAITLIST_TARGET = 100;

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

export async function getWaitlistCount(): Promise<{ count: number; target: number }> {
  const store = await readStore();
  return { count: store.entries.length, target: WAITLIST_TARGET };
}

export async function addToWaitlist(entry: Omit<Entry, 'createdAt'>): Promise<{
  ok: boolean;
  position: number;
  alreadyOnList?: boolean;
}> {
  const store = await readStore();
  const normalized = entry.email.trim().toLowerCase();
  const existingIndex = store.entries.findIndex(
    (e) => e.email.toLowerCase() === normalized,
  );
  if (existingIndex !== -1) {
    return { ok: true, position: existingIndex + 1, alreadyOnList: true };
  }
  const full: Entry = { ...entry, email: normalized, createdAt: new Date().toISOString() };
  store.entries.push(full);
  await writeStore(store);
  return { ok: true, position: store.entries.length };
}
