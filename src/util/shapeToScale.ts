import { NoteName, noteNamesByIndex } from "../notes";
import { ScaleShape, ScaleShapes } from "../scale-shapes";
import { rotate } from "./rotate";
import { flatMap, range } from "lodash-es";

export function shapeToScale(bitmask: number): [NoteName, ScaleShape][] {
  return flatMap(Object.entries(ScaleShapes), ([shapeName, shapeMask]) => {
    return flatMap(range(12), (i) => {
      const rotatedShape = rotate(shapeMask, i);
      if (bitmask === rotatedShape) {
        const rootIndex = (11 + i) % 12;
        return [[noteNamesByIndex[rootIndex][0] as NoteName, shapeName as ScaleShape]];
      }
      return [];
    });
  });
}
