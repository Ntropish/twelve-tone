import { uniqueChordShapes } from "../chord-shapes";
import { rotate } from "./rotate";

// (Get the chords of a scale)
export function getCoveredShapes(
  bitmask: number,
  shapes: number[] = uniqueChordShapes
): number[] {
  const coveredShapes = new Set<number>();

  // for each index 0-11
  for (let i = 0; i < 12; i++) {
    // for each shape
    for (const shape in shapes) {
      // rotate the shape by the index and check if it fits in the bitmask
      const rotatedShape = rotate(shapes[shape], i);
      if ((bitmask & rotatedShape) === rotatedShape) {
        coveredShapes.add(rotatedShape);
      }
    }
  }
  return Array.from(coveredShapes);
}

export default getCoveredShapes;
