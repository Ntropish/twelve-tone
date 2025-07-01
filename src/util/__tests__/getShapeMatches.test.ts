import { ChordShapes } from "../../chord-shapes";
import { ScaleShapes } from "../../scale-shapes";
import { getCoveredShapes } from "../getCoveredShapes";
import { getCoveringShapes } from "../getCoveringShapes";
import { shapeToChord } from "../shapeToChord";
import { shapeToScale } from "../shapeToScale";
import { rotate } from "../rotate";
import { groupBy, filter } from "lodash-es";
import { Notes } from "../../notes";

import { expect, test, describe } from "vitest";

describe("Musical Shape Utilities", () => {
  // Use the base, C-rooted shapes directly from the definitions.
  const C_MAJOR_SCALE = ScaleShapes.DIATONIC;
  const C_MAJOR_TRIAD = ChordShapes.MAJOR;

  test("shapeToChord should identify a C Major triad", () => {
    const result = shapeToChord(C_MAJOR_TRIAD);
    // The MAJOR and NEAPOLITAN shapes have the same bitmask, so both are correctly identified.
    expect(result).toEqual(
      expect.arrayContaining([
        ["C", "MAJOR"],
        ["C", "NEAPOLITAN"],
      ])
    );
  });

  test("shapeToChord should identify a C Minor triad", () => {
    const result = shapeToChord(ChordShapes.MINOR);
    expect(result).toEqual(
      expect.arrayContaining([
        ["C", "MINOR"],
      ])
    );
  });

  test("shapeToChord should identify a E Major triad", () => {
    console.log(
      `Bitmask before : ${ChordShapes.MINOR.toString(2).padStart(12, "0")}, Chord:`,
      shapeToChord(ChordShapes.MINOR)
    );
    const E_MAJOR_TRIAD = rotate(ChordShapes.MAJOR, Notes.E - Notes.C);
    console.log(
      `Bitmask after  : ${E_MAJOR_TRIAD.toString(2).padStart(12, "0")}, Chord:`,
      shapeToChord(E_MAJOR_TRIAD)
    );
    const result = shapeToChord(E_MAJOR_TRIAD);
    expect(result).toEqual(
      expect.arrayContaining([
        ["E", "MAJOR"],
      ])
    );
  });

  test("shapeToChord should identify a E Minor triad", () => {
    console.log(
      `Bitmask before : ${ChordShapes.MINOR.toString(2).padStart(12, "0")}, Chord:`,
      shapeToChord(ChordShapes.MINOR)
    );
    const E_MINOR_TRIAD = rotate(ChordShapes.MINOR, Notes.E - Notes.C);
    console.log(
      `Bitmask after  : ${E_MINOR_TRIAD.toString(2).padStart(12, "0")}, Chord:`,
      shapeToChord(E_MINOR_TRIAD)
    );
    const result = shapeToChord(E_MINOR_TRIAD);
    expect(result).toEqual(
      expect.arrayContaining([
        ["E", "MINOR"],
      ])
    );
  });

  test("shapeToChord should identify a A Major triad", () => {
    const A_MAJOR_TRIAD = rotate(ChordShapes.MAJOR, Notes.A - Notes.C);
    // log the bitmask
    console.log(A_MAJOR_TRIAD.toString(2).padStart(12, "0"));
    const result = shapeToChord(A_MAJOR_TRIAD);
    expect(result).toEqual(
      expect.arrayContaining([
        ["A", "MAJOR"],
      ])
    );
  });

  test("shapeToChord should identify a F# Minor triad", () => {
    const F_SHARP_MINOR_TRIAD = rotate(ChordShapes.MINOR, Notes["F#"] - Notes.C);
    const result = shapeToChord(F_SHARP_MINOR_TRIAD);
    expect(result).toEqual(
      expect.arrayContaining([
        ["F#", "MINOR"],
      ])
    );
  });

  test("shapeToScale should identify a C Major scale", () => {
    const result = shapeToScale(C_MAJOR_SCALE);
    const hasMajor = result.some(
      ([root, name]) => root === "C" && name === "DIATONIC"
    );
    expect(hasMajor).toBe(true);
  });

  test("getCoveredShapes should find all triads in C Major scale", () => {
    const coveredChordsMasks = getCoveredShapes(ScaleShapes.DIATONIC, [
      ChordShapes.MAJOR,
      ChordShapes.MINOR,
      ChordShapes.DIMINISHED,
    ]);
    const resolvedChords = coveredChordsMasks.flatMap((mask) => {
      const chord = shapeToChord(mask);
      // Print the bitmask and the notes for each found chord
      console.log(
        `Bitmask: ${mask.toString(2).padStart(12, "0")}, Chord:`,
        chord
      );
      return chord;
    });

    console.log(resolvedChords);

    const chordsByRoot = groupBy(resolvedChords, ([root]) => root);

    expect(chordsByRoot["C"] || []).toContainEqual(["C", "MAJOR"]);
    expect(chordsByRoot["D"] || []).toContainEqual(["D", "MINOR"]);

    expect(chordsByRoot["E"] || []).toContainEqual(["E", "MINOR"]);
    expect(chordsByRoot["F"] || []).toContainEqual(["F", "MAJOR"]);
    expect(chordsByRoot["G"] || []).toContainEqual(["G", "MAJOR"]);
    expect(chordsByRoot["A"] || []).toContainEqual(["A", "MINOR"]);
    expect(chordsByRoot["B"] || []).toContainEqual(["B", "DIMINISHED"]);

    // Verify we have some minor chords (the debug showed rotations 3, 8, 10 work)
    const minorChords = filter(resolvedChords, ([note, shape]) => shape === "MINOR");
    expect(minorChords.length).toBeGreaterThan(0);

    // Also verify we found a reasonable number of chords (should be many more than just 7)
    expect(resolvedChords.length).toBeGreaterThan(10);
  });

  test("getCoveringShapes should find scales containing a C Major triad", () => {
    const scales = getCoveringShapes(C_MAJOR_TRIAD);
    // C Major Triad (C-E-G) is in many scales. Test the most common ones.
    // The results are the bitmasks for the scales themselves, rotated to C.
    expect(scales).toContain(ScaleShapes.DIATONIC); // C Ionian (is C Major)
    expect(scales).toContain(rotate(ScaleShapes.DIATONIC, Notes.F - Notes.C)); // C Lydian (is F Major)
    expect(scales).toContain(rotate(ScaleShapes.DIATONIC, Notes.G - Notes.C)); // C Mixolydian (is G Major)
    expect(scales).toContain(ScaleShapes.HARMONIC_MAJOR); // C Harmonic Major
  });

  test("Negative test: getCoveringShapes should not find scales that DO NOT contain G Major", () => {
    const G_MAJOR_TRIAD_MASK = rotate(C_MAJOR_TRIAD, Notes.G - Notes.C);
    const scales = getCoveringShapes(G_MAJOR_TRIAD_MASK);
    // G Major triad (G-B-D) is NOT in C Harmonic Minor
    const C_HARMONIC_MINOR_MASK = rotate(ScaleShapes.HARMONIC_MINOR, Notes.C - Notes.G);
    expect(scales).not.toContain(C_HARMONIC_MINOR_MASK);
  });

  test("Negative test: getCoveredShapes should not find chords that are NOT in C Major", () => {
    const chords = getCoveredShapes(C_MAJOR_SCALE);
    // D Major triad (D-F#-A) is not in C Major scale
    const D_MAJOR_TRIAD_MASK = rotate(C_MAJOR_TRIAD, 2);
    expect(chords).not.toContain(D_MAJOR_TRIAD_MASK);
  });
});
