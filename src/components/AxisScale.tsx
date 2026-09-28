import { AXES, type AxisKey } from "@/lib/mbti";

type Variant = "light" | "dark";

const cls: Record<
  Variant,
  {
    track: string;
    label: string;
    win: string;
    knob: string;
    center: string;
  }
> = {
  light: {
    track: "bg-line",
    label: "text-muted",
    win: "text-ink",
    knob: "bg-ink ring-4 ring-card",
    center: "bg-line",
  },
  dark: {
    track: "bg-dark-surface-strong",
    label: "text-dark-muted",
    win: "text-dark-foreground",
    knob: "bg-accent ring-4 ring-deep",
    center: "bg-dark-border",
  },
};

/**
 * The signature visual of the product: a four-dial balance scale.
 * Used on the start screen, live during the test, and as the result chart.
 */
export function AxisScale({
  percentages,
  variant = "light",
  showValue = true,
  animateKey,
}: {
  percentages: Record<AxisKey, number>;
  variant?: Variant;
  showValue?: boolean;
  animateKey?: string | number;
}) {
  const c = cls[variant];

  return (
    <div className="space-y-6">
      {AXES.map((axis) => {
        const pct = percentages[axis.key] ?? 50;
        const rightWins = pct >= 50;
        const from = Math.min(50, pct);
        const width = Math.abs(pct - 50);

        return (
          <div key={axis.key}>
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <span
                className={`font-mono text-[11px] tracking-[0.2em] uppercase ${
                  rightWins ? c.label : c.win
                }`}
              >
                {axis.left} {axis.leftKo}
              </span>
              <span
                className={`font-mono text-[11px] tracking-[0.2em] uppercase ${
                  rightWins ? c.win : c.label
                }`}
              >
                {axis.right} {axis.rightKo}
                {showValue ? ` · ${rightWins ? pct : 100 - pct}%` : ""}
              </span>
            </div>

            <div className={`relative h-1.5 rounded-full ${c.track}`}>
              <span
                className={`absolute top-1/2 h-3 w-px -translate-y-1/2 ${c.center}`}
                style={{ left: "50%" }}
              />
              <span
                className="absolute inset-y-0 rounded-full bg-accent transition-all duration-500 ease-[cubic-bezier(0.22,1.2,0.36,1)]"
                style={{ left: `${from}%`, width: `${width}%` }}
              />
              <span
                key={`${axis.key}-${animateKey ?? pct}`}
                className={`absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full animate-settle ${c.knob}`}
                style={{ left: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
