import { z } from "zod";
import { createEnv } from "./create-env.js";

/** Add your app's variables here. Everything reads them through `env`. */
export const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

export type Env = z.output<typeof schema>;

export const env: Env = createEnv(schema, process.env);
