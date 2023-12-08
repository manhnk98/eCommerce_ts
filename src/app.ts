import { env } from "@environments";
import * as express from "express";
import helmet from "helmet";
import * as morgan from "morgan";
import * as compression from "compression";
// import {Mongodb} from "./configs/config.mongoose"
import {Mongodb} from "./configs/config.mongoose"

const app = express();
const port = env.get("port");

// init middlewares
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
Mongodb.getInstance();


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
