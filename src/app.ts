import {env} from "@environments";
import * as express from "express";
import AppDataSource from "./configs/typeorm/config";
import {ApiKeyEntity} from "./entities/apikey.entity";

const app = express();
const port = env.get("port");
const router = express.Router()

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });

app.get("/", async (req, res) => {
    const k = {
        key: "aaaaa",
        permissions: ["0000"],
        status: true,
    };

    const key = new ApiKeyEntity({...k});
    console.log("ApiKeyEntity => ", key);

    await AppDataSource.getMongoRepository(ApiKeyEntity).save(key);
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log("db_url =>", env.get("mongodb.url"));
    return console.log(`Express is listening at http://localhost:${port}`);
});
