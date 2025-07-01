import { uniqueChordShapes } from "../chord-shapes";
import { rotate } from "./rotate";
import { flatMap, range, uniq } from "lodash-es";

// (Get the chords of a scale)
export function getCoveredShapes(
  bitmask: number,
  shapes: number[] = uniqueChordShapes
): number[] {
  // A chord is "covered" if it's a subset of the scale.
  // So we check if the rotated shape (chord) is a subset of the bitmask (scale).
  const isSubset = (sourceMask: number, targetMask: number) => (sourceMask & targetMask) === targetMask;
  
  const matchingShapes = flatMap(range(12), (i) => {
    return flatMap(shapes, (shape) => {
      const rotatedShape = rotate(shape, i);
      return isSubset(bitmask, rotatedShape) ? [rotatedShape] : [];
    });
  });
  
  return uniq(matchingShapes);
}

export default getCoveredShapes;
