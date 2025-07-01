import { uniqueChordShapes } from "../chord-shapes";
import { findMatchingShapes, isSubset } from "./findMatchingShapes";

// (Get the chords of a scale)
export function getCoveredShapes(
  bitmask: number,
  shapes: number[] = uniqueChordShapes
): number[] {
  // A chord is "covered" if it's a subset of the scale.
  // So we check if the rotated shape (chord) is a subset of the bitmask (scale).
  return findMatchingShapes(bitmask, shapes, isSubset);
}

export default getCoveredShapes;
