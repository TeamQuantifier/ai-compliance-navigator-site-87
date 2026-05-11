import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { Activity, Bell, FileSignature, FileCheck2 } from "lucide-react";

const STATS = [
  { icon: Activity, value: 18420, suffix: "", label: "dowodów odświeżonych w tym miesiącu" },
  { icon: Bell, value: 3271, suffix: "", label: "alertów obsłużonych przez Leona" },
  { icon: FileSignature, value: 412, suffix: "", label: "polityk wygenerowanych w 15 min" },
  { icon: FileCheck2, value: 86, suffix: "", label: "pakietów audytora wygenerowanych jednym klikiem" },
];

const useCountUp = (target: number, run: boolean, duration = 1500) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setVal(Math.floor(p * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return val;
};

const Counter = ({ value, suffix, run }: { value: number; suffix: string; run: boolean }) => {
  const v = useCountUp(value, run);
  return (
    <span>
      {v.toLocaleString("pl-PL")}
      {suffix}
    </span>
  );
};

const AlwaysOnBar = () => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section className="bg-slate-950 py-14 border-y border-white/10">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {STATS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="text-center">
                <Icon className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-300 to-blue-300 bg-clip-text text-transparent">
                  <Counter value={s.value} suffix={s.suffix} run={inView} />
                </div>
                <div className="text-xs text-white/70 mt-1 leading-tight">{s.label}</div>
              </div>
            );
          })}
        </div>
        <p className="text-center text-sm text-white/60 italic">
          Każda liczba aktualizuje się sama. To jest Continuous Compliance.
        </p>
      </div>
    </section>
  );
};

export default AlwaysOnBar;
