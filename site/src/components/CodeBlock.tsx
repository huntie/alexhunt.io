import classNames from 'classnames';
import { highlight, languages } from 'prismjs';
import { useCallback, useRef, useState } from 'react';
import { Copy } from 'react-feather';
import type { CustomBlockComponentProps } from 'react-notion';
import useHover from 'react-use-hover';
import useHasClipboard from '~hooks/useHasClipboard';
import useMatchMedia from '~hooks/useMatchMedia';
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

  const langClass =
    language && language !== 'plain text'
      ? `language-${language}`
      : 'language-none';

  const handleClick = useCallback(async () => {
    clearTimeout(timerRef.current);
    await window.navigator.clipboard.writeText(codeRef.current?.textContent);
    setCopied(true);
    timerRef.current = setTimeout(() => setCopied(false), 1000);
  }, []);

  const hasPointer = useMatchMedia('(pointer:fine)');
  const [hovered, hoverEvents] = useHover();
  const clickable = !hasPointer || hovered;

  return (
    <div className={classNames('notion-code-root', styles.root)}>
      <pre
        className={classNames('notion-code', styles.content, langClass)}
        {...hoverEvents}
      >
        {hasClipboard ? (
          <button
            className={classNames(
              styles.copyButton,
              clickable ? styles.copyButtonVisible : null,
            )}
            type="button"
            onClick={clickable ? handleClick : undefined}
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
