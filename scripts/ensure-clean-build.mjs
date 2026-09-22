import { execSync } from "node:child_process";
import { rmSync } from "node:fs";

function devServerRunning() {
  try {
    const output = execSync("lsof -tiTCP:3000 -sTCP:LISTEN", { encoding: "utf8" }).trim();
    return output.length > 0;
  } catch {
    return false;
  }
}

if (devServerRunning()) {
  console.error(
    "\nBuild blocked: Next.js dev server is still running on port 3000.\n" +
      "Stop it first (Ctrl+C in the dev terminal), then run build again.\n" +
      "Running build while dev is active corrupts .next and causes missing chunk errors (e.g. ./52.js).\n",
  );
  process.exit(1);
}

rmSync(".next", { recursive: true, force: true });
