import type { ReactNode } from 'react';
import useDarkMode from 'use-dark-mode';
import Header from './Header';

type Props = {
  children: ReactNode;
};

/**
 * The root layout component for all pages.
 */
const Layout = ({ children }: Props) => {
  const darkMode = useDarkMode();

  return (
    <>
      <Header
        title="Alex Hunt"
        darkMode={darkMode.value}
        onDarkModeChange={darkMode.toggle}
      />
      {children}
    </>
  );
};

export default Layout;
