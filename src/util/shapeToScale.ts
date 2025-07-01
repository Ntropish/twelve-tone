import { NoteName, noteNamesByIndex } from "../notes";
import { ScaleShape, ScaleShapes, uniqueScaleShapes } from "../scale-shapes";
import { rotate } from "./rotate";

export function shapeToScale(bitmask: number): [NoteName, ScaleShape][] {
  const scales: [NoteName, ScaleShape][] = [];

  for (let i = 0; i < 12; i++) {
    for (const shape in uniqueScaleShapes) {
      const rotatedShape = rotate(uniqueScaleShapes[shape], i);
      if ((bitmask & rotatedShape) === rotatedShape) {
        scales.push([noteNamesByIndex[i][0] as NoteName, shape as ScaleShape]);
      }
    }
  }

  return scales;
}
