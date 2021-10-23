import invariant from 'invariant';
import type { CollectionInstance } from 'notion-types';

type BasePageProps = {
  Name: string;
  [key: string]: unknown;
};

/**
 * Get the parsed properties for a page within a collection response. Handles a
 * minimal subset of Notion property types.
 */
const getPageProperties = (
  collection: CollectionInstance,
  pageId: string,
): BasePageProps => {
  const collectionId = Object.keys(collection.recordMap.collection)[0];
  const schema = collection.recordMap.collection[collectionId].value.schema;

  const page = collection.recordMap.block[pageId];
  const props: { [key: string]: unknown } = {};

  for (const [key, prop] of Object.entries(page.value.properties)) {
    const { type, name } = schema[key];
    const value = prop[0];

    switch (type) {
      case 'checkbox':
        props[name] = value[0] === 'Yes';
        break;
      case 'date':
        props[name] = value[1][0][1].start_date;
        break;
      default:
        if (typeof value[0] === 'string') {
          props[name] = value[0];
        }
        break;
    }
  }

  invariant(
    typeof props.Name === 'string',
    'Expected page to have a Name property',
  );

  return props as BasePageProps;
};

export default getPageProperties;
