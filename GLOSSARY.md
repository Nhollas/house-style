# house-style

A personal library of TypeScript code I keep rewriting, done the way I like it: abstractions, and libraries wired up to my taste. Modules are copied into apps and owned there, used by me and by agents. It is not an app scaffolder.

## Language

**Module**:
One installable capability, always shipped as code plus tests, nameable in two or three words, that an app either has or doesn't (e.g. auth, typed env config, API test harness). May be framework- or tool-specific. There is one kind of Module; its Overview says what sort of thing it is.
_Avoid_: Package, component, plugin, feature

**Manifest**:
A module's declaration of what it needs and touches: npm dependencies, environment variables, required modules, and files it creates or changes.
_Avoid_: Config, metadata

**Overview**:
A module's single markdown document explaining what it is, where its seams are and what is safe to change. Written for agents first, humans second; copied into the app with the code.
_Avoid_: Guide, instructions, description, README

## Relationships

- A **Module** has exactly one **Manifest** and one **Overview**, and ships its own tests.
- A **Module** may require other **Modules**, declared in its **Manifest**; installing it installs them.
