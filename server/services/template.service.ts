import { default as nunjucks } from "nunjucks";
import flashService from "/services/flash.service.ts";
import config from "/config/config.ts";

const nunjucksEnv = nunjucks.configure(`${Deno.cwd()}/views`, {
  autoescape: true,
  noCache: config.DENO_ENV === "development",
  trimBlocks: true
});

export function render(template: string, ctx: Record<string, unknown> = {}) {
  return nunjucks.render(template, {
    ...ctx,
    flashSuccess: flashService.success,
    flashInfo: flashService.info,
    flashErrors: flashService.errors,
  });
}

/**
 * Set value to `null` to unset.
 */
export const addGlobal = nunjucksEnv.addGlobal.bind(nunjucksEnv);