import { groupBy } from 'lodash';
import type { NotesPageMap } from '~notion/getNotesPageMapping';
import styles from './NotesList.module.css';
import UnderlineLink from './UnderlineLink';

type Props = {
  notes: NotesPageMap;
};

const NotesList = ({ notes }: Props): JSX.Element => {
  const grouped = groupBy(Object.entries(notes), ([_, { date }]) =>
    date.slice(0, 4)
  );

  return (
    <>
      {Object.keys(grouped)
        .sort()
        .reverse()
        .map(year => (
          <div key={year}>
            <h3 className={styles.heading}>{year}</h3>
            {grouped[year].map(([path, { id, title }]) => (
              <article key={id} className={styles.item}>
                <UnderlineLink label={title} href={path} />
              </article>
            ))}
          </div>
        ))}
    </>
  );
};

export default NotesList;
