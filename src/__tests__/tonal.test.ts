import { describe, it, expect } from "vitest";
import { tonal } from "../index";
import { NoteName } from "../notes";
import { Notes, ChordShapes, ScaleShapes } from "../index";

// Helper for checking notes in a shape
function expectNotes(shape: number, expected: string[]) {
  const notes = tonal.get.notes(shape);
  const expectedNotes = expected as NoteName[];
  expect(expectedNotes.every(n => notes.includes(n))).toBe(true);
  expect(notes.length).toBe(expectedNotes.length);
}

describe("tonal", () => {
  describe("shape", () => {
    it("should create a C Major chord shape", () => {
      const cMajor = tonal.shape({ root: "C", quality: "MAJOR" });
      expectNotes(cMajor, ["C", "E", "G"]);
    });

    it("should create a D Dorian scale shape", () => {
      const dDorian = tonal.shape({ root: "D", mode: "DORIAN" });
      expectNotes(dDorian, ["D", "E", "F", "G", "A", "B", "C"]);
    });

    it("should create a C Lydian scale shape", () => {
      const cLydian = tonal.shape({ root: "C", mode: "LYDIAN" });
      expectNotes(cLydian, ["C", "D", "E", "F#", "G", "A", "B"]);
    });

    it("should throw an error for an invalid mode", () => {
      expect(() => tonal.shape({ root: "C", mode: "INVALID" })).toThrow(
        "Invalid mode: INVALID"
      );
    });

    it("should throw an error for an invalid quality", () => {
      // @ts-expect-error
      expect(() => tonal.shape({ root: "C", quality: "INVALID" })).toThrow(
        "Invalid quality: INVALID"
      );
    });
  });

  describe("from", () => {
    it("should create a G Major chord using numeric constants", () => {
      const gMajor = tonal.from(Notes.G, ChordShapes.MAJOR);
      expectNotes(gMajor, ["G", "B", "D"]);
    });

    it("should create a Bb Minor 7th chord using numeric constants", () => {
      const bbMinor7 = tonal.from(Notes.Bb, ChordShapes.MINOR7);
      expectNotes(bbMinor7, ["A#", "C#", "F", "G#"]);
    });
  });

  describe("transpose", () => {
    it("should transpose a C Major chord up by a perfect fifth", () => {
      const cMajor = tonal.shape({ root: "C", quality: "MAJOR" });
      const gMajor = tonal.transpose(cMajor, 7);
      expectNotes(gMajor, ["G", "B", "D"]);
    });

    it("should transpose a G Major chord down by a perfect fifth", () => {
      const gMajor = tonal.shape({ root: "G", quality: "MAJOR" });
      const cMajor = tonal.transpose(gMajor, -7);
      expectNotes(cMajor, ["C", "E", "G"]);
    });

    it("should transpose a C Major scale up by an octave", () => {
      const cMajorScale = tonal.shape({ root: "C", quality: "DIATONIC" });
      const cMajorScaleOctaveUp = tonal.transpose(cMajorScale, 12);
      expect(cMajorScaleOctaveUp).toBe(cMajorScale);
    });
  });

  describe("get.info", () => {
    it("should get info for a major chord shape", () => {
      const cMajor = tonal.shape({ root: "C", quality: "MAJOR" });
      const info = tonal.get.info(cMajor);
      expect(info).toContainEqual({ root: "C", quality: "MAJOR" });
    });
  });

  describe("find.chords", () => {
    it("should find all triads in a C Major scale", () => {
      const cMajorScale = tonal.shape({ root: "C", quality: "DIATONIC" });
      const triads = tonal.find.chords(cMajorScale, {
        qualities: ["MAJOR", "MINOR", "DIMINISHED"],
      });
      
      const triadRoots = triads.map(shape => tonal.get.info(shape)[0].root).sort();
      const expectedRoots = ["A", "B", "C", "D", "E", "F", "G"];
      
      expect(triadRoots).toEqual(expect.arrayContaining(expectedRoots));
      expect(triads.length).toBe(expectedRoots.length);
    });
  });
}); 