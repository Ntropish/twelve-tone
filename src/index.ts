//
// twelve-tone — A functional utility library for musical computation
//

// --- Imports
import { Notes, noteNamesByIndex, NoteName } from "./notes";
import { ChordShapes, ChordShape } from "./chord-shapes";
import { ScaleShapes, ScaleShape } from "./scale-shapes";
import { MODES } from "./modes";

// --- Low-level utilities
import { rotate } from "./util/rotate";
import { getNotes } from "./util/getNotes";
import { getCoveredShapes } from "./util/getCoveredShapes";
import { getCoveringShapes } from "./util/getCoveringShapes";
import { shapeToChord } from "./util/shapeToChord";
import { shapeToScale } from "./util/shapeToScale";

// --- Export core data
export { ChordShapes, ScaleShapes, Notes, noteNamesByIndex };

// --- Type definitions

type ShapeConfig = {
  root: NoteName;
  quality?: ChordShape | ScaleShape;
  mode?: string;
};

type Interpretation = {
  root: NoteName;
  quality: string;
};

/**
 * A comprehensive musical utility object for working with chords and scales.
 */
export const tonal = {
  /**
   * Creates a musical shape (a bitmask representing a set of notes) from a configuration object.
   *
   * @param {ShapeConfig} config - The configuration for the shape.
   * @param {NoteName} config.root - The root note of the shape.
   * @param {ChordShape | ScaleShape} [config.quality] - The quality of the chord or scale (e.g., 'MAJOR', 'MINOR').
   * @param {string} [config.mode] - The mode of the scale (e.g., 'DORIAN', 'LYDIAN').
   * @returns {number} A bitmask representing the musical shape.
   * @throws {Error} If the configuration is invalid.
   */
  shape: (config: ShapeConfig): number => {
    const { root, quality, mode } = config;
    
    if (mode) {
      const modeUpper = mode.toUpperCase();
      if (!MODES[modeUpper]) throw new Error(`Invalid mode: ${mode}`);
      const modeInfo = MODES[modeUpper];
      const parentShape = ScaleShapes[modeInfo.parent];
      const parentRoot = (Notes[root] + modeInfo.offset + 12) % 12;
      const rotation = parentRoot - Notes.C;
      return rotate(parentShape, rotation);
    }

    if (quality) {
      const baseShape = ChordShapes[quality as ChordShape] ?? ScaleShapes[quality as ScaleShape];
      if (!baseShape) throw new Error(`Invalid quality: ${quality}`);
      const rotation = Notes[root] - Notes.C;
      return rotate(baseShape, rotation);
    }

    throw new Error("Invalid shape config: must provide quality or mode.");
  },

  /**
   * Creates a musical shape from a root note value and a base shape value.
   * This is a lower-level, type-safe alternative to the string-based `shape` function.
   *
   * @param {number} rootValue - The numeric value of the root note (from the `Notes` object).
   * @param {number} shapeValue - The numeric value of the base chord or scale shape (from `ChordShapes` or `ScaleShapes`).
   * @returns {number} The bitmask of the final, transposed musical shape.
   */
  from: (rootValue: number, shapeValue: number): number => {
    // We assume shapeValue is a C-rooted shape.
    // We assume rootValue is an index from the Notes object.
    const rotation = rootValue - Notes.C;
    return rotate(shapeValue, rotation);
  },

  /**
   * Transposes a musical shape by a given interval in semitones.
   *
   * @param {number} shape - The bitmask of the shape to transpose.
   * @param {number} interval - The interval in semitones to transpose by (positive for up, negative for down).
   * @returns {number} The bitmask of the transposed shape.
   */
  transpose: (shape: number, interval: number): number => {
    // To transpose UP by a positive interval, we must rotate LEFT by a NEGATIVE amount.
    return rotate(shape, -interval);
  },

  /**
   * Functions for extracting information from a musical shape.
   */
  get: {
    /**
     * Gets the note names for a given musical shape.
     *
     * @param {number} shape - The bitmask of the shape.
     * @returns {NoteName[]} An array of note names in the shape.
     */
    notes: (shape: number): NoteName[] => {
      const noteIndices = getNotes(shape);
      return noteIndices.map(index => noteNamesByIndex[index][0]);
    },
    /**
     * Gets possible interpretations (chords and scales) for a given musical shape.
     *
     * @param {number} shape - The bitmask of the shape.
     * @returns {Interpretation[]} An array of possible interpretations.
     */
    info: (shape: number): Interpretation[] => {
      const chords = shapeToChord(shape);
      const scales = shapeToScale(shape);
      const mapToInterpretation = ([root, quality]: [NoteName, string]): Interpretation => ({ root, quality });
      return [...chords.map(mapToInterpretation), ...scales.map(mapToInterpretation)];
    },
  },

  /**
   * Functions for finding related shapes.
   */
  find: {
    /**
     * Finds all chords of specified qualities that are covered by a given scale shape.
     *
     * @param {number} scaleShape - The bitmask of the scale shape.
     * @param {object} [options] - Optional parameters.
     * @param {ChordShape[]} [options.qualities] - An array of chord qualities to search for. Defaults to all chord qualities.
     * @returns {number[]} An array of bitmasks for the found chords.
     */
    chords: (
      scaleShape: number,
      options?: { qualities: ChordShape[] }
    ): number[] => {
      const qualityMasks = options?.qualities?.map(q => ChordShapes[q]);
      return getCoveredShapes(scaleShape, qualityMasks);
    },
    /**
     * Finds all scale shapes that contain a given chord shape.
     *
     * @param {number} chordShape - The bitmask of the chord shape.
     * @returns {number[]} An array of bitmasks for the found scales.
     */
    scales: (chordShape: number): number[] => {
      return getCoveringShapes(chordShape);
    },
  },
};
