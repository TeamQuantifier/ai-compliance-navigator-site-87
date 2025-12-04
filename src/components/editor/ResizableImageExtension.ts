import Image from '@tiptap/extension-image';
import { ReactNodeViewRenderer } from '@tiptap/react';
import ResizableImageComponent from './ResizableImageComponent';

export const ResizableImage = Image.extend({
  name: 'resizableImage',

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
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageComponent);
  },
});

export default ResizableImage;
