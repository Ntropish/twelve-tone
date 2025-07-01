import { describe, it, expect } from "vitest";
import { createChord } from "@/util/createChord";
import { ChordShapes } from "@/chord-shapes";
import { Notes } from "@/notes";

describe("getChordScales", () => {
  it("should be defined", () => {
    const chord = createChord(Notes.C, ChordShapes.MAJOR);
    expect(chord).toBeDefined();
  });
});
