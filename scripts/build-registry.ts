// Assembles each module's co-located Manifest into the root registry.json
// that `shadcn build` reads, rewriting file paths to be repo-relative.
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const modulesDir = "modules";

const items = readdirSync(modulesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => join(modulesDir, entry.name))
  .filter((dir) => existsSync(join(dir, "registry-item.json")))
  .map((dir) => {
    const { $schema: _, ...item } = JSON.parse(readFileSync(join(dir, "registry-item.json"), "utf8"));
    item.files = item.files.map((file: { path: string }) => ({ ...file, path: join(dir, file.path) }));
    return item;
  });

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "house-style",
  homepage: "https://github.com/Nhollas/house-style",
  items,
};

writeFileSync("registry.json", `${JSON.stringify(registry, null, 2)}\n`);
console.log(`registry.json: ${items.map((i) => i.name).join(", ")}`);
