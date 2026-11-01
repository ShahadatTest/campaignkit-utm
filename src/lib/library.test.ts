import { describe, expect, it } from 'vitest';
import { backup, createRecord, csv, mergeRecords, parseBackup } from './library';
import { emptyCampaign } from './campaign';
const campaign = { ...emptyCampaign, url: 'https://example.com', source: 'instagram', medium: 'paid_social', campaign: 'autumn' };
describe('local campaign library', () => {
  it('round trips a backup and ignores a forged generated link', () => {
    const original = createRecord(campaign);
    const data = JSON.parse(backup([original]));
    data.records[0].link = 'javascript:alert(1)';
    const parsed = parseBackup(JSON.stringify(data));
    expect(parsed[0].link).toBe(original.link);
    expect(parsed[0].createdAt).toBe(original.createdAt);
  });
  it('rejects invalid backup rows as a whole', () => {
    const data = JSON.parse(backup([createRecord(campaign)]));
    data.records.push({ campaign: { ...campaign, url: 'javascript:alert(1)' } });
    expect(() => parseBackup(JSON.stringify(data))).toThrow();
    expect(() => parseBackup('{broken')).toThrow();
    expect(() => parseBackup('{"version":2,"records":[]}')).toThrow();
    expect(() => parseBackup('x'.repeat(5_000_001))).toThrow();
  });
  it('merges without overwriting or duplicating existing records', () => {
    const first = createRecord(campaign);
    const second = createRecord({ ...campaign, content: 'video' });
    const merged = mergeRecords([first], [createRecord(campaign), second]);
    expect(merged).toHaveLength(2);
    expect(merged[0]).toBe(first);
    expect(() => mergeRecords(Array.from({length:500},(_,i)=>({...first,link:String(i)})),[second])).toThrow('LIBRARY_LIMIT');
  });
  it('escapes CSV quotes and neutralizes formula prefixes', () => {
    const file = csv([createRecord({ ...campaign, campaign: '=1+1', content: 'a,"b"\nline' })]);
    expect(file.startsWith('\uFEFF')).toBe(true);
    expect(file).toContain('"\'=1+1"');
    expect(file).toContain('"a,""b""\nline"');
    expect(csv([createRecord({ ...campaign, term: '  +SUM(A1)' })])).toContain("'  +SUM(A1)");
  });
});
