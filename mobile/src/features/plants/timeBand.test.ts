import { tzBandFromUtcOffsetHours } from './timeBand';

describe('tzBandFromUtcOffsetHours', () => {
  it('should_return_apac_when_offset_is_japan_time', () => {
    expect(tzBandFromUtcOffsetHours(9)).toBe('apac');
  });

  it('should_return_emea_when_offset_is_central_europe', () => {
    expect(tzBandFromUtcOffsetHours(1)).toBe('emea');
  });

  it('should_return_americas_when_offset_is_us_eastern', () => {
    expect(tzBandFromUtcOffsetHours(-5)).toBe('americas');
  });
});
