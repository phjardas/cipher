import { useEffect, useMemo, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const matchMedia = useMemo(() => window.matchMedia(query), [query]);
  const [matches, setMatches] = useState(matchMedia.matches);

  useEffect(() => {
    setMatches(matchMedia.matches);
    const handleChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}
