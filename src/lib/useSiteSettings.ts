import { useEffect, useState } from "react";
import { apiUrl } from "@/lib/api-base";
import { DEFAULT_SITE_SETTINGS, type SiteSettings } from "@shared/site-settings";

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);

  useEffect(() => {
    let alive = true;
    fetch(apiUrl("/api/public/settings"))
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((body: { settings?: SiteSettings }) => {
        if (alive && body.settings) setSettings(body.settings);
      })
      .catch(() => {
        if (alive) setSettings(DEFAULT_SITE_SETTINGS);
      });

    return () => {
      alive = false;
    };
  }, []);

  return settings;
}
