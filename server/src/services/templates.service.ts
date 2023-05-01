import { join } from "node:path";
import { readFile } from "node:fs/promises";

const interpolationRegex = RegExp("{{\\s*(\\S+)\\s*}}", "g");
const fileContentCache = new Map<string, string>();

export async function compileTemplate(templateName: string, ctx: Record<string, any>) {
  const fileContents = fileContentCache.get(templateName)
    ?? await readFile(join(process.cwd(), "server", "templates", `${templateName}.html`), "utf-8");

  if (!fileContentCache.has(templateName))
    fileContentCache.set(templateName, fileContents);

  const html = addContext(fileContents, ctx);

  return {
    html,
    text: stripTags(html)
  };
}

function addContext(fileContents: string, ctx: Record<string, any>): string {
  return fileContents.replace(interpolationRegex, (_, key) => ctx[key] ?? "");
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "");
}