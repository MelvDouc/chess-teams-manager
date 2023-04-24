import { join } from "path";
import express from "express";
import router from "./routes/router.js";

const app = express();
const port = process.env["PORT"] ?? process.env["port"] ?? process.env["Port"];

if (process.env.NODE_ENV === "development") {
  const { default: cors } = await import("cors");
  app.use(cors({
    origin: "http://localhost:5173"
  }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(express.static(join(process.cwd(), "client", "dist")));

app.listen(port, () => {
  console.log(`App running on http://localhost:${port} ...`);
});