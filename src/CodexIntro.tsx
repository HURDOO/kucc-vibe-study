import { codexTopics } from "./codex-intro";
import CodexVisual from "./CodexVisual";
import { slideHref } from "./week-one";
import { Icon } from "./components";

export default function CodexIntro() {
  return (
    <div id="codex" className="codex-intro">
      <div className="codex-intro-heading">
        <div>
          <span className="small-label">구현을 기다리며</span>
          <h3>Codex가 무엇인가</h3>
        </div>
        <a className="text-link" href={slideHref("llm-tools")}>
          설명 슬라이드 <Icon name="play" size={15} />
        </a>
      </div>
      <p className="codex-intro-lead">
        문장을 이어 쓰는 모델이 어떻게 내 컴퓨터의 파일을 만들까요? 텍스트
        생성부터 도구와 작업 권한까지 순서대로 살펴봅니다.
      </p>
      {codexTopics.map((topic, i) => (
        <details className="codex-topic" key={topic.id} open={i === 0}>
          <summary>
            <span className="codex-topic-number">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{topic.title}</span>
            <span className="details-plus">+</span>
          </summary>
          <div className="codex-topic-content">
            <p className="codex-topic-lead">{topic.body}</p>
            <CodexVisual kind={topic.visual} />
            <p className="codex-topic-note">{topic.note}</p>
            <div className="codex-explanation">
              {topic.explanation.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
            <div className="source-links">
              <a href={slideHref(topic.id)}>이 부분 슬라이드로 보기</a>
              {topic.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label} <Icon name="up-right" size={13} />
                </a>
              ))}
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
