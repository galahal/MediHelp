import { model, Schema } from 'mongoose';

export const MedicineSchema = new Schema(
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      tags: { type: [String] },
      imageUrl: { type: String, required: true },
      generics: { type: String, required: true },
      brand: { type: String, required: true },
      expiryDate: { type: Date, required: true },
    },
    {
      toJSON: {
        virtuals: true,
      },
      toObject: {
        virtuals: true,
      },
      timestamps: true,
    }
  );
  
  export const MedicineModel = model('medicine', MedicineSchema);