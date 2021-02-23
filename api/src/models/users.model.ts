import { model, Schema, Document } from 'mongoose';
import { User } from '../interfaces/users.interface';

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  name: String,
  picture: String,
  sub: String
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
