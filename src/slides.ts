import { slideIcon } from "./slide-icons";
import weekTwoDeck from "./slides/week2/deck.json";

// claude.ai Artifact 덱의 슬라이드 원문(1920×1080)
const files = import.meta.glob<string>("./slides/week*/*.html", {
  query: "?raw",
  import: "default",
  eager: true,
});

// "KUCC 바이브코딩 스터디 1주차" 덱의 순서
const weekOneOrder = [
  "cover",
  "leader",
  "agenda",
  "clone",
  "icebreak",
  "open",
  "div-brief",
  "direction",
  "mvp",
  "brief-form",
  "brief-12",
  "brief-3",
  "brief-4",
  "brief-flow",
  "brief-5",
  "brief-67",
  "brief-89",
  "impl1",
  "div-codex",
  "llm",
  "llm-code",
  "tool",
  "gpt-codex",
  "loop",
  "div-sandbox",
  "sandbox",
  "project-scope",
  "approval",
  "div-review",
  "checklist",
  "improve",
  "brief-guide",
  "impl2",
  "div-industry",
  "community",
  "models",
  "parallel",
  "div-major",
  "bottleneck",
  "cs",
  "majors",
  "div-wrap",
  "check2",
  "next",
  "end",
] as const;
export type SlideId = (typeof weekOneOrder)[number];
export type DeckWeek = 1 | 2;

function titleOf(html: string) {
  const heading = html.match(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/)?.[1] ?? "";
  const text = new DOMParser().parseFromString(
    heading.replace(/<br\s*\/?>/g, " "),
    "text/html",
  ).body.textContent;
  return (text ?? "").replace(/\s+/g, " ").trim();
}

function buildDeck(week: DeckWeek, order: readonly string[]) {
  return order
    .map((id) => {
      const html = files[`./slides/week${week}/${id}.html`];
      if (!html) throw new Error(`슬라이드 파일이 없습니다: week${week}/${id}`);
      return { id, html };
    })
    .filter(({ html }) => !/^<section\b[^>]*\shidden[\s>=]/.test(html))
    .map(({ id, html }) => {
      let body = html.replace(
        /(<x-icon name="(\w+)"[^>]*>)(<\/x-icon>)/g,
        (_, open: string, name: string, close: string) =>
          open + slideIcon(name) + close,
      );
      // 1주차를 만들 당시 Artifact는 값 두 개짜리 gap을 적용하지 않았다.
      // 2주차 PDF에서는 grid의 행·열 gap이 모두 적용되어 그대로 둔다.
      if (week === 1) body = body.replace(/gap:\s*\d+px\s+\d+px;?/g, "");
      // 지금 Artifact는 400px보다 큰 글자 크기를 무시하고 기본 크기로 그린다(2주차 PDF 기준).
      else
        body = body.replace(/font-size:\s*(\d+)px;?/g, (match, size: string) =>
          Number(size) > 400 ? "" : match,
        );
      return { id, title: titleOf(html), html: body };
    });
}

export const decks = {
  1: { title: "1주차", slides: buildDeck(1, weekOneOrder) },
  2: { title: "2주차", slides: buildDeck(2, weekTwoDeck.order) },
} satisfies Record<DeckWeek, { title: string; slides: unknown[] }>;

export function deckSlideHref(week: DeckWeek, id: string) {
  const index = decks[week].slides.findIndex((slide) => slide.id === id);
  if (index < 0) console.error(`${week}주차 덱에 없는 슬라이드: ${id}`);
  return `#/slides/${week}/${Math.max(index, 0) + 1}`;
}

export function slideHref(id: SlideId) {
  return deckSlideHref(1, id);
}
