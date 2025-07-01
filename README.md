# twelve-tone

A functional utility library for musical computation.

`twelve-tone` provides a simple, powerful, and fast API for working with musical concepts like notes, chords, and scales. It represents musical entities as 12-bit numbers ("shapes"), making operations like transposition and comparison extremely efficient.

## Core Concepts

At the heart of `twelve-tone` is the "shape"—a 12-bit integer where each bit corresponds to one of the twelve notes of the chromatic scale. A `1` indicates the note is present in the shape, and a `0` indicates it is not.

This allows for complex musical operations to be performed using simple, highly efficient bitwise operations.

- **Bitmask:** `0b100010010000`
- **Represents:** C Major Triad (C, E, G)
- **Notes:** C, B, Bb, A, Ab, G, Gb, F, E, Eb, D, Db (from right to left)

## Installation

```bash
npm install twelve-tone
```

## Usage

The primary entry point is the `tonal` object, which exposes the entire API.

```javascript
import { tonal, Notes, ChordShapes } from 'twelve-tone';
```

### Creating Musical Shapes

There are two primary ways to create a shape.

**1. Using the `shape` function (descriptive):**

This function takes a configuration object, making the code readable and explicit.

```javascript
// Create a C Major chord
const cMajor = tonal.shape({ root: 'C', quality: 'MAJOR' });

// Create a D Dorian scale
const dDorian = tonal.shape({ root: 'D', mode: 'DORIAN' });
```

**2. Using the `from` function (type-safe):**

For maximum type-safety and performance, you can use the exported `Notes` and `ChordShapes` / `ScaleShapes` constants. This avoids "magic strings" and is validated at compile time by TypeScript.

```javascript
// Create a G Major chord
const gMajor = tonal.from(Notes.G, ChordShapes.MAJOR);

// Create a Bb Minor 7th chord
const bbMinor7 = tonal.from(Notes.Bb, ChordShapes.MINOR7);
```

### Working with Shapes

Once you have a shape, you can get its notes, transpose it, and analyze it.

**Get Notes from a Shape**

```javascript
const cMajor = tonal.from(Notes.C, ChordShapes.MAJOR);
const notes = tonal.get.notes(cMajor);
//=> ['C', 'E', 'G']
```

**Transpose a Shape**

```javascript
const cMajor = tonal.from(Notes.C, ChordShapes.MAJOR);
// Transpose up by a perfect fifth (7 semitones)
const gMajor = tonal.transpose(cMajor, 7);
const notes = tonal.get.notes(gMajor);
//=> ['G', 'B', 'D']
```

**Get Information about a Shape**

You can get a list of possible interpretations for any given shape.

```javascript
const cMajor = tonal.from(Notes.C, ChordShapes.MAJOR);
const info = tonal.get.info(cMajor);
//=> [ { root: 'C', quality: 'MAJOR' }, { root: 'C', quality: 'NEAPOLITAN' } ]
// Note: NEAPOLITAN has the same shape as MAJOR
```

**Find Chords within a Scale**

You can find all the chords of a certain quality that fit within a scale.

```javascript
const cMajorScale = tonal.shape({ root: 'C', quality: 'DIATONIC' });

// Find all major, minor, and diminished triads
const triads = tonal.find.chords(cMajorScale, {
  qualities: ['MAJOR', 'MINOR', 'DIMINISHED'],
});

// Get the info for each triad
const triadInfo = triads.map(shape => tonal.get.info(shape)[0]);
//=> [ { root: 'C', quality: 'MAJOR' }, { root: 'D', quality: 'MINOR' }, ... ]
```

## API

### `tonal.shape(config)`

Creates a shape from a configuration object.
- `config.root`: `NoteName` (e.g., 'C', 'Db', 'F#')
- `config.quality`: `ChordShape | ScaleShape` (e.g., 'MAJOR', 'MINOR7', 'DIATONIC')
- `config.mode`: `string` (e.g., 'DORIAN', 'LYDIAN')

### `tonal.from(rootValue, shapeValue)`

Creates a shape from numeric constants for root and quality.
- `rootValue`: `number` (from `Notes`)
- `shapeValue`: `number` (from `ChordShapes` or `ScaleShapes`)

### `tonal.transpose(shape, interval)`

Transposes a shape by a number of semitones.

### `tonal.get.notes(shape)`

Returns an array of `NoteName` strings in the shape.

### `tonal.get.info(shape)`

Returns an array of possible `{ root, quality }` interpretations for a shape.

### `tonal.find.chords(scaleShape, options)`

Finds all chords within a scale. `options.qualities` can filter the chord types.

### `tonal.find.scales(chordShape)`

Finds all scales that contain a given chord.

## Contributing

Contributions are welcome! Please open an issue to discuss your ideas or submit a pull request.

## License

[ISC](https://opensource.org/licenses/ISC) 