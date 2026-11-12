export type Label = 'safe' | 'unsafe';

export type Classifier = (text: string) => Promise<string>;

export type ModerationVerdict =
  | { allowed: true }
  | { allowed: false; reason: 'flagged' | 'unavailable' };

const LABELS: readonly string[] = ['safe', 'unsafe'];

function isLabel(value: string): value is Label {
  return LABELS.includes(value);
}

export type MediaType = 'image/jpeg' | 'image/png' | 'image/webp';

export interface ImageInput {
  mediaType: MediaType;
  /** Base64-encoded image bytes, without a data: prefix. */
  data: string;
}

export type ImageClassifier = (image: ImageInput) => Promise<string>;

/**
 * Fail closed: anything other than a clear "safe" label blocks posting.
 * A classifier error, timeout, or unexpected answer is "unavailable", not "allowed".
 */
async function verdictFrom(classify: () => Promise<string>): Promise<ModerationVerdict> {
  let label: string;
  try {
    label = (await classify()).trim().toLowerCase();
  } catch {
    return { allowed: false, reason: 'unavailable' };
  }

  if (!isLabel(label)) {
    return { allowed: false, reason: 'unavailable' };
  }

  return label === 'safe' ? { allowed: true } : { allowed: false, reason: 'flagged' };
}

export function moderateText(text: string, classify: Classifier): Promise<ModerationVerdict> {
  return verdictFrom(() => classify(text));
}

export function moderateImage(image: ImageInput, classify: ImageClassifier): Promise<ModerationVerdict> {
  return verdictFrom(() => classify(image));
}
