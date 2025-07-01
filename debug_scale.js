// C Major scale: 0b101011010101
const C_MAJOR_SCALE = 0b101011010101;
console.log("C Major scale:", C_MAJOR_SCALE.toString(2).padStart(12, "0"));

// D Minor chord: 0b100100010000 (C Minor rotated by 2 semitones)
const D_MINOR = 0b100100010000;
console.log("D Minor chord:", D_MINOR.toString(2).padStart(12, "0"));

// Check if D Minor is a subset of C Major
const isSubset = (sourceMask, targetMask) => (sourceMask & targetMask) === targetMask;
console.log("Is D Minor subset of C Major?", isSubset(C_MAJOR_SCALE, D_MINOR));

// Let's see what notes are in C Major scale
console.log("C Major scale notes:");
for (let i = 0; i < 12; i++) {
  if (C_MAJOR_SCALE & (1 << i)) {
    const noteNames = ["B", "A#", "A", "G#", "G", "F#", "F", "E", "D#", "D", "C#", "C"];
    console.log(`Position ${i}: ${noteNames[i]}`);
  }
}

// Let's see what notes are in D Minor chord
console.log("D Minor chord notes:");
for (let i = 0; i < 12; i++) {
  if (D_MINOR & (1 << i)) {
    const noteNames = ["B", "A#", "A", "G#", "G", "F#", "F", "E", "D#", "D", "C#", "C"];
    console.log(`Position ${i}: ${noteNames[i]}`);
  }
}

// Let's also check what D Minor should be (D, F, A)
// D is at position 9, F is at position 6, A is at position 2
const D_MINOR_CORRECT = (1 << 9) | (1 << 6) | (1 << 2);
console.log("D Minor (correct):", D_MINOR_CORRECT.toString(2).padStart(12, "0"));
console.log("Is correct D Minor subset of C Major?", isSubset(C_MAJOR_SCALE, D_MINOR_CORRECT));

// Let's check what the current MINOR chord shape represents
const MINOR_SHAPE = 0b100100010000;
console.log("Current MINOR shape:", MINOR_SHAPE.toString(2).padStart(12, "0"));
console.log("MINOR shape notes:");
for (let i = 0; i < 12; i++) {
  if (MINOR_SHAPE & (1 << i)) {
    const noteNames = ["B", "A#", "A", "G#", "G", "F#", "F", "E", "D#", "D", "C#", "C"];
    console.log(`Position ${i}: ${noteNames[i]}`);
  }
}

// What should C Minor be? (C, D#, G)
// C is at position 11, D# is at position 8, G is at position 4
const C_MINOR_CORRECT = (1 << 11) | (1 << 8) | (1 << 4);
console.log("C Minor (correct):", C_MINOR_CORRECT.toString(2).padStart(12, "0"));
console.log("Is C Minor correct?", C_MINOR_CORRECT === MINOR_SHAPE); 