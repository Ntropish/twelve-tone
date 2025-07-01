import { NoteIndex } from "../notes";
import { Scale } from "../types";
import { ScaleShape } from "../scale-shapes";

export function createScale(root: NoteIndex, shape: ScaleShape): Scale {
  return {
    root,
    shape,
  };
}
