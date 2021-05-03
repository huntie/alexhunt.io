import Container from './Container';
import styles from './Footer.module.css';

type Props = {
  copyrightName: string;
  repositoryUrl: string;
  changelogUrl: string;
};

const Footer = ({ copyrightName, repositoryUrl, changelogUrl }: Props) => (
  <Container>
    <footer className={styles.footer}>
      <div className={styles.section}>
        <small className={styles.item}>
          &copy; {copyrightName} {new Date().getFullYear()}
        </small>
      </div>
      <div className={styles.section}>
        <small className={styles.item}>
          <a href={repositoryUrl}>Source</a>
        </small>
        <small className={styles.item}>
          <a href={changelogUrl}>Changelog</a>
        </small>
      </div>
    </footer>
  </Container>
);

export default Footer;
