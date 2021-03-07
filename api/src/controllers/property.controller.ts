import { NextFunction, Request, Response } from 'express';
import { CreatePropertyDto } from '../dtos/property.dto';
import HttpException from '../exceptions/HttpException';
import { Property } from '../interfaces/property.interface';
import propertyModel from '../models/property.model';
import propertyService from '../services/property.service';

class PropertyController {
  public propertyService = new propertyService();

  public listProperties = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resBody = req.body || {};
      const skip = parseInt(resBody.skip) || 0;
      const limit = parseInt(resBody.limit) || 100;
      const propertyQuery: any = {};
      if (req.query.onlyRent) {
        propertyQuery.isRentable = true;
      }
      if (req.query.onlyBuy) {
        propertyQuery.isBuyable = true;
      }
      const propertyList: Property[] = await this.propertyService.findByQuery(propertyQuery, skip, limit);
      res.status(200).json({ data: propertyList });
    } catch (error) {
      next(error);
    }
  };

  public getPropertyById = async (req: Request, res: Response, next: NextFunction) => {
    const propertyId: string = req.params.id;

    try {
      const findOnePropertyData: Property = await this.propertyService.findPropertyById(propertyId);
      res.status(200).json({ data: findOnePropertyData });
    } catch (error) {
      next(error);
    }
  };

  public createProperty = async (req: Request, res: Response, next: NextFunction) => {
    const propertyData: CreatePropertyDto = req.body;
    propertyData.images = Object.values(req['files']);
    propertyData.images = propertyData.images.map(img => {
      return { ...img, path: img.path.replace('public', '') };
    });

    try {
      const createPropertyData: Property = await this.propertyService.createProperty(propertyData);
      res.status(201).json({ data: createPropertyData });
    } catch (error) {
      next(error);
    }
  };

  public buyOrRentProperty = async (req: Request, res: Response, next: NextFunction) => {
    const propertyId: string = req.params.id;
    const currentuser = req['user']?._id;
    try {
      const propertyData: Property = await this.propertyService.findPropertyById(propertyId);
      if (!propertyData.isBuyable && !propertyData.isRentable) {
        throw new HttpException(409, 'Property unavailable');
      }
      const updateData = { isBuyable: false, soldOn: +new Date(), purchasedBy: currentuser };
      const updatePropertyData: Property = await propertyModel.updateOne({ _id: propertyId }, { $set: { ...updateData } });
      res.status(200).json({ data: updatePropertyData });
    } catch (error) {
      next(error);
    }
  };
  // not in use yet once we add edit functionality then we can use this
  public updateProperty = async (req: Request, res: Response, next: NextFunction) => {
    const propertyId: string = req.params.id;
    const propertyData: Property = req.body;

    try {
      const updatePropertyData: Property = await this.propertyService.updateProperty(propertyId, propertyData);
      res.status(200).json({ data: updatePropertyData });
    } catch (error) {
      next(error);
    }
  };
}

export default PropertyController;
