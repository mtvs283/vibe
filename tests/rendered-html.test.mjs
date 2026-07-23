import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the finished game landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Old Wisdom, New Vibes \| SinaVro Vibe<\/title>/i);
  assert.match(html, /Old Wisdom/);
  assert.match(html, /New Vibes/);
  assert.match(html, /Catch the Vibe/);
  assert.match(html, /Proverb Remix/);
  assert.match(html, /Nano Banana prompts/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
});

test("includes both complete card decks and image prompt controls", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  const packageJson = await readFile(new URL("../package.json", import.meta.url), "utf8");

  assert.match(page, /const partOneCards:[\s\S]*스불재[\s\S]*느좋/);
  assert.match(page, /const partTwoCards:[\s\S]*개똥 SOLD OUT[\s\S]*굼벵이 구르는 폼 미쳤다/);
  assert.match(page, /NANO BANANA IMAGE PROMPT/);
  assert.match(page, /navigator\.clipboard\.writeText/);
  assert.match(page, /Artwork intentionally left blank/);
  assert.match(layout, /SinaVro Vibe/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
