import { useNavigate, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AxisScale } from "@/components/AxisScale";
import { QUESTIONS, SCALE, computeResult, type Answers } from "@/lib/mbti";
import { saveAnswers } from "@/lib/quiz-store";

export const Route = createFileRoute("/test")({
  component: Test,
  head: () => ({
    meta: [
      { title: "테스트 · 성격지도" },
      {
        name: "description",
        content: "28개의 질문에 답해 당신의 MBTI 축을 찾아갑니다.",
      },
    ],
  }),
});

function Test() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Answers>({});
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  const question = QUESTIONS[index];
  const live = useMemo(() => computeResult(answers), [answers]);
  const done = Object.keys(answers).length;

  if (!question) return null;

  const pick = (value: number) => {
    if (picked !== null) return;
    const next: Answers = { ...answers, [question.id]: value };
    setAnswers(next);
    setPicked(value);

    window.setTimeout(() => {
      const nextQ = QUESTIONS[index + 1];
      if (nextQ) {
        setIndex(index + 1);
        setPicked(next[nextQ.id] ?? null);
      } else {
        saveAnswers(next);
        navigate({ to: "/result" });
      }
    }, 320);
  };

  const back = () => {
    const prevQ = QUESTIONS[index - 1];
    if (!prevQ) return;
    setIndex(index - 1);
    setPicked(answers[prevQ.id] ?? null);
  };

  const progress = ((index + (picked !== null ? 1 : 0)) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-deep text-dark-foreground">
      <header className="mx-auto max-w-5xl px-6 pt-6">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-dark-muted">
            성격지도 · Test
          </p>
          <p className="font-mono text-[11px] tracking-[0.2em] text-dark-muted">
            {String(index + 1).padStart(2, "0")} / {String(QUESTIONS.length).padStart(2, "0")}
          </p>
        </div>
        <div className="mt-4 h-px w-full bg-dark-border">
          <div
            className="h-px bg-accent transition-all duration-500 ease-[cubic-bezier(0.22,1.2,0.36,1)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-12 px-6 pt-12 pb-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between">
            <button
              onClick={back}
              disabled={index === 0}
              className="font-mono text-[11px] tracking-[0.2em] uppercase text-dark-muted transition-colors hover:text-accent disabled:opacity-30 disabled:hover:text-dark-muted"
            >
              ← 이전
            </button>
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent">
              질문 {String(index + 1).padStart(2, "0")}
            </p>
          </div>

          <h1
            key={question.id}
            className="animate-rise mt-8 font-display text-[clamp(1.5rem,3.6vw,2.4rem)] leading-snug font-bold text-balance text-dark-foreground"
          >
            {question.text}
          </h1>

          <div className="mt-10 space-y-2.5">
            {SCALE.map((option) => {
              const active = picked === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => pick(option.value)}
                  className={`flex w-full items-center justify-between rounded-lg px-5 py-4 text-left text-[15px] font-medium transition-colors ${
                    active
                      ? "bg-accent text-deep"
                      : "bg-dark-surface text-dark-foreground ring-1 ring-dark-border hover:bg-dark-surface-strong"
                  }`}
                >
                  {option.label}
                  <span
                    className={`font-mono text-[10px] tracking-[0.2em] ${
                      active ? "text-deep" : "text-dark-muted"
                    }`}
                  >
                    {option.value > 0 ? "+" + option.value : option.value}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="mt-8 font-mono text-[10px] leading-relaxed tracking-[0.2em] uppercase text-dark-muted">
            답하면 다음 질문으로 넘어갑니다 · {done}개 답함
          </p>
        </div>

        <aside className="lg:col-span-5">
          <div className="rounded-xl bg-dark-surface p-6 ring-1 ring-dark-border lg:sticky lg:top-8">
            <p className="mb-6 font-mono text-[10px] tracking-[0.28em] uppercase text-dark-muted">
              실시간 축 균형
            </p>
            <AxisScale
              percentages={live.percentages}
              variant="dark"
              showValue={false}
              animateKey={done}
            />
            <p className="mt-6 border-t border-dark-border pt-5 font-mono text-[10px] leading-relaxed tracking-[0.15em] uppercase text-dark-muted">
              현재 예상 유형
              <span className="mt-2 block font-display text-2xl font-bold tracking-tight text-dark-foreground">
                {live.code}
              </span>
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}
