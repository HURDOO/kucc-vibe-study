#!/usr/bin/env node
// claude.ai Artifact 슬라이드 덱을 src/slides/week<N>/로 옮긴다.
// 사용법: node scripts/sync-deck.mjs <주차> <Artifact에서 받은 폴더>
// 받은 폴더에는 project/deck.json과 project/slides/<id>.html이 있어야 한다.
import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const [week, source] = process.argv.slice(2);
if (!/^[1-7]$/.test(week ?? "") || !source) {
  console.error("사용법: node scripts/sync-deck.mjs <주차> <Artifact에서 받은 폴더>");
  process.exit(1);
}

const target = path.join(root, "src/slides", `week${week}`);
const deck = JSON.parse(
  await readFile(path.join(source, "project/deck.json"), "utf8"),
);
// Artifact 이미지(/_blob/<id>)를 사이트의 public 경로로 바꾸는 표
const assets = JSON.parse(
  await readFile(path.join(target, "assets.json"), "utf8"),
);

const unknown = new Set();
await mkdir(target, { recursive: true });
for (const id of deck.order) {
  const html = await readFile(
    path.join(source, "project/slides", `${id}.html`),
    "utf8",
  );
  const rewritten = html.replace(/\/_blob\/([0-9a-f]{32})/g, (match, blob) => {
    if (assets[blob]) return assets[blob];
    unknown.add(blob);
    return match;
  });
  await writeFile(path.join(target, `${id}.html`), rewritten);
}
if (unknown.size) {
  console.error(
    `assets.json에 없는 이미지가 있습니다. 이미지를 public/slides/week${week}/에 넣고 표에 추가하세요:\n${[...unknown].join("\n")}`,
  );
  process.exit(1);
}

// 덱에서 빠진 슬라이드 파일 정리
const keep = new Set(deck.order.map((id) => `${id}.html`));
for (const file of await readdir(target)) {
  if (file.endsWith(".html") && !keep.has(file)) {
    await rm(path.join(target, file));
    console.log(`삭제: ${file}`);
  }
}

await writeFile(
  path.join(target, "deck.json"),
  `${JSON.stringify({ title: deck.title, order: deck.order, sections: deck.sections ?? {} }, null, 2)}\n`,
);
for (const file of Object.values(assets)) {
  if (!existsSync(path.join(root, "public", file))) {
    console.warn(`경고: public${file} 파일이 없습니다.`);
  }
}

// <x-icon name="..."> 중 src/slide-icons.ts에 없는 이름은 사이트에서 빈칸으로 보인다.
const iconSource = await readFile(path.join(root, "src/slide-icons.ts"), "utf8");
const knownIcons = new Set([...iconSource.matchAll(/^ {2}([A-Z]\w*):/gm)].map((m) => m[1]));
const missingIcons = new Map();
for (const id of deck.order) {
  const html = await readFile(path.join(target, `${id}.html`), "utf8");
  for (const [, name] of html.matchAll(/<x-icon name="(\w+)"/g)) {
    if (!knownIcons.has(name)) missingIcons.set(name, [...(missingIcons.get(name) ?? []), id]);
  }
}
for (const [name, ids] of missingIcons) {
  console.warn(`경고: 아이콘 ${name}이 src/slide-icons.ts에 없습니다 (${[...new Set(ids)].join(", ")})`);
}
console.log(`${deck.title}: ${deck.order.length}장 → src/slides/week${week}/`);
