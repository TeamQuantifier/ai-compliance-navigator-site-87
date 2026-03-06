import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';

interface Props {
  embedId: string;
  title: string;
  className?: string;
}

const ClickMeetingEmbed = ({ embedId, title, className = '' }: Props) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous script if any
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://embed.clickmeeting.com/embed_conference.html?r=${embedId}&w=100%25&h=680`;
    script.async = true;
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [embedId]);

  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
        <ExternalLink className="h-4 w-4" />
        <span>{t('eventDetail.clickMeetingHosted')}</span>
      </div>
      <div
        ref={containerRef}
        className="rounded-xl border border-border overflow-hidden bg-card min-h-[680px]"
        aria-label={`${t('eventDetail.clickMeetingRegistration')}: ${title}`}
      />
    </div>
  );
};

export default ClickMeetingEmbed;
