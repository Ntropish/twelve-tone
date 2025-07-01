export const ChordShapes = {
  // ────── Triads & basic stacks ────────────────────────────────────────────────
  MAJOR: 0b100010010000, // 1-3-5
  MINOR: 0b100100010000, // 1-♭3-5
  DIMINISHED: 0b100100100000, // 1-♭3-♭5
  AUGMENTED: 0b100010001000, // 1-3-♯5
  SUS2: 0b101000010000, // 1-2-5
  SUS4: 0b100001010000, // 1-4-5
  POWER: 0b100000010000, // 1-5
  MAJOR_NO5: 0b100010000000, // 1-3
  MINOR_NO5: 0b100100000000, // 1-♭3
  QUARTAL_TRIAD: 0b100001000010, // 1-4-♭7  (stacked 4ths)
  QUINTAL_TRIAD: 0b101000010000, // 1-5-9   (stacked 5ths)
  STACKED_FIFTHS_4: 0b101000010100, // 1-5-9-13
  WHOLE_TONE_TRIAD: 0b101010101010, // every tone of the whole-tone hexatonic

  // ────── 6th & 6/9 chords ─────────────────────────────────────────────────────
  MAJOR6: 0b100010010100, // 1-3-5-6
  MINOR6: 0b100100010100, // 1-♭3-5-6
  MAJOR6_ADD9: 0b101010010100, // 1-2-3-5-6  (6/9)
  MINOR6_ADD9: 0b101100010100, // 1-2-♭3-5-6

  // ────── 7th family ───────────────────────────────────────────────────────────
  MAJOR7: 0b100010010001, // 1-3-5-7
  DOMINANT7: 0b100010010010, // 1-3-5-♭7
  MINOR7: 0b100100010010, // 1-♭3-5-♭7
  MINOR_MAJOR7: 0b100100010001, // 1-♭3-5-7
  DIMINISHED7: 0b100100100100, // 1-♭3-♭5-𝄫7
  HALF_DIMINISHED7: 0b100100100010, // 1-♭3-♭5-♭7  (m7♭5)
  AUGMENTED7: 0b100010001010, // 1-3-♯5-♭7  (7♯5)
  DOMINANT7_FLAT5: 0b100010000110, // 1-3-♭5-♭7
  DOMINANT7_SHARP5: 0b100010001010, // alias of AUGMENTED7
  DOMINANT7_SUS4: 0b100001010010, // 1-4-5-♭7
  DOMINANT7_SUS2: 0b101000010010, // 1-2-5-♭7

  // ────── 9th colours ──────────────────────────────────────────────────────────
  MAJOR9: 0b101010010001, // 1-2-3-5-7
  DOMINANT9: 0b101010010010, // 1-2-3-5-♭7
  MINOR9: 0b101100010010, // 1-2-♭3-5-♭7
  MINOR_MAJOR9: 0b101100010001, // 1-2-♭3-5-7
  DOMINANT7_FLAT9: 0b100010010011, // 1-♭9-3-5-♭7
  DOMINANT7_SHARP9: 0b100110010010, // 1-♯9-3-5-♭7
  DOMINANT7_FLAT9_SHARP5: 0b100010001011, // 1-♭9-3-♯5-♭7
  DOMINANT7_SHARP9_SHARP5: 0b100110001010, // 1-♯9-3-♯5-♭7
  LYDIAN_DOMINANT9_SHARP11: 0b101010011010, // 1-2-3-♯11-5-♭7

  // ────── 11th extensions ──────────────────────────────────────────────────────
  MAJOR11: 0b101110010001, // 1-2-3-4(11)-5-7
  DOMINANT11: 0b101110010010, // 1-2-3-4-5-♭7
  MINOR11: 0b101110010110, // 1-2-♭3-4-5-♭7
  MINOR_MAJOR11: 0b101110010101, // 1-2-♭3-4-5-7
  DOMINANT11_SHARP11: 0b101111010010, // 1-2-3-♯11-5-♭7
  MINOR11_FLAT5: 0b101110100110, // 1-2-♭3-4-♭5-♭7
  DOMINANT9_SHARP11: 0b101111010010, // dup of previous but named for usage

  // ────── 13th soup ────────────────────────────────────────────────────────────
  MAJOR13: 0b111110010001, // 1-2-3-4-5-6-7
  DOMINANT13: 0b111110010010, // 1-2-3-4-5-6-♭7
  MINOR13: 0b111110010110, // 1-2-♭3-4-5-6-♭7
  MINOR_MAJOR13: 0b111110010101, // 1-2-♭3-4-5-6-7
  DOMINANT13_FLAT9: 0b111110010011, // 1-♭9-3-4-5-6-♭7
  DOMINANT13_SHARP9: 0b111110011010, // 1-♯9-3-4-5-6-♭7
  DOMINANT13_FLAT9_SHARP11: 0b111111010011, // 1-♭9-3-♯11-5-6-♭7

  // ────── Altered / “alt” grab-bag ─────────────────────────────────────────────
  ALT: 0b111111010011, // (root-3-♭7 plus ♭/♯9, ♯11, ♭13); overlaps with 13b9#11

  // ────── “Add” chords (no 7th) ────────────────────────────────────────────────
  ADD9: 0b101010010000, // 1-2-3-5
  MINOR_ADD9: 0b101100010000, // 1-2-♭3-5
  MAJOR_ADD11: 0b100011010000, // 1-3-4-5
  MINOR_ADD11: 0b100101010000, // 1-♭3-4-5
  MAJOR_ADD13: 0b100010010100, // 1-3-5-6  (dup of Major6)
  MINOR_ADD13: 0b100100010100, // 1-♭3-5-6 (dup of Minor6)
  SUS2_ADD4: 0b101001010000, // 1-2-4-5

  // ────── Interval / cluster curiosities ───────────────────────────────────────
  MAJOR_SECOND_CLUSTER: 0b101000000000, // 1-2
  MINOR_SECOND_CLUSTER: 0b110000000000, // 1-♭2
  MAJOR_SECOND_TRIAD_CLSTR: 0b101010000000, // 1-2-3
  CHROMATIC_TRICHORD: 0b111000000000, // 1-♭2-2

  // ────── Aug-6th & modal one-offs ─────────────────────────────────────────────
  ITALIAN_AUG6: 0b100010001100, // 1-3-♯6
  FRENCH_AUG6: 0b100011001100, // 1-3-♯4-♯6
  GERMAN_AUG6: 0b100110001100, // 1-♭3-3-♯6
  NEAPOLITAN: 0b100010010000, // bII major; mask = MAJOR (function differs)

  // ────── Extra “named” chords we hadn’t hit yet ──────────────────────────────
  WHOLE_TONE_HEX: 0b101010101010, // 0-2-4-6-8-10  (full whole-tone scale)
  AUGMENTED_MAJOR7: 0b100010001001, // 0-3-♯5-7
  MAJOR7_FLAT5: 0b100010100001, // 0-3-♭5-7
  DIMINISHED_MAJOR7: 0b100100100001, // 0-♭3-♭5-7
  MINOR7_FLAT9: 0b110100010010, // 0-♭9-♭3-5-♭7
  MINOR7_FLAT13: 0b100100011010, // 0-♭3-5-♭6-♭7
  DOMINANT7_SHARP11: 0b100010110010, // 0-3-5-♯11-♭7
  DOMINANT7_FLAT13: 0b100010011010, // 0-3-5-♭6-♭7
  MAJOR7_SHARP11: 0b100010110001, // 0-3-5-♯11-7
  DOM7_SHARP9_SHARP11: 0b100110110010, // 0-♯9-3-♯11-5-♭7
  DOM7_FLAT9_SHARP11: 0b110010110010, // 0-♭9-3-♯11-5-♭7
  DOM7_FLAT9_FLAT13: 0b110010011010, // 0-♭9-3-5-♭6-♭7
  DOM7_SHARP9_FLAT13: 0b100110011010, // 0-♯9-3-5-♭6-♭7

  // ────── More quartal / quintal / symmetrical sets ──────────────────────────
  QUARTAL_TETRAD: 0b100101000010, // 0-4-♭7-♭3  (stacked P4s)

  // ────── Clusters, set-class curiosities, & useful scale “chords” ───────────
  SET_0123: 0b111100000000, // 0-♭2-2-♭3  (chromatic tetrachord)
  OCTATONIC_HW: 0b110110110110, // half-whole diminished scale (0-1-3-4-6-7-9-10)
  OCTATONIC_WH: 0b101101101101, // whole-half diminished scale (0-2-3-5-6-8-9-11)

  // ────── “Unnamed but neat” shapes — feel free to rename or delete ──────────
  EXP_CLUSTER_01347: 0b110110010000, // 0-1-♭3-3-5  (dense but consonant centre)
  EXP_TRI_TRITONE6: 0b100000100100, // 0-♯11-13   (open tritone + 6th; airy)
  EXP_0_1_5_8: 0b110001001000, // 0-♭9-11-♯5 (spiky, resolves down nicely)
} as const;
export type ChordShape = keyof typeof ChordShapes;
