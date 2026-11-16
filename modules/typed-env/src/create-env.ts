import type { z } from "zod";

type Source = Record<string, string | undefined>;

/**
 * Parse an env source against a schema. Throws one error listing every
 * invalid or missing variable by name. Values are never included.
 */
export function createEnv<T extends z.ZodType>(schema: T, source: Source): z.output<T> {
  const result = schema.safeParse(source);
  if (result.success) return result.data;

  const problems = result.error.issues.map((issue) => {
    const name = issue.path.join(".") || "(root)";
    return `  - ${name}: ${issue.message}`;
  });
  throw new Error(`Invalid environment variables:\n${problems.join("\n")}`);
}
