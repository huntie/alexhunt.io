import type { GetStaticProps } from 'next';
import { NotionAPI } from 'notion-client';
import type { ExtendedRecordMap } from 'notion-types';
import { NotionRenderer } from 'react-notion-x';

const BIO_PAGE_ID = '3c84a17f3b1347c1ac8677d7b0037b43';

export const getStaticProps: GetStaticProps = async () => {
  const notion = new NotionAPI();

  return {
    props: {
      bio: await notion.getPage(BIO_PAGE_ID),
    },
    revalidate: 10,
  };
};

const Home = ({ bio }: { bio: ExtendedRecordMap }) => {
  return <NotionRenderer recordMap={bio} />;
};

export default Home;
