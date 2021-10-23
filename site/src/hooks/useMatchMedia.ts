import { useEffect, useState } from 'react';

/**
 * A hook returning whether the document matches the given media query string.
 */
const useMatchMedia = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  // Run browser-dependent logic inside effect
  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    setMatches(mediaQueryList.matches);

    const handleChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQueryList.addEventListener('change', handleChange);

    return () => mediaQueryList.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
};

export default useMatchMedia;
