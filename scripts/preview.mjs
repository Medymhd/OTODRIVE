import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORT = Number(process.env.PORT || 4173);
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", "http://localhost");
    let pathname = decodeURIComponent(url.pathname);
    if (pathname === "/") pathname = "/index.html";
    const filePath = path.resolve(ROOT, `.${pathname}`);
    if (!filePath.startsWith(ROOT + path.sep)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }
    const info = await stat(filePath);
    if (!info.isFile()) throw new Error("not a file");
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "content-type": TYPES[ext] || "application/octet-stream",
      "cache-control": "no-store",
    });
    createReadStream(filePath).pipe(res);
  } catch {
    res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
    res.end("<h1>404</h1><p>Local preview: file not found.</p>");
  }
}).listen(PORT, "127.0.0.1", () => {
  console.log(`Local preview: http://127.0.0.1:${PORT}/`);
});
