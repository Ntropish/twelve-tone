import { NoteName } from "../notes";
import { ScaleShape, ScaleShapes } from "../scale-shapes";
import { getShapeMatches } from "./getShapeMatches";

export function shapeToScale(bitmask: number): [NoteName, ScaleShape][] {
  // Find all scales that are an exact match for the bitmask.
  const exactMatch = (a: number, b: number) => a === b;
  return getShapeMatches(bitmask, ScaleShapes, exactMatch);
}
