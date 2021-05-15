import type { AppProps } from 'next/app';

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
  return <Component {...pageProps} />;
};

export default App;
