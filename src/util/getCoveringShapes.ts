import { uniqueScaleShapes } from "../scale-shapes";
import { rotate } from "./rotate";
import { flatMap, range, uniq } from "lodash-es";

// (Get all scales that cover a chord)
export function getCoveringShapes(
  bitmask: number, // (chord)
  shapes: number[] = uniqueScaleShapes
): number[] {
  // A scale "covers" a chord if the scale is a superset of the chord.
  // We check if the rotated shape (scale) is a superset of the bitmask (chord).
  const isSuperset = (sourceMask: number, targetMask: number) => (targetMask & sourceMask) === sourceMask;
  
  const matchingShapes = flatMap(range(12), (i) => {
    return flatMap(shapes, (shape) => {
      const rotatedShape = rotate(shape, i);
      return isSuperset(bitmask, rotatedShape) ? [rotatedShape] : [];
    });
  });
  
  return uniq(matchingShapes);
}
