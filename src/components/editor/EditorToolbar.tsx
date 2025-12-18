import { Editor } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Link as LinkIcon,
  Image as ImageIcon,
  BarChart3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useState, useId, useRef } from 'react';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface EditorToolbarProps {
  editor: Editor;
}

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  const [linkUrl, setLinkUrl] = useState('');
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [isKpiDialogOpen, setIsKpiDialogOpen] = useState(false);
  const [kpiValue, setKpiValue] = useState('');
  const [kpiLabel, setKpiLabel] = useState('');
  const imageInputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Walidacja typu pliku
    if (!file.type.startsWith('image/')) {
      toast.error('Wybrany plik nie jest obrazem');
      return;
    }

    // Walidacja rozmiaru (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Obraz jest zbyt duży (maksymalnie 5MB)');
      return;
    }

    const loadingToast = toast.loading('Przesyłanie obrazu...');

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('stories-images')
        .upload(fileName, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('stories-images')
        .getPublicUrl(fileName);

      // Generate alt text from filename
      const altFromFilename = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      editor.chain().focus().setImage({ src: data.publicUrl, alt: altFromFilename }).run();
      toast.success('Obraz dodany pomyślnie', { id: loadingToast });
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error(error.message || 'Błąd podczas przesyłania obrazu', { id: loadingToast });
    } finally {
      // Reset inputa, żeby można było wybrać ten sam plik ponownie
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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
      {/* Text formatting */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'bg-muted' : ''}
          >
            <Bold className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Pogrubienie</TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'bg-muted' : ''}
          >
            <Italic className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Kursywa</TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive('underline') ? 'bg-muted' : ''}
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Podkreślenie</TooltipContent>
      </Tooltip>

      <Separator orientation="vertical" className="h-8" />

      {/* Headings */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'bg-muted' : ''}
          >
            <Heading1 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Nagłówek H1</TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'bg-muted' : ''}
          >
            <Heading2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Nagłówek H2</TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'bg-muted' : ''}
          >
            <Heading3 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Nagłówek H3</TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            className={editor.isActive('heading', { level: 4 }) ? 'bg-muted' : ''}
          >
            <Heading4 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Nagłówek H4</TooltipContent>
      </Tooltip>

      <Separator orientation="vertical" className="h-8" />

      {/* Text alignment */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={editor.isActive({ textAlign: 'left' }) ? 'bg-muted' : ''}
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Wyrównaj do lewej</TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={editor.isActive({ textAlign: 'center' }) ? 'bg-muted' : ''}
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Wyrównaj do środka</TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={editor.isActive({ textAlign: 'right' }) ? 'bg-muted' : ''}
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Wyrównaj do prawej</TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={editor.isActive({ textAlign: 'justify' }) ? 'bg-muted' : ''}
          >
            <AlignJustify className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Wyjustuj</TooltipContent>
      </Tooltip>

      <Separator orientation="vertical" className="h-8" />

      {/* Lists */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'bg-muted' : ''}
          >
            <List className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Lista punktowana</TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'bg-muted' : ''}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Lista numerowana</TooltipContent>
      </Tooltip>

      <Separator orientation="vertical" className="h-8" />

      {/* Link */}
      <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={editor.isActive('link') ? 'bg-muted' : ''}
              >
                <LinkIcon className="h-4 w-4" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>Dodaj link</TooltipContent>
        </Tooltip>
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

      {/* Image */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm" asChild>
            <label htmlFor={imageInputId} className="cursor-pointer">
              <ImageIcon className="h-4 w-4" />
              <input
                ref={fileInputRef}
                id={imageInputId}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Dodaj obraz (max 5MB)</p>
        </TooltipContent>
      </Tooltip>

      <Separator orientation="vertical" className="h-8" />

      {/* KPI Block */}
      <Dialog open={isKpiDialogOpen} onOpenChange={setIsKpiDialogOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <BarChart3 className="h-4 w-4" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>Dodaj blok KPI</TooltipContent>
        </Tooltip>
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
