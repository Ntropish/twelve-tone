import { NoteIndex } from "../notes";

export function getNotes(bitmask: number): NoteIndex[] {
  const notes: NoteIndex[] = [];
  for (let i = 0; i < 12; i++) {
    // Check from B (0) up to C (11)
    if ((bitmask >> i) & 1) {
      notes.push(i as NoteIndex);
    }
  }
  return notes;
}
