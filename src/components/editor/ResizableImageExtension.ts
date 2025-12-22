import Image from '@tiptap/extension-image';
import { ReactNodeViewRenderer } from '@tiptap/react';
import ResizableImageComponent from './ResizableImageComponent';

export const ResizableImage = Image.extend({
  name: 'image',

  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: element => element.getAttribute('data-width') || element.style.width?.replace('px', '') || null,
        renderHTML: attributes => {
          if (!attributes.width) return {};
          return {
            'data-width': attributes.width,
            style: `width: ${attributes.width}px`,
          };
        },
      },
      alt: {
        default: '',
        parseHTML: element => element.getAttribute('alt') || '',
        renderHTML: attributes => {
          return { alt: attributes.alt || '' };
        },
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageComponent);
  },
});

export default ResizableImage;
