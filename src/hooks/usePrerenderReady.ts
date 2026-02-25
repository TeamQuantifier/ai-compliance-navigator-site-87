import { useEffect } from 'react';

/**
 * Signals to Netlify Prerender that the page is ready to be captured.
 * Call with `true` when async data has loaded, or unconditionally for static pages.
 */
export const usePrerenderReady = (isReady: boolean = true) => {
  useEffect(() => {
    if (isReady) {
      (window as any).prerenderReady = true;
    }
  }, [isReady]);
};
