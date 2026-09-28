import { Link, createFileRoute } from "@tanstack/react-router";
import { TYPE_CODES, TYPES } from "@/lib/mbti";

export const Route = createFileRoute("/types")({
  component: Types,
  head: () => ({
    meta: [
      { title: "16유형 · 성격지도" },
      {
        name: "description",
        content:
          "MBTI 16가지 유형의 특징과 강점, 고민, 잘 맞는 관계. 내 유형을 찾아 읽어보세요.",
      },
      { property: "og:title", content: "16유형 · 성격지도" },
      {
        property: "og:description",
        content: "MBTI 16가지 유형을 한눈에 읽고, 각 유형의 리포트를 열어보세요.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function Types() {
  return (
    <div className="min-h-screen bg-paper">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full bg-ink font-display text-sm font-bold text-paper">
            성
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-ink">
            성격지도
          </span>
        </Link>
        <Link
          to="/test"
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent"
        >
          테스트
        </Link>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20">
        <p className="eyebrow">The 16 types</p>
        <h1 className="mt-5 max-w-[20ch] font-display text-[clamp(2rem,5vw,3.5rem)] leading-tight font-black tracking-tight text-ink text-balance">
          네 개의 축이 만드는 열여섯 개의 얼굴
        </h1>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TYPE_CODES.map((code) => {
            const t = TYPES[code];
            return (
              <Link
                key={code}
                to="/types/$type"
                params={{ type: code }}
                className="group flex flex-col rounded-lg bg-card p-6 ring-1 ring-line transition-colors hover:bg-paper-2"
              >
                <span className="font-display text-3xl font-black tracking-tight text-ink">
                  {code}
                </span>
                <span className="mt-2 font-mono text-[10px] tracking-[0.22em] uppercase text-accent">
                  {t.ko}
                </span>
                <span className="mt-4 text-sm leading-relaxed text-ink-2">{t.tagline}</span>
                <span className="mt-5 font-mono text-[10px] tracking-[0.2em] uppercase text-muted opacity-0 transition-opacity group-hover:opacity-100">
                  리포트 보기 →
                </span>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
