import Prism from 'prismjs';
import 'prismjs/themes/prism-solarizedlight.css';
import { useEffect } from 'react';

interface ICodeBlockProps {
  language: 'html' | 'js' | 'css';
  code: string;
}

const CodeBlock = ({ language, code }: ICodeBlockProps) => {
  useEffect(() => {
    // Code highlight
    Prism.highlightAll();
  }, []);

  return (
    <pre
      style={{
        margin: '-15px 0 0 -28px',
        padding: 0,
        whiteSpace: 'pre-wrap',
      }}
    >
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
};

export default CodeBlock;
