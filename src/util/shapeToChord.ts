import { NoteName, noteNamesByIndex } from "../notes";
import { ChordShape, ChordShapes } from "../chord-shapes";
import { rotate } from "./rotate";
import { flatMap, range, find } from "lodash-es";

export function shapeToChord(bitmask: number): [NoteName, ChordShape][] {
  return flatMap(Object.entries(ChordShapes), ([shapeName, shapeMask]) => {
    return flatMap(range(12), (i) => {
      const rotatedShape = rotate(shapeMask, i);
      if (bitmask === rotatedShape) {
        const rootIndex = (11 + i) % 12;
        return [[noteNamesByIndex[rootIndex][0] as NoteName, shapeName as ChordShape]];
      }
      return [];
    });
  });
}

export default shapeToChord;
