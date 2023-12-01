import {env} from "@environments";
import {DataSource} from "typeorm";

export const AppDataSource = new DataSource({
    type: "mongodb",
    url: env.get("mongodb.url"),
    entities: ["src/entities/**/*.ts"],
    synchronize: true,
    migrations: ["src/**/migrations/*{.ts,.js}"],
    migrationsTableName: "migrations",
    migrationsRun: false,
});

