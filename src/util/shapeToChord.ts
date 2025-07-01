import { NoteName, noteNamesByIndex } from "../notes";
import { ChordShape, ChordShapes } from "../chord-shapes";
import { rotate } from "./rotate";

export function shapeToChord(bitmask: number): [NoteName, ChordShape][] {
  const chords: [NoteName, ChordShape][] = [];

  // for each tonic
  for (let i = 0; i < 12; i++) {
    // for each chord shape
    for (const shape in ChordShapes) {
      // rotate the shape by the index and check if it fits in the bitmask
      const rotatedShape = rotate(ChordShapes[shape], i);
      if ((bitmask & rotatedShape) === rotatedShape) {
        chords.push([noteNamesByIndex[i][0] as NoteName, shape as ChordShape]);
      }
    }
  }

  return chords;
}

export default shapeToChord;
