import type { JSONContent } from '@tiptap/react';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface RichTextRendererProps {
  content: JSONContent;
  className?: string;
}

const RichTextRenderer = ({ content, className = '' }: RichTextRendererProps) => {
  const renderNode = (node: JSONContent, index: number): React.ReactNode => {
    if (!node.type) return null;

    switch (node.type) {
      case 'paragraph':
        const textAlign = node.attrs?.textAlign;
        const alignClass = textAlign ? `text-${textAlign}` : '';
        return (
          <p key={index} className={`mb-4 text-foreground leading-relaxed ${alignClass}`}>
            {node.content?.map((child, i) => renderNode(child, i))}
          </p>
        );

      case 'heading':
        const level = node.attrs?.level || 1;
        const headingAlign = node.attrs?.textAlign;
        const headingAlignClass = headingAlign ? `text-${headingAlign}` : '';
        const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
        const headingClasses: Record<number, string> = {
          1: 'text-4xl font-bold mb-6 mt-8 text-foreground',
          2: 'text-3xl font-semibold mb-5 mt-7 text-foreground',
          3: 'text-2xl font-semibold mb-4 mt-6 text-foreground',
          4: 'text-xl font-semibold mb-3 mt-5 text-foreground',
        };
        const baseHeadingClass = headingClasses[level] || 'text-lg font-semibold mb-3 mt-5 text-foreground';

        return (
          <HeadingTag key={index} className={`${baseHeadingClass} ${headingAlignClass}`}>
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
        const imageAlt = node.attrs?.alt || '';
        const imageStyle = imageWidth ? { width: `${imageWidth}px`, maxWidth: '100%' } : {};
        return (
          <figure key={index} className="my-6">
            <img
              src={node.attrs?.src}
              alt={imageAlt}
              className="rounded-lg h-auto shadow-md"
              style={imageStyle}
              loading="lazy"
              width={imageWidth || 800}
              height={imageWidth ? Math.round(imageWidth * 0.56) : 450}
            />
            {imageAlt && (
              <figcaption className="text-sm text-muted-foreground mt-2 text-center italic">
                {imageAlt}
              </figcaption>
            )}
          </figure>
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
              case 'underline':
                textContent = <u className="underline">{textContent}</u>;
                break;
              case 'link':
                const href = mark.attrs?.href || '';
                const isInternal = href.startsWith('/') || href.includes('quantifier.ai');
                if (isInternal) {
                  const internalPath = href.includes('quantifier.ai')
                    ? new URL(href).pathname
                    : href;
                  textContent = (
                    <Link
                      to={internalPath}
                      className="text-primary underline hover:text-primary/80 transition-colors"
                    >
                      {textContent}
                    </Link>
                  );
                } else {
                  textContent = (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline hover:text-primary/80 transition-colors"
                    >
                      {textContent}
                    </a>
                  );
                }
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

      case 'table':
        return (
          <div key={index} className="overflow-x-auto my-6">
            <table className="w-full border-collapse border border-border">
              <tbody>
                {node.content?.map((child, i) => renderNode(child, i))}
              </tbody>
            </table>
          </div>
        );

      case 'tableRow':
        return (
          <tr key={index} className="border-b border-border">
            {node.content?.map((child, i) => renderNode(child, i))}
          </tr>
        );

      case 'tableCell':
        return (
          <td key={index} className="border border-border p-3 text-foreground">
            {node.content?.map((child, i) => renderNode(child, i))}
          </td>
        );

      case 'tableHeader':
        return (
          <th key={index} className="border border-border p-3 bg-muted font-semibold text-left text-foreground">
            {node.content?.map((child, i) => renderNode(child, i))}
          </th>
        );

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
