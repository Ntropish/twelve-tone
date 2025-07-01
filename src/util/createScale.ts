import { NoteIndex } from "../notes";
import { Scale } from "../types";

export function createScale(root: NoteIndex, bitmask: number): Scale {
  return {
    root,
    bitmask,
  };
}
