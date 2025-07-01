function rotate(bitmask, amount) {
  amount %= 12;
  if (amount < 0) {
    amount += 12;
  }
  // With the new indexing (C=11, B=0), positive rotation should move notes up in pitch
  // This means we need to right shift for positive amounts
  const high = bitmask >> amount;
  const low = bitmask << (12 - amount);
  return (high | low) & 0b111111111111;
}

// C Major chord: 0b100010010000 (with new indexing: C=11, E=7, G=4)
const C_MAJOR = 0b100010010000;
console.log("C Major:", C_MAJOR.toString(2).padStart(12, "0"));

// Rotate by 9
const rotated = rotate(C_MAJOR, 9);
console.log("Rotated by 9:", rotated.toString(2).padStart(12, "0"));

// Let's see what positions have 1s
console.log("Original positions with 1s:");
for (let i = 0; i < 12; i++) {
  if (C_MAJOR & (1 << i)) {
    console.log(`Position ${i}: 1`);
  }
}

console.log("Rotated by 9 positions with 1s:");
for (let i = 0; i < 12; i++) {
  if (rotated & (1 << i)) {
    console.log(`Position ${i}: 1`);
  }
}

// Let me also check what the bitmask actually represents
console.log("C Major bitmask value:", C_MAJOR);
console.log("Binary representation:", C_MAJOR.toString(2));

// With new indexing:
// 11: C, 10: C#, 9: D, 8: D#, 7: E, 6: F, 5: F#, 4: G, 3: G#, 2: A, 1: A#, 0: B
console.log("Expected C Major positions: 11 (C), 7 (E), 4 (G)");
console.log("Expected A Major positions: 2 (A), 10 (C#), 7 (E)"); 