import { model, Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    isPharmacist: { type: Boolean, default: false },
    isDoctor: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
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

// Virtual field for associated pharmacies
UserSchema.virtual('pharmacies', {
  ref: 'pharmacy', // Matches the Pharmacy Model name
  localField: '_id',
  foreignField: 'pharmacist',
});

export const UserModel = model('user', UserSchema);
