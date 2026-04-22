import { Node, mergeAttributes, ReactNodeViewRenderer } from '@tiptap/react';
import KpiBlockComponent from './KpiBlockComponent';

export interface KpiBlockAttributes {
  value: string;
  label: string;
}

export const KpiBlock = Node.create({
  name: 'kpiBlock',

  group: 'block',

  content: 'inline*',

  addAttributes() {
    return {
      value: {
        default: '',
      },
      label: {
        default: '',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="kpi-block"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'kpi-block' }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(KpiBlockComponent as any);
  },

  addCommands() {
    return {
      setKpiBlock:
        (attributes: KpiBlockAttributes) =>
        ({ commands }: { commands: any }) => {
          return commands.insertContent({
            type: this.name,
            attrs: attributes,
          });
        },
    } as any;
  },
});
