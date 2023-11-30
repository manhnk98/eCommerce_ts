import { env } from "@environments";
import { DataSource } from "typeorm";
import * as entities from "@entities";

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