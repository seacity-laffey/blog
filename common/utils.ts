import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

/**
 * @function getHtmlText
 * @description get html text from markdown
 * @param {string} content
 * @returns {Object}
 */

export const getHtmlText = (content: string, intercept: boolean = false, len: number = 300) => {
  const regex = /```[\s\S]*?```/;
  const match: RegExpExecArray | null = regex.exec(content);
  const matchIndex = match && match.index > len ? match.index : len;
  const processedContent = intercept && content.length > matchIndex ? content.slice(0, matchIndex) : content;
  const processor = unified().use(remarkParse).use(remark2rehype, { allowDangerousHtml: true }).use(rehypeRaw).use(rehypeHighlight).use(rehypeStringify);
  const text = processor.processSync(processedContent).toString();

  return { text, isReadMore: intercept && content.length > matchIndex };
};
