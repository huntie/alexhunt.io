import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { NotionAPI } from 'notion-client';
import type { ExtendedRecordMap } from 'notion-types';
import { NotionRenderer } from 'react-notion-x';
import Layout from '~components/Layout';
import getNotesPageMapping from '~notion/getNotesPageMapping';

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getNotesPageMapping();

  return {
    paths: Object.keys(pages),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params;
  const notion = new NotionAPI();

  const pages = await getNotesPageMapping();
  const { id, title } = pages['/notes/' + slug];

  return {
    props: {
      title,
      recordMap: await notion.getPage(id),
    },
    revalidate: 10,
  };
};

type Props = {
  title: string;
  recordMap: ExtendedRecordMap;
};

const NotePage = ({ title, recordMap }: Props) => (
  <>
    <Head>
      <title>{title} | Alex Hunt</title>
    </Head>
    <Layout>
      <NotionRenderer recordMap={recordMap} />
    </Layout>
  </>
);

export default NotePage;
