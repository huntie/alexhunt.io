import type { GetStaticProps } from 'next';
import Head from 'next/head';
import type { BlockMapType } from 'react-notion';
import { NotionRenderer } from 'react-notion';
import Container from '~components/Container';
import Hero from '~components/Hero';
import Layout from '~components/Layout';
import NotesList from '~components/NotesList';
import type { NotesPageMap } from '~notion/getNotesPageMapping';
import getNotesPageMapping from '~notion/getNotesPageMapping';
import getPage from '~notion/getPage';

const BIO_PAGE_ID = '3c84a17f3b1347c1ac8677d7b0037b43';

type Props = {
  bio: BlockMapType;
  notes: NotesPageMap;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      bio: (await getPage(BIO_PAGE_ID)).block as BlockMapType,
      notes: await getNotesPageMapping(),
    },
    revalidate: 10,
  };
};

const Home = ({ bio, notes }: Props) => (
  <>
    <Head>
      <title>Alex Hunt – Software developer &amp; occasional writer</title>
    </Head>
    <Layout>
      <Hero>
        <NotionRenderer blockMap={bio} />
      </Hero>
      <section>
        <Container>
          <NotesList notes={notes} />
        </Container>
      </section>
    </Layout>
  </>
);

export default Home;
