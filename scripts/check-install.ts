// For each built registry item: install it into an empty project with
// `shadcn add`, then run its tests there. Proves the Manifest is complete.
import { execSync } from "node:child_process";
import { mkdtempSync, readdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const registryDir = resolve("registry");
const items = readdirSync(registryDir).filter((f) => f.endsWith(".json") && f !== "registry.json");

for (const file of items) {
  const name = file.replace(/\.json$/, "");
  const dir = mkdtempSync(join(tmpdir(), `house-style-${name}-`));
  console.log(`\n▶ ${name} → ${dir}`);
  try {
    writeFileSync(join(dir, "package.json"), JSON.stringify({ name: `fixture-${name}`, private: true, type: "module" }));
    const run = (cmd: string) => execSync(cmd, { cwd: dir, stdio: "inherit" });
    run(`npx -y shadcn@4.23.0 add ${join(registryDir, file)} --yes`);
    run("npx vitest run");
    console.log(`✔ ${name}`);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}
