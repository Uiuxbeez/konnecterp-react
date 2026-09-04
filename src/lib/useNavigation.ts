import { useEffect, useState } from "react";
import { apiUrl } from "@/lib/api-base";
import { getVisibleNavigation, MENU_GROUPS, type MenuGroup } from "@/lib/nav";

let cachedNavigation: MenuGroup[] | null = null;
let navigationPromise: Promise<MenuGroup[]> | null = null;

function loadNavigation() {
  if (cachedNavigation) return Promise.resolve(cachedNavigation);
  navigationPromise ??= fetch(apiUrl("/api/public/navigation"))
    .then((res) => (res.ok ? res.json() : Promise.reject()))
    .then((body: { navigation?: MenuGroup[] }) => {
      cachedNavigation = Array.isArray(body.navigation) ? getVisibleNavigation(body.navigation) : getVisibleNavigation(MENU_GROUPS);
      return cachedNavigation;
    })
    .catch(() => {
      cachedNavigation = getVisibleNavigation(MENU_GROUPS);
      return cachedNavigation;
    })
    .finally(() => {
      navigationPromise = null;
    });

  return navigationPromise;
}

export function useNavigation() {
  const [navigation, setNavigation] = useState<MenuGroup[]>(cachedNavigation ?? getVisibleNavigation(MENU_GROUPS));

  useEffect(() => {
    let alive = true;

    loadNavigation().then((next) => {
      if (alive) setNavigation(next);
    });

    return () => {
      alive = false;
    };
  }, []);

  return navigation;
}
