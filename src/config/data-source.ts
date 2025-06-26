import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity/User";
import { Config } from ".";
export const AppDataSource = new DataSource({
  type: "postgres",
  host: Config.DB_HOST,
  port: Number(Config.DB_PORT),
  username: Config.DB_USERNAME,
  password: Config.DB_PASSWORD,
  database: Config.DB_NAME,
  // don't this line in production.
  synchronize: Config.NODE_ENV === "test" || Config.NODE_ENV === "dev",
  logging: false,
  // entities should be imported from the entity folder
  // if you have create a new entity, you should add it here
  entities: [User],
  migrations: [],
  subscribers: [],
});
