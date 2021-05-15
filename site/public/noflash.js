/**
 * Prevent flash of light appearance if dark mode is the default.
 *
 * Source:
 * https://github.com/donavon/use-dark-mode/blob/8f016f4cdcfe799606b75d45bad7ced50f424ada/noflash.js.txt
 *
 * Copyright (c) 2018-present Donavon West
 * Licensed under MIT
 */

/* eslint-disable */

(function () {
  var storageKey = 'darkMode';
  var classNameDark = 'dark-mode';
  var classNameLight = 'light-mode';

  function setClassOnDocumentBody(darkMode) {
    document.body.classList.add(darkMode ? classNameDark : classNameLight);
    document.body.classList.remove(darkMode ? classNameLight : classNameDark);
  }

  var preferDarkQuery = '(prefers-color-scheme: dark)';
  var mql = window.matchMedia(preferDarkQuery);
  var supportsColorSchemeQuery = mql.media === preferDarkQuery;
  var localStorageTheme = null;
  try {
    localStorageTheme = localStorage.getItem(storageKey);
  } catch (err) {}
  var localStorageExists = localStorageTheme !== null;
  if (localStorageExists) {
    localStorageTheme = JSON.parse(localStorageTheme);
  }

  if (localStorageExists) {
    setClassOnDocumentBody(localStorageTheme);
  } else if (supportsColorSchemeQuery) {
    setClassOnDocumentBody(mql.matches);
    localStorage.setItem(storageKey, mql.matches);
  } else {
    var isDarkMode = document.body.classList.contains(classNameDark);
    localStorage.setItem(storageKey, JSON.stringify(isDarkMode));
  }
})();
