// Documentation regressions for PR #1. Run with: node --test tests/agents.test.mjs
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
// Use the same generator as next dev; no server or network access is needed.
import {
  AGENT_RULES_START_MARKER,
  AGENT_RULES_END_MARKER,
  hasCurrentAgentRules,
  removeAgentRulesFiles,
  writeAgentFiles,
} from "next/dist/server/lib/generate-agent-files.js";

const agents = await readFile(new URL("../AGENTS.md", import.meta.url), "utf8");
const projectHeadings = [
  "Non-negotiable rules",
  "Commands",
  "Tech stack",
  "Site features",
  "Project structure",
  "Conventions",
  "Content",
];

function splitManagedBlock(content) {
  const start = content.indexOf(AGENT_RULES_START_MARKER);
  const end = content.indexOf(AGENT_RULES_END_MARKER);

  assert.ok(start >= 0, "The opening Next.js marker must exist");
  assert.ok(end > start, "The closing marker must follow the opening marker");

  return {
    before: content.slice(0, start),
    block: content.slice(start, end + AGENT_RULES_END_MARKER.length),
    after: content.slice(end + AGENT_RULES_END_MARKER.length),
  };
}

async function copyAgents(t, content) {
  const directory = await mkdtemp(join(tmpdir(), "website-agents-test-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const file = join(directory, "AGENTS.md");
  await writeFile(file, content, "utf8");
  return { directory, file };
}

test("AGENTS.md contains one ordered pair of standalone Next.js markers", () => {
  const lines = agents.split(/\r?\n/);
  for (const marker of [AGENT_RULES_START_MARKER, AGENT_RULES_END_MARKER]) {
    assert.equal(agents.split(marker).length - 1, 1, `${marker} must be unique`);
    assert.ok(lines.includes(marker), `${marker} must occupy its own line`);
  }
  splitManagedBlock(agents);
});

test("the project introduction is outside and before the managed block", () => {
  const { before } = splitManagedBlock(agents);
  assert.match(before, /^# AGENTS\.md\r?\n/);
  assert.match(before, /Huyen's personal website\./);
  assert.match(before, /It is a learning project/);
  assert.match(before, /No database or backend; content lives in the repo\./);
});

test("all project guidance follows the closing marker", () => {
  const { block, after } = splitManagedBlock(agents);
  assert.match(block, /^## This is NOT the Next\.js you know$/m);
  assert.ok(block.includes("node_modules/next/dist/docs/"));
  const managedHeadings = block.split(/\r?\n/).filter((line) => line.startsWith("## "));
  assert.equal(managedHeadings.length, 1, "Only Next.js guidance belongs in the managed block");

  const protectedHeadings = after.split(/\r?\n/);
  for (const heading of projectHeadings) {
    assert.ok(protectedHeadings.includes(`## ${heading}`), `${heading} must survive regeneration`);
  }
});

for (const platform of ["LINKEDIN", "GITHUB"]) {
  test(`the ${platform} URL placeholder is removed`, () => {
    assert.ok(!agents.includes(`YOUR_${platform}_URL`), "Do not publish placeholder social URLs");
  });
}

test("content guidance still identifies the shared social URL configuration", () => {
  const { after } = splitManagedBlock(agents);
  const contentHeading = "## Content";
  const lines = after.split(/\r?\n/);
  const headingIndex = lines.indexOf(contentHeading);
  assert.ok(headingIndex >= 0, "The Content section must exist");
  const followingLines = lines.slice(headingIndex + 1);
  const nextHeading = followingLines.findIndex((line) => line.startsWith("## "));
  const content = followingLines.slice(0, nextHeading < 0 ? undefined : nextHeading).join("\n");
  assert.match(content, /^- Social URLs and site metadata live in one file, `lib\/site\.ts`\.$/m);
});

// Exercise the repository document rather than testing synthetic framework input.
// Every generator operation is confined to a disposable copy of AGENTS.md.
for (const [label, eol] of [["LF", "\n"], ["CRLF", "\r\n"]]) {
  const source = agents.replace(/\r?\n/g, eol);

  test(`next dev regeneration leaves the current document unchanged (${label})`, async (t) => {
    const { directory, file } = await copyAgents(t, source);
    assert.equal(hasCurrentAgentRules(directory), true);

    for (let run = 0; run < 2; run++) {
      assert.deepEqual(writeAgentFiles(directory), { agentsMd: "unchanged" });
      assert.equal(await readFile(file, "utf8"), source);
    }
  });

  test(`refreshing stale Next.js guidance preserves project content (${label})`, async (t) => {
    const { before, after } = splitManagedBlock(source);
    const stale = `${before}${AGENT_RULES_START_MARKER}${eol}Outdated Next.js guidance${eol}${AGENT_RULES_END_MARKER}${after}`;
    const { directory, file } = await copyAgents(t, stale);
    assert.equal(hasCurrentAgentRules(directory), false);

    assert.deepEqual(writeAgentFiles(directory), { agentsMd: "updated" });
    assert.equal(hasCurrentAgentRules(directory), true);
    assert.equal(await readFile(file, "utf8"), source, "Refreshing the block must preserve the rest of the document exactly");
    assert.deepEqual(writeAgentFiles(directory), { agentsMd: "unchanged" });
  });

  test(`disabling agent rules preserves the project document (${label})`, async (t) => {
    const { before, after } = splitManagedBlock(source);
    const { directory, file } = await copyAgents(t, source);

    assert.deepEqual(removeAgentRulesFiles(directory), { agentsMd: "removed" });
    const remaining = await readFile(file, "utf8");
    assert.equal(remaining, `${before.trimEnd()}${eol}${eol}${after.trimStart()}`);
    assert.ok(!remaining.includes(AGENT_RULES_START_MARKER));
    assert.ok(!remaining.includes(AGENT_RULES_END_MARKER));
    assert.equal(hasCurrentAgentRules(directory), false);
    assert.deepEqual(removeAgentRulesFiles(directory), { agentsMd: "unchanged" });
  });
}
