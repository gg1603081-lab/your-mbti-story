import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AxisScale } from "@/components/AxisScale";
import { TypeReport } from "@/components/TypeReport";
import { QUESTIONS, computeResult, getType, type Answers } from "@/lib/mbti";
import { clearAnswers, loadAnswers, loadHistory } from "@/lib/quiz-store";

export const Route = createFileRoute("/result")({
  component: Result,
  head: () => ({
    meta: [
      { title: "당신의 유형 · 성격지도" },
      {
        name: "description",
        content:
          "28개의 답에서 읽은 당신의 MBTI 유형과 강점, 고민, 관계와 일의 성향.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

type HistoryRow = { id: string; type_code: string; created_at: string };

function Result() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Answers | null>(null);
  const [history, setHistory] = useState<HistoryRow[]>([]);
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let alive = true;
    Promise.all([loadAnswers(), loadHistory()]).then(([a, h]) => {
      if (!alive) return;
      setAnswers(a as Answers | null);
      setHistory(h);
      setReady(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  if (!ready) {
    return <div className="min-h-screen bg-paper" />;
  }

  const answered = answers ? Object.keys(answers).length : 0;

  if (!answers || answered < QUESTIONS.length) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper px-6">
        <div className="max-w-md rounded-xl bg-card p-8 text-center ring-1 ring-line">
          <p className="eyebrow">Not finished</p>
          <h1 className="mt-4 font-display text-2xl font-bold text-ink">
            아직 답이 덜 모였어요
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
            {answered} / {QUESTIONS.length}개 답했어요. 끝까지 답해야 축이 제 자리를 찾습니다.
          </p>
          <Link
            to="/test"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-accent"
          >
            테스트 계속하기 <span className="font-mono">→</span>
          </Link>
          <HistoryList rows={history} />
        </div>
      </div>
    );
  }

  const result = computeResult(answers);
  const type = getType(result.code);

  if (!type) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper px-6">
        <p className="text-ink-2">유형을 찾지 못했어요. 다시 테스트해 주세요.</p>
      </div>
    );
  }

  const share = async () => {
    const url = `${window.location.origin}/types/${type.code}`;
    const text = `나는 성격지도 MBTI에서 ${type.code} ${type.ko} (${type.en})이 나왔어요 — "${type.tagline}"\n${url}`;
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title: "성격지도", text, url });
        return;
      }
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* shared or cancelled */
    }
  };

  const restart = async () => {
    await clearAnswers();
    navigate({ to: "/test" });
  };

  return (
    <div className="min-h-screen bg-paper">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-muted">
          성격지도 · Result
        </p>
        <Link
          to="/types"
          className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted transition-colors hover:text-accent"
        >
          16유형
        </Link>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20">
        <section className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">Your type</p>
            <div className="mt-3 flex items-end gap-1">
              {type.code.split("").map((letter, i) => (
                <span
                  key={i}
                  className={`animate-letter font-display text-[clamp(4.5rem,15vw,10rem)] leading-[0.8] font-black tracking-tighter ${
                    i === 3 ? "text-accent" : "text-ink"
                  }`}
                  style={{ animationDelay: `${i * 110}ms` }}
                >
                  {letter}
                </span>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-baseline gap-4">
              <h1 className="font-display text-4xl font-black tracking-tight text-ink">
                {type.ko}
              </h1>
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-muted">
                {type.en}
              </span>
            </div>
            <p className="mt-4 font-display text-xl font-semibold text-accent">
              {type.tagline}
            </p>
            <p className="mt-7 max-w-[52ch] text-[17px] leading-relaxed text-ink-2 text-pretty">
              {type.summary}
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl bg-card p-7 ring-1 ring-line">
              <p className="mb-6 font-mono text-[10px] tracking-[0.28em] uppercase text-muted">
                Axis Weights
              </p>
              <AxisScale percentages={result.percentages} animateKey={result.code} />
            </div>
          </div>
        </section>

        <TypeReport type={type} />

        <section className="mt-14 flex flex-wrap items-center gap-3 border-t border-line pt-10">
          <button
            onClick={share}
            className="inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-accent"
          >
            <span>{copied ? "결과가 복사됐어요" : "결과 공유"}</span>
            <span className="font-mono text-xs">↗</span>
          </button>
          <button
            onClick={restart}
            className="rounded-full px-6 py-3.5 text-sm font-semibold text-ink ring-1 ring-line transition-colors hover:bg-paper-2"
          >
            다시 테스트
          </button>
          <Link
            to="/types"
            className="rounded-full px-6 py-3.5 text-sm font-semibold text-ink ring-1 ring-line transition-colors hover:bg-paper-2"
          >
            다른 유형 보기
          </Link>
        </section>

        <p className="mt-10 font-mono text-[10px] leading-relaxed tracking-[0.2em] uppercase text-muted">
          MBTI는 자신을 돌아보는 도구입니다. 진단이나 판결의 기준이 아닙니다.
        </p>
      </main>
    </div>
  );
}
