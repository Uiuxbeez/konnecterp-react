import { useEffect, useState } from "react";
import { apiUrl } from "@/lib/api-base";
import { MENU_GROUPS, type MenuGroup } from "@/lib/nav";

export function useNavigation() {
  const [navigation, setNavigation] = useState<MenuGroup[]>(MENU_GROUPS);

  useEffect(() => {
    let alive = true;

    fetch(apiUrl("/api/public/navigation"))
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((body: { navigation?: MenuGroup[] }) => {
        if (alive && Array.isArray(body.navigation)) setNavigation(body.navigation);
      })
      .catch(() => {
        if (alive) setNavigation(MENU_GROUPS);
      });

    return () => {
      alive = false;
    };
  }, []);

  return navigation;
}
