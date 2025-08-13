import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface UserDocument extends Document {
  email: string;
  name: string;
  passwordHash: string;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    email: { type: String, unique: true, required: true, index: true },
    name: { type: String, required: true },
    passwordHash: { type: String, required: true },
    roles: { type: [String], default: ['user'] }
  },
  { timestamps: true }
);

export const User: Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);