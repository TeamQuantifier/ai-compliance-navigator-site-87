import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import KpiBlockComponent from './KpiBlockComponent';

export interface KpiBlockAttributes {
  value: string;
  label: string;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    kpiBlock: {
      setKpiBlock: (attributes: KpiBlockAttributes) => ReturnType;
    };
  }
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
    return ReactNodeViewRenderer(KpiBlockComponent);
  },

  addCommands() {
    return {
      setKpiBlock:
        (attributes) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: attributes,
          });
        },
    };
  },
});
