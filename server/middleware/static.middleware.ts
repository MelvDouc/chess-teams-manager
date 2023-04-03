import type { Context } from "oak";
import { AppState } from "/types.ts";

const staticMiddleware = async ({ request, response }: Context<AppState>, next: () => Promise<any>) => {
  if (!request.url.pathname.startsWith("/public/"))
    return next();

  try {
    const path = request.url.pathname.replace(/^\/public\//, "");
    if (path.endsWith(".js"))
      response.type = "application/javascript";
    response.body = await Deno.readFile(`/${Deno.cwd()}/static/${path}`);
  } catch (error) {
    console.log(error);
  } finally {
    return next();
  }
};

export default staticMiddleware;