// Script Loader - Loads tracking scripts only after consent
import { ConsentCategories } from './consent';

interface ScriptConfig {
  id: string;
  src?: string;
  init: () => void;
}

// Track which scripts have been loaded to prevent duplicates
const loadedScripts = new Set<string>();

// Google Analytics 4 configuration
const GA4_ID = 'G-PN6YD4Z1D5';

// Google Tag Manager configuration
const GTM_ID = 'GTM-TF3F89BP';

// Microsoft Clarity configuration
const CLARITY_ID = 'v4vvg5pveg';

// Declare global types
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    clarity: (...args: unknown[]) => void;
  }
}

/**
 * Load a script dynamically
 */
function loadScript(src: string, id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}

/**
 * Initialize Google Analytics 4
 */
async function initGA4(): Promise<void> {
  if (loadedScripts.has('ga4')) return;
  
  // Load gtag.js
  await loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`, 'ga4-script');
  
  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', GA4_ID, {
    anonymize_ip: true,
    cookie_flags: 'SameSite=Lax;Secure',
  });
  
  loadedScripts.add('ga4');
  console.log('[Consent] Google Analytics 4 loaded');
}

/**
 * Initialize Microsoft Clarity
 */
function initClarity(): void {
  if (loadedScripts.has('clarity')) return;
  
  // Clarity initialization script
  (function(c: Window, l: Document, a: string, r: string, i: string) {
    (c as unknown as Record<string, unknown>)[a] = (c as unknown as Record<string, unknown>)[a] || function(...args: unknown[]) {
      ((c as unknown as Record<string, { q: unknown[][] }>)[a].q = (c as unknown as Record<string, { q: unknown[][] }>)[a].q || []).push(args);
    };
    const t = l.createElement(r) as HTMLScriptElement;
    t.async = true;
    t.src = 'https://www.clarity.ms/tag/' + i;
    const y = l.getElementsByTagName(r)[0];
    y.parentNode?.insertBefore(t, y);
  })(window, document, 'clarity', 'script', CLARITY_ID);
  
  loadedScripts.add('clarity');
  console.log('[Consent] Microsoft Clarity loaded');
}

/**
 * Initialize Google Tag Manager
 */
function initGTM(): void {
  if (loadedScripts.has('gtm')) return;
  
  // GTM initialization script
  (function(w: Window, d: Document, s: string, l: string, i: string) {
    (w as unknown as Record<string, unknown[]>)[l] = (w as unknown as Record<string, unknown[]>)[l] || [];
    (w as unknown as Record<string, unknown[]>)[l].push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });
    const f = d.getElementsByTagName(s)[0];
    const j = d.createElement(s) as HTMLScriptElement;
    const dl = l !== 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode?.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', GTM_ID);
  
  // Also add noscript iframe for GTM
  if (!document.getElementById('gtm-noscript')) {
    const noscript = document.createElement('noscript');
    noscript.id = 'gtm-noscript';
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    noscript.appendChild(iframe);
    document.body.insertBefore(noscript, document.body.firstChild);
  }
  
  loadedScripts.add('gtm');
  console.log('[Consent] Google Tag Manager loaded');
}

/**
 * Load scripts based on consent categories
 */
export async function loadConsentedScripts(categories: ConsentCategories): Promise<void> {
  const promises: Promise<void>[] = [];
  
  // Analytics: GA4 and Clarity
  if (categories.analytics) {
    promises.push(initGA4());
    initClarity();
  }
  
  // Marketing: GTM
  if (categories.marketing) {
    initGTM();
  }
  
  await Promise.all(promises);
}

/**
 * Check if any tracking scripts have been loaded
 */
export function hasLoadedScripts(): boolean {
  return loadedScripts.size > 0;
}

/**
 * Get list of loaded scripts (for debugging)
 */
export function getLoadedScripts(): string[] {
  return Array.from(loadedScripts);
}
