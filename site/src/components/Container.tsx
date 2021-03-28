import type { ReactNode } from 'react';
import styles from './Container.module.css';

type Props = {
  children: ReactNode;
};

/**
 * A layout container that horizontally bounds content within a page.
 */
const Container = ({ children }: Props) => (
  <div className={styles.container}>{children}</div>
);

export default Container;
