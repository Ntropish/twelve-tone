import { uniqueScaleShapes } from "../scale-shapes";
import { rotate } from "./rotate";

// (Get all scales that cover a chord)
export function getCoveringShapes(
  bitmask: number,
  shapes: number[] = uniqueScaleShapes
): number[] {
  const coveredShapes = new Set<number>(); // (scales)

  for (let i = 0; i < 12; i++) {
    for (const shape in shapes) {
      const rotatedShape = rotate(shapes[shape], i);
      if ((bitmask & rotatedShape) === rotatedShape) {
        coveredShapes.add(rotatedShape);
      }
    }
  }

  return Array.from(coveredShapes);
}
