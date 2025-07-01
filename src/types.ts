import { NoteIndex } from "./notes";
import { ChordShape } from "./chord-shapes";
import { ScaleShape } from "./scale-shapes";

export interface Scale {
  shape: ScaleShape;
  root: NoteIndex;
}

export interface Chord {
  root: NoteIndex;
  shape: ChordShape;
}

type NoteSet = Set<NoteIndex>;
