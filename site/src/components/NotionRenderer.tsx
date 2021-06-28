import type { ComponentProps } from 'react';
import { NotionRenderer as BaseNotionRenderer } from 'react-notion';
import CodeBlock from './CodeBlock';

const mapImageUrl = (url: string) => {
  const imagePath = url.split('amazonaws.com/secure.notion-static.com/')[1];

  return `/static/${imagePath.substring(0, 36)}.${imagePath.split('.')[1]}`;
};

const NotionRenderer = ({
  customBlockComponents,
  ...props
}: ComponentProps<typeof BaseNotionRenderer>): JSX.Element => (
  <BaseNotionRenderer
    {...props}
    mapImageUrl={mapImageUrl}
    customBlockComponents={{
      ...customBlockComponents,
      code: CodeBlock,
    }}
  />
);

export default NotionRenderer;
