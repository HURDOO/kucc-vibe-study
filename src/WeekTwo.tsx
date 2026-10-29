import { type ReactNode } from "react";
import {
  Checklist,
  CommonPrompt,
  Eyebrow,
  Icon,
  LessonSection,
  LessonSidebar,
  PromptCard,
  useProgress,
} from "./components";
import { deckSlideHref } from "./slides";
import {
  agentsVsSkills,
  filledBrief,
  serverChecks,
  serverIdeas,
  weekTwoNews,
  weekTwoPrompt,
} from "./week-two";

const slide = (id: string) => deckSlideHref(2, id);

function SlideLink({ id, children = "이 부분 슬라이드로 보기" }: { id: string; children?: ReactNode }) {
  return (
    <a className="text-link" href={slide(id)}>
      {children} <Icon name="up-right" size={14} />
    </a>
  );
}

function CompareTable({
  caption,
  head,
  rows,
}: {
  caption: string;
  head: string[];
  rows: string[][];
}) {
  return (
    <div className="model-table-wrap">
      <table className="model-table">
        <caption>{caption}</caption>
        <thead>
          <tr>
            {head.map((cell, i) => (
              <th scope="col" key={i}>
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              <th scope="row">{row[0]}</th>
              {row.slice(1).map((cell, i) => (
                <td key={i}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function WeekTwo() {
  const { checked, toggle } = useProgress("kucc-week2-progress-v1");
  const steps = [
    { id: "brief", label: "BRIEF 스킬로 기획서 쓰기" },
    { id: "build", label: "구현 맡기기 · 서버와 클라이언트" },
    { id: "try", label: "만든 커뮤니티 써보기" },
    { id: "agents", label: "AGENTS.md로 기억 남기기" },
    { id: "tunnel", label: "내 노트북을 인터넷에 열기" },
    { id: "skills", label: "Skills 정리와 확인" },
    { id: "wrap", label: "오늘 채운 빈칸 · 다음 주" },
  ];
  const completionIds = [
    "skill-made",
    "brief-written",
    ...serverChecks.map((item) => item.id),
    "network",
    "agents-md",
    "decision-recorded",
    "chat-b",
    "tunnel-open",
    "visited",
    "tunnel-skill",
    "skill-reused",
  ];
  const done = completionIds.filter((id) => checked.includes(id)).length;
  const check = (id: string, children: ReactNode) => (
    <Checklist
      key={id}
      id={id}
      checked={checked.includes(id)}
      onChange={toggle}
    >
      {children}
    </Checklist>
  );
  return (
    <div className="container page-container lesson-page">
      <div className="breadcrumb">
        <a href="#/curriculum">커리큘럼</a>
        <span aria-hidden="true">/</span>
        <span>2주차</span>
      </div>
      <div className="lesson-intro">
        <span className="page-mark" aria-hidden="true">
          02
        </span>
        <div>
          <Eyebrow>WEEK 02 · SERVER, TUNNEL, MEMORY</Eyebrow>
          <h1 className="gradient-title">
            바이브코딩으로
            <br />
            간단한 커뮤니티 만들기.
          </h1>
          <p className="page-description">
            서버를 만들고, 내 노트북을 인터넷에 열고,
            <br />
            에이전트에게 기억과 노하우를 남겨요.
          </p>
          <div className="lesson-meta">
            <span>기획서 직접 쓰기</span>
            <span aria-hidden="true">→</span>
            <span>서버 만들기</span>
            <span aria-hidden="true">→</span>
            <span>인터넷에 열기</span>
          </div>
        </div>
        <div className="lesson-intro-actions">
          <a className="button primary" href={slide("cover")}>
            <Icon name="play" size={16} />
            발표용 웹 슬라이드
          </a>
          <a className="button outlined" href="#/community">
            <Icon name="users" size={16} />
            커뮤니티 올리기·둘러보기
          </a>
          <a className="text-link" href="#/prompts?category=week2">
            <Icon name="copy" size={16} />
            프롬프트 #1–#9 모아보기
          </a>
        </div>
      </div>
      <div className="lesson-layout">
        <LessonSidebar
          week={2}
          steps={steps}
          done={done}
          total={completionIds.length}
          doneMessage="오늘의 실습 완료! 만든 스킬 두 개는 다음 프로젝트에서도 꺼내 쓸 수 있어요."
        />
        <div className="lesson-main">
          <LessonSection
            id="brief"
            number="01–02"
            title="BRIEF 스킬로 기획서 직접 쓰기"
            description="지난주 기획서 양식을 스킬로 저장하고, 새 폴더에서 그 스킬로 커뮤니티 기획서를 씁니다."
          >
            <div className="setup-strip">
              <span>시작 전</span>
              <p>
                모델은 <strong>GPT-6.1 Sol</strong>, 추론 수준은{" "}
                <strong>Medium</strong>으로 맞춰요. 집에서 작업할 때는 Extra
                High로 해도 좋아요.
              </p>
            </div>
            <p className="small-note">
              Codex에서 지난주 프로젝트(kucc-vibe-study-week1)를 열고 새 채팅에
              붙여넣으세요. 스킬은 일하는 방법을 파일로 저장해 두고 필요할 때
              꺼내 쓰는 기능이에요.
            </p>
            <PromptCard prompt={weekTwoPrompt("2-1")} />
            {check("skill-made", "project-brief 스킬이 만들어졌어요.")}
            <ol className="flow-steps">
              <li>
                <span>바탕화면</span>새 폴더 <strong>kucc-vibe-study-week2</strong>{" "}
                만들기
              </li>
              <li>
                <span>Codex</span>방금 만든 폴더를 프로젝트로 추가
              </li>
              <li>
                <span>새 채팅</span>아래 프롬프트로 스킬 불러오기
              </li>
            </ol>
            <PromptCard prompt={weekTwoPrompt("2-2")} />
            <PromptCard prompt={weekTwoPrompt("2-scope")} />
            <SlideLink id="scope">기술 범위 슬라이드 보기</SlideLink>
            {check(
              "brief-written",
              "kucc-vibe-study-week2 폴더에 커뮤니티 기획서(PROJECT_BRIEF)가 생겼어요.",
            )}
          </LessonSection>
          <LessonSection
            id="build"
            number="03"
            title="구현 맡기고, 서버 알아보기"
            description="기획서가 완성되면 구현을 맡겨요. 기다리는 동안 ‘서버’가 무엇인지 알아봅니다."
          >
            <PromptCard prompt={weekTwoPrompt("2-3")} />
            <div className="idea-grid">
              {serverIdeas.map((idea) => (
                <article key={idea.title}>
                  <h3>{idea.title}</h3>
                  <p>{idea.text}</p>
                  <SlideLink id={idea.slide}>슬라이드</SlideLink>
                </article>
              ))}
            </div>
            <div className="margin-note">
              <span>에이전트에게 이렇게</span>
              <p>
                비밀번호, API 키, 점수 판정, 관리자 권한처럼 믿어야 하는 것은
                “이건 서버에서 처리해줘”라고 말해요.
              </p>
            </div>
          </LessonSection>
          <LessonSection
            id="try"
            number="04–05"
            title="만든 커뮤니티 써보기"
            description="각자 커뮤니티에 글을 써 보고, 잘 작동하는지 하나씩 체크해요."
          >
            <div className="verification-list">
              {serverChecks.map((item) =>
                check(
                  item.id,
                  <>
                    <strong>{item.label}</strong>
                    {item.detail && (
                      <small className="check-detail">{item.detail}</small>
                    )}
                  </>,
                ),
              )}
            </div>
            <div className="discussion-card">
              <h3>Network 탭으로 요청과 응답 보기</h3>
              <ol className="plain-steps">
                <li>F12 → Network 탭 열기</li>
                <li>내 커뮤니티에 글 하나 쓰기</li>
                <li>새로 생긴 요청 클릭 → 보낸 내용과 받은 응답 보기</li>
                <li>posts.csv를 메모장으로 열기 → 맨 아래 한 줄 추가!</li>
              </ol>
              <p>먼저 끝났다면 댓글이나 좋아요 기능을 추가해 보세요.</p>
              <SlideLink id="network" />
            </div>
            {check(
              "network",
              "Network 탭에서 보낸 내용과 응답, posts.csv에 추가된 한 줄을 확인했어요.",
            )}
            <CommonPrompt />
          </LessonSection>
          <LessonSection
            id="agents"
            number="06–09"
            title="AGENTS.md로 기억 남기기"
            description="새 채팅은 빈 종이예요. AGENTS.md는 새 채팅마다 내 첫 프롬프트보다 먼저 붙어서, 정한 것을 이어 줍니다."
          >
            <div className="margin-note">
              <span>하네스 · AGENTS.md는 짧게, 기억은 docs에</span>
              <p>
                AGENTS.md에는 “docs를 읽고, 정한 건 DECISIONS에 적어라” 같은
                규칙만 적어요. 실제 기억은 docs의 TASKS.md(할 일),
                DECISIONS.md(정한 것), STATES.md(지금 어디까지)에 남습니다.
              </p>
            </div>
            <PromptCard prompt={weekTwoPrompt("2-4")} />
            {check(
              "agents-md",
              "kucc-vibe-study-week2 폴더에 AGENTS.md를 만들고 저장했어요.",
            )}
            <PromptCard prompt={weekTwoPrompt("2-5")} />
            {check(
              "decision-recorded",
              "삭제 비밀번호 4자리 결정이 docs/DECISIONS.md에 남았어요. 틀린 비밀번호로는 안 지워져요.",
            )}
            <p className="small-note">
              기록이 없다면 “방금 정한 거 DECISIONS에 기록해줘” 한 줄이면 돼요.
            </p>
            <PromptCard prompt={weekTwoPrompt("2-6")} />
            {check(
              "chat-b",
              "채팅 B가 DECISIONS.md를 읽고 비밀번호 방식을 먼저 말한 뒤 수정 기능을 만들었어요.",
            )}
            <div className="discussion-card">
              <h3>수정 기능을 만드는 동안 · 바이브코딩 근황</h3>
              <p>
                코딩 모델 판도가 바뀌었고, 이제는 채팅을 보내지 않아도 먼저
                움직이는 에이전트의 시대예요.
              </p>
              <SlideLink id="div-news">근황 슬라이드 처음부터 보기</SlideLink>
            </div>
            <div className="idea-grid news-grid">
              {weekTwoNews.map((news) => (
                <article key={news.slide}>
                  <span className="news-label">{news.label}</span>
                  <h3>{news.title}</h3>
                  <p>{news.text}</p>
                  <SlideLink id={news.slide}>슬라이드</SlideLink>
                </article>
              ))}
            </div>
          </LessonSection>
          <LessonSection
            id="tunnel"
            number="10–12"
            title="내 노트북을 인터넷에 열기"
            description="Cloudflare 임시 터널로 내 서버의 문을 인터넷 전체로 열고, 서로의 커뮤니티에 놀러가요."
          >
            <PromptCard prompt={weekTwoPrompt("2-7")} />
            <p className="small-note">
              주소는 무작위라 아는 사람만 들어올 수 있어요. 대신 터널을 다시
              열면 주소가 바뀝니다.
            </p>
            {check("tunnel-open", "폰 LTE로 내 터널 주소에 들어가 봤어요.")}
            <a className="share-cta" href="#/community">
              <span className="share-cta-icon" aria-hidden="true">
                <Icon name="users" size={28} />
              </span>
              <span>
                <strong>STEP 11 · 서로 놀러가기</strong>
                <small>
                  커뮤니티 이름과 터널 주소를 올리고, 세 곳 이상 놀러가서 글을
                  남겨요.
                </small>
              </span>
              <Icon name="arrow" size={24} />
            </a>
            {check(
              "visited",
              "내 커뮤니티를 올리고, 세 곳 이상 놀러가 글을 남겼어요. 내 posts.csv에서 다녀간 사람도 세어 봤어요.",
            )}
            <PromptCard prompt={weekTwoPrompt("2-8")} />
            {check("tunnel-skill", "tunnel 스킬을 저장하고 SKILL.md를 열어 봤어요.")}
          </LessonSection>
          <LessonSection
            id="skills"
            number="13"
            title="Skills 정리하고 확인하기"
            description="평소엔 이름표(name·description)만 보고, 필요할 때 하나만 꺼내 읽어요. 대충 말해도 찾아 쓰는지 확인합니다."
          >
            <CompareTable
              caption="AGENTS.md와 Skills, 뭐가 다를까"
              head={["", "AGENTS.md", "Skills"]}
              rows={agentsVsSkills}
            />
            <SlideLink id="sk-file">SKILL.md 예시 슬라이드 보기</SlideLink>
            <PromptCard prompt={weekTwoPrompt("2-9a")} />
            <PromptCard prompt={weekTwoPrompt("2-9b")} />
            {check(
              "skill-reused",
              "새 채팅에서 대충 말해도 tunnel 스킬로 터널이 다시 열렸고, 바뀐 주소를 다시 올렸어요.",
            )}
          </LessonSection>
          <LessonSection
            id="wrap"
            pill="WRAP UP"
            title="오늘 채운 빈칸"
            description="지난주 BRIEF에서 비워 두었던 칸을 오늘 채웠어요."
          >
            <CompareTable
              caption="1주차와 2주차 비교"
              head={["항목", "1주차 · PDF 편집기", "2주차 · 커뮤니티"]}
              rows={filledBrief}
            />
            <div className="finish-note">
              <Icon name="check" size={22} />
              <div>
                <strong>오늘의 실습은 여기까지.</strong>
                <p>
                  오늘 만든 스킬 두 개(project-brief, tunnel)는 다음
                  프로젝트에서도 그대로 꺼내 쓸 수 있어요.
                </p>
              </div>
            </div>
          </LessonSection>
          <div className="next-week">
            <span>NEXT WEEK</span>
            <a href="#/week/3">
              <div>
                <h3>노트북을 덮으면, 내 커뮤니티도 꺼진다</h3>
                <p>
                  배포: 24시간 켜져 있는 남의 컴퓨터에서 서버 돌리기 · DB: 날아가지
                  않는 데이터 저장
                </p>
              </div>
              <Icon name="arrow" size={26} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
