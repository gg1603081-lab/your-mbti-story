import { Link, createFileRoute } from "@tanstack/react-router";
import heroDial from "@/assets/axis-dial.jpg";
import { AXES, QUESTIONS } from "@/lib/mbti";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "성격지도 · MBTI 성격 분석" },
      {
        name: "description",
        content:
          "28개의 질문에 답하면 네 개의 축이 움직이며 당신의 MBTI 유형을 찾습니다. 강점과 고민, 사랑과 일, 잘 맞는 유형까지 한 장의 리포트로 읽으세요.",
      },
      { property: "og:title", content: "성격지도 · MBTI 성격 분석" },
      {
        property: "og:description",
        content: "28개의 질문으로 찾는 나의 MBTI 유형. 네 개의 축이 너를 읽습니다.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const STEPS = [
  { n: "01", t: "답하기", d: "28개의 질문에 다섯 단계로 답합니다. 정답은 없어요." },
  { n: "02", t: "기울어지는 축", d: "답하는 동안 네 개의 축이 실시간으로 움직이는 걸 볼 수 있어요." },
  { n: "03", t: "리포트 읽기", d: "유형과 강점, 고민, 관계와 일의 성향을 한 장으로 읽어드립니다." },
];

function Index() {
  return (
    <div className="min-h-screen bg-paper">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full bg-ink font-display text-sm font-bold text-paper">
            성
          </span>
          <span className="leading-none">
            <span className="block font-display text-lg font-bold tracking-tight text-ink">
              성격지도
            </span>
            <span className="mt-1 block font-mono text-[9px] tracking-[0.28em] uppercase text-muted">
              Personality Map
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-5">
          <Link
            to="/types"
            className="hidden font-mono text-[11px] tracking-[0.2em] uppercase text-muted transition-colors hover:text-accent sm:block"
          >
            16유형
          </Link>
          <Link
            to="/test"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent"
          >
            테스트
          </Link>
        </nav>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl gap-12 px-6 pt-12 pb-20 lg:grid-cols-12 lg:pt-20">
          <div className="animate-rise lg:col-span-7">
            <p className="eyebrow">MBTI · {QUESTIONS.length}문항 · 약 6분</p>
            <h1 className="mt-6 font-display text-[clamp(2.7rem,7.5vw,5.5rem)] leading-[0.95] font-black tracking-tight text-ink text-balance">
              네 개의 축이
              <br />
              너를 읽는다
            </h1>
            <p className="mt-7 max-w-[46ch] text-lg leading-relaxed text-ink-2 text-pretty">
              성격은 한 단어로 정리되지 않습니다. 대신 네 개의 축 위에 올려놓고,
              어디로 얼마큼 기울어져 있는지 읽는다면 훨씬 정확해집니다.
              답하는 동안 당신의 축이 천천히 제 자리를 찾아갑니다.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/test"
                className="inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-lg font-semibold text-paper transition-colors hover:bg-accent"
              >
                테스트 시작하기
                <span className="font-mono text-sm tracking-widest">→</span>
              </Link>
              <Link
                to="/types"
                className="inline-flex items-center gap-2 rounded-full px-6 py-4 text-sm font-semibold text-ink ring-1 ring-line transition-colors hover:bg-paper-2"
              >
                유형 미리 보기
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
              {[
                { k: "질문", v: String(QUESTIONS.length) },
                { k: "축", v: "4" },
                { k: "유형", v: "16" },
              ].map((s, i) => (
                <div key={s.k} className="flex items-center gap-8">
                  {i > 0 ? <span className="h-8 w-px bg-line" /> : null}
                  <div>
                    <p className="font-display text-3xl font-bold text-ink">{s.v}</p>
                    <p className="mt-1 font-mono text-[10px] tracking-[0.25em] uppercase text-muted">
                      {s.k}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-rise lg:col-span-5 [animation-delay:160ms]">
            <figure className="overflow-hidden rounded-xl bg-paper-2 p-4 ring-1 ring-line">
              <img
                src={heroDial}
                alt="네 개의 저울 추를 그린 추상 일러스트"
                width={1008}
                height={1200}
                className="h-auto w-full rounded-lg"
              />
              <figcaption className="mt-4 px-1 font-mono text-[10px] leading-relaxed tracking-[0.2em] uppercase text-muted">
                Fig. 01 — 네 개의 축
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-3xl font-bold tracking-tight text-ink">
                네 가지 축
              </h2>
              <p className="hidden font-mono text-[11px] tracking-[0.2em] uppercase text-muted sm:block">
                Four Axes
              </p>
            </div>

            <div className="mt-10 divide-y divide-line border-y border-line">
              {AXES.map((a) => (
                <div
                  key={a.key}
                  className="grid gap-3 py-7 sm:grid-cols-12 sm:items-baseline"
                >
                  <p className="font-display text-3xl font-bold tracking-tight text-accent sm:col-span-3">
                    {a.left} <span className="text-line">/</span> {a.right}
                  </p>
                  <p className="font-display text-lg font-bold text-ink sm:col-span-4">
                    {a.leftKo} · {a.rightKo} — {a.title}
                  </p>
                  <p className="text-[15px] leading-relaxed text-ink-2 text-pretty sm:col-span-5">
                    {a.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink">
            진행 방식
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-lg bg-card p-6 ring-1 ring-line">
                <p className="font-mono text-[11px] tracking-[0.28em] text-accent">{s.n}</p>
                <p className="mt-4 font-display text-xl font-bold text-ink">{s.t}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-deep">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-16 md:flex-row md:items-center md:justify-between">
            <h2 className="max-w-[22ch] font-display text-3xl leading-tight font-bold text-dark-foreground text-balance md:text-4xl">
              여섯 분이면, 당신의 축이 보입니다
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/test"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-deep transition-colors hover:bg-gold"
              >
                지금 시작하기
                <span className="font-mono text-sm">→</span>
              </Link>
              <Link
                to="/types"
                className="rounded-full px-6 py-3.5 text-sm font-semibold text-dark-foreground ring-1 ring-dark-border transition-colors hover:bg-dark-surface"
              >
                16유형 둘러보기
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-6xl px-6 py-10">
        <p className="font-mono text-[10px] leading-relaxed tracking-[0.2em] uppercase text-muted">
          성격지도 — MBTI는 자신을 돌아보는 도구입니다.진단이나 판결의 기준이 아닙니다.
        </p>
      </footer>
    </div>
  );
}
