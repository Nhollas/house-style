# Owned code by default, packages by exception

Reusable code is copied into the consuming app and owned there (shadcn model), so it can be read, changed and adapted by me or an agent without fighting an abstraction boundary. A published package is used only when the code should never be forked and fixes must reach every app automatically.

## Considered Options

- **Packages only**: central updates, but every customisation needs an option or a fork.
- **Owned code only**: total control, but shared config and clients drift across apps.
