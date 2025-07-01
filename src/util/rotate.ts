export function rotate(bitmask: number, amount: number): number {
  amount %= 12;
  if (amount < 0) {
    amount += 12;
  }
  const high = bitmask << amount;
  const low = bitmask >> (12 - amount);
  return (high | low) & 0b111111111111;
}
