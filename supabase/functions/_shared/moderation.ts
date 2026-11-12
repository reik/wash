export type Label = 'safe' | 'unsafe';

export type Classifier = (text: string) => Promise<string>;

export type ModerationVerdict =
  | { allowed: true }
  | { allowed: false; reason: 'flagged' | 'unavailable' };

const LABELS: readonly string[] = ['safe', 'unsafe'];

function isLabel(value: string): value is Label {
  return LABELS.includes(value);
}

/**
 * Fail closed: anything other than a clear "safe" label blocks posting.
 * A classifier error, timeout, or unexpected answer is "unavailable", not "allowed".
 */
export async function moderateText(text: string, classify: Classifier): Promise<ModerationVerdict> {
  let label: string;
  try {
    label = (await classify(text)).trim().toLowerCase();
  } catch {
    return { allowed: false, reason: 'unavailable' };
  }

  if (!isLabel(label)) {
    return { allowed: false, reason: 'unavailable' };
  }

  return label === 'safe' ? { allowed: true } : { allowed: false, reason: 'flagged' };
}
