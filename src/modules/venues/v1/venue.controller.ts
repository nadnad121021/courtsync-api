import { Request, Response, NextFunction } from 'express';
import venueService from './venue.service';
import { RequestWithUser } from '@modules/auth/auth.interface';
import { IGetVenuesFilterQuery, VenueStatus } from '../venue.interface';
import { TSortOrder } from '@core/enums/common.enum';

class VenueController {
  
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { skip, limit, sortBy, sortOrder, searchKey, status } = req.query;
      const queryParams: IGetVenuesFilterQuery = {
        skip: skip ? parseInt(skip as string, 10) : 0,
        limit: limit ? parseInt(limit as string, 10) : 0,
        sortBy: sortBy as string,
        sortOrder: sortOrder as TSortOrder,
        searchKey: searchKey as string,
        status: status as VenueStatus,
      };
      const data = await venueService.getVenuesByFilter(queryParams);

      return res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllActive(req: Request, res: Response, next: NextFunction) {
    try {
      const { skip, limit, sortBy, sortOrder, searchKey } = req.query;
      const queryParams: IGetVenuesFilterQuery = {
        skip: skip ? parseInt(skip as string, 10) : 0,
        limit: limit ? parseInt(limit as string, 10) : 0,
        sortBy: sortBy as string,
        sortOrder: sortOrder as TSortOrder,
        searchKey: searchKey as string
      };
      const data = await venueService.getAllActiveVenuesByFilter(queryParams);

      return res.json({
        success: true,
        ...data
      });
    } catch (error) {
      next(error);
    }
  }

  async getMyVenues(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const { skip, limit, sortBy, sortOrder, searchKey, status } = req.query;
      const queryParams: IGetVenuesFilterQuery = {
        skip: skip ? parseInt(skip as string, 10) : 0,
        limit: limit ? parseInt(limit as string, 10) : 0,
        sortBy: sortBy as string,
        sortOrder: sortOrder as TSortOrder,
        searchKey: searchKey as string,
        status: status as VenueStatus,
        ownerId: req.user?.id as string
      };

      const venues = await venueService.getVenuesByFilter(queryParams);
      console.log("🚀 ~ VenueController ~ getMyVenues ~ venues:", venues)
      return res.json({
        success: true,
        ...venues
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await venueService.findByIdWithMetadata((req as any).params.id);
      console.log("🚀 ~ VenueController ~ getById ~ data:", data)

      return res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const data = await venueService.create(req.body, req.user?.id as string);

      return res.status(201).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const data = await venueService.update((req as any).params.id, req.body, req.user?.id as string);

      return res.json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await venueService.delete((req as any).params.id);

      return res.json({
        success: true,
        message: 'Venue deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new VenueController();
