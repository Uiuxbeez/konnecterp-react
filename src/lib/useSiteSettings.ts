import { useEffect, useState } from "react";
import { apiUrl } from "@/lib/api-base";
import { DEFAULT_SITE_SETTINGS, type SiteSettings } from "@shared/site-settings";

let cachedSettings: SiteSettings | null = null;
let settingsPromise: Promise<SiteSettings> | null = null;

function loadSettings() {
  if (cachedSettings) return Promise.resolve(cachedSettings);
  settingsPromise ??= fetch(apiUrl("/api/public/settings"))
    .then((res) => (res.ok ? res.json() : Promise.reject()))
    .then((body: { settings?: SiteSettings }) => {
      cachedSettings = body.settings ?? DEFAULT_SITE_SETTINGS;
      return cachedSettings;
    })
    .catch(() => {
      cachedSettings = DEFAULT_SITE_SETTINGS;
      return cachedSettings;
    })
    .finally(() => {
      settingsPromise = null;
    });

  return settingsPromise;
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(cachedSettings ?? DEFAULT_SITE_SETTINGS);

  useEffect(() => {
    let alive = true;
    loadSettings().then((next) => {
      if (alive) setSettings(next);
    });

    return () => {
      alive = false;
    };
  }, []);

  return settings;
}
