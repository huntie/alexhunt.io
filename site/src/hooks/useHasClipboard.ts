import { useEffect, useState } from 'react';

/**
 * A hook returning whether the browser has access to the Clipboard API.
 */
const useHasClipboard = (): boolean => {
  const [hasClipboard, setHasClipboard] = useState(false);

  // Run browser-dependent logic inside effect
  useEffect(() => setHasClipboard('clipboard' in window.navigator), []);

  return hasClipboard;
};

export default useHasClipboard;
