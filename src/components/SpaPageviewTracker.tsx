import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Sends a SPA page_view event to GTM/dataLayer on every React Router navigation.
 *
 * Why this exists:
 *   GTM's default "Initialization / All Pages" trigger only fires on full page
 *   loads. In a SPA, navigating between routes does NOT trigger another gtm.js
 *   event, so Google Tag Assistant reports "Tag not detected" for URLs that
 *   users only ever reach via in-app navigation (e.g. story detail pages,
 *   framework subpages reached from the menu).
 *
 *   We push a synthetic `page_view` event with the new path + title on every
 *   location change. In GTM, configure the GA4 Configuration tag (or a
 *   dedicated GA4 Event tag) to fire on a "Custom Event" trigger matching
 *   event name `page_view` (in addition to All Pages) so analytics + tag
 *   detection covers every URL.
 *
 *   Consent Mode v2 default-denied still applies — Google receives cookieless
 *   pings, which is enough for the "Tag detected" status without violating
 *   GDPR/ePrivacy.
 */
export function SpaPageviewTracker() {
  const location = useLocation();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const url = location.pathname + location.search;

    // Skip the very first render — the static GTM snippet in index.html already
    // produced the initial gtm.js / page_view for this URL. We only want to
    // augment subsequent SPA navigations.
    if (lastPath.current === null) {
      lastPath.current = url;
      return;
    }

    if (lastPath.current === url) return;
    lastPath.current = url;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: 'page_view',
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location.pathname, location.search]);

  return null;
}

export default SpaPageviewTracker;
