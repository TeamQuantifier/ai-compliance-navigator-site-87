import { Editor } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Image as ImageIcon,
  BarChart3,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface EditorToolbarProps {
  editor: Editor;
}

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  const [linkUrl, setLinkUrl] = useState('');
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [isKpiDialogOpen, setIsKpiDialogOpen] = useState(false);
  const [kpiValue, setKpiValue] = useState('');
  const [kpiLabel, setKpiLabel] = useState('');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('stories-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('stories-images')
        .getPublicUrl(filePath);

      editor.chain().focus().setImage({ src: data.publicUrl }).run();
      toast.success('Obraz dodany');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Błąd podczas przesyłania obrazu');
    }
  };

  const setLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl('');
      setIsLinkDialogOpen(false);
    }
  };

  const addKpiBlock = () => {
    if (kpiValue && kpiLabel) {
      editor.chain().focus().setKpiBlock({ value: kpiValue, label: kpiLabel }).run();
      setKpiValue('');
      setKpiLabel('');
      setIsKpiDialogOpen(false);
    }
  };

  return (
    <div className="border-b bg-muted/50 p-2 flex flex-wrap gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'bg-muted' : ''}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'bg-muted' : ''}
      >
        <Italic className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-8" />

      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'bg-muted' : ''}
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'bg-muted' : ''}
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'bg-muted' : ''}
      >
        <Heading3 className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-8" />

      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'bg-muted' : ''}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'bg-muted' : ''}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-8" />

      <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={editor.isActive('link') ? 'bg-muted' : ''}
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dodaj link</DialogTitle>
          </DialogHeader>
          <div className="flex gap-2">
            <Input
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              onKeyDown={(e) => e.key === 'Enter' && setLink()}
            />
            <Button onClick={setLink}>Dodaj</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Button variant="ghost" size="sm" asChild>
        <label htmlFor="image-upload" className="cursor-pointer">
          <ImageIcon className="h-4 w-4" />
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </Button>

      <Separator orientation="vertical" className="h-8" />

      <Dialog open={isKpiDialogOpen} onOpenChange={setIsKpiDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm">
            <BarChart3 className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dodaj blok KPI</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Input
              value={kpiValue}
              onChange={(e) => setKpiValue(e.target.value)}
              placeholder="Wartość KPI (np. 50%)"
            />
            <Input
              value={kpiLabel}
              onChange={(e) => setKpiLabel(e.target.value)}
              placeholder="Opis KPI (np. Redukcja czasu)"
            />
            <Button onClick={addKpiBlock}>Dodaj KPI</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditorToolbar;
