import { useEditor, EditorContent } from '@tiptap/react';
import { useEffect, useState, useRef } from 'react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table';
import { TableCell } from '@tiptap/extension-table';
import { TableHeader } from '@tiptap/extension-table';
import { KpiBlock } from './KpiBlockExtension';
import { ResizableImage } from './ResizableImageExtension';
import EditorToolbar from './EditorToolbar';
import './editor-styles.css';

interface RichTextEditorProps {
  content: any;
  onChange: (content: any) => void;
  placeholder?: string;
}

const RichTextEditor = ({ content, onChange, placeholder = 'Zacznij pisać...' }: RichTextEditorProps) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const initialContentRef = useRef(content);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      ResizableImage.configure({
        inline: false,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline cursor-pointer',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      Underline,
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'editor-table',
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
      KpiBlock,
    ],
    content: '',
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[400px] p-4',
      },
    },
  });

  // Set content only once after editor is ready and content is loaded
  useEffect(() => {
    if (editor && !isInitialized) {
      // Check if content is non-empty
      const hasContent = content && 
        typeof content === 'object' && 
        Object.keys(content).length > 0 &&
        (content.content?.length > 0 || content.type);
      
      if (hasContent) {
        editor.commands.setContent(content);
        setIsInitialized(true);
      } else if (content === null || content === undefined || 
                (typeof content === 'object' && Object.keys(content).length === 0)) {
        // Empty content is also valid initial state for new posts
        setIsInitialized(true);
      }
    }
  }, [content, editor, isInitialized]);

  // Update initial content ref if content changes externally (e.g., loading from DB)
  useEffect(() => {
    if (!isInitialized) {
      initialContentRef.current = content;
    }
  }, [content, isInitialized]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;