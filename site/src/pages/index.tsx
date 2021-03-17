import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { NotionAPI } from 'notion-client';
import type { ExtendedRecordMap } from 'notion-types';
import { NotionRenderer } from 'react-notion-x';
import Layout from '~components/Layout';

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

type Props = {
  bio: ExtendedRecordMap;
};

const Home = ({ bio }: Props) => (
  <>
    <Head>
      <title>Alex Hunt – Software developer &amp; occasional writer</title>
    </Head>
    <Layout>
      <NotionRenderer recordMap={bio} />
    </Layout>
  </>
);

export default Home;
