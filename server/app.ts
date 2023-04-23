import { oakCors } from "cors";
import { Application } from "oak";
import { Session } from "oak_sessions";
import config from "./config/config.ts";
import staticMiddleware from "./middleware/static.middleware.ts";
import router from "./routes/router.ts";
import { AppState } from "./types.ts";

const app = new Application<AppState>();
const port = Deno.env.get("PORT") ?? Deno.env.get("port") ?? Deno.env.get("Port") ?? config.PORT;

app.use(Session.initMiddleware());
app.use(staticMiddleware);
app.use(oakCors({
  origin: config.CLIENT_URL
}));
app.use(router.routes(), router.allowedMethods());

app.addEventListener("listen", ({ hostname, secure, port }) => {
  if (hostname === "0.0.0.0")
    hostname = "localhost";

  const protocol = secure ? "https" : "http";
  console.log(
    `%cApp running on %c${protocol}://${hostname}:${port}%c ...`,
    "color: lime",
    "color: lime; text-decoration: underline",
    "color: lime"
  );
});

await app.listen({ port: +port });