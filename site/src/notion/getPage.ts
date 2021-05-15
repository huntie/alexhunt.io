import { NotionAPI } from 'notion-client';
import type { BlockMapType } from 'react-notion';
import fetchAndCacheImages from './fetchAndCacheImages';

/**
 * Fetch a Notion page object along with any referenced assets.
 */
const getPage = async (id: string) => {
  const notion = new NotionAPI();
  const page = await notion.getPage(id);

  await fetchAndCacheImages(page.block as BlockMapType);

  return page;
};

export default getPage;
