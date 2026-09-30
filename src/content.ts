import { weekOnePrompts } from "./week-one";

export type Week = {
  number: number;
  title: string;
  subtitle: string;
  topic: string;
  description: string;
  outcome: string;
  goals: string[];
};

export const weeks: Week[] = [
  {
    number: 1,
    title: "내가 쓸 도구, 내가 만들기",
    subtitle: "PDF 편집기 만들기",
    topic: "PROJECT_BRIEF · IMPROVEMENTS_BRIEF",
    description:
      "강의자료에 필기하고 페이지를 편집하는 PDF 도구를 만듭니다. 사용해본 경험을 브리프에 적고 한 번 더 개선합니다.",
    outcome: "페이지 편집과 필기를 반영한 PDF 파일",
    goals: [
      "준비된 레포를 가져오고 PROJECT_BRIEF를 함께 읽습니다.",
      "Sol로 첫 버전을 구현하고 기본 기능을 확인합니다.",
      "IMPROVEMENTS_BRIEF를 작성하고 두 번째 구현을 진행합니다.",
    ],
  },
  {
    number: 2,
    title: "내 도구에 주소가 생겼다",
    subtitle: "개인용 웹 도구 제작과 배포",
    topic: "AGENTS.md · Skills · 서버와 클라이언트",
    description:
      "나만 쓰던 도구를 친구도 열어볼 수 있도록. 작은 웹 도구를 만들고 인터넷에 올립니다.",
    outcome: "친구에게 보낼 수 있는 웹 주소",
    goals: [
      "서버와 클라이언트가 어떤 역할을 맡는지 이해합니다.",
      "프로젝트의 작업 규칙과 반복할 절차를 정합니다.",
      "배포한 주소를 다른 기기에서 열어봅니다.",
    ],
  },
  {
    number: 3,
    title: "노트북에서 쓰고, 폰에서 읽기",
    subtitle: "기기 간 개인 메모장",
    topic: "데이터 저장 · 디자인 레퍼런스",
    description:
      "같은 메모를 여러 기기에서 읽고 씁니다. 마음에 드는 화면을 참고해 메모장의 디자인도 다듬습니다.",
    outcome: "기기를 바꿔도 남아 있는 내 메모",
    goals: [
      "메모가 어디에 저장되는지 이해합니다.",
      "내 계정의 메모가 다른 계정에 보이지 않는지 확인합니다.",
      "레퍼런스에서 여백과 정보 순서를 가져와 적용합니다.",
    ],
  },
  {
    number: 4,
    title: "이번에는, 내 아이디어",
    subtitle: "프로젝트 주제와 프로토타입",
    topic: "모델 선택 · 토큰과 대화 맥락",
    description:
      "요즘 불편했던 일에서 만들거리를 찾습니다. 꼭 필요한 화면부터 만들어 아이디어를 확인합니다.",
    outcome: "누구를 위한 것인지 설명할 수 있는 시제품",
    goals: [
      "누가 언제 쓸 도구인지 한 문장으로 정합니다.",
      "핵심 화면을 만들고 주변 사람에게 보여줍니다.",
      "작업의 크기에 맞게 모델과 요청 범위를 선택합니다.",
    ],
  },
  {
    number: 5,
    title: "아이디어를 작동하게 만들기",
    subtitle: "구현 계획과 첫 번째 기능",
    topic: "PROJECT_BRIEF · docs · 작업 세분화",
    description:
      "만들기로 정한 내용을 기록하고, 확인할 수 있는 작은 작업으로 나눕니다. 첫 기능을 끝까지 연결합니다.",
    outcome: "입력부터 결과까지 이어지는 핵심 기능",
    goals: [
      "필수 기능과 이번에 만들지 않을 기능을 구분합니다.",
      "합의한 동작과 완료 기준을 docs에 기록합니다.",
      "작업 하나를 구현하고 직접 확인합니다.",
    ],
  },
  {
    number: 6,
    title: "다른 사람이 써볼 시간",
    subtitle: "MVP 완성과 배포",
    topic: "개발자도구 · 로그 · 디버깅",
    description:
      "실제로 써볼 수 있는 첫 버전을 공개합니다. 사용 중 생기는 문제를 AI와 함께 찾아 고칩니다.",
    outcome: "다른 사람이 사용해본 첫 버전",
    goals: [
      "핵심 기능이 이어지는 최소 제품을 완성합니다.",
      "실패한 동작과 에러를 함께 전달합니다.",
      "수정한 버전을 배포하고 다시 확인합니다.",
    ],
  },
  {
    number: 7,
    title: "만들었으니까, 더 좋게",
    subtitle: "기능 확장과 결과물 공유",
    topic: "변경 범위 · 기존 기능 확인",
    description:
      "써보니 필요한 기능 하나를 더합니다. 이전에 잘 되던 기능도 확인하고, 서로의 결과물을 구경합니다.",
    outcome: "새 기능을 더한 내 프로젝트와 제작 기록",
    goals: [
      "변경하기 전 잘 되는 상태를 저장합니다.",
      "기능 하나를 추가하고 기존 동작을 다시 확인합니다.",
      "무엇을 만들고 어떻게 고쳤는지 공유합니다.",
    ],
  },
];

export type Prompt = {
  id: string;
  title: string;
  category: "week1" | "common";
  when: string;
  text: string;
  check: string;
  clone?: boolean;
};
export const prompts: Prompt[] = [
  ...weekOnePrompts,
  {
    id: "C-1",
    title: "막힌 상황 전달하기",
    category: "common",
    when: "버튼이 안 되거나 에러가 나타날 때",
    text: "다음 문제가 생겼어. 원인을 먼저 확인하고 수정해줘.\n\n내가 한 행동: [어떤 순서로 무엇을 했는지]\n기대한 결과: [어떻게 되어야 하는지]\n실제 결과: [지금 무슨 일이 일어났는지]\n에러 메시지: [원문을 붙여넣거나 화면을 첨부]\n\n수정한 뒤 같은 순서로 다시 확인해줘.",
    check:
      "비밀번호나 비밀키는 제외하고, 에러 원문과 재현 순서를 전달해주세요.",
  },
  {
    id: "C-2",
    title: "잘 되는 상태 남겨두기",
    category: "common",
    when: "기능이 잘 될 때 · 새 기능을 추가하기 전",
    text: "지금까지 변경한 내용을 확인하고, 현재 상태를\n로컬 Git 커밋으로 저장해줘.\n\n비밀키나 개인정보가 들어간 파일은 포함하지 말고,\n무엇을 저장했는지 짧게 알려줘. 원격 저장소에는 푸시하지 마.",
    check: "현재 버전을 저장한 뒤 다음 변경을 시작합니다.",
  },
  {
    id: "C-3",
    title: "새 대화에서 이어서 작업하기",
    category: "common",
    when: "대화가 길어졌거나 다음에 이어서 작업할 때",
    text: "다음 대화에서 이 작업을 이어갈 수 있도록\ndocs/HANDOFF.md에 현재 상태를 정리해줘.\n\n완성된 기능, 아직 해결하지 못한 문제, 실행 방법,\n다음에 할 일, 바꾸면 안 되는 결정을 포함해줘.\n확인한 사실과 아직 확인하지 않은 내용을 구분해줘.",
    check: "새 대화에서 이 파일을 읽고 작업을 이어달라고 요청하세요.",
  },
];

export { slides } from "./week-one";
