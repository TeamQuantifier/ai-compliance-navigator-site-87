import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { useState, useCallback, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, ImageIcon } from 'lucide-react';

const ResizableImageComponent = ({ node, updateAttributes, selected }: NodeViewProps) => {
  const { src, alt, width } = node.attrs;
  const [isResizing, setIsResizing] = useState(false);
  const [currentWidth, setCurrentWidth] = useState<number>(width || 0);
  const [isEditingAlt, setIsEditingAlt] = useState(false);
  const [altText, setAltText] = useState(alt || '');
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  // Sync altText with node.attrs.alt when it changes externally
  useEffect(() => {
    setAltText(alt || '');
  }, [alt]);

  const handleMouseDown = useCallback((e: React.MouseEvent, direction: 'left' | 'right') => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsResizing(true);
    startXRef.current = e.clientX;
    startWidthRef.current = currentWidth || containerRef.current?.offsetWidth || 300;
  }, [currentWidth]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return;
    
    const containerWidth = containerRef.current?.parentElement?.offsetWidth || 800;
    const delta = e.clientX - startXRef.current;
    const newWidth = Math.max(100, Math.min(containerWidth, startWidthRef.current + delta));
    
    setCurrentWidth(newWidth);
  }, [isResizing]);

  const handleMouseUp = useCallback(() => {
    if (isResizing) {
      setIsResizing(false);
      updateAttributes({ width: currentWidth });
    }
  }, [isResizing, currentWidth, updateAttributes]);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  const handleAltSave = () => {
    updateAttributes({ alt: altText });
    setIsEditingAlt(false);
  };

  const handleAltKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAltSave();
    } else if (e.key === 'Escape') {
      setAltText(alt || '');
      setIsEditingAlt(false);
    }
  };

  const imageStyle = currentWidth ? { width: `${currentWidth}px` } : {};

  return (
    <NodeViewWrapper className="resizable-image-wrapper">
      <div
        ref={containerRef}
        className={`resizable-image-container ${selected ? 'selected' : ''} ${isResizing ? 'resizing' : ''}`}
        style={imageStyle}
      >
        <img
          src={src}
          alt={alt || ''}
          className="resizable-image"
          draggable={false}
        />
        
        {selected && (
          <>
            <div
              className="resize-handle resize-handle-left"
              onMouseDown={(e) => handleMouseDown(e, 'left')}
            />
            <div
              className="resize-handle resize-handle-right"
              onMouseDown={(e) => handleMouseDown(e, 'right')}
            />
            
            {/* Alt text editor */}
            <div className="alt-text-editor">
              {isEditingAlt ? (
                <div className="flex gap-1 items-center">
                  <Input
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    onKeyDown={handleAltKeyDown}
                    placeholder="Tekst alternatywny (SEO)"
                    className="h-7 text-xs flex-1"
                    autoFocus
                  />
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={handleAltSave}>
                    <Check className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditingAlt(true)}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors w-full text-left"
                >
                  <ImageIcon className="h-3 w-3" />
                  {alt ? (
                    <span className="truncate">Alt: "{alt}"</span>
                  ) : (
                    <span className="text-destructive">+ Dodaj alt text (SEO)</span>
                  )}
                </button>
              )}
            </div>
          </>
        )}
        
        {isResizing && (
          <div className="resize-indicator">
            {Math.round(currentWidth)}px
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
};

export default ResizableImageComponent;
