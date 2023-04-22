import { RouterMiddleware } from "oak";
import { contentType } from "media_types";

const home: RouterMiddleware<"/(.*)"> = async ({ request, response }, next) => {
  const { pathname } = request.url;

  try {
    const extension = pathname.match(/\.(?<ext>[^.?#]+)$/)?.groups?.ext;

    if (!extension) {
      response.headers.set("Content-Type", contentType("html"));
      response.body = await Deno.readFile(`${Deno.cwd()}/client/dist/index.html`);
      return;
    }

    response.headers.set("Content-Type", contentType(extension) ?? "text/plain");
    response.body = await Deno.readFile(`${Deno.cwd()}/client/dist${pathname}`);
  } catch (err) {
    console.log(err);
  } finally {
    return next();
  }
};

export default {
  home
};