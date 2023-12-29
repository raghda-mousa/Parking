import express, { Request, Response, RequestHandler, NextFunction, json } from 'express';

import { logi } from '@boost';
import { healthCheckRouter, parkingsRouter, usersRouter, authRouter,reservationsRouter,paymentRouter,userLocationRouter,nearestParkingServiceRouter,qrCodeRouter } from '@routes';
import { ResponseService } from '@services'

const logger = logi(__filename);
const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-access-token',
  );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.set('trust proxy', true);

app.use(json() as RequestHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  const { host, accept, date, connection, expires, location, origin } = req.headers;
  const chosenHeaders: any = { ...req.headers };

  chosenHeaders['x-access-token'] = null;
  next();
});

app.use(healthCheckRouter);
app.use(parkingsRouter);
app.use(usersRouter);
app.use(userLocationRouter);
app.use(reservationsRouter);
app.use(authRouter);

app.all('*', async (req, res) => {
  ResponseService.sendNotFound(res, "Not Found")
});

const PORT = 3000;
app.listen(PORT, () => {
  logger.info('Server is running on port ${PORT}');
});

export { app };
