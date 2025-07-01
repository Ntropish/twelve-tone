export const ScaleShapes = {
  // ────── Heptatonic “diatonic-ish” shapes ───────────────────────────────────
  DIATONIC: 0b101011010101, // 0-2-4-5-7-9-11  (major / natural-minor family)
  MELODIC_MINOR: 0b101101010101, // 0-2-3-5-7-9-11  (ascending form)
  HARMONIC_MINOR: 0b101101011001, // 0-2-3-5-7-8-11
  HARMONIC_MAJOR: 0b101011011001, // 0-2-4-5-7-8-11
  DOUBLE_HARMONIC_MAJOR: 0b110011011001, // 0-1-4-5-7-8-11  (Byzantine / Arabic)
  PERSIAN: 0b110011101001, // 0-1-4-5-6-8-11
  HUNGARIAN_MINOR: 0b101100111001, // 0-2-3-6-7-8-11
  HUNGARIAN_MAJOR: 0b100110110110, // 0-3-4-6-7-9-10
  ENIGMATIC: 0b110010101011, // 0-1-4-6-8-10-11
  NEAPOLITAN_MAJOR: 0b110101010101, // 0-1-3-5-7-9-11

  // ────── Hexatonic & pentatonic favourites ──────────────────────────────────
  MAJOR_PENTATONIC: 0b101010010100, // 0-2-4-7-9
  MINOR_PENTATONIC: 0b100101010010, // 0-3-5-7-10
  BLUES_MINOR: 0b100101110010, // 0-3-5-6-7-10
  BLUES_MAJOR: 0b101110010100, // 0-2-3-4-7-9
  WHOLE_TONE: 0b101010101010, // 0-2-4-6-8-10  (also WHOLE_TONE_HEX)
  PROMETHEUS: 0b101010100110, // 0-2-4-6-9-10   (Scriabin)
  RITUSEN: 0b101001010100, // 0-2-5-7-9
  HIRAJOSHI: 0b101100011000, // 0-2-3-7-8
  KUMOI: 0b101100010100, // 0-2-3-7-9
  IWATO: 0b110001100010, // 0-1-5-6-10

  // ────── Symmetric / octatonic sets ─────────────────────────────────────────
  OCTATONIC_HALF_WHOLE: 0b110110110110, // 0-1-3-4-6-7-9-10  (H–W)
  OCTATONIC_WHOLE_HALF: 0b101101101101, // 0-2-3-5-6-8-9-11  (W–H)
  // alias commonly used with altered dominant language
  OCTATONIC_ALT: 0b110110110110, // same bits as HALF_WHOLE

  // ────── Maximal & “everything” sets ─────────────────────────────────────────
  CHROMATIC: 0b111111111111, // all 12 pitch classes
  WHOLE_TONE_HEX: 0b101010101010, // alias of WHOLE_TONE (kept for convenience)
} as const;
export type ScaleShape = keyof typeof ScaleShapes;

export const uniqueScaleShapes = Array.from(
  new Set(Object.values(ScaleShapes))
);
