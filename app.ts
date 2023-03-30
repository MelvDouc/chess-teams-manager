import { default as nunjucks } from "nunjucks";
import { Application } from "oak";
import { Session } from "oak_sessions";
import staticMiddleware from "/middleware/static.middleware.ts";
import router from "/routes/router.ts";
import { AppState } from "/types.ts";
import "https://deno.land/std@0.181.0/dotenv/load.ts";

nunjucks.configure(`${Deno.cwd()}/views`, {
  autoescape: true,
  noCache: false,
  trimBlocks: true
});

const app = new Application<AppState>();

app.use(Session.initMiddleware());
app.use(staticMiddleware);
app.use(router.routes(), router.allowedMethods());

app.addEventListener("listen", ({ hostname, secure, port }) => {
  if (hostname === "0.0.0.0")
    hostname = "localhost";

  const protocol = secure ? "https" : "http";
  console.log(
    `App running on %c${protocol}://${hostname}:${port}%c ...`,
    "color: lime; font-weight: bold",
    "color: initial; font-weight: normal"
  );
});

await app.listen({ port: 8080 });