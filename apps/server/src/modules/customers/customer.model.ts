import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface CustomerDocument extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CustomerSchema = new Schema<CustomerDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: { type: String },
    company: { type: String }
  },
  { timestamps: true }
);

export const Customer: Model<CustomerDocument> =
  mongoose.models.Customer || mongoose.model<CustomerDocument>('Customer', CustomerSchema);