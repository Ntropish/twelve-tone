import { getNotes } from "../getNotes";
import { describe, it, expect } from "vitest";
import { ChordShapes } from "../../chord-shapes";

describe("getNotes", () => {
  it("should return the correct note indices for a C Major chord shape", () => {
    const bitmask = ChordShapes.MAJOR; // C-E-G
    const expectedNotes = [4, 7, 11].sort((a, b) => a - b); // G, E, C indices
    const actualNotes = getNotes(bitmask).sort((a, b) => a - b);
    expect(actualNotes).toEqual(expectedNotes);
  });

  it("should return an empty array for a bitmask of 0", () => {
    const bitmask = 0;
    expect(getNotes(bitmask)).toEqual([]);
  });

  it("should return all notes for a chromatic scale bitmask", () => {
    const bitmask = 0b111111111111;
    const expectedNotes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    expect(getNotes(bitmask)).toEqual(expectedNotes);
  });
});
