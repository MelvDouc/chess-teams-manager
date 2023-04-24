import { RouteHandler } from "../types.js";
import flashService from "../services/flash.service.js";
import { AppState } from "../types.js";

export const redirectToLogin: RouterMiddleware<any, any, AppState> = async ({ request, response, state }, next) => {
  if (request.method === "GET" && request.url.pathname !== "/connexion" && !state.session.has("user")) {
    return response.redirect("/connexion");
  }

  await next();
};

export const preventDoubleLogin: RouterMiddleware<any, any, AppState> = async ({ response, state }, next) => {
  if (state.session.has("user")) {
    flashService.errors = ["Vous êtes déjà connecté(e)."];
    return response.redirect("/");
  }

  await next();
};