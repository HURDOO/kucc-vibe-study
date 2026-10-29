import { useCallback, useEffect, useId, useState, type FormEvent } from "react";
import {
  fetchCommunities,
  looksLikeTunnel,
  postCommunity,
  type Community,
  type CommunityStatus,
} from "./community-api";
import { Icon, PageIntro, useSavedString } from "./components";
import { deckSlideHref } from "./slides";

const REFRESH_MS = 15_000;
const statusOrder: Record<CommunityStatus, number> = {
  online: 0,
  unknown: 1,
  offline: 2,
};
const statusLabel: Record<CommunityStatus, string> = {
  online: "열려 있음",
  unknown: "확인 중",
  offline: "꺼짐",
};

function timeAgo(iso: string, now: number) {
  const minutes = Math.floor((now - Date.parse(iso)) / 60_000);
  if (minutes < 1) return "방금";
  if (minutes < 60) return `${minutes}분 전`;
  return `${Math.floor(minutes / 60)}시간 전`;
}

function useCommunities() {
  const [items, setItems] = useState<Community[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const load = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    try {
      setItems(await fetchCommunities(signal));
      setError("");
    } catch (reason) {
      if (signal?.aborted) return;
      setError(
        reason instanceof Error && reason.name !== "TypeError"
          ? reason.message
          : "목록 서버에 연결하지 못했어요. 잠시 후 다시 시도해 주세요.",
      );
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") load(controller.signal);
    }, REFRESH_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") load(controller.signal);
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      controller.abort();
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [load]);
  return { items, error, loading, load, setItems };
}

function ShareForm({
  onShared,
}: {
  onShared: (community: Community) => void;
}) {
  const id = useId();
  const [savedName, setSavedName] = useSavedString("kucc-week2-community-name");
  const [name, setName] = useState(savedName);
  const [url, setUrl] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<{
    tone: "ok" | "warn" | "error";
    text: string;
  } | null>(null);
  const urlValid = looksLikeTunnel(url);
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim() || !urlValid || sending) return;
    setSending(true);
    setMessage(null);
    try {
      const { community, replaced } = await postCommunity(name, url);
      setSavedName(community.name);
      setName(community.name);
      setUrl("");
      onShared(community);
      const verb = replaced ? "새 주소로 바꿨어요" : "올렸어요";
      setMessage(
        community.status === "online"
          ? { tone: "ok", text: `${verb}! 지금 바깥에서도 열려요.` }
          : community.status === "offline"
            ? {
                tone: "warn",
                text: `${verb}. 그런데 아직 접속되지 않아요. 서버와 터널이 켜져 있는지 확인하세요.`,
              }
            : {
                tone: "ok",
                text: `${verb}. 접속 여부는 잠시 뒤 목록에 표시돼요.`,
              },
      );
    } catch (reason) {
      setMessage({
        tone: "error",
        text:
          reason instanceof Error && reason.name !== "TypeError"
            ? reason.message
            : "목록 서버에 연결하지 못했어요. 잠시 후 다시 시도해 주세요.",
      });
    } finally {
      setSending(false);
    }
  }
  return (
    <form className="share-form" onSubmit={submit} noValidate>
      <h2>내 커뮤니티 올리기</h2>
      <div className="share-field">
        <label htmlFor={`${id}-name`}>커뮤니티 이름</label>
        <input
          id={`${id}-name`}
          value={name}
          maxLength={30}
          autoComplete="off"
          placeholder="예: 해커톤 팀원 모집 게시판"
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="share-field">
        <label htmlFor={`${id}-url`}>터널 주소</label>
        <input
          id={`${id}-url`}
          value={url}
          inputMode="url"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="https://….trycloudflare.com"
          aria-invalid={url.length > 0 && !urlValid}
          aria-describedby={`${id}-hint`}
          onChange={(event) => setUrl(event.target.value)}
        />
        <small id={`${id}-hint`}>
          {url && !urlValid
            ? "Codex가 알려준 https://….trycloudflare.com 주소를 그대로 붙여넣어 주세요."
            : "같은 이름으로 다시 올리면 새 주소로 덮어써져요."}
        </small>
      </div>
      <button
        className="button primary"
        type="submit"
        disabled={!name.trim() || !urlValid || sending}
      >
        {sending ? "올리는 중…" : "목록에 올리기"}
        {!sending && <Icon name="arrow" size={18} />}
      </button>
      <p
        className={`share-message${message ? ` ${message.tone}` : ""}`}
        role="status"
      >
        {message?.text}
      </p>
    </form>
  );
}

export function CommunityBoard() {
  const { items, error, loading, load, setItems } = useCommunities();
  const [myName] = useSavedString("kucc-week2-community-name");
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    setNow(Date.now());
  }, [items]);
  const sorted = [...(items ?? [])].sort(
    (a, b) =>
      statusOrder[a.status] - statusOrder[b.status] ||
      Date.parse(b.updatedAt) - Date.parse(a.updatedAt),
  );
  const open = sorted.filter((item) => item.status === "online").length;
  const myKey = myName.trim().toLocaleLowerCase("ko-KR");
  return (
    <div className="community-layout">
      <div className="community-side">
        <ShareForm
          onShared={(community) =>
            setItems((current) => [
              community,
              ...(current ?? []).filter(
                (item) =>
                  item.url !== community.url &&
                  item.name.toLocaleLowerCase("ko-KR") !==
                    community.name.toLocaleLowerCase("ko-KR"),
              ),
            ])
          }
        />
        <div className="community-tip">
          <strong>진짜 인터넷으로 열렸을까?</strong>
          <p>
            폰 와이파이를 끄고 LTE로 내 주소에 들어가 보세요. 같은 와이파이가
            아니어도 열리면 성공이에요.
          </p>
        </div>
      </div>
      <section className="community-list" aria-labelledby="community-list-title">
        <div className="community-list-head">
          <div>
            <h2 id="community-list-title">놀러갈 커뮤니티</h2>
            <p aria-live="polite">
              {items
                ? `${items.length}곳 · 지금 열린 곳 ${open}곳`
                : "목록을 불러오는 중…"}
            </p>
          </div>
          <button
            className="icon-button"
            onClick={() => load()}
            disabled={loading}
            aria-label="목록 새로고침"
          >
            <Icon name="refresh" />
          </button>
        </div>
        {error && (
          <p className="community-error" role="alert">
            {error}
          </p>
        )}
        {items && items.length === 0 && (
          <div className="empty-state">
            <Icon name="users" size={32} />
            <h2>아직 올라온 커뮤니티가 없어요.</h2>
            <p>터널 주소가 나왔다면 첫 번째로 올려 보세요!</p>
          </div>
        )}
        <ul className="community-cards">
          {sorted.map((item) => {
            const mine =
              myKey && item.name.toLocaleLowerCase("ko-KR") === myKey;
            return (
              <li
                key={item.url}
                className={`community-card ${item.status}${mine ? " mine" : ""}`}
              >
                <div className="community-card-top">
                  <span className={`status-pill ${item.status}`}>
                    <i aria-hidden="true" />
                    {item.status === "unknown" && item.checkedAt
                      ? "응답 없음"
                      : statusLabel[item.status]}
                  </span>
                  {mine && <span className="mine-badge">내 커뮤니티</span>}
                  <time dateTime={item.updatedAt}>
                    {timeAgo(item.updatedAt, now)}
                  </time>
                </div>
                <h3>{item.name}</h3>
                <p className="community-host">{new URL(item.url).hostname}</p>
                <a
                  className="button outlined"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  놀러가기 <Icon name="up-right" size={16} />
                  <span className="sr-only">(새 창)</span>
                </a>
              </li>
            );
          })}
        </ul>
        <p className="small-note">
          목록은 15초마다 새로 확인하고, 올린 지 12시간이 지나면 사라져요.
          ‘꺼짐’은 터널 주소로 접속되지 않는다는 뜻이고, ‘응답 없음’은 확인이
          늦어지고 있다는 뜻이에요.
        </p>
      </section>
    </div>
  );
}

export default function CommunityPage() {
  return (
    <div className="container page-container community-page">
      <PageIntro
        eyebrow="WEEK 02 · STEP 11 · 서로 놀러가기"
        title={
          <>
            내 커뮤니티를 올리고,
            <br />
            서로 놀러가요.
          </>
        }
        description="커뮤니티 이름과 터널 주소를 올리면 목록에 나타나요. 세 곳 이상 놀러가서 그 커뮤니티 주제에 맞는 글을 남겨 주세요. 익명이니까 부담 없이!"
        mark="GO"
      >
        <div className="intro-chips">
          <span>01 · 등록하기</span>
          <span>02 · 둘러보기</span>
          <span>03 · 글 남기기</span>
        </div>
      </PageIntro>
      <CommunityBoard />
      <div className="community-after">
        <div className="discussion-card">
          <h3>다 놀러갔다면, 내 posts.csv를 열어 보세요</h3>
          <p>
            친구 폰에서 쓴 글도 전부 내 노트북의 posts.csv에 쌓여 있어요. 몇
            명이 다녀갔는지 세어 보세요. 확인한 뒤 엑셀은 꼭 닫아 주세요.
          </p>
          <p>
            <strong>보너스 · 버그 찾기</strong> Network 탭에서 글 목록을
            받아오는 응답에 비밀번호가 보이면 버그를 찾은 거예요.
          </p>
          <a className="text-link" href={deckSlideHref(2, "csv-count")}>
            함께 볼 슬라이드 <Icon name="up-right" size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
