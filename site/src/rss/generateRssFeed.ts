import { parseISO } from 'date-fns';
import { Feed } from 'feed';
import { promises as fs } from 'fs';
import path from 'path';
import { BlockMapType } from 'react-notion';
import getNotesPageMapping from '~notion/getNotesPageMapping';
import getPage from '~notion/getPage';
import renderRssPreview from './renderRssPreview';

const OUTPUT_DIR = path.join(process.cwd(), 'public/rss');
const MAX_FEED_ITEMS = 20;

const generateRssFeed = async (): Promise<void> => {
  const {
    NEXT_PUBLIC_SITE_NAME: SITE_NAME,
    NEXT_PUBLIC_SITE_URL: SITE_URL,
    NEXT_PUBLIC_TWITTER_URL: TWITTER_URL,
  } = process.env;

  if (process.env.NODE_ENV === 'development') {
    return;
  }

  const date = new Date();
  const author = {
    name: 'Alex Hunt',
    email: 'hello@alexhunt.io',
    link: TWITTER_URL,
  };

  const feed = new Feed({
    title: `Notes | ${SITE_NAME}`,
    description: 'Posts on web development and productivity',
    id: SITE_URL,
    link: SITE_URL,
    favicon: SITE_URL + '/favicon.ico',
    copyright: `Copyright Alex Hunt ${new Date().getFullYear()}`,
    updated: date,
    generator: 'Next.js using Feed for Node.js',
    feedLinks: {
      rss2: SITE_URL + '/rss/feed.xml',
      json: SITE_URL + '/rss/feed.json',
      atom: SITE_URL + '/rss/atom.xml',
    },
    author,
  });

  const notes = await getNotesPageMapping();
  const notesItems = await Promise.all(
    Object.entries(notes)
      .slice(0, MAX_FEED_ITEMS)
      .map(async ([path, data]) => {
        const url = SITE_URL + path;
        const blockMap = (await getPage(data.id)).block as BlockMapType;

        return {
          title: data.title,
          id: url,
          link: url,
          description: data.summary,
          content: renderRssPreview(blockMap, url),
          author: [author],
          contributor: [author],
          date: parseISO(data.date),
        };
      })
  );
  notesItems.forEach(feed.addItem);

  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await Promise.all([
    fs.writeFile(path.join(OUTPUT_DIR, 'feed.xml'), feed.rss2()),
    fs.writeFile(path.join(OUTPUT_DIR, 'atom.xml'), feed.atom1()),
    fs.writeFile(path.join(OUTPUT_DIR, 'feed.json'), feed.json1()),
  ]);
};

export default generateRssFeed;
