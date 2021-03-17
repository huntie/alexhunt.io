import type { ReactNode } from 'react';
import useDarkMode from 'use-dark-mode';
import Header from './Header';
import styles from './Layout.module.css';

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
      <div className={styles.content}>{children}</div>
    </>
  );
};

export default Layout;
