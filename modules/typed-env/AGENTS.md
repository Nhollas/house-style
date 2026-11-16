# typed-env

Typed, validated environment config for server-side code. The rest of the app reads `env.X`, never `process.env.X`.

## Files

- `env.ts`: the app's **schema** and the `env` object, parsed from `process.env` when first imported. Fails fast.
- `create-env.ts`: `createEnv(schema, source)`, the parsing mechanism. No side effects.
- `create-env.test.ts`: tests for the mechanism. They use their own schema, so they keep passing as the app's schema changes.

## Seams

- **Adding a variable**: edit `schema` in `env.ts`. That is the only edit most apps need.
- **Testing code that needs config**: call `createEnv(schema, { ... })` with a plain object. Do not mutate `process.env` in tests.
- **Error reporting**: `createEnv` throws one error naming every bad variable. It must never include values, since they are often secrets.

## Safe to change

- The schema, freely.
- Error wording, as long as values stay out of it.

## Not this module's job

- Loading `.env` files. Use Node's `--env-file` or your framework.
- Client-side or `NEXT_PUBLIC_*` variables. Server only.
