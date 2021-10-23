import fs from 'fs';
import https from 'https';
import invariant from 'invariant';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import type { BlockMapType } from 'react-notion';
import { defaultMapImageUrl, NotionRenderer } from 'react-notion';

const STATIC_DIR = path.join(process.cwd(), 'public/static');

const getLocalFileName = (url: string) => {
  const imagePath = url.split('amazonaws.com/secure.notion-static.com/')[1];

  invariant(
    typeof imagePath === 'string',
    'Image URL did not match expected format',
  );

  return imagePath.substring(0, 36) + path.extname(imagePath);
};

const downloadImage = async (url: string, localPath: string) => {
  await new Promise((resolve, reject) => {
    const file = fs.createWriteStream(localPath);

    https.get(url, response => {
      return response.pipe(file).on('finish', resolve).on('error', reject);
    });
  });
};

/**
 * Fetch and store all image files locally on this server/CDN for each Notion
 * image block.
 */
const fetchAndCacheImages = async (blockMap: BlockMapType) => {
  const existingImages = new Set(await fs.promises.readdir(STATIC_DIR));
  const imagesToFetch: string[] = [];
  const downloadUrls: string[] = [];

  ReactDOMServer.renderToString(
    React.createElement(NotionRenderer, {
      blockMap,
      mapImageUrl: (url, block) => {
        imagesToFetch.push(url);
        downloadUrls.push(defaultMapImageUrl(url, block));
        return '';
      },
    }),
  );

  await Promise.all(
    imagesToFetch.map((url, i) => {
      const fileName = getLocalFileName(url);

      return !existingImages.has(fileName)
        ? downloadImage(downloadUrls[i], path.join(STATIC_DIR, fileName))
        : Promise.resolve();
    }),
  );
};

export default fetchAndCacheImages;
