import { useEffect, useRef } from "preact/hooks";
import { useLocation } from "wouter-preact";
import { isInSPAScope } from "~data/routing";

// NOTE 2025-02-26 jeremboo: Listen when we are outside the SPA and want to comeback in
export default () => {
  if (!import.meta.env.SSR) {
    const [location] = useLocation();
    const isInSPAScopeRef = useRef(isInSPAScope(location));
    useEffect(() => {
      if (!isInSPAScope(location)) {
        isInSPAScopeRef.current = false;
      } else if (!isInSPAScopeRef.current) {
        isInSPAScopeRef.current = true;
        document.location.href = location;
      }
    }, [location]);
  }
  return null;
}