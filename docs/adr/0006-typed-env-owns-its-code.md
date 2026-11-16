# The typed-env module is our own code on Zod, not a wrapper around t3-env

`@t3-oss/env-core` already does typed env config. We own the ~40 lines instead, per ADR 0001: the logic is small, and owning it means the testing seam (`createEnv(source)` alongside a default `env` parsed from `process.env` at import) is ours to shape rather than something to work around. Zod stays a package dependency. First version is server-side only; a Next.js client/server split would be a separate module.

It reads `process.env` only; loading `.env` files is left to Node's `--env-file` or the framework, so no `dotenv`.
