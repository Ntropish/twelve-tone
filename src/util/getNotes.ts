import { NoteIndex } from "../notes";

export function getNotes(bitmask: number): NoteIndex[] {
  const binaryString = bitmask.toString(2);
  const reversedString = binaryString.split("").reverse().join("");
  const reversedMask = parseInt(reversedString, 2);

  const notes: NoteIndex[] = [];
  for (let i = 0; i < 12; i++) {
    if ((reversedMask >> i) & 1) {
      notes.push(i as NoteIndex);
    }
  }
  return notes;
}
