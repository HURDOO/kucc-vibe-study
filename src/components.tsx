import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { prompts, type Prompt } from "./content";

export function Icon({
  name = "arrow",
  size = 20,
  ...props
}: {
  name?:
    | "arrow"
    | "up-right"
    | "copy"
    | "check"
    | "file"
    | "play"
    | "download"
    | "chevron"
    | "search"
    | "menu"
    | "close"
    | "grid"
    | "book";
  size?: number;
  className?: string;
}) {
  const paths: Record<string, ReactNode> = {
    arrow: (
      <>
        <path d="M4 12h15M13 5l7 7-7 7" />
      </>
    ),
    "up-right": (
      <>
        <path d="M6 18 18 6M6 6h12v12" />
      </>
    ),
    copy: (
      <>
        <rect x="8" y="8" width="12" height="13" rx="2" />
        <path d="M15 8V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h4" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    file: (
      <>
        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6M8 13h8M8 17h5" />
      </>
    ),
    play: <path d="m8 5 11 7-11 7z" />,
    download: (
      <>
        <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" />
      </>
    ),
    chevron: <path d="m9 5 7 7-7 7" />,
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </>
    ),
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    book: (
      <>
        <path d="M12 5v16M3 4h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5v15h-5a4 4 0 0 0-4 2 4 4 0 0 0-4-2H3z" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}

export function Brand() {
  return (
    <a className="brand" href="#/" aria-label="KUCC 바이브코딩 스터디 홈">
      <span className="brand-symbol" aria-hidden="true">
        <span>k</span>
      </span>
      <span>
        KUCC<span className="brand-divider">·</span>
        <span className="brand-sub">바이브코딩 스터디</span>
      </span>
    </a>
  );
}

export function Header({ route }: { route: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [route]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  const links = [
    { href: "/", label: "홈" },
    { href: "/curriculum", label: "커리큘럼" },
    { href: "/prompts", label: "프롬프트" },
    { href: "/guide", label: "이용 안내" },
  ];
  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav
          id="main-nav"
          aria-label="메인 메뉴"
          className={open ? "main-nav is-open" : "main-nav"}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={`#${link.href}`}
              aria-current={
                route === link.href ||
                (link.href === "/curriculum" && route.startsWith("/week/"))
                  ? "page"
                  : undefined
              }
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a href="#/week/1" className="header-cta">
          1주차 시작하기 <Icon name="up-right" size={15} />
        </a>
        <button
          className="mobile-menu icon-button"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Brand />
        <span>작은 불편에서 시작하는, 우리의 첫 만들기.</span>
      </div>
      <div className="footer-bottom">
        <span>KUCC VIBE CODING STUDY</span>
        <div>
          <a href="#/curriculum">수업 자료</a>
          <a href="#/prompts">프롬프트 모음</a>
          <a href="#/guide">도움이 필요할 때</a>
        </div>
        <span>함께 만들어요. 천천히, 끝까지.</span>
      </div>
    </footer>
  );
}

export function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`eyebrow${light ? " light" : ""}`}>
      <span className="tiny-square" />
      {children}
    </div>
  );
}

export function useSavedString(key: string, fallback = "") {
  const [value, setValue] = useState(() => {
    try {
      return localStorage.getItem(key) ?? fallback;
    } catch {
      return fallback;
    }
  });
  function update(next: string) {
    setValue(next);
    try {
      localStorage.setItem(key, next);
    } catch {
      /* The current session remains usable without storage. */
    }
  }
  return [value, update] as const;
}

export function useProgress() {
  const [raw, save] = useSavedString("kucc-week1-progress-v1", "[]");
  let checked: string[] = [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed))
      checked = parsed.filter(
        (item): item is string => typeof item === "string",
      );
  } catch {
    /* Use an empty checklist for invalid saved data. */
  }
  const toggle = (id: string) =>
    save(
      JSON.stringify(
        checked.includes(id)
          ? checked.filter((item) => item !== id)
          : [...checked, id],
      ),
    );
  return { checked, toggle };
}

export function CopyButton({
  text,
  disabled = false,
  label = "복사하기",
}: {
  text: string;
  disabled?: boolean;
  label?: string;
}) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    try {
      if (window.isSecureContext && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // HTTP LAN origins do not expose the modern Clipboard API.
        // Keep this fallback inside the user's click, without an async delay.
        const previousFocus = document.activeElement;
        const field = document.createElement("textarea");
        field.value = text;
        field.readOnly = true;
        field.style.cssText =
          "position:fixed;left:-9999px;top:0;font-size:16px";
        const onCopy = (event: ClipboardEvent) => {
          if (event.clipboardData) {
            event.clipboardData.setData("text/plain", text);
            event.preventDefault();
          }
        };
        document.body.appendChild(field);
        document.addEventListener("copy", onCopy);
        try {
          field.focus({ preventScroll: true });
          field.select();
          field.setSelectionRange(0, text.length);
          if (!document.execCommand("copy")) throw new Error("Copy failed");
        } finally {
          document.removeEventListener("copy", onCopy);
          field.remove();
          if (previousFocus instanceof HTMLElement) {
            previousFocus.focus({ preventScroll: true });
          }
        }
      }
      setState("copied");
    } catch {
      setState("error");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2600);
  }
  return (
    <span className="copy-wrap">
      <button
        type="button"
        disabled={disabled}
        className={`copy-button ${state === "copied" ? "copied" : ""}`}
        onClick={copy}
      >
        <Icon name={state === "copied" ? "check" : "copy"} size={15} />
        <span aria-live="polite">
          {state === "copied"
            ? "복사했어요"
            : state === "error"
              ? "직접 선택해 복사해주세요"
              : label}
        </span>
      </button>
    </span>
  );
}

export function validRepository(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      url.hostname === "github.com" &&
      !url.username &&
      !url.password &&
      !url.search &&
      !url.hash &&
      /^\/[\w.-]+\/[\w.-]+\/?$/.test(url.pathname)
    );
  } catch {
    return false;
  }
}

export function PromptCard({
  prompt,
  defaultOpen = true,
}: {
  prompt: Prompt;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [repository, setRepository] = useSavedString(
    "kucc-week1-repository",
    import.meta.env.VITE_WEEK1_REPO_URL ?? "",
  );
  const id = useId();
  const valid = validRepository(repository.trim());
  const text =
    prompt.clone && valid
      ? prompt.text.replace("[실습 레포 주소]", repository.trim())
      : prompt.text;
  return (
    <article className={`prompt-card${open ? " expanded" : ""}`}>
      <button
        className="prompt-heading"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={id}
      >
        <span className="prompt-number">{prompt.id}</span>
        <span className="prompt-heading-text">
          <strong>{prompt.title}</strong>
          <small>{prompt.when}</small>
        </span>
        <span className="expand-mark" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>
      <div id={id} hidden={!open} className="prompt-body">
        {prompt.clone && (
          <div className="repo-field">
            <label htmlFor={`${id}-repo`}>강사가 안내한 실습 레포 주소</label>
            <input
              id={`${id}-repo`}
              type="url"
              autoComplete="off"
              spellCheck={false}
              value={repository}
              onChange={(e) => setRepository(e.target.value)}
              placeholder="https://github.com/계정/저장소"
              aria-describedby={`${id}-hint`}
              aria-invalid={repository.length > 0 && !valid}
            />
            <small id={`${id}-hint`}>
              {repository && !valid
                ? "https://github.com/계정/저장소 형식의 주소를 입력해주세요."
                : "주소를 넣으면 아래 프롬프트에 자동으로 반영돼요."}
            </small>
          </div>
        )}
        <div className="code-panel">
          <div className="code-toolbar">
            <span>CODEX에 입력</span>
            <CopyButton
              text={text}
              disabled={prompt.clone && !valid}
              label={
                prompt.clone && !valid ? "주소 입력 후 복사" : "프롬프트 복사"
              }
            />
          </div>
          <pre>{text}</pre>
        </div>
        <p className="prompt-check">
          <Icon name="check" size={16} />
          {prompt.check}
        </p>
      </div>
    </article>
  );
}

export function QuickHelp() {
  return (
    <div className="help-note">
      <span className="help-note-icon">?</span>
      <div>
        <strong>막혔다면, 지금 보이는 화면부터.</strong>
        <p>무엇을 했는지와 기대한 결과를 함께 알려주세요.</p>
      </div>
      <a href="#/prompts?category=common">
        도움 요청 프롬프트 <Icon name="arrow" size={16} />
      </a>
    </div>
  );
}

export function Checklist({
  id,
  checked,
  onChange,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (id: string) => void;
  children: ReactNode;
}) {
  return (
    <label className={`checklist-item${checked ? " is-checked" : ""}`}>
      <input type="checkbox" checked={checked} onChange={() => onChange(id)} />
      <span className="custom-check" aria-hidden="true">
        {checked && <Icon name="check" size={13} />}
      </span>
      <span>{children}</span>
    </label>
  );
}

export function CommonPrompt() {
  return (
    <PromptCard
      prompt={prompts.find((prompt) => prompt.id === "C-1")!}
      defaultOpen={false}
    />
  );
}
