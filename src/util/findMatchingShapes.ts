import { rotate } from "./rotate";

type BitmaskCompare = (sourceMask: number, targetMask: number) => boolean;

/**
 * Checks if targetMask is a subset of sourceMask.
 * All bits set in targetMask must also be set in sourceMask.
 */
export const isSubset: BitmaskCompare = (sourceMask, targetMask) =>
  (sourceMask & targetMask) === targetMask;

/**
 * Checks if sourceMask is a superset of targetMask.
 * All bits set in sourceMask must also be set in targetMask.
 */
export const isSuperset: BitmaskCompare = (sourceMask, targetMask) =>
  (targetMask & sourceMask) === sourceMask;

/**
 * Finds all shapes from a list that match a given bitmask, after checking all 12 rotations.
 * The matching is determined by a provided comparison function.
 *
 * @param bitmask The bitmask to match against.
 * @param shapes An array of shapes (as bitmasks) to test.
 * @param compare The function to determine if a shape matches. It receives the main bitmask and the rotated shape.
 * @returns An array of unique matching shapes in their rotated form.
 */
export function findMatchingShapes(
  bitmask: number,
  shapes: number[],
  compare: BitmaskCompare
): number[] {
  const matchingShapes = new Set<number>();

  for (let i = 0; i < 12; i++) {
    for (const shape of shapes) {
      const rotatedShape = rotate(shape, i);
      if (compare(bitmask, rotatedShape)) {
        matchingShapes.add(rotatedShape);
      }
    }
  }

  return Array.from(matchingShapes);
}
