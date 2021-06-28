import { format, formatRFC3339, parseISO } from 'date-fns';
import styles from './ArticleHeader.module.css';

type Props = {
  title: string;
  date: string;
};

const ArticleHeader = ({ title, date }: Props): JSX.Element => (
  <div className={styles.root}>
    <h1 className={styles.title}>{title}</h1>
    <div className={styles.meta}>
      <time className={styles.date} dateTime={formatRFC3339(parseISO(date))}>
        {format(parseISO(date), 'd MMMM Y')}
      </time>
    </div>
  </div>
);

export default ArticleHeader;
