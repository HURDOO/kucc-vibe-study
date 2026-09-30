import { codexTopics, type CodexVisualKind } from "./codex-intro";
import brief from "./materials/PROJECT_BRIEF.txt?raw";
import improvementsBrief from "./materials/IMPROVEMENTS_BRIEF.txt?raw";
import type { Prompt } from "./content";

export { brief, improvementsBrief };
export const weekOneRepository =
  "https://github.com/HURDOO/kucc-vibe-study-week1.git";
export const weekOnePrompts: Prompt[] = [
  {
    id: "1-1",
    title: "실습 레포를 바탕화면에 가져오기",
    category: "week1",
    when: "처음 시작할 때 · 첫 번째 프롬프트",
    clone: true,
    text: "[실습 레포 주소]를 내 컴퓨터의 실제 바탕화면 위치에 git clone해줘.\n폴더 이름은 kucc-vibe-study-week1로 해줘.\n\n같은 이름의 폴더가 이미 있으면 덮어쓰지 말고 알려줘.\n완료하면 폴더의 전체 경로를 알려줘. 아직 구현은 시작하지 마.",
    check:
      "복제가 끝나면 바탕화면의 kucc-vibe-study-week1 폴더를 프로젝트로 열어요.",
  },
  {
    id: "1-2",
    title: "PROJECT_BRIEF 파일 열기",
    category: "week1",
    when: "복제한 폴더를 프로젝트로 연 다음",
    text: "이 프로젝트의 PROJECT_BRIEF.txt 파일을 열어줘.\n파일을 읽을 수 있게 보여주고, 아직 구현은 시작하지 마.",
    check: "사이드 패널의 ‘파일’에서 PROJECT_BRIEF.txt를 열고 함께 읽어요.",
  },
  {
    id: "1-3",
    title: "Sol에게 1차 구현 요청하기",
    category: "week1",
    when: "PROJECT_BRIEF 설명을 함께 읽은 다음 · Sol 선택",
    text: "PROJECT_BRIEF.txt 기반으로 구현해줘.\n필요한 설치와 실행, 동작 확인까지 진행해줘.\n완료하면 내가 도구를 열어 사용하는 방법을 알려줘.",
    check:
      "작업이 시작되면 Codex 설명을 듣고, 구현이 끝나면 기본 기능을 확인해요.",
  },
  {
    id: "1-4",
    title: "IMPROVEMENTS_BRIEF 파일 열기",
    category: "week1",
    when: "1차 결과물을 써보고, 개선할 내용을 기록할 때",
    text: "이 프로젝트의 IMPROVEMENTS_BRIEF.txt 파일을 열어줘.\n내가 개선 내용을 적을 수 있게 보여주고, 아직 구현은 시작하지 마.",
    check:
      "파일에서 직접 편집하기 어렵다면 메모장 등 텍스트 편집기로 열고 같은 프로젝트 폴더에 저장해요.",
  },
  {
    id: "1-5",
    title: "Sol에게 2차 구현 요청하기",
    category: "week1",
    when: "IMPROVEMENTS_BRIEF.txt를 작성하고 저장한 다음 · Sol 선택",
    text: "IMPROVEMENTS_BRIEF.txt 기반으로 구현해줘.\n먼저 저장된 파일을 읽고 이번에 바꿀 내용을 확인해줘.\n미정인 기술 사항은 기존 프로젝트에 맞게 판단하고,\n원하는 결과가 불분명한 부분은 먼저 제안해줘.\n\n구현 후 기본 PDF 불러오기, 페이지 추가·삭제·이동, 필기·지우기,\nPDF 합치기와 저장이 계속 작동하는지도 확인해줘.",
    check: "추가한 기능을 직접 써보고, 저장한 PDF를 다시 열어 결과를 확인해요.",
  },
  {
    id: "1-6",
    title: "다음에도 다시 실행하기",
    category: "week1",
    when: "수업을 마치기 전",
    text: "다음에 이 프로젝트를 다시 열었을 때 도구를 실행하는 방법을\nREADME.md에 초보자도 따라 할 수 있게 적어줘.\n지금 사용 중인 운영체제에 맞춰 설명하고, 종료하는 방법도 알려줘.",
    check:
      "다음 개선은 IMPROVEMENTS_BRIEF.txt를 새로 작성하고 2차 구현 프롬프트를 다시 사용해요.",
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

export const briefSections = [
  {
    title: "1–2. 목적과 문제",
    from: "## 1.",
    to: "## 3.",
    explanation:
      "무엇을 만들지와 지금의 불편을 연결합니다. PDF를 다른 기기로 옮기는 번거로움이 출발점이에요.",
  },
  {
    title: "3. 대상 사용자",
    from: "## 3.",
    to: "## 4.",
    explanation:
      "‘나’라는 사용자와 약 50페이지의 강의자료라는 실제 사용 조건을 정합니다.",
  },
  {
    title: "4. MVP의 핵심 기능",
    from: "### 핵심 기능",
    to: "### 이번 MVP",
    explanation:
      "MVP는 실제로 써볼 수 있는 최소한의 첫 버전입니다. 필기, 페이지 관리, PDF 합치기가 오늘의 범위예요.",
  },
  {
    title: "4. 이번에 제외할 기능",
    from: "### 이번 MVP",
    to: "### 대표 사용 흐름",
    explanation:
      "색상·굵기와 Ctrl+Z는 2차 개선 후보입니다. 첫 구현의 범위를 정하면 완성 여부도 확인하기 쉬워요.",
  },
  {
    title: "4. 대표 사용 흐름",
    from: "### 대표 사용 흐름",
    to: "## 5.",
    explanation:
      "불러오기부터 편집과 저장까지, 사용자가 실제로 누를 순서대로 읽어봅니다.",
  },
  {
    title: "5. 화면과 콘텐츠",
    from: "## 5.",
    to: "## 6.",
    explanation:
      "PDF 화면, 왼쪽 페이지 목차, 필기와 저장 버튼의 위치를 지정합니다. 디자인 레퍼런스도 전달해요.",
  },
  {
    title: "6. 데이터와 연동",
    from: "## 6.",
    to: "## 7.",
    explanation:
      "PDF를 불러오고 저장하는 방식을 정합니다. 외부 API와 로그인은 이번 범위에 없어요.",
  },
  {
    title: "7. 기술과 실행 환경",
    from: "## 7.",
    to: "## 8.",
    explanation:
      "내 컴퓨터의 Chrome에서 여는 웹 도구로 시작합니다. 외부 API와 로그인은 이번 범위에 없어요.",
  },
  {
    title: "8–9. 참고 자료와 다음 단계",
    from: "## 8.",
    explanation:
      "참고 제품은 원하는 사용성을 설명하는 출발점입니다. 첫 버전을 사용한 뒤 개선할 기능을 정해요.",
  },
].map(({ from, to, ...section }) => ({
  ...section,
  excerpt: brief
    .slice(brief.indexOf(from), to ? brief.indexOf(to) : undefined)
    .trim(),
}));

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
  ["GPT-6 Sol", "오늘의 1·2차 구현", "코딩과 에이전트 작업에 사용"],
  ["GPT-6 Luna", "범위가 작은 수정 예시", "정해진 작업의 효율을 중시"],
  ["GPT-6 Astra", "복잡한 판단 예시", "어려운 추론과 전체 작업에 사용"],
  [
    "Claude Opus 5.5",
    "다른 도구의 구현 담당 예시",
    "Anthropic의 코딩·에이전트 모델",
  ],
];

export type Slide = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  note: string;
  type: "cover" | "content" | "brief" | "end";
  items?: string[];
  excerpt?: string;
  visual?: CodexVisualKind;
  table?: string[][];
  links?: { label: string; href: string }[];
};
export const slides: Slide[] = [
  {
    id: "welcome",
    eyebrow: "WEEK 01 · KUCC VIBE CODING",
    title: "내가 쓸\nPDF 편집기 만들기",
    body: "준비된 브리프로 첫 버전을 만들고, 직접 써본 경험으로 한 번 더 개선합니다.",
    note: "PROJECT_BRIEF.txt · IMPROVEMENTS_BRIEF.txt",
    type: "cover",
  },
  {
    id: "clone",
    eyebrow: "01 / 실습 시작",
    title: "첫 번째 프롬프트",
    body: "프롬프트 모음의 첫 항목을 복사해 Codex에 붙여넣고 엔터를 누르세요.",
    excerpt: weekOnePrompts[0].text.replace(
      "[실습 레포 주소]",
      weekOneRepository,
    ),
    note: "완료되면 바탕화면에 kucc-vibe-study-week1 폴더가 생깁니다.",
    links: [{ label: "프롬프트 모음 열기", href: "#/prompts?category=week1" }],
    type: "content",
  },
  {
    id: "icebreak",
    eyebrow: "02 / 복제를 기다리며",
    title: "함께 만들 사람들",
    body: "학과와 학년, AI를 얼마나 써봤는지 이야기해요.",
    items: [
      "어떤 전공을 공부하고 있나요?",
      "AI로 해본 일이나 만들고 싶은 것이 있나요?",
    ],
    note: "스터디장 예시: 컴퓨터학과 1학년 / 기기 간 파일 공유 클라우드 / 수업 슬라이드와 녹음으로 복습 필기본 만들기",
    type: "content",
  },
  {
    id: "open",
    eyebrow: "03 / 프로젝트 열기",
    title: "폴더를 프로젝트로 열기",
    body: "바탕화면의 kucc-vibe-study-week1 폴더를 프로젝트로 선택하세요. 그 안에서 새 대화를 엽니다.",
    excerpt: weekOnePrompts[1].text,
    note: "사이드 패널의 ‘파일’에서 PROJECT_BRIEF.txt를 확인해요. 열리지 않으면 텍스트 편집기로 읽어도 됩니다.",
    type: "content",
  },
  {
    id: "mvp",
    eyebrow: "04 / 브리프 읽기",
    title: "무엇부터 만들까?",
    body: "MVP는 핵심 사용 흐름을 실제로 써볼 수 있는 최소한의 첫 버전입니다.",
    items: [
      "먼저 해결할 불편을 정하기",
      "첫 버전의 기능과 기술 범위 정하기",
      "직접 사용하며 다음 개선점 찾기",
    ],
    note: "AI에게 구현을 맡길수록, 원하는 결과와 완료 기준을 설명하는 일이 중요해집니다.",
    type: "content",
  },
  ...briefSections.map((section, i): Slide => ({
    id: `brief-${i + 1}`,
    eyebrow: "04 / PROJECT_BRIEF 원문 함께 읽기",
    title: section.title,
    body: "",
    excerpt: section.excerpt
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/\n{2,}/g, "\n"),
    note: section.explanation,
    type: "brief",
  })),
  {
    id: "build",
    eyebrow: "05 / 1차 구현",
    title: "Sol에게 첫 구현 맡기기",
    body: "모델을 Sol로 선택하고, 지금 연 프로젝트에서 요청하세요.",
    excerpt: weekOnePrompts[2].text,
    note: "구현을 시작하면 이어서 Codex가 어떻게 일하는지 살펴봅니다.",
    type: "content",
  },
  ...codexTopics.map(({ id, title, body, note, visual, links }): Slide => ({
    id,
    title,
    body,
    note,
    visual,
    links,
    eyebrow: "06 / Codex가 무엇인가",
    type: "content",
  })),
  {
    id: "verify",
    eyebrow: "07 / 1차 결과물 확인",
    title: "기본 기능 체크리스트",
    body: "연습용 PDF 두 개를 준비하고, 저장한 결과를 다시 열어 확인해요.",
    items: featureChecks.map((x) => x.label),
    note: "먼저 다음 개선 브리프 작성법까지 함께 본 뒤, 각자 결과물을 써봅니다.",
    links: [{ label: "사이트에서 체크하기", href: "#/week/1?section=verify" }],
    type: "content",
  },
  {
    id: "improvements",
    eyebrow: "08 / 2차 구현 준비",
    title: "IMPROVEMENTS_BRIEF",
    body: "직접 써보며 발견한 불편과 원하는 동작을 적는 문서입니다. 이번에는 각자의 내용이 달라집니다.",
    items: [
      "실제로 불편했던 상황",
      "개선 후 기대하는 동작",
      "완료됐는지 확인할 방법",
    ],
    note: "‘파일’에서 편집하거나 메모장으로 열어 저장하세요. 모든 칸을 채울 필요는 없고, 모르면 ‘미정’으로 두거나 먼저 제안받아도 됩니다.",
    type: "content",
  },
  {
    id: "ideas",
    eyebrow: "08 / 개선 후보",
    title: "내가 필요한 기능 고르기",
    body: "여러 개를 골라도 괜찮아요. 가장 필요한 것부터 순서를 정해요.",
    items: improvementIdeas.map((x) => `${x.title} — ${x.description}`),
    note: "슬라이드 크기 조정은 화면 확대와 저장할 PDF 안의 크기 변경 중 원하는 동작을 명시해요.",
    type: "content",
  },
  {
    id: "undo-bad",
    eyebrow: "08 / Ctrl+Z 작성 예시",
    title: "아쉬운 예",
    excerpt: undoBadExample,
    body: "무엇을 되돌려야 할지, 한 번에 어디까지 되돌릴지 알기 어렵습니다.",
    note: "필기, 페이지 삭제, 파일 합치기는 서로 다른 작업입니다.",
    type: "content",
  },
  {
    id: "undo-good",
    eyebrow: "08 / Ctrl+Z 작성 예시",
    title: "구체적인 예",
    excerpt: undoGoodExample.split("\n\n## 완료 확인")[0],
    body: "",
    note: "동작과 제외할 범위를 정하고, 구현 방식은 ‘미정’으로 맡겨도 됩니다.",
    type: "brief",
  },
  {
    id: "undo-check",
    eyebrow: "08 / Ctrl+Z 완료 기준",
    title: "확인할 수 있는 요청",
    body: "원하는 결과를 직접 해볼 수 있는 문장으로 적습니다.",
    items: [
      "선을 그리고 취소하면 그 선이 사라진다.",
      "필기를 지우고 취소하면 지운 필기가 돌아온다.",
      "버튼과 Windows Ctrl+Z / Mac Cmd+Z가 같은 결과를 낸다.",
      "저장한 PDF가 현재 화면의 필기 상태와 일치한다.",
    ],
    note: "이제 각자 1차 결과물을 써보고 IMPROVEMENTS_BRIEF.txt를 작성합니다.",
    type: "content",
  },
  {
    id: "build-again",
    eyebrow: "09 / 2차 구현",
    title: "Sol에게 개선 맡기기",
    body: "수정한 IMPROVEMENTS_BRIEF.txt를 프로젝트 폴더에 저장한 뒤 요청하세요.",
    excerpt: weekOnePrompts[4].text,
    note: "파일을 읽고 정리한 변경 범위가 내가 적은 의도와 맞는지 확인해요.",
    type: "content",
  },
  {
    id: "models",
    eyebrow: "10 / 구현을 기다리며",
    title: "작업에 따라 모델 고르기",
    body: "오늘은 Sol로 실습합니다. 아래 역할은 모델 특성을 활용한 수업용 예시입니다.",
    table: [["모델", "수업에서의 역할", "특성"], ...modelRows],
    note: "2026-09-27 공식 문서 확인. 실제 모델 선택지는 계정과 앱 설정에서 확인해요.",
    links: [sources.models, sources.opus],
    type: "content",
  },
  {
    id: "parallel",
    eyebrow: "10 / 에이전트 협업",
    title: "여러 에이전트의 역할 분담",
    body: "주도하는 에이전트가 일을 나누고, 각 결과를 모아 확인하는 방식도 있습니다.",
    items: [
      "구현 담당: 전체 흐름을 연결",
      "수정 담당: 나눈 범위 안에서 작업",
      "검토 담당: 어려운 결정과 결과 확인",
    ],
    note: "여러 모델을 연결한 환경의 예: Opus가 구현 주도, Luna가 수정, Astra가 판단. 도구별 연결 설정이 필요하며 오늘은 Sol로 실습합니다.",
    links: [sources.subagents, sources.models],
    type: "content",
  },
  {
    id: "community",
    eyebrow: "10 / 함께 나눌 이야기",
    title: "바이브코딩 사용법 읽기",
    body: "Reddit이나 Threads에서 본 사용법을 이야기하고, 내 작업에 적용할 수 있는지 살펴봅니다.",
    items: [
      "어떤 문제를 어떤 요청으로 풀었나?",
      "실제 결과와 실패 사례도 보여주는가?",
      "같은 방법을 내 프로젝트에서 확인할 수 있나?",
    ],
    note: "새 모델과 업데이트 이야기는 발표일의 공식 공지를 함께 확인해요. 커뮤니티의 체감과 전체 시장의 변화는 구분해서 읽습니다.",
    type: "content",
  },
  {
    id: "domain",
    eyebrow: "10 / 전공 지식 활용하기",
    title: "내가 아는 문제를 설명하는 힘",
    body: "PROJECT_BRIEF는 문제와 원하는 결과를 구체화하는 첫 연습입니다. 전공 지식은 더 정확한 조건과 확인 기준을 제시하는 데 쓰입니다.",
    items: [
      "컴퓨터 전공: 시스템 구조, 서버 관리, 기술 선택",
      "다른 전공: 분야의 용어, 실제 업무 흐름, 예외 조건",
      "나의 실습: 강의자료를 읽고 필기하는 방식",
    ],
    note: "함께 생각할 질문: 구현 속도가 빨라질수록 나는 어떤 판단을 더 잘해야 할까?",
    type: "content",
  },
  {
    id: "finish",
    eyebrow: "11 / 2차 결과물 확인",
    title: "개선한 기능 직접 써보기",
    body: "내가 적은 완료 기준과 기본 기능 체크리스트를 다시 확인하세요. 저장한 PDF도 다시 열어봅니다.",
    items: [
      "원했던 불편이 해결됐나요?",
      "기존 기본 기능도 작동하나요?",
      "다음에 다시 실행할 수 있나요?",
    ],
    note: "더 만들고 싶다면 IMPROVEMENTS_BRIEF.txt를 복사해 새 개선 내용을 적고, 다시 구현을 요청하면 됩니다.",
    type: "content",
  },
  {
    id: "next",
    eyebrow: "12 / 다음 회차",
    title: "AGENTS.md와 Skills\n서버와 클라이언트",
    body: "에이전트에게 작업 규칙과 반복할 절차를 알려주고, 웹 서비스가 통신하는 구조를 살펴봅니다.",
    note: "오늘의 결과: 첫 PDF 편집기와 내가 정한 개선 경험",
    type: "end",
  },
];

export function slideHref(id: string) {
  return `#/slides/1/${slides.findIndex((slide) => slide.id === id) + 1}`;
}
