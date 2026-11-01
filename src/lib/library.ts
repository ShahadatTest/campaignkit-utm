import { buildLink, fields, type Campaign } from './campaign';
export const STORAGE_KEY = 'campaignkit.library.v1';
export const LIMIT = 500;
export type SavedLink = { id: string; createdAt: string; campaign: Campaign; link: string };
export function createRecord(campaign: Campaign): SavedLink {
  return { id: crypto.randomUUID(), createdAt: new Date().toISOString(), campaign: { ...campaign }, link: buildLink(campaign) };
}
export function mergeRecords(existing: SavedLink[], incoming: SavedLink[]): SavedLink[] {
  const links = new Set(existing.map(x => x.link));
  const merged = [...existing];
  for (const item of incoming) if (!links.has(item.link)) { links.add(item.link); merged.push(item); }
  if (merged.length > LIMIT) throw new Error('LIBRARY_LIMIT');
  return merged;
}
export function backup(records: SavedLink[]): string { return JSON.stringify({ version: 1, records }, null, 2); }
export function parseBackup(text: string): SavedLink[] {
  if (text.length > 5_000_000) throw new Error('FILE_TOO_LARGE');
  const data: unknown = JSON.parse(text);
  if (!data || typeof data !== 'object' || !('version' in data) || data.version !== 1 || !('records' in data) || !Array.isArray(data.records) || data.records.length > LIMIT) throw new Error('INVALID_BACKUP');
  return mergeRecords([], data.records.map((row: unknown) => {
    if (!row || typeof row !== 'object' || !('campaign' in row) || !row.campaign || typeof row.campaign !== 'object') throw new Error('INVALID_RECORD');
    const source = row.campaign as Record<string, unknown>;
    if (['url', ...fields].some(key => typeof source[key] !== 'string')) throw new Error('INVALID_RECORD');
    const campaign = Object.fromEntries(['url', ...fields].map(key => [key, source[key]])) as Campaign;
    const item = createRecord(campaign); // Never trust a stored URL or HTML; regenerate from validated fields.
    if ('createdAt' in row && typeof row.createdAt === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(row.createdAt) && Number.isFinite(Date.parse(row.createdAt))) item.createdAt = new Date(row.createdAt).toISOString();
    return item;
  }));
}
export function csv(records: SavedLink[]): string {
  // Prevent spreadsheet formula execution while keeping RFC 4180 quoting.
  const escape = (value: string) => '"' + (/^[=+@\-\t\r\n]/.test(value.trimStart()) || /^[\t\r\n]/.test(value) ? "'" + value : value).replace(/"/g, '""') + '"';
  return '\uFEFF' + [['campaign', 'source', 'medium', 'content', 'term', 'destination', 'generated_url', 'created_at'], ...records.map(r => [r.campaign.campaign, r.campaign.source, r.campaign.medium, r.campaign.content, r.campaign.term, r.campaign.url, r.link, r.createdAt])].map(row => row.map(escape).join(',')).join('\r\n');
}
export function loadLibrary(): { records: SavedLink[]; error: string; raw: string } {
  let raw = '';
  try { raw = localStorage.getItem(STORAGE_KEY) || ''; return { records: raw ? parseBackup(raw) : [], error: '', raw }; }
  catch { return { records: [], error: 'STORAGE_UNAVAILABLE', raw }; }
}
export function persist(records: SavedLink[]): void {
  localStorage.setItem(STORAGE_KEY, backup(records)); // Exceptions bubble up: UI must not claim success.
}
