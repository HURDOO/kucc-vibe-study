import { useEffect, useState } from "react";
import { brief, missions, prompts, slides, weeks, type Week } from "./content";
import briefUrl from "./materials/PROJECT_BRIEF.md?url&no-inline";
import {
  Checklist,
  CommonPrompt,
  CopyButton,
  Eyebrow,
  Footer,
  Header,
  Icon,
  PromptCard,
  QuickHelp,
  useProgress,
} from "./components";

function DocumentArtwork() {
  return (
    <div className="document-art" aria-hidden="true">
      <div className="art-grid" />
      <span className="art-caption">FROM AN IDEA, TO YOUR TOOL.</span>
      <div className="art-window">
        <div className="art-window-bar">
          <span className="window-dot" />
          <span className="window-dot" />
          <span className="window-dot" />
          <span>나의 PDF 도구</span>
          <Icon name="up-right" size={13} />
        </div>
        <div className="art-window-body">
          <div className="art-file-label">
            <Icon name="file" size={17} />
            <span>이번 주 강의자료.pdf</span>
            <span>3 pages</span>
          </div>
          <div className="art-pages">
            {[1, 2, 3].map((n) => (
              <div className={`art-page page-${n}`} key={n}>
                <span className="page-pin">{n === 2 ? "×" : "✓"}</span>
                <div className="paper-heading" />
                <div className="paper-line" />
                <div className="paper-line short" />
                <div className="paper-block" />
                <div className="paper-line" />
                <div className="paper-line" />
                <span className="page-number">0{n}</span>
              </div>
            ))}
          </div>
          <div className="art-action-row">
            <span>필요한 페이지만 남기고</span>
            <span className="art-save">
              새 PDF 저장 <Icon name="download" size={12} />
            </span>
          </div>
        </div>
      </div>
      <div className="art-note">
        <span>01</span> 첫 번째, 내가 만든 도구.
        <span className="note-arrow">↗</span>
      </div>
      <span className="art-plus plus-one">+</span>
      <span className="art-plus plus-two">+</span>
    </div>
  );
}

function CurriculumRows({ compact = false }: { compact?: boolean }) {
  return (
    <div className="curriculum-list">
      {weeks.map((week) => (
        <a
          href={`#/week/${week.number}`}
          className={`curriculum-row${week.number === 1 ? " current" : ""}`}
          key={week.number}
        >
          <span className="week-index">
            <span>WEEK</span>
            {String(week.number).padStart(2, "0")}
          </span>
          <div className="week-description">
            <h3>{week.title}</h3>
            <p>{week.subtitle}</p>
            {!compact && (
              <span className="week-detail">{week.description}</span>
            )}
          </div>
          <span className="week-topic">{week.topic}</span>
          <span className={`status-label${week.number === 1 ? " active" : ""}`}>
            {week.number === 1 ? "자료 보기" : "미리보기"}
          </span>
          <Icon name="up-right" size={20} />
        </a>
      ))}
    </div>
  );
}

function Home() {
  return (
    <>
      <section className="home-hero container">
        <div className="hero-topline">
          <Eyebrow>KUCC VIBE CODING STUDY</Eyebrow>
          <span className="hero-edition">7 WEEKS · FROM ZERO TO SOMETHING</span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-pretitle">코딩이 처음이어도 괜찮아요.</p>
            <h1>
              내가 필요한 도구,
              <br />
              <span>내 손으로.</span>
              <span className="title-square" />
            </h1>
            <p className="hero-description">
              머릿속에만 있던 아이디어를 화면 밖으로.
              <br />
              AI와 함께 만들고, 고치고, 직접 써보는 7주.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#/week/1">
                첫 번째 도구 만들기 <Icon name="arrow" size={18} />
              </a>
              <a className="text-link" href="#/curriculum">
                7주 과정 살펴보기 <Icon name="chevron" size={15} />
              </a>
            </div>
            <div className="hero-meta">
              <span>처음 만드는 사람을 위한</span>
              <span>ChatGPT · Codex</span>
              <span>Windows & Mac</span>
            </div>
          </div>
          <DocumentArtwork />
        </div>
      </section>
      <section
        className="container featured-section"
        aria-labelledby="featured-title"
      >
        <div className="featured-card">
          <div className="featured-number">
            <span>START HERE</span>
            <strong>
              01<span>↗</span>
            </strong>
            <small>첫 번째 수업</small>
          </div>
          <div className="featured-content">
            <div className="featured-eyebrow">
              <span className="live-dot" /> 바로 시작할 수 있어요{" "}
              <span>필수 실습 60분 + 자유 실습 30분</span>
            </div>
            <h2 id="featured-title">PDF 편집기, 직접 만들어 쓰기</h2>
            <p>
              프롬프트를 복사해 작업을 시작하세요.
              <br className="mobile-only" /> 만드는 동안, 무엇을 요청했는지 함께
              살펴봅니다.
            </p>
            <div className="featured-links">
              <a href="#/week/1">
                실습 따라가기 <Icon name="arrow" size={16} />
              </a>
              <a href="#/slides/1/1">
                <Icon name="play" size={15} /> 슬라이드
              </a>
              <a href="#/prompts?category=week1">
                <Icon name="copy" size={15} /> 프롬프트
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="container curriculum-section">
        <div className="section-heading">
          <div>
            <Eyebrow>OUR CURRICULUM</Eyebrow>
            <h2>일곱 번의 수업, 하나의 내 프로젝트.</h2>
          </div>
          <p>
            작은 도구로 시작해서
            <br />
            나만의 아이디어를 완성하기까지.
          </p>
        </div>
        <div className="curriculum-phase">
          <span>
            01—03 <b>함께 만들며 익히기</b>
          </span>
          <span>
            04—07 <b>내 프로젝트 완성하기</b>
          </span>
        </div>
        <CurriculumRows compact />
        <p className="section-footnote">
          1주차 실습 자료가 준비되어 있어요. 다음 주차의 상세 자료는 순서대로
          채워집니다.
        </p>
      </section>
      <section className="study-way">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>HOW WE LEARN</Eyebrow>
              <h2>일단 만들어보면서 배웁니다.</h2>
            </div>
          </div>
          <div className="way-grid">
            <article>
              <span className="way-number">01 / START</span>
              <h3>복사해서, 바로 시작.</h3>
              <p>
                처음부터 잘 요청할 필요는 없어요.
                <br />
                준비된 프롬프트로 첫 도구를 만듭니다.
              </p>
            </article>
            <article>
              <span className="way-number">02 / MAKE IT YOURS</span>
              <h3>써보고, 내 말로 수정.</h3>
              <p>
                버튼 하나부터 기능 하나까지.
                <br />
                직접 써보며 필요한 것을 바꿔봅니다.
              </p>
            </article>
            <article>
              <span className="way-number">03 / GO FURTHER</span>
              <h3>끝냈다면, 한 걸음 더.</h3>
              <p>
                필수 실습 아래에 추가 미션이 있어요.
                <br />
                궁금한 기능을 골라 더 만들어보세요.
              </p>
            </article>
          </div>
        </div>
      </section>
      <div className="container home-help">
        <QuickHelp />
      </div>
    </>
  );
}

function Curriculum() {
  return (
    <div className="container page-container">
      <div className="page-intro">
        <Eyebrow>THE SEVEN-WEEK JOURNEY</Eyebrow>
        <h1>
          이번 주에는
          <br />
          무엇을 만들어볼까요?
        </h1>
        <p>
          첫 도구부터 나만의 프로젝트까지. 각 주차에서 자료와 실습을 확인하세요.
        </p>
      </div>
      <div className="curriculum-phase">
        <span>7주 과정</span>
        <span>함께하는 60분 + 자유 실습 30분</span>
      </div>
      <CurriculumRows />
      <QuickHelp />
    </div>
  );
}

function LessonHeading({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="lesson-heading">
      <span className="lesson-section-number">{number}</span>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

function WeekOne() {
  const { checked, toggle } = useProgress();
  const steps = [
    { id: "start", label: "바로 시작하기" },
    { id: "understand", label: "만드는 동안 살펴보기" },
    { id: "verify", label: "직접 써보고 확인하기" },
    { id: "modify", label: "내 말로 바꿔보기" },
    { id: "extra", label: "끝냈다면, 추가 미션" },
  ];
  const completionIds = [
    "cloned",
    "building",
    "opened",
    "deleted",
    "saved",
    "modified",
    "restarted",
  ];
  const done = completionIds.filter((id) => checked.includes(id)).length;
  return (
    <div className="container page-container lesson-page">
      <div className="breadcrumb">
        <a href="#/curriculum">커리큘럼</a>
        <Icon name="chevron" size={12} />
        <span>1주차</span>
      </div>
      <div className="lesson-intro">
        <div>
          <Eyebrow>WEEK 01 · FIRST BUILD</Eyebrow>
          <h1>
            내가 쓸 도구,
            <br />
            내가 만들기.
          </h1>
          <p>
            강의자료에서 필요한 페이지만 남기는 PDF 편집기.
            <br />
            오늘은 내 컴퓨터에서 쓸 도구 하나를 만듭니다.
          </p>
          <div className="lesson-meta">
            <span>필수 실습 60분</span>
            <span>자유 실습 30분</span>
            <span>PROJECT_BRIEF</span>
          </div>
        </div>
        <div className="lesson-intro-actions">
          <a className="button outlined" href="#/slides/1/1">
            <Icon name="play" size={16} /> 발표용 슬라이드{" "}
            <Icon name="up-right" size={16} />
          </a>
          <a className="text-link" href={briefUrl} download="PROJECT_BRIEF.md">
            <Icon name="download" size={16} /> PROJECT_BRIEF 받기
          </a>
        </div>
      </div>
      <div className="lesson-layout">
        <aside className="lesson-sidebar">
          <div className="sidebar-inner">
            <span className="sidebar-label">오늘의 순서</span>
            <nav aria-label="1주차 실습 단계">
              {steps.map((step, i) => (
                <button
                  key={step.id}
                  onClick={() =>
                    document
                      .getElementById(step.id)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {step.label}
                  {i === 4 && <span className="optional-dot" />}
                </button>
              ))}
            </nav>
            <div className="progress-box">
              <div>
                <span>나의 체크리스트</span>
                <strong>
                  {done}
                  <small> / 7</small>
                </strong>
              </div>
              <progress value={done} max={7} aria-label="1주차 완료 진행률" />
              <p>
                {done === 7
                  ? "필수 미션 완료! 추가 미션도 둘러보세요."
                  : "체크한 항목은 이 브라우저에 저장돼요."}
              </p>
            </div>
            <a href="#/prompts?category=week1" className="sidebar-link">
              프롬프트만 모아보기 <Icon name="up-right" size={15} />
            </a>
          </div>
        </aside>
        <div className="lesson-main">
          <section id="start" className="lesson-section">
            <LessonHeading
              number="01"
              title="일단, 작업부터 시작해볼까요?"
              description="아래 순서대로 복사해 Codex에 붙여넣으세요. 설명은 작업이 시작된 다음 함께 봅니다."
            />
            <div className="setup-strip">
              <span>시작 전 잠깐</span>
              <p>
                ChatGPT 앱에서 <strong>Codex</strong>를 열고, 강사와{" "}
                <strong>Sol 모델·권한 설정</strong>을 맞춰주세요.
              </p>
            </div>
            <PromptCard prompt={prompts[0]} />
            <Checklist
              id="cloned"
              checked={checked.includes("cloned")}
              onChange={toggle}
            >
              복제한 폴더를 프로젝트로 열었어요.
            </Checklist>
            <div className="between-note">
              <span>다음 프롬프트는</span>{" "}
              <strong>방금 연 프로젝트 안에서</strong> 입력해주세요.
            </div>
            <PromptCard prompt={prompts[1]} />
            <Checklist
              id="building"
              checked={checked.includes("building")}
              onChange={toggle}
            >
              Codex가 구현을 시작했어요.
            </Checklist>
            <p className="small-note">
              먼저 끝났다면 03단계에서 PDF를 열어보세요. 작업 시간은 기기와
              상황에 따라 달라질 수 있어요.
            </p>
          </section>
          <section id="understand" className="lesson-section">
            <LessonHeading
              number="02"
              title="방금, 무엇을 요청했을까요?"
              description="짧은 프롬프트 뒤에는 우리가 만들 도구의 설명서가 있습니다."
            />
            <div className="explain-pair">
              <article>
                <span>프롬프트</span>
                <h3>지금 할 일을 알려주기</h3>
                <p>
                  “PROJECT_BRIEF.md를 읽고
                  <br />
                  필수 기능을 구현해줘.”
                </p>
              </article>
              <article>
                <span>PROJECT_BRIEF</span>
                <h3>무엇을 만들지 정해두기</h3>
                <p>
                  누가 쓰는지, 꼭 필요한 기능,
                  <br />
                  이번에 만들지 않을 것, 완료 기준.
                </p>
              </article>
            </div>
            <details className="brief-details">
              <summary>
                <span>
                  <Icon name="file" size={18} /> 오늘 사용한 PROJECT_BRIEF.md
                </span>
                <span className="details-plus">+</span>
              </summary>
              <div className="brief-content">
                <div className="brief-tools">
                  <span>PDF 편집기 · 수업용 초안</span>
                  <a
                    href={briefUrl}
                    download="PROJECT_BRIEF.md"
                    className="text-link"
                  >
                    <Icon name="download" size={15} /> 파일 받기
                  </a>
                </div>
                <pre>{brief}</pre>
              </div>
            </details>
            <div className="margin-note">
              <span>기억할 것 하나</span>
              <p>
                “PDF 편집기”라고만 하면, 어떤 기능이 필요한지 AI가 추측하게
                돼요.
                <br />
                <strong>원하는 결과와 확인 방법</strong>까지 함께 알려주세요.
              </p>
            </div>
          </section>
          <section id="verify" className="lesson-section">
            <LessonHeading
              number="03"
              title="완성됐다면, 직접 써보세요."
              description="Codex가 알려준 주소를 열고, 3쪽 이상인 연습용 PDF로 확인합니다."
            />
            <div className="verification-list">
              <Checklist
                id="opened"
                checked={checked.includes("opened")}
                onChange={toggle}
              >
                PDF를 열었고, 각 페이지가 보여요.
              </Checklist>
              <Checklist
                id="deleted"
                checked={checked.includes("deleted")}
                onChange={toggle}
              >
                두 번째 페이지를 삭제했어요.
              </Checklist>
              <Checklist
                id="saved"
                checked={checked.includes("saved")}
                onChange={toggle}
              >
                저장한 파일을 다시 열었어요. 나머지 순서와 원본도 그대로예요.
              </Checklist>
            </div>
            <CommonPrompt />
          </section>
          <section id="modify" className="lesson-section">
            <LessonHeading
              number="04"
              title="이번에는, 내 말로 한 번 더."
              description="직접 써보니 아쉬운 점이 있나요? 작은 변경 하나를 골라 요청해보세요."
            />
            <div className="suggestion-chips">
              <span>미리보기를 조금 더 크게</span>
              <span>삭제 전에 한 번 확인하기</span>
              <span>저장 버튼 이름 바꾸기</span>
            </div>
            <PromptCard prompt={prompts[2]} defaultOpen={false} />
            <Checklist
              id="modified"
              checked={checked.includes("modified")}
              onChange={toggle}
            >
              원하는 부분을 바꿨고, 기존 기능도 다시 확인했어요.
            </Checklist>
            <PromptCard prompt={prompts[3]} defaultOpen={false} />
            <Checklist
              id="restarted"
              checked={checked.includes("restarted")}
              onChange={toggle}
            >
              도구를 종료했다가 다시 실행할 수 있어요.
            </Checklist>
            <div className="finish-note">
              <Icon name="check" size={22} />
              <div>
                <strong>여기까지 했다면, 오늘의 필수 실습 끝.</strong>
                <p>내가 만든 도구를 다음 과제에서도 꺼내 써보세요.</p>
              </div>
            </div>
          </section>
          <section id="extra" className="lesson-section extra-section">
            <Eyebrow>ONE MORE THING</Eyebrow>
            <h2>
              끝냈다면,
              <br />
              이런 기능도 추가해보세요.
            </h2>
            <p className="section-description">
              전부 할 필요는 없어요. 내가 쓰고 싶은 기능 하나를 골라보세요.
            </p>
            {missions.map((mission) => (
              <article className="mission-card" key={mission.id}>
                <div className="mission-top">
                  <span>MISSION {mission.number}</span>
                  <span>{mission.label}</span>
                </div>
                <h3>{mission.title}</h3>
                <p>{mission.description}</p>
                <div className="mission-done">
                  <Icon name="check" size={16} />
                  <span>{mission.done}</span>
                </div>
                <details className="mission-hint">
                  <summary>
                    어떻게 요청할지 막혔다면 <span>+</span>
                  </summary>
                  <div>
                    <p>{mission.hint}</p>
                    <CopyButton text={mission.hint} label="힌트 복사" />
                  </div>
                </details>
              </article>
            ))}
          </section>
          <div className="next-week">
            <span>NEXT WEEK</span>
            <a href="#/week/2">
              <div>
                <h3>내 도구에 주소가 생겼다</h3>
                <p>2주차 · 개인용 웹 도구 제작과 배포</p>
              </div>
              <Icon name="arrow" size={26} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function UpcomingWeek({ week }: { week: Week }) {
  return (
    <div className="container page-container upcoming-page">
      <div className="breadcrumb">
        <a href="#/curriculum">커리큘럼</a>
        <Icon name="chevron" size={12} />
        <span>{week.number}주차</span>
      </div>
      <div className="page-intro">
        <Eyebrow>WEEK {String(week.number).padStart(2, "0")} · PREVIEW</Eyebrow>
        <h1>{week.title}</h1>
        <p>{week.description}</p>
      </div>
      <div className="upcoming-grid">
        <div>
          <span className="small-label">이번 주에 만드는 것</span>
          <h2>{week.subtitle}</h2>
          <p className="upcoming-outcome">{week.outcome}</p>
          <div className="learning-goals">
            {week.goals.map((goal, i) => (
              <div key={goal}>
                <span>0{i + 1}</span>
                <p>{goal}</p>
              </div>
            ))}
          </div>
        </div>
        <aside className="upcoming-note">
          <Icon name="book" size={26} />
          <h3>상세 교안을 준비하고 있어요.</h3>
          <p>
            지금은 이번 주의 주제와 목표를 볼 수 있어요. 단계별 실습과
            프롬프트는 수업 전에 추가됩니다.
          </p>
          <span>{week.topic}</span>
          <a href="#/week/1" className="text-link">
            1주차 자료 먼저 보기 <Icon name="arrow" size={16} />
          </a>
        </aside>
      </div>
      <div className="week-pagination">
        <a href={`#/week/${week.number - 1}`}>
          <span>← 이전 주차</span>
          <strong>{weeks[week.number - 2].title}</strong>
        </a>
        {week.number < 7 && (
          <a href={`#/week/${week.number + 1}`}>
            <span>다음 주차 →</span>
            <strong>{weeks[week.number].title}</strong>
          </a>
        )}
      </div>
    </div>
  );
}

function PromptsPage({ initialCategory }: { initialCategory: string | null }) {
  const [category, setCategory] = useState(
    initialCategory === "week1" || initialCategory === "common"
      ? initialCategory
      : "all",
  );
  const [search, setSearch] = useState("");
  useEffect(
    () =>
      setCategory(
        initialCategory === "week1" || initialCategory === "common"
          ? initialCategory
          : "all",
      ),
    [initialCategory],
  );
  const filtered = prompts.filter(
    (prompt) =>
      (category === "all" || category === prompt.category) &&
      `${prompt.title} ${prompt.when} ${prompt.text}`
        .toLowerCase()
        .includes(search.toLowerCase().trim()),
  );
  return (
    <div className="container page-container prompts-page">
      <div className="page-intro">
        <Eyebrow>COPY, PASTE, AND MAKE</Eyebrow>
        <h1>
          필요한 순간에,
          <br />
          꺼내 쓰는 프롬프트.
        </h1>
        <p>수업에서 놓쳤어도 괜찮아요. 여기서 복사해서 이어가세요.</p>
      </div>
      <div className="prompt-filter-bar">
        <div className="filter-tabs" aria-label="프롬프트 분류">
          {[
            { id: "all", label: "전체" },
            { id: "week1", label: "1주차" },
            { id: "common", label: "공통 도구" },
          ].map((tab) => (
            <button
              key={tab.id}
              aria-pressed={category === tab.id}
              className={category === tab.id ? "selected" : ""}
              onClick={() => setCategory(tab.id)}
            >
              {tab.label}
              <span>
                {tab.id === "all"
                  ? prompts.length
                  : prompts.filter((prompt) => prompt.category === tab.id)
                      .length}
              </span>
            </button>
          ))}
        </div>
        <label className="search-box">
          <Icon name="search" size={17} />
          <input
            type="search"
            aria-label="프롬프트 검색"
            placeholder="어떤 도움이 필요한가요?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>
      <p className="filter-result" aria-live="polite">
        {filtered.length}개의 프롬프트{" "}
        <span>대괄호 [ ] 부분은 내 상황에 맞게 바꿔주세요.</span>
      </p>
      <div className="prompt-library">
        {filtered.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} defaultOpen={false} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="empty-state">
          <Icon name="search" size={32} />
          <h2>일치하는 프롬프트가 없어요.</h2>
          <p>‘수정’, ‘에러’, ‘실행’처럼 짧은 단어로 찾아보세요.</p>
          <button
            className="button outlined"
            onClick={() => {
              setSearch("");
              setCategory("all");
            }}
          >
            전체 프롬프트 보기
          </button>
        </div>
      )}
      <div className="prompt-library-note">
        <Icon name="book" size={20} />
        <p>
          어떤 순서로 사용할지 궁금하다면 <a href="#/week/1">1주차 실습 안내</a>
          를 함께 열어두세요.
        </p>
      </div>
    </div>
  );
}

function Guide() {
  const [os, setOs] = useState<"windows" | "mac">("windows");
  return (
    <div className="container page-container guide-page">
      <div className="page-intro">
        <Eyebrow>A LITTLE HELP ALONG THE WAY</Eyebrow>
        <h1>
          처음이니까,
          <br />
          같이 확인해요.
        </h1>
        <p>
          환경 설정은 0주차 안내를 따라 준비하고, 수업에서는 바로 만들기를
          시작합니다.
        </p>
      </div>
      <div className="guide-grid">
        <section>
          <span className="small-label">수업에 가져올 것</span>
          <h2>노트북과, 만들고 싶은 마음.</h2>
          <ul className="bring-list">
            <li>
              <Icon name="check" />
              Windows 노트북 또는 MacBook
            </li>
            <li>
              <Icon name="check" />
              ChatGPT 앱 설치 및 Plus 계정 로그인
            </li>
            <li>
              <Icon name="check" />
              0주차에 안내한 개발 환경
            </li>
            <li>
              <Icon name="check" />
              충전기와 인터넷 연결
            </li>
          </ul>
          <div className="os-selector">
            <span>내 컴퓨터에서는</span>
            <div>
              <button
                className={os === "windows" ? "selected" : ""}
                aria-pressed={os === "windows"}
                onClick={() => setOs("windows")}
              >
                Windows
              </button>
              <button
                className={os === "mac" ? "selected" : ""}
                aria-pressed={os === "mac"}
                onClick={() => setOs("mac")}
              >
                Mac
              </button>
            </div>
          </div>
          <div className="os-tip">
            <h3>
              {os === "windows"
                ? "파일 탐색기에서 폴더를 확인해요."
                : "Finder에서 폴더를 확인해요."}
            </h3>
            <p>
              {os === "windows"
                ? "바탕화면이 OneDrive에 연결되어 있을 수 있어요. Codex가 알려준 전체 경로로 실습 폴더를 찾으세요."
                : "바탕화면에서 실습 폴더를 찾으세요. 폴더 접근을 요청하는 창이 나오면 대상이 수업 폴더인지 확인하세요."}
            </p>
            <div>
              <span>복사 / 붙여넣기</span>
              <kbd>{os === "windows" ? "Ctrl" : "⌘"} C</kbd>
              <kbd>{os === "windows" ? "Ctrl" : "⌘"} V</kbd>
            </div>
          </div>
        </section>
        <aside className="guide-session">
          <Eyebrow light>OUR SESSION</Eyebrow>
          <div>
            <strong>
              60<span>min</span>
            </strong>
            <h3>함께 만드는 시간</h3>
            <p>강사와 필수 범위까지 진행합니다.</p>
          </div>
          <span className="session-plus">+</span>
          <div>
            <strong>
              30<span>min</span>
            </strong>
            <h3>내 속도로 만드는 시간</h3>
            <p>
              막힌 부분을 해결하거나
              <br />
              추가 미션에 도전합니다.
            </p>
          </div>
          <footer>10명의 스터디원, 함께하는 7주.</footer>
        </aside>
      </div>
      <section className="faq-section">
        <Eyebrow>GOOD TO KNOW</Eyebrow>
        <h2>이럴 때는 어떻게 하나요?</h2>
        {[
          {
            q: "AI가 아직 작업 중인데, 다음 단계로 넘어가도 되나요?",
            a: "구현이 끝날 때까지 새 수정 요청은 기다려주세요. 그동안 PROJECT_BRIEF 설명을 읽고, PDF에서 어떤 결과가 나와야 하는지 확인해두면 좋아요. 다음 단계에서 필요한 결과물이 나오지 않았다면 강사에게 알려주세요.",
          },
          {
            q: "똑같은 프롬프트를 넣었는데 화면이 달라요.",
            a: "색이나 배치가 조금 다를 수 있어요. 수업에서는 기능이 되는지 먼저 확인합니다. PDF가 열리고, 선택한 페이지를 삭제하고, 새 파일을 저장할 수 있다면 다음 단계로 진행해도 괜찮아요.",
          },
          {
            q: "에러가 났는데 무슨 뜻인지 모르겠어요.",
            a: "어떤 순서로 무엇을 했는지, 어떤 결과를 기대했는지 적고 에러 원문이나 화면을 함께 전달해주세요. 프롬프트 모음의 “막힌 상황 전달하기”를 사용해도 좋아요. 계속 같은 곳에서 막히면 강사에게 알려주세요.",
          },
          {
            q: "추가 미션은 전부 해야 하나요?",
            a: "아니요. 필수 실습을 끝낸 뒤 더 만들어보고 싶을 때 선택하는 미션이에요. 한 가지를 골라 내 도구에 적용해보세요.",
          },
          {
            q: "체크리스트는 다른 기기에서도 이어지나요?",
            a: "현재는 이 브라우저에만 저장돼요. 다른 기기나 브라우저에는 연결되지 않고, 브라우저 데이터를 지우면 초기화될 수 있어요.",
          },
        ].map((item) => (
          <details className="faq-item" key={item.q}>
            <summary>
              {item.q}
              <span className="details-plus">+</span>
            </summary>
            <p>{item.a}</p>
          </details>
        ))}
      </section>
      <QuickHelp />
    </div>
  );
}

function SlideDeck({ index }: { index: number }) {
  const [overview, setOverview] = useState(false);
  const slide = slides[index];
  const go = (next: number) => {
    window.location.hash = `/slides/1/${Math.max(1, Math.min(slides.length, next + 1))}`;
    setOverview(false);
  };
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        (event.target instanceof HTMLElement &&
          ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName))
      )
        return;
      if (["ArrowRight", "ArrowDown", " ", "PageDown"].includes(event.key)) {
        event.preventDefault();
        go(index + 1);
      }
      if (["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        go(index - 1);
      }
      if (event.key === "Home") {
        event.preventDefault();
        go(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        go(slides.length - 1);
      }
      if (event.key.toLowerCase() === "o") setOverview((value) => !value);
      if (event.key === "Escape") {
        if (overview) setOverview(false);
        else window.location.hash = "/week/1";
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [index, overview]);
  return (
    <div className={`slide-deck slide-${slide.type}`}>
      <header className="slide-header">
        <a href="#/week/1" className="slide-back">
          ← 1주차 실습으로
        </a>
        <span>
          KUCC <span>/</span> VIBE CODING
        </span>
        <button
          className="icon-button"
          onClick={() => setOverview(!overview)}
          aria-label={overview ? "슬라이드 목차 닫기" : "슬라이드 목차 열기"}
          aria-expanded={overview}
        >
          <Icon name={overview ? "close" : "grid"} />
        </button>
      </header>
      <main id="main-content" tabIndex={-1} className="slide-stage">
        {overview ? (
          <div className="slide-overview">
            <Eyebrow>WEEK 01 · 전체 슬라이드</Eyebrow>
            <div>
              {slides.map((item, i) => (
                <button
                  key={item.eyebrow}
                  className={i === index ? "selected" : ""}
                  onClick={() => go(i)}
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <strong>{item.title.replace("\n", " ")}</strong>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <article className="slide-content" key={index}>
            <Eyebrow>{slide.eyebrow}</Eyebrow>
            <h1>
              {slide.title.split("\n").map((line, i) => (
                <span key={i}>{line}</span>
              ))}
            </h1>
            <p className="slide-body">{slide.body}</p>
            <p className="slide-note">{slide.note}</p>
            {slide.type === "cover" && (
              <span className="slide-decoration" aria-hidden="true">
                ↗
              </span>
            )}
          </article>
        )}
      </main>
      <footer className="slide-controls">
        <span className="slide-keyboard">
          ← → 이동 <span>·</span> O 목차 <span>·</span> Esc 실습으로
        </span>
        <div className="slide-dots" aria-label="슬라이드 선택">
          {slides.map((_, i) => (
            <button
              key={i}
              className={i === index ? "selected" : ""}
              aria-label={`${i + 1}번 슬라이드`}
              aria-current={i === index ? "step" : undefined}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <div className="slide-pagination">
          <span>
            {String(index + 1).padStart(2, "0")}{" "}
            <small>/ {String(slides.length).padStart(2, "0")}</small>
          </span>
          <button
            className="icon-button prev-arrow"
            disabled={index === 0}
            onClick={() => go(index - 1)}
            aria-label="이전 슬라이드"
          >
            <Icon name="arrow" />
          </button>
          <button
            className="icon-button"
            disabled={index === slides.length - 1}
            onClick={() => go(index + 1)}
            aria-label="다음 슬라이드"
          >
            <Icon name="arrow" />
          </button>
        </div>
      </footer>
      <div
        className="slide-progress"
        style={{ width: `${((index + 1) / slides.length) * 100}%` }}
      />
    </div>
  );
}

function NotFound() {
  return (
    <div className="container not-found">
      <Eyebrow>404 · 길을 조금 벗어났네요</Eyebrow>
      <h1>
        이 페이지는
        <br />
        아직 없어요.
      </h1>
      <p>커리큘럼에서 찾는 수업을 골라주세요.</p>
      <a href="#/curriculum" className="button primary">
        수업 자료로 돌아가기 <Icon name="arrow" />
      </a>
    </div>
  );
}

export default function App() {
  const [hash, setHash] = useState(window.location.hash.slice(1) || "/");
  const [path, query = ""] = hash.split("?");
  const weekMatch = path.match(/^\/week\/([1-7])\/?$/);
  const slideMatch = path.match(/^\/slides\/1\/(\d+)\/?$/);
  const slideIndex = slideMatch ? Number(slideMatch[1]) - 1 : -1;
  const isSlide = slideIndex >= 0 && slideIndex < slides.length;
  useEffect(() => {
    const update = () => setHash(window.location.hash.slice(1) || "/");
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const title = isSlide
      ? `1주차 슬라이드 ${slideIndex + 1}`
      : weekMatch
        ? `${weekMatch[1]}주차 · ${weeks[Number(weekMatch[1]) - 1].subtitle}`
        : path === "/prompts"
          ? "프롬프트 모음"
          : path === "/curriculum"
            ? "7주 커리큘럼"
            : path === "/guide"
              ? "이용 안내"
              : "바이브코딩 스터디";
    document.title = `KUCC — ${title}`;
    document.getElementById("main-content")?.focus({ preventScroll: true });
  }, [path]);
  if (isSlide) return <SlideDeck index={slideIndex} />;
  let page;
  if (path === "/") page = <Home />;
  else if (path === "/curriculum") page = <Curriculum />;
  else if (path === "/prompts")
    page = (
      <PromptsPage
        initialCategory={new URLSearchParams(query).get("category")}
      />
    );
  else if (path === "/guide") page = <Guide />;
  else if (weekMatch)
    page =
      Number(weekMatch[1]) === 1 ? (
        <WeekOne />
      ) : (
        <UpcomingWeek week={weeks[Number(weekMatch[1]) - 1]} />
      );
  else page = <NotFound />;
  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        본문 바로가기
      </a>
      <Header route={path} />
      <main id="main-content" tabIndex={-1}>
        {page}
      </main>
      <Footer />
    </>
  );
}
