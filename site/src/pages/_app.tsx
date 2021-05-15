import type { AppProps } from 'next/app';
import Head from 'next/head';

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

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,600;0,700;1,400&display=swap"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
