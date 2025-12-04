import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { useState, useCallback, useRef, useEffect } from 'react';

const ResizableImageComponent = ({ node, updateAttributes, selected }: NodeViewProps) => {
  const { src, alt, width } = node.attrs;
  const [isResizing, setIsResizing] = useState(false);
  const [currentWidth, setCurrentWidth] = useState<number>(width || 0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

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
