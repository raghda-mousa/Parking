// userLocationRoutes.ts
import express, { Router, Request, Response } from 'express';
import { UserLocationService } from 'application/services/UserLocation';

const router = express.Router();
const userLocationRoutes = Router();
const userLocationService = new UserLocationService();

userLocationRoutes.get('/user/location/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const userLocation = await userLocationService.getUserLocation(userId);

        if (!userLocation) {
            return res.status(404).json({ error: 'User location not found.' });
        }

        return res.status(200).json({ location: userLocation });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

export { router as getRouter };