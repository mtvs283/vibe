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

test("server-renders the brand gate landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Viral Vibe \| SinaVro<\/title>/i);
  assert.match(html, /aria-label="Viral Vibe"/);
  assert.match(html, /TAP TO CONTINUE/);
  assert.match(html, /한국어교육AI연구개발원/);
  assert.match(html, /brand\/institute\.png/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
});

test("includes dual gates, dual image slots, and PWA wiring", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  const packageJson = await readFile(new URL("../package.json", import.meta.url), "utf8");
  const manifest = await readFile(new URL("../public/manifest.webmanifest", import.meta.url), "utf8");

  assert.match(page, /const partOneCards:[\s\S]*스불재[\s\S]*싼마이/);
  assert.match(page, /const partTwoCards:[\s\S]*개똥 SOLD OUT[\s\S]*굼벵이 구르는 폼 미쳤다/);
  assert.match(page, /gate-brand|gate === "brand"/);
  assert.match(page, /LocaleSelect|changeLocale|LOCALE_STORAGE_KEY/);
  assert.match(page, /proverbText|cardFieldKey/);
  assert.match(page, /answer-stage/);
  assert.match(page, /ui\.try_again|TRY AGAIN/);
  assert.match(page, /brand\/institute\.png/);
  assert.match(page, /한국어교육AI연구개발원/);
  assert.match(page, /tk-mark/);
  assert.match(page, /brand\/tk-banner\.png/);
  assert.match(layout, /manifest\.webmanifest/);
  assert.match(layout, /PwaRegister/);
  assert.match(manifest, /Viral Vibe/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);

  const catalog = await readFile(new URL("../app/i18n/catalog.json", import.meta.url), "utf8");
  assert.match(catalog, /"ui\.brand_slogan"/);
  assert.match(catalog, /Old Wisdom, New Vibes/);
  assert.match(catalog, /"ja"/);
  assert.match(catalog, /"sw"/);
});
