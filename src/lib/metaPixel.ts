const PIXEL_ID = "2393702204767785";

declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
  }
}

let initialised = false;

function loadSnippet() {
  if (window.fbq) return;
  const n: any = (window.fbq = function (...args: any[]) {
    n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
  });
  if (!window._fbq) window._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);
}

/** Call when the landing page mounts. */
export function enablePixel() {
  if (typeof window === "undefined") return;
  loadSnippet();
  if (!initialised) {
    window.fbq("init", PIXEL_ID);
    initialised = true;
  } else {
    window.fbq("consent", "grant"); // re-entering the page
  }
  window.fbq("track", "PageView");
}

/** Call when the landing page unmounts so other pages aren't tracked. */
export function disablePixel() {
  window.fbq?.("consent", "revoke");
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  window.fbq?.("track", name, params);
}