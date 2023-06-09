import { join } from "node:path";
import { readFile } from "node:fs/promises";

export async function compileTemplate(templateName: string, ctx: Record<string, any>) {
  const fileContents = await readFile(join(process.cwd(), "server", "templates", `${templateName}.html`), "utf-8");
  const html = addContext(fileContents, ctx);

  return {
    html,
    text: stripTags(html)
  };
}

function addContext(fileContents: string, ctx: Record<string, any>): string {
  return fileContents.replace(/\{\{\s*([^\s]+)\s*\}\}/g, (_, key) => ctx[key] ?? "");
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "");
}