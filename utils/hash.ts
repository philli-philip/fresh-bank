const characters =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const hashLength = 12; // The desired length of the hash.

export function generateQuickHash(length: number): string {
  // Get a crypto-safe random number generator.
  const randomBytes = new Uint8Array(length);
  crypto.getRandomValues(randomBytes);

  let hash = "";
  for (let i = 0; i < hashLength; i++) {
    // Use the random byte value to pick a character from the defined set.
    // The modulo operator ensures we stay within the bounds of the characters array.
    hash += characters[randomBytes[i] % characters.length];
  }
  return hash;
}
