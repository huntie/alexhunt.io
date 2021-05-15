import { useEffect, useState } from 'react';

/**
 * A hook returning whether the browser has access to the Clipboard API.
 */
const useHasClipboard = () => {
  const [hasClipboard, setHasClipboard] = useState(false);

  useEffect(() => setHasClipboard('clipboard' in window.navigator), []);

  return hasClipboard;
};

export default useHasClipboard;
