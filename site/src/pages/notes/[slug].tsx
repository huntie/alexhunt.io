import type { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import type { BlockMapType } from 'react-notion';
import ArticleHeader from '~components/ArticleHeader';
import Container from '~components/Container';
import Layout from '~components/Layout';
import NotionRenderer from '~components/NotionRenderer';
import UnderlineLink from '~components/UnderlineLink';
import getNotesPageMapping from '~notion/getNotesPageMapping';
import getPage from '~notion/getPage';

type Props = {
  title: string;
  summary: string;
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

  const pages = await getNotesPageMapping();
  const { id, title, summary, date } = pages['/notes/' + slug];

  return {
    props: {
      title,
      summary,
      date,
      blockMap: (await getPage(id)).block as BlockMapType,
    },
    revalidate: 10,
  };
};

const NotePage = ({ title, summary, date, blockMap }: Props): JSX.Element => (
  <>
    <NextSeo
      title={title}
      openGraph={{
        type: 'article',
        title,
        description: summary,
        article: {
          section: 'Notes',
          publishedTime: date,
        },
      }}
    />
    <Layout>
      <article>
        <Container>
          <ArticleHeader title={title} date={date} />
          <NotionRenderer blockMap={blockMap} />
          <UnderlineLink label="Back to Home" href="/" />
        </Container>
      </article>
    </Layout>
  </>
);

export default NotePage;
