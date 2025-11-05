import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Debounced ScrollTrigger refresh to avoid multiple forced reflows
 * Multiple calls within the same frame will only trigger one refresh
 */

let refreshTimeout: ReturnType<typeof setTimeout> | null = null;
let rafId: number | null = null;

export const debouncedScrollTriggerRefresh = (delay = 100) => {
  // Cancel any pending refresh
  if (refreshTimeout) {
    clearTimeout(refreshTimeout);
  }
  if (rafId) {
    cancelAnimationFrame(rafId);
  }

  // Schedule new refresh
  rafId = requestAnimationFrame(() => {
    refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
      refreshTimeout = null;
      rafId = null;
    }, delay);
  });
};

/**
 * Immediate ScrollTrigger refresh (use sparingly)
 */
export const immediateScrollTriggerRefresh = () => {
  if (refreshTimeout) {
    clearTimeout(refreshTimeout);
  }
  if (rafId) {
    cancelAnimationFrame(rafId);
  }

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
};
