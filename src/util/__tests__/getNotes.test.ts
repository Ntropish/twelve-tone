import { describe, it, expect } from "vitest";
import { getNotes } from "../getNotes";

describe("getNotes", () => {
  it("should return the correct note indices for a given bitmask", () => {
    // Bitmask for C Major triad: R(0), M3(4), P5(7)
    const bitmask = 0b10001001000;
    const expectedNotes = [0, 4, 7];
    expect(getNotes(bitmask)).toEqual(expectedNotes);
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
