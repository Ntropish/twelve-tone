import { NoteIndex } from "../notes";
import { Chord } from "../types";

export function createChord(root: NoteIndex, bitmask: number): Chord {
  return {
    root,
    bitmask,
  };
}
