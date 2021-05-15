import classNames from 'classnames';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-jsx';
import { useCallback, useRef, useState } from 'react';
import { Copy } from 'react-feather';
import type { CustomBlockComponentProps } from 'react-notion';
import useHasClipboard from '~hooks/useHasClipboard';
import styles from './CodeBlock.module.css';

type Props = {
  code: string;
  language: string;
};

const Code = ({ code, language }: Props) => {
  const hasClipboard = useHasClipboard();
  const codeRef = useRef<HTMLElement>();
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  const prismLanguage =
    languages[language.toLowerCase()] || languages.javascript;
  const langClass = `language-${language.toLowerCase()}`;

  const handleClick = useCallback(async () => {
    clearTimeout(timerRef.current);
    await window.navigator.clipboard.writeText(codeRef.current?.textContent);
    setCopied(true);
    timerRef.current = setTimeout(() => setCopied(false), 1000);
  }, []);

  return (
    <div className={classNames('notion-code-root', styles.root)}>
      <pre className={classNames('notion-code', styles.pre, langClass)}>
        {hasClipboard ? (
          <button
            className={styles.copyButton}
            type="button"
            onClick={handleClick}
          >
            <Copy className={styles.copyIcon} />
            {copied ? 'Done!' : 'Copy'}
          </button>
        ) : null}
        <code
          ref={codeRef}
          className={langClass}
          dangerouslySetInnerHTML={{
            __html: highlight(code, prismLanguage, language),
          }}
        />
      </pre>
    </div>
  );
};

const CodeBlock = ({ blockValue }: CustomBlockComponentProps<'code'>) => {
  if (blockValue.properties.title) {
    const content = blockValue.properties.title[0][0];
    const language = blockValue.properties.language[0][0];

    return (
      <Code key={blockValue.id} language={language ?? ''} code={content} />
    );
  }

  return null;
};

export default CodeBlock;
