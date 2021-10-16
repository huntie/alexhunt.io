import flatCache from 'flat-cache';
import invariant from 'invariant';
import { NotionAPI } from 'notion-client';
import getPageProperties from './getPageProperties';

const NOTES_COLLECTION_ID = '5beb2c5f-74e4-463c-8cf5-b08b5d3a02aa';
const NOTES_DATE_DESC_VIEW_ID = '3e0c5db2-e077-4479-81b7-ac99e25e29e1';

export type NotesPageMap = {
  [path: string]: {
    id: string;
    title: string;
    summary: string;
    date: string;
  };
};

/**
 * Get the mapping of complete site paths to page metadata for all published
 * pages in the 'Notes' collection. On first run, results are persisted in the
 * `.cache` directory unless `clearCache` is set.
 */
const getNotesPageMapping = async (
  clearCache = false
): Promise<NotesPageMap> => {
  if (clearCache) {
    flatCache.clearAll();
  }

  const cache = flatCache.load('notes', '.cache');

  if (Object.keys(cache.all()).length === 0) {
    const notion = new NotionAPI();
    const collection = await notion.getCollectionData(
      NOTES_COLLECTION_ID,
      NOTES_DATE_DESC_VIEW_ID
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    for (const id of collection.result.reducerResults.collection_group_results
      .blockIds) {
      const {
        Name: title,
        Summary: summary,
        Slug: slug,
        Published: published,
        Date: date,
      } = getPageProperties(collection, id);

      if (!published) {
        continue;
      }

      invariant(
        typeof summary === 'string',
        'Expected page to have a Summary property'
      );
      invariant(
        typeof slug === 'string',
        'Expected page to have a Slug property'
      );
      invariant(
        typeof date === 'string',
        'Expected page to have a Date property'
      );

      cache.setKey('/notes/' + slug, { id, title, summary, date });
    }

    cache.save();
  }

  return cache.all();
};

export default getNotesPageMapping;
