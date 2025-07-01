import { NoteIndex } from "../notes";
import { ChordShape } from "../chord-shapes";
import { Chord } from "../types";

export function createChord(root: NoteIndex, shape: ChordShape): Chord {
  return {
    root,
    shape,
  };
}
