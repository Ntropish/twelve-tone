import { expect, test, describe } from "vitest";
import Tonal from "../Tonal";
import { Note } from "../Note";
import { Chord } from "../Chord";

describe("Tonal API", () => {
  test("should have factory functions", () => {
    expect(Tonal.note).toBeDefined();
    expect(Tonal.chord).toBeDefined();
    expect(Tonal.scale).toBeDefined();
  });
});

describe("Note class", () => {
  test("should create a Note instance", () => {
    const c = new Note("C");
    expect(c.name).toBe("C");
    expect(c.index).toBe(11);
  });

  test("should transpose up", () => {
    const c = new Note("C");
    const d = c.transpose(2);
    expect(d.name).toBe("D");
  });

  test("should transpose down", () => {
    const c = new Note("C");
    const a = c.transpose(-3);
    expect(a.name).toBe("A");
  });

  test("should handle wrapping when transposing", () => {
    const b = new Note("B");
    const d = b.transpose(3); // B -> C -> C# -> D
    expect(d.name).toBe("D");
  });

  test("should create a Note from an index", () => {
    const g = Note.fromIndex(4);
    expect(g.name).toBe("G");
  });
});

describe("Chord class", () => {
  test("should create a C Major chord", () => {
    const cMajor = new Chord("C", "MAJOR");
    expect(cMajor.name).toBe("C MAJOR");
    expect(cMajor.root.name).toBe("C");
    expect(cMajor.quality).toBe("MAJOR");
    const noteNames = cMajor.notes.map(n => n.name).sort();
    expect(noteNames).toEqual(["C", "E", "G"]);
  });

  test("Tonal.chord factory should create an E minor chord", () => {
    const eMinor = Tonal.chord("E minor");
    expect(eMinor.name).toBe("E MINOR");
    expect(eMinor.root.name).toBe("E");
    const noteNames = eMinor.notes.map(n => n.name).sort();
    // Note: getNotes returns indices B=0, C=11, etc.
    // E minor is E, G, B.
    // Indices: E=7, G=4, B=0
    // sorted: B, E, G
    // Names from indices: B, G, E
    // The note names can have flats/sharps, so we check against possible names
    const expectedNotes = ["B", "E", "G"].sort();
    expect(noteNames).toEqual(expectedNotes);
  });
}); 