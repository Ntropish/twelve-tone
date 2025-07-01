import { uniqueScaleShapes } from "../scale-shapes";
import { findMatchingShapes, isSuperset } from "./findMatchingShapes";

// (Get all scales that cover a chord)
export function getCoveringShapes(
  bitmask: number, // (chord)
  shapes: number[] = uniqueScaleShapes
): number[] {
  // A scale "covers" a chord if the scale is a superset of the chord.
  // We check if the rotated shape (scale) is a superset of the bitmask (chord).
  return findMatchingShapes(bitmask, shapes, isSuperset);
}
