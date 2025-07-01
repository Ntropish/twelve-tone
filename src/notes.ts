//   export default indexByNote;
export const Notes = {
  C: 11,
  "C#": 10,
  Db: 10,
  D: 9,
  "D#": 8,
  Eb: 8,
  E: 7,
  F: 6,
  "F#": 5,
  Gb: 5,
  G: 4,
  "G#": 3,
  Ab: 3,
  A: 2,
  "A#": 1,
  Bb: 1,
  B: 0,
} as const;

export default Notes;

export type NoteName = keyof typeof Notes;
export type NoteIndex = (typeof Notes)[NoteName];

export const noteNamesByIndex: Record<number, NoteName[]> = {
  11: ["C"],
  10: ["C#", "Db"],
  9: ["D"],
  8: ["D#", "Eb"],
  7: ["E"],
  6: ["F"],
  5: ["F#", "Gb"],
  4: ["G"],
  3: ["G#", "Ab"],
  2: ["A"],
  1: ["A#", "Bb"],
  0: ["B"],
};
