import { NextFunction, Request, Response } from 'express';
import courtAvailabilityService from "./courtAvailability.service";

class CourtAvailabilityController {
    async getAvailability(req: Request, res: Response, next: NextFunction) {
        try {
            const { courtId } = req.params;

            const result = await courtAvailabilityService.getCourtAvailability(courtId as string);

            return res.json({
                success: true,
                data: result,
            });
        } catch (err) {
            next(err);
        }
    }

    async updateAvailability(req: Request, res: Response, next: NextFunction) {
        try {
            const { courtId } = req.params;

            const result = await courtAvailabilityService.updateCourtAvailability(
                courtId as string,
                req.body,
            );

            return res.json({
                success: true,
                data: result,
            });
        } catch (err) {
            next(err);
        }
    }

    async resetAvailability(req: Request, res: Response, next: NextFunction) {
        try {
            const { courtId } = req.params;

            const result = await courtAvailabilityService.resetCourtAvailability(
                courtId as string,
            );

            return res.json({
                success: true,
                data: result,
            });
        } catch (err) {
            next(err);
        }
    }

    async getAvailableSlots(req: Request, res: Response, next: NextFunction) {
        try {
            const { courtId } = req.params;
            const { date } = req.query;

            if (!date) {
                throw new Error('date is required');
            }

            const result = await courtAvailabilityService.getAvailableSlots(
                courtId as string,
                String(date),
            );

            return res.json({
                success: true,
                data: result,
            });
        } catch (err) {
            next(err);
        }
    }
}

export default new CourtAvailabilityController();