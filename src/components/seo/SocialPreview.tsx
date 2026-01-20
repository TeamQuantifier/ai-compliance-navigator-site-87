import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SocialPreviewProps {
  platform: 'og' | 'twitter';
  title: string;
  description: string;
  imageUrl?: string;
  siteUrl: string;
}

export function SocialPreview({
  platform,
  title,
  description,
  imageUrl,
  siteUrl,
}: SocialPreviewProps) {
  const siteName = siteUrl.replace(/^https?:\/\//, '').split('/')[0];
  
  // Truncate for display
  const displayTitle = title.length > 70 ? title.substring(0, 67) + '...' : title;
  const displayDesc = description.length > 200 ? description.substring(0, 197) + '...' : description;

  if (platform === 'twitter') {
    return (
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Twitter Card (summary_large_image)</p>
        <Card className="overflow-hidden max-w-[500px] border rounded-2xl bg-white">
          {/* Image */}
          <div className="aspect-[2/1] bg-muted flex items-center justify-center border-b">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt="Twitter Card" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-muted-foreground text-sm">
                Brak obrazka OG/Twitter
              </div>
            )}
          </div>
          
          {/* Content */}
          <CardContent className="p-3 space-y-0.5">
            <p className="text-xs text-[#536471]">{siteName}</p>
            <h4 className="font-bold text-[15px] text-[#0f1419] leading-tight line-clamp-2">
              {displayTitle || 'Tytuł strony'}
            </h4>
            <p className="text-sm text-[#536471] line-clamp-2">
              {displayDesc || 'Opis strony pojawi się tutaj...'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Facebook/LinkedIn (Open Graph)
  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">Facebook / LinkedIn Preview</p>
      <Card className="overflow-hidden max-w-[500px] border bg-[#f0f2f5]">
        {/* Image */}
        <div className="aspect-[1.91/1] bg-muted flex items-center justify-center">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt="OG Image" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-muted-foreground text-sm">
              Brak obrazka OG
            </div>
          )}
        </div>
        
        {/* Content */}
        <CardContent className="p-3 bg-[#f0f2f5] space-y-0.5 border-t">
          <p className="text-xs text-[#65676b] uppercase">{siteName}</p>
          <h4 className="font-semibold text-[16px] text-[#1c1e21] leading-tight line-clamp-2">
            {displayTitle || 'Tytuł strony'}
          </h4>
          <p className="text-sm text-[#65676b] line-clamp-1">
            {displayDesc || 'Opis strony...'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

interface SocialPreviewPanelProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  siteUrl: string;
}

export function SocialPreviewPanel({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  twitterTitle,
  twitterDescription,
  twitterImage,
  siteUrl,
}: SocialPreviewPanelProps) {
  return (
    <div className="space-y-6">
      <SocialPreview
        platform="og"
        title={ogTitle || title}
        description={ogDescription || description}
        imageUrl={ogImage}
        siteUrl={siteUrl}
      />
      
      <SocialPreview
        platform="twitter"
        title={twitterTitle || ogTitle || title}
        description={twitterDescription || ogDescription || description}
        imageUrl={twitterImage || ogImage}
        siteUrl={siteUrl}
      />
      
      {/* Status indicators */}
      <div className="space-y-1 text-xs">
        <div className={cn(
          "flex items-center gap-2",
          ogImage ? "text-green-600" : "text-yellow-600"
        )}>
          <span className={cn(
            "w-2 h-2 rounded-full",
            ogImage ? "bg-green-500" : "bg-yellow-500"
          )} />
          <span>
            {ogImage ? "OG Image ustawiony" : "Brak OG Image - użyje featured image lub domyślny"}
          </span>
        </div>
      </div>
    </div>
  );
}
