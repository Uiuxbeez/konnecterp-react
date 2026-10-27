import test from "node:test";
import assert from "node:assert/strict";
import { visibleSections } from "./visible-sections";

test("draft and published sections exclude hidden rows and retain order", () => {
  const rows = [{ id: 1, enabled: false, position: 0 }, { id: 2, enabled: true, position: 2 }, { id: 3, position: 1 }];
  assert.deepEqual(visibleSections(rows).map((row) => row.id), [3, 2]);
  assert.equal(rows[0].id, 1);
});
test("all-hidden and empty pages stay empty", () => {
  assert.deepEqual(visibleSections([{ enabled: false }]), []);
  assert.deepEqual(visibleSections([]), []);
});
