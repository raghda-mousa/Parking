import mongoose, { Connection } from 'mongoose';
import { logi } from '../logger';

const logger = logi(__filename);

declare global {
  var serviceDB: Connection;
}

async function initServiceDB() {
  try {
    if (!process.env.DB_URL) {
      throw new Error('DB_URL must be defined');
    }


    logger.info('--------Pre Connecting to Service MongoDB...');

    const dbUrl = `${process.env.DB_URL}`;
    const options = {
      authSource: 'admin',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    };

    global.serviceDB = await mongoose.createConnection(dbUrl, options);

    logger.info('--------Successfully Connected to Service MongoDB');

  } catch (error: any) {
    const msg = `Error | connecting to Service MongoDB:: ${error?.message}`;
    logger.error(msg);
    logger.error(error);
    throw new Error(msg);
  }
}

export { initServiceDB };
