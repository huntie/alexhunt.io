import type { ReactNode } from 'react';
import styles from './UnderlineLink.module.css';

type Props = {
  label: ReactNode;
  href: string;
};

/**
 * A stylised primary link element.
 */
const UnderlineLink = ({ label, href }: Props): JSX.Element => (
  <a className={styles.link} href={href}>
    {label}
  </a>
);

export default UnderlineLink;
