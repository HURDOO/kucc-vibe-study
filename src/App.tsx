import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { prompts, weeks, type Week } from "./content";
import WeekOne from "./WeekOne";
import { slides } from "./week-one-slides";
import "./slide-deck.css";
import {
  Eyebrow,
  Footer,
  Header,
  Icon,
  PageIntro,
  PromptCard,
  QuickHelp,
} from "./components";

function CurriculumRows({ compact = false }: { compact?: boolean }) {
  const parts = [
    { label: "PART 1 · 1–3주차", title: "함께 만들며 익히기", from: 1, to: 3 },
    { label: "PART 2 · 4–7주차", title: "내 프로젝트 완성하기", from: 4, to: 7 },
  ];
  return (
    <div className="curriculum-list">
      {parts.map((part) => (
        <section className="curriculum-part" key={part.label}>
          <h3 className="curriculum-part-title">
            <span>// {part.label}</span> {part.title}
          </h3>
          {weeks
            .filter((week) => week.number >= part.from && week.number <= part.to)
            .map((week) => (
              <a
                href={`#/week/${week.number}`}
                className={`curriculum-row${week.number === 1 ? " current" : ""}`}
                key={week.number}
              >
                <span className="week-index">
                  {String(week.number).padStart(2, "0")}
                </span>
                <div className="week-description">
                  <h4>{week.title}</h4>
                  <p>{week.subtitle}</p>
                  {!compact && (
                    <span className="week-detail">{week.description}</span>
                  )}
                </div>
                <span className="week-topic">{week.topic}</span>
                <span className="status-label">
                  {week.number === 1 ? "자료 보기" : "미리보기"}
                </span>
              </a>
            ))}
        </section>
      ))}
    </div>
  );
}

function Home() {
  return (
    <>
      <section className="home-hero">
        <span className="hero-mark" aria-hidden="true">
          VIBE
        </span>
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="step-pill">
              <span aria-hidden="true">&gt;</span> WEEK 01 · 1주차 자료가
              열렸어요
            </p>
            <Eyebrow>KUCC VIBE CODING STUDY · 7 WEEKS</Eyebrow>
            <h1 className="gradient-title">
              작은 도구부터,
              <br />
              직접 만들어봐요.
            </h1>
            <p className="hero-description">
              코딩이 처음이어도 괜찮아요. 기획서를 쓰고, 에이전트에게 맡기고,
              결과를 확인하고, 다시 개선해요.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#/week/1">
                1주차 실습 시작하기 <Icon name="arrow" size={18} />
              </a>
              <a className="button outlined" href="#/slides/1/1">
                <Icon name="play" size={16} /> 발표 슬라이드
              </a>
            </div>
          </div>
          <img className="hero-logo" src="/slides/kucc-logo.svg" alt="" />
        </div>
      </section>
      <section className="container home-section">
        <div className="section-heading">
          <div>
            <Eyebrow>THIS WEEK</Eyebrow>
            <h2>내가 쓸 PDF 편집기, 오늘 직접 만들어요.</h2>
            <p>준비된 프롬프트로 시작하고, 내 말로 바꿔보세요.</p>
          </div>
        </div>
        <nav className="resource-shortcuts" aria-label="1주차 자료 바로가기">
          {[
            {
              href: "#/week/1",
              icon: "book" as const,
              title: "실습 안내",
              text: "복제부터 2차 개선까지 순서대로 따라가요",
            },
            {
              href: "#/slides/1/1",
              icon: "play" as const,
              title: "발표 슬라이드",
              text: "오늘 수업 45장을 한눈에 보기",
            },
            {
              href: "#/prompts",
              icon: "copy" as const,
              title: "프롬프트 모음",
              text: "필요할 때 복사해서 써요",
            },
          ].map((item, i) => (
            <a href={item.href} key={item.href}>
              <span className="shortcut-top">
                <Icon name={item.icon} size={26} />
                <span>{String(i + 1).padStart(2, "0")}</span>
              </span>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
              <Icon name="arrow" size={20} className="shortcut-arrow" />
            </a>
          ))}
        </nav>
      </section>
      <section className="container home-section">
        <div className="section-heading">
          <div>
            <Eyebrow>CURRICULUM</Eyebrow>
            <h2>7주 동안 함께 만들 것들</h2>
            <p>작은 도구로 연습하고, 나만의 프로젝트로 이어가요.</p>
          </div>
          <a className="text-link" href="#/curriculum">
            전체 보기 <Icon name="arrow" size={16} />
          </a>
        </div>
        <CurriculumRows compact />
        <p className="section-footnote">
          1주차 실습 자료가 준비되어 있어요. 다음 주차의 상세 자료는 순서대로
          채워집니다.
        </p>
      </section>
      <section className="container home-section">
        <div className="section-heading">
          <div>
            <Eyebrow>HOW WE STUDY</Eyebrow>
            <h2>우리 스터디는 이렇게 진행해요</h2>
            <p>처음부터 다 알 필요는 없어요. 하나씩 해보면 돼요.</p>
          </div>
        </div>
        <div className="way-grid">
          {[
            {
              title: "복사해서 바로 시작하기",
              text: "처음부터 잘 요청할 필요는 없어요. 준비된 프롬프트로 첫 도구를 만듭니다.",
            },
            {
              title: "써보고 내 말로 수정하기",
              text: "버튼 하나부터 기능 하나까지. 직접 써보며 필요한 것을 바꿔봅니다.",
            },
            {
              title: "개선 브리프로 다시 구현",
              text: "사용해본 경험을 브리프에 적어요. 필요한 기능을 골라 한 번 더 구현해요.",
            },
          ].map((item, i) => (
            <article key={item.title}>
              <span className="way-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <p className="loop-strip">
          <span aria-hidden="true">↺</span> 다시 01로 — 원하는 만큼 반복하면
          계속 좋아져요
        </p>
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
      <PageIntro
        eyebrow="THE SEVEN-WEEK JOURNEY"
        title={
          <>
            이번 주에는
            <br />
            무엇을 만들어볼까요?
          </>
        }
        description="첫 도구부터 나만의 프로젝트까지. 각 주차에서 자료와 실습을 확인하세요."
        mark="07"
      >
        <div className="intro-chips">
          <span>7주 과정</span>
          <span>함께하는 60분 + 자유 실습 30분</span>
        </div>
      </PageIntro>
      <CurriculumRows />
      <QuickHelp />
    </div>
  );
}

function UpcomingWeek({ week }: { week: Week }) {
  return (
    <div className="container page-container upcoming-page">
      <div className="breadcrumb">
        <a href="#/curriculum">커리큘럼</a>
        <span aria-hidden="true">/</span>
        <span>{week.number}주차</span>
      </div>
      <PageIntro
        eyebrow={`WEEK ${String(week.number).padStart(2, "0")} · PREVIEW`}
        title={week.title}
        description={week.description}
        mark={String(week.number).padStart(2, "0")}
      />
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
      <PageIntro
        eyebrow="COPY, PASTE, AND MAKE"
        title={
          <>
            필요한 순간에,
            <br />
            꺼내 쓰는 프롬프트.
          </>
        }
        description="수업에서 놓쳤어도 괜찮아요. 여기서 복사해서 이어가세요."
        mark=">_"
      />
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
          <PromptCard
            key={prompt.id}
            prompt={prompt}
            defaultOpen={prompt.id === "1-1"}
          />
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
      <PageIntro
        eyebrow="A LITTLE HELP ALONG THE WAY"
        title={
          <>
            처음이니까,
            <br />
            같이 확인해요.
          </>
        }
        description="환경 설정은 0주차 안내를 따라 준비하고, 수업에서는 바로 만들기를 시작합니다."
        mark="?"
      />
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
              개선 브리프를 적용합니다.
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
            a: "구현이 끝날 때까지 새 수정 요청은 기다려주세요. 그동안 Codex 설명을 듣거나, PDF에서 어떤 결과가 나와야 하는지 확인해두면 좋아요. 다음 단계에서 필요한 결과물이 나오지 않았다면 강사에게 알려주세요.",
          },
          {
            q: "똑같은 프롬프트를 넣었는데 화면이 달라요.",
            a: "색이나 배치가 조금 다를 수 있어요. 수업에서는 기능이 되는지 먼저 확인합니다. 1주차의 다섯 가지 기본 기능 체크리스트를 모두 확인한 뒤 개선 브리프를 작성해요.",
          },
          {
            q: "에러가 났는데 무슨 뜻인지 모르겠어요.",
            a: "어떤 순서로 무엇을 했는지, 어떤 결과를 기대했는지 적고 에러 원문이나 화면을 함께 전달해주세요. 프롬프트 모음의 “막힌 상황 전달하기”를 사용해도 좋아요. 계속 같은 곳에서 막히면 강사에게 알려주세요.",
          },
          {
            q: "개선 후보는 전부 구현해야 하나요?",
            a: "아니요. 직접 써보며 필요했던 기능을 골라요. 여러 개를 선택해도 되며, IMPROVEMENTS_BRIEF.txt에 우선순위를 적어주세요. 모르는 칸은 미정으로 두어도 됩니다.",
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

function SlideCanvas({ html, index }: { html: string; index: number }) {
  const frame = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  useLayoutEffect(() => {
    const element = frame.current;
    if (!element) return;
    const update = () =>
      setScale(
        Math.min(element.clientWidth / 1920, element.clientHeight / 1080),
      );
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="slide-frame" ref={frame}>
      <div
        className="slide-canvas"
        style={{ width: 1920 * scale, height: 1080 * scale }}
      >
        <div
          key={index}
          className="deck-slide"
          style={{ transform: `scale(${scale})` }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}

function useIdle(delay: number) {
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    let timer = window.setTimeout(() => setIdle(true), delay);
    const wake = () => {
      setIdle(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setIdle(true), delay);
    };
    window.addEventListener("pointermove", wake);
    window.addEventListener("pointerdown", wake);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointermove", wake);
      window.removeEventListener("pointerdown", wake);
    };
  }, [delay]);
  return idle;
}

function toggleFullscreen() {
  if (document.fullscreenElement) document.exitFullscreen();
  else document.documentElement.requestFullscreen().catch(() => {});
}

function SlideDeck({ index }: { index: number }) {
  const [overview, setOverview] = useState(false);
  const [fullscreen, setFullscreen] = useState(!!document.fullscreenElement);
  const idle = useIdle(2500);
  const slide = slides[index];
  useEffect(() => {
    const update = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", update);
    return () => document.removeEventListener("fullscreenchange", update);
  }, []);
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
          (event.target.closest(
            "input, textarea, select, [contenteditable=true]",
          ) ||
            (event.key === " " && event.target.closest("button, a, summary"))))
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
      if (event.key.toLowerCase() === "f" && document.fullscreenEnabled)
        toggleFullscreen();
      if (event.key === "Escape") {
        if (overview) setOverview(false);
        else window.location.hash = "/week/1";
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [index, overview]);
  return (
    <div className={`slide-deck${idle && !overview ? " idle" : ""}`}>
      <header className="slide-header">
        <a href="#/week/1" className="slide-back">
          ← 1주차 실습으로
        </a>
        <span>
          KUCC <span>/</span> VIBE CODING
        </span>
        <div className="slide-header-actions">
          {document.fullscreenEnabled && (
            <button
              className="icon-button"
              onClick={toggleFullscreen}
              aria-label={fullscreen ? "전체 화면 끝내기" : "전체 화면"}
            >
              <Icon name={fullscreen ? "shrink" : "expand"} />
            </button>
          )}
          <button
            className="icon-button"
            onClick={() => setOverview(!overview)}
            aria-label={overview ? "슬라이드 목차 닫기" : "슬라이드 목차 열기"}
            aria-expanded={overview}
          >
            <Icon name={overview ? "close" : "grid"} />
          </button>
        </div>
      </header>
      <main id="main-content" tabIndex={-1} className="slide-stage">
        {overview ? (
          <div className="slide-overview">
            <Eyebrow>WEEK 01 · 전체 슬라이드</Eyebrow>
            <div>
              {slides.map((item, i) => (
                <button
                  key={item.id}
                  className={i === index ? "selected" : ""}
                  onClick={() => go(i)}
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <strong>{item.title}</strong>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <SlideCanvas html={slide.html} index={index} />
        )}
      </main>
      <footer className="slide-controls">
        <span className="slide-keyboard">
          ← → 이동 <span>·</span> O 목차 <span>·</span> F 전체 화면{" "}
          <span>·</span> Esc 실습으로
        </span>
        <button
          className="slide-index-button"
          onClick={() => setOverview(!overview)}
          aria-expanded={overview}
        >
          전체 {slides.length}장 · 목차
        </button>
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
    <div className="container page-container not-found">
      <PageIntro
        eyebrow="404 · 길을 조금 벗어났네요"
        title={
          <>
            이 페이지는
            <br />
            아직 없어요.
          </>
        }
        description="커리큘럼에서 찾는 수업을 골라주세요."
        mark="404"
      >
        <a href="#/curriculum" className="button primary">
          수업 자료로 돌아가기 <Icon name="arrow" />
        </a>
      </PageIntro>
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
    const section =
      path === "/week/1" ? new URLSearchParams(query).get("section") : null;
    const target = section ? document.getElementById(section) : null;
    if (target) target.scrollIntoView({ block: "start" });
    else window.scrollTo({ top: 0, behavior: "instant" });
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
  }, [path, query]);
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
