import assert from "node:assert/strict";
import test from "node:test";
import { cardLinkHref } from "./card-link";

test("accepts internal paths with queries and fragments", () => {
  assert.equal(cardLinkHref({ type: "internal", href: "/industries?type=erp#details" }), "/industries?type=erp#details");
  assert.equal(cardLinkHref({ type: "internal", href: "/" }), "/");
});

test("accepts external HTTP links and rejects unsafe or mismatched URLs", () => {
  assert.equal(cardLinkHref({ type: "external", href: "https://example.com/info" }), "https://example.com/info");
  for (const href of ["javascript:alert(1)", "data:text/html,test", "//example.com", "/\\example.com", "https://example.com"]) {
    assert.equal(cardLinkHref({ type: "internal", href }), undefined);
  }
  for (const href of ["javascript:alert(1)", "data:text/html,test", "//example.com", "/about", "invalid"]) {
    assert.equal(cardLinkHref({ type: "external", href }), undefined);
  }
});

test("leaves legacy cards and empty link configurations without an href", () => {
  assert.equal(cardLinkHref(), undefined);
  assert.equal(cardLinkHref({ type: "default", href: "/about" }), undefined);
  assert.equal(cardLinkHref({ type: "internal", href: "" }), undefined);
});
