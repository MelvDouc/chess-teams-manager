import { readFile } from "fs/promises";
import { join } from "path";
import { RouteHandler } from "../types.js";

const home: RouteHandler = async (req, res) => {
  res
    .contentType("html")
    .write(await readFile(join(process.cwd(), "client", "dist", "index.html")));
  res.end();
};

export default {
  home
};