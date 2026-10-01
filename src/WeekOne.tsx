import { type ReactNode } from "react";
import CodexIntro from "./CodexIntro";
import {
  Checklist,
  CommonPrompt,
  CopyButton,
  Eyebrow,
  Icon,
  PromptCard,
  useProgress,
} from "./components";
import {
  brief,
  briefSections,
  featureChecks,
  improvementIdeas,
  improvementsBrief,
  modelRows,
  sources,
  undoBadExample,
  undoGoodExample,
  weekOnePrompts,
  weekOneRepository,
} from "./week-one";
import { slideHref } from "./week-one-slides";
import briefUrl from "./materials/PROJECT_BRIEF.txt?url&no-inline";
import improvementsUrl from "./materials/IMPROVEMENTS_BRIEF.txt?url&no-inline";

function LessonSection({
  id,
  number,
  title,
  description,
  children,
}: {
  id: string;
  number: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="lesson-section">
      <div className="lesson-heading">
        <p className="step-pill">
          <span aria-hidden="true">&gt;</span> STEP {number}
        </p>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {children}
    </section>
  );
}

function Material({
  name,
  text,
  url,
}: {
  name: string;
  text: string;
  url: string;
}) {
  return (
    <details className="brief-details">
      <summary>
        <span>
          <Icon name="file" size={18} />
          {name} 원문
        </span>
        <span className="details-plus">+</span>
      </summary>
      <div className="brief-content">
        <div className="brief-tools">
          <CopyButton text={text} label="원문 복사" />
          <a className="text-link" href={url} download={name}>
            <Icon name="download" size={15} />
            파일 받기
          </a>
        </div>
        <pre>{text}</pre>
      </div>
    </details>
  );
}

export function ModelTable() {
  return (
    <div className="model-table-wrap">
      <table className="model-table">
        <caption>오늘 사용할 모델과 역할 예시</caption>
        <thead>
          <tr>
            <th scope="col">모델</th>
            <th scope="col">역할</th>
            <th scope="col">특성</th>
          </tr>
        </thead>
        <tbody>
          {modelRows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) =>
                i === 0 ? (
                  <th scope="row" key={i}>
                    {cell}
                  </th>
                ) : (
                  <td key={i}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function WeekOne() {
  const { checked, toggle } = useProgress();
  const steps = [
    { id: "start", label: "레포 복제와 자기소개" },
    { id: "brief", label: "프로젝트와 브리프 열기" },
    { id: "build", label: "1차 구현과 Codex" },
    { id: "verify", label: "1차 결과물 확인" },
    { id: "improve", label: "개선 브리프 작성" },
    { id: "build-again", label: "2차 구현과 이야기" },
    { id: "finish", label: "결과 확인과 다음 회차" },
  ];
  const completionIds = [
    "cloned",
    "brief-read",
    "built",
    ...featureChecks.map((x) => x.id),
    "improvements-saved",
    "improved",
    "regression",
    "restarted",
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
        <span>1주차</span>
      </div>
      <div className="lesson-intro">
        <span className="page-mark" aria-hidden="true">
          01
        </span>
        <div>
          <Eyebrow>WEEK 01 · BUILD, TRY, IMPROVE</Eyebrow>
          <h1 className="gradient-title">
            내가 쓸 도구,
            <br />
            내가 만들기.
          </h1>
          <p className="page-description">
            강의자료에 필기하고 페이지를 편집하는 PDF 도구.
            <br />첫 버전을 써보고, 내 브리프로 한 번 더 개선합니다.
          </p>
          <div className="lesson-meta">
            <span>1차 구현</span>
            <span aria-hidden="true">→</span>
            <span>직접 사용</span>
            <span aria-hidden="true">→</span>
            <span>2차 개선</span>
          </div>
        </div>
        <div className="lesson-intro-actions">
          <a className="button primary" href={slideHref("cover")}>
            <Icon name="play" size={16} />
            발표용 웹 슬라이드
          </a>
          <a className="text-link" href={briefUrl} download="PROJECT_BRIEF.txt">
            <Icon name="download" size={16} />
            PROJECT_BRIEF 받기
          </a>
          <a
            className="text-link"
            href={improvementsUrl}
            download="IMPROVEMENTS_BRIEF.txt"
          >
            <Icon name="download" size={16} />
            IMPROVEMENTS_BRIEF 받기
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
                    document.getElementById(step.id)?.scrollIntoView({
                      behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)",
                      ).matches
                        ? "instant"
                        : "smooth",
                      block: "start",
                    })
                  }
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {step.label}
                </button>
              ))}
            </nav>
            <div className="progress-box">
              <div>
                <span>나의 체크리스트</span>
                <strong>
                  {done}
                  <small> / {completionIds.length}</small>
                </strong>
              </div>
              <progress
                value={done}
                max={completionIds.length}
                aria-label="1주차 완료 진행률"
              />
              <p>
                {done === completionIds.length
                  ? "오늘의 실습 완료! 다음에도 이어서 개선해보세요."
                  : "체크한 항목은 이 브라우저에 저장돼요."}
              </p>
            </div>
            <a href="#/prompts?category=week1" className="sidebar-link">
              프롬프트만 모아보기 <Icon name="up-right" size={15} />
            </a>
          </div>
        </aside>
        <div className="lesson-main">
          <LessonSection
            id="start"
            number="01"
            title="첫 프롬프트로 시작해요"
            description="프롬프트를 복사해 Codex에 붙여넣고 엔터를 누르세요."
          >
            <div className="setup-strip">
              <span>시작 전</span>
              <p>
                ChatGPT 앱에서 Codex를 열고, 강사와{" "}
                <strong>Sol 모델·권한 설정</strong>을 맞춰주세요.
              </p>
            </div>
            <PromptCard prompt={weekOnePrompts[0]} />
            <div className="discussion-card">
              <Eyebrow>복제를 기다리며</Eyebrow>
              <h3>가볍게 자기소개</h3>
              <p>학과, 학년, AI를 얼마나 써봤는지 이야기해요.</p>
              <details>
                <summary>스터디장 소개 예시</summary>
                <p>
                  컴퓨터학과 1학년이고, AI는 두 가지 방면으로 써봤습니다.
                  바이브코딩으로 기기 간 파일을 간편하게 공유하는 개인
                  클라우드를 만들었고, 수업 자료와 녹음을 ChatGPT에 올려
                  슬라이드 옆에 설명을 적은 복습용 필기본도 만들고 있습니다.
                </p>
              </details>
            </div>
            {check(
              "cloned",
              "바탕화면에 kucc-vibe-study-week1 폴더가 생겼어요.",
            )}
          </LessonSection>
          <LessonSection
            id="brief"
            number="02"
            title="프로젝트를 열고 브리프 함께 읽기"
            description="복제한 폴더를 프로젝트로 선택하고, 그 안에서 대화를 시작하세요."
          >
            <PromptCard prompt={weekOnePrompts[1]} />
            <p className="small-note">
              사이드 패널의 ‘파일’에서 PROJECT_BRIEF.txt를 띄워요. 파일이 보이지
              않으면 Codex가 알려준 경로를 파일 탐색기나 Finder에서 찾아 텍스트
              편집기로 열어도 됩니다.
            </p>
            <div className="margin-note">
              <span>첫 번째 사용 가능 버전, MVP</span>
              <p>
                먼저 만들 핵심 기능과 사용 흐름을 정해요. 오늘은 PDF
                불러오기부터 필기·페이지 편집·합치기·저장까지 실제로 사용할 수
                있는 첫 버전을 만듭니다.
              </p>
            </div>
            <div className="brief-reading">
              {briefSections.map((part) => (
                <details className="faq-item" key={part.title}>
                  <summary>
                    {part.title}
                    <span className="details-plus">+</span>
                  </summary>
                  <p>{part.explanation}</p>
                  <pre>{part.excerpt}</pre>
                  <a className="text-link" href={slideHref(part.slide)}>
                    이 부분 슬라이드로 보기 <Icon name="up-right" size={14} />
                  </a>
                </details>
              ))}
            </div>
            <Material name="PROJECT_BRIEF.txt" text={brief} url={briefUrl} />
            <p className="small-note">
              실습 레포 원문 기준 ·{" "}
              <a
                href={weekOneRepository.replace(/\.git$/, "")}
                target="_blank"
                rel="noreferrer"
              >
                GitHub에서 보기
              </a>
            </p>
            {check(
              "brief-read",
              "첫 버전의 기능, 제외할 기능, 기술과 실행 환경을 함께 읽었어요.",
            )}
          </LessonSection>
          <LessonSection
            id="build"
            number="03"
            title="Sol에게 1차 구현 맡기기"
            description="브리프를 읽었으면 구현을 요청하세요. 작업하는 동안 Codex를 살펴봅니다."
          >
            <PromptCard prompt={weekOnePrompts[2]} />
            {check(
              "built",
              "1차 구현이 끝났고, Codex가 알려준 방법으로 PDF 편집기를 열었어요.",
            )}
            <CodexIntro />
          </LessonSection>
          <LessonSection
            id="verify"
            number="04"
            title="첫 결과물을 직접 써보세요"
            description="아래 체크리스트와 다음 단계의 개선 브리프 작성법을 함께 본 뒤 각자 실습합니다."
          >
            <div className="setup-strip">
              <span>준비물</span>
              <p>
                연습용 PDF 두 개를 준비하세요. 3쪽 이상인 파일로 기본 동작을
                확인하고, 약 50페이지 강의자료도 열어보세요.
              </p>
            </div>
            <div className="verification-list">
              {featureChecks.map((item) =>
                check(
                  item.id,
                  <>
                    <strong>{item.label}</strong>
                    <small className="check-detail">{item.detail}</small>
                  </>,
                ),
              )}
            </div>
            <CommonPrompt />
          </LessonSection>
          <LessonSection
            id="improve"
            number="05"
            title="내 IMPROVEMENTS_BRIEF 작성하기"
            description="실제로 불편했던 점을 기록하고, 이번에 바꿀 기능을 정해요. 여러 개를 선택해도 괜찮습니다."
          >
            <PromptCard prompt={weekOnePrompts[3]} />
            <div className="improvement-grid">
              {improvementIdeas.map((idea) => (
                <article key={idea.title}>
                  <h3>{idea.title}</h3>
                  <p>{idea.description}</p>
                </article>
              ))}
            </div>
            <div className="margin-note">
              <span>모르는 칸은 ‘미정’</span>
              <p>
                모든 칸을 억지로 채우지 않아도 됩니다. 원하는 결과는 내 말로
                적고, 기술적인 선택은 에이전트에게 맡기거나 먼저 제안받으세요.
                여러 기능을 고르면 우선순위를 함께 적어요.
              </p>
            </div>
            <Material
              name="IMPROVEMENTS_BRIEF.txt"
              text={improvementsBrief}
              url={improvementsUrl}
            />
            <div className="undo-example">
              <h3>Ctrl+Z로 비교해보기</h3>
              <div className="example-bad">
                <span>아쉬운 예</span>
                <p>{undoBadExample}</p>
                <small>무엇을 되돌릴지와 완료 기준이 빠져 있어요.</small>
              </div>
              <details className="brief-details" open>
                <summary>
                  <span>좋은 예 · 동작과 범위, 확인 방법</span>
                  <span className="details-plus">+</span>
                </summary>
                <div className="brief-content">
                  <div className="brief-tools">
                    <span>내 경험에 맞게 바꿔 적으세요.</span>
                    <CopyButton text={undoGoodExample} label="좋은 예 복사" />
                  </div>
                  <pre>{undoGoodExample}</pre>
                </div>
              </details>
            </div>
            <p className="small-note">
              앱의 ‘파일’에서 편집할 수 없다면 메모장 등 텍스트 편집기를
              사용하세요. 작성한 파일은 다운로드 폴더가 아닌{" "}
              <strong>실습 프로젝트의 IMPROVEMENTS_BRIEF.txt</strong>에
              저장합니다.
            </p>
            {check(
              "improvements-saved",
              "내 개선 내용과 완료 기준을 작성하고 프로젝트 폴더에 저장했어요.",
            )}
          </LessonSection>
          <LessonSection
            id="build-again"
            number="06"
            title="Sol에게 2차 구현 맡기기"
            description="저장한 개선 브리프를 바탕으로 다시 구현합니다. 기다리면서 모델과 전공 지식 이야기를 나눠요."
          >
            <PromptCard prompt={weekOnePrompts[4]} />
            <ModelTable />
            <p className="small-note">
              역할은 수업용 예시입니다.{" "}
              <a href={sources.models.href}>OpenAI 모델 안내</a>와{" "}
              <a href={sources.opus.href}>Anthropic Opus 안내</a>를 2026-09-27에
              확인했어요. 실제 선택지는 계정과 사용하는 도구에서 확인하세요.
            </p>
            <div className="discussion-card">
              <h3>에이전트를 나눠서 작업한다면?</h3>
              <p>
                여러 모델을 연결한 환경에서는 Opus가 구현을 주도하고, Luna가
                작은 수정을 맡고, Astra가 복잡한 판단을 돕는 구성을 생각해볼 수
                있어요. 사용하는 도구의 모델 연결 기능과 별도 설정이 필요합니다.
                오늘 실습은 Sol로 진행해요.
              </p>
              <p>
                병렬로 진행할 때는 각자 맡을 범위와 결과를 합치는 기준도
                필요합니다.
              </p>
              <a className="text-link" href={slideHref("parallel")}>
                함께 볼 슬라이드 <Icon name="up-right" size={14} />
              </a>
            </div>
            <div className="discussion-card">
              <h3>사용법과 전공 지식 이야기</h3>
              <p>
                Reddit·Threads 등에서 본 사례를 나누고, 어떤 문제를 어떤
                요청으로 풀었는지 살펴봐요. 모델과 업데이트에 관한 소식은 공식
                공지와 실제 사용 경험을 함께 확인합니다.
              </p>
              <p>
                컴퓨터 전공 지식은 시스템 구조와 서버 관리, 기술 선택에
                쓰입니다. 다른 전공의 용어와 업무 지식도 원하는 서비스의 조건과
                예외를 정확하게 전달하는 데 쓰여요.
              </p>
              <p>
                <strong>
                  내 전공에서 자주 겪는 불편을, AI에게 어떤 조건으로 설명할 수
                  있을까요?
                </strong>
              </p>
            </div>
          </LessonSection>
          <LessonSection
            id="finish"
            number="07"
            title="개선 결과 확인하기"
            description="내가 작성한 완료 기준과 기본 기능 체크리스트를 다시 확인합니다."
          >
            {check("improved", "내가 요청한 개선 기능이 의도대로 작동해요.")}
            {check(
              "regression",
              "기본 기능 5개를 다시 확인했고, 저장한 PDF에도 결과가 반영됐어요.",
            )}
            <button
              className="text-link"
              onClick={() =>
                document
                  .getElementById("verify")
                  ?.scrollIntoView({ block: "start" })
              }
            >
              기본 기능 체크리스트로 돌아가기 <Icon name="arrow" size={15} />
            </button>
            <PromptCard prompt={weekOnePrompts[5]} defaultOpen={false} />
            {check(
              "restarted",
              "도구를 종료했다가 다음에도 다시 실행할 수 있어요.",
            )}
            <div className="finish-note">
              <Icon name="check" size={22} />
              <div>
                <strong>오늘의 실습은 여기까지.</strong>
                <p>
                  더 개선하고 싶다면 IMPROVEMENTS_BRIEF.txt를 복사해 이전 기록을
                  남기고, 새 내용을 작성한 뒤 같은 구현 프롬프트로 이어가세요.
                </p>
              </div>
            </div>
          </LessonSection>
          <div className="next-week">
            <span>NEXT WEEK</span>
            <a href="#/week/2">
              <div>
                <h3>AGENTS.md와 Skills</h3>
                <p>작업 규칙과 반복할 절차, 서버와 클라이언트의 관계</p>
              </div>
              <Icon name="arrow" size={26} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
