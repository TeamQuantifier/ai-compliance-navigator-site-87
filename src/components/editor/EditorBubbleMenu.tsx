import { Editor } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Bold, Italic, Underline as UnderlineIcon,
  Heading1, Heading2, Heading3,
  List, ListOrdered, Link as LinkIcon, Unlink,
} from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Popover, PopoverContent, PopoverTrigger,
} from '@/components/ui/popover';

interface Props {
  editor: Editor;
}

const btn = (active: boolean) =>
  `h-8 w-8 p-0 ${active ? 'bg-accent text-accent-foreground' : ''}`;

const EditorBubbleMenu = ({ editor }: Props) => {
  const [linkUrl, setLinkUrl] = useState('');
  const [linkOpen, setLinkOpen] = useState(false);

  const applyLink = () => {
    if (linkUrl) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
    }
    setLinkUrl('');
    setLinkOpen(false);
  };

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100, placement: 'top' }}
      shouldShow={({ editor, state }) => {
        const { from, to } = state.selection;
        // Show only when there's a non-empty text selection (not in tables/images/KPI blocks)
        if (from === to) return false;
        if (editor.isActive('image') || editor.isActive('kpiBlock')) return false;
        return editor.isEditable;
      }}
    >
      <div className="flex items-center gap-0.5 rounded-md border bg-popover p-1 shadow-md">
        <Button variant="ghost" size="sm" className={btn(editor.isActive('bold'))}
          onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className={btn(editor.isActive('italic'))}
          onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className={btn(editor.isActive('underline'))}
          onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <Button variant="ghost" size="sm" className={btn(editor.isActive('heading', { level: 1 }))}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className={btn(editor.isActive('heading', { level: 2 }))}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className={btn(editor.isActive('heading', { level: 3 }))}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <Heading3 className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <Button variant="ghost" size="sm" className={btn(editor.isActive('bulletList'))}
          onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className={btn(editor.isActive('orderedList'))}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6 mx-1" />

        <Popover open={linkOpen} onOpenChange={(o) => {
          setLinkOpen(o);
          if (o) setLinkUrl(editor.getAttributes('link').href || '');
        }}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className={btn(editor.isActive('link'))}>
              <LinkIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-2" side="top">
            <div className="flex gap-2">
              <Input
                autoFocus
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://..."
                onKeyDown={(e) => e.key === 'Enter' && applyLink()}
              />
              <Button size="sm" onClick={applyLink}>OK</Button>
            </div>
          </PopoverContent>
        </Popover>

        {editor.isActive('link') && (
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0"
            onClick={() => editor.chain().focus().unsetLink().run()}>
            <Unlink className="h-4 w-4" />
          </Button>
        )}
      </div>
    </BubbleMenu>
  );
};

export default EditorBubbleMenu;
