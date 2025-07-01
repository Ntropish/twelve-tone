export function rotate(bitmask: number, amount: number): number {
  amount = ((amount % 12) + 12) % 12; // Ensure amount is positive and within 0-11
  
  // Perform a 12-bit left rotation
  const rotated = (bitmask << amount) | (bitmask >> (12 - amount));
  
  // Mask to 12 bits
  return rotated & 0b111111111111;
}
