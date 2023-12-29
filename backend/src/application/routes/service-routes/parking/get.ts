import express, { Request, Response } from 'express';
import { query, param } from 'express-validator';
import { ParkingService, ResponseService } from 'application/services';
import { Validation } from '@middlewares';

const router = express.Router();

router.get(
    '/list',
    query('page').optional().isInt().withMessage('page must be a valid number').toInt(),
    query('limit')
        .optional()
        .isInt({ gt: 0, lt: 31 })
        .withMessage('limit must be a valid number between 1 and 30 (inclusive)')
        .toInt(),
    query('searchKey').optional().isString(),
    Validation.authenticate,
    Validation.validateRequest,
    async (req: Request, res: Response) => {
        const parkingService = new ParkingService();
        const result = await parkingService.list(req.query.page as string, req.query.limit as string, req.query.searchKey as string);
        return ResponseService.sendSuccess(res, result, 'retrieved successfully')
    }
);

router.get(
    '/:id',
    param('id').isMongoId().withMessage('id must be a valid id'),
    Validation.authenticate,
    Validation.validateRequest,
    async (req: Request, res: Response) => {
        const { id } = req.params
        const parkingService = new ParkingService();
        const result = await parkingService.getParkingById(id);
        if (result) {
            return ResponseService.sendSuccess(res, result, 'retrieved successfully')
        }
        return ResponseService.sendNotFound(res, `parking-lot with id [${id}] cannot be found`)
    }
);

router.get('/parkings', async (req: Request, res: Response) => {
    try {
        const { page, limit, searchKey } = req.query;
        const list = await ParkingService.list(page as string, limit as string, searchKey as string);

        return res.status(200).json(list);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

router.get('/parking/details/:userId/:parkingId', async (req: Request, res: Response) => {
    try {
        const { userId, parkingId } = req.params;
        const parkingDetails = await ParkingService.getParkingLotDetails(userId, parkingId);

        if (!parkingDetails) {
            return res.status(404).json({ error: 'Parking lot details not found.' });
        }

        return res.status(200).json(parkingDetails);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

router.get('/parkings/search', async (req: Request, res: Response) => {
    try {
        const { name } = req.query;
        const searchResults = await ParkingService.findByName(name as string);

        return res.status(200).json(searchResults);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

export { router as getRouter };
