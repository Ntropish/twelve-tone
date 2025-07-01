import { NoteName, noteNamesByIndex } from "../notes";
import { findMatchingShapes, BitmaskCompare } from "./findMatchingShapes";
import { rotate } from "./rotate";

/**
 * A generic function to find musical shapes that match a given bitmask.
 * It can find exact matches, subsets (e.g., chords in a scale), or supersets (e.g., scales for a chord).
 *
 * @param bitmask The bitmask to match against.
 * @param shapes A record mapping shape names to their bitmask values.
 * @param compare The comparison function (e.g., isSubset, isSuperset, or an exact match lambda).
 * @returns An array of tuples, each containing the root note and the name of the matching shape.
 */
export function getShapeMatches<T extends string>(
  bitmask: number,
  shapes: Record<T, number>,
  compare: BitmaskCompare
): [NoteName, T][] {
  const matches: [NoteName, T][] = [];
  const shapeNames = Object.keys(shapes) as T[];

  for (const shapeName of shapeNames) {
    const shapeMask = shapes[shapeName];
    // We pass only the single shape here to avoid redundant checks.
    // We are checking one shape name (e.g. "Major") against the bitmask at all rotations.
    const matchingRotations = findMatchingShapes(bitmask, [shapeMask], compare);

    for (const rotatedShape of matchingRotations) {
      // Now we need to find which rotation produced this match
      for (let i = 0; i < 12; i++) {
        if (rotate(shapeMask, i) === rotatedShape) {
          matches.push([noteNamesByIndex[i][0] as NoteName, shapeName]);
        }
      }
    }
  }

  return matches;
}
