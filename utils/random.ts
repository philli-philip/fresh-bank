export function probability(likelyhood: number): boolean {
  const randomNumber = Math.random();
  const probability = likelyhood;
  if (randomNumber < probability) {
    return true;
  } else return false;
}
