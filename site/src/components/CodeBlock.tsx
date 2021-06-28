import classNames from 'classnames';
import { highlight, languages } from 'prismjs';
import { useCallback, useRef, useState } from 'react';
import { Copy } from 'react-feather';
import type { CustomBlockComponentProps } from 'react-notion';
import useHasClipboard from '~hooks/useHasClipboard';
import styles from './CodeBlock.module.css';

const languageOverrides = {
  javascript: 'jsx',
};

type Props = {
  code: string;
  language?: string;
};

const Code = ({ code, language }: Props): JSX.Element => {
  const hasClipboard = useHasClipboard();
  const codeRef = useRef<HTMLElement>();
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  const langClass = language ? `language-${language}` : undefined;

  const handleClick = useCallback(async () => {
    clearTimeout(timerRef.current);
    await window.navigator.clipboard.writeText(codeRef.current?.textContent);
    setCopied(true);
    timerRef.current = setTimeout(() => setCopied(false), 1000);
  }, []);

  return (
    <div className={classNames('notion-code-root', styles.root)}>
      <pre className={classNames('notion-code', styles.content, langClass)}>
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
            __html:
              language in languages
                ? highlight(code, languages[language], language)
                : code,
          }}
        />
      </pre>
    </div>
  );
};

const CodeBlock = ({
  blockValue,
}: CustomBlockComponentProps<'code'>): JSX.Element => {
  if (blockValue.properties.title) {
    const content = blockValue.properties.title[0][0];
    const language = blockValue.properties.language[0][0]?.toLowerCase();

    return (
      <Code
        key={blockValue.id}
        language={languageOverrides[language] ?? language}
        code={content}
      />
    );
  }

  return null;
};

export default CodeBlock;
