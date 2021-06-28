import type { ReactNode } from 'react';
import Container from './Container';
import styles from './Hero.module.css';

type Props = {
  children: ReactNode;
};

const Hero = ({ children }: Props): JSX.Element => (
  <div className={styles.hero}>
    <Container>{children}</Container>
  </div>
);

export default Hero;
