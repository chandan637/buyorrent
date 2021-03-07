import { model, Schema, Document, Types } from 'mongoose';
import { Property } from '../interfaces/property.interface';

const propertySchema: Schema = new Schema(
  {
    title: String,
    sqArea: Number,
    description: String,
    images: [{ originalname: String, filename: String, path: String, size: Number }],
    price: Number,
    priceCycle: String,
    contactNo: String,
    isBuyable: Boolean,
    isRentable: Boolean,
    soldOn: Number, // epoc date
    purchasedBy: { type: Types.ObjectId, ref: 'User' },
    createdBy: { type: Types.ObjectId, ref: 'User' },
    createdAt: { type: Number, default: +new Date() }, // epoc date
    city: String,
    address: String,
  },
  { timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } },
);

const propertyModel = model<Property & Document>('Property', propertySchema);

export default propertyModel;
