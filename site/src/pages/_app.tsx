import type { AppProps } from 'next/app';
import Head from 'next/head';

// organize-imports-ignore
import '~styles/globals.css';
import 'react-notion-x/src/styles.css';
import '~notion/style-overrides.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
