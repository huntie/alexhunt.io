import styles from './Header.module.css';

/**
 * SVG source from ionic-team/ionicons:
 * https://github.com/ionic-team/ionicons/blob/b74a92328c5229315b9c621159f84713e178661e/src/svg/contrast-sharp.svg
 *
 * Copyright (c) 2015-present Ionic (http://ionic.io/)
 * Licensed under MIT
 */
const AppearanceIcon = () => (
  <svg
    className={styles.icon}
    xmlns="http://www.w3.org/2000/svg"
    width="20px"
    height="20px"
    viewBox="0 0 512 512"
  >
    <path d="M256 32C132.29 32 32 132.29 32 256s100.29 224 224 224 224-100.29 224-224S379.71 32 256 32zM128.72 383.28A180 180 0 01256 76v360a178.82 178.82 0 01-127.28-52.72z" />
  </svg>
);

type Props = {
  title: string;
  darkMode: boolean;
  onDarkModeChange: (darkMode: boolean) => void;
};

const Header = ({ title, darkMode, onDarkModeChange }: Props) => (
  <header className={styles.header}>
    <a className={styles.title} href="/">
      {title}
    </a>
    <button
      className={styles.button}
      type="button"
      title="Tap to change light/dark appearance"
      onClick={() => onDarkModeChange(!darkMode)}
    >
      <AppearanceIcon />
    </button>
  </header>
);

export default Header;
