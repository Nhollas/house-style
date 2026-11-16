import { describe, expect, it } from "vitest";
import { z } from "zod";
import { createEnv } from "./create-env.js";

const schema = z.object({
  API_URL: z.url(),
  PORT: z.coerce.number().int().default(3000),
  SECRET: z.string().min(32),
});

describe("createEnv", () => {
  it("returns typed, coerced values", () => {
    const env = createEnv(schema, {
      API_URL: "https://example.com",
      PORT: "8080",
      SECRET: "x".repeat(32),
    });

    expect(env).toEqual({ API_URL: "https://example.com", PORT: 8080, SECRET: "x".repeat(32) });
  });

  it("applies defaults", () => {
    const env = createEnv(schema, { API_URL: "https://example.com", SECRET: "x".repeat(32) });

    expect(env.PORT).toBe(3000);
  });

  it("lists every invalid or missing variable by name in one error", () => {
    const run = () => createEnv(schema, { API_URL: "not a url", PORT: "abc" });

    expect(run).toThrow(/API_URL/);
    expect(run).toThrow(/PORT/);
    expect(run).toThrow(/SECRET/);
  });

  it("never includes values in the error", () => {
    const leaked = "hunter2-do-not-log";

    expect(() => createEnv(schema, { API_URL: leaked, SECRET: leaked })).toThrow(
      expect.objectContaining({ message: expect.not.stringContaining(leaked) }),
    );
  });

  it("ignores variables the schema does not mention", () => {
    const env = createEnv(schema, {
      API_URL: "https://example.com",
      SECRET: "x".repeat(32),
      UNRELATED: "y",
    });

    expect(env).not.toHaveProperty("UNRELATED");
  });
});
