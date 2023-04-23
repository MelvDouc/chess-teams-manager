import { RouterMiddleware } from "oak";
import flashService from "../services/flash.service.ts";
import { AppState } from "../types.ts";

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