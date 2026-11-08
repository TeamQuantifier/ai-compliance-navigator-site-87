import marks from '@/assets/quantamental/popw-funding-marks-official.jpg.asset.json';

// Official POPW visual identity card: https://www.funduszeunijne.gov.pl/media/49359/karta_wzor_FE_POPW.pdf
export default function FundingMarks({ large = false }: { large?: boolean }) {
  return <img src={`https://ai-compliance-navigator-site-87.lovable.app${marks.url}`} width="1484" height="221" loading={large ? 'lazy' : 'eager'} alt="Fundusze Europejskie — Polska Wschodnia; Rzeczpospolita Polska; Unia Europejska — Europejski Fundusz Rozwoju Regionalnego" className={large ? 'w-full max-w-[720px] h-auto py-4' : 'w-full max-w-[510px] h-auto'} />;
}