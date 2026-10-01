# KUCC 바이브코딩 스터디

코딩 입문자를 위한 7주 스터디 자료 사이트. React, TypeScript, Vite로 만든 정적 웹사이트입니다.

## 실행

Node.js 22.12 이상을 권장합니다. Node.js 26.4에서 검증했습니다.

```sh
npm install
npm run dev
```

터미널에 표시된 로컬 주소를 엽니다. 기본 주소는 `http://127.0.0.1:5173`입니다.

같은 내부망의 다른 기기에서 확인하려면 다음 명령으로 실행합니다.

```sh
npm run dev:lan
```

터미널의 `Network` 주소(`http://이-컴퓨터의-내부-IP:5179`)로 접속합니다. 서버가 실행 중이고 이 컴퓨터가 깨어 있어야 합니다. 5179 포트를 이미 사용 중이면 먼저 이 프로젝트의 기존 서버를 종료하세요.

```sh
npm run typecheck
npm run build
npm run preview
```

`dist/`가 정적 빌드 결과입니다. 해시 기반 주소를 사용하므로 정적 호스팅에서 별도의 SPA 재작성 규칙 없이 페이지를 이동할 수 있습니다. 루트 경로 배포 기준입니다.

## 배포

배포 대상은 **https://kucc.app.hurdoo.kr**이며 인터넷에 공개합니다. GitHub 저장소는 `HURDOO/kucc-vibe-study`, 이미지 저장소는 `ghcr.io/hurdoo/kucc-vibe-study`입니다. 프로젝트 폴더 이름과 달리 대시보드 앱 ID는 도메인에 맞춰 `kucc`입니다.

`Dockerfile`은 잠금 파일로 Node.js 24 빌드를 만들고 Caddy로 정적 파일을 제공합니다. 베이스 이미지와 GitHub Actions는 digest/커밋에 고정했습니다. ARM64 컨테이너는 8080 포트와 `/healthz`를 사용합니다. 읽기 전용 루트 파일시스템, `/tmp` tmpfs, 모든 capability 제거, `no-new-privileges` 환경에서 실행할 수 있습니다. Caddy의 파일 capability와 관리 API·컨테이너 내부 HTTPS·설정 저장을 비활성화하며, 외부 HTTPS는 배포 플랫폼이 관리합니다. 서버 데이터, `/data` 볼륨, 런타임 비밀키는 필요하지 않습니다. 체크리스트는 각 방문자의 브라우저에 보관됩니다.

최초 GHCR 패키지는 GitHub Actions의 **Publish ARM64 image**를 수동 실행하여 저장소에 연결합니다. 워크플로는 프로젝트 빌드를 검증하고 `GITHUB_TOKEN`으로 ARM64 이미지를 발행하며 별도 토큰을 저장소에 넣지 않습니다. 푸시만으로 발행하거나 서버를 배포하지 않습니다.

Mac에서 후속 이미지를 발행하고 대시보드 JSON을 생성하는 명령은 다음과 같습니다. 먼저 변경을 검증하고 커밋·푸시해 작업 트리가 깨끗해야 합니다.

```sh
node /Users/hurdoo/coding/production/bin/deployctl.mjs --json --compact plan kucc-vibe-study
/Users/hurdoo/coding/production/codex/deploy-project/scripts/with-ghcr-auth \
  node /Users/hurdoo/coding/production/bin/deployctl.mjs --json --compact publish kucc-vibe-study
```

출력 JSON을 [배포 대시보드](https://deploy.app.hurdoo.kr)의 **새 앱 배포**(최초) 또는 **배포**에 붙여넣고, 양식에 적용한 뒤 검토·제출합니다. JSON에는 변경할 수 없는 이미지 digest와 해당 Git 커밋이 포함됩니다. 이미지 발행과 실제 서버 배포는 별도 단계입니다.

`VITE_WEEK1_REPO_URL`은 빌드 시 브라우저 코드에 포함되는 공개 설정입니다. 대시보드의 런타임 환경 변수로 바뀌지 않으므로 기본 레포를 변경하려면 `src/week-one.ts`의 기본값을 수정하고 새 이미지를 발행하세요.

## 포함한 화면

- `#/`: 소개, 1주차 바로가기, 7주 커리큘럼
- `#/curriculum`: 전체 커리큘럼
- `#/week/1`: 복제부터 2차 개선까지 안내, 두 브리프 복사·다운로드, 기본 기능 체크리스트
- `#/week/2`–`#/week/7`: 주제와 학습 목표 미리보기. 상세 교안은 준비 중임을 표시합니다.
- `#/prompts`: 1주차 4개(발표 슬라이드와 같은 문구) + 공통 3개 프롬프트, 분류, 검색, 복사
- `#/guide`: 수업 준비물, Windows/Mac 안내, 자주 묻는 질문
- `#/slides/1/1`: 1주차 발표용 웹 슬라이드 45장. claude.ai Artifact 덱 "KUCC 바이브코딩 스터디 1주차"를 그대로 옮겼습니다. 슬라이드는 창에 꽉 차게 표시되고, 위아래 조작 막대는 마우스를 움직이거나 화면을 누르면 나타났다가 2.5초 뒤 사라집니다. 방향키, Space, Home/End, O(목차), F(전체 화면), Esc(실습으로) 지원
- `#/slides/1/19`: "Codex는 어떻게 동작할까?" 시작. LLM, 도구, 에이전트 루프, 샌드박스·프로젝트·승인 모드 설명
- `#/week/1?section=codex`: Codex 소개 해설과 예시로 바로 이동

## 자료 수정

- `src/content.ts`: 주차 정보와 공통 프롬프트
- `src/week-one.ts`: 1주차 프롬프트(슬라이드를 바꾸면 같은 문구로 맞춤), 체크리스트, 브리프 해설, 개선 후보, Ctrl+Z 예시, 모델 표
- `src/WeekOne.tsx`: 1주차 실습 페이지와 수업 진행 순서
- `src/codex-intro.ts`: 실습 페이지의 Codex 소개 문구, 해설, 예시 코드와 공식 출처
- `src/CodexIntro.tsx`, `src/CodexVisual.tsx`, `src/codex-intro.css`: 실습 페이지의 Codex 해설과 시각 예시
- `src/slides/week1/*.html`: 발표 슬라이드 원문. Artifact 덱의 `project/slides/<id>.html`과 같은 형식(1920×1080, 인라인 스타일, `<aside>` 발표자 노트)이며 로고 주소만 `/slides/kucc-logo.svg`로 바꿨습니다
- `src/week-one-slides.ts`: 슬라이드 순서, 목차 제목 추출, `<x-icon>` 아이콘 변환, 슬라이드 주소 생성
- `src/slide-deck.css`: Artifact 슬라이드 형식의 기본 규칙(기본 글자 크기, 세로 flex, 최소 너비 0, 칠하기 순서, 목록 들여쓰기). Artifact에서 내보낸 PDF와 45장을 비교해 맞췄습니다
- `src/slide-icons.ts`: `<x-icon>` 이름에 가장 가까운 [Lucide](https://lucide.dev) 아이콘(ISC). Artifact 전용 아이콘 글꼴은 쓸 수 없어 모양이 조금 다릅니다
- `src/materials/PROJECT_BRIEF.txt`, `src/materials/IMPROVEMENTS_BRIEF.txt`: 실습 레포의 브리프 원문
- `src/App.tsx`: 페이지 구성과 발표 화면(1920×1080 캔버스를 화면에 맞춰 축소)
- `src/components.tsx`: 공통 UI, 복사, 레포 URL 검증, 체크리스트 저장
- `src/styles.css`: 색상, 타이포그래피, 반응형 화면
- `DESIGN.md`: 발표 덱(`kucc-deck`) 기반 디자인 토큰과 적용 원칙

1주차는 **레포 복제·자기소개 → 프로젝트 열기 → 브리프와 MVP 설명 → Sol 1차 구현·Codex 설명 → 기본 기능 확인 → 개선 브리프 작성 → Sol 2차 구현·모델과 전공 지식 이야기 → 결과 확인 → 다음 회차 예고** 순서입니다. 각자 결과물을 사용하기 전에 체크리스트와 개선 브리프 작성법까지 함께 안내합니다.

첫 구현에는 페이지 추가·삭제·이동, 필기·지우기, PDF 합치기와 저장이 포함됩니다. 개선 후보 6개는 여러 개 골라도 되며, 모르는 항목은 `미정`으로 둘 수 있습니다. Ctrl+Z에만 좋은 예와 아쉬운 예를 제공합니다. 브리프는 파일 패널에서 편집할 수 없으면 텍스트 편집기를 사용하고, 실습 프로젝트 폴더에 저장하도록 안내합니다.

## 1주차 실습 레포 설정

기본 주소는 `https://github.com/HURDOO/kucc-vibe-study-week1.git`입니다. 첫 방문부터 복제 프롬프트를 복사할 수 있습니다. 폴더명은 `kucc-vibe-study-week1`입니다. URL 입력란에서 공개 GitHub 저장소를 바꿀 수도 있으며, 잘못된 주소에서는 복사를 비활성화합니다.

사이트 기본값을 바꾸려면 `.env.local`에 다음 공개 정보만 넣고 개발 서버를 다시 시작하거나 다시 빌드하세요.

```dotenv
VITE_WEEK1_REPO_URL=https://github.com/ACCOUNT/REPOSITORY
```

`VITE_` 환경 변수는 브라우저에 공개됩니다. 비밀키나 토큰을 넣지 마세요. 입력한 URL은 이 브라우저에 저장되어 기본값보다 우선합니다.

두 브리프는 2026-09-27에 실습 레포 `main`에서 가져왔습니다. 사이트에서 실시간으로 GitHub를 호출하지 않습니다. 실습 레포의 양식을 수정하면 `src/materials/`의 원문도 갱신하세요. 실습 페이지 해설의 인용 부분은 이 원문에서 추출합니다. 발표 슬라이드의 브리프 내용은 Artifact 덱에 따로 들어 있으므로 함께 맞춰주세요. 이전의 축약된 `.md` 브리프는 `.txt` 원문으로 교체했습니다.

## 발표 자료의 사실 확인

실습 페이지의 Codex 설명은 [도구 호출](https://developers.openai.com/api/docs/guides/function-calling), [에이전트 구조](https://developers.openai.com/api/docs/guides/agents-api/architecture), [Sandbox](https://learn.chatgpt.com/docs/sandboxing), [프로젝트](https://learn.chatgpt.com/docs/projects), [자동 승인 검토](https://learn.chatgpt.com/docs/sandboxing/auto-review) 공식 문서를 참고했습니다. 모델 표는 [OpenAI 모델 안내](https://developers.openai.com/api/docs/models)와 [Claude Opus 5.5 발표](https://www.anthropic.com/claude-opus-5-5)를 참고했습니다. 확인일은 2026-09-27이며 관련 화면에도 출처를 표시합니다.

Codex 소개의 날씨 확률은 가상 수치이고, `tool: 파일 쓰기` 같은 형식은 이해를 돕기 위한 의사 코드입니다. 허용된 프로젝트 수정은 실제 컴퓨터에 반영되며, 프로젝트 밖의 읽기까지 일괄 차단된다고 설명하지 않습니다. 승인 요청 모드에서도 허용된 작업은 매번 묻지 않고, 자동 검토는 추가 승인이 필요한 작업을 별도 검토 에이전트에 맡기는 기능입니다. 업로드 차단은 승인 검토에 들어온 상황의 예로 표시하며, 요약된 맥락과 검토 대상·정책에 따라 판단이 달라질 수 있음을 설명합니다.

모델별 역할 분담은 수업용 예시입니다. Opus·Luna·Astra를 함께 쓰는 구성에는 도구별 연결 설정이 필요하며, 오늘 실습은 Sol로 진행합니다. 이용자의 서비스 이동이나 AI와 취업률 사이의 인과관계는 검증된 통계로 제시하지 않습니다. 이 부분은 커뮤니티 사례 읽기와 전공 지식 활용에 관한 토론으로 구성했습니다. 모델 출시 시점과 선택지는 발표 전에 공식 자료와 앱에서 다시 확인하세요.

발표 슬라이드는 Artifact 덱의 문구를 그대로 옮겼으며, 위 기준으로 다시 검토하거나 고치지 않았습니다. 예를 들어 승인 모드 슬라이드는 "명령어를 실행할 때마다 확인"으로 단순화해 실습 페이지 설명과 다릅니다. 스터디장 소개 슬라이드의 `[이름]`은 자리 표시자입니다.

슬라이드를 바꿀 때는 Artifact 덱을 수정한 뒤 해당 `project/slides/<id>.html`을 `src/slides/week1/`에 다시 복사하고, 순서가 바뀌면 `src/week-one-slides.ts`의 `slideOrder`도 맞춥니다. 슬라이드 글꼴은 사용 글자와 KS X 1001 한글 2,350자로 줄인 파일이므로, 그 밖의 글자는 대체 글꼴로 표시될 수 있습니다.

## 저장과 접근성

체크리스트와 입력한 실습 레포 URL만 브라우저 localStorage에 보관합니다. 계정, 서버 저장소, 기기 간 동기화는 없습니다. 저장소를 사용할 수 없어도 현재 화면의 동작은 유지합니다. HTTPS와 localhost에서는 Clipboard API를 사용하고, HTTP 내부망 주소에서는 사용자 클릭에 따른 복사 대체 방식을 사용합니다. 브라우저가 복사를 허용하지 않으면 직접 선택해 복사하도록 안내합니다.

키보드 메뉴, 스킵 링크, 체크박스, 검색 결과 알림, 복사 결과 알림, reduced-motion 스타일을 제공합니다. 발표 슬라이드는 `#/slides/1/번호` 주소로 바로 열 수 있습니다.

## 디자인

사이트 전체가 1주차 발표 덱(claude.ai Artifact)과 같은 디자인을 씁니다. KUCC 빨강(`#c3201f`), Black Han Sans 제목, Noto Sans KR 본문, JetBrains Mono `// 라벨`과 `> STEP` 알약, 어두운 코드 창, 큰 외곽선 글자 장식이 공통 요소입니다. 구체적인 토큰과 적용 원칙은 [DESIGN.md](./DESIGN.md)에 있습니다.

세 글꼴은 Google Fonts 저장소의 OFL 원본을 서브셋해 `public/fonts/`에 자체 호스팅하며, 라이선스(`OFL-*.txt`)도 같은 폴더에 있습니다. 서브셋에 없는 드문 글자는 시스템 글꼴로 표시됩니다.

이전 디자인은 Git에 남아 있습니다. SEED 레퍼런스 버전은 태그 `snapshot/before-deck-design`, 그 이전 GDGoC 버전은 커밋 `02932c9`입니다. 되돌리려면 `git switch -c <새-브랜치> snapshot/before-deck-design`로 확인하거나, 디자인 변경 커밋을 `git revert` 하세요.

## 현재 범위

실습 레포 연결과 1주차 자료, 공개 배포 구성을 준비했습니다. 웹 슬라이드이며 별도 PowerPoint 파일은 포함하지 않습니다. 2–7주차의 상세 실습과 발표 자료는 아직 작성하지 않았습니다. 결과물 제출 서버와 로그인은 포함하지 않았습니다.
