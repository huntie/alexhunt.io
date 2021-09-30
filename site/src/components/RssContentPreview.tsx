import { mapValues } from 'lodash/fp';
import React from 'react';
import { BlockMapType, BlockType } from 'react-notion';
import NotionRenderer from '~components/NotionRenderer';

const getPagePreview = mapValues<BlockType, BlockType>(block =>
  block.value.type === 'page'
    ? {
        ...block,
        value: {
          ...block.value,
          content: block.value.content.slice(0, 3),
        },
      }
    : block
);

type Props = {
  blockMap: BlockMapType;
  pageUrl: string;
};

/**
 * Render a fragment containing the first three blocks of Notion content and a
 * "Continue reading" link for use in feeds.
 */
const RssContentPreview = ({ blockMap, pageUrl }: Props): JSX.Element => (
  <>
    <NotionRenderer blockMap={getPagePreview(blockMap)} absolutePaths />
    <a href={pageUrl} target="_blank" rel="noreferrer">
      Continue reading &hellip;
    </a>
  </>
);

export default RssContentPreview;
