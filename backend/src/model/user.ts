import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  contactNo: string;
  userType: string;
  status: boolean;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  contactNo: { type: String, required: true },
  userType: { type: String, required: true },
  status: { type: Boolean, required: true, default: true },
}, { timestamps: true });

userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}

const UserModel = model<IUser>('User', userSchema);

export default UserModel;
