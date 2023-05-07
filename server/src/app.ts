import { join } from "node:path";
import express from "express";
import config from "./config/config.js";
import router from "./routes/router.js";

const app = express();
const port = process.env["PORT"] ?? process.env["port"] ?? process.env["Port"];
const clientDir = join(process.cwd(), "client");

if (config.NODE_ENV === "development") {
  const { default: cors } = await import("cors");
  app.use(cors({
    origin: "*"
  }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(express.static(join(clientDir, (config.NODE_ENV === "development") ? "public" : "dist")));

app.listen(port, () => {
  console.log(`App running on \x1b[32m\x1b[1mhttp://localhost:${port}\x1b[0m ...`);
});