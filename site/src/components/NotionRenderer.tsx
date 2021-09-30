import { ComponentProps, useCallback } from 'react';
import { NotionRenderer as BaseNotionRenderer } from 'react-notion';
import CodeBlock from './CodeBlock';

type Props = ComponentProps<typeof BaseNotionRenderer> & {
  absolutePaths?: boolean;
};

const NotionRenderer = ({
  customBlockComponents,
  absolutePaths = false,
  ...props
}: Props): JSX.Element => {
  const mapImageUrl = useCallback(
    (url: string) => {
      const imgPath = url.split('amazonaws.com/secure.notion-static.com/')[1];
      const fileName = `${imgPath.substring(0, 36)}.${imgPath.split('.')[1]}`;
      const siteUrl = absolutePaths ? process.env.NEXT_PUBLIC_SITE_URL : '';

      return `${siteUrl}/static/${fileName}`;
    },
    [absolutePaths]
  );

  return (
    <BaseNotionRenderer
      {...props}
      mapImageUrl={mapImageUrl}
      customBlockComponents={{
        ...customBlockComponents,
        code: CodeBlock,
      }}
    />
  );
};

export default NotionRenderer;
