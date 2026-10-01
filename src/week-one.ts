import brief from "./materials/PROJECT_BRIEF.txt?raw";
import improvementsBrief from "./materials/IMPROVEMENTS_BRIEF.txt?raw";
import type { Prompt } from "./content";
import type { SlideId } from "./week-one-slides";

export { brief, improvementsBrief };
export const weekOneRepository =
  "https://github.com/HURDOO/kucc-vibe-study-week1.git";
// 1주차 발표 슬라이드(clone, open, impl1, impl2)의 프롬프트 문구 그대로
export const weekOnePrompts: Prompt[] = [
  {
    id: "1-1",
    title: "프로젝트 받아오기",
    category: "week1",
    when: "STEP 1 · 첫 번째 프롬프트",
    clone: true,
    text: "[실습 레포 주소] 를\n바탕화면에 git clone 해줘.",
    check:
      "붙여넣기 전에 Codex, ‘나 대신 승인’, GPT-6.1 Sol · Extra High 설정을 확인하고, 승인 요청이 뜨면 허락해요.",
  },
  {
    id: "1-2",
    title: "PROJECT_BRIEF 파일 열기",
    category: "week1",
    when: "STEP 2 · 받아온 폴더를 프로젝트로 연 다음",
    text: "PROJECT_BRIEF 파일 열어줘",
    check: "오른쪽 사이드 패널의 ‘파일’에서 PROJECT_BRIEF.txt를 띄워 둬요.",
  },
  {
    id: "1-3",
    title: "1차 구현 맡기기",
    category: "week1",
    when: "STEP 3 · PROJECT_BRIEF를 함께 읽은 다음",
    text: "PROJECT_BRIEF 기반으로 구현해줘",
    check:
      "모델은 GPT-6.1 Sol, 추론 수준은 Extra High. 중간에 승인을 요청하면 내용을 읽고 허락해요.",
  },
  {
    id: "1-4",
    title: "2차 구현 맡기기",
    category: "week1",
    when: "STEP 6 · IMPROVEMENTS_BRIEF.txt를 작성하고 저장한 다음",
    text: "IMPROVEMENTS_BRIEF 기반으로 구현해줘",
    check:
      "더 개선하고 싶다면 IMPROVEMENTS_BRIEF.txt를 복사해 새로 작성하고, 같은 프롬프트로 다시 맡겨요.",
  },
];

export const featureChecks = [
  {
    id: "pdf-open",
    label: "PDF를 불러올 수 있다",
    detail: "파일 선택과 드래그 앤 드롭으로 열고 페이지 미리보기를 확인해요.",
  },
  {
    id: "pdf-pages",
    label: "페이지를 추가·삭제·이동할 수 있다",
    detail:
      "빈 페이지를 추가하고, 두 번째 페이지를 삭제하고, 남은 페이지의 순서를 바꿔요.",
  },
  {
    id: "pdf-ink",
    label: "필기하고 지울 수 있다",
    detail: "연필로 선을 그린 뒤 지우개로 일부 필기를 지워요.",
  },
  {
    id: "pdf-merge",
    label: "다른 PDF를 합칠 수 있다",
    detail: "다른 PDF를 가져온 뒤 두 문서의 페이지가 모두 있는지 확인해요.",
  },
  {
    id: "pdf-save",
    label: "수정한 결과를 PDF로 저장할 수 있다",
    detail: "저장한 PDF를 다시 열어 페이지 순서와 필기, 지운 결과를 확인해요.",
  },
];

export const improvementIdeas = [
  {
    title: "연필 색상과 굵기",
    description: "중요도에 따라 필기 색과 선 굵기를 바꾸기",
  },
  {
    title: "실행 취소 (Ctrl+Z)",
    description: "실수로 그리거나 지운 내용을 되돌리기",
  },
  {
    title: "슬라이드 옆 메모 여백",
    description: "버튼으로 슬라이드 옆에 필기할 빈 공간 만들기",
  },
  { title: "페이지 회전", description: "옆으로 누운 페이지를 90도씩 돌리기" },
  {
    title: "텍스트 상자",
    description: "원하는 위치에 키보드로 짧은 메모 입력하기",
  },
  {
    title: "슬라이드 크기 조정",
    description: "페이지 안의 슬라이드를 줄이거나 키우기",
  },
];

export const undoBadExample = "Ctrl+Z 되게 해줘. 알아서 편하게 만들어줘.";
export const undoGoodExample = `### 개선 1: 실행 취소

- 해결하려는 문제: 필기를 잘못 지웠을 때 다시 그려야 한다.
- 기대 동작: 마지막 필기 추가 또는 지우기를 작업 전 상태로 되돌린다. 연필로 한 번 드래그한 선을 한 번의 작업으로 취급한다.
- 사용 방법: 실행 취소 버튼 또는 Windows Ctrl+Z / Mac Cmd+Z. 되돌릴 작업이 없으면 버튼을 비활성화한다.
- 이번 구현에서 제외할 사항: 페이지 편집 되돌리기, 다시 실행(Redo), 브라우저를 닫은 뒤 기록 유지.

## 완료 확인
1. 선을 그리고 실행 취소하면 그 선이 사라진다.
2. 필기를 지우고 실행 취소하면 지운 필기가 돌아온다.
3. 버튼과 단축키가 같은 결과를 낸다. 텍스트 입력 중에는 입력창의 실행 취소를 유지한다.
4. PDF를 저장해 다시 열었을 때 현재 필기 상태와 일치한다.

## 미정
- 되돌릴 수 있는 횟수와 구현 방식은 에이전트가 제안해줘.`;

const briefSectionSources: {
  title: string;
  slide: SlideId;
  from: string;
  to?: string;
  explanation: string;
}[] = [
  {
    title: "1–2. 목적과 문제",
    slide: "brief-12",
    from: "## 1.",
    to: "## 3.",
    explanation:
      "무엇을 만들지와 지금의 불편을 연결합니다. PDF를 다른 기기로 옮기는 번거로움이 출발점이에요.",
  },
  {
    title: "3. 대상 사용자",
    slide: "brief-3",
    from: "## 3.",
    to: "## 4.",
    explanation:
      "‘나’라는 사용자와 약 50페이지의 강의자료라는 실제 사용 조건을 정합니다.",
  },
  {
    title: "4. MVP의 핵심 기능",
    slide: "brief-4",
    from: "### 핵심 기능",
    to: "### 이번 MVP",
    explanation:
      "MVP는 실제로 써볼 수 있는 최소한의 첫 버전입니다. 필기, 페이지 관리, PDF 합치기가 오늘의 범위예요.",
  },
  {
    title: "4. 이번에 제외할 기능",
    slide: "brief-4",
    from: "### 이번 MVP",
    to: "### 대표 사용 흐름",
    explanation:
      "색상·굵기와 Ctrl+Z는 2차 개선 후보입니다. 첫 구현의 범위를 정하면 완성 여부도 확인하기 쉬워요.",
  },
  {
    title: "4. 대표 사용 흐름",
    slide: "brief-flow",
    from: "### 대표 사용 흐름",
    to: "## 5.",
    explanation:
      "불러오기부터 편집과 저장까지, 사용자가 실제로 누를 순서대로 읽어봅니다.",
  },
  {
    title: "5. 화면과 콘텐츠",
    slide: "brief-5",
    from: "## 5.",
    to: "## 6.",
    explanation:
      "PDF 화면, 왼쪽 페이지 목차, 필기와 저장 버튼의 위치를 지정합니다. 디자인 레퍼런스도 전달해요.",
  },
  {
    title: "6. 데이터와 연동",
    slide: "brief-67",
    from: "## 6.",
    to: "## 7.",
    explanation:
      "PDF를 불러오고 저장하는 방식을 정합니다. 외부 API와 로그인은 이번 범위에 없어요.",
  },
  {
    title: "7. 기술과 실행 환경",
    slide: "brief-67",
    from: "## 7.",
    to: "## 8.",
    explanation:
      "내 컴퓨터의 Chrome에서 여는 웹 도구로 시작합니다. 외부 API와 로그인은 이번 범위에 없어요.",
  },
  {
    title: "8–9. 참고 자료와 다음 단계",
    slide: "brief-89",
    from: "## 8.",
    explanation:
      "참고 제품은 원하는 사용성을 설명하는 출발점입니다. 첫 버전을 사용한 뒤 개선할 기능을 정해요.",
  },
];

export const briefSections = briefSectionSources.map(
  ({ from, to, ...section }) => ({
    ...section,
    excerpt: brief
      .slice(brief.indexOf(from), to ? brief.indexOf(to) : undefined)
      .trim(),
  }),
);

export const sources = {
  opus: {
    label: "Claude Opus 5.5 안내",
    href: "https://www.anthropic.com/claude-opus-5-5",
  },
  models: {
    label: "OpenAI 모델 안내",
    href: "https://developers.openai.com/api/docs/models",
  },
  sandbox: {
    label: "Sandbox와 승인",
    href: "https://learn.chatgpt.com/docs/sandboxing",
  },
  agents: {
    label: "에이전트 구조",
    href: "https://developers.openai.com/api/docs/guides/agents-api/architecture",
  },
  subagents: {
    label: "서브에이전트",
    href: "https://learn.chatgpt.com/docs/agent-configuration/subagents",
  },
};
export const modelRows = [
  ["GPT-6.1 Sol", "오늘의 1·2차 구현", "코딩과 에이전트 작업에 사용"],
  ["GPT-6 Luna", "범위가 작은 수정 예시", "정해진 작업의 효율을 중시"],
  ["GPT-6 Astra", "복잡한 판단 예시", "어려운 추론과 전체 작업에 사용"],
  [
    "Claude Opus 5.5",
    "다른 도구의 구현 담당 예시",
    "Anthropic의 코딩·에이전트 모델",
  ],
];
