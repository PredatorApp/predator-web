import { describe, expect, it } from 'vitest';
import { activeLegalSection } from './legal-navigation';

describe('current legal section', () => {
  it('selects the first section before the document begins', () => {
    expect(
      activeLegalSection(
        [
          { id: 'first', top: 400 },
          { id: 'second', top: 900 },
        ],
        128,
        false
      )
    ).toBe('first');
  });

  it('keeps a long section active until the next heading reaches the reading line', () => {
    expect(
      activeLegalSection(
        [
          { id: 'first', top: -7000 },
          { id: 'second', top: 129 },
        ],
        128,
        false
      )
    ).toBe('first');
  });

  it('changes sections when a heading reaches the reading line', () => {
    expect(
      activeLegalSection(
        [
          { id: 'first', top: -7000 },
          { id: 'second', top: 128 },
        ],
        128,
        false
      )
    ).toBe('second');
  });

  it('selects the last crossed heading after a deep-link jump', () => {
    expect(
      activeLegalSection(
        [
          { id: 'first', top: -9000 },
          { id: 'second', top: -3000 },
          { id: 'third', top: 32 },
          { id: 'fourth', top: 800 },
        ],
        128,
        false
      )
    ).toBe('third');
  });

  it('selects the final section at the page end even if it is short', () => {
    expect(
      activeLegalSection(
        [
          { id: 'first', top: -200 },
          { id: 'last', top: 400 },
        ],
        128,
        true
      )
    ).toBe('last');
  });

  it('does not invent an active section for an empty document', () => {
    expect(activeLegalSection([], 128, false)).toBeNull();
  });
});
