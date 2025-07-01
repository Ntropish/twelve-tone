function rotate(bitmask, amount) {
  amount %= 12;
  if (amount < 0) {
    amount += 12;
  }
  const high = (bitmask << amount) & 0b111111111111;
  const low = bitmask >> (12 - amount);
  return (high | low) & 0b111111111111;
}

// Test C Major chord
const C_MAJOR = 0b100010010000;
console.log("C Major:", C_MAJOR.toString(2).padStart(12, "0"));

// Test rotating by different amounts and see what the root should be
for (let i = 0; i < 12; i++) {
  const rotated = rotate(C_MAJOR, i);
  const rootIndex = (11 - i + 12) % 12;
  const noteNames = ["B", "A#", "A", "G#", "G", "F#", "F", "E", "D#", "D", "C#", "C"];
  console.log(`Rotation ${i}: ${rotated.toString(2).padStart(12, "0")} -> Root: ${noteNames[rootIndex]}`);
}

// Let's also test what happens when we rotate C Major by 2 to get D Major
console.log("\nC Major rotated by 2 (should be D Major):");
const D_MAJOR = rotate(C_MAJOR, 2);
console.log("D Major bitmask:", D_MAJOR.toString(2).padStart(12, "0"));
console.log("Expected root index:", (11 - 2 + 12) % 12);
console.log("Expected root note:", ["B", "A#", "A", "G#", "G", "F#", "F", "E", "D#", "D", "C#", "C"][(11 - 2 + 12) % 12]);

// Let's check what ChordShapes.MAJOR represents
console.log("\nChordShapes.MAJOR analysis:");
const MAJOR_SHAPE = 0b100010010000;
console.log("MAJOR shape:", MAJOR_SHAPE.toString(2).padStart(12, "0"));
console.log("MAJOR shape notes:");
for (let i = 0; i < 12; i++) {
  if (MAJOR_SHAPE & (1 << i)) {
    const noteNames = ["B", "A#", "A", "G#", "G", "F#", "F", "E", "D#", "D", "C#", "C"];
    console.log(`Position ${i}: ${noteNames[i]}`);
  }
} 