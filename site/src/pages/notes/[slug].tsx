import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { NotionAPI } from 'notion-client';
import type { BlockMapType } from 'react-notion';
import { NotionRenderer } from 'react-notion';
import ArticleHeader from '~components/ArticleHeader';
import Container from '~components/Container';
import Layout from '~components/Layout';
import getNotesPageMapping from '~notion/getNotesPageMapping';

type Props = {
  title: string;
  date: string;
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
  const { id, title, date } = pages['/notes/' + slug];

  return {
    props: {
      title,
      date,
      blockMap: (await notion.getPage(id)).block as BlockMapType,
    },
    revalidate: 10,
  };
};

const NotePage = ({ title, date, blockMap }: Props) => (
  <>
    <Head>
      <title>{title} | Alex Hunt</title>
    </Head>
    <Layout>
      <article>
        <Container>
          <ArticleHeader title={title} date={date} />
          <NotionRenderer blockMap={blockMap} />
          <a href="/">Back to Notes</a>
        </Container>
      </article>
    </Layout>
  </>
);

export default NotePage;
