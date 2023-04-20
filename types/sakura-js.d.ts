declare function Sakura(
  element: HTMLElement | string,
  options?: SakuraOptions
): void

interface SakuraOptions {
  className?: string
  fallSpeed?: number
  maxSize?: number
  minSize?: number
  newOn?: number
  sway?: number
  wind?: number
}
