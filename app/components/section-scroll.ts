// Three pixels of input move the page one pixel, independently of elapsed time.
export const SCROLL_DISTANCE_MULTIPLIER = 3;

export function scrollPosition(position: number, delta: number, start: number, end: number) {
  return Math.max(start, Math.min(end, position + delta / SCROLL_DISTANCE_MULTIPLIER));
}

// Frame-rate-independent damping: follow input and settle, without a fixed duration.
export function smoothScrollPosition(current: number, target: number, seconds: number) {
  return current + (target - current) * (1 - Math.exp(-12 * Math.max(0, seconds)));
}
