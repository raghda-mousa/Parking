import { Router } from 'express';
import { NearestParkingService } from 'application/services/NearestParkingService';

const nearestParkingRoutes = Router();
const nearestParkingService = new NearestParkingService();

nearestParkingRoutes.get('/nearest-parking/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const nearestParking = await nearestParkingService.findNearestParking(userId);

        if (!nearestParking) {
            return res.status(404).json({ error: 'No nearest parking found.' });
        }

        return res.status(200).json(nearestParking);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

export default nearestParkingRoutes;