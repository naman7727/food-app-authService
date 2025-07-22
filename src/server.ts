import app from "./app";
import { Config } from "./config";
import { AppDataSource } from "./config/data-source";
import logger from "./config/logger";

// import { Config } from "./config";
// console.log(Config.PORT)

const startServer = async () => {
  const PORT = Config.PORT;
  try {
    await AppDataSource.initialize();
    logger.info("Database connected successfully");

    app.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
    //  console.log(`Listening on PORT ${PORT}`))
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
void startServer();
