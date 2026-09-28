import { Link } from "@tanstack/react-router";
import type { TypeData } from "@/lib/mbti";

function SectionLabel({ children, tone = "accent" }: { children: React.ReactNode; tone?: "accent" | "muted" }) {
  return (
    <p
      className={`mb-4 font-mono text-[11px] tracking-[0.28em] uppercase ${
        tone === "accent" ? "text-accent" : "text-muted"
      }`}
    >
      {children}
    </p>
  );
}

/** Full personality profile for one type. Reused by the result page and the type pages. */
export function TypeReport({ type }: { type: TypeData }) {
  return (
    <>
      <div className="mt-12 grid gap-10 border-t border-line pt-10 md:grid-cols-2">
        <div>
          <SectionLabel>강점</SectionLabel>
          <ul className="space-y-3">
            {type.strengths.map((s) => (
              <li key={s} className="flex gap-3 text-ink-2">
                <span className="mt-2 h-px w-5 shrink-0 bg-accent" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionLabel tone="muted">조심할 점</SectionLabel>
          <ul className="space-y-3">
            {type.cautions.map((s) => (
              <li key={s} className="flex gap-3 text-ink-2">
                <span className="mt-2 h-px w-5 shrink-0 bg-line" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          { k: "사랑", v: type.love },
          { k: "일", v: type.work },
          { k: "스트레스", v: type.stress },
        ].map((item) => (
          <div key={item.k} className="bg-paper-2 p-6 rounded-lg ring-1 ring-line">
            <p className="mb-3 font-mono text-[11px] tracking-[0.28em] uppercase text-accent">
              {item.k}
            </p>
            <p className="text-[15px] leading-relaxed text-ink-2 text-pretty">{item.v}</p>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <SectionLabel tone="muted">이런 사람과 잘 맞아요</SectionLabel>
        <div className="grid gap-4 md:grid-cols-3">
          {type.matches.map((m) => (
            <Link
              key={m.code}
              to="/types/$type"
              params={{ type: m.code }}
              className="group block bg-card p-6 rounded-lg ring-1 ring-line transition-colors hover:bg-paper-2"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display text-2xl font-bold tracking-tight text-ink">
                  {m.code}
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted">
                  {m.ko}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">{m.note}</p>
              <span className="mt-4 inline-block font-mono text-[10px] tracking-[0.2em] uppercase text-accent opacity-0 transition-opacity group-hover:opacity-100">
                보기 →
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <SectionLabel tone="muted">이런 일에서 빛나요</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {type.fields.map((f) => (
            <span
              key={f}
              className="rounded-full bg-card px-4 py-2 text-sm text-ink-2 ring-1 ring-line"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
