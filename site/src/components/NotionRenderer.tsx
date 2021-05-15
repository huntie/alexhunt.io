import type { ComponentProps } from 'react';
import { NotionRenderer as BaseNotionRenderer } from 'react-notion';

const mapImageUrl = (url: string) => {
  const imagePath = url.split('amazonaws.com/secure.notion-static.com/')[1];

  return `/static/${imagePath.substring(0, 36)}.${imagePath.split('.')[1]}`;
};

const NotionRenderer = (props: ComponentProps<typeof BaseNotionRenderer>) => (
  <BaseNotionRenderer {...props} mapImageUrl={mapImageUrl} />
);

export default NotionRenderer;
