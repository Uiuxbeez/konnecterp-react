import test from "node:test";
import assert from "node:assert/strict";
import { runCmsButtonAction } from "./cms-button-actions";

test("PDF action opens a new tab and never opens a demo for missing/unsafe URLs", () => {
  const calls: unknown[][] = [];
  const previous = Object.getOwnPropertyDescriptor(globalThis, "window");
  Object.defineProperty(globalThis, "window", { configurable: true, value: { location: { origin: "https://example.com" }, open: (...args: unknown[]) => calls.push(args) } });
  const ctx = { openDemo: () => assert.fail("Unexpected demo"), openVideo: () => assert.fail("Unexpected video") };
  try {
    runCmsButtonAction("attachment", "/uploads/brochure.pdf", ctx, "demo_modal");
    assert.deepEqual(calls, [["https://example.com/uploads/brochure.pdf", "_blank", "noopener,noreferrer"]]);
    for (const href of ["", "javascript:alert(1)", "data:text/html,test"]) runCmsButtonAction("attachment", href, ctx, "demo_modal");
    assert.equal(calls.length, 1);
  } finally {
    if (previous) Object.defineProperty(globalThis, "window", previous);
    else Reflect.deleteProperty(globalThis, "window");
  }
});
