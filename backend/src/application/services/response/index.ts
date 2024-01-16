import { Response } from 'express';

export class ResponseService {
    static sendSuccess(res: Response, data: any, message: string) {
        res.status(200).send({ success: true, data, message });
    }

    static sendCreated(res: Response, message: string) {
        res.status(201).send({ success: true, data: message });
    }

    static successfullResponse(res: Response, message: string) {
        res.status(204).send({ success: true, data: message });
    }

    static sendBadRequest(res: Response, message: string, errors?: any) {
        res.status(400).send({ success: false, message, errors });
    }

    static sendUnauthorized(res: Response, message: string, errors?: any) {
        res.status(401).send({ success: false, message, errors });
    }

    static sendForbidden(res: Response, message: string, errors?: any) {
        res.status(403).send({ success: false, message, errors });
    }

    static sendNotFound(res: Response, message: string, errors?: any) {
        res.status(404).send({ success: false, message, errors });
    }

    static sendInternalServerError(res: Response, message: string, errors?: any) {
        res.status(500).send({ success: false, message, errors });
    }
    static sendAlreadyCreated(res: Response, message: string, errors?: any) {
        res.status(500).send({ success: false, message, errors });
    }
    // static handleError = (res: Response, error: any) => {
    //     console.error(error);
    //     return res.status(500).json({ error: 'Internal server error.' });
    // };
}

export default ResponseService;
