// function welcome(name: string) {
//   console.log("hello");
//   console.log("naman");
//   const user = {
//     name: "naman",
//   };
//   const fname = user.name;
//   return name + fname;
// }
// welcome("naman");

import app from "./app";
import { Config } from "./config";
import logger from "./config/logger";

// import { Config } from "./config";
// console.log(Config.PORT)

const startServer = () => {
  const PORT = Config.PORT;
  try {
    app.listen(PORT, () => logger.info("Listening on port ${PORT}"));
    //  console.log(`Listening on PORT ${PORT}`))
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
startServer();
