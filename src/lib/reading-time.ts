import type { JSONContent } from '@tiptap/react';

const WORDS_PER_MINUTE = 200;

/**
 * Extracts text content from Tiptap JSONContent
 */
const extractText = (content: JSONContent): string => {
  let text = '';
  
  if (content.text) {
    text += content.text + ' ';
  }
  
  if (content.content && Array.isArray(content.content)) {
    content.content.forEach((child) => {
      text += extractText(child);
    });
  }
  
  return text;
};

/**
 * Calculates reading time in minutes from Tiptap JSONContent
 */
export const calculateReadingTime = (content: JSONContent): number => {
  const text = extractText(content);
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / WORDS_PER_MINUTE);
  
  return Math.max(1, minutes); // Minimum 1 minute
};
