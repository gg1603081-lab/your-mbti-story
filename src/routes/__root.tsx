import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

const FONTS =
  "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Noto+Serif+KR:wght@400;600;700;900&display=swap";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold text-ink">
          이 페이지는 지도 위에 없어요
        </h1>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent"
          >
            처음으로
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">Error</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-ink">
          페이지가 열리지 않았어요
        </h1>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-accent"
          >
            다시 시도
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-ink ring-1 ring-line transition-colors hover:bg-paper-2"
          >
            처음으로
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "성격지도 · MBTI 성격 분석" },
      {
        name: "description",
        content:
          "네 개의 축으로 읽는 나의 성격. 28개의 질문에 답하면 MBTI 유형과 강점, 고민, 관계와 일의 성향을 읽어드립니다.",
      },
      { name: "author", content: "성격지도" },
      { property: "og:title", content: "성격지도 · MBTI 성격 분석" },
      {
        property: "og:description",
        content: "28개의 질문으로 찾는 나의 MBTI 유형. 네 개의 축이 너를 읽습니다.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: FONTS },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
