import invariant from 'invariant';
import nextConfig from 'next.config';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { BlockMapType } from 'react-notion';
import RssContentPreview from '~components/RssContentPreview';

const { i18n } = nextConfig;

const renderRssPreview = (blockMap: BlockMapType, pageUrl: string): string => {
  invariant(
    i18n?.defaultLocale,
    'i18n.defaultLocale must be set in next.config.js'
  );

  return ReactDOMServer.renderToStaticMarkup(
    <html lang={i18n.defaultLocale}>
      <body>
        <RssContentPreview blockMap={blockMap} pageUrl={pageUrl} />
      </body>
    </html>
  );
};

export default renderRssPreview;
