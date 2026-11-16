# Modules are named for the capability, not the area

A module's name says what the app gains, in kebab-case: `typed-env`, not `env`. Area names like `env`, `auth` or `http` claim a whole territory, so the second module in that area has nowhere to go and an agent can't tell from the name what it installs. Framework- or tool-specific modules add the framework as a suffix (`typed-env-next`). The name is used unchanged for the folder, the registry item, the install path (`src/<name>/`) and the workspace package (`@house-style/<name>`).
