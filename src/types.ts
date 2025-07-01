import { NoteIndex } from "./notes";

export interface Scale {
  root: NoteIndex;
  bitmask: number;
}

export interface Chord {
  root: NoteIndex;
  bitmask: number;
}
