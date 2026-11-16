# Modules are workspace packages inside the repo, copies outside it

Layout is a pnpm workspace with Turborepo: `modules/<name>/` and a generated `registry/`. Each module folder holds its code, tests, Overview (`AGENTS.md`) and Manifest; a script assembles the Manifests into the root `registry.json` that `shadcn build` reads. Each module is a workspace package so it can be type-checked and tested where it lives, even though apps receive it as copied code, never as a package dependency (see ADR 0001).

Module tests assume Vitest, since they travel into the app with the code.
