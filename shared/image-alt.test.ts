import { test } from "node:test";
import assert from "node:assert/strict";
import { imageAlt } from "./image-alt";
import { SECTION_DEFS, withImageAltFields, type FieldDef } from "./sections";

test("all section images, including nested cards, have exactly one editable alt field", () => {
  let images = 0;
  function check(fields: FieldDef[]) {
    assert.equal(new Set(fields.map(field => field.key)).size, fields.length);
    for (const field of fields) {
      if (field.type === "repeater") check(field.fields);
      if (field.type === "image") {
        images++;
        assert.ok(fields.some(other => other.type === "text" && (other.key === `${field.key}Alt` || other.key === "alt")), field.key);
      }
    }
  }
  SECTION_DEFS.forEach(section => check(section.fields));
  assert.ok(images > 20);
});

test("future nested image fields gain alt controls without duplicating existing ones", () => {
  const fields: FieldDef[] = [{ key: "cards", label: "Cards", type: "repeater", itemLabel: "Card", fields: [
    { key: "newImage", label: "New Image", type: "image" },
  ] }];
  const result = withImageAltFields(fields);
  assert.deepEqual(withImageAltFields(result), result);
  const repeater = result[0];
  assert.equal(repeater.type, "repeater");
  if (repeater.type === "repeater") assert.equal(repeater.fields[1].key, "newImageAlt");
});

test("saved alt text survives JSON persistence and explicit empty text remains decorative", () => {
  const content = JSON.parse(JSON.stringify({ heroImageAlt: 'ERP dashboard & inventory', imageAlt: "", alt: "Legacy logo" }));
  assert.equal(imageAlt(content, "heroImage"), "ERP dashboard & inventory");
  assert.equal(imageAlt(content, "image", "Old title"), "");
  assert.equal(imageAlt({ alt: "Existing logo" }, "src"), "Existing logo");
  assert.equal(imageAlt({}, "photo", "Existing name"), "Existing name");
});
