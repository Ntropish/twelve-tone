import { ScaleShape } from "./scale-shapes";

type ModeDefinition = {
  parent: ScaleShape;
  offset: number; // Offset in "inverted semitone" units from `Notes`
};

export const MODES: Record<string, ModeDefinition> = {
  // Diatonic Modes
  IONIAN:     { parent: 'DIATONIC', offset: 0 },
  DORIAN:     { parent: 'DIATONIC', offset: 2 },  // -2 semitones
  PHRYGIAN:   { parent: 'DIATONIC', offset: 4 },  // -4 semitones
  LYDIAN:     { parent: 'DIATONIC', offset: 5 },  // -5 semitones
  MIXOLYDIAN: { parent: 'DIATONIC', offset: 7 },  // -7 semitones
  AEOLIAN:    { parent: 'DIATONIC', offset: 9 },  // -9 semitones
  LOCRIAN:    { parent: 'DIATONIC', offset: 11 }, // -11 semitones
  // Other mode families can be added here
}; 