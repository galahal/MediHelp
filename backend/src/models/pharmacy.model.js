import { model, Schema } from 'mongoose';

export const PharmacySchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    isEmergency: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export const PharmacyModel = model('pharmacy', PharmacySchema);