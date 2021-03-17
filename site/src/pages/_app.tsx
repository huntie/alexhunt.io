import type { AppProps } from 'next/app';

// organize-imports-ignore
import '~styles/globals.css';
import 'react-notion-x/src/styles.css';
import '~notion/style-overrides.css';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
