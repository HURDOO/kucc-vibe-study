import type { Prompt } from "./content";

// 2주차 발표 슬라이드(agents-write)의 AGENTS.md 문구. 묶음 사이에만 빈 줄을 넣었다.
export const agentsMd = `# 작업 지침
- 작업을 시작하기 전, docs 폴더의 문서를 읽고 현재 상황을 확인한다.
- docs 폴더가 없다면 만들고, TASKS.md · DECISIONS.md · STATES.md를 작성한다.
- 작업을 시작할 때, 이번 작업과 관련된 기존 결정을 먼저 한두 줄로 말한다.
- 사용자가 정한 결정은 반드시 DECISIONS.md에 기록한다.

# 사용자 수준
- 사용자는 바이브코딩을 갓 시작한 대학생이다.
- 사용자 흐름에 관한 판단만 사용자에게 묻고, 기술적인 결정은 알아서 한다.
- 기술 설명이 필요하면 비전공자에게 설명하듯 예시와 함께 쉽게 설명한다.

# 확인용
- 매 작업을 시작하기 전, ‘크림치즈 허니!’를 외치고 시작한다.`;

// 2주차 발표 슬라이드의 "프롬프트 #번호" 문구 그대로. 기술 범위 답변은 scope 슬라이드의 여섯 칸을 옮겼다.
export const weekTwoPrompts: Prompt[] = [
  {
    id: "2-1",
    number: "#1",
    title: "BRIEF 스킬 만들기",
    category: "week2",
    when: "STEP 1 · kucc-vibe-study-week1 프로젝트의 새 채팅에서",
    text: "이 폴더의 PROJECT_BRIEF.txt에서 내용은 비우고 양식만 남겨서 project-brief 스킬로 만들어줘.",
    check:
      "모델은 GPT-6.1 Sol, 추론 수준은 Medium으로 맞춰요. 집에서는 Extra High로!",
  },
  {
    id: "2-2",
    number: "#2",
    title: "새 폴더에서 기획서 쓰기",
    category: "week2",
    when: "STEP 2 · kucc-vibe-study-week2 폴더를 프로젝트로 추가한 새 채팅에서",
    text: "project-brief 스킬로 커뮤니티 사이트 기획서 같이 쓰자",
    check:
      "에이전트가 한 칸씩 물어보면 짧게 답해요. 기술 칸을 물어보면 바로 아래 ‘기술 범위 답변’을 붙여넣어요.",
  },
  {
    id: "2-scope",
    number: "답변",
    title: "기술 범위 답변",
    category: "week2",
    when: "STEP 2 · 에이전트가 기술 칸을 물어볼 때",
    text: "기술 범위는 이렇게 정해줘.\n1. 로그인 없음: 닉네임만 적고 글쓰기\n2. 사진 없음: 글만 올리기\n3. DB 없음: 파일에 저장\n4. Node 서버 하나: 지난주에 설치한 Node.js로\n5. 글은 CSV 파일에 저장: 엑셀에서 한글이 안 깨지게 UTF-8 BOM으로\n6. 껐다 켜도 글 유지: 서버를 재시작해도 그대로",
    check:
      "주제는 자유예요. 해커톤 팀원 모집 게시판, 우리 과 익명 게시판, 학교 맛집 게시판처럼 정해 보세요.",
  },
  {
    id: "2-3",
    number: "#3",
    title: "구현 맡기기",
    category: "week2",
    when: "STEP 3 · 기획서가 완성된 다음",
    text: "PROJECT_BRIEF 기반으로 개발 시작해.\n개발 끝나면 서버 주소 알려주고 열어줘.",
    check:
      "승인 요청이 뜨면 내용을 읽고 허락해요. 기다리는 동안 ‘서버’가 무엇인지 함께 알아봐요.",
  },
  {
    id: "2-4",
    number: "#4",
    title: "AGENTS.md 내용",
    category: "week2",
    when: "STEP 6 · kucc-vibe-study-week2/AGENTS.md 파일에 붙여넣기",
    text: agentsMd,
    destination: "AGENTS.md에 붙여넣기",
    check:
      "Codex 채팅이 아니라 파일에 넣어요. 메모장이나 ChatGPT 앱 오른쪽 ‘파일’ 탭에서 AGENTS.md를 만들고 저장하세요.",
  },
  {
    id: "2-5",
    number: "#5",
    title: "채팅 A · 결정 하나 내리기",
    category: "week2",
    when: "STEP 7 · 새 채팅 A에서",
    text: "글 삭제 기능 추가해줘. 로그인이 없으니까 글 쓸 때 비밀번호 4자리를 받고, 맞아야 삭제되게 해줘.",
    check:
      "시작하자마자 ‘크림치즈 허니!’를 외치는지, docs 폴더와 문서 세 개가 생기는지 확인해요.",
  },
  {
    id: "2-6",
    number: "#6",
    title: "채팅 B · 아무 설명 없이",
    category: "week2",
    when: "STEP 9 · 또 새 채팅 B를 열고",
    text: "글 수정 기능 추가해줘",
    check:
      "비밀번호 얘기는 하지 마세요. DECISIONS.md를 읽고 삭제와 같은 비밀번호 4자리 방식으로 만들겠다고 먼저 말하면 성공이에요.",
  },
  {
    id: "2-7",
    number: "#7",
    title: "터널 열기",
    category: "week2",
    when: "STEP 10 · 커뮤니티 서버가 켜져 있을 때",
    text: "cloudflared로 지금 켜진 서버를 임시 터널로 인터넷에 공개해줘.\n설치가 안 되어 있으면 설치하고, 주소는 QR 코드로도 보여줘.",
    check:
      "와이파이를 끄고 폰 LTE로 QR 주소에 들어가 보세요. 서버나 터널이 꺼지면 문이 닫혀요.",
  },
  {
    id: "2-8",
    number: "#8",
    title: "tunnel 스킬로 저장",
    category: "week2",
    when: "STEP 12 · 터널을 연 그 채팅에서",
    text: "방금 터널 연 과정을 tunnel 스킬로 저장해줘. 다음엔 설치 확인부터 QR 코드까지 한 번에 하게. 어떤 프로젝트에서든 쓸 수 있게 저장해줘.",
    check: "저장이 끝나면 SKILL.md 파일을 열어 달라고 하세요.",
  },
  {
    id: "2-9a",
    number: "#9",
    title: "터널 끄기",
    category: "week2",
    when: "STEP 13 · 원래 채팅에서",
    text: "터널 꺼줘",
    check: "터널을 끈 다음, 새 채팅을 열어 아래 프롬프트를 입력해요.",
  },
  {
    id: "2-9b",
    number: "#9",
    title: "새 채팅에서 대충 말하기",
    category: "week2",
    when: "STEP 13 · 새 채팅에서",
    text: "그 전에 스킬로 저장해둔거 뭐였지 터널이었나 여는거 그거 해줘",
    check:
      "tunnel 스킬을 찾아 바로 QR 코드가 뜨면 성공. 주소가 바뀌었으니 커뮤니티 목록에 같은 이름으로 다시 올려요.",
  },
];

export function weekTwoPrompt(id: string) {
  const prompt = weekTwoPrompts.find((item) => item.id === id);
  if (!prompt) throw new Error(`2주차 프롬프트가 없습니다: ${id}`);
  return prompt;
}

// checklist 슬라이드(STEP 4)
export const serverChecks = [
  { id: "server-open", label: "서버 주소(localhost:3000)로 접속된다" },
  { id: "post-list", label: "글을 쓰면 목록에 나온다" },
  { id: "restart-keep", label: "서버를 껐다 켜도 글이 남아 있다" },
  {
    id: "csv-excel",
    label: "posts.csv를 엑셀로 열면 내 글이 보인다",
    detail:
      "확인한 뒤 엑셀은 꼭 닫아요. Windows에서는 엑셀이 파일을 붙잡고 있는 동안 서버가 글을 못 써요.",
  },
  {
    id: "server-off",
    label: "서버를 끈 채로 글을 쓰면 실패한다",
    detail: "확인한 뒤 서버를 다시 켜요.",
  },
];

// 서버와 클라이언트 장(server-program ~ server-rule) 요약
export const serverIdeas = [
  {
    title: "서버도 그냥 프로그램이다",
    text: "클라이언트는 먼저 연결을 요청하는 프로그램, 서버는 문을 열어두고 기다리다가 요청이 오면 응답하는 프로그램이에요.",
    slide: "server-program",
  },
  {
    title: "localhost는 ‘내 컴퓨터 안’",
    text: "마인크래프트 싱글플레이도 내 컴퓨터 안에서 서버가 돌아요. LAN으로 열면 같은 와이파이의 친구까지 들어올 수 있어요.",
    slide: "mc-single",
  },
  {
    title: "주소는 세 조각",
    text: "http://localhost:3000은 대화 방식(http), 어느 컴퓨터(localhost), 몇 번 문(포트 3000)이에요.",
    slide: "address",
  },
  {
    title: "차이는 어디서 실행되느냐",
    text: "프론트엔드는 사용자의 브라우저에서, 백엔드는 서버에서 실행돼요. 글 저장, 판단, 비밀 보관은 백엔드의 일이에요.",
    slide: "front-back",
  },
  {
    title: "믿어야 하는 건 서버에",
    text: "브라우저로 보낸 코드와 데이터는 사용자가 보고 고칠 수 있어요. 비밀번호, API 키, 점수 판정, 관리자 권한은 서버에서 처리해요.",
    slide: "server-rule",
  },
];

// sk-compare 슬라이드
export const agentsVsSkills = [
  ["언제 읽나", "새 채팅마다 항상, 맨 처음에", "필요할 때만"],
  ["어디에", "이 프로젝트 폴더", "내 컴퓨터 어디서든"],
  ["무엇을", "이 프로젝트의 규칙", "어디서든 쓰는 노하우"],
  ["오늘 만든 것", "docs 하네스 · 복창", "project-brief · tunnel"],
];

// filled-brief 슬라이드
export const filledBrief = [
  ["서버", "없음 (브라우저만)", "Node 서버 하나"],
  ["저장", "‘다른 이름으로 저장’", "서버의 posts.csv"],
  ["로그인·권한", "X", "비밀번호 4자리로 대신"],
  ["공개 범위", "내 크롬에서만", "터널로 인터넷 어디서든"],
  ["배포 환경", "–", "아직 내 노트북 → 3주차!"],
];
