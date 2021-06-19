import type { DocumentContext } from 'next/document';
import Document, { Head, Html, Main, NextScript } from 'next/document';

class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          />
          <script src="noflash.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
