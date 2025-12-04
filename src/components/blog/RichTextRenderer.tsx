import type { JSONContent } from '@tiptap/react';
import { Card } from '@/components/ui/card';

interface RichTextRendererProps {
  content: JSONContent;
  className?: string;
}

const RichTextRenderer = ({ content, className = '' }: RichTextRendererProps) => {
  const renderNode = (node: JSONContent, index: number): React.ReactNode => {
    if (!node.type) return null;

    switch (node.type) {
      case 'paragraph':
        return (
          <p key={index} className="mb-4 text-foreground leading-relaxed">
            {node.content?.map((child, i) => renderNode(child, i))}
          </p>
        );

      case 'heading':
        const level = node.attrs?.level || 1;
        const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
        const headingClasses = {
          1: 'text-4xl font-bold mb-6 mt-8 text-foreground',
          2: 'text-3xl font-semibold mb-5 mt-7 text-foreground',
          3: 'text-2xl font-semibold mb-4 mt-6 text-foreground',
        }[level] || 'text-xl font-semibold mb-3 mt-5 text-foreground';

        return (
          <HeadingTag key={index} className={headingClasses}>
            {node.content?.map((child, i) => renderNode(child, i))}
          </HeadingTag>
        );

      case 'bulletList':
        return (
          <ul key={index} className="list-disc list-outside mb-4 ml-8 space-y-2 text-foreground">
            {node.content?.map((child, i) => renderNode(child, i))}
          </ul>
        );

      case 'orderedList':
        return (
          <ol key={index} className="list-decimal list-outside mb-4 ml-8 space-y-2 text-foreground">
            {node.content?.map((child, i) => renderNode(child, i))}
          </ol>
        );

      case 'listItem':
        return (
          <li key={index} className="text-foreground pl-2">
            {node.content?.map((child, i) => renderNode(child, i))}
          </li>
        );

      case 'image':
      case 'resizableImage':
        const imageWidth = node.attrs?.width;
        const imageStyle = imageWidth ? { width: `${imageWidth}px`, maxWidth: '100%' } : {};
        return (
          <div key={index} className="my-6">
            <img
              src={node.attrs?.src}
              alt={node.attrs?.alt || ''}
              className="rounded-lg h-auto shadow-md"
              style={imageStyle}
            />
          </div>
        );

      case 'kpiBlock':
        return (
          <Card key={index} className="p-6 my-6 bg-primary/5 border-primary/20">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {node.attrs?.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {node.attrs?.label}
              </div>
            </div>
          </Card>
        );

      case 'text':
        let textContent: React.ReactNode = node.text || '';
        
        // Apply text marks
        if (node.marks) {
          node.marks.forEach((mark) => {
            switch (mark.type) {
              case 'bold':
                textContent = <strong className="font-semibold">{textContent}</strong>;
                break;
              case 'italic':
                textContent = <em className="italic">{textContent}</em>;
                break;
              case 'link':
                textContent = (
                  <a
                    href={mark.attrs?.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline hover:text-primary/80 transition-colors"
                  >
                    {textContent}
                  </a>
                );
                break;
              case 'code':
                textContent = (
                  <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
                    {textContent}
                  </code>
                );
                break;
            }
          });
        }
        
        return <span key={index}>{textContent}</span>;

      case 'hardBreak':
        return <br key={index} />;

      case 'blockquote':
        return (
          <blockquote key={index} className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
            {node.content?.map((child, i) => renderNode(child, i))}
          </blockquote>
        );

      case 'codeBlock':
        return (
          <pre key={index} className="bg-muted p-4 rounded-lg overflow-x-auto my-4">
            <code className="text-sm font-mono">
              {node.content?.map((child, i) => renderNode(child, i))}
            </code>
          </pre>
        );

      case 'horizontalRule':
        return <hr key={index} className="my-8 border-border" />;

      default:
        // Fallback for unknown node types
        if (node.content) {
          return (
            <div key={index}>
              {node.content.map((child, i) => renderNode(child, i))}
            </div>
          );
        }
        return null;
    }
  };

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      {content.content?.map((node, index) => renderNode(node, index))}
    </div>
  );
};

export default RichTextRenderer;
