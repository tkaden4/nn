export function softmax(z: number) {}

export function sigmoid(z: number) {
  const result = 1 / (1 + Math.exp(-z));
  return result;
}

export function log(z: number) {
  const logResult = Math.log(z);
  return !isFinite(logResult) ? Math.sign(logResult) * Number.MAX_VALUE : logResult;
}
