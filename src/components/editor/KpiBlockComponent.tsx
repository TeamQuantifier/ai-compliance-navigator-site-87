import { NodeViewWrapper } from '@tiptap/react';
import { NodeViewProps } from '@tiptap/core';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const KpiBlockComponent = ({ node, updateAttributes }: NodeViewProps) => {
  return (
    <NodeViewWrapper className="my-4">
      <Card className="p-4 bg-gradient-to-r from-compliance-50 to-innovation-50">
        <div className="flex flex-col gap-2">
          <Input
            value={node.attrs.value}
            onChange={(e) => updateAttributes({ value: e.target.value })}
            placeholder="KPI Value (np. 50%)"
            className="text-2xl font-bold text-center"
          />
          <Input
            value={node.attrs.label}
            onChange={(e) => updateAttributes({ label: e.target.value })}
            placeholder="KPI Label (np. Redukcja czasu)"
            className="text-sm text-center"
          />
        </div>
      </Card>
    </NodeViewWrapper>
  );
};

export default KpiBlockComponent;
