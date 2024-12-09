import { model, Schema, Types } from 'mongoose';

export const PharmacySchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    isEmergency: { type: Boolean, default: false },
    area: { type: String, required: true },
    // Reference to User Model
    pharmacist: { 
      type: Types.ObjectId, 
      ref: 'user', // Matches the name of the User Model when Pharmacist is set to True
      required: true 
    },
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
