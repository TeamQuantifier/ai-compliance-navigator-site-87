import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SerpPreviewProps {
  title: string;
  url: string;
  description: string;
  titleMaxLength?: number;
  descriptionMaxLength?: number;
}

export function SerpPreview({
  title,
  url,
  description,
  titleMaxLength = 60,
  descriptionMaxLength = 160,
}: SerpPreviewProps) {
  const titleLength = title.length;
  const descLength = description.length;
  
  const isTitleTooLong = titleLength > titleMaxLength;
  const isTitleTooShort = titleLength > 0 && titleLength < 30;
  const isDescTooLong = descLength > descriptionMaxLength;
  const isDescTooShort = descLength > 0 && descLength < 70;

  // Truncate for preview display
  const displayTitle = isTitleTooLong ? title.substring(0, titleMaxLength - 3) + '...' : title;
  const displayDesc = isDescTooLong ? description.substring(0, descriptionMaxLength - 3) + '...' : description;

  // Extract breadcrumb path from URL
  const breadcrumbPath = url.replace(/^https?:\/\//, '').split('/').filter(Boolean);

  return (
    <div className="space-y-4">
      {/* Desktop Preview */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Globe className="h-3 w-3" />
          <span>Desktop Preview</span>
        </div>
        <Card className="bg-white border shadow-sm overflow-hidden max-w-xl">
          <CardContent className="p-4 space-y-1">
            {/* Breadcrumb / URL */}
            <div className="flex items-center gap-1 text-xs text-[#202124]">
              <span className="text-[#5f6368]">
                {breadcrumbPath.slice(0, 3).join(' › ') || 'example.com'}
              </span>
            </div>
            
            {/* Title */}
            <h3 
              className={cn(
                "text-xl font-normal cursor-pointer hover:underline",
                "text-[#1a0dab]" // Google blue
              )}
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              {displayTitle || 'Tytuł strony'}
            </h3>
            
            {/* Description */}
            <p 
              className="text-sm text-[#4d5156] leading-snug"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              {displayDesc || 'Meta description pojawi się tutaj...'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Preview */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Smartphone className="h-3 w-3" />
          <span>Mobile Preview</span>
        </div>
        <Card className="bg-white border shadow-sm overflow-hidden max-w-[320px]">
          <CardContent className="p-3 space-y-1">
            {/* URL */}
            <div className="text-xs text-[#5f6368] truncate">
              {breadcrumbPath[0] || 'example.com'}
            </div>
            
            {/* Title - shorter on mobile */}
            <h3 
              className="text-base font-normal text-[#1a0dab] line-clamp-2 cursor-pointer"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              {displayTitle || 'Tytuł strony'}
            </h3>
            
            {/* Description - shorter on mobile */}
            <p 
              className="text-xs text-[#4d5156] line-clamp-2"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              {displayDesc || 'Meta description...'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Character counts and warnings */}
      <div className="space-y-1 text-xs">
        <div className={cn(
          "flex items-center gap-2",
          isTitleTooLong || isTitleTooShort ? "text-yellow-600" : "text-green-600"
        )}>
          <span className={cn(
            "w-2 h-2 rounded-full",
            isTitleTooLong || isTitleTooShort ? "bg-yellow-500" : "bg-green-500"
          )} />
          <span>
            SEO Title: {titleLength}/{titleMaxLength} znaków
            {isTitleTooLong && " (za długi - zostanie obcięty)"}
            {isTitleTooShort && " (za krótki)"}
          </span>
        </div>
        
        <div className={cn(
          "flex items-center gap-2",
          isDescTooLong || isDescTooShort ? "text-yellow-600" : "text-green-600"
        )}>
          <span className={cn(
            "w-2 h-2 rounded-full",
            isDescTooLong || isDescTooShort ? "bg-yellow-500" : "bg-green-500"
          )} />
          <span>
            Meta Description: {descLength}/{descriptionMaxLength} znaków
            {isDescTooLong && " (za długi - zostanie obcięty)"}
            {isDescTooShort && " (za krótki)"}
          </span>
        </div>
      </div>
    </div>
  );
}
