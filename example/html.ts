import {
  serve,
  Response,
} from "https://deno.land/std@0.60.0/http/server.ts";

import { encodeUrl } from "../mod.ts";
import { escapeHtml } from "https://deno.land/x/escape_html@1.0.0/mod.ts";

const server = serve("127.0.0.1:3000");
console.log("Server listening on: 3000");

for await (const req of server) {
  const res: Response = {
    status: 404,
    body: `<p>Location ${escapeHtml(encodeUrl(req.url))} not found</p>`,
    headers: new Headers([
      ["Content-Type", "text/html; charset=UTF-8"],
    ]),
  };
  req.respond(res);
}
