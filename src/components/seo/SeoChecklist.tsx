import React from 'react';
import { SeoAnalysisResult, SeoCheckResult } from '@/lib/seo-rules';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Info, 
  Sparkles,
  ChevronDown,
  ChevronRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useState } from 'react';

interface SeoChecklistProps {
  analysis: SeoAnalysisResult;
  onAutoFix?: (action: string) => void;
  isGenerating?: boolean;
}

function getSeverityIcon(severity: 'critical' | 'warning' | 'info') {
  switch (severity) {
    case 'critical':
      return <XCircle className="h-4 w-4 text-destructive" />;
    case 'warning':
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case 'info':
      return <Info className="h-4 w-4 text-blue-500" />;
  }
}

function getSeverityLabel(severity: 'critical' | 'warning' | 'info') {
  switch (severity) {
    case 'critical':
      return 'Krytyczne';
    case 'warning':
      return 'Ostrzeżenie';
    case 'info':
      return 'Sugestia';
  }
}

function CheckItem({ 
  result, 
  onAutoFix, 
  isGenerating 
}: { 
  result: SeoCheckResult; 
  onAutoFix?: (action: string) => void;
  isGenerating?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className={cn(
        "rounded-lg border p-3",
        result.passed ? "bg-green-500/5 border-green-500/20" : "bg-muted/50"
      )}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              {result.passed ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                getSeverityIcon(result.rule.severity)
              )}
            </div>
            
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2">
                <span className={cn(
                  "font-medium text-sm",
                  result.passed && "text-green-700 dark:text-green-400"
                )}>
                  {result.rule.name}
                </span>
                {!result.passed && (
                  <span className={cn(
                    "text-xs px-1.5 py-0.5 rounded",
                    result.rule.severity === 'critical' && "bg-destructive/10 text-destructive",
                    result.rule.severity === 'warning' && "bg-yellow-500/10 text-yellow-600",
                    result.rule.severity === 'info' && "bg-blue-500/10 text-blue-600"
                  )}>
                    {getSeverityLabel(result.rule.severity)}
                  </span>
                )}
                <span className="text-xs text-muted-foreground ml-auto">
                  {result.rule.points} pkt
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {result.message}
              </p>
            </div>

            <div className="mt-0.5">
              {isOpen ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="mt-3 pt-3 border-t space-y-2">
            <p className="text-xs text-muted-foreground">
              {result.rule.description}
            </p>
            
            {!result.passed && (
              <div className="flex items-center gap-2">
                <p className="text-xs">
                  <strong>Jak naprawić:</strong> {result.rule.howToFix}
                </p>
                
                {result.rule.canAutoFix && result.rule.autoFixAction && onAutoFix && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAutoFix(result.rule.autoFixAction!);
                    }}
                    disabled={isGenerating}
                    className="ml-auto shrink-0"
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    Napraw automatycznie
                  </Button>
                )}
              </div>
            )}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

export function SeoChecklist({ analysis, onAutoFix, isGenerating }: SeoChecklistProps) {
  const percentage = Math.round((analysis.score / analysis.maxScore) * 100);
  
  const criticalIssues = analysis.failed.filter(r => r.rule.severity === 'critical');
  const warnings = analysis.failed.filter(r => r.rule.severity === 'warning');
  const infos = analysis.failed.filter(r => r.rule.severity === 'info');

  return (
    <div className="space-y-6">
      {/* Score Card */}
      <div className={cn(
        "rounded-lg border p-4",
        analysis.status === 'success' && "bg-green-500/5 border-green-500/30",
        analysis.status === 'warning' && "bg-yellow-500/5 border-yellow-500/30",
        analysis.status === 'error' && "bg-destructive/5 border-destructive/30"
      )}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold">SEO Score</h3>
            <p className="text-xs text-muted-foreground">
              {analysis.passed.length} z {analysis.passed.length + analysis.failed.length} reguł spełnionych
            </p>
          </div>
          <div className={cn(
            "text-3xl font-bold",
            analysis.status === 'success' && "text-green-600",
            analysis.status === 'warning' && "text-yellow-600",
            analysis.status === 'error' && "text-destructive"
          )}>
            {analysis.score}/{analysis.maxScore}
          </div>
        </div>
        
        <Progress 
          value={percentage} 
          className={cn(
            "h-2",
            analysis.status === 'success' && "[&>div]:bg-green-500",
            analysis.status === 'warning' && "[&>div]:bg-yellow-500",
            analysis.status === 'error' && "[&>div]:bg-destructive"
          )}
        />
        
        <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
          {criticalIssues.length > 0 && (
            <span className="flex items-center gap-1 text-destructive">
              <XCircle className="h-3 w-3" />
              {criticalIssues.length} krytycznych
            </span>
          )}
          {warnings.length > 0 && (
            <span className="flex items-center gap-1 text-yellow-600">
              <AlertTriangle className="h-3 w-3" />
              {warnings.length} ostrzeżeń
            </span>
          )}
          {infos.length > 0 && (
            <span className="flex items-center gap-1 text-blue-500">
              <Info className="h-3 w-3" />
              {infos.length} sugestii
            </span>
          )}
        </div>
      </div>

      {/* Issues to fix */}
      {analysis.failed.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <XCircle className="h-4 w-4 text-destructive" />
            Do poprawy ({analysis.failed.length})
          </h4>
          <div className="space-y-2">
            {analysis.failed.map((result) => (
              <CheckItem 
                key={result.rule.id} 
                result={result} 
                onAutoFix={onAutoFix}
                isGenerating={isGenerating}
              />
            ))}
          </div>
        </div>
      )}

      {/* Passed checks */}
      {analysis.passed.length > 0 && (
        <Collapsible>
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center gap-2 text-sm font-medium text-green-600 hover:underline">
              <CheckCircle2 className="h-4 w-4" />
              Zaliczone ({analysis.passed.length})
              <ChevronDown className="h-4 w-4 ml-auto" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-2 mt-3">
              {analysis.passed.map((result) => (
                <CheckItem key={result.rule.id} result={result} />
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}
