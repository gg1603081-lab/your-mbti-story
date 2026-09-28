import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { TypeReport } from "@/components/TypeReport";
import { TYPES } from "@/lib/mbti";

export const Route = createFileRoute("/types/$type")({
  loader: ({ params }) => {
    const code = params.type.toUpperCase();
    const type = TYPES[code];
    if (!type) throw notFound();
    return { type };
  },
  head: ({ params }) => {
    const code = (params.type || "").toUpperCase();
    const t = TYPES[code];
    const title = t ? `${code} ${t.ko} · 성격지도` : "유형 · 성격지도";
    const desc = t
      ? `${code} ${t.ko} (${t.en}) — ${t.tagline}. 강점과 고민, 사랑과 일, 잘 맞는 유형까지 읽어보세요.`
      : "MBTI 16유형 리포트";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: TypeDetail,
});

function TypeDetail() {
  const { type } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-paper">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link to="/types" className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted transition-colors hover:text-accent">
          ← 16유형
        </Link>
        <Link
          to="/test"
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent"
        >
          내 유형 찾기
        </Link>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20">
        <p className="eyebrow">Type report</p>
        <div className="mt-3 flex items-end gap-1">
          {type.code.split("").map((letter, i) => (
            <span
              key={i}
              className="animate-letter font-display text-[clamp(4rem,13vw,9rem)] leading-[0.8] font-black tracking-tighter text-ink"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {letter}
            </span>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-baseline gap-4">
          <h1 className="font-display text-4xl font-black tracking-tight text-ink">{type.ko}</h1>
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-muted">
            {type.en}
          </span>
        </div>
        <p className="mt-4 font-display text-xl font-semibold text-accent">{type.tagline}</p>
        <p className="mt-7 max-w-[52ch] text-[17px] leading-relaxed text-ink-2 text-pretty">
          {type.summary}
        </p>

        <TypeReport type={type} />
      </main>
    </div>
  );
}
