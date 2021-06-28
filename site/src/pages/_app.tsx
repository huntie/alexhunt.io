import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';

// organize-imports-ignore
import '~styles/theme.css';
import '~styles/globals.css';
import 'react-notion/src/styles.css';
import '~styles/notion.css';
import '~styles/prism-gruvbox-dark.css';

// organize-imports-ignore
import 'prismjs';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-typescript';

const App = ({ Component, pageProps, router }: AppProps): JSX.Element => {
  const canonicalUrl = process.env.SITE_URL + router.asPath;

  return (
    <>
      <DefaultSeo
        titleTemplate={`%s | ${process.env.SITE_NAME}`}
        canonical={canonicalUrl}
        openGraph={{
          type: 'website',
          url: canonicalUrl,
          site_name: process.env.SITE_NAME,
          locale: router.locale,
          profile: {
            firstName: 'Alex',
            lastName: 'Hunt',
          },
        }}
        twitter={{
          handle: process.env.TWITTER_HANDLE,
          cardType: 'summary',
        }}
      />
      <Component {...pageProps} />
    </>
  );
};

export default App;
