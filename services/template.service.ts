import { default as nunjucks } from "nunjucks";
import flashService from "/services/flash.service.ts";

export function render(template: string, ctx: Record<string, unknown> = {}) {
  return nunjucks.render(template, {
    ...ctx,
    flashSuccess: flashService.success,
    flashInfo: flashService.info,
    flashErrors: flashService.errors,
  });
}