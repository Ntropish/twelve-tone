function rotate(bitmask, amount) {
  amount %= 12;
  if (amount < 0) {
    amount += 12;
  }
  const high = (bitmask << amount) & 0b111111111111;
  const low = bitmask >> (12 - amount);
  return (high | low) & 0b111111111111;
}

// Test C Minor chord
const C_MINOR = 0b100100010000;
console.log("C Minor:", C_MINOR.toString(2).padStart(12, "0"));

// Test rotating by 2 to get D Minor
const D_MINOR = rotate(C_MINOR, 2);
console.log("D Minor (rotated by 2):", D_MINOR.toString(2).padStart(12, "0"));

// Test the root calculation
for (let i = 0; i < 12; i++) {
  const rotated = rotate(C_MINOR, i);
  const rootIndex = (11 - i + 12) % 12;
  const noteNames = ["B", "A#", "A", "G#", "G", "F#", "F", "E", "D#", "D", "C#", "C"];
  console.log(`Rotation ${i}: ${rotated.toString(2).padStart(12, "0")} -> Root: ${noteNames[rootIndex]} (index: ${rootIndex})`);
}

// Let's also check what D Minor should be
console.log("\nExpected D Minor notes: D (9), F (6), A (2)");
console.log("Expected D Minor bitmask: 001001000100"); 