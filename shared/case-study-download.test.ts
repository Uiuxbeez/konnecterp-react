import test from "node:test";
import assert from "node:assert/strict";
import { caseStudyDownloadForm } from "./case-study-download";

test("enabled cards always require a form even when their selection is empty", () => {
  assert.equal(caseStudyDownloadForm({ restrictDownload: true, downloadFormSlug: "contact" }), "contact");
  assert.equal(caseStudyDownloadForm({ restrictDownload: true, downloadFormSlug: "  " }), "demo-request");
  assert.equal(caseStudyDownloadForm({}), "demo-request");
});
test("only explicitly disabled cards allow direct downloads", () => {
  assert.equal(caseStudyDownloadForm({ restrictDownload: false, downloadFormSlug: "contact" }), null);
});
test("subsequent cards independently require their own form", () => {
  const cards = ["first-form", "second-form", ""].map((downloadFormSlug) => ({ restrictDownload: true, downloadFormSlug }));
  assert.deepEqual(cards.map(caseStudyDownloadForm), ["first-form", "second-form", "demo-request"]);
  assert.deepEqual(cards.map(caseStudyDownloadForm), ["first-form", "second-form", "demo-request"]);
});
