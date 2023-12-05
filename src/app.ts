import { env } from "@environments";
import * as express from "express";

const app = express();
const port = env.get("port");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
