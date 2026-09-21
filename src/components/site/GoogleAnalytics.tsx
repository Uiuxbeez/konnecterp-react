import { useEffect } from "react";
import { useLocation } from "wouter";
import { useSiteSettings } from "@/lib/useSiteSettings";

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};
const configured = new Set<string>();
let lastPage = "";
let previousLocation = "";

export function GoogleAnalytics() {
  const [location] = useLocation();
  const { analytics } = useSiteSettings();
  const id = analytics?.measurementId ?? "";
  const enabled = analytics?.enabled === true;
  useEffect(() => {
    const win = window as AnalyticsWindow;
    const disabled = !enabled || !/^G-[A-Z0-9]+$/.test(id) || /^\/admin(?:\/|$)/.test(location);
    for (const configuredId of configured) {
      Reflect.set(win, `ga-disable-${configuredId}`, disabled || configuredId !== id);
    }
    if (disabled) { lastPage = ""; return; }
    Reflect.set(win, `ga-disable-${id}`, false);
    win.dataLayer ??= [];
    win.gtag ??= function () { win.dataLayer!.push(arguments); };
    if (!configured.has(id)) {
      if (configured.size === 0) {
        win.gtag("js", new Date());
        const script = document.createElement("script");
        script.id = "site-google-analytics";
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
        document.head.appendChild(script);
      }
      win.gtag("config", id, { send_page_view: false });
      configured.add(id);
    }
    const currentLocation = window.location.href;
    const pageKey = `${id}:${currentLocation}`;
    if (lastPage !== pageKey) {
      win.gtag("event", "page_view", {
        send_to: id,
        page_location: currentLocation,
        page_title: document.title,
        page_referrer: previousLocation || document.referrer,
      });
      lastPage = pageKey;
      previousLocation = currentLocation;
    }
  }, [id, enabled, location]);
  return null;
}
