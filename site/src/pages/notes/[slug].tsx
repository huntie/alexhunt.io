import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { NotionAPI } from 'notion-client';
import type { BlockMapType } from 'react-notion';
import { NotionRenderer } from 'react-notion';
import Layout from '~components/Layout';
import getNotesPageMapping from '~notion/getNotesPageMapping';

type Props = {
  title: string;
  blockMap: BlockMapType;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getNotesPageMapping();

  return {
    paths: Object.keys(pages),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async context => {
  const { slug } = context.params;
  const notion = new NotionAPI();

  const pages = await getNotesPageMapping();
  const { id, title } = pages['/notes/' + slug];

  return {
    props: {
      title,
      blockMap: (await notion.getPage(id)).block as BlockMapType,
    },
    revalidate: 10,
  };
};

const NotePage = ({ title, blockMap }: Props) => (
  <>
    <Head>
      <title>{title} | Alex Hunt</title>
    </Head>
    <Layout>
      <NotionRenderer blockMap={blockMap} />
    </Layout>
  </>
);

export default NotePage;
