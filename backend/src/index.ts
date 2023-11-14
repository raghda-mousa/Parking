import * as dotenv from 'dotenv';
dotenv.config({ path: process.env.ENV_KEYS }); // ****** Must be called first ******

import { initServiceDB, logi } from '@boost';
import { EnvironementService } from '@services'

const logger = logi(__filename)

const connectToMongo = async () => {
  try {
    await initServiceDB();
    // await initLegacyDB(); // Connection to Stf API DB
    // await initDatabroadcastDB(); // Init replica DB connection
  } catch (error: any) {
    const msg = `Failed to start the mongo connection, msg=${error?.message}`;
    logger.error(msg);
    throw new Error(msg);
  }
};


const start = async () => {
  try {
    await connectToMongo();
  } catch (error: any) {
    logger.error(error?.message);
  }
};

// Better way to handle port, just in case we want to run on a different port.
const startServer = () => {
  const { app } = require('./app');
  logger.info(`After importing app's file`);

  const port: number = parseInt(process.env.PORT as string, 10) || 3000;

  app.listen(port, () => {
    logger.info(`|------------Listening for port ${port}`);
  });
};


(async () => {
  logger.info(`Init | Step before Boot Env Data...`);

  try {
    EnvironementService.validate()
    await start();
    startServer();
  } catch (error: any) {
    logger.error(`Failed to boot... | ${error?.message}`);
  }
})();