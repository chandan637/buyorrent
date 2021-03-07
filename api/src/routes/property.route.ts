import { Router } from 'express';
import PropertyController from '../controllers/property.controller';
import Route from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';
import { Types } from 'mongoose';

import multer from 'multer';

const UPLOAD_FILES_DIR = './public/uploads';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_FILES_DIR);
  },

  filename(req, file: any = {}, cb) {
    // set the name based on the field that came with the request
    let newFileName = Types.ObjectId();
    // check extension
    const fileExtension = file.mimetype.replace('image/', '');
    // set the name
    cb(null, `${newFileName}.${fileExtension}`);
  },
});
const fileFilter = (req: any, file: any, cb: any) => {
  if (['image/jpg', 'image/jpeg', 'image/png'].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Image uploaded is not of type jpg/jpeg or png'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

class PropertyRoute implements Route {
  public path = '/properties';
  public router = Router();
  public propertyController = new PropertyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.propertyController.listProperties);
    this.router.put(`${this.path}/:id`, authMiddleware, this.propertyController.buyOrRentProperty); // update FE call for put
    this.router.post(`${this.path}`, authMiddleware, upload.array('images'), this.propertyController.createProperty);
    this.router.get(`${this.path}/:id`, authMiddleware, this.propertyController.getPropertyById);
  }
}

export default PropertyRoute;
