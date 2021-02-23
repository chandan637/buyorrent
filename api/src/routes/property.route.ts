import { Router } from 'express';
import PropertyController from '../controllers/property.controller';
import { CreatePropertyDto } from '../dtos/property.dto';
import Route from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../middlewares/validation.middleware';

class PropertyRoute implements Route {
  public path = '/properties';
  public router = Router();
  public propertyController = new PropertyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.propertyController.listProperties);
    this.router.post(`${this.path}/:id/buy-rent`, authMiddleware, this.propertyController.buyOrRentProperty);
    this.router.post(`${this.path}`, authMiddleware, this.propertyController.createProperty);
    this.router.get(`${this.path}/:id`, authMiddleware, this.propertyController.getPropertyById);
  }
}

export default PropertyRoute;
