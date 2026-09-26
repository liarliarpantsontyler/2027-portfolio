import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Local demo only. Serve the original Tabby interface with a browser-local data
// adapter; never load its production authentication or analytics clients.
const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = process.env.TABBY_SOURCE_DIR || path.resolve(repo, "../Tabby");
const port = Number(process.env.TABBY_DEMO_PORT || 4174);
const app = await readFile(path.join(source, "app/index.html"), "utf8");
const runtime = await readFile(path.join(repo, "scripts/tabby-demo/runtime.js"));
const html = app
  .replace(/<script\b[^>]*\bsrc=["'][^"']+["'][^>]*><\/script>/gi, "")
  .replace(/<meta\b[^>]*name=["'](?:posthog[^"']*|meta-pixel-id|tabby-replay-enabled)["'][^>]*>/gi, "")
  .replace("<title>Tabby — Close every tab. Lose nothing.</title>", "<title>Tabby — Local demo board</title>")
  // A fresh website screenshot can take longer than the app's eight-second limit.
  .replace("controller.abort(); }, 8000)", "controller.abort(); }, 30000)")
  .replace("</head>", '<script src="/demo/runtime.js"></script></head>');

const mime = {
  ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".woff2": "font/woff2",
};

// Only static artwork is exposed from the two projects, never source or secrets.
async function asset(res, root, relative) {
  const resolved = path.resolve(root, relative);
  const type = mime[path.extname(resolved)];
  if (!resolved.startsWith(path.resolve(root) + path.sep) || !type || !(await stat(resolved)).isFile()) {
    res.writeHead(404).end("Not found");
    return;
  }
  res.writeHead(200, { "Content-Type": type, "Cache-Control": "no-cache" });
  res.end(await readFile(resolved));
}

const server = http.createServer(async (req, res) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  // Permit the product's preview service while keeping account/analytics calls blocked.
  res.setHeader("Content-Security-Policy", "connect-src 'self' https://api.microlink.io; form-action 'none'; frame-src 'none'");
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405).end("Read-only local server");
    return;
  }
  try {
    const url = new URL(req.url, "http://localhost");
    const pathname = decodeURIComponent(url.pathname);
    if (["/", "/app/", "/try/"].includes(pathname)) {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
      res.end(html);
    } else if (pathname === "/demo/runtime.js") {
      res.writeHead(200, { "Content-Type": "application/javascript", "Cache-Control": "no-store" });
      res.end(runtime);
    } else if (pathname.startsWith("/portfolio/")) {
      await asset(res, path.join(repo, "public"), pathname.slice("/portfolio/".length));
    } else if (pathname.startsWith("/Brand Assets/")) {
      await asset(res, path.join(source, "Brand Assets"), pathname.slice("/Brand Assets/".length));
    } else if (pathname === "/favicon.ico") {
      res.writeHead(204).end();
    } else {
      res.writeHead(404).end("Not found");
    }
  } catch {
    if (!res.headersSent) res.writeHead(404);
    res.end("Not found");
  }
});

server.on("error", (error) => {
  console.error(`Could not start Tabby demo on port ${port}: ${error.message}`);
  process.exitCode = 1;
});
server.listen(port, "127.0.0.1", () => {
  console.log(`Tabby demo board: http://localhost:${port}/`);
  console.log("Changes stay in this browser. Use Reset board to restore the sample content.");
});
