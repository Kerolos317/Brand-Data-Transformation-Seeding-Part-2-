import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBrand extends Document {
  brandName: string;
  yearFounded: number;
  headquarters: string;
  numberOfLocations: number;
  createdAt: Date;
  updatedAt: Date;
}

const brandSchema = new Schema<IBrand>(
  {
    brandName: {
      type: String,
      required: true,
      trim: true,
    },
    yearFounded: {
      type: Number,
      required: true,
      min: 1600,
      max: new Date().getFullYear(),
    },
    headquarters: {
      type: String,
      required: true,
      trim: true,
    },
    numberOfLocations: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

export const Brand: Model<IBrand> = mongoose.models.Brand || mongoose.model<IBrand>('Brand', brandSchema);
