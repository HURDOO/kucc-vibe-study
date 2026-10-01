import { slideIcon } from "./slide-icons";

// claude.ai Artifact "KUCC 바이브코딩 스터디 1주차" 덱의 슬라이드 원문(1920×1080)
const files = import.meta.glob<string>("./slides/week1/*.html", {
  query: "?raw",
  import: "default",
  eager: true,
});

export const slideOrder = [
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
export type SlideId = (typeof slideOrder)[number];

function titleOf(html: string) {
  const heading = html.match(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/)?.[1] ?? "";
  const text = new DOMParser().parseFromString(
    heading.replace(/<br\s*\/?>/g, " "),
    "text/html",
  ).body.textContent;
  return (text ?? "").replace(/\s+/g, " ").trim();
}

export const slides = slideOrder.map((id) => {
  const html = files[`./slides/week1/${id}.html`];
  if (!html) throw new Error(`슬라이드 파일이 없습니다: ${id}`);
  return {
    id,
    title: titleOf(html),
    html: html
      .replace(
        /(<x-icon name="(\w+)"[^>]*>)(<\/x-icon>)/g,
        (_, open: string, name: string, close: string) =>
          open + slideIcon(name) + close,
      )
      // Artifact 형식의 gap은 값 하나만 받으므로 두 값 gap은 적용되지 않는다
      .replace(/gap:\s*\d+px\s+\d+px;?/g, ""),
  };
});

export function slideHref(id: SlideId) {
  return `#/slides/1/${slideOrder.indexOf(id) + 1}`;
}
