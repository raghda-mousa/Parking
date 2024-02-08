import express, { Request, Response, RequestHandler, NextFunction, json } from 'express';

import { logi } from '@boost';
import {
  healthCheckRouter,
  parkingsRouter,
  usersRouter,
  authRouter,
  reservationsRouter,
  paymentRouter,
  userLocationRouter,
  nearestParkingServiceRouter,
  qrCodeRouter,
  paypalRouter,
  webhookRouter
} from '@routes';
import { ResponseService } from '@services'


const logger = logi(__filename);
const app = express();

app.use(json() as RequestHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  const { host, accept, date, connection, expires, location, origin } = req.headers;
  const chosenHeaders: any = { ...req.headers };

  chosenHeaders['x-access-token'] = null;
  next();
});
app.use(paypalRouter);
app.use(healthCheckRouter);
app.use(parkingsRouter);
app.use(usersRouter);
app.use(userLocationRouter);
app.use(reservationsRouter);
app.use(paymentRouter);
app.use(authRouter);
app.use(nearestParkingServiceRouter);
app.use(qrCodeRouter);
app.use(webhookRouter);

app.all('*', async (req, res) => {
  ResponseService.sendNotFound(res, "Not Found")
});


export { app };
