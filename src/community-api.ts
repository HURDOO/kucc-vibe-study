// server/app.mjs의 /api/communities 계약
export type CommunityStatus = "online" | "offline" | "unknown";
export type Community = {
  name: string;
  url: string;
  updatedAt: string;
  status: CommunityStatus;
  checkedAt: string | null;
};

export class CommunityApiError extends Error {}

async function readError(response: Response) {
  try {
    const body = (await response.json()) as { error?: { message?: string } };
    if (body.error?.message) return body.error.message;
  } catch {
    /* JSON이 아닌 응답은 아래 기본 문구를 쓴다. */
  }
  return response.status === 429
    ? "잠시 후 다시 올려 주세요."
    : "목록 서버에 연결하지 못했어요. 잠시 후 다시 시도해 주세요.";
}

export async function fetchCommunities(signal?: AbortSignal) {
  const response = await fetch("/api/communities", {
    headers: { accept: "application/json" },
    cache: "no-store",
    signal,
  });
  if (!response.ok) throw new CommunityApiError(await readError(response));
  const body = (await response.json()) as { communities: Community[] };
  return body.communities;
}

export async function postCommunity(name: string, url: string) {
  const response = await fetch("/api/communities", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name, url }),
  });
  if (!response.ok) throw new CommunityApiError(await readError(response));
  return (await response.json()) as { community: Community; replaced: boolean };
}

// 서버 검증(normalizeTunnelUrl)과 같은 규칙으로 입력을 미리 확인한다.
export function looksLikeTunnel(value: string) {
  const text = value.trim();
  try {
    const url = new URL(/^[a-z][a-z0-9+.-]*:\/\//i.test(text) ? text : `https://${text}`);
    return (
      url.protocol === "https:" &&
      /^[a-z0-9]+(?:-[a-z0-9]+)*\.trycloudflare\.com$/.test(url.hostname)
    );
  } catch {
    return false;
  }
}
