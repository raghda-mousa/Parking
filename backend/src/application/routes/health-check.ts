import { ResponseService } from '@services';
import express, { Request, Response } from 'express';

const router = express.Router();

router.all(
  '/v1/health',
  async (req: Request, res: Response) => {
    return ResponseService.sendSuccess(res, 'ok', 'Service is up')
  }
);

export { router as healthCheckRouter };
