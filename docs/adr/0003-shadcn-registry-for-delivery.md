# Deliver modules through the shadcn registry, no CLI of our own

Modules are published as shadcn `registry-item.json` files and installed with `npx shadcn add <url>`. The format already covers the Manifest (npm deps, module deps via `registryDependencies`, env vars, file targets, an install message), so writing and maintaining our own CLI buys nothing yet.

Checked with shadcn CLI 4.23.0: a `registry:item` with `registry:file` targets (`~/src/...`) installs into a bare Node project with no `components.json`, adds npm deps and `.env.local` entries, and pulls in a module it depends on.

## Consequences

- Use `registry:item` + `registry:file` with `~/` targets, not the UI-oriented types and `@` aliases, so backend apps work.
- The repo is public and the built registry is served from GitHub raw URLs; no hosting to run.
- CI installs each module with `shadcn add` into an empty fixture project and runs its tests there, because tests passing in the repo don't prove the Manifest is right.
- If shadcn's CLI ever stops fitting, the fallback is our own thin CLI reading the same format.
