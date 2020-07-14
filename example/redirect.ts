import {
  serve,
  Response,
} from "https://deno.land/std@0.60.0/http/server.ts";

import { encodeUrl } from "../mod.ts";
import { escapeHtml } from "https://deno.land/x/escape_html@1.0.0/mod.ts";

const server = serve("127.0.0.1:3000");
console.log("Server listening on: 3000");

for await (const req of server) {
  const location = encodeUrl("https://www.google.com/");
  const res: Response = {
    status: 302,
    body: `<p>Redirecting to new site: ${escapeHtml(location)}</p>`,
    headers: new Headers([
      ["Content-Type", "text/html; charset=UTF-8"],
      ["Location", location],
    ]),
  };
  req.respond(res);
}
