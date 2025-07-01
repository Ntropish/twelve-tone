import { NoteName } from "../notes";
import { ChordShape, ChordShapes } from "../chord-shapes";
import { getShapeMatches } from "./getShapeMatches";

export function shapeToChord(bitmask: number): [NoteName, ChordShape][] {
  // Find all chords that are an exact match for the bitmask.
  const exactMatch = (a: number, b: number) => a === b;
  return getShapeMatches(bitmask, ChordShapes, exactMatch);
}

export default shapeToChord;
