export default function FundingMarks({ large = false }: { large?: boolean }) {
  return <div className={`flex flex-wrap items-center gap-5 ${large ? 'py-6 sm:gap-10' : 'sm:gap-7'}`} aria-label="Fundusze Europejskie — Polska Wschodnia; Rzeczpospolita Polska; Unia Europejska — Europejski Fundusz Rozwoju Regionalnego">
    <div className="text-xs font-semibold">Fundusze Europejskie<span className="block font-normal text-muted-foreground">Polska Wschodnia</span></div>
    <div className="flex gap-2 items-center"><span className="q-rp-flag h-7 w-10" aria-hidden="true" /><span className="text-xs font-semibold">Rzeczpospolita<br />Polska</span></div>
    <div className="text-xs font-semibold">Unia Europejska<span className="block font-normal text-muted-foreground">Europejski Fundusz<br />Rozwoju Regionalnego</span></div>
  </div>;
}