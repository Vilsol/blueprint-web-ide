export function GenerateGUID(): string {
  return Array.from(window.crypto.getRandomValues(new Uint32Array(4))).map(n => n.toString(16)).join('-')
}