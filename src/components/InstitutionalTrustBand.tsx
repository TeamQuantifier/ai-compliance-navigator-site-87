import { useTranslation } from 'react-i18next';

type TrustPanel = {
  key: string;
  src?: string;
  width?: number;
  height?: number;
  imgClass?: string;
  wordmark?: string;
};

// Logos are served from /public (featured, jst) so they resolve on both the
// Lovable preview and the Netlify production domain.
const PANELS: TrustPanel[] = [
  {
    key: 'ncc',
    src: '/featured/ncc-pl.png',
    width: 1000,
    height: 413,
    imgClass: 'h-11 md:h-12',
  },
  {
    key: 'ministry',
    src: '/featured/ministerstwo-cyfryzacji.png',
    width: 969,
    height: 432,
    imgClass: 'h-12 md:h-14',
  },
  {
    key: 'iso27001',
    src: '/featured/tuv-nord-iso-27001.jpg',
    width: 536,
    height: 533,
    imgClass: 'h-14 md:h-16 rounded',
  },
  // No ATLAS logo file in the repo — rendered as a wordmark panel instead.
  { key: 'atlas', wordmark: 'ATLAS' },
];

const InstitutionalTrustBand = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full border-y border-slate-200/70 bg-white py-12">
      <div className="container mx-auto px-4">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
          {t('trustBand.label', { defaultValue: 'Potwierdzone instytucjonalnie' })}
        </p>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PANELS.map((panel) => (
            <li
              key={panel.key}
              className="flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-5 py-6 text-center transition-colors hover:border-primary/30 hover:bg-white"
            >
              <div className="flex h-16 items-center justify-center">
                {panel.src ? (
                  <img
                    src={panel.src}
                    alt={t(`trustBand.items.${panel.key}.alt`, {
                      defaultValue: panel.key,
                    })}
                    width={panel.width}
                    height={panel.height}
                    loading="lazy"
                    className={`${panel.imgClass} w-auto object-contain`}
                  />
                ) : (
                  <span className="text-2xl font-bold tracking-[0.25em] text-slate-900">
                    {panel.wordmark}
                  </span>
                )}
              </div>
              <p className="text-xs leading-relaxed text-slate-500">
                {t(`trustBand.items.${panel.key}.caption`, {
                  defaultValue: '',
                })}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default InstitutionalTrustBand;
