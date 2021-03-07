import { CreatePropertyDto } from '../dtos/property.dto';
import HttpException from '../exceptions/HttpException';
import { Property } from '../interfaces/property.interface';
import propertyModel from '../models/property.model';
import { isEmpty } from '../utils/util';

class PropertyService {
  public properties = propertyModel;

  public async findByQuery(query, skip = 0, limit = 100): Promise<Property[]> {
    const listing: Property[] = await this.properties
      .find({ ...query })
      .select({ title: 1, description: 1, createdAt: 1, _id: 1, images: 1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
    return listing;
  }

  public async findPropertyById(_id: string, projection = null): Promise<Property> {
    const findProperty: Property = await this.properties.findOne({ _id }, projection).lean().exec();
    if (!findProperty) throw new HttpException(409, 'No such Property');

    return findProperty;
  }

  public async createProperty(propertyData: CreatePropertyDto): Promise<Property> {
    if (isEmpty(propertyData)) throw new HttpException(400, "You're not propertyData");

    const findProperty: Property = await this.properties.findOne({ createdBy: propertyData.createdBy, address: propertyData.address });
    if (findProperty) throw new HttpException(409, `${propertyData.address} already exists`);

    const createPropertyData: Property = await this.properties.create({ ...propertyData, createdAt: +new Date() });
    return createPropertyData;
  }

  public async updateProperty(_id: string, PropertyData: Property): Promise<Property> {
    if (isEmpty(PropertyData)) throw new HttpException(400, "You're not PropertyData");

    const updatePropertyById: Property = await this.properties.findByIdAndUpdate(_id, { ...PropertyData });
    if (!updatePropertyById) throw new HttpException(409, "You're not Property");

    return updatePropertyById;
  }

}

export default PropertyService;
