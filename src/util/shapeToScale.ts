import { ScaleShapes, uniqueScaleShapes } from "../scale-shapes";
import { rotate } from "./rotate";

export function shapeToScale(bitmask: number): number[] {
  const scales = new Set<number>();

  for (let i = 0; i < 12; i++) {
    for (const shape in uniqueScaleShapes) {
      const rotatedShape = rotate(uniqueScaleShapes[shape], i);
    }
  }
}
