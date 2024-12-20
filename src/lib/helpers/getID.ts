// by claude
function getNthCombination(n: number): string {
  // Validate input
  if (n < 0 || n >= Math.pow(26, 3)) {
    throw new Error(`Index must be between 0 and ${Math.pow(26, 3) - 1}`);
  }

  let result = "";
  const letters = "abcdefghijklmnopqrstuvwxyz";

  // Convert to base 26 for 3 letters
  for (let i = 0; i < 3; i++) {
    const remainder = n % 26;
    result = letters[remainder] + result;
    n = Math.floor(n / 26);
  }

  return result;
}
