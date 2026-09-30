import {
  greetingCode,
  writeToolExample,
  editToolExample,
  type CodexVisualKind,
} from "./codex-intro";
import "./codex-intro.css";

function CodeExample({ label, code }: { label: string; code: string }) {
  return (
    <figure className="codex-code-example">
      <figcaption>{label}</figcaption>
      <pre>
        <code>{code}</code>
      </pre>
    </figure>
  );
}

export default function CodexVisual({ kind }: { kind: CodexVisualKind }) {
  if (kind === "completion")
    return (
      <figure className="codex-visual codex-completion">
        <div className="completion-sentence">
          오늘 날씨는 <span>________</span>
        </div>
        <ul
          className="completion-candidates"
          aria-label="가상 예시의 문장 완성 후보"
        >
          {[
            { word: "맑다", percent: 70 },
            { word: "흐리다", percent: 25 },
            { word: "맛있다", percent: 5 },
          ].map((item) => (
            <li key={item.word}>
              <span>{item.word}</span>
              <div className="candidate-track" aria-hidden="true">
                <span style={{ width: `${item.percent}%` }} />
              </div>
              <strong>{item.percent}%</strong>
            </li>
          ))}
        </ul>
        <figcaption>
          설명용 가상 수치 · 실제 모델의 측정값이나 날씨 확률이 아닙니다.
        </figcaption>
      </figure>
    );
  if (kind === "code")
    return (
      <div className="codex-visual">
        <p className="codex-request">
          요청: “이름을 입력받고 Hello World로 인사해줘.”
        </p>
        <div className="codex-columns">
          <CodeExample label="앞에 주어진 코드" code={"s = input()\nprint("} />
          <CodeExample label="이어서 생성한 코드" code={greetingCode} />
        </div>
      </div>
    );
  if (kind === "tool-call")
    return (
      <div className="codex-visual codex-columns">
        <CodeExample
          label="모델이 만든 도구 호출 · 설명용"
          code={writeToolExample}
        />
        <div className="codex-result">
          <span>실행 프로그램이 요청을 처리</span>
          <strong>main.py에 저장</strong>
          <pre>
            <code>{greetingCode}</code>
          </pre>
          <p>도구 호출이 실제 파일 변경으로 이어집니다.</p>
        </div>
      </div>
    );
  if (kind === "relationship")
    return (
      <div className="codex-visual">
        <div className="codex-app-frame">
          <span className="codex-frame-label">
            ChatGPT 앱 · 우리가 대화하는 창
          </span>
          <div className="codex-runtime">
            <strong>Codex · 작업을 이어가는 코딩 에이전트</strong>
            <div className="codex-columns">
              <div>
                <span>GPT 모델</span>
                <p>
                  다음 행동 판단
                  <br />
                  코드·도구 호출 생성
                </p>
              </div>
              <div>
                <span>도구 실행</span>
                <p>
                  파일 읽기·수정
                  <br />
                  명령 실행과 결과 반환
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  if (kind === "read-edit")
    return (
      <div className="codex-visual codex-columns codex-three-columns">
        <CodeExample
          label="1. GPT가 읽기 요청"
          code={"tool: 파일 읽기\nfile name: main.py"}
        />
        <CodeExample label="2. Codex가 읽은 내용 반환" code={greetingCode} />
        <CodeExample
          label="3. GPT가 수정 요청 · Codex가 실행"
          code={editToolExample}
        />
      </div>
    );
  if (kind === "loop")
    return (
      <div className="codex-visual">
        <ol className="codex-loop">
          {[
            { title: "GPT 판단", body: "현재 파일과 목표 확인" },
            { title: "도구 실행", body: "코드 수정·프로그램 실행" },
            { title: "결과 전달", body: "파일 내용·성공·오류" },
            { title: "다음 판단", body: "수정하거나 작업 완료" },
          ].map((step, i) => (
            <li key={step.title}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <strong>{step.title}</strong>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="codex-loop-return">
          추가 작업이 필요하면 다시 판단하고 실행합니다.
        </p>
      </div>
    );
  if (kind === "sandbox")
    return (
      <div className="codex-visual codex-columns">
        <div className="codex-boundary">
          <span>허용된 범위</span>
          <strong>프로젝트 파일 수정</strong>
          <p>
            main.py 생성·수정
            <br />
            허용된 명령 실행
          </p>
          <small>변경은 실제로 남아요.</small>
        </div>
        <div className="codex-boundary boundary-review">
          <span>추가 권한이 필요한 범위</span>
          <strong>범위 밖 수정·제한된 통신</strong>
          <p>
            정책에 따라 차단하거나
            <br />
            승인 검토 요청
          </p>
          <small>파일과 네트워크의 범위는 설정에 따라 달라요.</small>
        </div>
      </div>
    );
  if (kind === "project")
    return (
      <div className="codex-visual codex-columns">
        <CodeExample
          label="오늘 연결한 로컬 프로젝트"
          code={
            "kucc-vibe-study-week1/\n├─ PROJECT_BRIEF.txt\n├─ IMPROVEMENTS_BRIEF.txt\n└─ 앞으로 만들 코드 파일들"
          }
        />
        <dl className="codex-definitions">
          <div>
            <dt>프로젝트</dt>
            <dd>어떤 폴더와 맥락에서 작업할지</dd>
          </div>
          <div>
            <dt>Sandbox와 권한</dt>
            <dd>무엇을 읽고 수정하고 실행할 수 있을지</dd>
          </div>
        </dl>
      </div>
    );
  if (kind === "approvals")
    return (
      <div className="codex-visual">
        <table className="model-table approval-table">
          <caption>추가 승인이 필요한 작업의 검토 흐름</caption>
          <thead>
            <tr>
              <th scope="col">모드</th>
              <th scope="col">검토하는 사람 또는 에이전트</th>
              <th scope="col">검토 뒤</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">승인 요청</th>
              <td>사용자가 대상과 이유를 확인</td>
              <td>승인 또는 거절</td>
            </tr>
            <tr>
              <th scope="row">나 대신 승인</th>
              <td>별도 검토 에이전트가 맥락과 동작을 확인</td>
              <td>허용 또는 차단과 이유 반환</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  return (
    <div className="codex-visual">
      <dl className="codex-review-example">
        <div>
          <dt>사용자 요청</dt>
          <dd>“내 컴퓨터에서 쓸 PDF 편집기를 만들어줘.”</dd>
        </div>
        <div>
          <dt>검토할 동작</dt>
          <dd>프로젝트 코드를 외부 저장소에 업로드</dd>
        </div>
        <div>
          <dt>함께 보는 근거</dt>
          <dd>업로드까지 요청했는지, 대상과 전송할 내용은 무엇인지</dd>
        </div>
        <div className="codex-review-decision">
          <dt>차단 이유 예시</dt>
          <dd>“외부 업로드에 대한 사용자 허용 근거가 없습니다.”</dd>
        </div>
      </dl>
    </div>
  );
}
