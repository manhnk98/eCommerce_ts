import {env} from "@environments";
import {DataSource} from "typeorm";

const dataSource = new DataSource({
    type: "mongodb",
    url: env.get("mongodb.url"),
    entities: ["src/entities/**/*.ts"],
    synchronize: true,
    migrations: ["src/**/migrations/*{.ts,.js}"],
    migrationsTableName: "migrations",
    migrationsRun: false,
});

export default dataSource;
