export type TzBand = 'apac' | 'emea' | 'americas';

/**
 * Groups a UTC offset into the three bands used for matchmaking
 * (vault/data-model.md, `tz_band`). Asia-Pacific is UTC+5 and east,
 * Europe/Africa is UTC-1 to UTC+4, and the Americas is UTC-2 and west.
 */
export function tzBandFromUtcOffsetHours(offsetHours: number): TzBand {
  if (offsetHours >= 5) {
    return 'apac';
  }
  if (offsetHours >= -1) {
    return 'emea';
  }
  return 'americas';
}

/** Band for the device's current timezone. */
export function deviceTzBand(now: Date = new Date()): TzBand {
  return tzBandFromUtcOffsetHours(-now.getTimezoneOffset() / 60);
}
