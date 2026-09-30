export type CodexVisualKind =
  | "completion"
  | "code"
  | "tool-call"
  | "relationship"
  | "read-edit"
  | "loop"
  | "sandbox"
  | "project"
  | "approvals"
  | "review";

const reference = {
  tokens: {
    label: "텍스트와 토큰",
    href: "https://developers.openai.com/api/docs/concepts",
  },
  probabilities: {
    label: "토큰의 확률",
    href: "https://developers.openai.com/cookbook/examples/using_logprobs",
  },
  tools: {
    label: "도구 호출 과정",
    href: "https://developers.openai.com/api/docs/guides/function-calling",
  },
  agents: {
    label: "에이전트 구조",
    href: "https://developers.openai.com/api/docs/guides/agents-api/architecture",
  },
  sandbox: {
    label: "Sandbox와 승인",
    href: "https://learn.chatgpt.com/docs/sandboxing",
  },
  projects: {
    label: "프로젝트와 대화",
    href: "https://learn.chatgpt.com/docs/projects",
  },
  review: {
    label: "자동 승인 검토",
    href: "https://learn.chatgpt.com/docs/sandboxing/auto-review",
  },
};

export const greetingCode = 's = input()\nprint(s, "Hello World!")';
export const revisedGreetingCode = 's = input()\nprint(s, "Hello KUCC!")';
export const writeToolExample = `tool: 파일 쓰기
file name: main.py
content:
  ${greetingCode.replace(/\n/g, "\n  ")}`;
export const editToolExample = `tool: 파일 쓰기
file name: main.py
content:
  ${revisedGreetingCode.replace(/\n/g, "\n  ")}`;

type CodexTopic = {
  id: string;
  title: string;
  body: string;
  note: string;
  visual: CodexVisualKind;
  explanation: string[];
  links: { label: string; href: string }[];
};

export const codexTopics: CodexTopic[] = [
  {
    id: "llm-tools",
    title: "LLM은 다음 내용을 생성합니다",
    body: "앞의 문맥을 바탕으로 다음에 이어질 텍스트를 예측하고, 조금씩 이어 붙입니다.",
    visual: "completion",
    note: "확률은 설명을 위해 만든 가상 수치입니다. 실제로는 텍스트를 나눈 ‘토큰’ 단위로 생성합니다.",
    explanation: [
      "먼저 LLM부터 볼게요. ‘오늘 날씨는’이라는 문장을 보면 뒤에 어떤 말이 이어질지 떠올릴 수 있죠. LLM도 앞에 주어진 문맥을 바탕으로 다음 토큰의 확률을 계산하고, 텍스트를 이어서 생성합니다.",
      "여기서는 맑다 70%, 흐리다 25%, 맛있다 5%로 그려봤습니다. 실제 모델의 측정값이나 일기예보가 아니라 원리를 보여주는 예시예요. 자연스럽게 이어지는 문장을 만드는 것과 사실이 맞는지는 따로 확인해야 합니다.",
    ],
    links: [reference.tokens, reference.probabilities],
  },
  {
    id: "llm-code",
    title: "코드도 이어서 쓸 수 있어요",
    body: "우리가 원하는 동작과 앞의 코드를 문맥으로 주면, 그에 맞는 코드를 생성합니다.",
    visual: "code",
    note: "이름을 입력받아 인사하는 예시입니다. 생성된 코드는 실행해서 동작을 확인해야 합니다.",
    explanation: [
      "프로그래밍 언어도 텍스트입니다. ‘이름을 입력받아서 인사해줘’라는 요청과 앞의 코드를 주면, 그 다음 코드를 이어서 만들 수 있어요. 대화창에서 코드를 받아 복사해본 경험도 이 과정에 해당합니다.",
      "그런데 코드를 화면에 보여주는 것만으로는 우리 프로젝트 파일이 바뀌지 않아요. 실제 파일에 저장하고 실행하는 동작을 연결하려면 도구가 필요합니다.",
    ],
    links: [reference.tokens],
  },
  {
    id: "tool-call",
    title: "출력을 실제 동작에 연결하기",
    body: "모델이 도구 이름과 입력값을 보내면, 실행 프로그램이 그 요청을 받아 처리합니다.",
    visual: "tool-call",
    note: "예시의 호출 형식은 설명용 의사 코드입니다. 실제 도구 이름과 호출 형식은 환경마다 다릅니다.",
    explanation: [
      "모델에게 사용할 수 있는 도구와 입력 형식을 알려줬다고 해봅시다. 모델이 ‘main.py에 이 내용을 써줘’라는 도구 호출을 만들면, 이를 받은 프로그램이 실제로 파일을 쓰는 겁니다.",
      "중요한 연결은 ‘모델의 요청을 실행하는 프로그램’이에요. 대화창에 이 모양의 글을 적었다고 저절로 파일이 생기지는 않습니다. 도구 호출을 해석하고 실행하는 기능이 연결돼 있어야 해요.",
    ],
    links: [reference.tools],
  },
  {
    id: "codex-relationship",
    title: "GPT, Codex, ChatGPT 앱",
    body: "GPT가 다음 작업을 판단하면, Codex가 도구 실행과 결과 전달을 이어줍니다.",
    visual: "relationship",
    note: "오늘 사용하는 ChatGPT 앱에서의 개념도입니다. Codex는 도구 실행뿐 아니라 대화 맥락과 작업 진행도 관리합니다.",
    explanation: [
      "이제 이름들을 연결해볼게요. GPT는 요청을 이해하고 코드나 도구 호출을 생성하는 모델입니다. Codex는 그 모델에 파일 읽기, 파일 수정, 명령 실행 같은 도구를 연결하고 작업을 이어가는 코딩 에이전트입니다.",
      "오늘은 ChatGPT 앱이라는 창을 통해 Codex와 대화하고 있어요. 작업실에 비유하면 GPT는 다음에 무엇을 할지 판단하는 역할, Codex는 그 판단을 실제 작업으로 연결하는 운영 체계, 도구는 작업에 사용하는 장비에 가깝습니다.",
    ],
    links: [reference.agents, reference.projects],
  },
  {
    id: "read-edit",
    title: "읽고, 결과를 받고, 수정하기",
    body: "“Hello World를 Hello KUCC로 바꿔줘”라는 요청이 실제 파일 수정으로 이어지는 과정입니다.",
    visual: "read-edit",
    note: "Codex는 도구 결과를 모델에 돌려줍니다. 모델은 읽어온 내용을 바탕으로 다음 호출을 만듭니다.",
    explanation: [
      "GPT가 현재 코드를 알아야 한다면 먼저 파일 읽기 도구를 호출합니다. Codex가 main.py를 읽어서 그 내용을 모델에게 돌려주면, 모델은 Hello World라는 문구가 어디 있는지 확인할 수 있어요.",
      "그 내용을 바탕으로 Hello KUCC로 바꾼 코드를 만들고 다시 파일 쓰기를 요청합니다. Codex가 허용된 범위에서 이를 실행하면 우리 프로젝트의 파일이 실제로 바뀝니다. 실제 작업에서는 바뀐 부분만 수정하는 도구를 쓰기도 합니다.",
    ],
    links: [reference.tools],
  },
  {
    id: "agent-loop",
    title: "이 반복이 Agent loop입니다",
    body: "모델의 판단, 도구 실행, 결과 확인을 반복하며 요청한 작업을 진행합니다.",
    visual: "loop",
    note: "오류 메시지도 다음 판단의 재료가 됩니다. 목표를 정하고 최종 결과를 직접 확인하는 역할은 우리에게 있어요.",
    explanation: [
      "파일을 한 번 쓰고 끝나는 게 아니라, 실행해보고 결과를 다시 읽을 수 있습니다. 오류가 나오면 그 메시지를 바탕으로 코드를 고치고, 다시 실행해보는 식이죠. 이 반복을 에이전트 루프라고 부릅니다.",
      "지금 PDF 편집기를 만드는 과정도 같습니다. 브리프를 읽고, 파일을 만들고, 실행 결과를 확인하고, 필요하면 수정하고 있어요. 그래서 짧게 ‘브리프 기반으로 구현해줘’라고 해도 여러 작업이 이어질 수 있습니다.",
    ],
    links: [reference.tools, reference.agents],
  },
  {
    id: "sandbox",
    title: "Sandbox가 작업 범위를 제한합니다",
    body: "로컬 명령이 어떤 파일을 바꾸고 네트워크에 접근할 수 있는지 경계를 정합니다.",
    visual: "sandbox",
    note: "허용된 파일의 수정은 내 컴퓨터에 실제로 반영됩니다. 접근 범위는 운영체제와 권한 설정에 따라 달라집니다.",
    explanation: [
      "도구가 실제로 파일을 쓰고 명령을 실행한다면, 그 권한도 중요해집니다. 로컬 Codex의 Sandbox는 명령이 접근하거나 수정할 수 있는 범위를 제한하는 장치예요.",
      "가상의 연습 공간에서만 작업하는 것으로 생각하면 안 됩니다. 허용된 프로젝트 파일은 실제로 생성·수정될 수 있어요. 허용 범위를 벗어나는 동작은 차단되거나, 정책에 따라 추가 승인을 요청합니다. 승인의 적용 범위는 요청마다 확인합니다.",
    ],
    links: [reference.sandbox],
  },
  {
    id: "codex-project",
    title: "프로젝트는 작업할 폴더를 연결해요",
    body: "오늘 연 kucc-vibe-study-week1 폴더가 브리프와 코드를 읽고 수정하는 작업의 기준입니다.",
    visual: "project",
    note: "폴더 밖의 읽기가 항상 금지되는 것은 아닙니다. 실제 접근·수정 범위는 Sandbox와 권한 설정이 결정합니다.",
    explanation: [
      "아까 바탕화면의 폴더를 프로젝트로 연 이유가 여기에 있어요. 로컬 프로젝트는 관련 대화와 작업 폴더를 연결해서, 어느 브리프를 읽고 어디에 코드를 만들지 기준을 줍니다.",
      "일반적인 workspace-write 설정에서는 프로젝트 안의 수정을 허용하고, 허용된 수정 범위 밖의 작업에는 추가 확인이 필요할 수 있어요. 프로젝트라는 이름만으로 완전한 격리가 생기지는 않으며, 읽기와 쓰기의 허용 범위도 다를 수 있습니다.",
    ],
    links: [reference.projects, reference.sandbox],
  },
  {
    id: "codex-approvals",
    title: "승인이 필요할 때, 누가 검토할까?",
    body: "‘승인 요청’과 ‘나 대신 승인’은 승인이 필요한 작업을 검토하는 주체가 다릅니다.",
    visual: "approvals",
    note: "이미 허용된 작업은 매번 묻지 않습니다. 자동 검토를 켜도 Sandbox의 허용 범위가 넓어지지는 않아요.",
    explanation: [
      "‘승인 요청’ 모드는 추가 승인이 필요한 작업을 사용자에게 보여줍니다. 명령어를 실행할 때마다 무조건 질문하는 방식은 아니에요. 현재 허용 범위 안에서 가능한 작업은 그대로 이어갑니다.",
      "‘나 대신 승인’은 해당 승인 요청을 별도의 검토 에이전트에게 맡기는 기능입니다. 실행하려는 동작과 전달받은 대화 맥락을 함께 보고 판단해요. 모든 앱 권한 요청이 자동 검토로 바뀌는 것은 아니며, 제공 여부도 계정과 설정에 따라 달라집니다.",
    ],
    links: [reference.sandbox, reference.review],
  },
  {
    id: "codex-review",
    title: "요청한 범위까지 함께 확인해요",
    body: "예를 들어, 로컬 구현만 요청했는데 외부 업로드를 시도해 승인 검토에 들어왔다면?",
    visual: "review",
    note: "설명용 상황과 메시지입니다. 검토 대상과 정책에 따라 결과가 달라지며, 자동 검토도 실수할 수 있습니다.",
    explanation: [
      "우리가 ‘내 컴퓨터에서 쓸 PDF 편집기를 만들어줘’라고만 했는데, 작업 에이전트가 코드를 외부에 올리려는 상황을 생각해봅시다. 이 동작이 승인 검토에 들어오면, 검토 에이전트는 업로드 권한까지 받았는지 함께 확인할 수 있어요.",
      "허용 근거가 부족하면 ‘사용자가 외부 업로드를 허용하지 않았다’는 취지로 차단할 수 있습니다. 검토에는 해당 동작과 요약된 대화·도구 기록이 전달됩니다. 모든 업로드가 반드시 검토되거나 차단되는 것은 아니므로, 자동 검토와 별개로 작업 범위도 잘 정해야 합니다.",
    ],
    links: [reference.review],
  },
];
