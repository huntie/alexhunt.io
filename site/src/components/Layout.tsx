import type { ReactNode } from 'react';
import useDarkMode from 'use-dark-mode';
import packageInfo from '../../package.json';
import Footer from './Footer';
import Header from './Header';

const REPO_URL = packageInfo.repository.url;
const CHANGELOG_URL = REPO_URL + '/pulls?q=is%3Apr+is%3Amerged';

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
      <Footer
        copyrightName="Alex Hunt"
        repositoryUrl={REPO_URL}
        changelogUrl={CHANGELOG_URL}
      />
    </>
  );
};

export default Layout;
